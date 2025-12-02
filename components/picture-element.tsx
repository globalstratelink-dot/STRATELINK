"use client"

import { useState, useEffect } from "react"

interface PictureElementProps {
  src: string
  alt: string
  className?: string
  sizes?: string
  priority?: boolean
  fallback?: string
}

export function PictureElement({
  src,
  alt,
  className = "",
  sizes = "100vw",
  priority = false,
  fallback
}: PictureElementProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  const handleLoad = () => {
    setIsLoaded(true)
  }

  const handleError = () => {
    setHasError(true)
  }

  // Fallback si l'image échoue
  if (hasError && fallback) {
    return (
      <img
        src={fallback}
        alt={alt}
        className={className}
        loading={priority ? "eager" : "lazy"}
        onLoad={handleLoad}
      />
    )
  }

  return (
    <picture className={className}>
      {/* Version WebP pour les navigateurs modernes */}
      <source
        srcSet={`${src.replace('.png', '-webp.webp')}`}
        type="image/webp"
        sizes={sizes}
      />
      
      {/* Version PNG comme fallback */}
      <img
        src={src}
        alt={alt}
        className={`transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        loading={priority ? "eager" : "lazy"}
        onLoad={handleLoad}
        onError={handleError}
        sizes={sizes}
        style={{
          objectFit: 'cover',
          objectPosition: 'center'
        }}
      />
      
      {/* Skeleton loader */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-r from-navy/20 to-copper/20 animate-pulse rounded">
          <div className="w-full h-full bg-gradient-to-br from-navy/30 via-copper/20 to-sand/20 rounded"></div>
        </div>
      )}
    </picture>
  )
}

// Composant spécialisé pour le logo avec toutes les tailles
export function ResponsivePictureLogo({ className = "" }: { className?: string }) {
  return (
    <picture className={className}>
      {/* Mobile - w-14 h-10 (56x40) */}
      <source
        media="(max-width: 640px)"
        srcSet="/optimized/new-logo-16x16.png"
        type="image/png"
      />
      
      {/* Tablet - w-16 h-12 (64x48) */}
      <source
        media="(min-width: 641px) and (max-width: 1024px)"
        srcSet="/optimized/new-logo-32x32.png"
        type="image/png"
      />
      
      {/* Desktop - w-20 h-16 (80x64) */}
      <source
        media="(min-width: 1025px)"
        srcSet="/optimized/new-logo-64x64.png"
        type="image/png"
      />
      
      {/* Image par défaut optimisée */}
      <img
        src="/optimized/new-logo-32x32.png"
        alt="STRATELINK GLOBAL"
        className="w-14 h-10 sm:w-16 sm:h-12 lg:w-20 lg:h-16 filter brightness-125"
        loading="eager"
        style={{
          objectFit: 'contain',
          objectPosition: 'center'
        }}
      />
    </picture>
  )
}

// Composant pour les images de la page d'accueil
export function HomePagePicture({
  type,
  className = ""
}: {
  type: 'hero' | 'services'
  className?: string
}) {
  const config = {
    hero: {
      src: '/optimized/2152005452-378x252.webp',
      srcSet: '/optimized/2152005452-mobile.webp 480w, /optimized/2152005452-tablet.webp 768w, /optimized/2152005452-desktop.webp 1024w',
      sizes: "(max-width: 640px) 100vw, (max-width: 768px) 80vw, (max-width: 1024px) 50vw, 400px",
      alt: "Global Logistics Transportation Network - Stratelink Global"
    },
    services: {
      src: '/optimized/2151663057-330x471.webp',
      srcSet: '/optimized/2151663057-mobile.webp 480w, /optimized/2151663057-tablet.webp 768w, /optimized/2151663057-desktop.webp 1024w',
      sizes: "(max-width: 640px) 100vw, (max-width: 768px) 90vw, (max-width: 1024px) 80vw, 800px",
      alt: "Technological Futuristic Holograms - Logistics and Transport"
    }
  }

  const { src, srcSet, sizes, alt } = config[type]

  return (
    <picture className={className}>
      {/* Version WebP optimisée avec srcSet responsive */}
      <source
        srcSet={srcSet}
        type="image/webp"
        sizes={sizes}
      />
      
      {/* Version de fallback optimisée */}
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        loading="eager"
        sizes={sizes}
        style={{
          objectFit: 'cover',
          objectPosition: 'center'
        }}
      />
    </picture>
  )
} 