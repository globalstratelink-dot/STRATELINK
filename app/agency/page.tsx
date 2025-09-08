import { Footer } from "@/components/footer"
import { AgencyContent } from "@/components/agency/agency-content"

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