"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import { QualifyProjectButton } from "@/components/process/qualify-project-button"

export function ProcessHero() {
  const { t } = useLanguage()

  const scrollToHowItWorks = () => {
    document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })
  }

  const circleCount = 5
  const circleSpacing = 130

  return (
    <section className="h-screen bg-navy relative overflow-hidden">
      {/* Divider below navbar */}
      <div className="absolute top-20 md:top-24 left-0 right-0 h-px bg-white/10 z-10" />

      {/* Concentric circles — origin at top-center, below navbar */}
      <div className="absolute top-20 md:top-24 left-0 right-0 bottom-0 pointer-events-none overflow-hidden">
        <svg
          viewBox="0 0 1200 900"
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          {Array.from({ length: circleCount }, (_, i) => i + 1).map((ring) => (
            <circle
              key={ring}
              cx="600"
              cy="480"
              r={ring * circleSpacing}
              fill="none"
              stroke="rgba(255,255,255,0.07)"
              strokeWidth="1"
            />
          ))}
        </svg>
      </div>

      <div className="relative z-10 h-full flex flex-col items-center justify-center md:justify-start px-4 sm:px-6 lg:px-8 w-full max-w-4xl mx-auto md:pt-40">
        {/* Top label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-4 sm:gap-6 mb-8 sm:mb-10"
        >
          <div className="h-px w-10 sm:w-16 bg-copper/50" />
          <span className="text-[10px] sm:text-xs tracking-[0.25em] sm:tracking-[0.35em] text-copper uppercase font-medium whitespace-nowrap">
            {t("processHeroLabel")}
          </span>
          <div className="h-px w-10 sm:w-16 bg-copper/50" />
        </motion.div>

        <div className="text-center w-full">
        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 sm:mb-8"
        >
          <span className="block text-white">{t("processHeroTitle1")}</span>
          <span className="block text-copper mt-1">{t("processHeroTitle2")}</span>
          <span className="block text-white mt-1">{t("processHeroTitle3")}</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed mb-8 sm:mb-10"
        >
          {t("processHeroDescription")}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <QualifyProjectButton
            size="lg"
            className="bg-copper hover:bg-copper/90 text-navy font-bold text-sm sm:text-base tracking-wider uppercase px-8 py-6 w-full sm:w-auto"
          >
            {t("processQualifyProject")}
          </QualifyProjectButton>

          <Button
            size="lg"
            variant="outline"
            className="border border-white/40 bg-transparent text-white hover:bg-white/5 font-semibold text-sm sm:text-base tracking-wider uppercase px-8 py-6 w-full sm:w-auto"
            onClick={scrollToHowItWorks}
          >
            {t("processHowItWorks")}
          </Button>
        </motion.div>
        </div>
      </div>
    </section>
  )
}
