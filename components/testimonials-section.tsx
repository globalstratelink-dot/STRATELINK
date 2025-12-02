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
      position: "CEO",
      company: "TechCorp International",
      content: "Stratelink Global transformed our import operations completely. Their expertise helped us expand to 15 new markets and achieve 400% growth in trade volume. Absolutely exceptional!",
      rating: 5,
      image: "/placeholder-user.jpg",
      avatarFallback: "SJ"
    },
    {
      name: "Michael Chen",
      position: "Operations Director",
      company: "Global Logistics Ltd",
      content: "Working with Stratelink Global was a game-changer. Their logistics solutions helped us optimize our supply chain and reduce shipping costs by 40%. Highly recommended!",
      rating: 5,
      image: "/placeholder-user.jpg",
      avatarFallback: "MC"
    },
    {
      name: "Emma Rodriguez",
      position: "Supply Chain Manager",
      company: "Manufacturing Solutions",
      content: "Stratelink Global revolutionized our supply chain. Their real-time tracking and optimization tools helped us reduce costs by 35% while improving delivery times.",
      rating: 5,
      image: "/placeholder-user.jpg",
      avatarFallback: "ER"
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

        <div className="relative max-w-4xl mx-auto">
          {/* Main Testimonial */}
          <OptimizedScrollReveal delay={0.2}>
            <Card className="bg-navy/50 border-copper/20 hover:border-copper/50 transition-all duration-500">
              <CardContent className="p-8 lg:p-12">
                <div className="text-center">
                  <Quote className="w-12 h-12 text-copper mx-auto mb-6" />
                  
                  <blockquote className="text-xl lg:text-2xl text-white leading-relaxed mb-8">
                    "{testimonials[currentTestimonial].content}"
                  </blockquote>

                  <div className="flex justify-center mb-6">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-copper fill-current" />
                    ))}
                  </div>

                  <div className="flex items-center justify-center space-x-4">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-full border-2 border-copper overflow-hidden bg-copper/10">
                        <OptimizedAvatar
                          src={testimonials[currentTestimonial].image}
                          alt={testimonials[currentTestimonial].name}
                          size={80}
                          fallback={testimonials[currentTestimonial].avatarFallback}
                        />
                      </div>
                    </div>
                    <div className="text-left">
                      <div className="text-white font-semibold text-lg">
                        {testimonials[currentTestimonial].name}
                      </div>
                      <div className="text-copper text-sm">
                        {testimonials[currentTestimonial].position}
                      </div>
                      <div className="text-gray-400 text-sm">
                        {testimonials[currentTestimonial].company}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </OptimizedScrollReveal>

          {/* Navigation Dots */}
          <OptimizedFadeIn delay={0.4}>
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleTestimonialChange(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial 
                      ? "bg-copper scale-125" 
                      : "bg-copper/30 hover:bg-copper/50"
                  }`}
                />
              ))}
            </div>
          </OptimizedFadeIn>
        </div>

        {/* Additional Testimonials Grid */}
        <OptimizedScrollReveal delay={0.6}>
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={index}
                className={`bg-navy/30 border-copper/10 hover:border-copper/30 transition-all duration-300 cursor-pointer ${
                  index === currentTestimonial ? 'ring-2 ring-copper/50' : ''
                }`}
                onClick={() => handleTestimonialChange(index)}
              >
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full border border-copper/30 overflow-hidden bg-copper/10">
                        <OptimizedAvatar
                          src={testimonial.image}
                          alt={testimonial.name}
                          size={48}
                          fallback={testimonial.avatarFallback}
                        />
                      </div>
                    </div>
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-copper fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <div className="text-white font-medium text-sm">{testimonial.name}</div>
                    <div className="text-copper text-xs">{testimonial.position}</div>
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
