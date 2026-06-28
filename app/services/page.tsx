import { Footer } from "@/components/footer"
import { ServicesContent } from "@/components/services/services-content"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Our Services — Import/Export from China | Stratelink Global",
  description:
    "Sourcing, supplier verification, negotiation, logistics, customs and Dubai transit hub — end-to-end import/export from China to Africa, Europe and the UAE.",
  path: "/services",
})

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-navy">
      <div className="pt-24 md:pt-32">
        <ServicesContent />
      </div>
      <div className="pt-8 md:pt-12">
        <Footer />
      </div>
    </div>
  )
}
