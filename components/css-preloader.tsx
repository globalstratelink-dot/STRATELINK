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
  // Composant simplifié pour éviter les conflits avec Next.js
  // Les CSS sont gérés automatiquement par le framework
  return null
}

// Composant spécialisé pour les CSS critiques de la page d'accueil
export function HomePageCSSPreloader() {
  // Ne pas précharger les CSS Next.js car ils sont gérés automatiquement
  // Cela évite les erreurs de décodage et les conflits
  return null
}

// Composant pour précharger tous les CSS
export function GlobalCSSPreloader() {
  // Désactivé temporairement pour éviter les conflits de chargement CSS
  // Les polices Google Fonts sont déjà gérées par Next.js
  return null
} 