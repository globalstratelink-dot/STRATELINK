

"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Globe, TrendingUp, Palette, Zap } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { HeroImage, ServicesImage } from "@/components/optimized-image"
import Link from "next/link"

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
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left order-1 lg:order-1">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-copper/10 border border-copper/20 rounded-full text-copper text-sm sm:text-base md:text-lg font-medium mb-6 sm:mb-8"
              >
                <Globe className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                <span className="whitespace-nowrap">{t('visionSynergiesDevelopment')}</span>
              </motion.div>

              {/* Main Title */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="title-hero text-white mb-6 sm:mb-8"
              >
                {t('accelerateInternationalExpansion')}
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 sm:mb-12 leading-relaxed px-2 sm:px-0"
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
                  className="bg-gradient-to-r from-copper to-sand text-navy font-bold text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 hover:scale-105 transition-transform duration-200 w-full sm:w-auto"
                  asChild
                >
                  <Link href="https://calendly.com/net-stitou" target="_blank" rel="noopener noreferrer">
                    {t('discoverOurSolutions')}
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                  </Link>
                </Button>
              </motion.div>
            </div>

            {/* Right Logo Block */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="flex justify-center lg:justify-end order-2 lg:order-2"
            >
              {/* Static Logo - Avec les trois cercles de contour animés */}
              <div className="relative w-80 h-80 sm:w-96 sm:h-96 lg:w-[420px] lg:h-[420px] flex items-center justify-center">
                {/* Concentric rotating borders - Trois cercles de contour avec animations */}
                <motion.div 
                  className="absolute inset-0 border-2 border-white/20 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ 
                    duration: 10, 
                    repeat: Infinity, 
                    ease: "linear" 
                  }}
                  style={{ transformOrigin: "center" }}
                ></motion.div>
                
                <motion.div 
                  className="absolute inset-4 border-2 border-white/15 rounded-full"
                  animate={{ rotate: -360 }}
                  transition={{ 
                    duration: 15, 
                    repeat: Infinity, 
                    ease: "linear" 
                  }}
                  style={{ transformOrigin: "center" }}
                ></motion.div>
                
                <motion.div 
                  className="absolute inset-8 border-2 border-white/10 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ 
                    duration: 20, 
                    repeat: Infinity, 
                    ease: "linear" 
                  }}
                  style={{ transformOrigin: "center" }}
                ></motion.div>
                
                {/* Central logo */}
                <div className="relative w-48 h-48 lg:w-56 lg:h-56 xl:w-64 xl:h-64 flex items-center justify-center">
                  {/* Main logo image */}
                  <img 
                    src="/new-logo.png" 
                    alt="STRATELINK GLOBAL" 
                    width="256" 
                    height="256" 
                    className="w-full h-full object-contain relative z-10 filter brightness-130 contrast-125 saturate-120" 
                    style={{ color: 'transparent' }}
                  />
                </div>
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
          {/* Section principale en grille (titre + photo) */}
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center mb-16">
            {/* Left Content - Titre et description */}
            <div className="text-center lg:text-left order-1 lg:order-1">
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
                className="title-section text-white mb-8"
              >
                {t('globalSolutionsInternationalTrade')}
              </motion.h2>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="text-lg md:text-xl text-gray-300 leading-relaxed"
              >
                {t('sourcingToDeliveryDescription')}
              </motion.p>
            </div>

            {/* Right Image Block */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              viewport={{ once: true }}
              className="flex justify-center lg:justify-end order-2 lg:order-2"
            >
              {/* Hologram Image */}
              <div className="relative max-w-lg mx-auto lg:mx-0">
                {/* Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-copper/20 via-transparent to-sand/20 rounded-3xl blur-2xl"></div>
                
                {/* Image Container */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-copper/20">
                  <ServicesImage
                    className="w-full h-auto object-cover"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-transparent"></div>
                  
                  {/* Card Content */}
                  <div className="absolute bottom-4 left-4 right-4 text-center">
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
                  className="absolute top-2 right-2 w-10 h-10 bg-copper/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-copper/30 z-20"
                >
                  <Globe className="w-5 h-5 text-copper" />
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
                  className="absolute bottom-2 left-2 w-8 h-8 bg-sand/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-sand/30 z-20"
                >
                  <TrendingUp className="w-4 h-4 text-sand" />
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Services Grid - Reste comme avant */}
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
              <h3 className="title-card text-white mb-4">{t('importExport')}</h3>
              <p className="text-gray-300">{t('importExportDesc')}</p>
            </div>

            {/* Service 2 */}
            <div className="bg-navy/50 backdrop-blur-sm border border-copper/20 rounded-2xl p-8 hover:border-copper/40 transition-all duration-300">
              <div className="w-16 h-16 bg-copper/20 rounded-xl flex items-center justify-center mb-6 mx-auto">
                <TrendingUp className="w-8 h-8 text-copper" />
              </div>
              <h3 className="title-card text-white mb-4">{t('businessDevelopment')}</h3>
              <p className="text-gray-300">{t('businessDevelopmentDesc')}</p>
            </div>

            {/* Service 3 - Branding */}
            <div className="bg-navy/50 backdrop-blur-sm border border-copper/20 rounded-2xl p-8 hover:border-copper/40 transition-all duration-300">
              <div className="w-16 h-16 bg-copper/20 rounded-xl flex items-center justify-center mb-6 mx-auto">
                <Palette className="w-8 h-8 text-copper" />
              </div>
              <h3 className="title-card text-white mb-4">{t('branding')}</h3>
              <p className="text-gray-300">{t('brandingDescription')}</p>
            </div>

            {/* Service 4 - Digital Solutions */}
            <div className="bg-navy/50 backdrop-blur-sm border border-copper/20 rounded-2xl p-8 hover:border-copper/40 transition-all duration-300">
              <div className="w-16 h-16 bg-copper/20 rounded-xl flex items-center justify-center mb-6 mx-auto">
                <Zap className="w-8 h-8 text-copper" />
              </div>
              <h3 className="title-card text-white mb-4">{t('digitalSolutions')}</h3>
              <p className="text-gray-300">{t('digitalSolutionsDescription')}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Slide 3 - Les 4 Carrières */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header du Slide 3 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
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
              Carrières
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="title-section text-white mb-6"
            >
              VOICI LES DIFFÉRENTES CARRIÈRES À AVOIR
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="text-xl text-gray-300 max-w-3xl mx-auto"
            >
              Découvrez nos 4 domaines d'expertise pour votre développement professionnel
            </motion.p>
          </motion.div>

          {/* Grille des 4 Carrières */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12"
          >
            {/* Carrière 1: Développement Commercial */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              viewport={{ once: true }}
              className="bg-navy/50 backdrop-blur-sm border border-copper/20 rounded-2xl p-8 hover:border-copper/40 transition-all duration-300 group"
            >
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-copper/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-copper/30 transition-all duration-300">
                  <TrendingUp className="w-8 h-8 text-copper" />
                </div>
                <div className="flex-1">
                  <h3 className="title-card text-white mb-4">Développement Commercial</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-copper rounded-full mr-3"></span>
                      Génération Leads
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-copper rounded-full mr-3"></span>
                      Développement Activité commerciale
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-copper rounded-full mr-3"></span>
                      Acquisition Clients
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-copper rounded-full mr-3"></span>
                      Formation Commercial et Force de vente
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Carrière 2: Création de Marque et Branding */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              viewport={{ once: true }}
              className="bg-navy/50 backdrop-blur-sm border border-copper/20 rounded-2xl p-8 hover:border-copper/40 transition-all duration-300 group"
            >
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-copper/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-copper/30 transition-all duration-300">
                  <Palette className="w-8 h-8 text-copper" />
                </div>
                <div className="flex-1">
                  <h3 className="title-card text-white mb-4">Création de Marque et Branding</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-copper rounded-full mr-3"></span>
                      Développement Marque
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-copper rounded-full mr-3"></span>
                      Personal Branding
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-copper rounded-full mr-3"></span>
                      Offres et Positionnement
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-copper rounded-full mr-3"></span>
                      Distribution
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Carrière 3: International Sourcing Import / Export */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              viewport={{ once: true }}
              className="bg-navy/50 backdrop-blur-sm border border-copper/20 rounded-2xl p-8 hover:border-copper/40 transition-all duration-300 group"
            >
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-copper/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-copper/30 transition-all duration-300">
                  <Globe className="w-8 h-8 text-copper" />
                </div>
                <div className="flex-1">
                  <h3 className="title-card text-white mb-4">International Sourcing Import / Export</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-copper rounded-full mr-3"></span>
                      Sourcing
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-copper rounded-full mr-3"></span>
                      Contrôle Qualité
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-copper rounded-full mr-3"></span>
                      Logistique et Transport
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-copper rounded-full mr-3"></span>
                      Catalogue Exclusif
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Carrière 4: Digital Solutions : API and SaaS */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              viewport={{ once: true }}
              className="bg-navy/50 backdrop-blur-sm border border-copper/20 rounded-2xl p-8 hover:border-copper/40 transition-all duration-300 group"
            >
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-copper/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-copper/30 transition-all duration-300">
                  <Zap className="w-8 h-8 text-copper" />
                </div>
                <div className="flex-1">
                  <h3 className="title-card text-white mb-4">Digital Solutions : API and SaaS</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-copper rounded-full mr-3"></span>
                      Solutions d'entreprise
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-copper rounded-full mr-3"></span>
                      Tracking
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-copper rounded-full mr-3"></span>
                      Télécom
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Slide 4 - Ils nous ont fait confiance */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header du Slide 4 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
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
              Confiance
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="title-section text-white mb-6"
            >
              Ils nous ont fait confiance
            </motion.h2>
            
            {/* 5 Étoiles */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              viewport={{ once: true }}
              className="flex justify-center items-center space-x-2 mb-8"
            >
              {[...Array(5)].map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-3xl text-copper"
                >
                  ⭐
                </motion.div>
              ))}
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="text-xl text-gray-300 max-w-3xl mx-auto"
            >
              Découvrez nos partenaires et clients qui nous font confiance pour leurs projets
            </motion.p>
          </motion.div>

          {/* Grille des 6 images de confiance */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8"
          >
            {/* Image 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-2xl border border-copper/20 hover:border-copper/40 transition-all duration-300">
                <img
                  src="/1.webp"
                  alt="Partenaire de confiance 1"
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </motion.div>

            {/* Image 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-2xl border border-copper/20 hover:border-copper/40 transition-all duration-300">
                <img
                  src="/2.webp"
                  alt="Partenaire de confiance 2"
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </motion.div>

            {/* Image 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-2xl border border-copper/20 hover:border-copper/40 transition-all duration-300">
                <img
                  src="/3.webp"
                  alt="Partenaire de confiance 3"
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </motion.div>

            {/* Image 4 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-2xl border border-copper/20 hover:border-copper/40 transition-all duration-300">
                <img
                  src="/4.webp"
                  alt="Partenaire de confiance 4"
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </motion.div>

            {/* Image 5 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.3 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-2xl border border-copper/20 hover:border-copper/40 transition-all duration-300">
                <img
                  src="/5.webp"
                  alt="Partenaire de confiance 5"
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </motion.div>

            {/* Image 6 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-2xl border border-copper/20 hover:border-copper/40 transition-all duration-300">
                <img
                  src="/6.webp"
                  alt="Partenaire de confiance 6"
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Call-to-Action Bilingue */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        viewport={{ once: true }}
        className="mt-20 text-center"
      >
        {/* Section Française */}
        <div className="mb-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4"
          >
            {t('readyToTransformYourBusiness')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            viewport={{ once: true }}
            className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            {t('letsDiscussStrategicSolutions')}
          </motion.p>
        </div>

        {/* Section Anglaise */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          viewport={{ once: true }}
          className="bg-copper/10 backdrop-blur-sm border border-copper/20 rounded-2xl p-8 sm:p-12 max-w-4xl mx-auto"
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            {t('readyToTransformYourBusiness')}
          </h3>
          <p className="text-lg text-white/80 mb-8">
            {t('letsDiscussStrategicSolutions')}
          </p>
          
          {/* Bouton Contact */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              size="lg"
              className="bg-gradient-to-r from-copper to-sand text-navy font-bold text-lg px-8 py-4 hover:shadow-lg transition-all duration-300"
              asChild
            >
              <Link href="/contact">
                {t('contactButton')}
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
} 