"use client"

import { useEffect, useState } from "react"
import { useLanguage } from "@/contexts/language-context"

export function StatsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [counts, setCounts] = useState({
    clients: 0,
    countries: 0,
    projects: 0,
    satisfaction: 0
  })
  const { t } = useLanguage()

  const finalCounts = {
    clients: 500,
    countries: 50,
    projects: 1200,
    satisfaction: 99
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const element = document.getElementById('stats-section')
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (isVisible) {
      const duration = 2000
      const steps = 60
      const stepDuration = duration / steps

      let step = 0
      const timer = setInterval(() => {
        step++
        const progress = step / steps

        setCounts({
          clients: Math.floor(finalCounts.clients * progress),
          countries: Math.floor(finalCounts.countries * progress),
          projects: Math.floor(finalCounts.projects * progress),
          satisfaction: Math.floor(finalCounts.satisfaction * progress)
        })

        if (step >= steps) {
          clearInterval(timer)
          setCounts(finalCounts)
        }
      }, stepDuration)

      return () => clearInterval(timer)
    }
  }, [isVisible])

  const stats = [
    {
      number: counts.clients,
      suffix: "+",
      label: t('statsGlobalClients'),
      description: t('statsGlobalClientsDesc')
    },
    {
      number: counts.countries,
      suffix: "+",
      label: t('statsCountriesServed'),
      description: t('statsCountriesServedDesc')
    },
    {
      number: counts.projects,
      suffix: "+",
      label: t('statsProjectsCompleted'),
      description: t('statsProjectsCompletedDesc')
    },
    {
      number: counts.satisfaction,
      suffix: "%",
      label: t('statsClientSatisfaction'),
      description: t('statsClientSatisfactionDesc')
    }
  ]

  return (
    <section id="stats-section" className="py-20 bg-gradient-to-r from-copper/10 via-sand/10 to-copper/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            {t('statsTitle')}
            <span className="block text-copper">{t('statsSubtitle')}</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {t('statsDescription')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className={`text-center transform transition-all duration-1000 delay-${index * 200} ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
            >
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-copper/20 to-sand/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                <div className="relative bg-navy/50 backdrop-blur-sm border border-copper/20 rounded-3xl p-8 group-hover:border-copper/50 transition-all duration-300">
                  <div className="text-5xl lg:text-6xl font-bold text-copper mb-2">
                    {stat.number}{stat.suffix}
                  </div>
                  <div className="text-white font-semibold text-lg mb-2">
                    {stat.label}
                  </div>
                  <div className="text-gray-300 text-sm">
                    {stat.description}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
