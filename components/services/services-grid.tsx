"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingUp, Globe, Shield, Zap, Target, Users, ArrowRight, CheckCircle } from 'lucide-react'
import { useState } from "react"
import { useLanguage } from "@/contexts/language-context"

export function ServicesGrid() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const { t } = useLanguage()

  const services = [
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: t('strategicConsulting'),
      description: t('strategicConsultingDesc'),
      features: ["Market Analysis", "Growth Planning", "Risk Assessment", "Performance Optimization"],
      color: "from-copper to-sand"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: t('globalExpansion'),
      description: t('globalExpansionDesc'),
      features: ["Market Entry", "Cultural Adaptation", "Regulatory Compliance", "Local Partnerships"],
      color: "from-sand to-copper"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: t('riskManagement'),
      description: t('riskManagementDesc'),
      features: ["Risk Analysis", "Compliance Monitoring", "Crisis Management", "Insurance Solutions"],
      color: "from-copper/80 to-sand/80"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: t('digitalTransformation'),
      description: t('digitalTransformationDesc'),
      features: ["Process Automation", "Cloud Migration", "AI Integration", "Digital Strategy"],
      color: "from-sand/80 to-copper/80"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: t('performanceAnalytics'),
      description: t('performanceAnalyticsDesc'),
      features: ["KPI Tracking", "Predictive Analytics", "Business Intelligence", "Custom Dashboards"],
      color: "from-copper to-sand"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: t('teamDevelopment'),
      description: t('teamDevelopmentDesc'),
      features: ["Leadership Training", "Skill Development", "Team Building", "Performance Coaching"],
      color: "from-sand to-copper"
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-navy to-navy/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index}
              className={`bg-navy/50 border-copper/20 hover:border-copper/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 group cursor-pointer ${
                hoveredCard === index ? 'shadow-2xl shadow-copper/20' : ''
              }`}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <CardHeader className="relative overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                <div className="relative">
                  <div className="w-16 h-16 bg-copper/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-copper/20 transition-colors duration-300">
                    <div className="text-copper group-hover:scale-110 transition-transform duration-300">
                      {service.icon}
                    </div>
                  </div>
                  <CardTitle className="text-white text-xl mb-2 group-hover:text-copper transition-colors duration-300">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                    {service.description}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="relative">
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                      <CheckCircle className="w-4 h-4 text-copper mr-2 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  variant="outline" 
                  className="w-full border-copper/30 text-copper hover:bg-copper hover:text-navy group-hover:border-copper transition-all duration-300"
                >
                  {t('learnMore')}
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
