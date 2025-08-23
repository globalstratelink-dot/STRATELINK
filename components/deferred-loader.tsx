"use client"

import { useEffect, useState } from 'react'

interface DeferredLoaderProps {
  children: React.ReactNode
  threshold?: number
  placeholder?: React.ReactNode
  className?: string
}

export function DeferredLoader({ 
  children, 
  threshold = 0.1, 
  placeholder,
  className = ""
}: DeferredLoaderProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold }
    )

    const element = document.createElement('div')
    element.style.height = '1px'
    element.style.width = '1px'
    document.body.appendChild(element)
    
    observer.observe(element)

    return () => {
      observer.disconnect()
      document.body.removeChild(element)
    }
  }, [threshold])

  useEffect(() => {
    if (isVisible) {
      // Simuler un délai pour éviter le blocage
      const timer = setTimeout(() => {
        setIsLoaded(true)
      }, 100)

      return () => clearTimeout(timer)
    }
  }, [isVisible])

  if (!isVisible) {
    return placeholder || (
      <div className={`animate-pulse bg-gray-200 rounded ${className}`}>
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
      </div>
    )
  }

  if (!isLoaded) {
    return placeholder || (
      <div className={`animate-pulse bg-gray-200 rounded ${className}`}>
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
      </div>
    )
  }

  return <>{children}</>
}

// Composant pour charger les CSS de manière différée
export function DeferredCSSLoader({ 
  cssPaths, 
  children 
}: { 
  cssPaths: string[]
  children: React.ReactNode 
}) {
  const [cssLoaded, setCssLoaded] = useState(false)

  useEffect(() => {
    let loadedCount = 0
    const totalCSS = cssPaths.length

    cssPaths.forEach(cssPath => {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = cssPath
      link.onload = () => {
        loadedCount++
        if (loadedCount === totalCSS) {
          setCssLoaded(true)
        }
      }
      link.onerror = () => {
        loadedCount++
        if (loadedCount === totalCSS) {
          setCssLoaded(true)
        }
      }
      document.head.appendChild(link)
    })
  }, [cssPaths])

  if (!cssLoaded) {
    return (
      <div className="animate-pulse">
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
      </div>
    )
  }

  return <>{children}</>
}

// Composant pour charger les images de manière différée
export function DeferredImageLoader({ 
  src, 
  alt, 
  className = "",
  placeholder
}: { 
  src: string
  alt: string
  className?: string
  placeholder?: React.ReactNode
}) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const img = new Image()
    img.onload = () => setIsLoaded(true)
    img.onerror = () => setIsLoaded(true) // Afficher quand même en cas d'erreur
    img.src = src
  }, [src])

  if (!isLoaded) {
    return placeholder || (
      <div className={`animate-pulse bg-gray-200 rounded ${className}`}>
        <div className="h-full bg-gray-300 rounded"></div>
      </div>
    )
  }

  return (
    <img 
      src={src} 
      alt={alt} 
      className={className}
      loading="lazy"
    />
  )
} 