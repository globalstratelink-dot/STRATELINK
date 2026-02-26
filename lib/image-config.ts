export const imageConfig = {
  // Configuration des tailles d'images selon l'appareil
  sizes: {
    mobile: {
      small: '640px',
      medium: '768px',
      large: '1024px'
    },
    tablet: {
      small: '768px',
      medium: '1024px',
      large: '1366px'
    },
    desktop: {
      small: '1024px',
      medium: '1366px',
      large: '1920px'
    }
  },

  // Qualité des images selon l'appareil et la connexion
  quality: {
    high: 90,      // Connexion rapide, appareil puissant
    medium: 85,    // Connexion moyenne
    low: 70        // Connexion lente, appareil moins puissant
  },

  // Formats supportés par ordre de préférence
  formats: ['image/webp', 'image/avif', 'image/jpeg'],

  // Configuration des breakpoints responsive
  breakpoints: {
    mobile: 640,
    tablet: 768,
    laptop: 1024,
    desktop: 1280,
    wide: 1536
  }
};

// Fonction pour générer les attributs sizes optimisés
export function generateSizes(breakpoints: string[], containerWidth: string = '100vw') {
  const sizes = breakpoints.map((breakpoint, index) => {
    if (index === 0) {
      return `(max-width: ${breakpoint}px) ${containerWidth}`;
    }
    const prevBreakpoint = breakpoints[index - 1];
    const width = index === breakpoints.length - 1 ? containerWidth : `${Math.round((100 / (breakpoints.length - index)) * 10) / 10}vw`;
    return `(min-width: ${prevBreakpoint}px) and (max-width: ${breakpoint}px) ${width}`;
  });
  
  return sizes.join(', ');
}

// Configuration spécifique pour les images de la page d'accueil
export const homePageImages = {
  hero: {
    sizes: generateSizes(['640', '768', '1024', '1280'], '50vw'),
    quality: imageConfig.quality.medium,
    priority: true
  },
  services: {
    sizes: generateSizes(['640', '768', '1024', '1280'], '80vw'),
    quality: imageConfig.quality.medium,
    priority: true
  },
  gallery: {
    sizes: generateSizes(['640', '768', '1024', '1280'], '100vw'),
    quality: imageConfig.quality.low,
    priority: false
  }
};

// Fonction pour détecter la qualité de connexion
export function getConnectionQuality(): 'slow' | 'medium' | 'fast' {
  if (typeof navigator !== 'undefined' && 'connection' in navigator) {
    const connection = (navigator as any).connection;
    if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
      return 'slow';
    } else if (connection.effectiveType === '3g') {
      return 'medium';
    } else {
      return 'fast';
    }
  }
  return 'medium'; // Par défaut
}

// Fonction pour obtenir la qualité d'image optimale
export function getOptimalQuality(connectionQuality: 'slow' | 'medium' | 'fast' = 'medium') {
  switch (connectionQuality) {
    case 'slow':
      return imageConfig.quality.low;
    case 'fast':
      return imageConfig.quality.high;
    default:
      return imageConfig.quality.medium;
  }
} 