import { Footer } from "@/components/footer"
import { CatalogueContent } from "@/components/catalogue/catalogue-content"
import { pageMetadata } from "@/lib/seo"

export const dynamic = "force-dynamic"

export const metadata = pageMetadata({
  title: "B2B Services Catalogue — Sourcing, Compliance & Logistics",
  description:
    "Browse STRATELINK GLOBAL B2B catalogue: import-export services, sourcing, customs compliance and trade corridors. Request a tailored quote.",
  path: "/catalogue",
})

export default function CataloguePage() {
  return (
    <div className="min-h-screen bg-navy">
      <div className="pt-24 md:pt-32">
        <CatalogueContent />
      </div>
      <div className="pt-8 md:pt-12">
        <Footer />
      </div>
    </div>
  )
}
