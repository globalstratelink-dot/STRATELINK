"use client"

import { motion } from "framer-motion"
import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import { SectionScrollHintAnchor } from "@/components/section-scroll-hint"
import { scrollToQualifyProject } from "@/lib/scroll-to-qualify"

export function ProcessHero() {
  const { t } = useLanguage()
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.muted = true
    void video.play().catch(() => undefined)
  }, [])

  const scrollToHowItWorks = () => {
    document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="h-screen bg-navy relative overflow-x-hidden">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover pointer-events-none"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      >
        <source src="/hero-home.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-navy/55 pointer-events-none" aria-hidden="true" />

      {/* Divider below navbar */}
      <div className="absolute top-20 md:top-24 left-0 right-0 h-px bg-white/10 z-10" />

      <div className="relative z-10 h-full flex flex-col items-center justify-center md:justify-start px-4 sm:px-6 lg:px-8 w-full max-w-4xl mx-auto md:pt-40">
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
          <Button
            size="lg"
            className="bg-copper hover:bg-copper/90 text-navy font-bold text-sm sm:text-base tracking-wider uppercase px-8 py-6 w-full sm:w-auto"
            onClick={scrollToQualifyProject}
          >
            {t("processQualifyProject")}
          </Button>

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

      <SectionScrollHintAnchor targetId="how-it-works" />
    </section>
  )
}
