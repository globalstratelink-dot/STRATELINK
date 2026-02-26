'use client'

import React, { useState } from 'react'
import { useLanguage } from '@/contexts/language-context'
import { translations } from '@/lib/translations'

export function TranslationTest() {
  const { t, language, setLanguage } = useLanguage()
  const [showAllTranslations, setShowAllTranslations] = useState(false)

  const currentTranslations = translations[language as keyof typeof translations]
  const translationKeys = Object.keys(currentTranslations) as Array<keyof typeof currentTranslations>

  return (
    <div className="min-h-screen bg-navy pt-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Test des Traductions - {language.toUpperCase()}
          </h1>
          <div className="flex justify-center space-x-4 mb-6">
            <button
              onClick={() => setLanguage('en')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                language === 'en' 
                  ? 'bg-copper text-navy' 
                  : 'bg-gray-700 text-white hover:bg-gray-600'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setLanguage('fr')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                language === 'fr' 
                  ? 'bg-copper text-navy' 
                  : 'bg-gray-700 text-white hover:bg-gray-600'
              }`}
            >
              Français
            </button>
          </div>
          <button
            onClick={() => setShowAllTranslations(!showAllTranslations)}
            className="px-6 py-3 bg-gradient-to-r from-copper to-sand text-navy font-bold rounded-lg hover:scale-105 transition-transform"
          >
            {showAllTranslations ? 'Masquer' : 'Afficher'} Toutes les Traductions
          </button>
        </div>

        {/* Test des traductions principales */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/10 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-copper mb-4">Navigation</h3>
            <div className="space-y-2 text-white">
              <div><strong>Home:</strong> {t('home')}</div>
              <div><strong>Services:</strong> {t('services')}</div>
              <div><strong>Agency:</strong> {t('agency')}</div>
              <div><strong>Contact:</strong> {t('contact')}</div>
            </div>
          </div>

          <div className="bg-white/10 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-copper mb-4">Entreprise</h3>
            <div className="space-y-2 text-white">
              <div><strong>Nom:</strong> {t('companyName')}</div>
              <div><strong>Slogan:</strong> {t('companyTagline')}</div>
              <div><strong>Contact:</strong> {t('contactUs')}</div>
            </div>
          </div>

          <div className="bg-white/10 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-copper mb-4">Accessibilité</h3>
            <div className="space-y-2 text-white">
              <div><strong>WhatsApp:</strong> {t('openWhatsApp')}</div>
              <div><strong>Menu:</strong> {t('openMenu')} / {t('closeMenu')}</div>
            </div>
          </div>

          <div className="bg-white/10 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-copper mb-4">Services Agency</h3>
            <div className="space-y-2 text-white">
              <div><strong>Développement:</strong> {t('commercialDevelopment')}</div>
              <div><strong>Branding:</strong> {t('brandCreationBranding')}</div>
              <div><strong>Sourcing:</strong> {t('internationalSourcingImportExport')}</div>
              <div><strong>Digital:</strong> {t('digitalSolutionsApiSaaS')}</div>
            </div>
          </div>

          <div className="bg-white/10 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-copper mb-4">Éléments de Services</h3>
            <div className="space-y-2 text-white">
              <div><strong>Import/Export:</strong> {t('importExport')}</div>
              <div><strong>Développement:</strong> {t('businessDevelopment')}</div>
              <div><strong>Logistique:</strong> {t('logisticsSolutions')}</div>
              <div><strong>Branding:</strong> {t('branding')}</div>
            </div>
          </div>

          <div className="bg-white/10 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-copper mb-4">Statistiques</h3>
            <div className="space-y-2 text-white">
              <div><strong>Clients:</strong> {t('statsGlobalClients')}</div>
              <div><strong>Pays:</strong> {t('statsCountriesServed')}</div>
              <div><strong>Projets:</strong> {t('statsProjectsCompleted')}</div>
              <div><strong>Satisfaction:</strong> {t('statsClientSatisfaction')}</div>
            </div>
          </div>
        </div>

        {/* Affichage de toutes les traductions */}
        {showAllTranslations && (
          <div className="bg-white/10 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-copper mb-6">Toutes les Traductions ({translationKeys.length})</h2>
            <div className="grid md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
              {translationKeys.map((key) => {
                const value = currentTranslations[key]
                return (
                  <div key={String(key)} className="bg-white/5 p-3 rounded">
                    <div className="text-copper font-semibold text-sm">{String(key)}</div>
                    <div className="text-white text-sm">
                      {Array.isArray(value) ? (
                        <ul className="list-disc list-inside">
                          {value.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      ) : (
                        String(value)
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="bg-white/10 p-6 rounded-lg mt-8">
          <h3 className="text-xl font-semibold text-copper mb-4">Instructions de Test</h3>
          <div className="text-white space-y-2">
            <p>1. <strong>Changement de langue:</strong> Utilisez les boutons en haut pour changer de langue</p>
            <p>2. <strong>Vérification:</strong> Tous les textes doivent changer automatiquement</p>
            <p>3. <strong>Navigation:</strong> Testez la navigation dans les différentes langues</p>
            <p>4. <strong>Pages:</strong> Vérifiez que toutes les pages sont traduites</p>
            <p>5. <strong>Composants:</strong> Assurez-vous que tous les composants utilisent les traductions</p>
          </div>
        </div>

        {/* Problèmes détectés */}
        <div className="bg-white/10 p-6 rounded-lg mt-8">
          <h3 className="text-xl font-semibold text-copper mb-4">Vérifications à Effectuer</h3>
          <div className="text-white space-y-2">
            <div className="flex items-center space-x-2">
              <span className="w-4 h-4 bg-green-500 rounded-full"></span>
              <span>Navbar - Logo et navigation</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-4 h-4 bg-green-500 rounded-full"></span>
              <span>Page d'accueil - Tous les textes</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-4 h-4 bg-green-500 rounded-full"></span>
              <span>Page Services - Descriptions</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-4 h-4 bg-green-500 rounded-full"></span>
              <span>Page Agency - Nouveaux blocs de services</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-4 h-4 bg-green-500 rounded-full"></span>
              <span>Page Contact - Formulaires et informations</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-4 h-4 bg-green-500 rounded-full"></span>
              <span>Footer - Liens et informations</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-4 h-4 bg-green-500 rounded-full"></span>
              <span>Bouton WhatsApp - Accessibilité</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
