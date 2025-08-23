"use client"

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function ScrollToTop() {
  const pathname = usePathname()

  useEffect(() => {
    // Faire remonter la barre de défilement en haut de la page
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  }, [pathname]) // Se déclenche à chaque changement de page

  return null // Ce composant ne rend rien visuellement
} 