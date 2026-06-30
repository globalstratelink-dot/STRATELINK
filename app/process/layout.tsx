import type { ReactNode } from "react"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "International Import Export Dubai & B2B Trade Corridors",
  description:
    "STRATELINK GLOBAL connects businesses worldwide through import-export, sourcing, customs compliance and logistics across China, UAE, Europe and Africa.",
  path: "/process",
})

export default function ProcessLayout({ children }: { children: ReactNode }) {
  return children
}
