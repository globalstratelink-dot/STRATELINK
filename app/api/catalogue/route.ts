import { NextRequest, NextResponse } from "next/server"
import { listCatalogueServices, saveCatalogueServices, CataloguePersistenceError } from "@/lib/catalogue-store"

export async function GET() {
  try {
    const services = await listCatalogueServices()
    return NextResponse.json(
      { services },
      { headers: { "Cache-Control": "no-cache, no-store, must-revalidate" } }
    )
  } catch (error) {
    if (error instanceof CataloguePersistenceError) {
      return NextResponse.json({ error: error.message }, { status: 503 })
    }
    return NextResponse.json({ error: "Unable to load catalogue" }, { status: 500 })
  }
}
