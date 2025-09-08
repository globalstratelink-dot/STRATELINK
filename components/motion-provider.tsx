"use client"

import { useEffect, useState } from "react"
import { MotionConfig } from "framer-motion"

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    if (typeof document !== 'undefined') {
      const cls = 'disable-animations'
      if (isMobile) document.body.classList.add(cls)
      else document.body.classList.remove(cls)
    }
  }, [isMobile])

  return (
    <MotionConfig reducedMotion={isMobile ? "always" : "never"}>
      {children}
    </MotionConfig>
  )
} 