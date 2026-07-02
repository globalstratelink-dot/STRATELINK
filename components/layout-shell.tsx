"use client"

import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { MobileLanguageFAB } from "@/components/mobile-language-fab"
import { SectionScrollFloat } from "@/components/section-scroll-hint"
import { scrollToQualifyProject } from "@/lib/scroll-to-qualify"

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname.startsWith("/adminAbdelhamid")

  useEffect(() => {
    if (typeof window === "undefined" || window.location.hash !== "#qualify-project") return
    const timer = window.setTimeout(() => scrollToQualifyProject(), 150)
    return () => window.clearTimeout(timer)
  }, [pathname])

  return (
    <>
      {!isAdmin && <Navbar />}
      {children}
      {!isAdmin && (
        <>
          <WhatsAppFloat
            phoneNumber="+971 54 319 2348"
            message="Bonjour, j'aimerais avoir plus d'informations"
          />
          <SectionScrollFloat />
          <MobileLanguageFAB />
        </>
      )}
    </>
  )
}
