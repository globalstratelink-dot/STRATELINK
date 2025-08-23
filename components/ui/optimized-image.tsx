'use client';

import Image from 'next/image';
import { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  fallbackSrc?: string;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  sizes = '100vw',
  fallbackSrc
}: OptimizedImageProps) {
  const [error, setError] = useState(false);

  // Générer les sources responsives
  const generateSrcSet = (baseSrc: string, baseWidth: number) => {
    const multipliers = [1, 2, 3];
    return multipliers
      .map(multiplier => {
        const w = baseWidth * multiplier;
        return `${baseSrc} ${w}w`;
      })
      .join(', ');
  };

  // Déterminer la taille de base selon la largeur demandée
  const getBaseSize = (requestedWidth: number) => {
    if (requestedWidth <= 480) return 480;
    if (requestedWidth <= 960) return 960;
    return 1440;
  };

  const baseSize = getBaseSize(width);
  const baseSrc = src.replace(/\.(jpg|png)$/, `-${baseSize}w.webp`);
  
  // Fallback vers l'image originale si WebP n'est pas supporté
  const fallbackImage = fallbackSrc || src;

  return (
    <picture>
      {/* Source WebP avec différentes tailles */}
      <source
        type="image/webp"
        srcSet={generateSrcSet(baseSrc, baseSize)}
        sizes={sizes}
      />
      
      {/* Image de fallback */}
      <Image
        src={error ? fallbackImage : baseSrc}
        alt={alt}
        width={width}
        height={height}
        className={className}
        priority={priority}
        sizes={sizes}
        onError={() => setError(true)}
        quality={85}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
      />
    </picture>
  );
}

// Composant spécialisé pour l'image héro
export function HeroImage({ className = '' }: { className?: string }) {
  return (
    <OptimizedImage
      src="/optimized/hero-480w.webp"
      alt="Technological futuristic holograms logistics means transport"
      width={480}
      height={320}
      className={className}
      priority={true}
      sizes="(max-width: 480px) 100vw, (max-width: 960px) 50vw, 33vw"
      fallbackSrc="/technological-futuristic-holograms-logistics-means-transport.jpg"
    />
  );
}

// Composant spécialisé pour le logo
export function OptimizedLogo({ className = '' }: { className?: string }) {
  return (
    <OptimizedImage
      src="/optimized/logo-56w.png"
      alt="Stratelink Global Logo"
      width={56}
      height={40}
      className={className}
      sizes="56px"
      fallbackSrc="/new-logo.png"
    />
  );
} 