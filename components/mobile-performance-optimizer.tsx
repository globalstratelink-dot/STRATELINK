"use client"

import { useEffect } from 'react'

export function MobilePerformanceOptimizer() {
  useEffect(() => {
    // Détecter si c'est un appareil mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768
    
    if (isMobile) {
      // Optimisations spécifiques pour mobile - Élimination complète des vibrations
      
      const style = document.createElement('style')
      style.textContent = `
        /* ÉLIMINATION COMPLÈTE DES VIBRATIONS SUR MOBILE */
        @media (max-width: 768px) {
          /* 1. DÉSACTIVER TOUTES LES ANIMATIONS FRAMER MOTION CONTINUES */
          [data-framer-motion] {
            animation: none !important;
            animation-duration: 0s !important;
            animation-iteration-count: 1 !important;
            animation-play-state: paused !important;
          }
          
          /* 2. DÉSACTIVER LES ANIMATIONS CSS CONTINUES */
          * {
            animation-play-state: paused !important;
            animation-duration: 0s !important;
            animation-iteration-count: 1 !important;
          }
          
          /* 3. RÉDUIRE DRASTIQUEMENT LES TRANSITIONS */
          * {
            transition-duration: 0.05s !important;
            transition-timing-function: ease-out !important;
          }
          
          /* 4. DÉSACTIVER LES EFFETS DE FLOU PROBLÉMATIQUES */
          .blur-3xl,
          .blur-2xl,
          .blur-xl,
          .backdrop-blur-sm,
          .backdrop-blur-md {
            filter: none !important;
            backdrop-filter: none !important;
            -webkit-backdrop-filter: none !important;
          }
          
          /* 5. SIMPLIFIER LES OMBRES COMPLEXES */
          .shadow-2xl,
          .shadow-xl,
          .shadow-lg {
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1) !important;
          }
          
          /* 6. DÉSACTIVER LES GRADIENTS COMPLEXES */
          .bg-gradient-to-br,
          .bg-gradient-to-r,
          .bg-gradient-to-t {
            background: var(--tw-gradient-from) !important;
          }
          
          /* 7. OPTIMISER LE RENDU 3D */
          * {
            backface-visibility: hidden !important;
            -webkit-backface-visibility: hidden !important;
            transform-style: flat !important;
            -webkit-transform-style: flat !important;
            perspective: none !important;
            -webkit-perspective: none !important;
            will-change: auto !important;
          }
          
          /* 8. DÉSACTIVER LES TRANSFORMATIONS PARALLAXE */
          [style*="transform"],
          .parallax,
          [data-parallax] {
            transform: none !important;
          }
          
          /* 9. OPTIMISER LE SCROLL */
          html {
            scroll-behavior: auto !important;
            -webkit-overflow-scrolling: touch;
          }
          
          /* 10. DÉSACTIVER LES EFFETS HOVER SUR MOBILE */
          .hover\\:scale-105:hover,
          .hover\\:border-copper\\/40:hover,
          .hover\\:shadow-lg:hover {
            transform: none !important;
            border-color: inherit !important;
            box-shadow: inherit !important;
          }
          
          /* 11. OPTIMISER LES IMAGES */
          img {
            image-rendering: optimizeSpeed;
            image-rendering: -webkit-optimize-contrast;
          }
          
          /* 12. AMÉLIORER LA RÉACTIVITÉ TACTILE */
          button,
          a,
          [role="button"] {
            min-height: 44px;
            min-width: 44px;
            -webkit-tap-highlight-color: transparent;
          }
          
          /* 13. DÉSACTIVER LES ANIMATIONS DE TAP */
          *:active {
            transform: none !important;
            scale: none !important;
          }
          
          /* 14. SIMPLIFIER LES BORDURES COMPLEXES */
          .border-copper\\/20,
          .border-copper\\/30,
          .border-copper\\/40 {
            border-color: rgba(169, 121, 104, 0.3) !important;
          }
          
          /* 15. SIMPLIFIER LES ARRIÈRE-PLANS */
          .bg-navy\\/50,
          .bg-navy\\/95 {
            background-color: rgb(4, 19, 49) !important;
          }
        }
        
        /* DÉSACTIVATION COMPLÈTE SI RÉDUCTION DE MOUVEMENT */
        @media (max-width: 768px) and (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
            transition: none !important;
            transform: none !important;
            animation-duration: 0s !important;
            transition-duration: 0s !important;
          }
        }
        
        /* OPTIMISATIONS SPÉCIFIQUES POUR ÉCRANS TACTILES */
        @media (max-width: 768px) and (pointer: coarse) {
          .transition-transform {
            transition: none !important;
          }
          
          .hover\\:scale-105 {
            transform: none !important;
          }
        }
      `
      document.head.appendChild(style)

      // Optimisations JavaScript pour éliminer les vibrations
      const optimizeMobilePerformance = () => {
        // 1. Désactiver le scroll smooth sur mobile
        document.documentElement.style.scrollBehavior = 'auto'
        
        // 2. Optimiser le touch scrolling
        ;(document.documentElement.style as any)['-webkit-overflow-scrolling'] = 'touch'
        
        // 3. Désactiver les animations Framer Motion continues
        const motionElements = document.querySelectorAll('[data-framer-motion]')
        motionElements.forEach((element) => {
          if (element instanceof HTMLElement) {
            element.style.animation = 'none'
            element.style.transition = 'none'
          }
        })
        
        // 4. Optimiser les éléments avec des animations CSS
        const animatedElements = document.querySelectorAll('*')
        animatedElements.forEach((element) => {
          if (element instanceof HTMLElement) {
            const computedStyle = window.getComputedStyle(element)
            if (computedStyle.animationName !== 'none' || computedStyle.animationDuration !== '0s') {
              element.style.animationPlayState = 'paused'
              element.style.animationDuration = '0s'
            }
          }
        })
      }

      // Appliquer les optimisations immédiatement
      optimizeMobilePerformance()

      // Réappliquer lors des changements de taille d'écran
      const handleResize = () => {
        if (window.innerWidth >= 768) {
          // Restaurer les animations sur desktop
          document.documentElement.style.scrollBehavior = 'smooth'
        } else {
          // Réappliquer les optimisations mobile
          optimizeMobilePerformance()
        }
      }

      window.addEventListener('resize', handleResize)

      // Nettoyer lors du démontage
      return () => {
        document.head.removeChild(style)
        window.removeEventListener('resize', handleResize)
        
        // Restaurer les paramètres par défaut
        document.documentElement.style.scrollBehavior = ''
        ;(document.documentElement.style as any)['-webkit-overflow-scrolling'] = ''
      }
    }
  }, [])

  return null
} 