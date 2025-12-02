import { Footer } from "@/components/footer"
import { AgencyContent } from "@/components/agency/agency-content"

export default function AgencyPage() {
  return (
    <div className="min-h-screen bg-navy">
      <AgencyContent />
      <div className="pt-8 md:pt-12">
        <Footer />
      </div>
    </div>
  )
} 