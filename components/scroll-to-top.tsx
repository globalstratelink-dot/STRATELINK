"use client"

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function ScrollToTop() {
  const pathname = usePathname()

  useEffect(() => {
    // Détecter si c'est un appareil mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768
    
    // Faire remonter la barre de défilement en haut de la page
    // Sur mobile, utiliser 'auto' pour éviter les vibrations
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: isMobile ? 'auto' : 'smooth'
    })
  }, [pathname]) // Se déclenche à chaque changement de page

  return null // Ce composant ne rend rien visuellement
} 