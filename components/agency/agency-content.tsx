"use client"

import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/language-context"
import { ArrowRight, Lightbulb, Map, Play, CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import Link from "next/link"

export function AgencyContent() {
  const { t } = useLanguage()

return (
    <div className="min-h-screen bg-navy">
      {/* About Section */}
      <section className="py-20 bg-gradient-to-br from-navy via-navy to-navy/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Content */}
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

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex justify-center lg:justify-end"
            >
              <div className="relative max-w-lg mx-auto lg:mx-0">
                {/* Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-copper/20 via-transparent to-sand/20 rounded-3xl blur-2xl"></div>
                
                {/* Image Container */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-copper/20">
                  <img
                    src="/workss.webp"
                    alt="STRATELINK GLOBAL Agency"
                    className="w-full h-auto object-cover"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-transparent"></div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gradient-to-br from-navy/95 to-navy relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="inline-flex items-center px-4 py-2 bg-copper/20 backdrop-blur-sm border border-copper/30 rounded-full text-copper font-semibold text-sm mb-6"
            >
              <span className="w-2 h-2 bg-copper rounded-full mr-2"></span>
              {t('ourProcess')}
            </motion.div>
          </motion.div>

          {/* Process Steps */}
          <div className="relative">
            {/* Central Line - Hidden on mobile */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-copper via-sand to-copper opacity-30"></div>
            
            {/* Steps */}
            <div className="space-y-8 md:space-y-16">
              {/* Step 1 */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                viewport={{ once: true }}
                className="relative flex flex-col md:flex-row md:items-center"
              >
                <div className="w-full md:w-1/2 md:pr-8 md:text-right">
                  <div className="bg-navy/50 backdrop-blur-sm border border-copper/20 rounded-2xl p-6 md:p-8 hover:border-copper/40 transition-all duration-300">
                    <div className="flex items-center space-x-3 mb-4 md:justify-end">
                      <div className="w-12 h-12 bg-gradient-to-br from-copper to-sand rounded-full flex items-center justify-center">
                        <Lightbulb className="w-6 h-6 text-navy" />
                      </div>
                      <div>
                        <div className="text-copper text-sm font-semibold">{t('step01')}</div>
                        <h3 className="text-xl font-bold text-white">{t('brainstorming')}</h3>
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {t('brainstormingDescription')}
                    </p>
                  </div>
                </div>
                
                {/* Central Node - Hidden on mobile */}
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-copper rounded-full border-4 border-navy z-10"></div>
                
                <div className="hidden md:block w-1/2 pl-8"></div>
              </motion.div>

              {/* Step 2 */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="relative flex flex-col md:flex-row md:items-center"
              >
                <div className="hidden md:block w-1/2 pr-8"></div>
                
                {/* Central Node - Hidden on mobile */}
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-sand rounded-full border-4 border-navy z-10"></div>
                
                <div className="w-full md:w-1/2 md:pl-8">
                  <div className="bg-navy/50 backdrop-blur-sm border border-copper/20 rounded-2xl p-6 md:p-8 hover:border-copper/40 transition-all duration-300">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-sand to-copper rounded-full flex items-center justify-center">
                        <Map className="w-6 h-6 text-navy" />
                      </div>
                      <div>
                        <div className="text-copper text-sm font-semibold">{t('step02')}</div>
                        <h3 className="text-xl font-bold text-white">{t('roadmap')}</h3>
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {t('roadmapDescription')}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Step 3 */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className="relative flex flex-col md:flex-row md:items-center"
              >
                <div className="w-full md:w-1/2 md:pr-8 md:text-right">
                  <div className="bg-navy/50 backdrop-blur-sm border border-copper/20 rounded-2xl p-6 md:p-8 hover:border-copper/40 transition-all duration-300">
                    <div className="flex items-center space-x-3 mb-4 md:justify-end">
                      <div className="w-12 h-12 bg-gradient-to-br from-copper to-sand rounded-full flex items-center justify-center">
                        <Play className="w-6 h-6 text-navy" />
                      </div>
                      <div>
                        <div className="text-copper text-sm font-semibold">{t('step03')}</div>
                        <h3 className="text-xl font-bold text-white">{t('actions')}</h3>
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {t('actionsDescription')}
                    </p>
                  </div>
                </div>
                
                {/* Central Node - Hidden on mobile */}
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-copper rounded-full border-4 border-navy z-10"></div>
                
                <div className="hidden md:block w-1/2 pl-8"></div>
              </motion.div>

              {/* Step 4 */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="relative flex flex-col md:flex-row md:items-center"
              >
                <div className="hidden md:block w-1/2 pr-8"></div>
                
                {/* Central Node - Hidden on mobile */}
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-sand rounded-full border-4 border-navy z-10"></div>
                
                <div className="w-full md:w-1/2 md:pl-8">
                  <div className="bg-navy/50 backdrop-blur-sm border border-copper/20 rounded-2xl p-6 md:p-8 hover:border-copper/40 transition-all duration-300">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-sand to-copper rounded-full flex items-center justify-center">
                        <CheckCircle className="w-6 h-6 text-navy" />
                      </div>
                      <div>
                        <div className="text-copper text-sm font-semibold">{t('step04')}</div>
                        <h3 className="text-xl font-bold text-white">{t('result')}</h3>
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {t('resultDescription')}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 

