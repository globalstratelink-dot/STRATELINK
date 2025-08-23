"use client"

import { useLanguage } from "@/contexts/language-context"

export function ServicesHero() {
  const { t } = useLanguage()

  return (
    <section className="pt-32 pb-20 bg-gradient-to-br from-navy via-navy to-navy/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="inline-flex items-center px-4 py-2 bg-copper/10 border border-copper/20 rounded-full text-copper text-sm font-medium mb-8">
            {t('services')}
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
            {t('servicesTitle')}
            <span className="block text-copper">{t('servicesSubtitle')}</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            {t('servicesDescription')}
          </p>
        </div>
      </div>
    </section>
  )
}
