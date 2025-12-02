"use client"

import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/language-context"
import { ArrowRight, Crown, TrendingUp, CheckCircle, Globe, Zap } from "lucide-react"

import { Button } from "@/components/ui/button"
import Link from "next/link"

export function AgencyContent() {
  const { t } = useLanguage()

return (
    <div className="min-h-screen bg-navy">
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { 
                    title: t('commercialDevelopment'), 
                    items: t('commercialDevelopmentItems'),
                    icon: TrendingUp,
                    color: "from-copper to-sand"
                  },
                  { 
                    title: t('brandCreationBranding'), 
                    items: t('brandCreationBrandingItems'),
                    icon: Crown,
                    color: "from-sand to-copper"
                  },
                  { 
                    title: t('internationalSourcingImportExport'), 
                    items: t('internationalSourcingImportExportItems'),
                    icon: Globe,
                    color: "from-copper/80 to-sand/80"
                  },
                  { 
                    title: t('digitalSolutionsApiSaaS'), 
                    items: t('digitalSolutionsApiSaaSItems'),
                    icon: Zap,
                    color: "from-sand/80 to-copper/80"
                  }
                ].map((service, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-navy/50 backdrop-blur-sm border border-copper/20 rounded-2xl p-6 hover:border-copper/40 transition-all duration-300 h-full"
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-copper to-sand rounded-xl flex items-center justify-center">
                        <service.icon className="w-6 h-6 text-navy" />
                      </div>
                      <h3 className="text-lg font-bold text-white leading-tight">
                        {service.title}
                      </h3>
                    </div>
                    <div className="space-y-2">
                      {service.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-copper rounded-full flex-shrink-0"></div>
                          <span className="text-gray-300 text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
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

