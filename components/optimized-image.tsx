"use client"

import Image from "next/image"
import { useState } from "react"

interface OptimizedImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  fallback?: string
  priority?: boolean
  quality?: number
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = "",
  fallback,
  priority = false,
  quality = 85
}: OptimizedImageProps) {
  const [imageError, setImageError] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  const handleError = () => {
    setImageError(true)
  }

  const handleLoad = () => {
    setImageLoaded(true)
  }

  if (imageError && fallback) {
    return (
      <div 
        className={`flex items-center justify-center bg-copper/10 text-copper font-bold ${className}`}
        style={{ width, height }}
      >
        {fallback}
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
        onError={handleError}
        onLoad={handleLoad}
        priority={priority}
        quality={quality}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
      />
      {!imageLoaded && (
        <div 
          className="absolute inset-0 bg-copper/10 animate-pulse"
          style={{ width, height }}
        />
      )}
    </div>
  )
}

// Composant spécialisé pour les avatars
interface OptimizedAvatarProps {
  src: string
  alt: string
  size: number
  className?: string
  fallback?: string
}

export function OptimizedAvatar({
  src,
  alt,
  size,
  className = "",
  fallback
}: OptimizedAvatarProps) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={`rounded-full object-cover ${className}`}
      fallback={fallback}
    />
  )
}

// Composant pour les images avec lazy loading
interface LazyImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  fallback?: string
}

export function LazyImage({
  src,
  alt,
  width,
  height,
  className = "",
  fallback
}: LazyImageProps) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      fallback={fallback}
      priority={false}
    />
  )
}
