import { NextRequest, NextResponse } from "next/server"
import { isAdminAuthenticated, adminApiResponseHeaders } from "@/lib/catalogue-auth"
import { removeCatalogueService, CataloguePersistenceError } from "@/lib/catalogue-store"

type RouteContext = { params: { id: string } }

const ADMIN_HEADERS = adminApiResponseHeaders()

export async function DELETE(_request: NextRequest, { params }: RouteContext) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json(
      { error: "Session expirée. Reconnectez-vous." },
      { status: 401, headers: ADMIN_HEADERS }
    )
  }

  try {
    const updated = await removeCatalogueService(params.id)
    return NextResponse.json({ success: true, services: updated }, { headers: ADMIN_HEADERS })
  } catch (error) {
    if (error instanceof CataloguePersistenceError && error.message.includes("introuvable")) {
      return NextResponse.json({ error: "Service not found" }, { status: 404, headers: ADMIN_HEADERS })
    }
    if (error instanceof CataloguePersistenceError) {
      return NextResponse.json({ error: error.message }, { status: 503 })
    }
    return NextResponse.json({ error: "Unable to delete service" }, { status: 500 })
  }
}
