"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import { useLanguage } from "@/contexts/language-context"

interface ProductionOptimizedImageProps {
  src: string
  alt: string
  priority?: boolean
  className?: string
  fill?: boolean
  width?: number
  height?: number
  sizes?: string
  quality?: number
  placeholder?: "blur" | "empty"
  blurDataURL?: string
  onError?: (e: any) => void
  fallbackSrc?: string
}

export function ProductionOptimizedImage({
  src,
  alt,
  priority = false,
  className = "",
  fill = false,
  width,
  height,
  sizes,
  quality = 75,
  placeholder = "empty",
  blurDataURL,
  onError,
  fallbackSrc
}: ProductionOptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [currentSrc, setCurrentSrc] = useState(src)
  const [isMobile, setIsMobile] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    // Détecter si c'est un appareil mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleLoad = () => {
    setIsLoaded(true)
  }

  const handleError = (e: any) => {
    console.warn(`Image failed to load: ${src}`)
    
    // Essayer l'image de fallback si disponible
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc)
      setHasError(false)
      return
    }
    
    setHasError(true)
    if (onError) {
      onError(e)
    }
  }

  // Fallback si l'image échoue complètement
  if (hasError) {
    return (
      <div className={`${className} bg-gradient-to-br from-navy via-copper/30 to-sand/30 flex items-center justify-center`}>
        <div className="text-center text-white/70">
          <div className="w-16 h-16 mx-auto mb-2 bg-copper/20 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-copper" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="text-sm">{t('imageNotAvailable')}</p>
        </div>
      </div>
    )
  }

  // Skeleton loader optimisé pour mobile
  const skeletonClass = isMobile 
    ? "bg-gradient-to-r from-navy/20 to-copper/20 animate-pulse"
    : "bg-gradient-to-r from-navy/30 to-copper/30 animate-pulse"

  return (
    <>
      <Image
        src={currentSrc}
        alt={alt}
        priority={priority}
        className={`${className} transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        fill={fill}
        width={width}
        height={height}
        sizes={sizes}
        quality={quality}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        onLoad={handleLoad}
        onError={handleError}
        loading={priority ? "eager" : "lazy"}
        // Propriétés spécifiques pour unoptimized: true
        unoptimized={true}
        style={{
          objectFit: 'cover',
          objectPosition: 'center'
        }}
      />
      
      {/* Skeleton loader optimisé */}
      {!isLoaded && !hasError && (
        <div className={`${className} ${skeletonClass}`}>
          <div className="w-full h-full bg-gradient-to-br from-navy/30 via-copper/20 to-sand/20 rounded-lg"></div>
        </div>
      )}
    </>
  )
}

// Composant spécialisé pour les images de la page d'accueil
export function HomePageImage({ 
  type, 
  ...props 
}: { 
  type: 'hero' | 'services' 
} & Omit<ProductionOptimizedImageProps, 'sizes' | 'quality'>) {
  
  const config = {
    hero: {
      sizes: "(max-width: 640px) 100vw, (max-width: 768px) 80vw, (max-width: 1024px) 50vw, 400px",
      quality: 85,
      priority: true
    },
    services: {
      sizes: "(max-width: 640px) 100vw, (max-width: 768px) 90vw, (max-width: 1024px) 80vw, 800px",
      quality: 85,
      priority: true
    }
  }

  return (
    <ProductionOptimizedImage
      {...props}
      sizes={config[type].sizes}
      quality={config[type].quality}
      priority={config[type].priority}
    />
  )
} 