import { NextRequest, NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"
import { getCatalogueImagesStore } from "@/lib/catalogue-blobs"

type RouteContext = { params: { filename: string } }

const LOCAL_UPLOAD_DIR = path.join(process.cwd(), "public", "uploads", "catalogue")

function sanitizeFilename(filename: string) {
  return filename.replace(/[^a-zA-Z0-9._-]/g, "").slice(0, 120)
}

export async function GET(_request: NextRequest, { params }: RouteContext) {
  const filename = sanitizeFilename(params.filename)
  if (!filename) {
    return NextResponse.json({ error: "Invalid filename" }, { status: 400 })
  }

  const store = getCatalogueImagesStore()
  if (store) {
    try {
      const result = await store.getWithMetadata(filename, { type: "arrayBuffer" })
      if (result?.data) {
        const contentType =
          (result.metadata?.contentType as string | undefined) || "application/octet-stream"
        return new NextResponse(result.data, {
          headers: {
            "Content-Type": contentType,
            "Cache-Control": "public, max-age=31536000, immutable",
          },
        })
      }
    } catch {
      // fall through to local file
    }
  }

  try {
    const filePath = path.join(LOCAL_UPLOAD_DIR, filename)
    const buffer = await fs.readFile(filePath)
    const ext = path.extname(filename).toLowerCase()
    const contentType =
      ext === ".png"
        ? "image/png"
        : ext === ".webp"
          ? "image/webp"
          : ext === ".gif"
            ? "image/gif"
            : "image/jpeg"

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    })
  } catch {
    return NextResponse.json({ error: "Image not found" }, { status: 404 })
  }
}
