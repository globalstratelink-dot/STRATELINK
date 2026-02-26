"use client"

import { useLanguage } from "@/contexts/language-context"
import Image from "next/image"

export function AboutHero() {
  const { t } = useLanguage()

  return (
    <section className="pt-32 pb-20 bg-gradient-to-br from-navy via-navy to-navy/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center px-4 py-2 bg-copper/10 border border-copper/20 rounded-full text-copper text-sm font-medium mb-8">
              {t('agency')}
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {t('agencyTitle')}
              <span className="block text-copper">{t('agencySubtitle')}</span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              {t('agencyDescription1')}
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              {t('agencyDescription2')}
            </p>
          </div>
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-80 h-80 bg-gradient-to-br from-copper/20 to-sand/20 rounded-3xl blur-3xl absolute inset-0"></div>
              <div className="relative bg-navy/50 backdrop-blur-sm border border-copper/20 rounded-3xl p-8 text-center">
                <Image
                  src="/logo.png"
                  alt="STRATELINK GLOBAL"
                  width={120}
                  height={120}
                  className="mx-auto mb-6"
                />
                <div className="text-4xl font-bold text-copper mb-2">13+</div>
                <div className="text-white font-semibold mb-1">{t('yearsOfExcellence')}</div>
                <div className="text-gray-300 text-sm">{t('deliveringStrategic')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
