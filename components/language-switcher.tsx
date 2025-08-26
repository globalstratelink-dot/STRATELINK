"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  const isEn = language === 'en'

  const flags = {
    fr: { src: '/france%20(1).png', alt: 'Drapeau France', label: 'FR' },
    en: { src: '/royaume-uni.png', alt: 'Flag United Kingdom', label: 'EN' },
  } as const

  return (
    <div className="inline-flex items-center">
      {/* Desktop: dropdown */}
      <div className="hidden sm:inline-flex">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="px-3 py-2 text-sm inline-flex items-center gap-2 text-gray-300 hover:text-copper">
              <img
                src={isEn ? flags.en.src : flags.fr.src}
                alt={isEn ? flags.en.alt : flags.fr.alt}
                width={16}
                height={16}
                style={{ display: 'inline-block', borderRadius: 2 }}
              />
              <span>{isEn ? flags.en.label : flags.fr.label}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-[160px] flex flex-col">
            <DropdownMenuItem onClick={() => setLanguage('fr')} className="inline-flex items-center gap-2">
              <img src={flags.fr.src} alt={flags.fr.alt} width={16} height={16} style={{ display: 'inline-block', borderRadius: 2 }} />
              <span>Français</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLanguage('en')} className="inline-flex items-center gap-2">
              <img src={flags.en.src} alt={flags.en.alt} width={16} height={16} style={{ display: 'inline-block', borderRadius: 2 }} />
              <span>English</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
