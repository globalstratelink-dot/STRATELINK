export type CatalogueService = {
  id: string
  imageUrl: string
  imageUrls: string[]
  videoUrl: string
  nameFr: string
  nameEn: string
  descriptionFr: string
  descriptionEn: string
  includesFr: string[]
  includesEn: string[]
  audienceFr: string
  audienceEn: string
  order: number
  createdAt: string
  updatedAt: string
}

export type CatalogueServiceInput = Omit<CatalogueService, "id" | "createdAt" | "updatedAt">

export const CATALOGUE_PLACEHOLDER_IMAGE = "/placeholder.svg"

export const CATALOGUE_ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
] as const

export const CATALOGUE_ALLOWED_VIDEO_TYPES = [
  "video/mp4",
  "video/webm",
  "video/quicktime",
] as const

const VIDEO_EXTENSIONS = ["mp4", "webm", "mov", "m4v"]

export function isCatalogueVideoName(filename: string) {
  const ext = filename.split(".").pop()?.toLowerCase() || ""
  return VIDEO_EXTENSIONS.includes(ext)
}

export function catalogueMediaExtension(filename: string, contentType: string) {
  const fromName = filename.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") || ""
  if (fromName && fromName.length <= 5) return fromName === "jpeg" ? "jpg" : fromName
  if (contentType === "image/jpeg") return "jpg"
  if (contentType === "image/png") return "png"
  if (contentType === "image/webp") return "webp"
  if (contentType === "image/gif") return "gif"
  if (contentType === "video/webm") return "webm"
  if (contentType === "video/quicktime") return "mov"
  return "mp4"
}

/** One image stays a plain URL. Several images or a video are stored as JSON in the same field. */
export function packCatalogueMedia(images: string[], video: string) {
  const clean = images.map((item) => item.trim()).filter(Boolean)
  const videoUrl = video.trim()
  if (!videoUrl && clean.length <= 1) return clean[0] || ""
  return JSON.stringify({ images: clean, video: videoUrl })
}

export function unpackCatalogueMedia(
  imageUrl?: string,
  imageUrls?: string[],
  videoUrl?: string
): { images: string[]; video: string } {
  const listed = (imageUrls || []).map((item) => item.trim()).filter(Boolean)
  const video = videoUrl?.trim() || ""
  if (listed.length || video) {
    return { images: listed, video }
  }

  const raw = imageUrl?.trim() || ""
  if (raw.startsWith("{")) {
    try {
      const parsed = JSON.parse(raw) as { images?: unknown; video?: unknown }
      const images = Array.isArray(parsed.images)
        ? parsed.images.filter((item): item is string => typeof item === "string" && Boolean(item.trim()))
        : []
      return {
        images,
        video: typeof parsed.video === "string" ? parsed.video.trim() : "",
      }
    } catch {
      return { images: [], video: "" }
    }
  }

  return { images: raw ? [raw] : [], video: "" }
}
