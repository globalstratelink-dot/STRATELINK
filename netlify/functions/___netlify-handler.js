// Handler Netlify pour les API routes Next.js
// Ce fichier est automatiquement généré par le plugin @netlify/plugin-nextjs

const { createRequestHandler } = require('@netlify/plugin-nextjs')

// Créer le handler pour Next.js
const handler = createRequestHandler({
  // Configuration Next.js
  build: {
    // Dossier de build
    publish: '.next',
    // Commandes de build
    command: 'pnpm build'
  }
})

// Exporter le handler
exports.handler = handler 