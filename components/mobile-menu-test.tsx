'use client'

import React, { useState } from 'react'
import { Navbar } from './navbar'

export function MobileMenuTest() {
  const [testResults, setTestResults] = useState<string[]>([])

  const addTestResult = (result: string) => {
    setTestResults(prev => [...prev, result])
  }

  return (
    <div className="min-h-screen bg-navy">
      <Navbar />
      
      <div className="pt-32 px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8">Test du Menu Mobile</h1>
          
          <div className="space-y-6">
            <div className="bg-white/10 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold text-white mb-4">Problèmes Corrigés</h2>
              <ul className="text-white space-y-2">
                <li>✅ Gestion améliorée du clic à l'extérieur</li>
                <li>✅ Fermeture avec la touche Échap</li>
                <li>✅ Backdrop pour fermer le menu</li>
                <li>✅ Animations plus fluides</li>
                <li>✅ Gestion du scroll du body</li>
                <li>✅ Z-index corrigés</li>
                <li>✅ Références améliorées</li>
              </ul>
            </div>

            <div className="bg-white/10 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold text-white mb-4">Instructions de Test</h2>
              <ol className="text-white space-y-2">
                <li>1. Ouvrez les outils de développement (F12)</li>
                <li>2. Activez le mode mobile (responsive)</li>
                <li>3. Cliquez sur le bouton de menu (hamburger)</li>
                <li>4. Testez la fermeture en cliquant sur le backdrop</li>
                <li>5. Testez la fermeture avec la touche Échap</li>
                <li>6. Testez la fermeture en cliquant sur un lien</li>
                <li>7. Vérifiez que le scroll est bloqué quand le menu est ouvert</li>
              </ol>
            </div>

            <div className="bg-white/10 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold text-white mb-4">Fonctionnalités Testées</h2>
              <div className="text-white space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-copper mb-2">🎯 Ouverture/Fermeture</h3>
                  <ul className="space-y-1 ml-4">
                    <li>• Bouton hamburger fonctionne</li>
                    <li>• Animation d'ouverture fluide</li>
                    <li>• Animation de fermeture fluide</li>
                    <li>• Icône change (hamburger ↔ X)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-copper mb-2">🖱️ Interactions</h3>
                  <ul className="space-y-1 ml-4">
                    <li>• Clic sur backdrop ferme le menu</li>
                    <li>• Clic sur lien ferme le menu</li>
                    <li>• Touche Échap ferme le menu</li>
                    <li>• Clic sur bouton WhatsApp ferme le menu</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-copper mb-2">📱 UX Mobile</h3>
                  <ul className="space-y-1 ml-4">
                    <li>• Scroll du body bloqué quand menu ouvert</li>
                    <li>• Menu prend toute la largeur</li>
                    <li>• Animations staggered pour les liens</li>
                    <li>• Bouton WhatsApp dans le menu</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white/10 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold text-white mb-4">Résultats des Tests</h2>
              <div className="text-white space-y-2">
                {testResults.length === 0 ? (
                  <p className="text-gray-400">Aucun test effectué pour le moment.</p>
                ) : (
                  testResults.map((result, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <span className="text-green-400">✓</span>
                      <span>{result}</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Contenu pour créer du scroll */}
            {Array.from({ length: 15 }, (_, i) => (
              <div key={i} className="bg-white/5 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-2">Section de Test {i + 1}</h3>
                <p className="text-white">
                  Cette section permet de tester le scroll et vérifier que le menu mobile fonctionne correctement même avec beaucoup de contenu.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
