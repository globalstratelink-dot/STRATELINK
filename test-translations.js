// Script de test pour vérifier les traductions
const translations = require('./lib/translations.ts');

console.log('=== TEST DES TRADUCTIONS FRANÇAISES ===\n');

// Test des traductions principales
const testKeys = [
  'home', 'services', 'about', 'contact',
  'heroTitle', 'heroSubtitle1', 'heroSubtitle2',
  'importServices', 'exportServices', 'logisticsSolutions',
  'customsClearance', 'tradeConsulting', 'supplyChain'
];

console.log('Traductions françaises principales :');
testKeys.forEach(key => {
  if (translations.fr[key]) {
    console.log(`${key}: "${translations.fr[key]}"`);
  } else {
    console.log(`❌ MANQUANT: ${key}`);
  }
});

console.log('\n=== VÉRIFICATION COMPLÈTE ===');
console.log(`Total clés anglaises: ${Object.keys(translations.en).length}`);
console.log(`Total clés françaises: ${Object.keys(translations.fr).length}`);

// Vérifier que toutes les clés anglaises ont une traduction française
const missingKeys = Object.keys(translations.en).filter(key => !translations.fr[key]);
if (missingKeys.length > 0) {
  console.log(`❌ Clés manquantes en français: ${missingKeys.join(', ')}`);
} else {
  console.log('✅ Toutes les traductions françaises sont présentes !');
}
