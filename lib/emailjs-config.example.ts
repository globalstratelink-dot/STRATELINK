// Configuration EmailJS - EXEMPLE
// Copiez ce fichier vers emailjs-config.ts et remplacez les valeurs par vos vraies clés

export const EMAILJS_CONFIG = {
  // Service ID - à configurer dans EmailJS
  SERVICE_ID: 'service_xxxxxxx', // Remplacez par votre Service ID
  
  // Template ID - à configurer dans EmailJS
  TEMPLATE_ID: 'template_xxxxxxx', // Remplacez par votre Template ID
  
  // Public Key - à configurer dans EmailJS
  PUBLIC_KEY: 'xxxxxxxxxxxxxxxxxxxx', // Remplacez par votre Public Key
  
  // Email de destination
  TO_EMAIL: 'globalstratelink@gmail.com',
  
  // Nom de l'entreprise
  COMPANY_NAME: 'Stratelink Global'
}

// Template de l'email
export const EMAIL_TEMPLATE = {
  subject: 'Nouveau message de contact - Stratelink Global',
  from_name: 'Formulaire de contact',
  to_email: 'globalstratelink@gmail.com',
  company_name: 'Stratelink Global'
}

/*
INSTRUCTIONS DE CONFIGURATION :

1. Créez un compte sur EmailJS.com
2. Configurez un service Gmail avec votre compte globalstratelink@gmail.com
3. Créez un template d'email avec les variables : {{from_name}}, {{from_email}}, {{company}}, {{subject}}, {{message}}
4. Copiez ce fichier vers emailjs-config.ts
5. Remplacez les valeurs xxxxxxx par vos vraies clés EmailJS

Voir EMAILJS_SETUP.md pour les instructions détaillées.
*/ 