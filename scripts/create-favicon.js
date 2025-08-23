const fs = require('fs');
const path = require('path');

console.log('🎨 Création du favicon avec le logo Stratelink Global...');

// Créer un favicon simple basé sur le logo
// Pour une solution plus avancée, vous pourriez utiliser sharp ou jimp pour redimensionner
const publicDir = path.join(__dirname, '..', 'public');
const logoPath = path.join(publicDir, 'new-logo.png');
const faviconPath = path.join(publicDir, 'favicon.ico');

if (fs.existsSync(logoPath)) {
  // Copier le logo comme favicon (pour l'instant)
  // En production, vous devriez créer un vrai .ico avec le logo redimensionné
  fs.copyFileSync(logoPath, faviconPath);
  console.log('✅ favicon.ico mis à jour avec le logo Stratelink Global');
  console.log('💡 Note: Pour un favicon optimal, créez un vrai fichier .ico 32x32 avec le logo');
} else {
  console.log('❌ Logo source non trouvé');
}

console.log('🎉 Favicon mis à jour !'); 