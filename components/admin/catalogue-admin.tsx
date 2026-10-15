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
  type CatalogueService,
  type CatalogueServiceInput,
} from "@/lib/catalogue-types"
import { cn } from "@/lib/utils"

const emptyForm: CatalogueServiceInput = {
  imageUrl: "",
  imageUrls: [],
  videoUrl: "",
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
  const videoInputRef = useRef<HTMLInputElement>(null)

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
      imageUrl: service.imageUrls?.[0] || service.imageUrl,
      imageUrls: service.imageUrls?.length ? service.imageUrls : service.imageUrl ? [service.imageUrl] : [],
      videoUrl: service.videoUrl || "",
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

  const uploadCatalogueFile = async (file: File) => {
    const signRes = await fetch("/api/catalogue/upload/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
      cache: "no-store",
      body: JSON.stringify({
        action: "sign",
        filename: file.name,
        contentType: file.type,
      }),
    })
    const signType = signRes.headers.get("content-type") || ""
    const signData = signType.includes("application/json") ? await signRes.json() : null

    if (!signRes.ok) {
      throw new Error(signData?.error || "Impossible de préparer l'envoi")
    }

    if (signData?.signedUrl && signData?.publicUrl) {
      const body = new FormData()
      body.append("cacheControl", "31536000")
      body.append("", file)
      const put = await fetch(signData.signedUrl, { method: "PUT", body })
      if (!put.ok) {
        const detail = (await put.text()).slice(0, 180)
        throw new Error(detail || "Impossible d'envoyer le fichier")
      }
      return signData.publicUrl as string
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
      throw new Error("Le serveur a refusé le fichier.")
    }
    const data = await res.json()
    if (!res.ok) throw new Error(data.error || "Impossible d'envoyer le fichier")
    return data.url as string
  }

  const handleImageUpload = async (files: File[]) => {
    if (!files.length) return
    setUploadingImage(true)
    setImageError("")
    try {
      const uploaded: string[] = []
      for (const file of files) {
        uploaded.push(await uploadCatalogueFile(file))
      }
      setForm((prev) => {
        const imageUrls = [...prev.imageUrls, ...uploaded]
        return { ...prev, imageUrls, imageUrl: imageUrls[0] || "" }
      })
    } catch (error) {
      setImageError(error instanceof Error ? error.message : "Impossible d'envoyer l'image")
    } finally {
      setUploadingImage(false)
      if (fileInputRef.current) fileInputRef.current.value = ""
    }
  }

  const handleVideoUpload = async (file: File) => {
    setUploadingImage(true)
    setImageError("")
    try {
      const url = await uploadCatalogueFile(file)
      setForm((prev) => ({ ...prev, videoUrl: url }))
    } catch (error) {
      setImageError(error instanceof Error ? error.message : "Impossible d'envoyer la vidéo")
    } finally {
      setUploadingImage(false)
      if (videoInputRef.current) videoInputRef.current.value = ""
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.imageUrls.length && !form.imageUrl.trim()) {
      setError("Ajoutez au moins une image pour ce service")
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
                    src={service.imageUrls?.[0] || service.imageUrl}
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
                Images du service
              </label>

              {form.imageUrls.length > 0 ? (
                <div className="grid grid-cols-3 gap-2">
                  {form.imageUrls.map((url, index) => (
                    <div key={`${url}-${index}`} className="relative">
                      <CatalogueServiceImage src={url} alt={`${previewName} ${index + 1}`} className="w-full h-24 rounded-lg" />
                      <button
                        type="button"
                        onClick={() =>
                          setForm((prev) => {
                            const imageUrls = prev.imageUrls.filter((_, i) => i !== index)
                            return { ...prev, imageUrls, imageUrl: imageUrls[0] || "" }
                          })
                        }
                        className="absolute top-1 right-1 h-6 w-6 rounded-full bg-black/70 text-white text-xs"
                        aria-label="Retirer cette image"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <CatalogueServiceImage src="" alt={previewName} className="w-full h-44 rounded-lg" />
              )}

              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp,image/gif,.jpg,.jpeg,.png,.webp,.gif"
                  multiple
                  className="hidden"
                  onChange={(e) => {
                    const files = Array.from(e.target.files || [])
                    if (files.length) void handleImageUpload(files)
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
                      Ajouter des images
                    </>
                  )}
                </button>
              </div>
              <p className="text-xs text-gray-500">JPG, PNG, WEBP ou GIF. Plusieurs images, sans limite de taille.</p>
            </div>

            <div className="p-4 border border-white/10 rounded-xl space-y-4">
              <label className="text-xs text-copper uppercase tracking-wider font-semibold">
                Vidéo du service
              </label>
              {form.videoUrl ? (
                <video src={form.videoUrl} controls playsInline className="w-full max-h-48 rounded-lg bg-black" />
              ) : (
                <p className="text-sm text-gray-500">Aucune vidéo.</p>
              )}
              <input
                ref={videoInputRef}
                type="file"
                accept="video/mp4,video/webm,video/quicktime,.mp4,.webm,.mov,.m4v"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) void handleVideoUpload(file)
                }}
              />
              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  type="button"
                  disabled={uploadingImage}
                  onClick={() => videoInputRef.current?.click()}
                  className="w-full h-10 sm:h-auto sm:w-auto px-4 rounded-md border border-copper bg-copper/15 text-copper font-semibold text-sm hover:bg-copper/25 transition-colors inline-flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Upload className="w-4 h-4" />
                  {form.videoUrl ? "Remplacer la vidéo" : "Ajouter une vidéo"}
                </button>
                {form.videoUrl ? (
                  <button
                    type="button"
                    onClick={() => setForm((prev) => ({ ...prev, videoUrl: "" }))}
                    className="h-10 px-4 rounded-md border border-white/20 text-sm text-gray-300"
                  >
                    Retirer
                  </button>
                ) : null}
              </div>
              <p className="text-xs text-gray-500">MP4, WEBM ou MOV. Sans limite de taille.</p>
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
