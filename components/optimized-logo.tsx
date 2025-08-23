"use client"

import Image from "next/image"
import { useState, useEffect } from "react"

interface OptimizedLogoProps {
  alt?: string
  className?: string
  priority?: boolean
  size?: 'tiny' | 'mobile' | 'tablet' | 'desktop' | 'auto'
}

export function OptimizedLogo({ 
  alt = "STRATELINK GLOBAL", 
  className = "", 
  priority = false,
  size = 'auto'
}: OptimizedLogoProps) {
  const [currentSize, setCurrentSize] = useState<'mobile' | 'tablet' | 'desktop'>('desktop')
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const checkSize = () => {
      const width = window.innerWidth
      if (width <= 640) {
        setCurrentSize('mobile')
      } else if (width <= 1024) {
        setCurrentSize('tablet')
      } else {
        setCurrentSize('desktop')
      }
    }
    
    checkSize()
    window.addEventListener('resize', checkSize)
    
    return () => window.removeEventListener('resize', checkSize)
  }, [])

  // Configuration des tailles selon les classes Tailwind
  const logoConfig = {
    tiny: {
      src: '/optimized/new-logo-16w.png',
      width: 16,
      height: 16,
      className: 'w-4 h-4'
    },
    mobile: {
      src: '/optimized/new-logo-mobile.png',
      width: 56,
      height: 40,
      className: 'w-14 h-10'
    },
    tablet: {
      src: '/optimized/new-logo-tablet.png',
      width: 64,
      height: 48,
      className: 'w-16 h-12'
    },
    desktop: {
      src: '/optimized/new-logo-desktop.png',
      width: 80,
      height: 64,
      className: 'w-20 h-16'
    }
  }

  // Sélectionner la configuration selon la taille demandée
  const config = size === 'auto' ? logoConfig[currentSize] : logoConfig[size]

  const handleLoad = () => {
    setIsLoaded(true)
  }

  const handleError = (e: any) => {
    console.warn(`Logo failed to load: ${config.src}`)
    // Fallback vers le logo original en cas d'erreur
    const target = e.target as HTMLImageElement
    target.src = '/new-logo.png'
  }

  return (
    <>
      <Image
        src={config.src}
        alt={alt}
        width={config.width}
        height={config.height}
        className={`${config.className} ${className} filter brightness-125 transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        priority={priority}
        onLoad={handleLoad}
        onError={handleError}
        unoptimized={true}
        style={{
          objectFit: 'contain',
          objectPosition: 'center'
        }}
      />
      
      {/* Skeleton loader */}
      {!isLoaded && (
        <div className={`${config.className} ${className} bg-gradient-to-r from-navy/20 to-copper/20 animate-pulse rounded`}>
          <div className="w-full h-full bg-gradient-to-br from-navy/30 via-copper/20 to-sand/20 rounded"></div>
        </div>
      )}
    </>
  )
}

// Composant spécialisé pour la navbar
export function NavbarLogo({ className = "" }: { className?: string }) {
  return (
    <OptimizedLogo
      alt="STRATELINK GLOBAL"
      className={`${className} filter brightness-125`}
      priority={true}
      size="auto"
    />
  )
}

// Composant spécialisé pour les petits logos
export function TinyLogo({ className = "" }: { className?: string }) {
  return (
    <OptimizedLogo
      alt="STRATELINK"
      className={`${className} filter brightness-110`}
      priority={false}
      size="tiny"
    />
  )
}

// Composant responsive avec toutes les tailles
export function ResponsiveLogo({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      {/* Mobile */}
      <Image
        src="/optimized/new-logo-mobile.png"
        alt="STRATELINK GLOBAL"
        width={56}
        height={40}
        className="w-14 h-10 sm:hidden filter brightness-125"
        priority={true}
        unoptimized={true}
      />
      
      {/* Tablet */}
      <Image
        src="/optimized/new-logo-tablet.png"
        alt="STRATELINK GLOBAL"
        width={64}
        height={48}
        className="hidden sm:block lg:hidden w-16 h-12 filter brightness-125"
        priority={true}
        unoptimized={true}
      />
      
      {/* Desktop */}
      <Image
        src="/optimized/new-logo-desktop.png"
        alt="STRATELINK GLOBAL"
        width={80}
        height={64}
        className="hidden lg:block w-20 h-16 filter brightness-125"
        priority={true}
        unoptimized={true}
      />
    </div>
  )
} 