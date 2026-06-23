"use client"

import { usePathname } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { MobileLanguageFAB } from "@/components/mobile-language-fab"

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname.startsWith("/adminAbdelhamid")

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
          <MobileLanguageFAB />
        </>
      )}
    </>
  )
}
