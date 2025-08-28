'use client'

import { useEffect } from 'react'

export function PerformanceOptimizer() {
  useEffect(() => {
    // Optimisation immédiate et permanente
    const optimizePerformance = () => {
      // 1. Afficher immédiatement tout le contenu
      const style = document.createElement('style')
      style.textContent = `
        /* OPTIMISATION PERFORMANCE IMMÉDIATE */
        
        /* Afficher immédiatement tout le contenu */
        body, main, div, section, article, aside, header, footer {
          opacity: 1 !important;
          visibility: visible !important;
          transform: none !important;
        }
        
        /* Désactiver toutes les animations complexes */
        .scroll-reveal,
        .scroll-reveal-left,
        .scroll-reveal-right,
        .card-reveal,
        .text-reveal,
        .page-animation,
        .nav-animation,
        .animate-fade-in,
        .animate-slide-up,
        .animate-slide-down,
        .animate-slide-left,
        .animate-slide-right,
        .animate-scale-in,
        .stagger-container > *,
        [data-framer-motion] {
          opacity: 1 !important;
          transform: none !important;
          transition: none !important;
          animation: none !important;
          animation-duration: 0s !important;
          transition-duration: 0s !important;
        }
        
        /* Optimiser les images */
        img {
          opacity: 1 !important;
          transition: none !important;
          animation: none !important;
        }
        
        /* Accélérer les transitions simples */
        * {
          transition-duration: 0.1s !important;
          animation-duration: 0.1s !important;
        }
        
        /* Désactiver les effets de hover complexes */
        .hover-scale:hover,
        .hover-lift:hover,
        .hover-glow:hover {
          transform: none !important;
          box-shadow: inherit !important;
        }
        
        /* Optimisation mobile spécifique */
        @media (max-width: 768px) {
          * {
            animation-duration: 0s !important;
            transition-duration: 0s !important;
          }
        }
        
        /* Optimisation des polices */
        * {
          font-display: swap !important;
        }
      `
      
      // Ajouter le style au head
      document.head.appendChild(style)
      
      // 2. Forcer l'affichage immédiat de tous les éléments
      const allElements = document.querySelectorAll('*')
      allElements.forEach((element) => {
        if (element instanceof HTMLElement) {
          element.style.opacity = '1'
          element.style.visibility = 'visible'
          element.style.transform = 'none'
        }
      })
    }

    // Appliquer immédiatement
    optimizePerformance()

    // Optimisation pour les nouveaux éléments
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node instanceof HTMLElement) {
              node.style.opacity = '1'
              node.style.visibility = 'visible'
              node.style.transform = 'none'
            }
          })
        }
      })
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  return null
}
