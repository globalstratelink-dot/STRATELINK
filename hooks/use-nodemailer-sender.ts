import { useState } from 'react'

interface ContactData {
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
  messageId?: string
}

export function useNodemailerSender() {
  const [emailState, setEmailState] = useState<EmailState>({
    isSending: false,
    isSuccess: false,
    isError: false,
    errorMessage: ''
  })

  const sendEmail = async (data: ContactData): Promise<boolean> => {
    setEmailState({
      isSending: true,
      isSuccess: false,
      isError: false,
      errorMessage: ''
    })

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })

      const result = await response.json()

      if (response.ok && result.success) {
        setEmailState({
          isSending: false,
          isSuccess: true,
          isError: false,
          errorMessage: '',
          messageId: result.messageId
        })
        return true
      } else {
        throw new Error(result.error || 'Erreur lors de l\'envoi de l\'email')
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error)
      
      let errorMessage = 'Une erreur est survenue lors de l\'envoi de l\'email.'
      
      if (error instanceof Error) {
        if (error.message.includes('Failed to fetch')) {
          errorMessage = 'Erreur de connexion. Vérifiez votre connexion internet.'
        } else if (error.message.includes('Configuration SMTP invalide')) {
          errorMessage = 'Configuration SMTP invalide. Vérifiez votre mot de passe d\'application Google.'
        } else if (error.message.includes('Échec d\'authentification')) {
          errorMessage = 'Échec d\'authentification. Vérifiez vos identifiants SMTP.'
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