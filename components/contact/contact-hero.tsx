"use client"

import { useLanguage } from "@/contexts/language-context"

export function ContactHero() {
  const { t } = useLanguage()

  return (
    <section className="pt-32 pb-2 bg-gradient-to-br from-navy via-navy to-navy/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="inline-flex items-center px-4 py-2 bg-copper/10 border border-copper/20 rounded-full text-copper text-sm font-medium mb-2">
            {t('contact')}
          </div>
        </div>
      </div>
    </section>
  )
}
