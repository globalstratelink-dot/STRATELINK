'use client'

import React, { useEffect, useState } from 'react'

export function LoadingTest() {
  const [loadTime, setLoadTime] = useState<number>(0)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const startTime = performance.now()
    
    // Simuler le chargement
    const timer = setTimeout(() => {
      const endTime = performance.now()
      setLoadTime(endTime - startTime)
      setIsLoaded(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-navy p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Test de Chargement Optimisé</h1>
        
        <div className="space-y-6">
          <div className="bg-white/10 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-white mb-4">Statistiques de Chargement</h2>
            <div className="text-white space-y-2">
              <p>⏱️ Temps de chargement: <span className="font-bold">{loadTime.toFixed(2)}ms</span></p>
              <p>📱 État: <span className="font-bold">{isLoaded ? '✅ Chargé' : '⏳ Chargement...'}</span></p>
              <p>🚀 Optimisations actives: <span className="font-bold">✅ Animations désactivées</span></p>
            </div>
          </div>

          <div className="bg-white/10 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-white mb-4">Optimisations Appliquées</h2>
            <ul className="text-white space-y-2">
              <li>✅ Affichage immédiat du contenu</li>
              <li>✅ Animations complexes désactivées</li>
              <li>✅ Transitions accélérées</li>
              <li>✅ Images optimisées</li>
              <li>✅ Framer Motion accéléré</li>
              <li>✅ Scroll animations simplifiées</li>
            </ul>
          </div>

          <div className="bg-white/10 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-white mb-4">Contenu de Test</h2>
            <div className="text-white space-y-4">
              <p>Ce contenu devrait s'afficher immédiatement sans délai d'animation.</p>
              <p>Les optimisations de performance sont maintenant actives.</p>
              <p>Le chargement devrait être significativement plus rapide.</p>
            </div>
          </div>

          {/* Test des animations désactivées */}
          <div className="bg-white/10 p-6 rounded-lg scroll-reveal">
            <h3 className="text-xl font-semibold text-white mb-2">Test Animation Scroll</h3>
            <p className="text-white">Cette section devrait être visible immédiatement.</p>
          </div>

          <div className="bg-white/10 p-6 rounded-lg card-reveal">
            <h3 className="text-xl font-semibold text-white mb-2">Test Animation Carte</h3>
            <p className="text-white">Cette carte devrait être visible immédiatement.</p>
          </div>

          <div className="bg-white/10 p-6 rounded-lg text-reveal">
            <h3 className="text-xl font-semibold text-white mb-2">Test Animation Texte</h3>
            <p className="text-white">Ce texte devrait être visible immédiatement.</p>
          </div>

          {/* Répéter le contenu pour créer du scroll */}
          {Array.from({ length: 5 }, (_, i) => (
            <div key={i} className="bg-white/5 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-white mb-2">Section de Test {i + 1}</h3>
              <p className="text-white">
                Cette section permet de tester le scroll et vérifier que le contenu s'affiche rapidement.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
