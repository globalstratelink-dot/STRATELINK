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
