"use client"

import { useCallback, useEffect, useState } from "react"
import { Loader2 } from "lucide-react"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type AdminShellProps = {
  children: React.ReactNode
}

export function AdminShell({ children }: AdminShellProps) {
  const [authenticated, setAuthenticated] = useState(false)
  const [checkingAuth, setCheckingAuth] = useState(true)
  const [password, setPassword] = useState("")
  const [authError, setAuthError] = useState("")

  const checkAuth = useCallback(async () => {
    setCheckingAuth(true)
    try {
      const res = await fetch("/api/catalogue/admin/", {
        credentials: "same-origin",
        cache: "no-store",
      })
      const data = await res.json()
      setAuthenticated(Boolean(data.authenticated))
    } finally {
      setCheckingAuth(false)
    }
  }, [])

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setAuthError("")
    const res = await fetch("/api/catalogue/admin/", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "login", password }),
      credentials: "same-origin",
      cache: "no-store",
    })
    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      const message =
        res.status === 401
          ? "Mot de passe incorrect"
          : res.status === 503
            ? "Accès admin non configuré"
            : data.error || "Échec de la connexion"
      setAuthError(message)
      return
    }
    setPassword("")
    await checkAuth()
  }

  const logout = async () => {
    await fetch("/api/catalogue/admin/", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "logout" }),
      credentials: "same-origin",
      cache: "no-store",
    })
    setAuthenticated(false)
  }

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-[#0a1020] flex items-center justify-center text-gray-300">
        <Loader2 className="w-6 h-6 animate-spin mr-2 text-copper" /> Chargement...
      </div>
    )
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[#0a1020] flex items-center justify-center px-4 py-8">
        <form onSubmit={handleLogin} className="w-full max-w-md border border-white/10 rounded-xl p-6 sm:p-8 bg-[#0d1528] shadow-2xl">
          <p className="text-xs uppercase tracking-[0.2em] text-copper font-semibold mb-2">STRATELINK</p>
          <h1 className="text-xl sm:text-2xl font-bold text-white mb-2">Administration</h1>
          <p className="text-sm text-gray-400 mb-6">
            Connectez-vous pour gérer le catalogue et consulter les notifications des formulaires.
          </p>
          <label htmlFor="admin-password" className="block text-xs font-semibold text-gray-300 mb-2">
            Mot de passe
          </label>
          <Input
            id="admin-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Entrez votre mot de passe"
            autoComplete="current-password"
            className="mb-4 bg-[#0a1020] border-white/20 text-white text-base placeholder:text-gray-500"
          />
          {authError && <p className="text-sm text-red-400 mb-3">{authError}</p>}
          <Button type="submit" className="w-full h-11 bg-copper text-navy font-bold hover:bg-copper/90">
            Se connecter
          </Button>
        </form>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a1020] text-white flex flex-col lg:flex-row">
      <AdminSidebar onLogout={logout} />
      <main className="flex-1 min-w-0 min-h-screen">{children}</main>
    </div>
  )
}
