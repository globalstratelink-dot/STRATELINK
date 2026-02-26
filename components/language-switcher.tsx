"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import { ChevronDown } from "lucide-react"

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const flags = {
    fr: { src: '/france%20(1).png', alt: 'Drapeau France', label: 'FR' },
    en: { src: '/royaume-uni.png', alt: 'Flag United Kingdom', label: 'EN' },
  } as const

  // Fermer le dropdown si on clique à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleLanguageChange = (newLanguage: 'fr' | 'en') => {
    console.log('🔄 Changement de langue vers:', newLanguage)
    setLanguage(newLanguage)
    setIsOpen(false)
  }

  const toggleMenu = () => {
    console.log('🖱️ Toggle menu, état actuel:', isOpen)
    setIsOpen(!isOpen)
  }

  return (
    <div ref={containerRef} className="relative inline-block">
      {/* Bouton principal */}
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleMenu}
        className="inline-flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:text-copper focus:outline-none"
        style={{ 
          position: 'relative',
          transform: 'none',
          boxShadow: 'none'
        }}
      >
        <img
          src={language === 'en' ? flags.en.src : flags.fr.src}
          alt={language === 'en' ? flags.en.alt : flags.fr.alt}
          width={16}
          height={16}
          style={{ borderRadius: 2 }}
        />
        <span>{language === 'en' ? flags.en.label : flags.fr.label}</span>
        <ChevronDown 
          className={`w-3 h-3 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />
      </Button>

      {/* Menu déroulant */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 min-w-[160px] bg-white border border-gray-200 rounded-lg shadow-xl z-50 overflow-hidden">
          <div className="py-1">
            {/* Option Français */}
            <button
              onClick={() => handleLanguageChange('fr')}
              className={`w-full px-4 py-3 text-left text-sm flex items-center gap-3 hover:bg-gray-50 transition-colors ${
                language === 'fr' ? 'bg-copper/10 text-copper font-medium' : 'text-gray-700'
              }`}
            >
              <img 
                src={flags.fr.src} 
                alt={flags.fr.alt} 
                width={18} 
                height={18} 
                style={{ borderRadius: 2 }} 
              />
              <span>Français</span>
              {language === 'fr' && (
                <div className="ml-auto w-2 h-2 bg-copper rounded-full"></div>
              )}
            </button>
            
            {/* Séparateur */}
            <div className="border-t border-gray-100"></div>
            
            {/* Option English */}
            <button
              onClick={() => handleLanguageChange('en')}
              className={`w-full px-4 py-3 text-left text-sm flex items-center gap-3 hover:bg-gray-50 transition-colors ${
                language === 'en' ? 'bg-copper/10 text-copper font-medium' : 'text-gray-700'
              }`}
            >
              <img 
                src={flags.en.src} 
                alt={flags.en.alt} 
                width={18} 
                height={18} 
                style={{ borderRadius: 2 }} 
              />
              <span>English</span>
              {language === 'en' && (
                <div className="ml-auto w-2 h-2 bg-copper rounded-full"></div>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}