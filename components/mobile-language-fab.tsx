"use client"

import { useEffect, useRef, useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { createPortal } from "react-dom"

export function MobileLanguageFAB() {
  const [mounted, setMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const { language, setLanguage } = useLanguage()
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const buttonRef = useRef<HTMLButtonElement | null>(null)

  // Plus besoin de position dynamique - utilisation de bottom/left fixes comme WhatsApp

  const isEn = language === "en"

  const flags = {
    fr: { src: "/france%20(1).png", alt: "Drapeau France", label: "FR" },
    en: { src: "/royaume-uni.png", alt: "Flag United Kingdom", label: "EN" },
  } as const

  // Set mounted state to prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
    
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768
      setIsMobile(mobile)
      console.log('Language Button - Mobile detected:', mobile, 'Width:', window.innerWidth)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Plus besoin de gestion de position - utilisation de bottom/left fixes comme WhatsApp

  // Plus besoin de drag - bouton fixe comme WhatsApp

  const content = (
    <div
      ref={containerRef}
      className="sm:hidden select-none touch-none pointer-events-none"
      style={{ 
        position: 'fixed',
        left: '16px', // Position fixe à gauche comme WhatsApp à droite
        bottom: isMobile ? '40px' : '24px', // Même logique que WhatsApp
        zIndex: 60,
        transition: 'all 0.2s ease', // Animation fluide comme WhatsApp
        // Styles robustes pour éviter le mouvement sur mobile - identiques à WhatsApp
        transform: 'translateZ(0)',
        WebkitTransform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        willChange: 'transform',
        transformStyle: 'preserve-3d',
        WebkitTransformStyle: 'preserve-3d',
      }}
    >
      {/* Bouton de langue - TOUJOURS VISIBLE ET FIXE */}
      <Button
        ref={buttonRef}
        aria-label="Change language"
        onClick={() => setOpen(!open)}
        className="rounded-full w-14 h-14 p-0 bg-copper text-navy shadow-lg pointer-events-auto"
        style={{
          // Désactiver complètement le drag sur mobile
          touchAction: 'manipulation',
          userSelect: 'none',
          // Styles robustes pour éviter le mouvement sur mobile - identiques à WhatsApp
          transform: 'translateZ(0)',
          WebkitTransform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          willChange: 'transform',
          transformStyle: 'preserve-3d',
          WebkitTransformStyle: 'preserve-3d',
        }}
        onMouseEnter={(e) => {
          if (!isMobile) {
            e.currentTarget.style.backgroundColor = '#d97706' // copper/90
          }
        }}
        onMouseLeave={(e) => {
          if (!isMobile) {
            e.currentTarget.style.backgroundColor = '#d97706' // copper
          }
        }}
        onTouchStart={(e) => {
          e.currentTarget.style.transform = 'translateZ(0) scale(0.95)'
        }}
        onTouchEnd={(e) => {
          e.currentTarget.style.transform = 'translateZ(0) scale(1)'
        }}
      >
        <img
          src={isEn ? flags.en.src : flags.fr.src}
          alt={isEn ? flags.en.alt : flags.fr.alt}
          width={24}
          height={24}
          style={{ 
            display: 'inline-block', 
            borderRadius: 3,
            // Empêcher le mouvement de l'image
            transform: 'translateZ(0)',
            WebkitTransform: 'translateZ(0)',
          }}
        />
      </Button>

      {/* Menu des langues - AFFICHÉ AU-DESSUS du bouton avec positionnement absolu */}
      {open && (
        <div 
          className="absolute bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-2 shadow-lg pointer-events-auto"
          style={{
            bottom: '100%', // Position au-dessus du bouton
            left: '0',
            marginBottom: '8px', // Espacement entre le menu et le bouton
            minWidth: '120px', // Largeur minimale du menu
            // Styles robustes pour éviter le mouvement sur mobile
            transform: 'translateZ(0)',
            WebkitTransform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            willChange: 'transform',
            transformStyle: 'preserve-3d',
            WebkitTransformStyle: 'preserve-3d',
          }}
        >
          <div className="flex flex-col gap-2">
            <Button
              variant={isEn ? "secondary" : "default"}
              size="sm"
              onClick={() => {
                setLanguage("fr")
                setOpen(false)
              }}
              className="px-3 py-2 bg-transparent hover:bg-white/10 text-white border border-white/10 w-full justify-start"
              style={{
                // Styles robustes pour éviter le mouvement sur mobile
                transform: 'translateZ(0)',
                WebkitTransform: 'translateZ(0)',
              }}
            >
              <span className="inline-flex items-center gap-2">
                <img 
                  src={flags.fr.src} 
                  alt={flags.fr.alt} 
                  width={18} 
                  height={18} 
                  style={{ 
                    display: 'inline-block', 
                    borderRadius: 2,
                    // Empêcher le mouvement de l'image
                    transform: 'translateZ(0)',
                    WebkitTransform: 'translateZ(0)',
                  }} 
                />
                <span>Français</span>
              </span>
            </Button>
            <Button
              variant={!isEn ? "secondary" : "default"}
              size="sm"
              onClick={() => {
                setLanguage("en")
                setOpen(false)
              }}
              className="px-3 py-2 bg-transparent hover:bg-white/10 text-white border border-white/10 w-full justify-start"
              style={{
                // Styles robustes pour éviter le mouvement sur mobile
                transform: 'translateZ(0)',
                WebkitTransform: 'translateZ(0)',
              }}
            >
              <span className="inline-flex items-center gap-2">
                <img 
                  src={flags.en.src} 
                  alt={flags.en.alt} 
                  width={18} 
                  height={18} 
                  style={{ 
                    display: 'inline-block', 
                    borderRadius: 2,
                    // Empêcher le mouvement de l'image
                    transform: 'translateZ(0)',
                    WebkitTransform: 'translateZ(0)',
                  }} 
                />
                <span>English</span>
              </span>
            </Button>
          </div>
        </div>
      )}
    </div>
  )

  if (!mounted || typeof window === 'undefined') return null
  return createPortal(content, document.body)
}
