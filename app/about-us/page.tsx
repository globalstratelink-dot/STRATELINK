import { Footer } from "@/components/footer"
import { AgencyContent } from "@/components/agency/agency-content"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "About Us — Stratelink Global Dubai",
  description:
    "Discover Stratelink Global: international trade operator based in Dubai, connecting B2B buyers with verified Chinese manufacturers across Africa, Europe and the UAE.",
  path: "/about-us",
})

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-navy pt-20 md:pt-24">
      <AgencyContent />
      <div className="pt-8 md:pt-12">
        <Footer />
      </div>
    </div>
  )
}
