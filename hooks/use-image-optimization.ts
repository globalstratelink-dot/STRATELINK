import { useState, useEffect } from 'react'
import { getConnectionQuality, getOptimalQuality } from '@/lib/image-config'

interface ImageOptimizationConfig {
  quality: number
  priority: boolean
  sizes: string
  loading: 'eager' | 'lazy'
}

export function useImageOptimization(
  isPriority: boolean = false,
  customSizes?: string
): ImageOptimizationConfig {
  const [config, setConfig] = useState<ImageOptimizationConfig>({
    quality: 85,
    priority: isPriority,
    sizes: customSizes || '(max-width: 640px) 100vw, (max-width: 768px) 80vw, (max-width: 1024px) 60vw, 800px',
    loading: isPriority ? 'eager' : 'lazy'
  })

  useEffect(() => {
    // Détecter la qualité de connexion
    const connectionQuality = getConnectionQuality()
    const optimalQuality = getOptimalQuality(connectionQuality)

    // Détecter si c'est un appareil mobile
    const isMobile = window.innerWidth <= 768
    const isLowEndDevice = navigator.hardwareConcurrency ? navigator.hardwareConcurrency <= 4 : false

    // Ajuster la qualité selon l'appareil et la connexion
    let finalQuality = optimalQuality
    if (isMobile && connectionQuality === 'slow') {
      finalQuality = Math.min(optimalQuality, 70)
    }
    if (isLowEndDevice) {
      finalQuality = Math.min(optimalQuality, 75)
    }

    // Ajuster les sizes selon l'appareil
    let finalSizes = config.sizes
    if (isMobile) {
      finalSizes = '(max-width: 640px) 100vw, (max-width: 768px) 90vw, 80vw'
    }

    setConfig({
      quality: finalQuality,
      priority: isPriority,
      sizes: finalSizes,
      loading: isPriority ? 'eager' : 'lazy'
    })
  }, [isPriority, customSizes])

  return config
}

// Hook spécialisé pour les images de la page d'accueil
export function useHomePageImage(type: 'hero' | 'services' | 'gallery') {
  const isPriority = type === 'hero' || type === 'services'
  
  const baseConfig = useImageOptimization(isPriority)
  
  // Configuration spécifique selon le type d'image
  const specificConfig = {
    hero: {
      sizes: '(max-width: 640px) 100vw, (max-width: 768px) 80vw, (max-width: 1024px) 50vw, 400px',
      quality: 85
    },
    services: {
      sizes: '(max-width: 640px) 100vw, (max-width: 768px) 90vw, (max-width: 1024px) 80vw, 800px',
      quality: 85
    },
    gallery: {
      sizes: '(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 1200px',
      quality: 80
    }
  }

  return {
    ...baseConfig,
    sizes: specificConfig[type].sizes,
    quality: specificConfig[type].quality
  }
} 