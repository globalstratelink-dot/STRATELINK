import type { ReactNode } from "react"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Our Trade Process — China, UAE, Europe & Africa Corridors",
  description:
    "Discover how STRATELINK GLOBAL manages import-export projects: qualification, sourcing, compliance, logistics and deployment across international trade corridors.",
  path: "/process",
})

export default function ProcessLayout({ children }: { children: ReactNode }) {
  return children
}
