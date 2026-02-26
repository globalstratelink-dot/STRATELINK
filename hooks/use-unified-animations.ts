"use client"

import { useEffect, useRef, useState, useCallback } from 'react'

// Hook pour gérer les animations unifiées
export function useUnifiedAnimations() {
  const [isReducedMotion, setIsReducedMotion] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)

  // Détecter les préférences de mouvement réduit
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
      setIsReducedMotion(mediaQuery.matches)

      const handleChange = (e: MediaQueryListEvent) => {
        setIsReducedMotion(e.matches)
      }

      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    }
  }, [])

  // Détecter si c'est un appareil mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Fonction pour révéler les éléments au scroll
  const revealOnScroll = useCallback((selector: string, options?: {
    threshold?: number
    rootMargin?: string
    className?: string
  }) => {
    if (isReducedMotion || isMobile) {
      // Sur mobile ou avec mouvement réduit, afficher directement
      const elements = document.querySelectorAll(selector)
      elements.forEach(el => {
        el.classList.add(options?.className || 'revealed')
      })
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(options?.className || 'revealed')
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: options?.threshold || 0.1,
        rootMargin: options?.rootMargin || '0px 0px -50px 0px'
      }
    )

    const elements = document.querySelectorAll(selector)
    elements.forEach(el => observer.observe(el))

    observerRef.current = observer

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [isReducedMotion, isMobile])

  // Fonction pour animer les éléments avec délai
  const staggerReveal = useCallback((selector: string, staggerDelay: number = 100) => {
    if (isReducedMotion || isMobile) {
      // Sur mobile ou avec mouvement réduit, afficher directement
      const elements = document.querySelectorAll(selector)
      elements.forEach(el => {
        el.classList.add('revealed')
      })
      return
    }

    const elements = document.querySelectorAll(selector)
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('revealed')
      }, index * staggerDelay)
    })
  }, [isReducedMotion, isMobile])

  // Fonction pour ajouter des animations CSS
  const addAnimationClass = useCallback((element: HTMLElement, animationClass: string, delay?: number) => {
    if (isReducedMotion || isMobile) {
      element.classList.add(animationClass)
      return
    }

    if (delay) {
      setTimeout(() => {
        element.classList.add(animationClass)
      }, delay)
    } else {
      element.classList.add(animationClass)
    }
  }, [isReducedMotion, isMobile])

  // Fonction pour gérer les animations de page
  const animatePageEnter = useCallback((selector: string) => {
    if (isReducedMotion || isMobile) {
      const elements = document.querySelectorAll(selector)
      elements.forEach(el => {
        el.classList.add('page-enter')
      })
      return
    }

    const elements = document.querySelectorAll(selector)
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('page-enter')
      }, index * 100)
    })
  }, [isReducedMotion, isMobile])

  // Fonction pour gérer les animations de navigation
  const animateNavigation = useCallback((selector: string) => {
    if (isReducedMotion || isMobile) {
      const elements = document.querySelectorAll(selector)
      elements.forEach(el => {
        el.classList.add('nav-slide-in')
      })
      return
    }

    const elements = document.querySelectorAll(selector)
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('nav-slide-in')
      }, index * 50)
    })
  }, [isReducedMotion, isMobile])

  // Fonction pour gérer les animations de cartes
  const animateCards = useCallback((selector: string) => {
    if (isReducedMotion || isMobile) {
      const elements = document.querySelectorAll(selector)
      elements.forEach(el => {
        el.classList.add('card-reveal')
      })
      return
    }

    const elements = document.querySelectorAll(selector)
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('card-reveal')
      }, index * 150)
    })
  }, [isReducedMotion, isMobile])

  // Fonction pour gérer les animations de texte
  const animateText = useCallback((selector: string) => {
    if (isReducedMotion || isMobile) {
      const elements = document.querySelectorAll(selector)
      elements.forEach(el => {
        el.classList.add('text-reveal')
      })
      return
    }

    const elements = document.querySelectorAll(selector)
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('text-reveal')
      }, index * 100)
    })
  }, [isReducedMotion, isMobile])

  // Fonction pour initialiser toutes les animations
  const initializeAnimations = useCallback(() => {
    // Révéler les éléments au scroll
    revealOnScroll('.scroll-reveal')
    revealOnScroll('.scroll-reveal-left')
    revealOnScroll('.scroll-reveal-right')
    revealOnScroll('.card-reveal')
    revealOnScroll('.text-reveal')

    // Animer la navigation
    animateNavigation('.nav-animation')

    // Animer les cartes
    animateCards('.card-animation')

    // Animer le texte
    animateText('.text-animation')

    // Animer l'entrée de page
    animatePageEnter('.page-animation')
  }, [revealOnScroll, animateNavigation, animateCards, animateText, animatePageEnter])

  // Nettoyer l'observer
  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  return {
    isReducedMotion,
    isMobile,
    revealOnScroll,
    staggerReveal,
    addAnimationClass,
    animatePageEnter,
    animateNavigation,
    animateCards,
    animateText,
    initializeAnimations
  }
}

// Hook pour les animations de scroll individuelles
export function useScrollAnimation(options?: {
  threshold?: number
  rootMargin?: string
  className?: string
}) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      {
        threshold: options?.threshold || 0.1,
        rootMargin: options?.rootMargin || '0px 0px -50px 0px'
      }
    )

    observerRef.current = observer

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [options?.threshold, options?.rootMargin])

  return { ref, isVisible }
}

// Hook pour les animations de hover
export function useHoverAnimation(scale: number = 1.05) {
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseEnter = () => setIsHovered(true)
  const handleMouseLeave = () => setIsHovered(false)

  return {
    isHovered,
    handleMouseEnter,
    handleMouseLeave,
    style: {
      transform: isHovered ? `scale(${scale})` : 'scale(1)',
      transition: 'transform 0.2s ease'
    }
  }
} 