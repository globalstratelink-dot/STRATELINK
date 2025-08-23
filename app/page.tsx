import { HomeSlides } from "@/components/home-slides"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-navy">
      <HomeSlides />
      <div className="pt-16 md:pt-24">
        <Footer />
      </div>
    </div>
  )
}
