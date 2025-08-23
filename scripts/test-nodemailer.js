#!/usr/bin/env node

/**
 * Script de test pour vérifier la configuration Nodemailer
 * Usage: node scripts/test-nodemailer.js
 */

require('dotenv').config({ path: '.env.local' });
const nodemailer = require('nodemailer');

// Configuration SMTP
const smtpConfig = {
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  }
};

// Email de test
const testEmail = {
  from: `"Stratelink Global" <${process.env.GMAIL_USER}>`,
  to: process.env.TO_EMAIL || 'globalstratelink@gmail.com',
  subject: 'Test Nodemailer - Stratelink Global',
  html: `
    <h2>🧪 Test de configuration Nodemailer</h2>
    <p>Ceci est un email de test pour vérifier que Nodemailer est correctement configuré.</p>
    
    <h3>Configuration actuelle :</h3>
    <ul>
      <li><strong>Host:</strong> ${smtpConfig.host}</li>
      <li><strong>Port:</strong> ${smtpConfig.port}</li>
      <li><strong>Secure:</strong> ${smtpConfig.secure}</li>
      <li><strong>User:</strong> ${smtpConfig.auth.user}</li>
      <li><strong>Password:</strong> ${smtpConfig.auth.pass ? '***' + smtpConfig.auth.pass.slice(-4) : 'Non configuré'}</li>
    </ul>
    
    <p><strong>Date:</strong> ${new Date().toLocaleString('fr-FR')}</p>
    
    <hr>
    <p style="color: #666; font-size: 12px;">
      Si vous recevez cet email, Nodemailer est correctement configuré ! 🎉
    </p>
  `,
  text: `
    Test de configuration Nodemailer - Stratelink Global
    
    Ceci est un email de test pour vérifier que Nodemailer est correctement configuré.
    
    Configuration actuelle :
    - Host: ${smtpConfig.host}
    - Port: ${smtpConfig.port}
    - Secure: ${smtpConfig.secure}
    - User: ${smtpConfig.auth.user}
    - Password: ${smtpConfig.auth.pass ? '***' + smtpConfig.auth.pass.slice(-4) : 'Non configuré'}
    
    Date: ${new Date().toLocaleString('fr-FR')}
    
    Si vous recevez cet email, Nodemailer est correctement configuré !
  `
};

async function testNodemailer() {
  console.log('🧪 Test de configuration Nodemailer...\n');
  
  // Vérifier les variables d'environnement
  console.log('📋 Vérification des variables d\'environnement :');
  console.log(`   GMAIL_USER: ${process.env.GMAIL_USER || '❌ Non configuré'}`);
  console.log(`   GMAIL_APP_PASSWORD: ${process.env.GMAIL_APP_PASSWORD ? '✅ Configuré' : '❌ Non configuré'}`);
  console.log(`   TO_EMAIL: ${process.env.TO_EMAIL || '❌ Non configuré'}`);
  console.log(`   SMTP_HOST: ${process.env.SMTP_HOST || '✅ Défaut (smtp.gmail.com)'}`);
  console.log(`   SMTP_PORT: ${process.env.SMTP_PORT || '✅ Défaut (587)'}`);
  console.log('');
  
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    console.log('❌ Configuration incomplète !');
    console.log('   Créez un fichier .env.local avec les variables requises.');
    console.log('   Voir env.example pour un exemple.');
    process.exit(1);
  }
  
  try {
    // Créer le transporteur
    console.log('🔧 Création du transporteur Nodemailer...');
    const transporter = nodemailer.createTransporter(smtpConfig);
    
    // Vérifier la connexion
    console.log('🔍 Vérification de la connexion SMTP...');
    await transporter.verify();
    console.log('✅ Connexion SMTP réussie !\n');
    
    // Envoyer l'email de test
    console.log('📧 Envoi de l\'email de test...');
    const info = await transporter.sendMail(testEmail);
    
    console.log('✅ Email de test envoyé avec succès !');
    console.log(`   Message ID: ${info.messageId}`);
    console.log(`   Destinataire: ${testEmail.to}`);
    console.log(`   Date: ${new Date().toLocaleString('fr-FR')}`);
    console.log('');
    console.log('🎉 Nodemailer est correctement configuré !');
    console.log('   Vérifiez votre boîte Gmail pour confirmer la réception.');
    
  } catch (error) {
    console.log('❌ Erreur lors du test :');
    console.log(`   ${error.message}`);
    console.log('');
    
    if (error.message.includes('Invalid login')) {
      console.log('💡 Solution : Vérifiez votre mot de passe d\'application Google');
      console.log('   - Allez sur https://myaccount.google.com/security');
      console.log('   - Créez un nouveau mot de passe d\'application');
      console.log('   - Mettez à jour .env.local');
    } else if (error.message.includes('Connection timeout')) {
      console.log('💡 Solution : Vérifiez votre connexion internet et le port 587');
    } else if (error.message.includes('Authentication failed')) {
      console.log('💡 Solution : Vérifiez vos identifiants Gmail');
    }
    
    process.exit(1);
  }
}

// Exécuter le test
testNodemailer(); 