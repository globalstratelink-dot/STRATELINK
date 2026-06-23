export function catalogueApiHeaders() {
  return {
    "Cache-Control": "private, no-cache, no-store, must-revalidate",
    Pragma: "no-cache",
    Expires: "0",
    "CDN-Cache-Control": "no-store",
    "Netlify-CDN-Cache-Control": "no-store",
  }
}
