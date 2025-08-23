"use client"

import { useEffect } from 'react'

interface CSSPreloaderProps {
  criticalCSS?: string[]
  nonCriticalCSS?: string[]
}

export function CSSPreloader({ 
  criticalCSS = [], 
  nonCriticalCSS = [] 
}: CSSPreloaderProps) {
  useEffect(() => {
    // Précharger les CSS critiques de manière synchrone
    criticalCSS.forEach(cssPath => {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = cssPath
      link.setAttribute('data-critical', 'true')
      document.head.appendChild(link)
    })

    // Précharger les CSS non-critiques de manière asynchrone
    nonCriticalCSS.forEach(cssPath => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.href = cssPath
      link.as = 'style'
      link.onload = () => {
        link.rel = 'stylesheet'
        link.removeAttribute('data-critical')
      }
      document.head.appendChild(link)
    })

    // Nettoyage lors du démontage
    return () => {
      document.querySelectorAll('link[data-critical="true"]').forEach(link => {
        link.remove()
      })
    }
  }, [criticalCSS, nonCriticalCSS])

  return null
}

// Composant spécialisé pour les CSS critiques de la page d'accueil
export function HomePageCSSPreloader() {
  const criticalCSS = [
    '/_next/static/css/app/layout.css',
    '/_next/static/css/app/globals.css'
  ]

  const nonCriticalCSS = [
    '/_next/static/css/app/page.css'
  ]

  return (
    <CSSPreloader 
      criticalCSS={criticalCSS}
      nonCriticalCSS={nonCriticalCSS}
    />
  )
}

// Composant pour précharger tous les CSS
export function GlobalCSSPreloader() {
  useEffect(() => {
    // Précharger les polices Google Fonts
    const fontLink = document.createElement('link')
    fontLink.rel = 'preconnect'
    fontLink.href = 'https://fonts.googleapis.com'
    document.head.appendChild(fontLink)

    const fontLink2 = document.createElement('link')
    fontLink2.rel = 'preconnect'
    fontLink2.href = 'https://fonts.gstatic.com'
    fontLink2.crossOrigin = 'anonymous'
    document.head.appendChild(fontLink2)

    // Précharger les icônes Lucide
    const iconLink = document.createElement('link')
    iconLink.rel = 'preload'
    iconLink.href = 'https://unpkg.com/lucide@latest/dist/umd/lucide.js'
    iconLink.as = 'script'
    document.head.appendChild(iconLink)

    // Nettoyage
    return () => {
      document.querySelectorAll('link[rel="preconnect"]').forEach(link => link.remove())
      document.querySelectorAll('link[as="script"]').forEach(link => link.remove())
    }
  }, [])

  return null
} 