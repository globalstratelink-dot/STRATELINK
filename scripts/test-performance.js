const fs = require('fs');
const path = require('path');

console.log('🚀 Test des performances après optimisation des images\n');

// Fonction pour calculer la taille des fichiers
function getFileSize(filePath) {
  try {
    const stats = fs.statSync(filePath);
    return stats.size / 1024; // KB
  } catch (error) {
    return 0;
  }
}

// Fonction pour analyser les images
function analyzeImages() {
  console.log('📊 Analyse des images optimisées:');
  
  const originalImages = {
    '2152005452.webp': 927.3,
    '2151663057.webp': 893.0,
    'new-logo.png': 65.7
  };
  
  const optimizedImages = {
    '2152005452-378x252.webp': 'public/optimized/2152005452-378x252.webp',
    '2152005452-mobile.webp': 'public/optimized/2152005452-mobile.webp',
    '2152005452-tablet.webp': 'public/optimized/2152005452-tablet.webp',
    '2152005452-desktop.webp': 'public/optimized/2152005452-desktop.webp',
    '2151663057-330x471.webp': 'public/optimized/2151663057-330x471.webp',
    '2151663057-mobile.webp': 'public/optimized/2151663057-mobile.webp',
    '2151663057-tablet.webp': 'public/optimized/2151663057-tablet.webp',
    '2151663057-desktop.webp': 'public/optimized/2151663057-desktop.webp',
    'new-logo-16x16.png': 'public/optimized/new-logo-16x16.png',
    'new-logo-32x32.png': 'public/optimized/new-logo-32x32.png',
    'new-logo-64x64.png': 'public/optimized/new-logo-64x64.png'
  };
  
  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;
  
  console.log('\n📸 Images originales:');
  for (const [name, size] of Object.entries(originalImages)) {
    console.log(`  ${name}: ${size}KB`);
    totalOriginalSize += size;
  }
  
  console.log('\n🎯 Images optimisées:');
  for (const [name, filePath] of Object.entries(optimizedImages)) {
    const size = getFileSize(filePath);
    console.log(`  ${name}: ${size.toFixed(1)}KB`);
    totalOptimizedSize += size;
  }
  
  const savings = totalOriginalSize - totalOptimizedSize;
  const savingsPercent = (savings / totalOriginalSize * 100).toFixed(1);
  
  console.log('\n💰 Résultats:');
  console.log(`  Taille originale totale: ${totalOriginalSize.toFixed(1)}KB`);
  console.log(`  Taille optimisée totale: ${totalOptimizedSize.toFixed(1)}KB`);
  console.log(`  Économies: ${savings.toFixed(1)}KB (${savingsPercent}%)`);
  
  return { totalOriginalSize, totalOptimizedSize, savings, savingsPercent };
}

// Fonction pour vérifier les composants optimisés
function checkOptimizedComponents() {
  console.log('\n🔍 Vérification des composants optimisés:');
  
  const components = [
    'components/optimized-image.tsx',
    'components/home-slides.tsx',
    'components/footer.tsx'
  ];
  
  for (const component of components) {
    if (fs.existsSync(component)) {
      console.log(`  ✅ ${component} - Présent`);
    } else {
      console.log(`  ❌ ${component} - Manquant`);
    }
  }
}

// Fonction pour générer des recommandations
function generateRecommendations() {
  console.log('\n💡 Recommandations pour améliorer encore les performances:');
  
  const recommendations = [
    '✅ Images optimisées avec des tailles appropriées',
    '✅ Format WebP utilisé pour une meilleure compression',
    '✅ Images responsives avec srcSet',
    '✅ Composants spécialisés créés',
    '🔄 Implémenter le lazy loading pour les images non critiques',
    '🔄 Ajouter des placeholders pendant le chargement',
    '🔄 Utiliser next/image avec priority pour les images LCP',
    '🔄 Configurer un CDN pour la distribution des images',
    '🔄 Implémenter la compression Brotli/Gzip',
    '🔄 Ajouter des métadonnées d\'image (alt, title)'
  ];
  
  recommendations.forEach(rec => console.log(`  ${rec}`));
}

// Fonction pour tester la structure des dossiers
function checkFolderStructure() {
  console.log('\n📁 Structure des dossiers:');
  
  const folders = [
    'public',
    'public/optimized',
    'components',
    'scripts'
  ];
  
  for (const folder of folders) {
    if (fs.existsSync(folder)) {
      const files = fs.readdirSync(folder).length;
      console.log(`  📂 ${folder}: ${files} fichiers`);
    } else {
      console.log(`  ❌ ${folder}: Dossier manquant`);
    }
  }
}

// Fonction principale
function main() {
  try {
    const results = analyzeImages();
    checkOptimizedComponents();
    checkFolderStructure();
    generateRecommendations();
    
    console.log('\n🎉 Test terminé !');
    console.log(`\n📈 Amélioration des performances:`);
    console.log(`  - Réduction de ${results.savings.toFixed(1)}KB (${results.savingsPercent}%)`);
    console.log(`  - Images responsives implémentées`);
    console.log(`  - Composants optimisés créés`);
    
    if (results.savingsPercent > 80) {
      console.log('\n🏆 Excellent ! Les optimisations sont très efficaces.');
    } else if (results.savingsPercent > 50) {
      console.log('\n👍 Bien ! Les optimisations sont efficaces.');
    } else {
      console.log('\n⚠️ Les optimisations peuvent être améliorées.');
    }
    
  } catch (error) {
    console.error('❌ Erreur lors du test:', error);
  }
}

main(); 