import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  if (request.nextUrl.pathname.startsWith("/adminAbdelhamid")) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow")
    response.headers.set("X-Frame-Options", "DENY")
    response.headers.set("Referrer-Policy", "no-referrer")
    response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate")
  }

  return response
}

export const config = {
  matcher: ["/adminAbdelhamid/:path*"],
}
