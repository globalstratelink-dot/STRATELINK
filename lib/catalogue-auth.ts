import { cookies } from "next/headers"
import { createHmac, timingSafeEqual } from "crypto"

const COOKIE_NAME = "catalogue_admin_session"
const SESSION_MAX_AGE = 60 * 60 * 12 // 12 hours

function getSecret() {
  return process.env.CATALOGUE_ADMIN_PASSWORD || ""
}

export function isAdminConfigured() {
  return Boolean(getSecret())
}

function signToken(payload: string) {
  return createHmac("sha256", getSecret()).update(payload).digest("hex")
}

export function createAdminSessionToken() {
  const expiresAt = Date.now() + SESSION_MAX_AGE * 1000
  const payload = `${expiresAt}`
  return `${payload}.${signToken(payload)}`
}

export function verifyAdminSessionToken(token: string | undefined) {
  if (!token || !isAdminConfigured()) return false
  const [expiresAtStr, signature] = token.split(".")
  if (!expiresAtStr || !signature) return false

  const expiresAt = Number(expiresAtStr)
  if (!Number.isFinite(expiresAt) || expiresAt < Date.now()) return false

  const expected = signToken(expiresAtStr)
  try {
    return timingSafeEqual(Buffer.from(signature), Buffer.from(expected))
  } catch {
    return false
  }
}

export function verifyAdminPassword(password: string) {
  const secret = getSecret()
  if (!secret) return false
  try {
    return timingSafeEqual(Buffer.from(password), Buffer.from(secret))
  } catch {
    return password === secret
  }
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value
  return verifyAdminSessionToken(token)
}

export function adminSessionCookieOptions() {
  return {
    name: COOKIE_NAME,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: SESSION_MAX_AGE,
  }
}
