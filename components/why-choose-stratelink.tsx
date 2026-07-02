"use client"

import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/language-context"

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.7 },
  viewport: { once: true },
} as const

const guaranteeCards = [
  { number: "1", titleKey: "privilegedMarketAccess", descKey: "privilegedMarketAccessDesc" },
  { number: "2", titleKey: "customerAcquisitionRetention", descKey: "customerAcquisitionRetentionDesc" },
  { number: "3", titleKey: "turnkeySolutions", descKey: "turnkeySolutionsDesc" },
  { number: "4", titleKey: "rapidReliableDeployment", descKey: "rapidReliableDeploymentDesc" },
] as const

export function WhyChooseStratelink() {
  const { t } = useLanguage()

  return (
    <section id="why-stratelink" className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-navy/95 to-navy relative scroll-mt-24 sm:scroll-mt-28 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div {...fadeUp} className="text-center mb-10 sm:mb-14 lg:mb-16">
          <div className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 bg-copper/20 backdrop-blur-sm border border-copper/30 rounded-full text-copper font-semibold text-xs sm:text-sm mb-4 sm:mb-6">
            <span className="w-2 h-2 bg-copper rounded-full mr-2 shrink-0" />
            {t("whyUsBadge")}
          </div>

          <h2 className="title-section text-white mb-4 sm:mb-6 px-2 text-balance">
            {t("whyChooseStratelinkGlobal")}
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-4xl mx-auto px-2 leading-relaxed">
            {t("excellenceAtServiceOfGrowth")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          {guaranteeCards.map((card, index) => (
            <motion.div
              key={card.number}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: index * 0.08 }}
              className="bg-navy/50 backdrop-blur-sm border border-copper/20 rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 hover:border-copper/40 transition-colors duration-300 group"
            >
              <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-4 min-w-0">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-copper/20 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-copper/30 transition-colors duration-300">
                  <span className="text-xl sm:text-2xl font-bold text-copper">{card.number}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg sm:text-xl font-semibold leading-snug text-white mb-2 sm:mb-4 break-words">
                    {t(card.titleKey)}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-300 leading-relaxed break-words">
                    {t(card.descKey)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
