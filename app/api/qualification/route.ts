import { NextRequest, NextResponse } from "next/server"
import { getClientIp } from "@/lib/request-ip"
import { rateLimit, rateLimitResponse } from "@/lib/rate-limit"
import { isHoneypotTriggered, verifyTurnstileToken } from "@/lib/turnstile"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const ip = getClientIp(request)

    if (isHoneypotTriggered(body.website)) {
      return NextResponse.json({ success: true, message: "Qualification submitted" })
    }

    const limit = rateLimit(`qualification:${ip}`, 3, 15 * 60 * 1000)
    if (!limit.ok) {
      return NextResponse.json(rateLimitResponse(limit.retryAfterSec), { status: 429 })
    }

    const captchaOk = await verifyTurnstileToken(body.turnstileToken, ip)
    if (!captchaOk) {
      return NextResponse.json({ error: "Vérification anti-spam échouée. Réessayez." }, { status: 400 })
    }

    if (!body.email || !body.firstName || !body.lastName || !body.companyName) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const contactRes = await fetch(`${request.nextUrl.origin}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        company: body.companyName,
        country: body.country || "",
        phoneNumber: body.phone || "",
        subject: "Partner Qualification",
        message: formatQualificationMessage(body),
      }),
    })

    const data = await contactRes.json()
    if (!contactRes.ok) {
      return NextResponse.json(data, { status: contactRes.status })
    }

    return NextResponse.json({ success: true, message: "Qualification submitted" })
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}

function formatVolumeFromApi(k: number): string {
  if (k >= 2000) return "$2M+"
  if (k >= 1000) {
    const millions = k / 1000
    return Number.isInteger(millions) ? `$${millions}M` : `$${millions.toFixed(1).replace(/\.0$/, "")}M`
  }
  return `$${k}K`
}

function formatQualificationMessage(data: Record<string, unknown>): string {
  return [
    "=== PARTNER QUALIFICATION ===",
    "",
    `Role: ${data.role || "—"}`,
    `Experience: ${data.experience || "—"}`,
    `China sourcing: ${data.chinaSourcing || "—"}`,
    `Corridors: ${Array.isArray(data.corridors) ? data.corridors.join(", ") : "—"}`,
    `Product sectors: ${Array.isArray(data.productSectors) ? data.productSectors.join(", ") : "—"}`,
    `Incoterm: ${data.incoterm || "—"}`,
    `Annual volume: ${data.annualVolumeK != null ? formatVolumeFromApi(Number(data.annualVolumeK)) : "—"}`,
    `Timeline: ${data.timeline || "—"}`,
    `Payment: ${data.payment || "—"}`,
    `City: ${data.city || "—"}`,
    `Website: ${data.website || "—"}`,
    "",
    "Project brief:",
    String(data.projectBrief || "—"),
  ].join("\n")
}
