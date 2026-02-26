"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Play, Crown, Sparkles, Shield, Globe } from 'lucide-react'
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { motion } from 'framer-motion'
import { useLanguage } from "@/contexts/language-context"
import { FloatingElements, ParticleSystem, FadeInUp } from "@/components/advanced-animations"
import { HexagonalPattern } from "@/components/logo-patterns"
import { LuxuryStats } from "@/components/premium-showcase"
import { useMobileOptimization } from "@/hooks/use-mobile-optimization"

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const { t } = useLanguage()
  const { shouldReduceAnimations } = useMobileOptimization()

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <>
      <section className="relative min-h-screen bg-gradient-to-br from-navy via-navy to-navy/90 overflow-hidden pt-16">
        {/* Advanced Background Elements */}
        <FloatingElements />
        <ParticleSystem />
        <HexagonalPattern />
        
        {/* Premium Background Effects - Désactivés sur mobile */}
        {!shouldReduceAnimations && (
          <div className="absolute inset-0 overflow-hidden">
            <motion.div 
              className="absolute top-20 left-10 w-48 h-48 sm:w-72 sm:h-72 bg-copper/8 rounded-full blur-3xl"
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 8, repeat: Infinity }}
              style={{ willChange: 'transform' }}
            />
            <motion.div 
              className="absolute bottom-20 right-10 w-64 h-64 sm:w-96 sm:h-96 bg-sand/8 rounded-full blur-3xl"
              animate={{ scale: [1.2, 1, 1.2], opacity: [0.6, 0.3, 0.6] }}
              transition={{ duration: 10, repeat: Infinity, delay: 2 }}
              style={{ willChange: 'transform' }}
            />
            <motion.div 
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] sm:w-[800px] sm:h-[800px] lg:w-[1000px] lg:h-[1000px] bg-gradient-radial from-copper/5 to-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              style={{ willChange: 'transform' }}
            />
          </div>
        )}

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-32 pb-12 sm:pb-20 z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[70vh] lg:min-h-[80vh]">
            {/* Left Content - Enhanced with smaller text */}
            <motion.div 
              className="space-y-6 sm:space-y-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <div className="space-y-4 sm:space-y-6">
                {/* Premium Badge */}
                <FadeInUp delay={0.2}>
                  <motion.div 
                    className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-copper/20 to-sand/20 border border-copper/30 rounded-full text-copper text-xs sm:text-sm font-semibold backdrop-blur-sm cursor-pointer"
                    whileHover={{ scale: 1.05, borderColor: "rgba(169, 121, 104, 0.5)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Crown className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                    <motion.span 
                      className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-copper rounded-full mr-2"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <span className="hidden sm:inline">Elite Strategic Solutions Since 2010</span>
                    <span className="sm:hidden">Elite Solutions</span>
                  </motion.div>
                </FadeInUp>
                
                {/* Main Headline - Static Text */}
                <FadeInUp delay={0.4}>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                    <motion.span 
                      className="block bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                    >
                      Strategic
                    </motion.span>
                    
                    <motion.span 
                      className="block bg-gradient-to-r from-copper to-sand bg-clip-text text-transparent"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.8 }}
                    >
                      Innovation
                    </motion.span>
                    
                    <motion.span 
                      className="block bg-gradient-to-r from-sand to-copper bg-clip-text text-transparent"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 1 }}
                    >
                      Delivered
                    </motion.span>
                  </h1>
                </FadeInUp>
                
                {/* Premium Description */}
                <FadeInUp delay={0.8}>
                  <motion.p 
                    className="text-base sm:text-lg lg:text-xl xl:text-2xl text-gray-300 leading-relaxed max-w-2xl font-light"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.2 }}
                  >
                    <span className="text-copper font-semibold">Transforming Fortune 500 companies</span> and{" "}
                    <span className="text-sand font-semibold">emerging leaders</span> through 
                    unparalleled strategic excellence and innovative solutions.
                  </motion.p>
                </FadeInUp>

                {/* Trust Indicators */}
                <FadeInUp delay={1}>
                  <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs sm:text-sm text-gray-400">
                    {[
                      { icon: Shield, text: "ISO 27001 Certified" },
                      { icon: Crown, text: "Award Winner 2024" },
                      { icon: Sparkles, text: "99.8% Success Rate" }
                    ].map((item, index) => (
                      <motion.div 
                        key={index}
                        className="flex items-center hover:text-copper transition-colors duration-300 cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                      >
                        <item.icon className="w-3 h-3 sm:w-4 sm:h-4 text-copper mr-1 sm:mr-2" />
                        <span className="hidden sm:inline">{item.text}</span>
                        <span className="sm:hidden">{item.text.split(' ')[0]}</span>
                      </motion.div>
                    ))}
                  </div>
                </FadeInUp>
              </div>

              {/* Premium CTA Buttons */}
              <FadeInUp delay={1.2}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button 
                      size="lg" 
                      className="bg-gradient-to-r from-copper to-sand hover:from-sand hover:to-copper text-navy font-bold px-10 py-6 text-lg relative overflow-hidden shadow-2xl shadow-copper/30 group"
                      asChild
                    >
                      <Link href="/auth/signup">
                        <Crown className="mr-3 w-5 h-5 relative z-10" />
                        <span className="relative z-10">Start Your Transformation</span>
                        <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-r from-sand to-copper"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: "0%" }}
                          transition={{ duration: 0.3 }}
                        />
                      </Link>
                    </Button>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="border-2 border-copper text-copper hover:bg-copper hover:text-navy px-10 py-6 text-lg group backdrop-blur-sm font-semibold"
                    >
                      <Play className="mr-3 w-5 h-5 group-hover:scale-110 transition-transform" />
                      Watch Success Stories
                    </Button>
                  </motion.div>
                </div>
              </FadeInUp>
            </motion.div>

            {/* Right Content - Premium Logo Display with CENTERED LOGO */}
            <motion.div 
              className="flex justify-center lg:justify-end"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            >
              <div className="relative">
                {/* Premium Logo Container */}
                <div className="relative w-80 h-80 lg:w-96 lg:h-96 xl:w-[420px] xl:h-[420px]">
                  {/* Luxury Rings */}
                  <motion.div 
                    className="absolute inset-0 rounded-full border-2 border-copper/40 shadow-2xl shadow-copper/20"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.div 
                    className="absolute inset-6 rounded-full border border-sand/50 shadow-xl shadow-sand/10"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.div 
                    className="absolute inset-12 rounded-full border border-copper/30 shadow-lg shadow-copper/5"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                  />
                  
                  {/* Premium Glow Effects */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-br from-copper/15 to-sand/15 rounded-3xl transform rotate-6 blur-2xl"
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [6, 12, 6]
                    }}
                    transition={{ duration: 8, repeat: Infinity }}
                  />
                  <motion.div 
                    className="absolute inset-4 bg-gradient-to-tl from-sand/10 to-copper/10 rounded-3xl transform -rotate-3 blur-xl"
                    animate={{ 
                      scale: [1.1, 1, 1.1],
                      rotate: [-3, -6, -3]
                    }}
                    transition={{ duration: 10, repeat: Infinity, delay: 2 }}
                  />
                  
                  {/* Main Logo Display - CENTERED */}
                  <div className="absolute inset-8 bg-transparent backdrop-blur-none rounded-3xl flex items-center justify-center border-2 border-copper/50 shadow-2xl shadow-copper/30">
                    <div className="flex items-center justify-center w-full h-full">
                      <motion.div 
                        className="w-48 h-48 lg:w-56 lg:h-56 xl:w-64 xl:h-64 relative group flex items-center justify-center"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      >
                        {/* Ultra Premium Glow */}
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-br from-copper/30 to-sand/30 rounded-3xl blur-3xl"
                          animate={{ 
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.6, 0.3]
                          }}
                          transition={{ duration: 4, repeat: Infinity }}
                        />
                        <motion.div 
                          className="absolute inset-2 bg-gradient-to-tl from-sand/20 to-copper/20 rounded-2xl blur-2xl"
                          animate={{ 
                            scale: [1.2, 1, 1.2],
                            opacity: [0.6, 0.3, 0.6]
                          }}
                          transition={{ duration: 6, repeat: Infinity, delay: 1 }}
                        />
                        
                        <motion.div
                          whileHover={{ rotate: 5, scale: 1.1 }}
                          transition={{ duration: 0.3 }}
                          className="flex items-center justify-center w-full h-full"
                        >
                          <Image
                            src="/new-logo.png"
                            alt="STRATELINK GLOBAL"
                            width={256}
                            height={256}
                            className="w-full h-full object-contain relative z-10 filter brightness-130 contrast-125 saturate-120"
                          />
                        </motion.div>
                        
                        {/* Premium Orbiting Elements */}
                        <motion.div 
                          className="absolute inset-0"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        >
                          {[
                            { position: "top", size: "w-5 h-5" },
                            { position: "right", size: "w-4 h-4" },
                            { position: "bottom", size: "w-5 h-5" },
                            { position: "left", size: "w-4 h-4" }
                          ].map((orbit, index) => (
                            <motion.div
                              key={index}
                              className={`absolute ${orbit.size} bg-gradient-to-br from-copper to-sand rounded-full shadow-xl`}
                              style={{
                                top: orbit.position === "top" ? "-12px" : orbit.position === "bottom" ? "auto" : "50%",
                                bottom: orbit.position === "bottom" ? "-12px" : "auto",
                                left: orbit.position === "left" ? "-12px" : orbit.position === "right" ? "auto" : "50%",
                                right: orbit.position === "right" ? "-12px" : "auto",
                                transform: orbit.position === "top" || orbit.position === "bottom" ? "translateX(-50%)" : "translateY(-50%)"
                              }}
                              animate={{ 
                                scale: [1, 1.3, 1],
                                boxShadow: [
                                  "0 0 20px rgba(169, 121, 104, 0.6)",
                                  "0 0 40px rgba(169, 121, 104, 0.8)",
                                  "0 0 20px rgba(169, 121, 104, 0.6)"
                                ]
                              }}
                              transition={{ 
                                duration: 3, 
                                repeat: Infinity, 
                                delay: index * 0.5 
                              }}
                            />
                          ))}
                        </motion.div>
                      </motion.div>
                    </div>
                  </div>
                </div>
                
                {/* Premium Floating Elements */}
                <motion.div 
                  className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-copper/30 to-sand/30 rounded-full flex items-center justify-center shadow-2xl shadow-copper/40"
                  animate={{ 
                    y: [-10, 10, -10],
                    rotate: [0, 180, 360]
                  }}
                  transition={{ duration: 8, repeat: Infinity }}
                >
                  <Crown className="w-8 h-8 text-copper" />
                </motion.div>
                
                <motion.div 
                  className="absolute -bottom-10 -left-10 w-16 h-16 bg-gradient-to-br from-sand/40 to-copper/40 rounded-full flex items-center justify-center shadow-xl shadow-sand/40"
                  animate={{ 
                    y: [10, -10, 10],
                    rotate: [360, 180, 0]
                  }}
                  transition={{ duration: 10, repeat: Infinity, delay: 2 }}
                >
                  <Sparkles className="w-6 h-6 text-sand" />
                </motion.div>
                
                <motion.div 
                  className="absolute top-1/4 -left-12 w-12 h-12 bg-copper/20 rounded-full shadow-lg shadow-copper/30"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.7, 0.3]
                  }}
                  transition={{ duration: 6, repeat: Infinity }}
                />
                
                <motion.div 
                  className="absolute bottom-1/4 -right-12 w-10 h-10 bg-sand/30 rounded-full shadow-lg shadow-sand/30"
                  animate={{ 
                    scale: [1.2, 1, 1.2],
                    opacity: [0.7, 0.3, 0.7]
                  }}
                  transition={{ duration: 8, repeat: Infinity, delay: 3 }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
