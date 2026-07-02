/** Canonical internal paths (trailingSlash matches next.config). */
export const ROUTES = {
  accueil: "/home/",
  services: "/activities/",
  agency: "/about-us/",
  catalogue: "/catalogue/",
  contact: "/contact/",
  legalNotice: "/legal-notice/",
  privacyPolicy: "/privacy-policy/",
  termsOfUse: "/terms-of-use/",
} as const

export function normalizePathname(pathname: string): string {
  const path = pathname.split("#")[0].split("?")[0] || "/"
  if (path === "/") return "/"
  return path.replace(/\/$/, "")
}

export function isSameRoute(pathname: string, href: string): boolean {
  return normalizePathname(pathname) === normalizePathname(href)
}

export function qualifyProjectHref(): string {
  return `${ROUTES.accueil}#qualify-project`
}
