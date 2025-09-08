"use client"

import { useEffect } from 'react'
import { useLanguage } from '@/contexts/language-context'

export default function CalendlyPage() {
  const { t } = useLanguage()

  useEffect(() => {
    // Charger le script Calendly
    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    document.head.appendChild(script)

    // Vérifier si le widget se charge après 3 secondes
    const checkWidget = setTimeout(() => {
      const widget = document.querySelector('.calendly-inline-widget')
      const fallback = document.getElementById('calendly-fallback')
      
      if (widget && widget.children.length === 0 && fallback) {
        fallback.classList.remove('hidden')
        fallback.classList.add('block')
      }
    }, 3000)

    return () => {
      clearTimeout(checkWidget)
      // Nettoyer le script lors du démontage
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
        <div className="text-center mb-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            {t('scheduleTime')}
          </h1>
        </div>

        {/* Widget Calendly */}
        <div 
          className="calendly-inline-widget" 
          data-url="https://calendly.com/stratelink?background_color=041331&text_color=ffffff&primary_color=a97968" 
          style={{ minWidth: '320px', height: '700px' }}
        />
        
        {/* Fallback si le widget ne se charge pas */}
        <div className="hidden" id="calendly-fallback">
          <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-navy mb-4">Planifier un rendez-vous</h3>
            <p className="text-gray-600 mb-6">Si le calendrier ne s'affiche pas, cliquez sur le bouton ci-dessous :</p>
            <a 
              href="https://calendly.com/stratelink" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-gradient-to-r from-copper to-sand text-navy font-bold px-8 py-4 rounded-xl hover:shadow-lg transition-all duration-300"
            >
              Ouvrir Calendly
            </a>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-center mt-8">
          <p className="text-gray-400 text-sm">
            {t('weWillRespondWithin24Hours')}
          </p>
        </div>
      </div>
    </div>
  )
}
