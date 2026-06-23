import { NextRequest, NextResponse } from "next/server"
import { listCatalogueServices, saveCatalogueServices, CataloguePersistenceError } from "@/lib/catalogue-store"
import { catalogueApiHeaders } from "@/lib/catalogue-api-headers"

export const dynamic = "force-dynamic"
export const revalidate = 0

export async function GET() {
  try {
    const services = await listCatalogueServices()
    return NextResponse.json({ services }, { headers: catalogueApiHeaders() })
  } catch (error) {
    if (error instanceof CataloguePersistenceError) {
      return NextResponse.json({ error: error.message }, { status: 503 })
    }
    return NextResponse.json({ error: "Unable to load catalogue" }, { status: 500 })
  }
}
