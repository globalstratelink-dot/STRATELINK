"use client"

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useMobileOptimization } from '@/hooks/use-mobile-optimization'

export function FloatingElements() {
  const { shouldReduceAnimations } = useMobileOptimization()

  // Si les animations sont réduites, ne pas afficher les éléments flottants
  if (shouldReduceAnimations) {
    return null
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Floating geometric shapes with simplified animations */}
      <motion.div 
        className="absolute top-20 left-10 w-4 h-4 bg-copper/30 rotate-45"
        animate={{ 
          y: [-10, 10, -10],
          rotate: [45, 225, 45],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ willChange: 'transform' }}
      />
      <motion.div 
        className="absolute top-40 right-20 w-6 h-6 bg-sand/40 rounded-full"
        animate={{ 
          y: [10, -5, 10],
          x: [-5, 5, -5],
          scale: [1, 1.2, 1]
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        style={{ willChange: 'transform' }}
      />
      <motion.div 
        className="absolute bottom-40 left-20 w-3 h-3 bg-copper/50"
        animate={{ 
          y: [-10, 15, -10],
          rotate: [0, 360, 0]
        }}
        transition={{ 
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4
        }}
        style={{ willChange: 'transform' }}
      />
      <motion.div 
        className="absolute bottom-20 right-40 w-5 h-5 bg-sand/30 rotate-45"
        animate={{ 
          y: [15, -10, 15],
          rotate: [45, 405, 45],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ 
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 6
        }}
        style={{ willChange: 'transform' }}
      />
    </div>
  )
}

export function ParticleSystem() {
  const [isClient, setIsClient] = useState(false)
  const { shouldReduceAnimations } = useMobileOptimization()
  
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Si les animations sont réduites, ne pas afficher le système de particules
  if (shouldReduceAnimations) {
    return null
  }

  // Positions fixes pour éviter l'hydration mismatch
  const fixedParticles = [
    { id: 0, x: 10, y: 15, delay: 0 },
    { id: 1, x: 25, y: 30, delay: 500 },
    { id: 2, x: 40, y: 45, delay: 1000 },
    { id: 3, x: 55, y: 60, delay: 1500 },
    { id: 4, x: 70, y: 75, delay: 2000 },
    { id: 5, x: 85, y: 90, delay: 2500 },
    { id: 6, x: 15, y: 25, delay: 3000 },
    { id: 7, x: 30, y: 40, delay: 3500 },
    { id: 8, x: 45, y: 55, delay: 4000 },
    { id: 9, x: 60, y: 70, delay: 4500 },
    { id: 10, x: 75, y: 85, delay: 5000 },
    { id: 11, x: 90, y: 95, delay: 5500 },
    { id: 12, x: 20, y: 35, delay: 6000 },
    { id: 13, x: 35, y: 50, delay: 6500 },
    { id: 14, x: 50, y: 65, delay: 7000 },
    { id: 15, x: 65, y: 80, delay: 7500 },
    { id: 16, x: 80, y: 95, delay: 8000 },
    { id: 17, x: 5, y: 20, delay: 8500 },
    { id: 18, x: 20, y: 35, delay: 9000 },
    { id: 19, x: 35, y: 50, delay: 9500 },
    { id: 20, x: 50, y: 65, delay: 10000 },
    { id: 21, x: 65, y: 80, delay: 10500 },
    { id: 22, x: 80, y: 95, delay: 11000 },
    { id: 23, x: 95, y: 10, delay: 11500 },
    { id: 24, x: 10, y: 25, delay: 12000 }
  ]

  if (!isClient) {
    return null // Ne rend rien côté serveur
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {fixedParticles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-copper/30 rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            willChange: 'transform'
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 0.8, 0],
            y: [-10, 10, -10]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: particle.delay / 1000,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  )
}

export function ScrollReveal({ children, className = "", delay = 0 }: { 
  children: React.ReactNode, 
  className?: string,
  delay?: number 
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  )
}

export function FadeInUp({ children, className = "", delay = 0 }: { 
  children: React.ReactNode, 
  className?: string,
  delay?: number 
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  )
}

export function ScaleOnHover({ children, className = "" }: { 
  children: React.ReactNode, 
  className?: string 
}) {
  return (
    <motion.div
      className={className}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  )
}
