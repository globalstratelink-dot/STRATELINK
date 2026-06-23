import { NextRequest, NextResponse } from "next/server"
import { isAdminAuthenticated } from "@/lib/catalogue-auth"
import { listCatalogueServices, saveCatalogueServices } from "@/lib/catalogue-store"

type RouteContext = { params: { id: string } }

export async function DELETE(_request: NextRequest, { params }: RouteContext) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const services = await listCatalogueServices()
    const next = services.filter((s) => s.id !== params.id)
    if (next.length === services.length) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 })
    }

    const updated = await saveCatalogueServices(next)
    return NextResponse.json({ success: true, services: updated })
  } catch {
    return NextResponse.json({ error: "Unable to delete service" }, { status: 500 })
  }
}
