"use client"

import { useEffect } from 'react'
import { useUnifiedAnimations } from '@/hooks/use-unified-animations'

interface AnimationInitializerProps {
  children?: React.ReactNode
}

export function AnimationInitializer({ children }: AnimationInitializerProps) {
  const { initializeAnimations } = useUnifiedAnimations()

  useEffect(() => {
    // Initialiser toutes les animations après le rendu
    const timer = setTimeout(() => {
      initializeAnimations()
    }, 100)

    return () => clearTimeout(timer)
  }, [initializeAnimations])

  // Ce composant ne rend rien visuellement, il initialise juste les animations
  return null
}

// Composant pour wrapper les pages avec des animations
export function AnimatedPage({ children, className = "" }: { 
  children: React.ReactNode
  className?: string 
}) {
  return (
    <div className={`page-animation ${className}`}>
      {children}
    </div>
  )
}

// Composant pour les sections avec révélation au scroll
export function AnimatedSection({ 
  children, 
  className = "", 
  direction = 'up',
  delay = 0 
}: { 
  children: React.ReactNode
  className?: string
  direction?: 'up' | 'down' | 'left' | 'right'
  delay?: number
}) {
  const getScrollClass = () => {
    switch (direction) {
      case 'left': return 'scroll-reveal-left'
      case 'right': return 'scroll-reveal-right'
      case 'down': return 'scroll-reveal'
      default: return 'scroll-reveal'
    }
  }

  return (
    <div className={`${getScrollClass()} ${className}`} style={{ animationDelay: `${delay}s` }}>
      {children}
    </div>
  )
}

// Composant pour les cartes avec animation
export function AnimatedCard({ 
  children, 
  className = "", 
  index = 0 
}: { 
  children: React.ReactNode
  className?: string
  index?: number
}) {
  return (
    <div className={`card-reveal ${className}`} style={{ animationDelay: `${index * 0.1}s` }}>
      {children}
    </div>
  )
}

// Composant pour le texte avec animation
export function AnimatedText({ 
  children, 
  className = "", 
  index = 0 
}: { 
  children: React.ReactNode
  className?: string
  index?: number
}) {
  return (
    <div className={`text-reveal ${className}`} style={{ animationDelay: `${index * 0.1}s` }}>
      {children}
    </div>
  )
}

// Composant pour les conteneurs avec animations staggered
export function StaggeredContainer({ 
  children, 
  className = "" 
}: { 
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={`stagger-container ${className}`}>
      {children}
    </div>
  )
}

// Composant pour la navigation avec animation
export function AnimatedNavigation({ 
  children, 
  className = "" 
}: { 
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={`nav-animation ${className}`}>
      {children}
    </div>
  )
} 