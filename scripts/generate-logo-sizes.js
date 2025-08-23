const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Configuration des tailles pour le logo
const logoConfig = {
  'logo-16x16.webp': { width: 16, height: 16 },
  'logo-32x32.webp': { width: 32, height: 32 },
  'logo-48x48.webp': { width: 48, height: 48 },
  'logo-64x64.webp': { width: 64, height: 64 },
  'logo-80x80.webp': { width: 80, height: 80 },
  'logo-96x96.webp': { width: 96, height: 96 },
  'logo-128x128.webp': { width: 128, height: 128 },
  'logo-180x180.webp': { width: 180, height: 180 }
};

// Configuration des tailles pour la navbar (responsive)
const navbarConfig = {
  'navbar-mobile.webp': { width: 56, height: 40 }, // w-14 h-10
  'navbar-tablet.webp': { width: 64, height: 48 }, // w-16 h-12
  'navbar-desktop.webp': { width: 80, height: 64 } // w-20 h-16
};

async function generateLogoVariants() {
  const inputPath = path.join(__dirname, '../public/apple-touch-icon.webp');
  const outputDir = path.join(__dirname, '../public/optimized');
  
  // Créer le dossier optimized s'il n'existe pas
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log('🔄 Génération des variantes du logo...');

  try {
    // Générer les tailles standard
    for (const [filename, size] of Object.entries(logoConfig)) {
      const outputPath = path.join(outputDir, filename);
      
      await sharp(inputPath)
        .resize(size.width, size.height, {
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 }
        })
        .webp({ quality: 90, effort: 6 })
        .toFile(outputPath);
      
      console.log(`✅ Généré: ${filename} (${size.width}x${size.height})`);
    }

    // Générer les tailles pour la navbar
    for (const [filename, size] of Object.entries(navbarConfig)) {
      const outputPath = path.join(outputDir, filename);
      
      await sharp(inputPath)
        .resize(size.width, size.height, {
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 }
        })
        .webp({ quality: 95, effort: 6 })
        .toFile(outputPath);
      
      console.log(`✅ Généré: ${filename} (${size.width}x${size.height})`);
    }

    console.log('🎉 Toutes les variantes du logo ont été générées avec succès !');
    console.log('📁 Fichiers créés dans: public/optimized/');

  } catch (error) {
    console.error('❌ Erreur lors de la génération des logos:', error);
    process.exit(1);
  }
}

// Exécuter le script
generateLogoVariants(); 