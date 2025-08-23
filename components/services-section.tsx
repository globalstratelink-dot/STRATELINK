"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Ship, Globe, Truck, FileText, TrendingUp, Package, ArrowRight, CheckCircle } from 'lucide-react'
import { useState } from "react"
import { motion } from 'framer-motion'
import { useLanguage } from "@/contexts/language-context"
import { ScrollReveal, ScaleOnHover } from "./advanced-animations"
import Link from "next/link"

export function ServicesSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const { t } = useLanguage()

  const services = [
    {
      icon: <Ship className="w-8 h-8" />,
      title: t('importServices'),
      description: t('importServicesDesc'),
      features: ["Sourcing & Procurement", "Quality Control", "Import Documentation", "Port Handling"],
      color: "from-copper to-sand",
      link: "/services"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: t('exportServices'),
      description: t('exportServicesDesc'),
      features: ["Market Research", "Export Documentation", "Market Access", "Trade Compliance"],
      color: "from-sand to-copper",
      link: "/services"
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: t('logisticsSolutions'),
      description: t('logisticsSolutionsDesc'),
      features: ["Freight Forwarding", "Warehousing", "Distribution", "Real-time Tracking"],
      color: "from-copper/80 to-sand/80",
      link: "/services"
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: t('customsClearance'),
      description: t('customsClearanceDesc'),
      features: ["Documentation", "Customs Procedures", "Duty Calculation", "Compliance"],
      color: "from-sand/80 to-copper/80",
      link: "/services"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: t('tradeConsulting'),
      description: t('tradeConsultingDesc'),
      features: ["Market Entry Strategy", "Trade Regulations", "Risk Assessment", "Business Expansion"],
      color: "from-copper to-sand",
      link: "/services"
    },
    {
      icon: <Package className="w-8 h-8" />,
      title: t('supplyChain'),
      description: t('supplyChainDesc'),
      features: ["Supply Chain Design", "Inventory Management", "Vendor Management", "Performance Analytics"],
      color: "from-sand to-copper",
      link: "/about"
    }
  ]

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-navy to-navy/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-12 sm:mb-16">
            <motion.div
              className="inline-flex items-center px-3 sm:px-4 py-2 bg-copper/10 border border-copper/20 rounded-full text-copper text-xs sm:text-sm font-medium mb-4"
              whileHover={{ scale: 1.05 }}
            >
              {t('services')}
            </motion.div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
              {t('servicesTitle')}
              <span className="block text-copper">{t('servicesSubtitle')}</span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto">
              {t('servicesDescription')}
            </p>
          </div>
        </ScrollReveal>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <ScaleOnHover>
                <Card 
                  className={`bg-navy/50 border-copper/20 hover:border-copper/50 transition-all duration-500 group cursor-pointer h-full ${
                    hoveredCard === index ? 'shadow-2xl shadow-copper/20' : ''
                  }`}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <CardHeader className="relative overflow-hidden">
                    <motion.div 
                      className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                    />
                    <div className="relative">
                      <div className="w-16 h-16 bg-copper/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-copper/20 transition-colors duration-300">
                        <motion.div 
                          className="text-copper"
                          whileHover={{ rotate: 360, scale: 1.1 }}
                          transition={{ duration: 0.5 }}
                        >
                          {service.icon}
                        </motion.div>
                      </div>
                      <CardTitle className="text-white text-xl mb-2 group-hover:text-copper transition-colors duration-300">
                        {service.title}
                      </CardTitle>
                      <CardDescription className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                        {service.description}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="relative flex-grow flex flex-col">
                    <ul className="space-y-2 mb-6 flex-grow">
                      {service.features.map((feature, featureIndex) => (
                        <motion.li 
                          key={featureIndex} 
                          className="flex items-center text-gray-300 group-hover:text-gray-200 transition-colors duration-300"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: featureIndex * 0.1 }}
                        >
                          <CheckCircle className="w-4 h-4 text-copper mr-2 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                    <Button 
                      variant="outline" 
                      className="w-full border-copper/30 text-copper hover:bg-copper hover:text-navy group-hover:border-copper transition-all duration-300"
                      asChild
                    >
                      <Link href={service.link}>
                        {t('learnMore')}
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </ScaleOnHover>
            </ScrollReveal>
          ))}
        </div>

        {/* CTA */}
        <ScrollReveal delay={0.8}>
          <div className="text-center mt-16">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg" 
                className="bg-copper hover:bg-copper/90 text-navy font-semibold px-8 py-4 relative overflow-hidden group"
                asChild
              >
                <Link href="/services">
                  <span className="relative z-10">{t('viewAllServices')}</span>
                  <ArrowRight className="ml-2 w-5 h-5 relative z-10" />
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-sand to-copper"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "0%" }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </Button>
            </motion.div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
