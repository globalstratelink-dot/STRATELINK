const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

console.log('🖼️ Optimisation des images selon les recommandations Lighthouse\n');

// Configuration des optimisations basées sur le rapport Lighthouse
const optimizations = [
  {
    input: 'public/2152005452.webp',
    outputs: [
      {
        name: '2152005452-378x252.webp',
        width: 378,
        height: 252,
        quality: 80
      },
      {
        name: '2152005452-1000x667.webp',
        width: 1000,
        height: 667,
        quality: 85
      }
    ]
  },
  {
    input: 'public/2151663057.webp',
    outputs: [
      {
        name: '2151663057-330x471.webp',
        width: 330,
        height: 471,
        quality: 80
      },
      {
        name: '2151663057-700x678.webp',
        width: 700,
        height: 678,
        quality: 85
      }
    ]
  },
  {
    input: 'public/new-logo.png',
    outputs: [
      {
        name: 'new-logo-16x16.png',
        width: 16,
        height: 16,
        quality: 90
      },
      {
        name: 'new-logo-32x32.png',
        width: 32,
        height: 32,
        quality: 90
      },
      {
        name: 'new-logo-64x64.png',
        width: 64,
        height: 64,
        quality: 90
      }
    ]
  }
];

async function optimizeImages() {
  const optimizedDir = 'public/optimized';
  
  // Créer le dossier optimized s'il n'existe pas
  if (!fs.existsSync(optimizedDir)) {
    fs.mkdirSync(optimizedDir, { recursive: true });
  }

  for (const optimization of optimizations) {
    if (!fs.existsSync(optimization.input)) {
      console.log(`❌ Fichier source manquant: ${optimization.input}`);
      continue;
    }

    console.log(`📸 Optimisation de ${optimization.input}:`);
    
    for (const output of optimization.outputs) {
      const outputPath = path.join(optimizedDir, output.name);
      
      try {
        await sharp(optimization.input)
          .resize(output.width, output.height, {
            fit: 'cover',
            position: 'center'
          })
          .webp({ quality: output.quality })
          .toFile(outputPath);

        const stats = fs.statSync(outputPath);
        const originalStats = fs.statSync(optimization.input);
        const savings = ((originalStats.size - stats.size) / originalStats.size * 100).toFixed(1);
        
        console.log(`  ✅ ${output.name} (${output.width}x${output.height}) - ${(stats.size / 1024).toFixed(1)}KB (${savings}% d'économie)`);
      } catch (error) {
        console.log(`  ❌ Erreur lors de l'optimisation de ${output.name}:`, error.message);
      }
    }
  }
}

// Fonction pour créer des images responsives
async function createResponsiveImages() {
  console.log('\n📱 Création d\'images responsives:');
  
  const responsiveConfig = [
    {
      input: 'public/2152005452.webp',
      sizes: [
        { width: 480, suffix: 'mobile' },
        { width: 768, suffix: 'tablet' },
        { width: 1024, suffix: 'desktop' }
      ]
    },
    {
      input: 'public/2151663057.webp',
      sizes: [
        { width: 480, suffix: 'mobile' },
        { width: 768, suffix: 'tablet' },
        { width: 1024, suffix: 'desktop' }
      ]
    }
  ];

  for (const config of responsiveConfig) {
    if (!fs.existsSync(config.input)) continue;
    
    const baseName = path.basename(config.input, path.extname(config.input));
    
    for (const size of config.sizes) {
      const outputPath = `public/optimized/${baseName}-${size.suffix}.webp`;
      
      try {
        await sharp(config.input)
          .resize(size.width, null, { withoutEnlargement: true })
          .webp({ quality: 80 })
          .toFile(outputPath);
        
        const stats = fs.statSync(outputPath);
        console.log(`  ✅ ${path.basename(outputPath)} - ${(stats.size / 1024).toFixed(1)}KB`);
      } catch (error) {
        console.log(`  ❌ Erreur: ${error.message}`);
      }
    }
  }
}

// Fonction pour générer un rapport d'optimisation
function generateOptimizationReport() {
  console.log('\n📊 Rapport d\'optimisation:');
  
  const originalSizes = {
    '2152005452.webp': 927.3,
    '2151663057.webp': 893.0,
    'new-logo.png': 65.7
  };
  
  const optimizedDir = 'public/optimized';
  if (!fs.existsSync(optimizedDir)) return;
  
  const files = fs.readdirSync(optimizedDir);
  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;
  
  for (const file of files) {
    const filePath = path.join(optimizedDir, file);
    const stats = fs.statSync(filePath);
    const sizeKB = stats.size / 1024;
    
    console.log(`  📄 ${file}: ${sizeKB.toFixed(1)}KB`);
    totalOptimizedSize += sizeKB;
  }
  
  for (const [name, size] of Object.entries(originalSizes)) {
    totalOriginalSize += size;
  }
  
  const totalSavings = ((totalOriginalSize - totalOptimizedSize) / totalOriginalSize * 100).toFixed(1);
  console.log(`\n💰 Économies totales: ${(totalOriginalSize - totalOptimizedSize).toFixed(1)}KB (${totalSavings}%)`);
}

// Exécution des optimisations
async function main() {
  try {
    await optimizeImages();
    await createResponsiveImages();
    generateOptimizationReport();
    
    console.log('\n✨ Optimisation terminée !');
    console.log('\n💡 Prochaines étapes:');
    console.log('1. Mettre à jour les composants pour utiliser les images optimisées');
    console.log('2. Implémenter les images responsives avec <picture>');
    console.log('3. Tester les performances avec Lighthouse');
  } catch (error) {
    console.error('❌ Erreur lors de l\'optimisation:', error);
  }
}

main(); 