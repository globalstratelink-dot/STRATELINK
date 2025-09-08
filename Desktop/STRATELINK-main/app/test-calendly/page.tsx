"use client"

import { useEffect, useState } from 'react'

export default function TestCalendlyPage() {
  const [calendlyLoaded, setCalendlyLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Charger le script Calendly
    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    
    script.onload = () => {
      console.log('Script Calendly chargé avec succès')
      setCalendlyLoaded(true)
    }
    
    script.onerror = () => {
      console.error('Erreur lors du chargement du script Calendly')
      setError('Erreur lors du chargement du script Calendly')
    }
    
    document.head.appendChild(script)

    // Vérifier si le widget se charge
    const checkWidget = setTimeout(() => {
      const widget = document.querySelector('.calendly-inline-widget')
      if (widget && widget.children.length === 0) {
        setError('Le widget Calendly ne s\'est pas chargé correctement')
      }
    }, 5000)

    return () => {
      clearTimeout(checkWidget)
      // Nettoyer le script
      const existingScript = document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]')
      if (existingScript) {
        document.head.removeChild(existingScript)
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-navy pt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Test Widget Calendly
          </h1>
          <div className="space-y-2">
            <p className="text-lg text-gray-300">
              Statut du script : {calendlyLoaded ? '✅ Chargé' : '⏳ Chargement...'}
            </p>
            {error && (
              <p className="text-lg text-red-400">
                ❌ Erreur : {error}
              </p>
            )}
          </div>
        </div>

        {/* Test avec différents comptes Calendly */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Test 1: Compte stratelink */}
          <div className="bg-white/10 backdrop-blur-sm border border-copper/20 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">Test 1: stratelink</h3>
            <div 
              className="calendly-inline-widget" 
              data-url="https://calendly.com/stratelink?background_color=041331&text_color=ffffff&primary_color=a97968" 
              style={{ minWidth: '300px', height: '400px' }}
            />
          </div>

          {/* Test 2: Compte demo */}
          <div className="bg-white/10 backdrop-blur-sm border border-copper/20 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">Test 2: demo</h3>
            <div 
              className="calendly-inline-widget" 
              data-url="https://calendly.com/demo?background_color=041331&text_color=ffffff&primary_color=a97968" 
              style={{ minWidth: '300px', height: '400px' }}
            />
          </div>
        </div>

        {/* Test 3: Widget popup */}
        <div className="text-center">
          <h3 className="text-xl font-bold text-white mb-4">Test 3: Widget Popup</h3>
          <button
            onClick={() => {
              if (typeof window !== 'undefined' && (window as any).Calendly) {
                (window as any).Calendly.initPopupWidget({
                  url: 'https://calendly.com/demo'
                })
              } else {
                alert('Calendly API non disponible')
              }
            }}
            className="bg-gradient-to-r from-copper to-sand text-navy font-bold px-8 py-4 rounded-xl hover:shadow-lg transition-all duration-300"
          >
            Ouvrir Calendly Popup
          </button>
        </div>

        {/* Informations de debug */}
        <div className="mt-8 bg-white/5 backdrop-blur-sm border border-copper/20 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-white mb-4">Informations de Debug</h3>
          <div className="space-y-2 text-sm text-gray-300">
            <p>Window.Calendly disponible : {typeof window !== 'undefined' && (window as any).Calendly ? '✅ Oui' : '❌ Non'}</p>
            <p>Script chargé : {calendlyLoaded ? '✅ Oui' : '❌ Non'}</p>
            <p>User Agent : {typeof window !== 'undefined' ? window.navigator.userAgent : 'N/A'}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
