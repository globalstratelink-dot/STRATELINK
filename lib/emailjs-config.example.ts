// Configuration EmailJS - EXEMPLE
// Copiez ce fichier vers emailjs-config.ts et remplacez les valeurs par vos vraies clés

export const EMAILJS_CONFIG = {
  // Service ID - Créez un service Gmail dans EmailJS
  // Exemple: 'service_abc123def456'
  SERVICE_ID: 'service_votre_service_id_ici',
  
  // Template ID - Créez un template d'email dans EmailJS
  // Exemple: 'template_xyz789ghi012'
  TEMPLATE_ID: 'template_votre_template_id_ici',
  
  // Public Key - Trouvez dans les paramètres de votre compte EmailJS
  // Exemple: 'user_abc123def456ghi789'
  PUBLIC_KEY: 'votre_public_key_ici',
  
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

// ============================================================================
// INSTRUCTIONS DÉTAILLÉES POUR CONFIGURER EMAILJS
// ============================================================================

/*
ÉTAPE 1: Créer un compte EmailJS
- Allez sur https://www.emailjs.com/
- Cliquez sur "Sign Up" et créez un compte
- Vérifiez votre email

ÉTAPE 2: Créer un service Gmail
- Dans votre dashboard EmailJS, cliquez sur "Email Services"
- Cliquez sur "Add New Service"
- Sélectionnez "Gmail"
- Connectez-vous avec votre compte Gmail (globalstratelink@gmail.com)
- Notez le SERVICE_ID (commence par 'service_')

ÉTAPE 3: Créer un template d'email
- Dans votre dashboard, cliquez sur "Email Templates"
- Cliquez sur "Create New Template"
- Utilisez ce template HTML:

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Nouveau message de contact - Stratelink Global</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #041331; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #041331; }
        .value { color: #666; }
        .message-box { background: white; padding: 15px; border-left: 4px solid #A97968; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📧 Nouveau message de contact</h1>
            <p>Stratelink Global</p>
        </div>
        
        <div class="content">
            <h2>Informations du contact :</h2>
            
            <div class="field">
                <span class="label">Nom complet :</span>
                <span class="value">{{from_name}}</span>
            </div>
            
            <div class="field">
                <span class="label">Email :</span>
                <span class="value">{{from_email}}</span>
            </div>
            
            <div class="field">
                <span class="label">Entreprise :</span>
                <span class="value">{{company}}</span>
            </div>
            
            <div class="field">
                <span class="label">Sujet :</span>
                <span class="value">{{subject}}</span>
            </div>
            
            <h3>Message :</h3>
            <div class="message-box">
                {{message}}
            </div>
            
            <div class="footer">
                <p>Ce message a été envoyé depuis le formulaire de contact du site Stratelink Global.</p>
                <p>Date : {{date}}</p>
            </div>
        </div>
    </div>
</body>
</html>

- Notez le TEMPLATE_ID (commence par 'template_')

ÉTAPE 4: Obtenir votre Public Key
- Dans votre dashboard, cliquez sur "Account" → "API Keys"
- Copiez votre "Public Key"

ÉTAPE 5: Configurer le projet
- Remplacez les valeurs dans lib/emailjs-config.ts
- Redémarrez votre serveur de développement
- Testez le formulaire de contact

ÉTAPE 6: Test
- Remplissez le formulaire de contact
- Vérifiez que l'email arrive sur globalstratelink@gmail.com
- Vérifiez que vous pouvez répondre directement au contact

NOTES IMPORTANTES:
- Le compte gratuit EmailJS permet 200 emails/mois
- Les clés API sont publiques (c'est normal pour EmailJS)
- Assurez-vous que votre Gmail accepte les connexions SMTP
*/

// Variables du template EmailJS (utilisées dans le code)
export const EMAILJS_TEMPLATE_VARIABLES = {
  from_name: '{{from_name}}',      // Nom complet du contact
  from_email: '{{from_email}}',    // Email du contact
  company: '{{company}}',          // Entreprise du contact
  subject: '{{subject}}',          // Sujet du message
  message: '{{message}}',          // Contenu du message
  date: '{{date}}'                 // Date d'envoi
} 