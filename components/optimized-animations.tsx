"use client"

import { motion, useInView, useAnimation } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { useIntersectionObserver } from '@/hooks/use-scroll-optimization'

interface OptimizedScrollRevealProps {
  children: React.ReactNode
  delay?: number
  duration?: number
  className?: string
  threshold?: number
}

export function OptimizedScrollReveal({ 
  children, 
  delay = 0, 
  duration = 0.6,
  className = "",
  threshold = 0.1
}: OptimizedScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { 
    once: true, 
    threshold,
    margin: "0px 0px -100px 0px"
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
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

interface OptimizedScaleOnHoverProps {
  children: React.ReactNode
  scale?: number
  duration?: number
  className?: string
}

export function OptimizedScaleOnHover({ 
  children, 
  scale = 1.05, 
  duration = 0.2,
  className = ""
}: OptimizedScaleOnHoverProps) {
  return (
    <motion.div
      whileHover={{ scale }}
      whileTap={{ scale: scale * 0.95 }}
      transition={{ duration }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface OptimizedFadeInProps {
  children: React.ReactNode
  delay?: number
  duration?: number
  className?: string
}

export function OptimizedFadeIn({ 
  children, 
  delay = 0, 
  duration = 0.6,
  className = ""
}: OptimizedFadeInProps) {
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

interface OptimizedSlideInProps {
  children: React.ReactNode
  direction?: 'left' | 'right' | 'up' | 'down'
  delay?: number
  duration?: number
  className?: string
}

export function OptimizedSlideIn({ 
  children, 
  direction = 'up',
  delay = 0, 
  duration = 0.6,
  className = ""
}: OptimizedSlideInProps) {
  const getInitialPosition = () => {
    switch (direction) {
      case 'left': return { x: -50, y: 0 }
      case 'right': return { x: 50, y: 0 }
      case 'down': return { x: 0, y: 50 }
      default: return { x: 0, y: -50 }
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, ...getInitialPosition() }}
      animate={{ opacity: 1, x: 0, y: 0 }}
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

// Hook pour optimiser les animations en fonction de la préférence utilisateur
export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return prefersReducedMotion
}

// Composant pour les animations conditionnelles
interface ConditionalAnimationProps {
  children: React.ReactNode
  withAnimation?: boolean
  fallback?: React.ReactNode
}

export function ConditionalAnimation({ 
  children, 
  withAnimation = true,
  fallback
}: ConditionalAnimationProps) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion || !withAnimation) {
    return <>{fallback || children}</>
  }

  return <>{children}</>
}
