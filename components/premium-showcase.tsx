"use client"

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Award, TrendingUp, Users, Globe, Shield, Zap, Target, Crown, Sparkles, ArrowRight } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import { ScrollReveal, ScaleOnHover } from "./advanced-animations"
import { useLanguage } from "@/contexts/language-context"

export function LuxuryStats() {
  const [isVisible, setIsVisible] = useState(false)
  const [counts, setCounts] = useState({ clients: 0, value: 0, markets: 0, success: 0 })
  const { t } = useLanguage()

  const finalCounts = { clients: 500, value: 2.5, markets: 50, success: 99.8 }

  useEffect(() => {
    setIsVisible(true)
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
          value: Math.floor(finalCounts.value * progress * 10) / 10,
          markets: Math.floor(finalCounts.markets * progress),
          success: Math.floor(finalCounts.success * progress * 10) / 10
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
    { number: `${counts.clients}+`, label: t('globalClients'), icon: <Users className="w-6 h-6" /> },
    { number: `$${counts.value}B+`, label: "Valeur Créée", icon: <TrendingUp className="w-6 h-6" /> },
    { number: `${counts.markets}+`, label: t('countries'), icon: <Globe className="w-6 h-6" /> },
    { number: `${counts.success}%`, label: t('successRate'), icon: <Target className="w-6 h-6" /> }
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 my-16">
      {stats.map((stat, index) => (
        <ScrollReveal key={index} delay={index * 0.1}>
          <ScaleOnHover>
            <Card className="bg-gradient-to-br from-copper/10 to-sand/10 border-copper/30 hover:border-copper/60 transition-all duration-500 group overflow-hidden">
              <CardContent className="p-6 text-center relative">
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-copper/5 to-sand/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                <div className="w-16 h-16 bg-copper/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-copper/30 transition-colors duration-300 relative z-10">
                  <motion.div 
                    className="text-copper"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    {stat.icon}
                  </motion.div>
                </div>
                <motion.div 
                  className="text-3xl font-bold text-copper mb-2 group-hover:text-sand transition-colors duration-300 relative z-10"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-white font-medium group-hover:text-copper transition-colors duration-300 relative z-10">
                  {stat.label}
                </div>
              </CardContent>
            </Card>
          </ScaleOnHover>
        </ScrollReveal>
      ))}
    </div>
  )
}

export function ClientLogos() {
  const { t } = useLanguage()
  const clients = [
    { name: "Fortune 500", logo: "F5" },
    { name: "Global Tech", logo: "GT" },
    { name: "Financial Corp", logo: "FC" },
    { name: "Innovation Labs", logo: "IL" },
    { name: "Strategic Partners", logo: "SP" },
    { name: "Elite Ventures", logo: "EV" },
    { name: "Premium Solutions", logo: "PS" },
    { name: "Excellence Group", logo: "EG" }
  ]

  return (
    <ScrollReveal>
      <div className="py-16 bg-navy/30 backdrop-blur-sm border-y border-copper/20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="bg-copper/20 text-copper border-copper/30 mb-4 text-sm px-4 py-2">
                <Crown className="w-4 h-4 mr-2" />
                {t('approvedByIndustryLeaders')}
              </Badge>
            </motion.div>
            <motion.h3 
              className="text-3xl font-bold text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {t('ourPrestigiousClients')}
            </motion.h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {clients.map((client, index) => (
              <motion.div
                key={index}
                className="bg-navy/50 border border-copper/20 rounded-lg p-6 text-center hover:border-copper/50 transition-all duration-300 group cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="w-16 h-16 bg-copper/10 rounded-lg mx-auto mb-4 flex items-center justify-center group-hover:bg-copper/20 transition-colors duration-300">
                  <div className="text-copper font-bold text-lg">{client.logo}</div>
                </div>
                <div className="text-gray-300 text-sm font-medium group-hover:text-copper transition-colors duration-300">
                  {client.name}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </ScrollReveal>
  )
}

export function PremiumTestimonial() {
  const { t } = useLanguage()
  return (
    <ScrollReveal>
      <div className="relative bg-gradient-to-r from-copper/5 via-sand/5 to-copper/5 py-20 my-16 overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-navy/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        />
        
        {/* Floating elements */}
        <motion.div
          className="absolute top-10 left-10 w-20 h-20 bg-copper/10 rounded-full"
          animate={{ y: [-10, 10, -10], rotate: [0, 180, 360] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-16 h-16 bg-sand/10 rounded-full"
          animate={{ y: [10, -10, 10], rotate: [360, 180, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        
        <div className="relative max-w-4xl mx-auto px-4 text-center z-10">
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center mb-6">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                >
                  <Star className="w-8 h-8 text-copper fill-current mx-1" />
                </motion.div>
              ))}
            </div>
            <motion.blockquote 
              className="text-2xl lg:text-3xl text-white font-light leading-relaxed mb-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              "{t('premiumTestimonial')}"
            </motion.blockquote>
          </motion.div>
          
          <motion.div 
            className="flex items-center justify-center space-x-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <motion.div 
              className="w-20 h-20 bg-gradient-to-br from-copper/30 to-sand/30 rounded-full flex items-center justify-center border-2 border-copper/40 overflow-hidden"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
                alt="Michael Johnson"
                width={80}
                height={80}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const fallback = target.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
              <span 
                className="text-copper font-bold text-xl"
                style={{ display: 'none' }}
              >
                MJ
              </span>
            </motion.div>
            <div className="text-left">
              <div className="text-white font-semibold text-xl">Michael Johnson</div>
              <div className="text-copper font-medium">PDG, Global Dynamics Corporation</div>
              <div className="text-gray-400 text-sm">Entreprise Fortune 100</div>
            </div>
          </motion.div>
        </div>
      </div>
    </ScrollReveal>
  )
}

export function ExcellenceShowcase() {
  const { t } = useLanguage()
  const features = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Confidentiel & Sécurisé",
      description: "Sécurité bancaire pour toutes les consultations stratégiques avec certification ISO 27001",
      badge: "Niveau Entreprise",
      link: "/services"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Implémentation Rapide",
      description: "Solutions stratégiques déployées en temps record avec support 24/7",
      badge: "Voie Rapide",
      link: "/services"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Équipe Primée",
      description: "Experts reconnus par l'industrie et leaders d'opinion avec un bilan éprouvé",
      badge: "Certifié",
      link: "/about"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Résultats Garantis",
      description: "Résultats basés sur la performance avec ROI mesurable et métriques de succès",
      badge: "Axé Résultats",
      link: "/portfolio"
    }
  ]

  return (
    <ScrollReveal>
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="bg-copper/20 text-copper border-copper/30 mb-4 text-sm px-4 py-2">
              <Sparkles className="w-4 h-4 mr-2" />
              Standards d'Excellence
            </Badge>
            <motion.h2 
              className="text-4xl lg:text-5xl font-bold text-white text-center mb-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Pourquoi Choisir <span className="text-copper">Stratelink Global</span>
            </motion.h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Découvrez ce qui nous distingue dans le monde du conseil commercial
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <ScaleOnHover>
                  <Card className="bg-navy/40 border-copper/20 hover:border-copper/50 transition-all duration-500 group overflow-hidden h-full">
                    <CardContent className="p-8 relative h-full flex flex-col">
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-br from-copper/5 to-sand/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      />
                      
                      <div className="absolute top-4 right-4 z-10">
                        <Badge className="bg-copper/20 text-copper border-copper/30 text-xs">
                          {feature.badge}
                        </Badge>
                      </div>
                      
                      <div className="w-16 h-16 bg-copper/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-copper/20 transition-colors duration-300 relative z-10">
                        <motion.div 
                          className="text-copper"
                          whileHover={{ rotate: 360, scale: 1.1 }}
                          transition={{ duration: 0.5 }}
                        >
                          {feature.icon}
                        </motion.div>
                      </div>
                      
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-copper transition-colors duration-300 relative z-10">
                        {feature.title}
                      </h3>
                      
                      <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300 relative z-10 flex-grow">
                        {feature.description}
                      </p>
                      
                      <div className="mt-6 relative z-10">
                        <Button 
                          variant="outline" 
                          className="border-copper/30 text-copper hover:bg-copper hover:text-navy transition-all duration-300 group/btn"
                          asChild
                        >
                          <Link href={feature.link}>
                            {t('learnMore')}
                            <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </ScaleOnHover>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </ScrollReveal>
  )
}
