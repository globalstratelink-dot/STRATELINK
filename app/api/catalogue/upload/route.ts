import { NextRequest, NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"
import { isAdminAuthenticated } from "@/lib/catalogue-auth"
import {
  CATALOGUE_ALLOWED_IMAGE_TYPES,
  CATALOGUE_MAX_IMAGE_BYTES,
} from "@/lib/catalogue-types"
import { detectImageMime, extensionForImageMime } from "@/lib/image-magic"

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads", "catalogue")

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

    if (!CATALOGUE_ALLOWED_IMAGE_TYPES.includes(file.type as (typeof CATALOGUE_ALLOWED_IMAGE_TYPES)[number])) {
      return NextResponse.json(
        { error: "Format non supporté. Utilisez JPG, PNG, WEBP ou GIF." },
        { status: 400 }
      )
    }

    if (file.size > CATALOGUE_MAX_IMAGE_BYTES) {
      return NextResponse.json({ error: "Image trop volumineuse (max 5 Mo)" }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const detectedMime = detectImageMime(buffer)

    if (!detectedMime) {
      return NextResponse.json(
        { error: "Fichier image invalide ou corrompu." },
        { status: 400 }
      )
    }

    const extension = extensionForImageMime(detectedMime)
    const filename = `${Date.now()}-${sanitizeFilename(file.name.replace(/\.[^.]+$/, "") || "image")}.${extension}`

    await fs.mkdir(UPLOAD_DIR, { recursive: true })
    await fs.writeFile(path.join(UPLOAD_DIR, filename), buffer)

    return NextResponse.json({ url: `/uploads/catalogue/${filename}` })
  } catch {
    return NextResponse.json({ error: "Impossible d'enregistrer l'image" }, { status: 500 })
  }
}
