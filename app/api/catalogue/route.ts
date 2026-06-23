import { NextRequest, NextResponse } from "next/server"
import { listCatalogueServices } from "@/lib/catalogue-store"

export async function GET() {
  try {
    const services = await listCatalogueServices()
    return NextResponse.json({ services })
  } catch {
    return NextResponse.json({ error: "Unable to load catalogue" }, { status: 500 })
  }
}
