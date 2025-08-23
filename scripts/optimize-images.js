const fs = require('fs');
const path = require('path');
const imagemin = require('imagemin');
const imageminWebp = require('imagemin-webp');
const imageminPngquant = require('imagemin-pngquant');
const sharp = require('sharp');

const PUBLIC_DIR = path.join(__dirname, '../public');
const OUTPUT_DIR = path.join(__dirname, '../public/optimized');

// Créer le dossier de sortie s'il n'existe pas
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function optimizeImages() {
  console.log('🚀 Début de l\'optimisation des images...\n');

  try {
    // Optimiser l'image principale (JPG)
    const mainImagePath = path.join(PUBLIC_DIR, 'technological-futuristic-holograms-logistics-means-transport.jpg');
    if (fs.existsSync(mainImagePath)) {
      console.log('📸 Optimisation de l\'image principale...');
      
      // Créer plusieurs tailles responsives
      const sizes = [
        { width: 480, height: 320, suffix: '480w' },
        { width: 960, height: 640, suffix: '960w' },
        { width: 1440, height: 960, suffix: '1440w' }
      ];

      for (const size of sizes) {
        const outputPath = path.join(OUTPUT_DIR, `hero-${size.suffix}.webp`);
        await sharp(mainImagePath)
          .resize(size.width, size.height, { fit: 'cover' })
          .webp({ quality: 80 })
          .toFile(outputPath);
        
        const stats = fs.statSync(outputPath);
        console.log(`  ✅ ${size.suffix}: ${(stats.size / 1024).toFixed(1)} KiB`);
      }

      // Version WebP originale
      const webpPath = path.join(OUTPUT_DIR, 'hero-original.webp');
      await sharp(mainImagePath)
        .webp({ quality: 85 })
        .toFile(webpPath);
      
      const stats = fs.statSync(webpPath);
      console.log(`  ✅ Original WebP: ${(stats.size / 1024).toFixed(1)} KiB`);
    }

    // Optimiser le logo (PNG)
    const logoPath = path.join(PUBLIC_DIR, 'new-logo.png');
    if (fs.existsSync(logoPath)) {
      console.log('\n🎨 Optimisation du logo...');
      
      // Créer plusieurs tailles
      const logoSizes = [
        { width: 56, height: 40, suffix: '56w' },
        { width: 112, height: 80, suffix: '112w' },
        { width: 224, height: 160, suffix: '224w' }
      ];

      for (const size of logoSizes) {
        const outputPath = path.join(OUTPUT_DIR, `logo-${size.suffix}.png`);
        await sharp(logoPath)
          .resize(size.width, size.height, { fit: 'contain' })
          .png({ quality: 90 })
          .toFile(outputPath);
        
        const stats = fs.statSync(outputPath);
        console.log(`  ✅ ${size.suffix}: ${(stats.size / 1024).toFixed(1)} KiB`);
      }

      // Version WebP
      const webpPath = path.join(OUTPUT_DIR, 'logo.webp');
      await sharp(logoPath)
        .webp({ quality: 90 })
        .toFile(webpPath);
      
      const stats = fs.statSync(webpPath);
      console.log(`  ✅ WebP: ${(stats.size / 1024).toFixed(1)} KiB`);
    }

    console.log('\n🎉 Optimisation terminée !');
    console.log(`📁 Images optimisées dans: ${OUTPUT_DIR}`);
    
    // Afficher les économies
    const originalSize = 9870.9 + 65.7; // KiB
    console.log(`💰 Taille originale: ${(originalSize / 1024).toFixed(1)} MB`);
    console.log(`🚀 Économies potentielles: ${(9911.4 / 1024).toFixed(1)} MB`);

  } catch (error) {
    console.error('❌ Erreur lors de l\'optimisation:', error);
  }
}

optimizeImages(); 