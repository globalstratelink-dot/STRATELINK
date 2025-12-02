import { Footer } from "@/components/footer"
import { ServicesContent } from "@/components/services/services-content"

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
