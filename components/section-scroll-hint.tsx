"use client"

import { motion } from "framer-motion"
import { ChevronDown, ChevronUp } from "lucide-react"
import { usePathname } from "next/navigation"
import { createPortal } from "react-dom"
import { useCallback, useEffect, useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import { cn } from "@/lib/utils"

const SCROLL_HINT_PAGES = ["/home", "/activities", "/about-us"]

/** Invisible marker — paired with the fixed SectionScrollFloat button. */
export function SectionScrollHintAnchor({ targetId }: { targetId: string }) {
  return <span data-scroll-hint data-scroll-next={targetId} className="sr-only" aria-hidden />
}

/** @deprecated No extra section padding needed with the fixed scroll button. */
export const sectionWithScrollHintClass = ""

function useScrollHintState(enabled: boolean) {
  const [isAtBottom, setIsAtBottom] = useState(false)
  const [nextTargetId, setNextTargetId] = useState<string | null>(null)

  const update = useCallback(() => {
    const scrollHeight = document.documentElement.scrollHeight
    const atBottom = window.scrollY + window.innerHeight >= scrollHeight - 120
    setIsAtBottom(atBottom)

    if (atBottom) {
      setNextTargetId(null)
      return
    }

    const markers = Array.from(document.querySelectorAll<HTMLElement>("[data-scroll-hint]"))
    const triggerY = window.innerHeight * 0.4
    let activeNext: string | null = null

    for (const marker of markers) {
      const section = marker.closest("section") ?? marker.parentElement
      if (!section) continue
      const { top, bottom } = section.getBoundingClientRect()
      if (top <= triggerY && bottom > 0) {
        activeNext = marker.getAttribute("data-scroll-next")
      }
    }

    if (!activeNext && markers[0]) {
      activeNext = markers[0].getAttribute("data-scroll-next")
    }

    setNextTargetId(activeNext)
  }, [])

  useEffect(() => {
    if (!enabled) return
    update()
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
    return () => {
      window.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [update, enabled])

  return { isAtBottom, nextTargetId }
}

export function SectionScrollFloat() {
  const pathname = usePathname()
  const { language } = useLanguage()
  const [mounted, setMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(true)

  const pagePath = pathname?.replace(/\/$/, "") ?? ""
  const isScrollPage = SCROLL_HINT_PAGES.includes(pagePath)
  const showScrollHint = mounted && isScrollPage && !isMobile
  const { isAtBottom, nextTargetId } = useScrollHintState(showScrollHint)

  useEffect(() => {
    setMounted(true)
    const checkMobile = () => setIsMobile(window.innerWidth <= 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const handleClick = () => {
    if (isAtBottom) {
      window.scrollTo({ top: 0, behavior: "smooth" })
      return
    }
    if (nextTargetId) {
      document.getElementById(nextTargetId)?.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  if (!showScrollHint || typeof document === "undefined") return null

  const ariaLabel = isAtBottom
    ? language === "fr"
      ? "Remonter en haut de la page"
      : "Scroll to top"
    : language === "fr"
      ? "Aller à la section suivante"
      : "Scroll to next section"

  const content = (
    <button
      type="button"
      onClick={handleClick}
      aria-label={ariaLabel}
      className="group flex flex-col items-start focus:outline-none focus-visible:ring-2 focus-visible:ring-copper focus-visible:ring-offset-2 focus-visible:ring-offset-navy rounded-full"
      style={{
        position: "fixed",
        left: "24px",
        bottom: "24px",
        zIndex: 55,
        transform: "translateZ(0)",
        WebkitTransform: "translateZ(0)",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        willChange: "transform",
        touchAction: "manipulation",
        WebkitTapHighlightColor: "transparent",
      }}
    >
      {!isAtBottom ? (
        <span
          aria-hidden
          className="ml-[1.375rem] sm:ml-6 w-0.5 h-10 sm:h-12 rounded-full bg-gradient-to-b from-transparent via-copper/50 to-copper group-hover:via-copper/80 group-hover:to-sand transition-colors"
        />
      ) : null}

      <div className={cn("relative flex items-center justify-center w-11 h-11 sm:w-[3.25rem] sm:h-[3.25rem]", isAtBottom && "mt-0")}>
        <motion.span
          aria-hidden
          className="absolute inset-0 rounded-full border-2 border-copper/50"
          animate={{ scale: [1, 1.4, 1], opacity: [0.7, 0, 0.7] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
        />
        <span
          aria-hidden
          className="absolute inset-0 rounded-full bg-navy/85 backdrop-blur-md border-2 border-copper/70 shadow-[0_0_28px_rgba(169,121,104,0.4)] group-hover:border-copper group-hover:shadow-[0_0_36px_rgba(169,121,104,0.55)] transition-all duration-300"
        />
        <motion.span
          className="relative flex items-center justify-center"
          animate={isAtBottom ? { y: [0, -5, 0] } : { y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          {isAtBottom ? (
            <ChevronUp
              className="w-6 h-6 sm:w-7 sm:h-7 text-copper group-hover:text-sand transition-colors drop-shadow-[0_0_10px_rgba(169,121,104,0.65)]"
              strokeWidth={2.5}
            />
          ) : (
            <ChevronDown
              className="w-6 h-6 sm:w-7 sm:h-7 text-copper group-hover:text-sand transition-colors drop-shadow-[0_0_10px_rgba(169,121,104,0.65)]"
              strokeWidth={2.5}
            />
          )}
        </motion.span>
      </div>

      {isAtBottom ? (
        <span
          aria-hidden
          className="ml-[1.375rem] sm:ml-6 mt-1.5 w-0.5 h-10 sm:h-12 rounded-full bg-gradient-to-t from-transparent via-copper/50 to-copper group-hover:via-copper/80 group-hover:to-sand transition-colors"
        />
      ) : null}
    </button>
  )

  return createPortal(content, document.body)
}
