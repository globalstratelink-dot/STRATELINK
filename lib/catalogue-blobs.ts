import { getStore } from "@netlify/blobs"

export const CATALOGUE_DATA_STORE = "stratelink-catalogue"
export const CATALOGUE_IMAGES_STORE = "stratelink-catalogue-images"
export const CATALOGUE_SERVICES_KEY = "services"

export function catalogueMediaUrl(filename: string) {
  return `/api/catalogue/media/${filename}/`
}

/** True on Netlify/AWS serverless (read-only filesystem). */
export function isServerlessRuntime() {
  return Boolean(
    process.env.AWS_LAMBDA_FUNCTION_NAME ||
      process.env.NETLIFY ||
      process.env.SITE_ID ||
      process.env.NETLIFY_SITE_ID
  )
}

/** True on Netlify serverless runtime (not plain `next dev`). */
export function useNetlifyBlobStorage() {
  return isServerlessRuntime()
}

function getBlobStore(name: string) {
  if (!useNetlifyBlobStorage()) return null

  const siteID = process.env.SITE_ID || process.env.NETLIFY_SITE_ID
  const token = process.env.NETLIFY_AUTH_TOKEN

  try {
    if (siteID && token) {
      return getStore({ name, siteID, token, consistency: "strong" })
    }
    if (siteID) {
      return getStore({ name, siteID, consistency: "strong" })
    }
    return getStore({ name, consistency: "strong" })
  } catch (error) {
    console.error(`[catalogue-blobs] Unable to open store "${name}"`, error)
    return null
  }
}

export function getCatalogueDataStore() {
  return getBlobStore(CATALOGUE_DATA_STORE)
}

export function getCatalogueImagesStore() {
  return getBlobStore(CATALOGUE_IMAGES_STORE)
}
