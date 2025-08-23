import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { EMAILJS_CONFIG } from '@/lib/emailjs-config'

interface EmailData {
  firstName: string
  lastName: string
  email: string
  company: string
  subject: string
  message: string
}

interface EmailState {
  isSending: boolean
  isSuccess: boolean
  isError: boolean
  errorMessage: string
}

export function useEmailSender() {
  const [emailState, setEmailState] = useState<EmailState>({
    isSending: false,
    isSuccess: false,
    isError: false,
    errorMessage: ''
  })

  const sendEmail = async (data: EmailData): Promise<boolean> => {
    setEmailState({
      isSending: true,
      isSuccess: false,
      isError: false,
      errorMessage: ''
    })

    try {
      // Vérifier que la configuration est correcte
      if (!EMAILJS_CONFIG.SERVICE_ID || !EMAILJS_CONFIG.TEMPLATE_ID || !EMAILJS_CONFIG.PUBLIC_KEY) {
        throw new Error('Configuration EmailJS manquante. Veuillez configurer les clés dans lib/emailjs-config.ts')
      }

      // Préparer les paramètres pour EmailJS
      const templateParams = {
        to_email: EMAILJS_CONFIG.TO_EMAIL,
        from_name: `${data.firstName} ${data.lastName}`,
        from_email: data.email,
        company: data.company || 'Non spécifié',
        subject: data.subject,
        message: data.message,
        reply_to: data.email
      }

      // Envoyer l'email via EmailJS
      const result = await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams,
        EMAILJS_CONFIG.PUBLIC_KEY
      )

      if (result.status === 200) {
        setEmailState({
          isSending: false,
          isSuccess: true,
          isError: false,
          errorMessage: ''
        })
        return true
      } else {
        throw new Error('Erreur lors de l\'envoi de l\'email')
      }
    } catch (error) {
      console.error('Erreur EmailJS:', error)
      
      let errorMessage = 'Une erreur est survenue lors de l\'envoi de l\'email.'
      
      if (error instanceof Error) {
        if (error.message.includes('Configuration EmailJS manquante')) {
          errorMessage = 'Configuration EmailJS manquante. Veuillez configurer les clés.'
        } else if (error.message.includes('Network Error')) {
          errorMessage = 'Erreur de connexion. Vérifiez votre connexion internet.'
        } else {
          errorMessage = error.message
        }
      }

      setEmailState({
        isSending: false,
        isSuccess: false,
        isError: true,
        errorMessage
      })
      return false
    }
  }

  const resetState = () => {
    setEmailState({
      isSending: false,
      isSuccess: false,
      isError: false,
      errorMessage: ''
    })
  }

  return {
    emailState,
    sendEmail,
    resetState
  }
} 