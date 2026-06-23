import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/seo"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/_next/",
        "/.well-known/",
        "/adminAbdelhamid/",
        "/test-navbar/",
        "/test-navbar-mobile/",
        "/test-mobile-menu/",
        "/test-loading/",
        "/test-performance/",
        "/test-translations/",
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
