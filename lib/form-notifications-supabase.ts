import type { CreateFormNotificationInput, FormNotification } from "@/lib/form-notification-types"
import { getSupabaseAdmin } from "@/lib/supabase-admin"

const TABLE = "form_notifications"

type NotificationRow = {
  id: string
  type: "contact" | "qualification"
  first_name: string
  last_name: string
  email: string
  company: string
  phone: string
  country: string
  subject: string
  message: string
  payload: Record<string, unknown> | null
  read: boolean
  created_at: string
}

function rowToNotification(row: NotificationRow): FormNotification {
  return {
    id: row.id,
    type: row.type,
    firstName: row.first_name,
    lastName: row.last_name,
    email: row.email,
    company: row.company,
    phone: row.phone,
    country: row.country,
    subject: row.subject,
    message: row.message,
    payload: row.payload,
    read: row.read,
    createdAt: row.created_at,
  }
}

function inputToRow(input: CreateFormNotificationInput): Omit<NotificationRow, "id" | "read" | "created_at"> {
  return {
    type: input.type,
    first_name: input.firstName,
    last_name: input.lastName,
    email: input.email,
    company: input.company || "",
    phone: input.phone || "",
    country: input.country || "",
    subject: input.subject || "",
    message: input.message || "",
    payload: input.payload ?? null,
  }
}

export async function createFormNotificationInSupabase(input: CreateFormNotificationInput): Promise<FormNotification> {
  const supabase = getSupabaseAdmin()
  const { data, error } = await supabase
    .from(TABLE)
    .insert(inputToRow(input))
    .select("*")
    .single()

  if (error) {
    console.error("[form-notifications-supabase] insert failed", error)
    throw error
  }

  return rowToNotification(data as NotificationRow)
}

export async function listFormNotificationsFromSupabase(): Promise<FormNotification[]> {
  const supabase = getSupabaseAdmin()
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("[form-notifications-supabase] list failed", error)
    throw error
  }

  return ((data || []) as NotificationRow[]).map(rowToNotification)
}

export async function countUnreadFormNotificationsInSupabase(): Promise<number> {
  const supabase = getSupabaseAdmin()
  const { count, error } = await supabase
    .from(TABLE)
    .select("*", { count: "exact", head: true })
    .eq("read", false)

  if (error) {
    console.error("[form-notifications-supabase] count failed", error)
    throw error
  }

  return count ?? 0
}

export async function markFormNotificationReadInSupabase(id: string): Promise<void> {
  const supabase = getSupabaseAdmin()
  const { error } = await supabase.from(TABLE).update({ read: true }).eq("id", id)

  if (error) {
    console.error("[form-notifications-supabase] mark read failed", error)
    throw error
  }
}

export async function markAllFormNotificationsReadInSupabase(): Promise<void> {
  const supabase = getSupabaseAdmin()
  const { error } = await supabase.from(TABLE).update({ read: true }).eq("read", false)

  if (error) {
    console.error("[form-notifications-supabase] mark all read failed", error)
    throw error
  }
}
