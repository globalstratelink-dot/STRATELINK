import type { CatalogueService } from "@/lib/catalogue-types"
import { getSupabaseAdmin, supabaseFetch, supabaseProjectUrl } from "@/lib/supabase-admin"

const TABLE = "catalogue_services"
const BUCKET = "catalogue-images"

type CatalogueRow = {
  id: string
  image_url: string
  name_fr: string
  name_en: string
  description_fr: string
  description_en: string
  includes_fr: string[]
  includes_en: string[]
  audience_fr: string
  audience_en: string
  order_index: number
  created_at: string
  updated_at: string
}

function rowToService(row: CatalogueRow): CatalogueService {
  return {
    id: row.id,
    imageUrl: row.image_url,
    nameFr: row.name_fr,
    nameEn: row.name_en,
    descriptionFr: row.description_fr,
    descriptionEn: row.description_en,
    includesFr: row.includes_fr || [],
    includesEn: row.includes_en || [],
    audienceFr: row.audience_fr,
    audienceEn: row.audience_en,
    order: row.order_index,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

function serviceToRow(service: CatalogueService): CatalogueRow {
  return {
    id: service.id,
    image_url: service.imageUrl,
    name_fr: service.nameFr,
    name_en: service.nameEn,
    description_fr: service.descriptionFr,
    description_en: service.descriptionEn,
    includes_fr: service.includesFr,
    includes_en: service.includesEn,
    audience_fr: service.audienceFr,
    audience_en: service.audienceEn,
    order_index: service.order,
    created_at: service.createdAt,
    updated_at: service.updatedAt,
  }
}

export async function readCatalogueFromSupabase(): Promise<CatalogueService[]> {
  const supabase = getSupabaseAdmin()
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .order("order_index", { ascending: true })

  if (error) {
    console.error("[catalogue-supabase] read failed", error)
    throw error
  }

  if (!data || data.length === 0) return []

  return (data as CatalogueRow[]).map(rowToService)
}

export async function insertCatalogueServiceInSupabase(service: CatalogueService) {
  const supabase = getSupabaseAdmin()
  const { error } = await supabase.from(TABLE).insert(serviceToRow(service))
  if (error) {
    console.error("[catalogue-supabase] insert failed", error)
    throw error
  }
}

export async function updateCatalogueServiceInSupabase(service: CatalogueService) {
  const supabase = getSupabaseAdmin()
  const { data, error } = await supabase
    .from(TABLE)
    .update(serviceToRow(service))
    .eq("id", service.id)
    .select("id")

  if (error) {
    console.error("[catalogue-supabase] update failed", error)
    throw error
  }

  if (!data || data.length === 0) {
    throw new Error("Service introuvable en base")
  }
}

export async function deleteCatalogueServiceFromSupabase(id: string) {
  const supabase = getSupabaseAdmin()
  const { data, error } = await supabase.from(TABLE).delete().eq("id", id).select("id")

  if (error) {
    console.error("[catalogue-supabase] delete failed", error)
    throw error
  }

  if (!data || data.length === 0) {
    throw new Error("Service introuvable en base")
  }
}

/** Bulk replace — local dev / Netlify Blobs only; avoid on Supabase when possible. */
export async function saveCatalogueToSupabase(services: CatalogueService[]) {
  const supabase = getSupabaseAdmin()

  if (services.length === 0) {
    const { data: existing, error: listError } = await supabase.from(TABLE).select("id")
    if (listError) {
      console.error("[catalogue-supabase] list for clear failed", listError)
      throw listError
    }

    const ids = (existing || []).map((row) => row.id)
    if (ids.length === 0) return

    const { error } = await supabase.from(TABLE).delete().in("id", ids)
    if (error) {
      console.error("[catalogue-supabase] clear failed", error)
      throw error
    }
    return
  }

  const rows = services.map(serviceToRow)
  const { error: upsertError } = await supabase.from(TABLE).upsert(rows, { onConflict: "id" })
  if (upsertError) {
    console.error("[catalogue-supabase] upsert failed", upsertError)
    throw upsertError
  }

  const keepIds = services.map((s) => s.id)
  const { data: existing, error: listError } = await supabase.from(TABLE).select("id")
  if (listError) {
    console.error("[catalogue-supabase] list for prune failed", listError)
    throw listError
  }

  const staleIds = (existing || []).map((row) => row.id).filter((id) => !keepIds.includes(id))
  if (staleIds.length === 0) return

  const { error: pruneError } = await supabase.from(TABLE).delete().in("id", staleIds)
  if (pruneError) {
    console.error("[catalogue-supabase] prune failed", pruneError)
    throw pruneError
  }
}

export async function uploadCatalogueImageToSupabase(
  filename: string,
  buffer: Buffer,
  contentType: string
) {
  const supabase = getSupabaseAdmin()
  const { error } = await supabase.storage.from(BUCKET).upload(filename, buffer, {
    contentType,
    upsert: true,
    cacheControl: "31536000",
  })

  if (error) {
    console.error("[catalogue-supabase] image upload failed", error)
    throw new Error(error.message)
  }

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(filename)
  return data.publicUrl
}

function storageErrorDetail(error: unknown) {
  if (!(error instanceof Error)) return "Impossible de joindre le stockage images"
  const cause = "cause" in error && error.cause instanceof Error ? error.cause.message : ""
  if (error.message === "fetch failed") {
    return cause
      ? `Stockage images injoignable : ${cause}`
      : "Stockage images injoignable. Vérifiez SUPABASE_URL sur Netlify."
  }
  return error.message
}

export async function checkCatalogueImageStorage() {
  const supabase = getSupabaseAdmin()
  try {
    const { error } = await supabase.storage.from(BUCKET).list("", { limit: 1 })
    if (!error) return { ok: true, message: "Bucket catalogue-images accessible" }
    if (error.message !== "fetch failed") return { ok: false, message: error.message }
  } catch (error) {
    if (!(error instanceof Error) || error.message !== "fetch failed") {
      return { ok: false, message: storageErrorDetail(error) }
    }
  }

  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()
  if (!key) return { ok: false, message: "SUPABASE_SERVICE_ROLE_KEY manquante" }

  try {
    const res = await supabaseFetch(`${supabaseProjectUrl()}/storage/v1/bucket/${BUCKET}`, {
      headers: {
        Authorization: `Bearer ${key}`,
        apikey: key,
      },
    })
    if (res.ok) return { ok: true, message: "Bucket catalogue-images accessible" }
    const body = (await res.text()).slice(0, 180)
    return {
      ok: false,
      message: body
        ? `Bucket catalogue-images inaccessible (${res.status}). ${body}`
        : `Bucket catalogue-images inaccessible (${res.status}).`,
    }
  } catch (error) {
    return { ok: false, message: storageErrorDetail(error) }
  }
}
