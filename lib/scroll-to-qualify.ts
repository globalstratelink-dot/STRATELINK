export const QUALIFY_SECTION_ID = "qualify-project"

export function scrollToQualifyProject() {
  const el = document.getElementById(QUALIFY_SECTION_ID)
  if (!el) return false
  el.scrollIntoView({ behavior: "smooth", block: "start" })
  return true
}

export function isQualifyScrollPage(pathname: string) {
  const normalized = pathname.replace(/\/$/, "") || "/"
  return normalized === "/process"
}
