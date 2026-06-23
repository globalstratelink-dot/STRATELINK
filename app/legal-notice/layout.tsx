import type { ReactNode } from "react"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Legal Notice",
  description: "Legal notice and company information for STRATELINK GLOBAL — international import-export services.",
  path: "/legal-notice",
})

export default function LegalNoticeLayout({ children }: { children: ReactNode }) {
  return children
}
