"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Award, Users, Globe, TrendingUp, Ship, Package } from 'lucide-react'
import { useState, useEffect } from "react"
import { useLanguage } from "@/contexts/language-context"

export function AboutSection() {
  const [isVisible, setIsVisible] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const element = document.getElementById('about-section')
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const achievements = [
    {
      icon: <Award className="w-8 h-8 text-copper" />,
      title: t('tradeExcellence'),
      description: t('tradeExcellenceDesc')
    },
    {
      icon: <Users className="w-8 h-8 text-copper" />,
      title: t('globalNetwork'),
      description: t('globalNetworkDesc')
    },
    {
      icon: <Globe className="w-8 h-8 text-copper" />,
      title: t('worldwideReach'),
      description: t('worldwideReachDesc')
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-copper" />,
      title: t('provenResults'),
      description: t('provenResultsDesc')
    }
  ]

  return (
    <section id="about-section" className="py-20 bg-gradient-to-b from-navy/95 to-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className={`space-y-8 transform transition-all duration-1000 ${
            isVisible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
          }`}>
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-copper/10 border border-copper/20 rounded-full text-copper text-sm font-medium">
                {t('aboutGlobalTradeSolutions')}
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
                {t('aboutTitle')}
                <span className="block text-copper">{t('aboutSubtitle')}</span>
              </h2>
              
              <p className="text-lg text-gray-300 leading-relaxed">
                {t('aboutDescription1')}
              </p>
              
              <p className="text-lg text-gray-300 leading-relaxed">
                {t('aboutDescription2')}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-copper hover:bg-copper/90 text-navy font-semibold px-8 py-4 transform hover:scale-105 transition-all duration-300 group"
              >
                {t('ourStory')}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-copper text-copper hover:bg-copper hover:text-navy px-8 py-4"
              >
                {t('meetOurTeam')}
              </Button>
            </div>
          </div>

          {/* Right Content - Achievements */}
          <div className={`transform transition-all duration-1000 delay-300 ${
            isVisible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
          }`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {achievements.map((achievement, index) => (
                <Card 
                  key={index}
                  className="bg-navy/50 border-copper/20 hover:border-copper/50 transition-all duration-500 transform hover:scale-105 group"
                >
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-copper/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-copper/20 transition-colors duration-300">
                      {achievement.icon}
                    </div>
                    <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-copper transition-colors duration-300">
                      {achievement.title}
                    </h3>
                    <p className="text-gray-300 text-sm group-hover:text-gray-200 transition-colors duration-300">
                      {achievement.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Decorative Element */}
            <div className="mt-8 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-copper/20 to-sand/20 rounded-3xl blur-3xl"></div>
              <div className="relative bg-navy/30 backdrop-blur-sm border border-copper/20 rounded-3xl p-8 text-center">
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
