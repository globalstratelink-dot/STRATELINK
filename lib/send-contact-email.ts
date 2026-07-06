import { createTransporter, createEmailTemplate, createTextTemplate, EMAIL_CONFIG } from "@/lib/nodemailer-config"

export type ContactEmailData = {
  firstName: string
  lastName: string
  email: string
  company: string
  country: string
  phoneNumber: string
  subject: string
  message: string
}

export function validateContactData(data: unknown): data is ContactEmailData {
  if (!data || typeof data !== "object") return false
  const d = data as Record<string, unknown>
  return (
    typeof d.firstName === "string" &&
    d.firstName.trim().length > 0 &&
    typeof d.lastName === "string" &&
    d.lastName.trim().length > 0 &&
    typeof d.email === "string" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email) &&
    typeof d.subject === "string" &&
    d.subject.trim().length > 0 &&
    typeof d.message === "string" &&
    d.message.trim().length > 0
  )
}

export async function sendContactEmail(data: ContactEmailData) {
  try {
    const transporter = createTransporter()
    await transporter.verify()

    const mailOptions = {
      from: EMAIL_CONFIG.from,
      to: EMAIL_CONFIG.to,
      replyTo: data.email,
      subject: `${EMAIL_CONFIG.subject} - ${data.subject}`,
      html: createEmailTemplate(data),
      text: createTextTemplate(data),
    }

    const info = await transporter.sendMail(mailOptions)

    return {
      success: true as const,
      messageId: info.messageId,
      message: "Email envoyé avec succès",
    }
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email:", error)

    if (error instanceof Error) {
      if (error.message.includes("Invalid login")) {
        return {
          success: false as const,
          error: "Configuration SMTP invalide. Vérifiez votre mot de passe d'application Google.",
        }
      }
      if (error.message.includes("Connection timeout")) {
        return {
          success: false as const,
          error: "Timeout de connexion. Vérifiez votre connexion internet.",
        }
      }
      if (error.message.includes("Authentication failed")) {
        return {
          success: false as const,
          error: "Échec d'authentification. Vérifiez vos identifiants SMTP.",
        }
      }
      if (error.message.includes("GMAIL_USER") || error.message.includes("GMAIL_APP_PASSWORD")) {
        return {
          success: false as const,
          error: "Configuration email manquante. Configurez GMAIL_USER et GMAIL_APP_PASSWORD.",
        }
      }
    }

    return {
      success: false as const,
      error: "Erreur lors de l'envoi de l'email. Veuillez réessayer.",
    }
  }
}
