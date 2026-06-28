export type FormNotificationType = "contact" | "qualification"

export type FormNotification = {
  id: string
  type: FormNotificationType
  firstName: string
  lastName: string
  email: string
  company: string
  phone: string
  country: string
  subject: string
  message: string
  payload: Record<string, unknown> | null
  read: boolean
  createdAt: string
}

export type CreateFormNotificationInput = {
  type: FormNotificationType
  firstName: string
  lastName: string
  email: string
  company?: string
  phone?: string
  country?: string
  subject?: string
  message?: string
  payload?: Record<string, unknown> | null
}
