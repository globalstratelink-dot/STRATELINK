const fs = require('fs');
const path = require('path');

// Tailles d'icônes nécessaires
const iconSizes = [
  { name: 'favicon.ico', size: 32 },
  { name: 'icon-16x16.png', size: 16 },
  { name: 'icon-32x32.png', size: 32 },
  { name: 'icon-192x192.png', size: 192 },
  { name: 'icon-512x512.png', size: 512 },
  { name: 'apple-touch-icon.png', size: 180 }
];

// Créer les fichiers d'icônes (copie du logo existant pour l'instant)
const publicDir = path.join(__dirname, '..', 'public');
const logoPath = path.join(publicDir, 'new-logo.png');

console.log('🎨 Génération des icônes du site...');

iconSizes.forEach(icon => {
  const iconPath = path.join(publicDir, icon.name);
  
  // Pour l'instant, on copie le logo existant
  // En production, vous devriez utiliser une bibliothèque comme sharp pour redimensionner
  if (fs.existsSync(logoPath)) {
    fs.copyFileSync(logoPath, iconPath);
    console.log(`✅ ${icon.name} créé (${icon.size}x${icon.size})`);
  } else {
    console.log(`❌ Logo source non trouvé: ${logoPath}`);
  }
});

console.log('🎉 Génération des icônes terminée !');
console.log('💡 Note: Pour un redimensionnement optimal, utilisez une bibliothèque comme sharp'); 