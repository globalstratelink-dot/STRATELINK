import type { ReactNode } from "react"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Schedule a Meeting — Import Export Consultation",
  description:
    "Book a consultation with STRATELINK GLOBAL for import-export, sourcing or logistics projects. Dubai-based international trade experts.",
  path: "/calendly",
})

export default function CalendlyLayout({ children }: { children: ReactNode }) {
  return children
}
