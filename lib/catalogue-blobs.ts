import { getStore } from "@netlify/blobs"

export const CATALOGUE_DATA_STORE = "stratelink-catalogue"
export const CATALOGUE_IMAGES_STORE = "stratelink-catalogue-images"
export const CATALOGUE_SERVICES_KEY = "services"

export function catalogueMediaUrl(filename: string) {
  return `/api/catalogue/media/${filename}/`
}

function storeOptions(name: string) {
  const siteID = process.env.NETLIFY_SITE_ID
  const token = process.env.NETLIFY_AUTH_TOKEN

  if (siteID && token) {
    return { name, siteID, token }
  }

  return name
}

export function getCatalogueDataStore() {
  try {
    return getStore(storeOptions(CATALOGUE_DATA_STORE))
  } catch {
    return null
  }
}

export function getCatalogueImagesStore() {
  try {
    return getStore(storeOptions(CATALOGUE_IMAGES_STORE))
  } catch {
    return null
  }
}
