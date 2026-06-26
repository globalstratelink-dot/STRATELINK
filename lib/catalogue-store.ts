import { promises as fs } from "fs"
import path from "path"
import type { CatalogueService, CatalogueServiceInput } from "@/lib/catalogue-types"
import {
  CATALOGUE_SERVICES_KEY,
  getCatalogueDataStore,
  useNetlifyBlobStorage,
} from "@/lib/catalogue-blobs"
import { isSupabaseConfigured } from "@/lib/supabase-admin"
import {
  deleteCatalogueServiceFromSupabase,
  insertCatalogueServiceInSupabase,
  readCatalogueFromSupabase,
  saveCatalogueToSupabase,
  updateCatalogueServiceInSupabase,
} from "@/lib/catalogue-supabase"

const DATA_DIR = path.join(process.cwd(), "data")
const DATA_FILE = path.join(DATA_DIR, "catalogue-services.json")

const DEFAULT_IMAGES = {
  sourcing: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=800&q=80",
  customs: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
  logistics: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",
} as const

export class CataloguePersistenceError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "CataloguePersistenceError"
  }
}

export const DEFAULT_CATALOGUE_SERVICES: CatalogueService[] = [
  {
    id: "sourcing-procurement",
    imageUrl: DEFAULT_IMAGES.sourcing,
    nameFr: "Sourcing & Approvisionnement",
    nameEn: "Sourcing & Procurement",
    descriptionFr: "Identification de fournisseurs qualifiés et gestion des achats internationaux pour vos projets B2B.",
    descriptionEn: "Qualified supplier identification and international procurement management for your B2B projects.",
    includesFr: ["Recherche de fournisseurs", "Négociation commerciale", "Contrôle qualité", "Coordination logistique"],
    includesEn: ["Supplier research", "Commercial negotiation", "Quality control", "Logistics coordination"],
    audienceFr: "Importateurs, distributeurs et EPC",
    audienceEn: "Importers, distributors and EPC contractors",
    order: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "customs-compliance",
    imageUrl: DEFAULT_IMAGES.customs,
    nameFr: "Douanes & Conformité",
    nameEn: "Customs & Compliance",
    descriptionFr: "Accompagnement réglementaire et facilitation des flux transfrontaliers fluides.",
    descriptionEn: "Regulatory support and frictionless cross-border flow facilitation.",
    includesFr: ["Classification douanière", "Documentation export/import", "Conformité produit", "Suivi du dédouanement"],
    includesEn: ["Customs classification", "Export/import documentation", "Product compliance", "Clearance tracking"],
    audienceFr: "Maisons de négoce et industriels",
    audienceEn: "Trading houses and industrial companies",
    order: 2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "logistics-corridors",
    imageUrl: DEFAULT_IMAGES.logistics,
    nameFr: "Logistique & Corridors",
    nameEn: "Logistics & Corridors",
    descriptionFr: "Orchestration des corridors Chine, Émirats, Europe et Afrique selon vos incoterms.",
    descriptionEn: "Orchestration of China, UAE, Europe and Africa corridors based on your incoterms.",
    includesFr: ["Planification du transport", "Fret maritime/aérien", "Assurance marchandises", "Suivi de bout en bout"],
    includesEn: ["Transport planning", "Sea/air freight", "Cargo insurance", "End-to-end tracking"],
    audienceFr: "Projets multi-pays et grossistes",
    audienceEn: "Multi-country projects and wholesalers",
    order: 3,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

type LegacyCatalogueService = Partial<CatalogueService> & { icon?: string }

function normalizeService(raw: LegacyCatalogueService): CatalogueService {
  return {
    id: raw.id || "",
    imageUrl: raw.imageUrl?.trim() || "",
    nameFr: raw.nameFr || "",
    nameEn: raw.nameEn || "",
    descriptionFr: raw.descriptionFr || "",
    descriptionEn: raw.descriptionEn || "",
    includesFr: Array.isArray(raw.includesFr) ? raw.includesFr : [],
    includesEn: Array.isArray(raw.includesEn) ? raw.includesEn : [],
    audienceFr: raw.audienceFr || "",
    audienceEn: raw.audienceEn || "",
    order: typeof raw.order === "number" ? raw.order : 1,
    createdAt: raw.createdAt || new Date().toISOString(),
    updatedAt: raw.updatedAt || new Date().toISOString(),
  }
}

async function readFromFile(): Promise<CatalogueService[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8")
    const parsed = JSON.parse(raw) as LegacyCatalogueService[]
    if (!Array.isArray(parsed) || parsed.length === 0) return []
    return parsed.map(normalizeService).sort((a, b) => a.order - b.order)
  } catch {
    return []
  }
}

async function writeToFile(services: CatalogueService[]) {
  await fs.mkdir(DATA_DIR, { recursive: true })
  await fs.writeFile(DATA_FILE, JSON.stringify(services, null, 2), "utf-8")
}

async function readFromBlob(): Promise<CatalogueService[] | null> {
  if (!useNetlifyBlobStorage()) return null

  const store = getCatalogueDataStore()
  if (!store) return null

  try {
    const raw = await store.get(CATALOGUE_SERVICES_KEY, { type: "text" })
    if (raw === null) return null
    const parsed = JSON.parse(raw) as LegacyCatalogueService[]
    if (!Array.isArray(parsed)) return null
    return parsed.map(normalizeService).sort((a, b) => a.order - b.order)
  } catch (error) {
    console.error("[catalogue-store] Blob read failed", error)
    throw new CataloguePersistenceError(
      "Impossible de lire le catalogue en ligne. Configurez Supabase (recommandé) ou vérifiez NETLIFY_AUTH_TOKEN."
    )
  }
}

async function writeToBlob(services: CatalogueService[]) {
  if (!useNetlifyBlobStorage()) return false

  const store = getCatalogueDataStore()
  if (!store) return false

  try {
    await store.set(CATALOGUE_SERVICES_KEY, JSON.stringify(services, null, 2))
    return true
  } catch (error) {
    console.error("[catalogue-store] Blob write failed", error)
    return false
  }
}

export async function listCatalogueServices(): Promise<CatalogueService[]> {
  if (isSupabaseConfigured()) {
    return readCatalogueFromSupabase()
  }

  if (useNetlifyBlobStorage()) {
    const fromBlob = await readFromBlob()
    if (fromBlob !== null) return fromBlob
    return []
  }

  return readFromFile()
}

export async function addCatalogueService(service: CatalogueService): Promise<CatalogueService[]> {
  if (isSupabaseConfigured()) {
    try {
      await insertCatalogueServiceInSupabase(service)
      return readCatalogueFromSupabase()
    } catch (error) {
      console.error("[catalogue-store] Supabase insert failed", error)
      const detail = error instanceof Error ? error.message : "erreur inconnue"
      throw new CataloguePersistenceError(
        `Impossible d'ajouter le service dans Supabase : ${detail}`
      )
    }
  }

  const services = await listCatalogueServices()
  if (services.some((s) => s.id === service.id)) {
    throw new CataloguePersistenceError("Un service avec ce nom existe déjà")
  }
  return saveCatalogueServices([...services, service])
}

export async function updateCatalogueService(service: CatalogueService): Promise<CatalogueService[]> {
  if (isSupabaseConfigured()) {
    try {
      await updateCatalogueServiceInSupabase(service)
      return readCatalogueFromSupabase()
    } catch (error) {
      console.error("[catalogue-store] Supabase update failed", error)
      const detail = error instanceof Error ? error.message : "erreur inconnue"
      throw new CataloguePersistenceError(
        `Impossible de modifier le service dans Supabase : ${detail}`
      )
    }
  }

  const services = await listCatalogueServices()
  const index = services.findIndex((s) => s.id === service.id)
  if (index < 0) {
    throw new CataloguePersistenceError("Service introuvable")
  }
  const next = [...services]
  next[index] = service
  return saveCatalogueServices(next)
}

export async function removeCatalogueService(id: string): Promise<CatalogueService[]> {
  if (isSupabaseConfigured()) {
    try {
      await deleteCatalogueServiceFromSupabase(id)
      return readCatalogueFromSupabase()
    } catch (error) {
      console.error("[catalogue-store] Supabase delete failed", error)
      const detail = error instanceof Error ? error.message : "erreur inconnue"
      throw new CataloguePersistenceError(
        `Impossible de supprimer le service dans Supabase : ${detail}`
      )
    }
  }

  const services = await listCatalogueServices()
  const next = services.filter((s) => s.id !== id)
  if (next.length === services.length) {
    throw new CataloguePersistenceError("Service introuvable")
  }
  return saveCatalogueServices(next)
}

export async function saveCatalogueServices(services: CatalogueService[]) {
  const sorted = [...services].map(normalizeService).sort((a, b) => a.order - b.order)

  if (isSupabaseConfigured()) {
    try {
      await saveCatalogueToSupabase(sorted)
      return sorted
    } catch (error) {
      console.error("[catalogue-store] Supabase save failed", error)
      const detail = error instanceof Error ? error.message : "erreur inconnue"
      throw new CataloguePersistenceError(
        `Impossible de sauvegarder dans Supabase : ${detail}. Vérifiez la table catalogue_services, le bucket catalogue-images, et que SUPABASE_URL correspond à la clé secrète.`
      )
    }
  }

  if (useNetlifyBlobStorage()) {
    const blobSaved = await writeToBlob(sorted)
    if (!blobSaved) {
      throw new CataloguePersistenceError(
        "Impossible de sauvegarder le catalogue en ligne. Configurez Supabase (recommandé) ou NETLIFY_AUTH_TOKEN."
      )
    }
    return sorted
  }

  await writeToFile(sorted)
  return sorted
}

export function createServiceId(name: string) {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 48)
}

export function buildService(input: CatalogueServiceInput, existing?: CatalogueService): CatalogueService {
  const now = new Date().toISOString()
  return {
    id: existing?.id || createServiceId(input.nameEn || input.nameFr),
    imageUrl: input.imageUrl.trim(),
    nameFr: input.nameFr.trim(),
    nameEn: input.nameEn.trim(),
    descriptionFr: input.descriptionFr.trim(),
    descriptionEn: input.descriptionEn.trim(),
    includesFr: input.includesFr.map((s) => s.trim()).filter(Boolean).slice(0, 4),
    includesEn: input.includesEn.map((s) => s.trim()).filter(Boolean).slice(0, 4),
    audienceFr: input.audienceFr.trim(),
    audienceEn: input.audienceEn.trim(),
    order: input.order,
    createdAt: existing?.createdAt || now,
    updatedAt: now,
  }
}
