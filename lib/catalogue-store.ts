import { promises as fs } from "fs"
import path from "path"
import type { CatalogueService, CatalogueServiceInput } from "@/lib/catalogue-types"
import {
  CATALOGUE_SERVICES_KEY,
  getCatalogueDataStore,
} from "@/lib/catalogue-blobs"

const DATA_DIR = path.join(process.cwd(), "data")
const DATA_FILE = path.join(DATA_DIR, "catalogue-services.json")

const DEFAULT_IMAGES = {
  sourcing: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=800&q=80",
  customs: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
  logistics: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",
} as const

export const DEFAULT_CATALOGUE_SERVICES: CatalogueService[] = [
  {
    id: "sourcing-procurement",
    imageUrl: DEFAULT_IMAGES.sourcing,
    nameFr: "Sourcing & Approvisionnement",
    nameEn: "Sourcing & Procurement",
    descriptionFr: "Identification de fournisseurs qualifiés et gestion des achats internationaux pour vos projets B2B.",
    descriptionEn: "Qualified supplier identification and international procurement management for your B2B projects.",
    includesFr: ["Recherche fournisseurs", "Négociation commerciale", "Contrôle qualité", "Coordination logistique"],
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
    descriptionFr: "Accompagnement réglementaire et facilitation des flux transfrontaliers sans friction.",
    descriptionEn: "Regulatory support and frictionless cross-border flow facilitation.",
    includesFr: ["Classification douanière", "Documentation export/import", "Conformité produit", "Suivi clearance"],
    includesEn: ["Customs classification", "Export/import documentation", "Product compliance", "Clearance tracking"],
    audienceFr: "Trading houses et industriels",
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
    descriptionFr: "Orchestration des corridors Chine, EAU, Europe et Afrique selon vos incoterms.",
    descriptionEn: "Orchestration of China, UAE, Europe and Africa corridors based on your incoterms.",
    includesFr: ["Planification transport", "Fret maritime/aérien", "Assurance cargo", "Suivi bout-en-bout"],
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
    return parsed.map(normalizeService).sort((a, b) => a.order - b.order)
  } catch {
    return DEFAULT_CATALOGUE_SERVICES
  }
}

async function writeToFile(services: CatalogueService[]) {
  await fs.mkdir(DATA_DIR, { recursive: true })
  await fs.writeFile(DATA_FILE, JSON.stringify(services, null, 2), "utf-8")
}

async function readFromBlob(): Promise<CatalogueService[] | null> {
  const store = getCatalogueDataStore()
  if (!store) return null

  try {
    const raw = await store.get(CATALOGUE_SERVICES_KEY, { type: "text" })
    if (raw === null) return null
    const parsed = JSON.parse(raw) as LegacyCatalogueService[]
    if (!Array.isArray(parsed)) return null
    return parsed.map(normalizeService).sort((a, b) => a.order - b.order)
  } catch {
    return null
  }
}

async function writeToBlob(services: CatalogueService[]) {
  const store = getCatalogueDataStore()
  if (!store) return false

  try {
    await store.set(CATALOGUE_SERVICES_KEY, JSON.stringify(services, null, 2))
    return true
  } catch {
    return false
  }
}

export async function listCatalogueServices(): Promise<CatalogueService[]> {
  const fromBlob = await readFromBlob()
  if (fromBlob !== null) return fromBlob
  return readFromFile()
}

export async function saveCatalogueServices(services: CatalogueService[]) {
  const sorted = [...services].map(normalizeService).sort((a, b) => a.order - b.order)
  const blobSaved = await writeToBlob(sorted)
  if (blobSaved) return sorted

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
