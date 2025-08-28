'use client'

import React from 'react'
import { Navbar } from './navbar'

export function NavbarTest() {
  return (
    <div className="min-h-screen bg-navy">
      <Navbar />
      
      <div className="pt-32 px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8">Test de la Navbar avec WhatsApp</h1>
          
          <div className="space-y-6">
            <div className="bg-white/10 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold text-white mb-4">Fonctionnalités Testées</h2>
              <ul className="text-white space-y-2">
                <li>✅ Bouton WhatsApp dans la navbar mobile</li>
                <li>✅ Bouton WhatsApp dans le menu mobile</li>
                <li>✅ Bouton WhatsApp flottant sur desktop uniquement</li>
                <li>✅ Navigation responsive</li>
                <li>✅ Menu mobile fonctionnel</li>
              </ul>
            </div>

            <div className="bg-white/10 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold text-white mb-4">Instructions de Test</h2>
              <ol className="text-white space-y-2">
                <li>1. Testez sur mobile (outils de développement)</li>
                <li>2. Vérifiez le bouton WhatsApp dans la navbar</li>
                <li>3. Ouvrez le menu mobile et vérifiez le bouton WhatsApp</li>
                <li>4. Testez sur desktop - le bouton flottant doit être visible</li>
                <li>5. Vérifiez que les liens WhatsApp fonctionnent</li>
              </ol>
            </div>

            <div className="bg-white/10 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold text-white mb-4">Comportement Attendu</h2>
              <div className="text-white space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-copper mb-2">📱 Mobile</h3>
                  <ul className="space-y-1 ml-4">
                    <li>• Bouton WhatsApp visible dans la navbar</li>
                    <li>• Bouton WhatsApp dans le menu mobile</li>
                    <li>• Pas de bouton WhatsApp flottant</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-copper mb-2">💻 Desktop</h3>
                  <ul className="space-y-1 ml-4">
                    <li>• Bouton WhatsApp flottant en bas à droite</li>
                    <li>• Pas de bouton WhatsApp dans la navbar</li>
                    <li>• Animations hover sur le bouton flottant</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Contenu pour créer du scroll */}
            {Array.from({ length: 10 }, (_, i) => (
              <div key={i} className="bg-white/5 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-2">Section de Test {i + 1}</h3>
                <p className="text-white">
                  Cette section permet de tester le scroll et vérifier que la navbar et les boutons WhatsApp restent bien visibles.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
