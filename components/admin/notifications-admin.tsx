"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { CheckCheck, ExternalLink, Loader2, Mail, RefreshCw, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { FormNotification, FormNotificationType } from "@/lib/form-notification-types"
import { cn } from "@/lib/utils"

const TYPE_LABELS: Record<FormNotificationType, string> = {
  contact: "Contact",
  qualification: "Qualification projet",
}

function formatDate(iso: string) {
  try {
    return new Intl.DateTimeFormat("fr-FR", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(iso))
  } catch {
    return iso
  }
}

export function NotificationsAdminPanel() {
  const [notifications, setNotifications] = useState<FormNotification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [filter, setFilter] = useState<"all" | FormNotificationType>("all")
  const [markingId, setMarkingId] = useState<string | null>(null)
  const [markingAll, setMarkingAll] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [deletingAll, setDeletingAll] = useState(false)

  const loadNotifications = useCallback(async (options?: { silent?: boolean }) => {
    if (!options?.silent) setLoading(true)
    setError("")
    try {
      const res = await fetch(`/api/admin/notifications/?_=${Date.now()}`, {
        credentials: "same-origin",
        cache: "no-store",
      })
      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Impossible de charger les notifications.")
        return
      }

      setNotifications(Array.isArray(data.notifications) ? data.notifications : [])
      setUnreadCount(typeof data.unreadCount === "number" ? data.unreadCount : 0)
    } catch {
      setError("Impossible de charger les notifications. Vérifiez votre connexion.")
    } finally {
      if (!options?.silent) setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadNotifications()
  }, [loadNotifications])

  const filtered = useMemo(() => {
    if (filter === "all") return notifications
    return notifications.filter((n) => n.type === filter)
  }, [notifications, filter])

  const markRead = async (id: string) => {
    setMarkingId(id)
    try {
      const res = await fetch("/api/admin/notifications/", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ action: "markRead", id }),
      })
      if (!res.ok) return
      setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
      const data = await res.json()
      setUnreadCount(typeof data.unreadCount === "number" ? data.unreadCount : 0)
    } finally {
      setMarkingId(null)
    }
  }

  const markAllRead = async () => {
    setMarkingAll(true)
    try {
      const res = await fetch("/api/admin/notifications/", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ action: "markAllRead" }),
      })
      if (!res.ok) return
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
      setUnreadCount(0)
    } finally {
      setMarkingAll(false)
    }
  }

  const deleteNotification = async (id: string) => {
    if (!window.confirm("Supprimer cette notification ? Cette action est irréversible.")) return

    setDeletingId(id)
    try {
      const res = await fetch("/api/admin/notifications/", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ action: "delete", id }),
      })
      if (!res.ok) return
      setNotifications((prev) => prev.filter((n) => n.id !== id))
      const data = await res.json()
      setUnreadCount(typeof data.unreadCount === "number" ? data.unreadCount : 0)
    } finally {
      setDeletingId(null)
    }
  }

  const deleteAll = async () => {
    if (!window.confirm("Supprimer toutes les notifications ? Cette action est irréversible.")) return

    setDeletingAll(true)
    try {
      const res = await fetch("/api/admin/notifications/", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ action: "deleteAll" }),
      })
      if (!res.ok) return
      setNotifications([])
      setUnreadCount(0)
    } finally {
      setDeletingAll(false)
    }
  }

  return (
    <div className="p-4 sm:p-6 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white">Notifications</h1>
          <p className="text-sm text-gray-400 mt-1">
            Soumissions des formulaires contact et qualification — vérifiez les emails avant de répondre.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadNotifications()}
            className="border-white/20 bg-white/5 text-gray-200 hover:bg-white/10"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Actualiser
          </Button>
          {unreadCount > 0 && (
            <Button
              type="button"
              size="sm"
              onClick={markAllRead}
              disabled={markingAll}
              className="bg-copper text-navy font-semibold hover:bg-copper/90"
            >
              {markingAll ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <CheckCheck className="w-4 h-4 mr-2" />
              )}
              Tout marquer lu ({unreadCount})
            </Button>
          )}
          {notifications.length > 0 && (
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={deleteAll}
              disabled={deletingAll}
              className="border-red-500/30 bg-red-500/10 text-red-300 hover:bg-red-500/20"
            >
              {deletingAll ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Trash2 className="w-4 h-4 mr-2" />
              )}
              Tout effacer
            </Button>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {(["all", "contact", "qualification"] as const).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setFilter(key)}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors",
              filter === key
                ? "bg-copper/20 border-copper/40 text-copper"
                : "border-white/15 text-gray-400 hover:text-white hover:border-white/30"
            )}
          >
            {key === "all" ? "Toutes" : TYPE_LABELS[key]}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16 text-gray-400">
          <Loader2 className="w-5 h-5 animate-spin mr-2 text-copper" />
          Chargement...
        </div>
      ) : error ? (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-xl border border-white/10 bg-[#0d1528] px-6 py-12 text-center">
          <Mail className="w-10 h-10 text-gray-500 mx-auto mb-3" />
          <p className="text-white font-medium">Aucune notification</p>
          <p className="text-sm text-gray-400 mt-1">
            Les soumissions de formulaire apparaîtront ici.
          </p>
        </div>
      ) : (
        <ul className="space-y-3">
          {filtered.map((notification) => (
            <li
              key={notification.id}
              className={cn(
                "rounded-xl border px-4 py-4 sm:px-5 sm:py-5 transition-colors",
                notification.read
                  ? "border-white/10 bg-[#0d1528]/60"
                  : "border-copper/30 bg-copper/5"
              )}
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span
                      className={cn(
                        "text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded",
                        notification.type === "contact"
                          ? "bg-blue-500/20 text-blue-300"
                          : "bg-emerald-500/20 text-emerald-300"
                      )}
                    >
                      {TYPE_LABELS[notification.type]}
                    </span>
                    {!notification.read && (
                      <span className="text-[10px] uppercase tracking-wider font-bold text-copper">
                        Nouveau
                      </span>
                    )}
                    <span className="text-xs text-gray-500">{formatDate(notification.createdAt)}</span>
                  </div>

                  <p className="text-base font-semibold text-white">
                    {notification.firstName} {notification.lastName}
                    {notification.company ? (
                      <span className="text-gray-400 font-normal"> — {notification.company}</span>
                    ) : null}
                  </p>

                  <div className="mt-2 flex flex-wrap items-center gap-3 text-sm">
                    <a
                      href={`mailto:${notification.email}`}
                      className="inline-flex items-center gap-1.5 text-copper hover:underline font-medium"
                    >
                      <Mail className="w-4 h-4" />
                      {notification.email}
                      <ExternalLink className="w-3 h-3 opacity-70" />
                    </a>
                    {notification.phone ? (
                      <span className="text-gray-400">{notification.phone}</span>
                    ) : null}
                    {notification.country ? (
                      <span className="text-gray-500">{notification.country}</span>
                    ) : null}
                  </div>

                  {notification.subject ? (
                    <p className="mt-2 text-sm text-gray-300">
                      <span className="text-gray-500">Sujet :</span> {notification.subject}
                    </p>
                  ) : null}

                  {notification.message ? (
                    <p className="mt-2 text-sm text-gray-400 whitespace-pre-wrap line-clamp-4">
                      {notification.message}
                    </p>
                  ) : null}
                </div>

                <div className="flex flex-col sm:items-end gap-2 shrink-0">
                  {!notification.read && (
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      disabled={markingId === notification.id}
                      onClick={() => markRead(notification.id)}
                      className="border-white/20 bg-white/5 text-gray-200 hover:bg-white/10"
                    >
                      {markingId === notification.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <>
                          <CheckCheck className="w-4 h-4 mr-2" />
                          Marquer lu
                        </>
                      )}
                    </Button>
                  )}
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    disabled={deletingId === notification.id}
                    onClick={() => deleteNotification(notification.id)}
                    className="border-red-500/30 bg-red-500/10 text-red-300 hover:bg-red-500/20"
                  >
                    {deletingId === notification.id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <Trash2 className="w-4 h-4 mr-2" />
                        Supprimer
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
