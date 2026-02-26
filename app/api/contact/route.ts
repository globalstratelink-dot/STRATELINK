import { NextRequest, NextResponse } from 'next/server'
import { createTransporter, createEmailTemplate, createTextTemplate, EMAIL_CONFIG } from '@/lib/nodemailer-config'

// Types pour la validation
interface ContactData {
  firstName: string
  lastName: string
  email: string
  company: string
  country: string
  phoneNumber: string
  subject: string
  message: string
}

// Validation des données
function validateContactData(data: any): data is ContactData {
  return (
    typeof data.firstName === 'string' && data.firstName.trim().length > 0 &&
    typeof data.lastName === 'string' && data.lastName.trim().length > 0 &&
    typeof data.email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) &&
    typeof data.subject === 'string' && data.subject.trim().length > 0 &&
    typeof data.message === 'string' && data.message.trim().length > 0
  )
}

// Fonction d'envoi d'email
async function sendEmail(data: ContactData) {
  try {
    const transporter = createTransporter()
    
    // Vérifier la connexion
    await transporter.verify()
    
    // Préparer l'email
    const mailOptions = {
      from: EMAIL_CONFIG.from,
      to: EMAIL_CONFIG.to,
      replyTo: data.email, // Permet de répondre directement au contact
      subject: `${EMAIL_CONFIG.subject} - ${data.subject}`,
      html: createEmailTemplate(data),
      text: createTextTemplate(data)
    }
    
    // Envoyer l'email
    const info = await transporter.sendMail(mailOptions)
    
    return {
      success: true,
      messageId: info.messageId,
      message: 'Email envoyé avec succès'
    }
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error)
    
    if (error instanceof Error) {
      // Gestion des erreurs spécifiques
      if (error.message.includes('Invalid login')) {
        return {
          success: false,
          error: 'Configuration SMTP invalide. Vérifiez votre mot de passe d\'application Google.'
        }
      }
      if (error.message.includes('Connection timeout')) {
        return {
          success: false,
          error: 'Timeout de connexion. Vérifiez votre connexion internet.'
        }
      }
      if (error.message.includes('Authentication failed')) {
        return {
          success: false,
          error: 'Échec d\'authentification. Vérifiez vos identifiants SMTP.'
        }
      }
    }
    
    return {
      success: false,
      error: 'Erreur lors de l\'envoi de l\'email. Veuillez réessayer.'
    }
  }
}

// API Route POST
export async function POST(request: NextRequest) {
  try {
    // Vérifier la méthode HTTP
    if (request.method !== 'POST') {
      return NextResponse.json(
        { error: 'Méthode non autorisée' },
        { status: 405 }
      )
    }

    // Parser le body JSON
    let body
    try {
      body = await request.json()
    } catch (error) {
      return NextResponse.json(
        { error: 'Données JSON invalides' },
        { status: 400 }
      )
    }

    // Valider les données
    if (!validateContactData(body)) {
      return NextResponse.json(
        { error: 'Données de contact invalides' },
        { status: 400 }
      )
    }

    // Nettoyer les données
    const cleanData: ContactData = {
      firstName: body.firstName.trim(),
      lastName: body.lastName.trim(),
      email: body.email.trim().toLowerCase(),
      company: body.company?.trim() || '',
      country: body.country?.trim() || '',
      phoneNumber: body.phoneNumber?.trim() || '',
      subject: body.subject.trim(),
      message: body.message.trim()
    }

    // Envoyer l'email
    const result = await sendEmail(cleanData)

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'Message envoyé avec succès !',
        messageId: result.messageId
      })
    } else {
      return NextResponse.json(
        { 
          success: false, 
          error: result.error 
        },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error('Erreur serveur:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Erreur serveur interne. Veuillez réessayer plus tard.' 
      },
      { status: 500 }
    )
  }
}

// API Route GET (pour tester)
export async function GET() {
  return NextResponse.json({
    message: 'API de contact Stratelink Global',
    status: 'active',
    method: 'POST',
    endpoint: '/api/contact'
  })
} 