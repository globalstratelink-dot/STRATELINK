import { NextRequest, NextResponse } from "next/server"
import {
  adminSessionCookieOptions,
  adminApiResponseHeaders,
  createAdminSessionToken,
  isAdminAuthenticated,
  isAdminConfigured,
  verifyAdminPassword,
} from "@/lib/catalogue-auth"
import {
  addCatalogueService,
  buildService,
  listCatalogueServices,
  updateCatalogueService,
  CataloguePersistenceError,
} from "@/lib/catalogue-store"
import type { CatalogueServiceInput } from "@/lib/catalogue-types"
import { getClientIp } from "@/lib/request-ip"
import { rateLimit, rateLimitResponse } from "@/lib/rate-limit"

export const dynamic = "force-dynamic"
export const revalidate = 0

function validateInput(body: Partial<CatalogueServiceInput>) {
  if (!body.nameFr?.trim() || !body.nameEn?.trim()) return "Name is required in both languages"
  if (!body.descriptionFr?.trim() || !body.descriptionEn?.trim()) return "Description is required"
  if (!body.audienceFr?.trim() || !body.audienceEn?.trim()) return "Audience is required"
  if (!body.imageUrl?.trim()) return "Image is required"
  if (!Array.isArray(body.includesFr) || body.includesFr.filter(Boolean).length < 1) return "At least one included item (FR)"
  if (!Array.isArray(body.includesEn) || body.includesEn.filter(Boolean).length < 1) return "At least one included item (EN)"
  return null
}

const ADMIN_HEADERS = adminApiResponseHeaders()

function unauthorizedResponse() {
  return NextResponse.json(
    { error: "Session expirée. Reconnectez-vous." },
    { status: 401, headers: ADMIN_HEADERS }
  )
}

export async function POST(request: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return unauthorizedResponse()
  }

  try {
    const body = (await request.json()) as Partial<CatalogueServiceInput>
    const error = validateInput(body)
    if (error) return NextResponse.json({ error }, { status: 400 })

    const services = await listCatalogueServices()
    const order = typeof body.order === "number" ? body.order : services.length + 1
    const service = buildService({
      imageUrl: body.imageUrl!,
      nameFr: body.nameFr!,
      nameEn: body.nameEn!,
      descriptionFr: body.descriptionFr!,
      descriptionEn: body.descriptionEn!,
      includesFr: body.includesFr!,
      includesEn: body.includesEn!,
      audienceFr: body.audienceFr!,
      audienceEn: body.audienceEn!,
      order,
    })

    if (services.some((s) => s.id === service.id)) {
      return NextResponse.json({ error: "A service with this name already exists" }, { status: 409 })
    }

    const updated = await addCatalogueService(service)
    return NextResponse.json({ service, services: updated }, { status: 201, headers: ADMIN_HEADERS })
  } catch (error) {
    if (error instanceof CataloguePersistenceError) {
      return NextResponse.json({ error: error.message }, { status: 503 })
    }
    return NextResponse.json({ error: "Unable to create service" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return unauthorizedResponse()
  }

  try {
    const body = (await request.json()) as Partial<CatalogueServiceInput> & { id?: string }
    if (!body.id) return NextResponse.json({ error: "Service id is required" }, { status: 400 })

    const error = validateInput(body)
    if (error) return NextResponse.json({ error }, { status: 400 })

    const services = await listCatalogueServices()
    const existing = services.find((s) => s.id === body.id)
    if (!existing) return NextResponse.json({ error: "Service not found" }, { status: 404 })

    const service = buildService(
      {
        imageUrl: body.imageUrl!,
        nameFr: body.nameFr!,
        nameEn: body.nameEn!,
        descriptionFr: body.descriptionFr!,
        descriptionEn: body.descriptionEn!,
        includesFr: body.includesFr!,
        includesEn: body.includesEn!,
        audienceFr: body.audienceFr!,
        audienceEn: body.audienceEn!,
        order: typeof body.order === "number" ? body.order : existing.order,
      },
      existing
    )

    const updated = await updateCatalogueService(service)
    return NextResponse.json({ service, services: updated }, { headers: ADMIN_HEADERS })
  } catch (error) {
    if (error instanceof CataloguePersistenceError) {
      return NextResponse.json({ error: error.message }, { status: 503 })
    }
    return NextResponse.json({ error: "Unable to update service" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  const body = await request.json().catch(() => null)

  if (body?.action === "login") {
    const ip = getClientIp(request)
    const limit = rateLimit(`admin-login:${ip}`, 5, 15 * 60 * 1000)
    if (!limit.ok) {
      return NextResponse.json(rateLimitResponse(limit.retryAfterSec), { status: 429 })
    }

    if (!isAdminConfigured()) {
      return NextResponse.json({ error: "Admin password is not configured" }, { status: 503 })
    }
    if (!verifyAdminPassword(String(body.password || ""))) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 })
    }

    const token = createAdminSessionToken()
    const cookie = adminSessionCookieOptions()
    const response = NextResponse.json({ success: true }, { headers: ADMIN_HEADERS })
    response.cookies.set(cookie.name, token, cookie)
    return response
  }

  if (body?.action === "logout") {
    const cookie = adminSessionCookieOptions()
    const response = NextResponse.json({ success: true }, { headers: ADMIN_HEADERS })
    response.cookies.set(cookie.name, "", { ...cookie, maxAge: 0 })
    return response
  }

  return NextResponse.json({ error: "Invalid action" }, { status: 400 })
}

export async function GET() {
  const authenticated = await isAdminAuthenticated()

  if (!authenticated) {
    return NextResponse.json(
      {
        authenticated: false,
        configured: isAdminConfigured(),
      },
      { headers: ADMIN_HEADERS }
    )
  }

  try {
    const services = await listCatalogueServices()
    return NextResponse.json(
      {
        authenticated: true,
        configured: isAdminConfigured(),
        services,
      },
      { headers: ADMIN_HEADERS }
    )
  } catch (error) {
    if (error instanceof CataloguePersistenceError) {
      return NextResponse.json({ error: error.message, authenticated: true }, { status: 503, headers: ADMIN_HEADERS })
    }
    return NextResponse.json({ error: "Unable to load catalogue", authenticated: true }, { status: 500, headers: ADMIN_HEADERS })
  }
}
