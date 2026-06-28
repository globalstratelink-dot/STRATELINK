"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { Bell, LayoutGrid, LogOut, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

type AdminSidebarProps = {
  onLogout: () => void
}

const NAV_ITEMS = [
  { href: "/adminAbdelhamid", label: "Catalogue", icon: LayoutGrid, exact: true },
  { href: "/adminAbdelhamid/notifications", label: "Notifications", icon: Bell, exact: false },
] as const

export function AdminSidebar({ onLogout }: AdminSidebarProps) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)

  const loadUnreadCount = useCallback(async () => {
    try {
      const res = await fetch(`/api/admin/notifications/?_=${Date.now()}`, {
        credentials: "same-origin",
        cache: "no-store",
      })
      if (!res.ok) return
      const data = await res.json()
      setUnreadCount(typeof data.unreadCount === "number" ? data.unreadCount : 0)
    } catch {
      // ignore
    }
  }, [])

  useEffect(() => {
    loadUnreadCount()
    const interval = setInterval(loadUnreadCount, 60_000)
    return () => clearInterval(interval)
  }, [loadUnreadCount, pathname])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  const isActive = (href: string, exact: boolean) => {
    if (exact) return pathname === href
    return pathname.startsWith(href)
  }

  const navContent = (
    <>
      <div className="px-4 py-5 border-b border-white/10">
        <p className="text-[10px] uppercase tracking-[0.2em] text-copper font-semibold">STRATELINK</p>
        <h2 className="text-sm font-bold text-white mt-1">Administration</h2>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV_ITEMS.map(({ href, label, icon: Icon, exact }) => {
          const active = isActive(href, exact)
          const showBadge = href.includes("notifications") && unreadCount > 0

          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-copper/20 text-copper border border-copper/30"
                  : "text-gray-300 hover:bg-white/5 hover:text-white border border-transparent"
              )}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span className="flex-1">{label}</span>
              {showBadge && (
                <span className="min-w-[1.25rem] h-5 px-1.5 rounded-full bg-copper text-navy text-[11px] font-bold flex items-center justify-center">
                  {unreadCount > 99 ? "99+" : unreadCount}
                </span>
              )}
            </Link>
          )
        })}
      </nav>

      <div className="px-3 py-4 border-t border-white/10">
        <button
          type="button"
          onClick={onLogout}
          className="w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Déconnexion
        </button>
      </div>
    </>
  )

  return (
    <>
      <div className="lg:hidden sticky top-0 z-40 border-b border-white/10 bg-[#0d1528] px-3 py-3 flex items-center justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-copper font-semibold">STRATELINK</p>
          <p className="text-sm font-bold text-white">Administration</p>
        </div>
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          className="h-10 w-10 rounded-md border border-white/20 bg-white/5 flex items-center justify-center text-white"
          aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black/60"
          onClick={() => setMobileOpen(false)}
          aria-hidden
        />
      )}

      <aside
        className={cn(
          "fixed lg:sticky top-0 z-50 lg:z-30 h-full lg:h-screen w-64 shrink-0 bg-[#0d1528] border-r border-white/10 flex flex-col transition-transform duration-200",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {navContent}
      </aside>
    </>
  )
}
