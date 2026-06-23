import { Suspense } from "react"
import { Footer } from "@/components/footer"
import { ContactHero } from "@/components/contact/contact-hero"
import { ContactForm } from "@/components/contact/contact-form"
import { ContactInfo } from "@/components/contact/contact-info"
import { ZohoChatbot } from "@/components/zoho-chatbot"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Contact — Import Export Quote & B2B Inquiry",
  description:
    "Request a quote for import-export, sourcing or logistics. STRATELINK GLOBAL — Dubai-based international trade partner. Response within 24 hours.",
  path: "/contact",
})

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-navy">
      <ZohoChatbot />
      <ContactHero />
      
      {/* Contact Section */}
      <section className="py-2 bg-gradient-to-br from-navy via-navy to-navy/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <Suspense fallback={<div className="h-96 rounded-lg bg-white/5 animate-pulse" />}>
                <ContactForm />
              </Suspense>
            </div>
            
            {/* Contact Information */}
            <div>
              <ContactInfo />
              </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  )
}
