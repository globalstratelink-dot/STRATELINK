"use client"

import Image from "next/image"
import { useState } from "react"

interface OptimizedHomeImageProps {
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
}

export function OptimizedHomeImage({
  src,
  alt,
  priority = false,
  className = "",
  fill = false,
  width,
  height,
  sizes,
  quality = 85,
  placeholder = "empty",
  blurDataURL,
  onError
}: OptimizedHomeImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  const handleLoad = () => {
    setIsLoaded(true)
  }

  const handleError = (e: any) => {
    setHasError(true)
    if (onError) {
      onError(e)
    }
  }

  // Fallback si l'image échoue
  if (hasError) {
    return (
      <div className={`${className} bg-gradient-to-br from-navy via-copper/30 to-sand/30 flex items-center justify-center`}>
        <div className="text-center text-white/70">
          <div className="w-16 h-16 mx-auto mb-2 bg-copper/20 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-copper" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="text-sm">Image non disponible</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <Image
        src={src}
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
      />
      
      {/* Skeleton loader */}
      {!isLoaded && !hasError && (
        <div className={`${className} bg-gradient-to-r from-navy/20 to-copper/20 animate-pulse`}>
          <div className="w-full h-full bg-gradient-to-br from-navy/30 via-copper/20 to-sand/20 rounded-lg"></div>
        </div>
      )}
    </>
  )
} 