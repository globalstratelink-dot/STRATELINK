import { CATALOGUE_ALLOWED_IMAGE_TYPES } from "@/lib/catalogue-types"

const EXTENSION_BY_MIME: Record<(typeof CATALOGUE_ALLOWED_IMAGE_TYPES)[number], string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
}

export function detectImageMime(buffer: Buffer): (typeof CATALOGUE_ALLOWED_IMAGE_TYPES)[number] | null {
  if (buffer.length < 12) return null

  if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return "image/jpeg"
  }

  if (buffer.subarray(0, 4).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47]))) {
    return "image/png"
  }

  if (buffer.subarray(0, 4).equals(Buffer.from("GIF8"))) {
    return "image/gif"
  }

  if (
    buffer.subarray(0, 4).equals(Buffer.from("RIFF")) &&
    buffer.subarray(8, 12).equals(Buffer.from("WEBP"))
  ) {
    return "image/webp"
  }

  return null
}

export function extensionForImageMime(mime: (typeof CATALOGUE_ALLOWED_IMAGE_TYPES)[number]) {
  return EXTENSION_BY_MIME[mime]
}

/** Browsers on Windows often send image/jpg, empty string, or application/octet-stream. */
export function normalizeImageMime(type: string): (typeof CATALOGUE_ALLOWED_IMAGE_TYPES)[number] | null {
  const normalized = type.toLowerCase().split(";")[0].trim()
  if (!normalized) return null
  if (normalized === "image/jpg" || normalized === "image/pjpeg") return "image/jpeg"
  return null
}

export function detectVideoMime(buffer: Buffer): "video/mp4" | "video/webm" | "video/quicktime" | null {
  if (buffer.length < 12) return null
  if (buffer.subarray(4, 8).toString("ascii") === "ftyp") {
    const brand = buffer.subarray(8, 12).toString("ascii")
    if (brand.startsWith("qt")) return "video/quicktime"
    return "video/mp4"
  }
  if (buffer[0] === 0x1a && buffer[1] === 0x45 && buffer[2] === 0xdf && buffer[3] === 0xa3) {
    return "video/webm"
  }
  return null
}
