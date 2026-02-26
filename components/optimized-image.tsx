"use client"

import { useState } from "react"
import Image from "next/image"

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  sizes?: string
  responsive?: boolean
  mobileSrc?: string
  tabletSrc?: string
  desktopSrc?: string
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
  sizes = "100vw",
  responsive = false,
  mobileSrc,
  tabletSrc,
  desktopSrc
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  if (responsive && mobileSrc && tabletSrc && desktopSrc) {
    return (
      <picture className={className}>
        {/* Mobile */}
        <source
          media="(max-width: 640px)"
          srcSet={mobileSrc}
          type="image/webp"
        />
        
        {/* Tablet */}
        <source
          media="(min-width: 641px) and (max-width: 1024px)"
          srcSet={tabletSrc}
          type="image/webp"
        />
        
        {/* Desktop */}
        <source
          media="(min-width: 1025px)"
          srcSet={desktopSrc}
          type="image/webp"
        />
        
        {/* Fallback */}
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={`transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${className}`}
          priority={priority}
          sizes={sizes}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
        />
      </picture>
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={`transition-opacity duration-300 ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      } ${className}`}
      priority={priority}
      sizes={sizes}
      onLoad={() => setIsLoaded(true)}
      onError={() => setHasError(true)}
    />
  )
}

// Composant spécialisé pour les images de la page d'accueil
export function HeroImage({ className = "" }: { className?: string }) {
  return (
    <OptimizedImage
      src="/optimized/2152005452-378x252.webp"
      alt="Global Logistics Transportation Network - Stratelink Global"
      width={378}
      height={252}
      className={`w-full h-full object-cover ${className}`}
      priority={true}
      sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, (max-width: 1024px) 50vw, 400px"
      responsive={true}
      mobileSrc="/optimized/2152005452-mobile.webp"
      tabletSrc="/optimized/2152005452-tablet.webp"
      desktopSrc="/optimized/2152005452-desktop.webp"
    />
  )
}

// Composant spécialisé pour les images de services
export function ServicesImage({ className = "" }: { className?: string }) {
  return (
    <OptimizedImage
      src="/acceuil (1).webp"
      alt="Technological Futuristic Holograms - Logistics and Transport"
      width={330}
      height={471}
      className={`w-full h-full object-cover ${className}`}
      priority={false}
      sizes="(max-width: 640px) 100vw, (max-width: 768px) 90vw, (max-width: 1024px) 80vw, 800px"
      responsive={true}
      mobileSrc="/acceuil (1).webp"
      tabletSrc="/acceuil (1).webp"
      desktopSrc="/acceuil (1).webp"
    />
  )
}

// Composant spécialisé pour le logo
export function OptimizedLogo({ 
  size = "default",
  className = "" 
}: { 
  size?: "small" | "default" | "large"
  className?: string 
}) {
  const config = {
    small: {
      src: "/optimized/new-logo-16x16.png",
      width: 16,
      height: 16
    },
    default: {
      src: "/optimized/new-logo-32x32.png",
      width: 32,
      height: 32
    },
    large: {
      src: "/optimized/new-logo-64x64.png",
      width: 64,
      height: 64
    }
  }

  const { src, width, height } = config[size]

  return (
    <OptimizedImage
      src={src}
      alt="STRATELINK GLOBAL"
      width={width}
      height={height}
      className={`object-contain ${className}`}
      priority={true}
    />
  )
}

// Avatar optimisé avec fallback d'initiales
export function OptimizedAvatar({
  src,
  alt,
  size = 80,
  className = "",
  fallback = "?",
}: {
  src: string
  alt: string
  size?: number
  className?: string
  fallback?: string
}) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  return (
    <div
      className={`relative overflow-hidden rounded-full bg-copper/10 flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      {!hasError && (
        <Image
          src={src}
          alt={alt}
          width={size}
          height={size}
          className={`object-cover w-full h-full transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
        />
      )}
      {(hasError || !isLoaded) && (
        <div className="absolute inset-0 flex items-center justify-center text-copper font-semibold">
          {fallback}
        </div>
      )}
    </div>
  )
}
