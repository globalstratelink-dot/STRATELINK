// Configuration EmailJS
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