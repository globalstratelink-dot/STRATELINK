"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from 'lucide-react'
import { useState, useEffect, useMemo, useCallback } from "react"
import { useLanguage } from "@/contexts/language-context"
import { OptimizedAvatar } from "./optimized-image"
import { OptimizedScrollReveal, OptimizedFadeIn } from "./optimized-animations"

export function TestimonialsSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const { t } = useLanguage()

  const testimonials = [
    {
      name: "Sarah Johnson",
      position: "Propriétaire & Militante Écologique",
      company: "Communauté Green Living",
      content: "Nous avons eu l’opportunité de bénéficier du soutien logistique de STRATELINK GLOBAL dans un contexte d’urgence. Leur réactivité et leur professionnalisme nous ont permis de relever un défi critique et d’assurer la continuité de nos opérations. C’est toujours un véritable plaisir de collaborer avec une équipe aussi fiable et engagée.",
      rating: 5,
      image: "/1.webp",
      avatarFallback: "SJ",
      savingsTitle: "Annual Savings",
      savingsAmount: "1 200 €/an"
    },
    {
      name: "Michael Chen",
      position: "Responsable des Installations",
      company: "TechCorp Industries",
      content: "Leur approche stratégique et opérationnelle nous a permis d’optimiser nos flux et de réduire significativement les délais.",
      rating: 5,
      image: "/2.webp",
      avatarFallback: "MC",
      savingsTitle: "Annual Savings",
      savingsAmount: "15 000 €/an"
    },
    {
      name: "Lisa Rodriguez",
      position: "Promotrice Immobilière",
      company: "Sustainable Homes LLC",
      content: "Une collaboration fluide et efficace avec un accompagnement de bout en bout. Une vraie valeur ajoutée dans le secteur.",
      rating: 5,
      image: "/3.webp",
      avatarFallback: "LR",
      savingsTitle: "Annual Savings",
      savingsAmount: "50 000 €/projet"
    }
  ]

  const handleTestimonialChange = useCallback((index: number) => {
    setCurrentTestimonial(index)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [testimonials.length])

  return (
    <section className="py-20 bg-gradient-to-b from-navy to-navy/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <OptimizedScrollReveal>
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-copper/10 border border-copper/20 rounded-full text-copper text-sm font-medium mb-4">
              Partner Testimonials
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              {t('whatOurPartnersSay')}
              <span className="block text-copper">{t('sayAboutUs')}</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {t('testimonialsDescription')}
            </p>
          </div>
        </OptimizedScrollReveal>

        {/* Grille de témoignages type "cards" */}
        <OptimizedScrollReveal delay={0.2}>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white/5 border-copper/20 hover:border-copper/40 transition-all duration-300">
                <CardContent className="p-6">
                  {/* Stars */}
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-white/90 italic leading-relaxed mb-6">
                    “{testimonial.content}”
                  </p>

                  {/* Avatar + info */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-copper/30 bg-copper/10">
                      <OptimizedAvatar src={testimonial.image} alt={testimonial.name} size={48} fallback={testimonial.avatarFallback} />
                    </div>
                    <div>
                      <div className="text-white font-semibold">{testimonial.name}</div>
                      <div className="text-gray-300 text-sm">{testimonial.position}</div>
                      <div className="text-emerald-300 text-xs">{testimonial.company}</div>
                    </div>
                  </div>

                  {/* Savings badge */}
                  <div className="mt-2">
                    <div className="text-gray-300 text-sm mb-1">{testimonial.savingsTitle}</div>
                    <div className="bg-emerald-200/20 text-emerald-300 font-semibold px-4 py-3 rounded-lg inline-block">
                      {testimonial.savingsAmount}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </OptimizedScrollReveal>
      </div>
    </section>
  )
}
