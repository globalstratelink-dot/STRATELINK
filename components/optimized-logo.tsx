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
    <picture className={`block shrink-0 leading-none ${className}`}>
      {/* Mobile */}
      <source
        media="(max-width: 640px)"
        srcSet="/optimized/logo-96x96.webp 1x, /optimized/logo-128x128.webp 2x"
        type="image/webp"
      />

      {/* Tablette */}
      <source
        media="(min-width: 641px) and (max-width: 1023px)"
        srcSet="/optimized/logo-128x128.webp 1x, /optimized/logo-180x180.webp 2x"
        type="image/webp"
      />

      {/* Petit écran PC (1024–1279px) */}
      <source
        media="(min-width: 1024px) and (max-width: 1279px)"
        srcSet="/optimized/logo-128x128.webp 1x, /optimized/logo-180x180.webp 2x"
        type="image/webp"
      />

      {/* Grand écran */}
      <source
        media="(min-width: 1280px)"
        srcSet="/optimized/logo-180x180.webp 1x, /optimized/logo.webp 2x"
        type="image/webp"
      />

      {/* Fallback PNG */}
      <source
        srcSet="/optimized/new-logo-64w.png 1x, /optimized/logo-224w.png 2x"
        type="image/png"
      />

      <img
        src="/optimized/logo-128x128.webp"
        srcSet="/optimized/logo-96x96.webp 56w, /optimized/logo-128x128.webp 80w, /optimized/logo-180x180.webp 120w, /optimized/logo.webp 160w"
        sizes="(min-width: 1280px) 80px, (min-width: 1024px) 56px, (min-width: 641px) 64px, 48px"
        alt="STRATELINK GLOBAL"
        className="h-full w-full object-contain object-left transition-opacity duration-300"
        loading="eager"
        decoding="async"
      />
    </picture>
  )
} 