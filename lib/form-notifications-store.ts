import { promises as fs } from "fs"
import path from "path"
import { randomUUID } from "crypto"
import type { CreateFormNotificationInput, FormNotification } from "@/lib/form-notification-types"
import { isSupabaseConfigured } from "@/lib/supabase-admin"
import {
  countUnreadFormNotificationsInSupabase,
  createFormNotificationInSupabase,
  listFormNotificationsFromSupabase,
  markAllFormNotificationsReadInSupabase,
  markFormNotificationReadInSupabase,
  deleteFormNotificationInSupabase,
  deleteAllFormNotificationsInSupabase,
} from "@/lib/form-notifications-supabase"

const DATA_DIR = path.join(process.cwd(), "data")
const DATA_FILE = path.join(DATA_DIR, "form-notifications.json")

export class FormNotificationPersistenceError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "FormNotificationPersistenceError"
  }
}

async function readFromFile(): Promise<FormNotification[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf8")
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

async function writeToFile(notifications: FormNotification[]) {
  await fs.mkdir(DATA_DIR, { recursive: true })
  await fs.writeFile(DATA_FILE, JSON.stringify(notifications, null, 2), "utf8")
}

export function isFormNotificationsConfigured() {
  return isSupabaseConfigured()
}

export async function createFormNotification(input: CreateFormNotificationInput): Promise<FormNotification | null> {
  try {
    if (isSupabaseConfigured()) {
      return await createFormNotificationInSupabase(input)
    }

    const notifications = await readFromFile()
    const notification: FormNotification = {
      id: randomUUID(),
      type: input.type,
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
      company: input.company || "",
      phone: input.phone || "",
      country: input.country || "",
      subject: input.subject || "",
      message: input.message || "",
      payload: input.payload ?? null,
      read: false,
      createdAt: new Date().toISOString(),
    }
    notifications.unshift(notification)
    await writeToFile(notifications)
    return notification
  } catch (error) {
    console.error("[form-notifications-store] create failed", error)
    return null
  }
}

export async function listFormNotifications(): Promise<FormNotification[]> {
  if (isSupabaseConfigured()) {
    return listFormNotificationsFromSupabase()
  }
  return readFromFile()
}

export async function countUnreadFormNotifications(): Promise<number> {
  if (isSupabaseConfigured()) {
    return countUnreadFormNotificationsInSupabase()
  }
  const notifications = await readFromFile()
  return notifications.filter((n) => !n.read).length
}

export async function markFormNotificationRead(id: string): Promise<void> {
  if (isSupabaseConfigured()) {
    await markFormNotificationReadInSupabase(id)
    return
  }

  const notifications = await readFromFile()
  const next = notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
  await writeToFile(next)
}

export async function markAllFormNotificationsRead(): Promise<void> {
  if (isSupabaseConfigured()) {
    await markAllFormNotificationsReadInSupabase()
    return
  }

  const notifications = await readFromFile()
  const next = notifications.map((n) => ({ ...n, read: true }))
  await writeToFile(next)
}

export async function deleteFormNotification(id: string): Promise<void> {
  if (isSupabaseConfigured()) {
    await deleteFormNotificationInSupabase(id)
    return
  }

  const notifications = await readFromFile()
  await writeToFile(notifications.filter((n) => n.id !== id))
}

export async function deleteAllFormNotifications(): Promise<void> {
  if (isSupabaseConfigured()) {
    await deleteAllFormNotificationsInSupabase()
    return
  }

  await writeToFile([])
}
