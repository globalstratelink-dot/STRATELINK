import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/seo"

const PUBLIC_ROUTES: Array<{
  path: string
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]
  priority: number
}> = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/catalogue/", changeFrequency: "weekly", priority: 0.9 },
  { path: "/process/", changeFrequency: "monthly", priority: 0.85 },
  { path: "/agency/", changeFrequency: "monthly", priority: 0.8 },
  { path: "/contact/", changeFrequency: "monthly", priority: 0.85 },
  { path: "/calendly/", changeFrequency: "monthly", priority: 0.7 },
  { path: "/privacy-policy/", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms-of-use/", changeFrequency: "yearly", priority: 0.3 },
  { path: "/legal-notice/", changeFrequency: "yearly", priority: 0.3 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return PUBLIC_ROUTES.map(({ path, changeFrequency, priority }) => ({
    url: `${SITE_URL}${path === "/" ? "/" : path}`,
    lastModified,
    changeFrequency,
    priority,
  }))
}
