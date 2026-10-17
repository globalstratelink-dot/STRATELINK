"use client"

import { motion } from "framer-motion"
import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { QualifyProjectButton } from "@/components/process/qualify-project-button"
import { useLanguage } from "@/contexts/language-context"
import { SectionScrollHintAnchor } from "@/components/section-scroll-hint"
import { ROUTES } from "@/lib/site-routes"
import { useRouter } from "next/navigation"

export function ProcessHero() {
  const { t } = useLanguage()
  const router = useRouter()
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    let visible = true
    let disposed = false

    const resume = () => {
      if (disposed || !visible || document.hidden) return
      video.muted = true
      video.defaultMuted = true
      video.playsInline = true
      if (!video.paused && !video.ended) return
      void video.play().catch(() => undefined)
    }

    resume()

    const onVisibility = () => resume()
    const events = ["loadeddata", "canplay", "pause", "stalled", "waiting"] as const
    events.forEach((name) => video.addEventListener(name, resume))
    document.addEventListener("visibilitychange", onVisibility)
    window.addEventListener("pageshow", onVisibility)
    window.addEventListener("touchstart", resume, { passive: true })

    const section = video.closest("section")
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        if (visible) resume()
      },
      { threshold: 0.25 }
    )
    if (section) observer.observe(section)

    const timer = window.setInterval(resume, 1200)

    return () => {
      disposed = true
      window.clearInterval(timer)
      observer.disconnect()
      events.forEach((name) => video.removeEventListener(name, resume))
      document.removeEventListener("visibilitychange", onVisibility)
      window.removeEventListener("pageshow", onVisibility)
      window.removeEventListener("touchstart", resume)
    }
  }, [])

  const openHowItWorks = () => {
    router.push(`${ROUTES.agency}#how-it-works`)
  }

  return (
    <section className="h-screen bg-navy relative overflow-x-hidden">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover pointer-events-none"
        src="/hero-home.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        disablePictureInPicture
        aria-hidden="true"
        {...{ "webkit-playsinline": "true" }}
      />
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
            onClick={openHowItWorks}
          >
            {t("processHowItWorks")}
          </Button>
        </motion.div>
        </div>
      </div>

      <SectionScrollHintAnchor targetId="trade-corridors" />
    </section>
  )
}
