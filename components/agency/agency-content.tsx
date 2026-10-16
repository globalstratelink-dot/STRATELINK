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
  const { t } = useLanguage()

  return (
    <div className="bg-navy overflow-x-hidden">
      <section
        id="about-us-intro"
        className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-navy via-navy to-navy/90 scroll-mt-24 sm:scroll-mt-28 overflow-x-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            <motion.div {...fadeUp} className="space-y-6 sm:space-y-8 min-w-0">
              <div className="space-y-4 sm:space-y-6">
                <div className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 bg-copper/10 border border-copper/20 rounded-full text-copper text-xs sm:text-sm font-medium">
                  {t("agency")}
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-balance">
                  <span className="block text-copper">{t("orchestratorOfInternationalGrowthLine2")}</span>
                </h2>

                <div className="space-y-4 sm:space-y-6 text-base sm:text-lg text-gray-300 leading-relaxed">
                  <p>{t("aboutStratelinkDescription1")}</p>
                  <p>{t("aboutStratelinkDescription1Part2")}</p>
                  <p className="text-copper font-semibold">{t("aboutStratelinkDescription2")}</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.15 }}
              className="flex justify-center lg:justify-end min-w-0"
            >
              <div className="relative w-full max-w-xs sm:max-w-md lg:max-w-lg mx-auto lg:mx-0">
                <div className="absolute inset-0 bg-gradient-to-r from-copper/20 via-transparent to-sand/20 rounded-3xl blur-2xl" />

                <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-copper/20">
                  <img
                    src="/tungart7-containers.jpg"
                    alt="Shipping containers"
                    className="w-full h-auto object-cover"
                  />
                </div>
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
