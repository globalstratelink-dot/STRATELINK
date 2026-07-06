import { NextRequest, NextResponse } from 'next/server'
import { createFormNotification } from '@/lib/form-notifications-store'
import { getClientIp } from '@/lib/request-ip'
import { rateLimit, rateLimitResponse } from '@/lib/rate-limit'
import { sendContactEmail, validateContactData, type ContactEmailData } from '@/lib/send-contact-email'
import { isHoneypotTriggered, verifyTurnstileToken } from '@/lib/turnstile'

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

    const ip = getClientIp(request)

    if (isHoneypotTriggered(body.website)) {
      return NextResponse.json({ success: true, message: 'Message envoyé avec succès !' })
    }

    const limit = rateLimit(`contact:${ip}`, 5, 15 * 60 * 1000)
    if (!limit.ok) {
      return NextResponse.json(rateLimitResponse(limit.retryAfterSec), { status: 429 })
    }

    const captchaOk = await verifyTurnstileToken(body.turnstileToken, ip)
    if (!captchaOk) {
      return NextResponse.json({ error: 'Vérification anti-spam échouée. Réessayez.' }, { status: 400 })
    }

    // Valider les données
    if (!validateContactData(body)) {
      return NextResponse.json(
        { error: 'Données de contact invalides' },
        { status: 400 }
      )
    }

    // Nettoyer les données
    const cleanData: ContactEmailData = {
      firstName: body.firstName.trim(),
      lastName: body.lastName.trim(),
      email: body.email.trim().toLowerCase(),
      company: body.company?.trim() || '',
      country: body.country?.trim() || '',
      phoneNumber: body.phoneNumber?.trim() || '',
      subject: body.subject.trim(),
      message: body.message.trim()
    }

    const isQualificationEmail = cleanData.subject === "Partner Qualification"

    if (!isQualificationEmail) {
      await createFormNotification({
        type: "contact",
        firstName: cleanData.firstName,
        lastName: cleanData.lastName,
        email: cleanData.email,
        company: cleanData.company,
        phone: cleanData.phoneNumber,
        country: cleanData.country,
        subject: cleanData.subject,
        message: cleanData.message,
      })
    }

    // Envoyer l'email
    const result = await sendContactEmail(cleanData)

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