import { NextRequest, NextResponse } from "next/server"
import {
  adminSessionCookieOptions,
  createAdminSessionToken,
  isAdminAuthenticated,
  isAdminConfigured,
  verifyAdminPassword,
} from "@/lib/catalogue-auth"
import { buildService, listCatalogueServices, saveCatalogueServices } from "@/lib/catalogue-store"
import type { CatalogueServiceInput } from "@/lib/catalogue-types"
import { getClientIp } from "@/lib/request-ip"
import { rateLimit, rateLimitResponse } from "@/lib/rate-limit"

function validateInput(body: Partial<CatalogueServiceInput>) {
  if (!body.nameFr?.trim() || !body.nameEn?.trim()) return "Name is required in both languages"
  if (!body.descriptionFr?.trim() || !body.descriptionEn?.trim()) return "Description is required"
  if (!body.audienceFr?.trim() || !body.audienceEn?.trim()) return "Audience is required"
  if (!body.imageUrl?.trim()) return "Image is required"
  if (!Array.isArray(body.includesFr) || body.includesFr.filter(Boolean).length < 1) return "At least one included item (FR)"
  if (!Array.isArray(body.includesEn) || body.includesEn.filter(Boolean).length < 1) return "At least one included item (EN)"
  return null
}

export async function POST(request: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
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

    const updated = await saveCatalogueServices([...services, service])
    return NextResponse.json({ service, services: updated }, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Unable to create service" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = (await request.json()) as Partial<CatalogueServiceInput> & { id?: string }
    if (!body.id) return NextResponse.json({ error: "Service id is required" }, { status: 400 })

    const error = validateInput(body)
    if (error) return NextResponse.json({ error }, { status: 400 })

    const services = await listCatalogueServices()
    const index = services.findIndex((s) => s.id === body.id)
    if (index < 0) return NextResponse.json({ error: "Service not found" }, { status: 404 })

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
        order: typeof body.order === "number" ? body.order : services[index].order,
      },
      services[index]
    )

    const next = [...services]
    next[index] = service
    const updated = await saveCatalogueServices(next)
    return NextResponse.json({ service, services: updated })
  } catch {
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
    const response = NextResponse.json({ success: true })
    response.cookies.set(cookie.name, token, cookie)
    return response
  }

  if (body?.action === "logout") {
    const cookie = adminSessionCookieOptions()
    const response = NextResponse.json({ success: true })
    response.cookies.set(cookie.name, "", { ...cookie, maxAge: 0 })
    return response
  }

  return NextResponse.json({ error: "Invalid action" }, { status: 400 })
}

export async function GET() {
  const authenticated = await isAdminAuthenticated()
  return NextResponse.json({
    authenticated,
    configured: isAdminConfigured(),
  })
}
