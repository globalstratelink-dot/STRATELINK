import { HomeSlides } from "@/components/home-slides"
import { Footer } from "@/components/footer"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Our Activities — Import/Export from China | Stratelink Global",
  description:
    "From supplier sourcing to destination delivery, STRATELINK GLOBAL manages your import/export operations across China, UAE, Europe and Africa.",
  path: "/activities",
})

export default function ActivitiesPage() {
  return (
    <div className="min-h-screen bg-navy pt-12 md:pt-0">
      <HomeSlides />
      <div className="pt-16 md:pt-24">
        <Footer />
      </div>
    </div>
  )
}
