import { Footer } from "@/components/footer"
import { ServicesContent } from "@/components/services/services-content"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Import Export Services, Sourcing & International Logistics",
  description:
    "End-to-end import-export services: strategic sourcing, quality control, logistics, customs compliance and exclusive B2B catalog for global trade.",
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
