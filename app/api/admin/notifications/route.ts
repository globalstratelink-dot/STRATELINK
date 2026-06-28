import { NextRequest, NextResponse } from "next/server"
import {
  adminApiResponseHeaders,
  isAdminAuthenticated,
} from "@/lib/catalogue-auth"
import {
  countUnreadFormNotifications,
  listFormNotifications,
  markAllFormNotificationsRead,
  markFormNotificationRead,
} from "@/lib/form-notifications-store"

export const dynamic = "force-dynamic"
export const revalidate = 0

const ADMIN_HEADERS = adminApiResponseHeaders()

function unauthorizedResponse() {
  return NextResponse.json(
    { error: "Session expirée. Reconnectez-vous." },
    { status: 401, headers: ADMIN_HEADERS }
  )
}

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return unauthorizedResponse()
  }

  try {
    const [notifications, unreadCount] = await Promise.all([
      listFormNotifications(),
      countUnreadFormNotifications(),
    ])

    return NextResponse.json(
      { notifications, unreadCount },
      { headers: ADMIN_HEADERS }
    )
  } catch {
    return NextResponse.json(
      { error: "Impossible de charger les notifications." },
      { status: 500, headers: ADMIN_HEADERS }
    )
  }
}

export async function PATCH(request: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return unauthorizedResponse()
  }

  const body = await request.json().catch(() => null)

  try {
    if (body?.action === "markRead" && body.id) {
      await markFormNotificationRead(String(body.id))
      const unreadCount = await countUnreadFormNotifications()
      return NextResponse.json({ success: true, unreadCount }, { headers: ADMIN_HEADERS })
    }

    if (body?.action === "markAllRead") {
      await markAllFormNotificationsRead()
      return NextResponse.json({ success: true, unreadCount: 0 }, { headers: ADMIN_HEADERS })
    }

    return NextResponse.json({ error: "Action invalide" }, { status: 400, headers: ADMIN_HEADERS })
  } catch {
    return NextResponse.json(
      { error: "Impossible de mettre à jour la notification." },
      { status: 500, headers: ADMIN_HEADERS }
    )
  }
}
