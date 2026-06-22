export type QualificationFormData = {
  firstName: string
  lastName: string
  companyName: string
  email: string
  phone: string
  country: string
  city: string
  website: string
  role: string | null
  experience: string | null
  chinaSourcing: string | null
  corridors: string[]
  productSectors: string[]
  incoterm: string | null
  annualVolumeK: number | null
  timeline: string | null
  payment: string | null
  projectBrief: string
  consent: boolean
}

export const INITIAL_QUALIFICATION_FORM: QualificationFormData = {
  firstName: "",
  lastName: "",
  companyName: "",
  email: "",
  phone: "",
  country: "",
  city: "",
  website: "",
  role: null,
  experience: null,
  chinaSourcing: null,
  corridors: [],
  productSectors: [],
  incoterm: null,
  annualVolumeK: null,
  timeline: null,
  payment: null,
  projectBrief: "",
  consent: false,
}

export const VOLUME_MIN_K = 25
export const VOLUME_MAX_K = 2000
export const VOLUME_STEP_K = 25
export const VOLUME_DEFAULT_K = 75

export const VOLUME_SCALE_LABELS = ["<$50K", "$250K", "$500K", "$1M", "$2M+"] as const

export function formatVolumeK(k: number): string {
  if (k >= 2000) return "$2M+"
  if (k >= 1000) {
    const millions = k / 1000
    return Number.isInteger(millions) ? `$${millions}M` : `$${millions.toFixed(1).replace(/\.0$/, "")}M`
  }
  return `$${k}K`
}

export const ROLE_OPTIONS = [
  { id: "importer", titleKey: "qualRoleImporter", descKey: "qualRoleImporterDesc" },
  { id: "distributor", titleKey: "qualRoleDistributor", descKey: "qualRoleDistributorDesc" },
  { id: "epc", titleKey: "qualRoleEpc", descKey: "qualRoleEpcDesc" },
  { id: "trading", titleKey: "qualRoleTrading", descKey: "qualRoleTradingDesc" },
] as const

export const EXPERIENCE_OPTIONS = [
  { id: "under-2", labelKey: "qualExpUnder2" },
  { id: "2-5", labelKey: "qualExp2to5" },
  { id: "5-plus", labelKey: "qualExp5plus" },
] as const

export const CHINA_OPTIONS = [
  { id: "yes-regular", labelKey: "qualChinaYesRegular" },
  { id: "yes-occ", labelKey: "qualChinaYesOcc" },
  { id: "not-yet", labelKey: "qualChinaNotYet" },
  { id: "exploring", labelKey: "qualChinaExploring" },
] as const

export const CORRIDOR_OPTIONS = [
  { id: "africa", titleKey: "qualCorridorAfrica", descKey: "qualCorridorAfricaDesc" },
  { id: "europe", titleKey: "qualCorridorEurope", descKey: "qualCorridorEuropeDesc" },
  { id: "uae", titleKey: "qualCorridorUae", descKey: "qualCorridorUaeDesc" },
  { id: "other", titleKey: "qualCorridorOther", descKey: "qualCorridorOtherDesc" },
] as const

export const PRODUCT_SECTOR_KEYS = [
  "qualSectorConstruction",
  "qualSectorSteel",
  "qualSectorElectrical",
  "qualSectorMachinery",
  "qualSectorChemicals",
  "qualSectorConsumer",
  "qualSectorOther",
] as const

export const PRODUCT_SECTOR_IDS = [
  "construction",
  "steel",
  "electrical",
  "machinery",
  "chemicals",
  "consumer",
  "other",
] as const

export const INCOTERM_OPTIONS = [
  { id: "fob", titleKey: "qualIncotermFob", descKey: "qualIncotermFobDesc" },
  { id: "cif", titleKey: "qualIncotermCif", descKey: "qualIncotermCifDesc" },
  { id: "dap", titleKey: "qualIncotermDap", descKey: "qualIncotermDapDesc" },
] as const

export const TIMELINE_OPTIONS = [
  { id: "under-1", labelKey: "qualTimelineUnder1" },
  { id: "1-3", labelKey: "qualTimeline1to3" },
  { id: "3-6", labelKey: "qualTimeline3to6" },
] as const

export const PAYMENT_OPTIONS = [
  { id: "tt", titleKey: "qualPaymentTt", descKey: "qualPaymentTtDesc" },
  { id: "lc", titleKey: "qualPaymentLc", descKey: "qualPaymentLcDesc" },
  { id: "dp", titleKey: "qualPaymentDp", descKey: "qualPaymentDpDesc" },
  { id: "discuss", titleKey: "qualPaymentDiscuss", descKey: "qualPaymentDiscussDesc" },
] as const

export const FORM_STEPS = ["identity", "profile", "corridors", "opportunity", "review"] as const
export type FormStep = (typeof FORM_STEPS)[number]
