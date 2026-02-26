const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, '../public');
const outputDir = path.join(__dirname, '../public/optimized');

// Créer le dossier de sortie s'il n'existe pas
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Configuration des tailles selon les classes Tailwind utilisées
const logoSizes = {
  // w-4 h-4 (16x16)
  'logo-16w': { width: 16, height: 16, suffix: '-16w' },
  
  // w-14 h-10 (56x40) - sm:w-16 sm:h-12 (64x48)
  'logo-56w': { width: 56, height: 40, suffix: '-56w' },
  'logo-64w': { width: 64, height: 48, suffix: '-64w' },
  
  // lg:w-20 lg:h-16 (80x64)
  'logo-80w': { width: 80, height: 64, suffix: '-80w' },
  
  // w-14 h-10 (56x40) - version mobile
  'logo-mobile': { width: 56, height: 40, suffix: '-mobile' },
  
  // w-16 h-12 (64x48) - version tablet
  'logo-tablet': { width: 64, height: 48, suffix: '-tablet' },
  
  // w-20 h-16 (80x64) - version desktop
  'logo-desktop': { width: 80, height: 64, suffix: '-desktop' }
};

async function optimizeLogo() {
  const inputPath = path.join(inputDir, 'new-logo.png');
  const baseName = 'new-logo';

  console.log('🔄 Optimisation du logo STRATELINK GLOBAL...\n');

  try {
    // Créer des versions optimisées pour chaque taille
    for (const [key, config] of Object.entries(logoSizes)) {
      const outputName = `${baseName}${config.suffix}.png`;
      const outputPath = path.join(outputDir, outputName);

      await sharp(inputPath)
        .resize(config.width, config.height, {
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 } // Transparent
        })
        .png({ 
          quality: 90,
          compressionLevel: 9
        })
        .toFile(outputPath);

      // Obtenir les informations sur le fichier optimisé
      const stats = fs.statSync(outputPath);
      const originalStats = fs.statSync(inputPath);
      const compressionRatio = ((originalStats.size - stats.size) / originalStats.size * 100).toFixed(1);

      console.log(`  ✅ ${key}: ${outputName} (${config.width}x${config.height}) - ${(stats.size / 1024).toFixed(1)} KB, -${compressionRatio}%`);
    }

    // Créer une version WebP pour les navigateurs modernes
    const webpOutputPath = path.join(outputDir, `${baseName}-webp.webp`);
    await sharp(inputPath)
      .resize(80, 64, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .webp({ 
        quality: 85,
        effort: 6
      })
      .toFile(webpOutputPath);

    const webpStats = fs.statSync(webpOutputPath);
    const originalStats = fs.statSync(inputPath);
    const compressionRatio = ((originalStats.size - webpStats.size) / originalStats.size * 100).toFixed(1);

    console.log(`  ✅ WebP: ${baseName}-webp.webp (80x64) - ${(webpStats.size / 1024).toFixed(1)} KB, -${compressionRatio}%`);

    // Créer un fichier de configuration pour les composants
    const configContent = `// Configuration automatique des tailles de logo
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
}`;

    const configPath = path.join(__dirname, '../lib/logo-config.ts');
    fs.writeFileSync(configPath, configContent);
    console.log(`  ✅ Configuration: logo-config.ts créé`);

  } catch (error) {
    console.error(`❌ Erreur lors de l'optimisation du logo:`, error.message);
  }

  console.log('\n✨ Optimisation du logo terminée !');
  console.log(`📁 Logos optimisés disponibles dans: ${outputDir}`);
  
  // Afficher un résumé des tailles
  console.log('\n📊 Résumé des tailles:');
  const files = fs.readdirSync(outputDir);
  files.forEach(file => {
    if (file.includes('new-logo')) {
      const filePath = path.join(outputDir, file);
      const stats = fs.statSync(filePath);
      console.log(`  ${file}: ${(stats.size / 1024).toFixed(1)} KB`);
    }
  });
}

// Exécuter l'optimisation
optimizeLogo().catch(console.error); 