"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Globe, TrendingUp, Palette, Zap } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { HomePagePicture } from "@/components/picture-element"

export function HomeSlides() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-navy">
      {/* Slide 1: Vision - Synergies - Développement */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-navy via-navy to-navy/90 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-copper/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-sand/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center px-6 py-3 bg-copper/10 border border-copper/20 rounded-full text-copper text-lg font-medium mb-8"
              >
                <Globe className="w-5 h-5 mr-2" />
                {t('visionSynergiesDevelopment')}
              </motion.div>

              {/* Main Title */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight"
              >
                {t('accelerateInternationalExpansion')}
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed"
              >
                {t('strategicPartnerDubaiEuropeAsia')}
              </motion.p>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-copper to-sand text-navy font-bold text-lg px-8 py-4 hover:scale-105 transition-transform duration-200"
                >
                  {t('discoverOurSolutions')}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </motion.div>
            </div>

            {/* Right Image Block */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="flex justify-center lg:justify-end"
            >
              {/* Image Container Block */}
              <div className="relative w-full max-w-lg">
                {/* Background Card */}
                <div className="bg-navy/50 backdrop-blur-sm border border-copper/20 rounded-3xl p-6 shadow-2xl">
                  {/* Image Container with Fixed Dimensions */}
                  <div className="relative w-full h-80 rounded-2xl overflow-hidden">
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-copper/20 via-transparent to-sand/20 z-10"></div>
                    
                    {/* Image with Fallback */}
                    <HomePagePicture
                      type="hero"
                      className="object-cover w-full h-full"
                    />
                    
                    {/* Fallback Background (shown if image fails) */}
                    <div 
                      className="absolute inset-0 bg-gradient-to-br from-navy via-copper/30 to-sand/30 opacity-0 hover:opacity-100 transition-opacity duration-300"
                      style={{ display: 'none' }}
                    />
                  </div>
                  
                  {/* Card Content */}
                  <div className="mt-4 text-center">
                    <h3 className="text-white font-semibold text-lg mb-2">{t('globalLogisticsNetwork')}</h3>
                    <p className="text-gray-300 text-sm">{t('connectingDubaiEuropeAsia')}</p>
                  </div>
                </div>
                
                {/* Floating Elements */}
                <motion.div
                  animate={{ 
                    y: [0, -10, 0],
                    rotate: [0, 5, 0]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                  className="absolute top-2 right-2 md:-top-3 md:-right-3 w-10 h-10 md:w-12 md:h-12 bg-copper/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-copper/30 z-20"
                >
                  <Globe className="w-5 h-5 md:w-6 md:h-6 text-copper" />
                </motion.div>
                
                <motion.div
                  animate={{ 
                    y: [0, 10, 0],
                    rotate: [0, -5, 0]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    ease: "easeInOut",
                    delay: 1
                  }}
                  className="absolute bottom-2 left-2 md:-bottom-3 md:-left-3 w-8 h-8 md:w-10 md:h-10 bg-sand/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-sand/30 z-20"
                >
                  <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-sand" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Slide 2: Nos Services */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-navy/95 to-navy relative overflow-hidden mt-16 md:mt-0">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-copper/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-sand/5 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="inline-flex items-center px-6 py-3 bg-copper/10 border border-copper/20 rounded-full text-copper text-lg font-medium mb-8"
            >
              <TrendingUp className="w-5 h-5 mr-2" />
              {t('services')}
            </motion.div>

            {/* Main Title */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight"
            >
              {t('globalSolutionsInternationalTrade')}
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-lg md:text-xl text-gray-300 mb-12 max-w-5xl mx-auto leading-relaxed"
            >
              {t('sourcingToDeliveryDescription')}
            </motion.p>

            {/* Hologram Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: true }}
              className="relative mb-16"
            >
              <div className="relative max-w-4xl mx-auto">
                {/* Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-copper/20 via-transparent to-sand/20 rounded-3xl blur-2xl"></div>
                
                {/* Image Container */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-copper/20">
                  <HomePagePicture
                    type="services"
                    className="w-full h-auto object-cover"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-transparent"></div>
                  
                  {/* Floating Elements */}
                  <motion.div
                    animate={{ 
                      y: [0, -10, 0],
                      rotate: [0, 5, 0]
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                    className="absolute top-4 right-4 w-12 h-12 bg-copper/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-copper/30"
                  >
                    <Globe className="w-6 h-6 text-copper" />
                  </motion.div>
                  
                  <motion.div
                    animate={{ 
                      y: [0, 10, 0],
                      rotate: [0, -5, 0]
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity, 
                      ease: "easeInOut",
                      delay: 1
                    }}
                    className="absolute bottom-4 left-4 w-10 h-10 bg-sand/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-sand/30"
                  >
                    <TrendingUp className="w-5 h-5 text-sand" />
                  </motion.div>
                </div>
                
                {/* Caption */}
                <div className="text-center mt-6">
                  <h3 className="text-white font-semibold text-lg mb-2">{t('futuristicTechnologies')}</h3>
                  <p className="text-gray-300 text-sm">{t('hologramDescription')}</p>
                </div>
              </div>
            </motion.div>

            {/* Services Grid */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16"
            >
                             {/* Service 1 */}
               <div className="bg-navy/50 backdrop-blur-sm border border-copper/20 rounded-2xl p-8 hover:border-copper/40 transition-all duration-300">
                 <div className="w-16 h-16 bg-copper/20 rounded-xl flex items-center justify-center mb-6 mx-auto">
                   <Globe className="w-8 h-8 text-copper" />
                 </div>
                 <h3 className="text-xl font-bold text-white mb-4">{t('importExport')}</h3>
                 <p className="text-gray-300">{t('importExportDesc')}</p>
               </div>

               {/* Service 2 */}
               <div className="bg-navy/50 backdrop-blur-sm border border-copper/20 rounded-2xl p-8 hover:border-copper/40 transition-all duration-300">
                 <div className="w-16 h-16 bg-copper/20 rounded-xl flex items-center justify-center mb-6 mx-auto">
                   <TrendingUp className="w-8 h-8 text-copper" />
                 </div>
                 <h3 className="text-xl font-bold text-white mb-4">{t('businessDevelopment')}</h3>
                 <p className="text-gray-300">{t('businessDevelopmentDesc')}</p>
               </div>

               {/* Service 3 - Branding */}
               <div className="bg-navy/50 backdrop-blur-sm border border-copper/20 rounded-2xl p-8 hover:border-copper/40 transition-all duration-300">
                 <div className="w-16 h-16 bg-copper/20 rounded-xl flex items-center justify-center mb-6 mx-auto">
                   <Palette className="w-8 h-8 text-copper" />
                 </div>
                 <h3 className="text-xl font-bold text-white mb-4">{t('branding')}</h3>
                 <p className="text-gray-300">{t('brandingDescription')}</p>
               </div>

               {/* Service 4 - Digital Solutions */}
               <div className="bg-navy/50 backdrop-blur-sm border border-copper/20 rounded-2xl p-8 hover:border-copper/40 transition-all duration-300">
                 <div className="w-16 h-16 bg-copper/20 rounded-xl flex items-center justify-center mb-6 mx-auto">
                   <Zap className="w-8 h-8 text-copper" />
                 </div>
                 <h3 className="text-xl font-bold text-white mb-4">{t('digitalSolutions')}</h3>
                 <p className="text-gray-300">{t('digitalSolutionsDescription')}</p>
               </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
} 