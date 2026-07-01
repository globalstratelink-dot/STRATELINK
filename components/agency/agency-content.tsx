"use client"

import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/language-context"
import { WhyChooseStratelink } from "@/components/why-choose-stratelink"

export function AgencyContent() {
  const { t } = useLanguage()

return (
    <div className="min-h-screen bg-navy">
      {/* About Section */}
      <section className="py-20 bg-gradient-to-br from-navy via-navy to-navy/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <div className="inline-flex items-center px-4 py-2 bg-copper/10 border border-copper/20 rounded-full text-copper text-sm font-medium">
                  {t('agency')}
                </div>
                
                <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
                  <span className="block">{t('orchestratorOfInternationalGrowthLine1')}</span>
                  <span className="block mt-2">{t('orchestratorOfInternationalGrowthLine2')}</span>
                </h2>
                
                <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
                  <p>{t('aboutStratelinkDescription1')}</p>
                  <p>{t('aboutStratelinkDescription1Part2')}</p>
                  <p className="text-copper font-semibold">{t('aboutStratelinkDescription2')}</p>
                </div>
              </div>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex justify-center lg:justify-end"
            >
              <div className="relative max-w-lg mx-auto lg:mx-0">
                {/* Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-copper/20 via-transparent to-sand/20 rounded-3xl blur-2xl"></div>
                
                {/* Image Container */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-copper/20">
                  <img
                    src="/workss.webp"
                    alt="STRATELINK GLOBAL Agency"
                    className="w-full h-auto object-cover"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-transparent"></div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <WhyChooseStratelink />
    </div>
  )
} 

