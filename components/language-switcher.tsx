"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import { Languages } from 'lucide-react'

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')}
      className="text-gray-300 hover:text-copper transition-colors px-3 py-2 text-sm"
    >
      <Languages className="w-4 h-4 mr-2" />
      <span className="hidden sm:inline">{language === 'en' ? 'FR' : 'EN'}</span>
      <span className="sm:hidden">{language === 'en' ? 'FR' : 'EN'}</span>
    </Button>
  )
}
