"use client"

import { useEffect } from 'react'

export function MobilePerformanceOptimizer() {
  useEffect(() => {
    // Détecter si c'est un appareil mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768
    
    if (isMobile) {
      // Optimisations spécifiques pour mobile
      
      // Désactiver les animations CSS continues
      const style = document.createElement('style')
      style.textContent = `
        /* Désactiver les animations problématiques sur mobile */
        @media (max-width: 768px) {
          /* Pause toutes les animations en cours */
          * {
            animation-play-state: paused !important;
          }
          
          /* Réduire les transitions */
          * {
            transition-duration: 0.1s !important;
          }
          
          /* Optimiser le scroll */
          html {
            scroll-behavior: auto !important;
            -webkit-overflow-scrolling: touch;
          }
        }
      `
      document.head.appendChild(style)

      // Optimiser le scroll sur mobile
      const optimizeScroll = () => {
        // Désactiver le scroll smooth sur mobile
        document.documentElement.style.scrollBehavior = 'auto'
        
        // Optimiser le touch scrolling
        ;(document.documentElement.style as any)['-webkit-overflow-scrolling'] = 'touch'
      }

      optimizeScroll()

      // Écouter les changements de taille d'écran
      const handleResize = () => {
        if (window.innerWidth >= 768) {
          // Restaurer les animations sur desktop
          document.documentElement.style.scrollBehavior = 'smooth'
        } else {
          optimizeScroll()
        }
      }

      window.addEventListener('resize', handleResize)

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