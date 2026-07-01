"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Loader2, Pencil, Plus, Trash2, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { CatalogueServiceImage } from "@/components/catalogue/catalogue-service-image"
import {
  CATALOGUE_MAX_IMAGE_BYTES,
  type CatalogueService,
  type CatalogueServiceInput,
} from "@/lib/catalogue-types"
import { cn } from "@/lib/utils"

const emptyForm: CatalogueServiceInput = {
  imageUrl: "",
  nameFr: "",
  nameEn: "",
  descriptionFr: "",
  descriptionEn: "",
  includesFr: ["", "", "", ""],
  includesEn: ["", "", "", ""],
  audienceFr: "",
  audienceEn: "",
  order: 1,
}

export function CatalogueAdminPanel() {
  const [services, setServices] = useState<CatalogueService[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<CatalogueService | null>(null)
  const [form, setForm] = useState<CatalogueServiceInput>(emptyForm)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [imageError, setImageError] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [loadError, setLoadError] = useState("")
  const [storageWarning, setStorageWarning] = useState("")

  const applyServices = (next: CatalogueService[]) => {
    setServices(next)
    setLoadError("")
  }

  const loadServices = useCallback(async (options?: { silent?: boolean }) => {
    if (!options?.silent) setLoading(true)
    try {
      const res = await fetch(`/api/catalogue/admin/?_=${Date.now()}`, {
        cache: "no-store",
        credentials: "same-origin",
      })
      const data = await res.json()

      if (!res.ok || !data.authenticated) {
        setLoadError(data.error || "Impossible de charger le catalogue. Reconnectez-vous si besoin.")
        return
      }

      applyServices(Array.isArray(data.services) ? data.services : [])
    } catch {
      setLoadError("Impossible de charger le catalogue. Vérifiez votre connexion.")
    } finally {
      if (!options?.silent) setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadServices()
    void fetch("/api/catalogue/upload/", { credentials: "same-origin", cache: "no-store" })
      .then(async (res) => {
        if (!res.ok) return
        const data = await res.json()
        if (data.supabaseConfigured && data.supabaseBucketOk === false) {
          setStorageWarning(
            data.supabaseBucketMessage ||
              "Bucket Supabase catalogue-images inaccessible. Vérifiez Storage et le SQL catalogue-setup.sql."
          )
        } else if (data.serverless && !data.supabaseConfigured && !data.netlifyBlobs) {
          setStorageWarning(
            "Stockage images non configuré en production. Ajoutez SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY sur Netlify, puis redéployez."
          )
        }
      })
      .catch(() => undefined)
  }, [loadServices])

  const openCreate = () => {
    setEditing(null)
    setImageError("")
    setForm({ ...emptyForm, order: services.length + 1 })
    setDialogOpen(true)
  }

  const openEdit = (service: CatalogueService) => {
    setEditing(service)
    setImageError("")
    setForm({
      imageUrl: service.imageUrl,
      nameFr: service.nameFr,
      nameEn: service.nameEn,
      descriptionFr: service.descriptionFr,
      descriptionEn: service.descriptionEn,
      includesFr: [...service.includesFr, "", "", ""].slice(0, 4),
      includesEn: [...service.includesEn, "", "", ""].slice(0, 4),
      audienceFr: service.audienceFr,
      audienceEn: service.audienceEn,
      order: service.order,
    })
    setDialogOpen(true)
  }

  const updateInclude = (
    lang: "includesFr" | "includesEn",
    index: number,
    value: string
  ) => {
    setForm((prev) => {
      const next = [...prev[lang]]
      next[index] = value
      return { ...prev, [lang]: next }
    })
  }

  const handleImageUpload = async (file: File) => {
    setUploadingImage(true)
    setImageError("")
    try {
      if (file.size > CATALOGUE_MAX_IMAGE_BYTES) {
        setImageError("Image trop volumineuse (max 5 Mo)")
        return
      }

      const body = new FormData()
      body.append("file", file)
      const res = await fetch("/api/catalogue/upload/", {
        method: "POST",
        body,
        credentials: "same-origin",
        cache: "no-store",
      })

      const contentType = res.headers.get("content-type") || ""
      if (!contentType.includes("application/json")) {
        setImageError("Le serveur a refusé l'image. Réessayez avec JPG, PNG ou WEBP (max 5 Mo).")
        return
      }

      const data = await res.json()
      if (!res.ok) {
        setImageError(data.error || "Impossible d'envoyer l'image")
        return
      }
      setForm((prev) => ({ ...prev, imageUrl: data.url }))
    } catch {
      setImageError("Impossible d'envoyer l'image")
    } finally {
      setUploadingImage(false)
      if (fileInputRef.current) fileInputRef.current.value = ""
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.imageUrl.trim()) {
      setError("Ajoutez une image pour ce service")
      return
    }
    setSaving(true)
    setError("")
    try {
      const payload = { ...form, id: editing?.id }
      const res = await fetch("/api/catalogue/admin/", {
        method: editing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "same-origin",
        cache: "no-store",
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || "Save failed")
        return
      }
      setDialogOpen(false)
      if (Array.isArray(data.services)) {
        applyServices(data.services)
      } else {
        await loadServices({ silent: true })
      }
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer ce service ?")) return
    setError("")
    try {
      const res = await fetch(`/api/catalogue/${id}/`, {
        method: "DELETE",
        credentials: "same-origin",
        cache: "no-store",
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || "Impossible de supprimer ce service")
        return
      }
      if (Array.isArray(data.services)) {
        applyServices(data.services)
      } else {
        await loadServices({ silent: true })
      }
    } catch {
      setError("Impossible de supprimer ce service")
    }
  }

  const previewName = form.nameFr || form.nameEn || "Aperçu"

  return (
    <>
      <main className="max-w-6xl mx-auto px-3 sm:px-6 py-4 sm:py-8 pb-10">
        <div className="mb-5 sm:mb-6 flex flex-col gap-4">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white">Services catalogue</h2>
            <p className="text-sm text-gray-400 mt-1">
              Ajouter, modifier ou supprimer les services affichés sur la page Catalogue.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <p className="text-sm font-semibold text-copper">
              {services.length} service{services.length !== 1 ? "s" : ""}
            </p>
            <Button onClick={openCreate} className="h-11 w-full sm:w-auto bg-copper text-navy font-bold hover:bg-copper/90">
              <Plus className="w-4 h-4 mr-2" />
              Nouveau service
            </Button>
          </div>
          {loadError && (
            <p className="text-sm text-amber-300 bg-amber-500/10 border border-amber-500/30 rounded-lg px-4 py-3">
              {loadError}
            </p>
          )}
          {storageWarning && (
            <p className="text-sm text-amber-300 bg-amber-500/10 border border-amber-500/30 rounded-lg px-4 py-3">
              {storageWarning}
            </p>
          )}
          {error && (
            <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3">
              {error}
            </p>
          )}
        </div>

        {loading ? (
          <div className="flex items-center gap-2 text-gray-400 py-12">
            <Loader2 className="w-5 h-5 animate-spin text-copper" />
            Chargement des services...
          </div>
        ) : services.length === 0 ? (
          <div className="border border-dashed border-white/20 rounded-xl p-6 sm:p-12 text-center">
            <p className="text-gray-400 mb-4">Aucun service dans le catalogue.</p>
            <Button onClick={openCreate} className="bg-copper text-navy font-bold hover:bg-copper/90">
              <Plus className="w-4 h-4 mr-2" /> Créer le premier service
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {services.map((service) => (
              <article
                key={service.id}
                className="border border-white/10 rounded-xl p-4 bg-[#0d1528] hover:border-copper/30 transition-colors"
              >
                <div className="flex items-start gap-3 min-w-0 mb-4">
                  <CatalogueServiceImage
                    src={service.imageUrl}
                    alt={service.nameFr}
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-white text-base leading-snug">{service.nameFr}</p>
                    <p className="text-sm text-gray-400 mt-0.5">{service.nameEn}</p>
                    <p className="text-xs text-gray-500 mt-2 line-clamp-2">
                      {service.descriptionFr}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 sm:flex sm:justify-end sm:gap-2">
                  <button
                    type="button"
                    onClick={() => openEdit(service)}
                    className="h-11 px-3 rounded-md border border-copper bg-copper/15 text-copper font-semibold text-sm hover:bg-copper/25 transition-colors inline-flex items-center justify-center gap-2"
                  >
                    <Pencil className="w-4 h-4 shrink-0" />
                    <span>Modifier</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(service.id)}
                    className="h-11 px-3 rounded-md border border-red-500/70 bg-red-500/15 text-red-300 font-semibold text-sm hover:bg-red-500/25 transition-colors inline-flex items-center justify-center gap-2"
                  >
                    <Trash2 className="w-4 h-4 shrink-0" />
                    <span>Supprimer</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent
          className={cn(
            "w-full max-w-2xl flex flex-col overflow-hidden bg-navy border-white/15 text-white p-0 gap-0",
            "max-sm:fixed max-sm:inset-0 max-sm:left-0 max-sm:top-0 max-sm:translate-x-0 max-sm:translate-y-0",
            "max-sm:max-w-none max-sm:max-h-none max-sm:h-[100dvh] max-sm:rounded-none max-sm:border-0",
            "sm:max-h-[90vh] sm:rounded-lg",
            "[&>button]:text-gray-300 [&>button]:border [&>button]:border-white/20 [&>button]:rounded-sm",
            "[&>button]:p-1.5 [&>button]:top-3 [&>button]:right-3 sm:[&>button]:top-4 sm:[&>button]:right-4 [&>button]:opacity-100"
          )}
        >
          <DialogHeader className="shrink-0 px-4 sm:px-6 pt-5 sm:pt-6 pb-4 pr-12 border-b border-white/10">
            <DialogTitle className="text-base sm:text-lg">{editing ? "Modifier le service" : "Nouveau service"}</DialogTitle>
          </DialogHeader>

          <div className="flex-1 min-h-0 overflow-y-auto scrollbar-form px-4 sm:px-6 py-4">
          <form onSubmit={handleSave} className="space-y-4 pb-2">
            <div className="p-4 border border-white/10 rounded-xl space-y-4">
              <label className="text-xs text-copper uppercase tracking-wider font-semibold">
                Image du service
              </label>

              <CatalogueServiceImage
                src={form.imageUrl}
                alt={previewName}
                className="w-full h-44 rounded-lg"
              />

              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp,image/gif,.jpg,.jpeg,.png,.webp,.gif"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) void handleImageUpload(file)
                  }}
                />
                <button
                  type="button"
                  disabled={uploadingImage}
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full h-10 sm:h-auto sm:w-auto px-4 rounded-md border border-copper bg-copper/15 text-copper font-semibold text-sm hover:bg-copper/25 transition-colors inline-flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {uploadingImage ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Envoi...
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4" />
                      Choisir une image
                    </>
                  )}
                </button>
              </div>

              <div>
                <label className="text-xs text-gray-400 mb-2 block">Ou coller une URL d&apos;image</label>
                <Input
                  value={form.imageUrl}
                  onChange={(e) => {
                    setImageError("")
                    setForm((p) => ({ ...p, imageUrl: e.target.value }))
                  }}
                  placeholder="https://... ou /api/catalogue/media/..."
                  className="bg-[#0d1528] border-white/15 text-white text-base"
                />
                <p className="text-xs text-gray-500 mt-2">JPG, PNG, WEBP ou GIF — max 5 Mo</p>
              </div>

              {imageError && <p className="text-sm text-red-400">{imageError}</p>}
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-400">Nom (FR)</label>
                <Input value={form.nameFr} onChange={(e) => setForm((p) => ({ ...p, nameFr: e.target.value }))} className="bg-[#0d1528] border-white/15 text-white text-base" required />
              </div>
              <div>
                <label className="text-xs text-gray-400">Name (EN)</label>
                <Input value={form.nameEn} onChange={(e) => setForm((p) => ({ ...p, nameEn: e.target.value }))} className="bg-[#0d1528] border-white/15 text-white text-base" required />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-400">Description (FR) — 2 lignes max</label>
                <Textarea value={form.descriptionFr} onChange={(e) => setForm((p) => ({ ...p, descriptionFr: e.target.value }))} rows={2} className="bg-[#0d1528] border-white/15 text-white text-base resize-none" required />
              </div>
              <div>
                <label className="text-xs text-gray-400">Description (EN)</label>
                <Textarea value={form.descriptionEn} onChange={(e) => setForm((p) => ({ ...p, descriptionEn: e.target.value }))} rows={2} className="bg-[#0d1528] border-white/15 text-white text-base resize-none" required />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-copper uppercase tracking-wider">Inclus (FR)</label>
                <div className="space-y-2 mt-2">
                  {form.includesFr.map((item, i) => (
                    <Input key={`fr-${i}`} value={item} onChange={(e) => updateInclude("includesFr", i, e.target.value)} placeholder={`Point ${i + 1}`} className="bg-[#0d1528] border-white/15 text-white text-base" />
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs text-copper uppercase tracking-wider">Included (EN)</label>
                <div className="space-y-2 mt-2">
                  {form.includesEn.map((item, i) => (
                    <Input key={`en-${i}`} value={item} onChange={(e) => updateInclude("includesEn", i, e.target.value)} placeholder={`Item ${i + 1}`} className="bg-[#0d1528] border-white/15 text-white text-base" />
                  ))}
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-400">Pour qui (FR)</label>
                <Input value={form.audienceFr} onChange={(e) => setForm((p) => ({ ...p, audienceFr: e.target.value }))} className="bg-[#0d1528] border-white/15 text-white text-base" required />
              </div>
              <div>
                <label className="text-xs text-gray-400">Audience (EN)</label>
                <Input value={form.audienceEn} onChange={(e) => setForm((p) => ({ ...p, audienceEn: e.target.value }))} className="bg-[#0d1528] border-white/15 text-white text-base" required />
              </div>
            </div>

            <div>
              <label className="text-xs text-gray-400">Ordre d&apos;affichage</label>
              <Input type="number" min={1} value={form.order} onChange={(e) => setForm((p) => ({ ...p, order: Number(e.target.value) }))} className="bg-[#0d1528] border-white/15 text-white text-base w-full sm:w-32" />
            </div>

            {error && <p className="text-sm text-red-400">{error}</p>}

            <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 sm:gap-3 pt-4 pb-2">
              <button
                type="button"
                onClick={() => setDialogOpen(false)}
                className="h-11 w-full sm:w-auto px-5 rounded-md border border-white/25 bg-white/5 text-gray-200 font-semibold text-sm hover:bg-white/10 transition-colors"
              >
                Annuler
              </button>
              <Button type="submit" disabled={saving} className="h-11 w-full sm:w-auto px-6 bg-copper text-navy font-bold hover:bg-copper/90">
                {saving ? "Enregistrement..." : "Enregistrer"}
              </Button>
            </div>
          </form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
