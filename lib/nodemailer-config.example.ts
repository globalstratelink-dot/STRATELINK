// Configuration Nodemailer avec SMTP Google - EXEMPLE
// Copiez ce fichier vers nodemailer-config.ts et remplacez YOUR_APP_PASSWORD_HERE par votre mot de passe d'application Google

import nodemailer from 'nodemailer'

// Configuration SMTP Google
export const SMTP_CONFIG = {
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true pour 465, false pour les autres ports
  auth: {
    user: 'globalstratelink@gmail.com',
    // Remplacez par votre mot de passe d'application Google (16 caractères sans espaces)
    pass: 'YOUR_APP_PASSWORD_HERE'
  }
}

// Configuration de l'email
export const EMAIL_CONFIG = {
  from: '"Stratelink Global" <globalstratelink@gmail.com>',
  to: 'globalstratelink@gmail.com',
  subject: 'Nouveau message de contact - Stratelink Global',
  companyName: 'Stratelink Global'
}

// Créer le transporteur Nodemailer
export function createTransporter() {
  return nodemailer.createTransport(SMTP_CONFIG)
}

// Template d'email HTML
export function createEmailTemplate(data: {
  firstName: string
  lastName: string
  email: string
  company: string
  subject: string
  message: string
}) {
  return `
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
                    <span class="value">${data.firstName} ${data.lastName}</span>
                </div>
                
                <div class="field">
                    <span class="label">Email :</span>
                    <span class="value">${data.email}</span>
                </div>
                
                <div class="field">
                    <span class="label">Entreprise :</span>
                    <span class="value">${data.company || 'Non spécifié'}</span>
                </div>
                
                <div class="field">
                    <span class="label">Sujet :</span>
                    <span class="value">${data.subject}</span>
                </div>
                
                <h3>Message :</h3>
                <div class="message-box">
                    ${data.message.replace(/\n/g, '<br>')}
                </div>
                
                <div class="footer">
                    <p>Ce message a été envoyé depuis le formulaire de contact du site Stratelink Global.</p>
                    <p>Date : ${new Date().toLocaleString('fr-FR')}</p>
                </div>
            </div>
        </div>
    </body>
    </html>
  `
}

// Template d'email texte simple (fallback)
export function createTextTemplate(data: {
  firstName: string
  lastName: string
  email: string
  company: string
  subject: string
  message: string
}) {
  return `
NOUVEAU MESSAGE DE CONTACT - STRATELINK GLOBAL

Informations du contact :
- Nom complet : ${data.firstName} ${data.lastName}
- Email : ${data.email}
- Entreprise : ${data.company || 'Non spécifié'}
- Sujet : ${data.subject}

Message :
${data.message}

---
Ce message a été envoyé depuis le formulaire de contact du site Stratelink Global.
Date : ${new Date().toLocaleString('fr-FR')}
  `
}

/*
INSTRUCTIONS DE CONFIGURATION :

1. Activez l'authentification à 2 facteurs sur votre compte Google globalstratelink@gmail.com
2. Créez un mot de passe d'application :
   - Allez sur myaccount.google.com → Sécurité → Validation en 2 étapes
   - Cliquez sur "Mots de passe d'application"
   - Sélectionnez "Autre (nom personnalisé)" → "Stratelink Global Website"
   - Notez le mot de passe de 16 caractères généré
3. Copiez ce fichier vers nodemailer-config.ts
4. Remplacez 'YOUR_APP_PASSWORD_HERE' par votre vrai mot de passe d'application
5. Redémarrez votre serveur de développement

Voir NODEMAILER_SETUP.md pour les instructions détaillées.
*/ 