import { NotificationsAdminPanel } from "@/components/admin/notifications-admin"
import { NOINDEX_METADATA } from "@/lib/seo"

export const metadata = {
  title: "Admin Notifications",
  ...NOINDEX_METADATA,
}

export default function AdminNotificationsPage() {
  return <NotificationsAdminPanel />
}
