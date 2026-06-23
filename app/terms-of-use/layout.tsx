import type { ReactNode } from "react"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Terms of Use",
  description: "Terms and conditions for using the STRATELINK GLOBAL website and international trade services.",
  path: "/terms-of-use",
})

export default function TermsOfUseLayout({ children }: { children: ReactNode }) {
  return children
}
