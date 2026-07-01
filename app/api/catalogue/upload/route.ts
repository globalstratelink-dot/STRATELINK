import { NextRequest, NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"
import { isAdminAuthenticated } from "@/lib/catalogue-auth"
import { CATALOGUE_MAX_IMAGE_BYTES } from "@/lib/catalogue-types"
import { detectImageMime, extensionForImageMime, normalizeImageMime } from "@/lib/image-magic"
import {
  catalogueMediaUrl,
  getCatalogueImagesStore,
  isServerlessRuntime,
} from "@/lib/catalogue-blobs"
import { isSupabaseConfigured } from "@/lib/supabase-admin"
import { checkCatalogueImageStorage, uploadCatalogueImageToSupabase } from "@/lib/catalogue-supabase"

const CATALOGUE_IMAGES_BUCKET = "catalogue-images"

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads", "catalogue")

export const runtime = "nodejs"

function sanitizeFilename(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9.-]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80)
}

async function saveCatalogueImage(
  filename: string,
  buffer: Buffer,
  contentType: string
): Promise<string> {
  const errors: string[] = []

  if (isSupabaseConfigured()) {
    try {
      return await uploadCatalogueImageToSupabase(filename, buffer, contentType)
    } catch (error) {
      const detail = error instanceof Error ? error.message : String(error)
      console.error("[catalogue/upload] Supabase failed", error)
      errors.push(`Supabase: ${detail}`)
    }
  }

  const imageStore = getCatalogueImagesStore()
  if (imageStore) {
    try {
      await imageStore.set(filename, buffer, {
        metadata: { contentType },
      })
      return catalogueMediaUrl(filename)
    } catch (error) {
      const detail = error instanceof Error ? error.message : String(error)
      console.error("[catalogue/upload] Netlify Blobs failed", error)
      errors.push(`Netlify Blobs: ${detail}`)
    }
  } else if (isServerlessRuntime()) {
    errors.push("Netlify Blobs: stockage non disponible")
  }

  if (!isServerlessRuntime()) {
    await fs.mkdir(UPLOAD_DIR, { recursive: true })
    await fs.writeFile(path.join(UPLOAD_DIR, filename), buffer)
    return `/uploads/catalogue/${filename}`
  }

  if (!isSupabaseConfigured()) {
    throw new Error(
      "Stockage images non configuré en production. Ajoutez SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY (bucket catalogue-images) ou NETLIFY_AUTH_TOKEN sur Netlify."
    )
  }

  throw new Error(
    errors.length > 0
      ? `Impossible d'enregistrer l'image. ${errors.join(" · ")}`
      : "Impossible d'enregistrer l'image sur le serveur."
  )
}

export async function POST(request: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Non autorisé. Reconnectez-vous à l'admin." }, { status: 401 })
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

    const url = await saveCatalogueImage(filename, buffer, detectedMime)
    return NextResponse.json({ url })
  } catch (error) {
    console.error("[catalogue/upload] failed", error)
    const message =
      error instanceof Error ? error.message : "Impossible d'enregistrer l'image"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  const status: Record<string, unknown> = {
    serverless: isServerlessRuntime(),
    supabaseConfigured: isSupabaseConfigured(),
    netlifyBlobs: Boolean(getCatalogueImagesStore()),
    bucket: CATALOGUE_IMAGES_BUCKET,
  }

  if (isSupabaseConfigured()) {
    try {
      const bucketStatus = await checkCatalogueImageStorage()
      status.supabaseBucketOk = bucketStatus.ok
      status.supabaseBucketMessage = bucketStatus.message
    } catch (error) {
      status.supabaseBucketOk = false
      status.supabaseBucketMessage =
        error instanceof Error ? error.message : "Impossible de joindre Supabase"
    }
  }

  return NextResponse.json(status)
}
