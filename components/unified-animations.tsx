"use client"

import { motion, useInView, useAnimation } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

// Hook pour détecter les préférences de mouvement réduit
export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
      setPrefersReducedMotion(mediaQuery.matches)

      const handleChange = (e: MediaQueryListEvent) => {
        setPrefersReducedMotion(e.matches)
      }

      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    }
  }, [])

  return prefersReducedMotion
}

// Hook pour détecter si c'est un appareil mobile
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return isMobile
}

// Composant principal d'animation avec révélation au scroll
interface ScrollRevealProps {
  children: React.ReactNode
  delay?: number
  duration?: number
  className?: string
  threshold?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  distance?: number
}

export function ScrollReveal({ 
  children, 
  delay = 0, 
  duration = 0.6,
  className = "",
  threshold = 0.1,
  direction = 'up',
  distance = 30
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { 
    once: true, 
    amount: threshold,
    margin: "0px 0px -50px 0px"
  })
  const prefersReducedMotion = useReducedMotion()
  const isMobile = useIsMobile()

  // Si les animations sont réduites ou sur mobile, afficher sans animation
  if (prefersReducedMotion || isMobile) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    )
  }

  const getInitialPosition = () => {
    switch (direction) {
      case 'left': return { x: -distance, y: 0 }
      case 'right': return { x: distance, y: 0 }
      case 'down': return { x: 0, y: distance }
      case 'up': return { x: 0, y: -distance }
      default: return { x: 0, y: 0 }
    }
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...getInitialPosition() }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...getInitialPosition() }}
      transition={{ 
        duration, 
        delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Composant pour les animations d'apparition simple
interface FadeInProps {
  children: React.ReactNode
  delay?: number
  duration?: number
  className?: string
}

export function FadeIn({ 
  children, 
  delay = 0, 
  duration = 0.6,
  className = ""
}: FadeInProps) {
  const prefersReducedMotion = useReducedMotion()
  const isMobile = useIsMobile()

  if (prefersReducedMotion || isMobile) {
    return (
      <div className={className}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ 
        duration, 
        delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Composant pour les animations au survol
interface HoverAnimationProps {
  children: React.ReactNode
  scale?: number
  duration?: number
  className?: string
  y?: number
}

export function HoverAnimation({ 
  children, 
  scale = 1.05, 
  duration = 0.2,
  className = "",
  y = 0
}: HoverAnimationProps) {
  const prefersReducedMotion = useReducedMotion()
  const isMobile = useIsMobile()

  if (prefersReducedMotion || isMobile) {
    return (
      <div className={className}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      whileHover={{ scale, y }}
      whileTap={{ scale: scale * 0.95 }}
      transition={{ duration }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Composant pour les animations de chargement progressif
interface StaggeredRevealProps {
  children: React.ReactNode[]
  delay?: number
  duration?: number
  className?: string
  staggerDelay?: number
}

export function StaggeredReveal({ 
  children, 
  delay = 0, 
  duration = 0.6,
  className = "",
  staggerDelay = 0.1
}: StaggeredRevealProps) {
  const prefersReducedMotion = useReducedMotion()
  const isMobile = useIsMobile()

  if (prefersReducedMotion || isMobile) {
    return (
      <div className={className}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: delay
          }
        }
      }}
      className={className}
    >
      {children.map((child, index) => (
        <motion.div
          key={index}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
          transition={{ duration }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}

// Composant pour les animations de texte
interface TextRevealProps {
  children: React.ReactNode
  delay?: number
  duration?: number
  className?: string
}

export function TextReveal({ 
  children, 
  delay = 0, 
  duration = 0.8,
  className = ""
}: TextRevealProps) {
  const prefersReducedMotion = useReducedMotion()
  const isMobile = useIsMobile()

  if (prefersReducedMotion || isMobile) {
    return (
      <div className={className}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Composant pour les animations de cartes
interface CardRevealProps {
  children: React.ReactNode
  delay?: number
  duration?: number
  className?: string
  index?: number
}

export function CardReveal({ 
  children, 
  delay = 0, 
  duration = 0.6,
  className = "",
  index = 0
}: CardRevealProps) {
  const prefersReducedMotion = useReducedMotion()
  const isMobile = useIsMobile()

  if (prefersReducedMotion || isMobile) {
    return (
      <div className={className}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration, 
        delay: delay + (index * 0.1), 
        ease: "easeOut" 
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Composant pour les animations de navigation
interface NavAnimationProps {
  children: React.ReactNode
  className?: string
}

export function NavAnimation({ children, className = "" }: NavAnimationProps) {
  const prefersReducedMotion = useReducedMotion()
  const isMobile = useIsMobile()

  if (prefersReducedMotion || isMobile) {
    return (
      <div className={className}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Composant pour les animations de page
interface PageAnimationProps {
  children: React.ReactNode
  className?: string
}

export function PageAnimation({ children, className = "" }: PageAnimationProps) {
  const prefersReducedMotion = useReducedMotion()
  const isMobile = useIsMobile()

  if (prefersReducedMotion || isMobile) {
    return (
      <div className={className}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      {children}
    </motion.div>
  )
} 