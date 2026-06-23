import { HomeSlides } from "@/components/home-slides"
import { Footer } from "@/components/footer"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "International Import Export Dubai & B2B Trade Corridors",
  description:
    "STRATELINK GLOBAL connects businesses worldwide through import-export, sourcing, customs compliance and logistics across China, UAE, Europe and Africa.",
  path: "/",
})

export default function HomePage() {
  return (
    <div className="min-h-screen bg-navy pt-12 md:pt-0">
      <HomeSlides />
      <div className="pt-16 md:pt-24">
        <Footer />
      </div>
    </div>
  )
}
