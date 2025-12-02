'use client'

import React from 'react'
import { Navbar } from './navbar'

export function NavbarMobileTest() {
  return (
    <div className="min-h-screen bg-navy">
      <Navbar />
      
      <div className="pt-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-6">Test de la Navbar Mobile Corrigée</h1>
          
          <div className="space-y-6">
            <div className="bg-white/10 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-white mb-4">✅ Problèmes Corrigés</h2>
              <ul className="text-white space-y-2 text-sm">
                <li>• Suppression des animations Framer Motion complexes</li>
                <li>• Simplification de la gestion des événements</li>
                <li>• Correction des z-index et du positionnement</li>
                <li>• Gestion simplifiée du scroll du body</li>
                <li>• Détection mobile intégrée</li>
                <li>• Structure HTML plus simple et robuste</li>
                <li>• Gestion des clics à l'extérieur améliorée</li>
              </ul>
            </div>

            <div className="bg-white/10 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-white mb-4">📱 Instructions de Test Mobile</h2>
                             <ol className="text-white space-y-2 text-sm">
                 <li>1. Ouvrez les outils de développement (F12)</li>
                 <li>2. Activez le mode mobile (responsive)</li>
                 <li>3. Vérifiez qu'il n'y a PAS de bouton WhatsApp dans la navbar</li>
                 <li>4. Cliquez sur le bouton de menu (hamburger)</li>
                 <li>5. Vérifiez que le menu s'ouvre correctement</li>
                 <li>6. Testez la fermeture en cliquant sur le backdrop</li>
                 <li>7. Testez la fermeture avec la touche Échap</li>
                 <li>8. Testez la fermeture en cliquant sur un lien</li>
                 <li>9. Vérifiez que le scroll est bloqué quand le menu est ouvert</li>
                 <li>10. Testez le bouton WhatsApp dans le menu (seulement dans le menu)</li>
               </ol>
            </div>

            <div className="bg-white/10 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-white mb-4">🎯 Fonctionnalités Testées</h2>
              <div className="text-white space-y-4 text-sm">
                <div>
                  <h3 className="text-lg font-semibold text-copper mb-2">🔧 Structure</h3>
                                     <ul className="space-y-1 ml-4">
                     <li>• Navbar fixe en haut de l'écran</li>
                     <li>• Logo et texte bien alignés</li>
                     <li>• Bouton menu hamburger uniquement</li>
                     <li>• Menu mobile avec backdrop</li>
                   </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-copper mb-2">🖱️ Interactions</h3>
                  <ul className="space-y-1 ml-4">
                    <li>• Bouton hamburger fonctionne</li>
                    <li>• Menu s'ouvre et se ferme correctement</li>
                    <li>• Clic sur backdrop ferme le menu</li>
                    <li>• Touche Échap ferme le menu</li>
                    <li>• Clic sur lien ferme le menu</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-copper mb-2">📱 UX Mobile</h3>
                                     <ul className="space-y-1 ml-4">
                     <li>• Scroll du body bloqué quand menu ouvert</li>
                     <li>• Menu prend toute la largeur</li>
                     <li>• Bouton WhatsApp uniquement dans le menu</li>
                     <li>• Transitions fluides</li>
                     <li>• Pas de conflits de z-index</li>
                   </ul>
                </div>
              </div>
            </div>

            <div className="bg-white/10 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-white mb-4">💻 Test Desktop</h2>
              <div className="text-white space-y-2 text-sm">
                <p>• Vérifiez que la navbar desktop s'affiche correctement</p>
                <p>• Testez les liens de navigation</p>
                <p>• Vérifiez le bouton de contact</p>
                <p>• Testez le sélecteur de langue</p>
                <p>• Vérifiez que le bouton WhatsApp flottant est visible</p>
              </div>
            </div>

            {/* Contenu pour créer du scroll */}
            {Array.from({ length: 20 }, (_, i) => (
              <div key={i} className="bg-white/5 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-white mb-2">Section de Test {i + 1}</h3>
                <p className="text-white text-sm">
                  Cette section permet de tester le scroll et vérifier que la navbar mobile fonctionne correctement même avec beaucoup de contenu. 
                  Testez l'ouverture et la fermeture du menu à différents niveaux de scroll.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
