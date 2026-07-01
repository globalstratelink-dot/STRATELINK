import { NextRequest, NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"
import { isAdminAuthenticated } from "@/lib/catalogue-auth"
import { CATALOGUE_MAX_IMAGE_BYTES } from "@/lib/catalogue-types"
import { detectImageMime, extensionForImageMime, normalizeImageMime } from "@/lib/image-magic"
import { catalogueMediaUrl, getCatalogueImagesStore, useNetlifyBlobStorage } from "@/lib/catalogue-blobs"
import { isSupabaseConfigured } from "@/lib/supabase-admin"
import { uploadCatalogueImageToSupabase } from "@/lib/catalogue-supabase"

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads", "catalogue")

export const runtime = "nodejs"

function sanitizeFilename(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9.-]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80)
}

export async function POST(request: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get("file")

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Aucun fichier image fourni" }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())

    if (buffer.length === 0) {
      return NextResponse.json({ error: "Le fichier image est vide" }, { status: 400 })
    }

    if (buffer.length > CATALOGUE_MAX_IMAGE_BYTES) {
      return NextResponse.json({ error: "Image trop volumineuse (max 5 Mo)" }, { status: 400 })
    }

    const detectedMime = detectImageMime(buffer) ?? normalizeImageMime(file.type)
    if (!detectedMime) {
      return NextResponse.json(
        {
          error:
            "Format non supporté ou fichier non reconnu. Utilisez une image JPG, PNG, WEBP ou GIF valide.",
        },
        { status: 400 }
      )
    }

    const extension = extensionForImageMime(detectedMime)
    const filename = `${Date.now()}-${sanitizeFilename(file.name.replace(/\.[^.]+$/, "") || "image")}.${extension}`

    if (isSupabaseConfigured()) {
      try {
        const publicUrl = await uploadCatalogueImageToSupabase(filename, buffer, detectedMime)
        return NextResponse.json({ url: publicUrl })
      } catch (error) {
        console.error("[catalogue/upload] Supabase failed", error)
        const detail = error instanceof Error ? error.message : "unknown"
        return NextResponse.json(
          {
            error: `Impossible d'envoyer l'image sur Supabase. ${detail}`,
          },
          { status: 503 }
        )
      }
    }

    const imageStore = getCatalogueImagesStore()
    if (useNetlifyBlobStorage()) {
      if (!imageStore) {
        return NextResponse.json(
          { error: "Stockage images non configuré. Ajoutez NETLIFY_AUTH_TOKEN sur Netlify." },
          { status: 503 }
        )
      }
      await imageStore.set(filename, buffer, {
        metadata: { contentType: detectedMime },
      })
      return NextResponse.json({ url: catalogueMediaUrl(filename) })
    }

    if (imageStore) {
      await imageStore.set(filename, buffer, {
        metadata: { contentType: detectedMime },
      })
      return NextResponse.json({ url: catalogueMediaUrl(filename) })
    }

    await fs.mkdir(UPLOAD_DIR, { recursive: true })
    await fs.writeFile(path.join(UPLOAD_DIR, filename), buffer)

    return NextResponse.json({ url: `/uploads/catalogue/${filename}` })
  } catch (error) {
    console.error("[catalogue/upload] failed", error)
    return NextResponse.json({ error: "Impossible d'enregistrer l'image" }, { status: 500 })
  }
}
