"use client"

import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/language-context"
import { ProcessWhatWeDo } from "@/components/process/process-what-we-do"
import { SectionScrollHintAnchor } from "@/components/section-scroll-hint"

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.7 },
  viewport: { once: true },
} as const

export function AgencyContent() {
  const { t, language } = useLanguage()
  const titleEnd = t("orchestratorOfInternationalGrowthLine2End")
  const titleEndText =
    typeof titleEnd === "string" && titleEnd.startsWith("orchestratorOfInternational")
      ? language === "fr"
        ? "d'approvisionnement."
        : "partner."
      : titleEnd

  return (
    <div className="bg-navy overflow-x-hidden">
      <section
        id="about-us-intro"
        className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-navy via-navy to-navy/90 scroll-mt-24 sm:scroll-mt-28 overflow-x-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 bg-copper/10 border border-copper/20 rounded-full text-copper text-xs sm:text-sm font-medium mb-4 sm:mb-6">
            {t("agency")}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-stretch">
            <motion.div {...fadeUp} className="min-w-0">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-balance">
                <span className="text-copper">{t("orchestratorOfInternationalGrowthLine2")}</span>{" "}
                <span className="text-white">{titleEndText}</span>
              </h2>

              <div className="mt-4 sm:mt-6 space-y-4 sm:space-y-6 text-base sm:text-lg text-gray-300 leading-relaxed">
                <p>{t("aboutStratelinkDescription1")}</p>
                <p>{t("aboutStratelinkDescription1Part2")}</p>
                <p className="text-copper font-semibold">{t("aboutStratelinkDescription2")}</p>
              </div>
            </motion.div>

            <motion.div
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.15 }}
              className="min-w-0 min-h-64 sm:min-h-80 lg:min-h-0"
            >
              <div className="relative h-full min-h-64 sm:min-h-80 lg:min-h-full overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl border border-copper/20">
                <img
                  src="/about-city-night.jpg"
                  alt="Futuristic city at night"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>

        <SectionScrollHintAnchor targetId="how-it-works" />
      </section>

      <ProcessWhatWeDo scrollNext={null} />
    </div>
  )
}
