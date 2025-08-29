"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const isEn = language === 'en'

  const flags = {
    fr: { src: '/france%20(1).png', alt: 'Drapeau France', label: 'FR' },
    en: { src: '/royaume-uni.png', alt: 'Flag United Kingdom', label: 'EN' },
  } as const

  // Fermer le dropdown si on clique à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) &&
          buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLanguageChange = (newLanguage: 'fr' | 'en') => {
    setLanguage(newLanguage)
    setIsOpen(false)
  }

  return (
    <div className="inline-flex items-center relative">
      {/* Desktop: custom dropdown */}
      <div className="hidden sm:inline-flex relative">
        <Button 
          ref={buttonRef}
          variant="ghost" 
          size="sm" 
          className="px-3 py-2 text-sm inline-flex items-center gap-2 text-gray-300 hover:text-copper"
          onClick={() => setIsOpen(!isOpen)}
        >
          <img
            src={isEn ? flags.en.src : flags.fr.src}
            alt={isEn ? flags.en.alt : flags.fr.alt}
            width={16}
            height={16}
            style={{ display: 'inline-block', borderRadius: 2 }}
          />
          <span>{isEn ? flags.en.label : flags.fr.label}</span>
        </Button>
        
        {/* Custom Dropdown Menu */}
        {isOpen && (
          <div 
            ref={dropdownRef}
            className="absolute top-full left-0 mt-2 min-w-[160px] bg-white border border-gray-200 rounded-md shadow-xl z-[9999]"
            style={{ zIndex: 9999 }}
          >
            <div 
              className="py-1"
            >
              <button
                onClick={() => handleLanguageChange('fr')}
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
              >
                <img src={flags.fr.src} alt={flags.fr.alt} width={16} height={16} style={{ display: 'inline-block', borderRadius: 2 }} />
                <span>Français</span>
              </button>
              <button
                onClick={() => handleLanguageChange('en')}
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
              >
                <img src={flags.en.src} alt={flags.en.alt} width={16} height={16} style={{ display: 'inline-block', borderRadius: 2 }} />
                <span>English</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Mobile: side-by-side buttons */}
      <div className="sm:hidden inline-flex items-center gap-2">
        <Button
          variant={isEn ? "secondary" : "default"}
          size="sm"
          onClick={() => setLanguage('fr')}
          className="px-2 py-2 bg-transparent hover:bg-white/10 text-gray-300 hover:text-white border border-white/10"
        >
          <span className="inline-flex items-center gap-1">
            <img src={flags.fr.src} alt={flags.fr.alt} width={16} height={16} style={{ display: 'inline-block', borderRadius: 2 }} />
            <span>FR</span>
          </span>
        </Button>
        <Button
          variant={!isEn ? "secondary" : "default"}
          size="sm"
          onClick={() => setLanguage('en')}
          className="px-2 py-2 bg-transparent hover:bg-white/10 text-gray-300 hover:text-white border border-white/10"
        >
          <span className="inline-flex items-center gap-1">
            <img src={flags.en.src} alt={flags.en.alt} width={16} height={16} style={{ display: 'inline-block', borderRadius: 2 }} />
            <span>EN</span>
          </span>
        </Button>
      </div>
    </div>
  )
}
