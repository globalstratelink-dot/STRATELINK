"use client"

import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/language-context"
import { Zap, Shield, Globe, Users, ArrowRight, Crown, TrendingUp, CheckCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function AgencyContent() {
  const { t } = useLanguage()

  const features = [
    {
      id: 1,
      icon: Zap,
      title: t('rapidReliableDeployment'),
      description: t('rapidReliableDeploymentDesc'),
      color: "from-copper to-sand"
    },
    {
      id: 2,
      icon: Shield,
      title: t('turnkeySolutions'),
      description: t('turnkeySolutionsDesc'),
      color: "from-sand to-copper"
    },
    {
      id: 3,
      icon: Globe,
      title: t('privilegedMarketAccess'),
      description: t('privilegedMarketAccessDesc'),
      color: "from-copper/80 to-sand/80"
    },
    {
      id: 4,
      icon: Users,
      title: t('customerAcquisitionRetention'),
      description: t('customerAcquisitionRetentionDesc'),
      color: "from-sand/80 to-copper/80"
    }
  ]

  return (
    <div className="min-h-screen bg-navy">
      {/* Hero Section */}
      <section className="pt-24 md:pt-32 pb-16 bg-gradient-to-br from-navy via-navy to-navy/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="inline-flex items-center px-6 py-3 bg-copper/10 border border-copper/20 rounded-full text-copper text-lg font-medium mb-8"
            >
              <Crown className="w-5 h-5 mr-2" />
              {t('agency')}
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
            >
              {t('whyChooseStratelinkGlobal')}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-xl md:text-2xl text-copper font-semibold mb-4"
            >
              {t('excellenceAtServiceOfGrowth')}
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
            >
              {t('discoverWhatDistinguishesUs')}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-gradient-to-b from-navy/95 to-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="bg-navy/50 backdrop-blur-sm border border-copper/20 rounded-3xl p-8 hover:border-copper/40 transition-all duration-300 h-full">
                  <CardContent className="p-0">
                    <div className="flex items-start space-x-6">
                      {/* Number Badge */}
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-gradient-to-br from-copper to-sand rounded-2xl flex items-center justify-center text-navy font-bold text-xl">
                          {feature.id}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="w-12 h-12 bg-copper/20 rounded-xl flex items-center justify-center">
                            <feature.icon className="w-6 h-6 text-copper" />
                          </div>
                          <h3 className="text-2xl font-bold text-white">
                            {feature.title}
                          </h3>
                        </div>
                        <p className="text-gray-300 leading-relaxed text-lg">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gradient-to-br from-navy via-navy to-navy/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <div className="inline-flex items-center px-4 py-2 bg-copper/10 border border-copper/20 rounded-full text-copper text-sm font-medium">
                  {t('aboutStratelinkGlobal')}
                </div>
                
                <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
                  {t('orchestratorOfInternationalGrowth')}
                </h2>
                
                <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
                  <p>{t('aboutStratelinkDescription1')}</p>
                  <p className="text-copper font-semibold">{t('aboutStratelinkDescription2')}</p>
                  <p>{t('aboutStratelinkDescription3')}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-copper to-sand text-navy font-bold text-lg px-8 py-4 hover:scale-105 transition-transform duration-200"
                  asChild
                >
                  <Link href="/contact">
                    {t('contactUs')}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-copper text-copper hover:bg-copper hover:text-navy px-8 py-4"
                  asChild
                >
                  <Link href="/services">
                    {t('viewAllServices')}
                  </Link>
                </Button>
              </div>
            </motion.div>

            {/* Right Content - Stats */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="grid grid-cols-2 gap-6">
                {[
                  { number: "500+", label: t('globalClients'), icon: Globe },
                  { number: "50+", label: t('countries'), icon: TrendingUp },
                  { number: "1200+", label: t('statsProjectsCompleted'), icon: CheckCircle },
                  { number: "99%", label: t('statsClientSatisfaction'), icon: Crown }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-navy/50 backdrop-blur-sm border border-copper/20 rounded-2xl p-6 text-center hover:border-copper/40 transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-copper/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <stat.icon className="w-6 h-6 text-copper" />
                    </div>
                    <div className="text-3xl font-bold text-copper mb-2">{stat.number}</div>
                    <div className="text-gray-300 text-sm">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
} 