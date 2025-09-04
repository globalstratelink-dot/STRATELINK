"use client"

import { useEffect, useRef, useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { createPortal } from "react-dom"

export function MobileLanguageFAB() {
  const [mounted, setMounted] = useState(false)
  const { language, setLanguage } = useLanguage()
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const buttonRef = useRef<HTMLButtonElement | null>(null)

  // Draggable position (pixels from top-left) - Position par défaut en bas à gauche
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 16, y: 200 })
  const dragState = useRef<{ dragging: boolean; startX: number; startY: number; origX: number; origY: number }>({ dragging: false, startX: 0, startY: 0, origX: 0, origY: 0 })

  const isEn = language === "en"

  const flags = {
    fr: { src: "/france%20(1).png", alt: "Drapeau France", label: "FR" },
    en: { src: "/royaume-uni.png", alt: "Flag United Kingdom", label: "EN" },
  } as const

  // Set mounted state to prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Load saved position
  useEffect(() => {
    if (!mounted) return
    try {
      // FORCER LA NOUVELLE POSITION - Ignorer temporairement localStorage
      // const saved = localStorage.getItem("mobileLanguageFabPos")
      // if (saved) {
      //   const parsed = JSON.parse(saved) as { x: number; y: number }
      //   // Vérifier si la position sauvegardée est trop haute, si oui, utiliser la nouvelle position par défaut
      //   const size = 56
      //   const padding = 16
      //   const isMobile = window.innerWidth <= 768
      //   const bottom = isMobile ? 40 : 24 // Exactement la même hauteur que WhatsApp
      //   const newDefaultY = window.innerHeight - (size + bottom)
      //   
      //   if (parsed.y < newDefaultY - 20) { // Si la position sauvegardée est plus haute que la nouvelle position par défaut
      //     console.log('Position sauvegardée trop haute, utilisation de la nouvelle position par défaut')
      //     setPosition({ x: padding, y: newDefaultY })
      //     // Mettre à jour le localStorage avec la nouvelle position
      //     localStorage.setItem("mobileLanguageFabPos", JSON.stringify({ x: padding, y: newDefaultY }))
      //   } else {
      //     setPosition(parsed)
      //   }
      // } else {
        // Default: bottom-left, exactement au même niveau que WhatsApp
        const size = 56
        const padding = 16
        const isMobile = window.innerWidth <= 768
        const bottom = isMobile ? 40 : 24 // Exactement la même hauteur que WhatsApp
        const y = window.innerHeight - (size + bottom)
        console.log('🔄 Nouvelle position du bouton de langue:', { x: padding, y, bottom, isMobile })
        setPosition({ x: padding, y }) // Position à gauche
        // Mettre à jour le localStorage avec la nouvelle position
        localStorage.setItem("mobileLanguageFabPos", JSON.stringify({ x: padding, y }))
      // }
    } catch {}
  }, [mounted])

  // Clamp position on resize
  useEffect(() => {
    if (!mounted) return
    const onResize = () => {
      const size = 56
      const padding = 8
      setPosition((pos) => ({
        x: Math.min(Math.max(padding, pos.x), window.innerWidth - size - padding),
        y: Math.min(Math.max(padding, pos.y), window.innerHeight - size - padding),
      }))
    }
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [mounted])

  // Drag handlers using pointer events (attach to button only so page scroll remains natural)
  useEffect(() => {
    if (!mounted) return
    const el = buttonRef.current
    if (!el) return

    // Désactiver complètement le drag and drop sur mobile pour que le bouton reste fixe
    const checkMobile = () => {
      const isMobile = window.innerWidth <= 768
      if (isMobile) {
        console.log('📱 Mode mobile détecté - Bouton de langue fixe (pas de drag)')
        return true
      }
      return false
    }

    // Vérifier si on est sur mobile
    if (checkMobile()) {
      return
    }

    const onPointerDown = (e: PointerEvent) => {
      // Vérifier à nouveau si on est sur mobile avant de permettre le drag
      if (checkMobile()) return
      
      el.setPointerCapture(e.pointerId)
      dragState.current = {
        dragging: true,
        startX: e.clientX,
        startY: e.clientY,
        origX: position.x,
        origY: position.y,
      }
    }

    const onPointerMove = (e: PointerEvent) => {
      if (!dragState.current.dragging) return
      // Vérifier à nouveau si on est sur mobile
      if (checkMobile()) return
      
      const dx = e.clientX - dragState.current.startX
      const dy = e.clientY - dragState.current.startY
      const size = 56
      const padding = 8
      const nextX = Math.min(Math.max(padding, dragState.current.origX + dx), window.innerWidth - size - padding)
      const nextY = Math.min(Math.max(padding, dragState.current.origY + dy), window.innerHeight - size - padding)
      setPosition({ x: nextX, y: nextY })
    }

    const onPointerUp = () => {
      if (!dragState.current.dragging) return
      // Vérifier à nouveau si on est sur mobile
      if (checkMobile()) return
      
      dragState.current.dragging = false
      try {
        localStorage.setItem("mobileLanguageFabPos", JSON.stringify(position))
      } catch {}
    }

    el.addEventListener("pointerdown", onPointerDown)
    window.addEventListener("pointermove", onPointerMove)
    window.addEventListener("pointerup", onPointerUp)

    return () => {
      el.removeEventListener("pointerdown", onPointerDown)
      window.removeEventListener("pointermove", onPointerMove)
      window.removeEventListener("pointerup", onPointerUp)
    }
  }, [position, mounted])

  const content = (
    <div
      ref={containerRef}
      className="sm:hidden fixed z-[60] select-none touch-none pointer-events-none"
      style={{ left: position.x, top: position.y }}
    >
      {/* Bouton de langue - TOUJOURS VISIBLE ET FIXE */}
      <Button
        ref={buttonRef}
        aria-label="Change language"
        onClick={() => setOpen(!open)}
        className="rounded-full w-14 h-14 p-0 bg-copper text-navy hover:bg-copper/90 shadow-lg pointer-events-auto"
        style={{
          // Désactiver complètement le drag sur mobile
          touchAction: 'manipulation',
          userSelect: 'none',
        }}
      >
        <img
          src={isEn ? flags.en.src : flags.fr.src}
          alt={isEn ? flags.en.alt : flags.fr.alt}
          width={24}
          height={24}
          style={{ display: 'inline-block', borderRadius: 3 }}
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
            minWidth: '120px' // Largeur minimale du menu
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
            >
              <span className="inline-flex items-center gap-2">
                <img src={flags.fr.src} alt={flags.fr.alt} width={18} height={18} style={{ display: 'inline-block', borderRadius: 2 }} />
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
            >
              <span className="inline-flex items-center gap-2">
                <img src={flags.en.src} alt={flags.en.alt} width={18} height={18} style={{ display: 'inline-block', borderRadius: 2 }} />
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
