"use client"

import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

/** Extra bottom padding so section content does not overlap the scroll hint. */
export const sectionWithScrollHintClass = "relative pb-20 sm:pb-24"

/** Bottom-left anchor inside a `relative` section (use with sectionWithScrollHintClass). */
export const sectionScrollHintBottomLeftClass =
  "absolute bottom-6 sm:bottom-8 left-5 sm:left-8 lg:left-12 xl:left-16 z-40 pointer-events-auto"

type SectionScrollHintProps = {
  targetId: string
  className?: string
}

export function SectionScrollHint({ targetId, className }: SectionScrollHintProps) {
  const scrollToTarget = () => {
    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <button
      type="button"
      onClick={scrollToTarget}
      className={cn(
        "group flex flex-col items-start focus:outline-none focus-visible:ring-2 focus-visible:ring-copper focus-visible:ring-offset-2 focus-visible:ring-offset-navy rounded-full",
        className
      )}
      aria-label="Scroll to next section"
    >
      <span
        aria-hidden
        className="ml-[1.375rem] sm:ml-6 w-0.5 h-10 sm:h-12 rounded-full bg-gradient-to-b from-transparent via-copper/50 to-copper group-hover:via-copper/80 group-hover:to-sand transition-colors"
      />

      <div className="relative mt-1.5 flex items-center justify-center w-11 h-11 sm:w-[3.25rem] sm:h-[3.25rem]">
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
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown
            className="w-6 h-6 sm:w-7 sm:h-7 text-copper group-hover:text-sand transition-colors drop-shadow-[0_0_10px_rgba(169,121,104,0.65)]"
            strokeWidth={2.5}
          />
        </motion.span>
      </div>
    </button>
  )
}

export function SectionScrollHintAnchor({ targetId }: { targetId: string }) {
  return (
    <div className={sectionScrollHintBottomLeftClass}>
      <SectionScrollHint targetId={targetId} />
    </div>
  )
}
