export type CatalogueService = {
  id: string
  imageUrl: string
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

export const CATALOGUE_MAX_IMAGE_BYTES = 5 * 1024 * 1024

export const CATALOGUE_ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
] as const
