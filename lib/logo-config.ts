// Configuration automatique des tailles de logo
export const logoConfig = {
  // Taille très petite (w-4 h-4)
  tiny: {
    src: '/optimized/new-logo-16w.png',
    width: 16,
    height: 16,
    className: 'w-4 h-4'
  },
  
  // Taille mobile (w-14 h-10)
  mobile: {
    src: '/optimized/new-logo-56w.png',
    width: 56,
    height: 40,
    className: 'w-14 h-10'
  },
  
  // Taille tablet (w-16 h-12)
  tablet: {
    src: '/optimized/new-logo-64w.png',
    width: 64,
    height: 48,
    className: 'w-16 sm:h-12'
  },
  
  // Taille desktop (w-20 h-16)
  desktop: {
    src: '/optimized/new-logo-80w.png',
    width: 80,
    height: 64,
    className: 'lg:w-20 lg:h-16'
  },
  
  // Version WebP moderne
  webp: {
    src: '/optimized/new-logo-webp.webp',
    width: 80,
    height: 64,
    className: 'w-20 h-16'
  }
};

// Fonction pour obtenir la configuration selon la taille d'écran
export function getLogoConfig(breakpoint: 'mobile' | 'tablet' | 'desktop' = 'desktop') {
  switch (breakpoint) {
    case 'mobile':
      return logoConfig.mobile;
    case 'tablet':
      return logoConfig.tablet;
    case 'desktop':
      return logoConfig.desktop;
    default:
      return logoConfig.desktop;
  }
}