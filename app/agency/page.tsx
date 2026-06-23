import { Footer } from "@/components/footer"
import { AgencyContent } from "@/components/agency/agency-content"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "International Trading Agency & B2B Market Access",
  description:
    "Strategic trade agency for market entry, partner acquisition and turnkey B2B solutions across UAE, China, Europe and African corridors.",
  path: "/agency",
})

export default function AgencyPage() {
  return (
    <div className="min-h-screen bg-navy pt-20 md:pt-24">
      <AgencyContent />
      <div className="pt-8 md:pt-12">
        <Footer />
      </div>
    </div>
  )
} 