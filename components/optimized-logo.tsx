"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

interface OptimizedLogoProps {
  className?: string
  priority?: boolean
}

export function OptimizedLogo({ className = "", priority = true }: OptimizedLogoProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  const handleLoad = () => {
    setIsLoaded(true)
  }

  const handleError = () => {
    setHasError(true)
  }

  // Fallback si l'image échoue
  if (hasError) {
    return (
      <div className={`bg-gradient-to-br from-copper/20 to-sand/20 rounded-lg flex items-center justify-center ${className}`}>
        <span className="text-copper font-bold text-xs">SLG</span>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      {/* Image optimisée avec Next.js Image et tailles responsives */}
      <Image
        src="/optimized/navbar-desktop.webp"
        alt="STRATELINK GLOBAL"
        width={80}
        height={64}
        className={`transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } w-14 h-10 sm:w-16 sm:h-12 lg:w-20 lg:h-16 object-contain`}
        priority={priority}
        onLoad={handleLoad}
        onError={handleError}
        style={{
          objectFit: 'contain',
          objectPosition: 'center'
        }}
      />
      
      {/* Skeleton loader pendant le chargement */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-r from-navy/20 to-copper/20 animate-pulse rounded-lg flex items-center justify-center">
          <div className="w-8 h-8 bg-gradient-to-br from-copper/30 to-sand/30 rounded"></div>
        </div>
      )}
    </div>
  )
}

// Version alternative avec picture element pour plus de compatibilité
export function ResponsiveOptimizedLogo({ className = "" }: { className?: string }) {
  return (
    <picture className={className}>
      {/* Mobile - w-14 h-10 (56x40) */}
      <source
        media="(max-width: 640px)"
        srcSet="/optimized/navbar-mobile.webp"
        type="image/webp"
      />
      
      {/* Tablet - w-16 h-12 (64x48) */}
      <source
        media="(min-width: 641px) and (max-width: 1024px)"
        srcSet="/optimized/navbar-tablet.webp"
        type="image/webp"
      />
      
      {/* Desktop - w-20 h-16 (80x64) */}
      <source
        media="(min-width: 1025px)"
        srcSet="/optimized/navbar-desktop.webp"
        type="image/webp"
      />
      
      {/* Fallback PNG si WebP n'est pas supporté */}
      <source
        srcSet="/apple-touch-icon.png"
        type="image/png"
      />
      
      {/* Image par défaut optimisée */}
      <img
        src="/optimized/navbar-tablet.webp"
        alt="STRATELINK GLOBAL"
        className="w-14 h-10 sm:w-16 sm:h-12 lg:w-20 lg:h-16 object-contain transition-opacity duration-300"
        loading="eager"
        style={{
          objectFit: 'contain',
          objectPosition: 'center'
        }}
      />
    </picture>
  )
} 