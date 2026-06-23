import type { ReactNode } from "react"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: "Privacy policy and personal data protection for STRATELINK GLOBAL website visitors and B2B clients.",
  path: "/privacy-policy",
})

export default function PrivacyPolicyLayout({ children }: { children: ReactNode }) {
  return children
}
