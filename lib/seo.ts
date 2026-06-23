import type { Metadata } from "next"

export const SITE_URL = "https://stratelink-global.com"
export const SITE_NAME = "STRATELINK GLOBAL"

export const DEFAULT_DESCRIPTION =
  "International import-export, sourcing, customs compliance and logistics corridors between China, UAE, Europe and Africa. B2B trading partner based in Dubai."

export const DEFAULT_KEYWORDS = [
  "import export",
  "international trade",
  "sourcing",
  "logistics",
  "Dubai",
  "UAE",
  "China",
  "Africa",
  "B2B",
  "customs compliance",
  "freight forwarding",
  "trade corridors",
]

export function pageMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  path = "",
  noIndex = false,
}: {
  title: string
  description?: string
  path?: string
  noIndex?: boolean
}): Metadata {
  const canonicalPath = path.endsWith("/") ? path : path ? `${path}/` : "/"
  const url = `${SITE_URL}${canonicalPath === "/" ? "/" : canonicalPath}`

  return {
    title,
    description,
    keywords: DEFAULT_KEYWORDS,
    alternates: { canonical: url },
    robots: noIndex
      ? { index: false, follow: false, googleBot: { index: false, follow: false } }
      : { index: true, follow: true },
    openGraph: {
      type: "website",
      locale: "en_US",
      alternateLocale: ["fr_FR"],
      url,
      siteName: SITE_NAME,
      title,
      description,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} — International Import Export`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.png"],
    },
  }
}

export const NOINDEX_METADATA: Metadata = {
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
}
