"use client"

import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { QualifyProjectButton } from "@/components/process/qualify-project-button"

export function ProcessCta() {
  const { t } = useLanguage()

  const trustItems = [
    t("processCtaTrust1"),
    t("processCtaTrust2"),
    t("processCtaTrust3"),
    t("processCtaTrust4"),
  ]

  return (
    <section id="qualify-project" className="bg-navy border-t border-white/10 scroll-mt-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-28 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="flex flex-col items-center"
        >
          <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-copper mb-8" strokeWidth={1.5} />

          <div className="relative mb-6 px-4">
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[140%] bg-copper/15 blur-3xl rounded-full pointer-events-none"
              aria-hidden="true"
            />
            <h2 className="relative text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              <span
                className="block text-white"
                style={{ textShadow: "0 0 40px rgba(169, 121, 104, 0.35), 0 4px 24px rgba(0, 0, 0, 0.45)" }}
              >
                {t("processCtaTitle1")}
              </span>
              <span
                className="block text-copper italic mt-1"
                style={{ textShadow: "0 0 48px rgba(169, 121, 104, 0.55), 0 4px 24px rgba(0, 0, 0, 0.45)" }}
              >
                {t("processCtaTitle2")}
              </span>
            </h2>
          </div>

          <p className="text-base sm:text-lg text-gray-400 leading-relaxed max-w-xl mb-10">
            {t("processCtaDescription")}
          </p>

          <QualifyProjectButton
            size="lg"
            className="bg-copper hover:bg-copper/90 text-navy font-bold text-sm sm:text-base tracking-wider uppercase px-8 py-6 mb-12 sm:mb-14"
          >
            {t("processCtaButton")} →
          </QualifyProjectButton>

          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-6 text-[10px] sm:text-xs tracking-[0.15em] text-gray-500 uppercase">
            {trustItems.map((item) => (
              <span key={item} className="flex items-center gap-1.5">
                <span className="text-copper">+</span>
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
