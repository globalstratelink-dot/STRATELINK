// Configuration EmailJS
// IMPORTANT: Vous devez configurer ces clés pour que le formulaire de contact fonctionne
// Suivez le guide EMAILJS_SETUP.md pour configurer EmailJS

export const EMAILJS_CONFIG = {
  // Service ID - Créez un service Gmail dans EmailJS et remplacez par votre Service ID
  // Exemple: 'service_abc123' (commence toujours par 'service_')
  SERVICE_ID: 'service_xxxxxxx', // ⚠️ À CONFIGURER
  
  // Template ID - Créez un template d'email dans EmailJS et remplacez par votre Template ID  
  // Exemple: 'template_xyz789' (commence toujours par 'template_')
  TEMPLATE_ID: 'template_xxxxxxx', // ⚠️ À CONFIGURER
  
  // Public Key - Trouvez votre Public Key dans les paramètres de votre compte EmailJS
  // Exemple: 'user_abc123def456ghi789'
  PUBLIC_KEY: 'xxxxxxxxxxxxxxxxxxxx', // ⚠️ À CONFIGURER
  
  // Email de destination (ne changez pas)
  TO_EMAIL: 'globalstratelink@gmail.com',
  
  // Nom de l'entreprise (ne changez pas)
  COMPANY_NAME: 'Stratelink Global'
}

// Template de l'email (ne changez pas)
export const EMAIL_TEMPLATE = {
  subject: 'Nouveau message de contact - Stratelink Global',
  from_name: 'Formulaire de contact',
  to_email: 'globalstratelink@gmail.com',
  company_name: 'Stratelink Global'
}

// Instructions de configuration:
// 1. Allez sur https://www.emailjs.com/ et créez un compte
// 2. Créez un service Gmail et notez le SERVICE_ID
// 3. Créez un template d'email et notez le TEMPLATE_ID  
// 4. Copiez votre PUBLIC_KEY depuis les paramètres du compte
// 5. Remplacez les valeurs 'xxxxxxx' ci-dessus par vos vraies clés
// 6. Redémarrez votre serveur de développement 