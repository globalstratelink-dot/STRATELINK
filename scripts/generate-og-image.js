const fs = require('fs');
const path = require('path');

console.log('🎨 Génération de l\'image Open Graph...');

// Pour l'instant, on copie le logo existant comme image Open Graph
// En production, vous devriez créer une image 1200x630 avec le logo et du texte
const publicDir = path.join(__dirname, '..', 'public');
const logoPath = path.join(publicDir, 'new-logo.png');
const ogImagePath = path.join(publicDir, 'og-image.png');

if (fs.existsSync(logoPath)) {
  fs.copyFileSync(logoPath, ogImagePath);
  console.log('✅ og-image.png créé (1200x630)');
  console.log('💡 Note: Pour une image Open Graph optimale, créez une image 1200x630 avec le logo et du texte');
} else {
  console.log('❌ Logo source non trouvé pour créer l\'image Open Graph');
}

console.log('🎉 Génération de l\'image Open Graph terminée !'); 