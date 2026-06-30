"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { LanguageSwitcher } from "@/components/language-switcher"
import { ResponsiveOptimizedLogo } from "@/components/optimized-logo"
import { isQualifyScrollPage, scrollToQualifyProject } from "@/lib/scroll-to-qualify"
import { isSameRoute, qualifyProjectHref, ROUTES } from "@/lib/site-routes"

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { t } = useLanguage()

  const stringify = (value: string | string[]) => (Array.isArray(value) ? value.join(" ") : value)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const closeMobileMenu = useCallback(() => setIsMobileMenuOpen(false), [])

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMobileMenu()
    }

    if (isMobileMenuOpen) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = ""
    }
  }, [isMobileMenuOpen, closeMobileMenu])

  useEffect(() => {
    closeMobileMenu()
  }, [pathname, closeMobileMenu])

  const navItems = useMemo(
    () => [
      { name: stringify(t("home")), href: ROUTES.accueil },
      { name: stringify(t("services")), href: ROUTES.services },
      { name: stringify(t("agency")), href: ROUTES.agency },
      { name: stringify(t("productCatalogue")), href: ROUTES.catalogue },
    ],
    [t]
  )

  const isActive = (href: string) => isSameRoute(pathname, href)

  const linkClass = (href: string) =>
    `relative shrink-0 px-1 lg:px-1.5 xl:px-2.5 py-2 text-[11px] lg:text-xs xl:text-sm 2xl:text-base font-semibold whitespace-nowrap transition-colors duration-200 ${
      isActive(href) ? "text-copper" : "text-gray-300 hover:text-copper"
    }`

  const handleGetStarted = useCallback(() => {
    closeMobileMenu()
    if (isQualifyScrollPage(pathname)) {
      scrollToQualifyProject()
      return
    }
    router.push(qualifyProjectHref())
  }, [pathname, closeMobileMenu, router])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-navy shadow-lg" : "bg-navy lg:bg-transparent"
      }`}
    >
      <div className="max-w-[90rem] mx-auto px-3 sm:px-4 lg:px-5 xl:px-6">
        <div className="flex justify-between items-center min-h-[5rem] py-2 lg:py-0 lg:h-[4.5rem] xl:h-24 gap-2 lg:gap-3">
          <Link
            href={ROUTES.accueil}
            className="flex items-center gap-2 sm:gap-3 lg:gap-2 xl:gap-3 min-w-0 shrink-0 lg:-ml-2 xl:-ml-8 2xl:-ml-12 overflow-visible"
          >
            <ResponsiveOptimizedLogo className="w-11 h-9 sm:w-16 sm:h-12 lg:w-12 lg:h-10 xl:w-16 xl:h-12 2xl:w-20 2xl:h-14 shrink-0 filter brightness-125 contrast-110 drop-shadow-[0_0_6px_rgba(255,255,255,0.25)]" />
            <div className="text-white flex flex-col justify-center leading-none gap-0.5">
              <span className="text-sm sm:text-xl lg:text-base xl:text-lg 2xl:text-xl font-bold tracking-wide whitespace-nowrap">
                {t("companyName")}
              </span>
              <span className="text-[10px] sm:text-xs text-copper tracking-[0.2em] font-semibold whitespace-nowrap">
                {t("companyTagline")}
              </span>
            </div>
          </Link>

          {/* Desktop navigation — CSS breakpoints (identique SSR + client) */}
          <div className="hidden lg:flex items-center justify-center gap-0 xl:gap-0.5 2xl:gap-1 flex-1 min-w-0 mx-1 xl:mx-2">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className={linkClass(item.href)}>
                {item.name}
                {isActive(item.href) && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-copper" />
                )}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-2 xl:gap-3 shrink-0">
            <LanguageSwitcher />
            <Button
              variant="outline"
              size="sm"
              className="border-copper text-copper hover:bg-copper hover:text-navy font-semibold text-xs xl:text-sm px-2.5 xl:px-4 h-9 xl:h-10"
              asChild
            >
              <Link href={ROUTES.contact}>{t("contactUs")}</Link>
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={handleGetStarted}
              className="bg-gradient-to-r from-copper to-sand text-navy font-bold hover:scale-105 transition-transform duration-200 text-xs xl:text-sm px-2.5 xl:px-4 h-9 xl:h-10"
            >
              {t("getStarted")}
            </Button>
          </div>

          {/* Mobile / tablette */}
          <div className="flex lg:hidden items-center shrink-0">
            <button
              data-menu-button
              className="text-white p-2 hover:bg-copper/10 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-copper/50"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? stringify(t("closeMenu")) : stringify(t("openMenu"))}
              aria-expanded={isMobileMenuOpen}
              type="button"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden">
            <div className="fixed inset-0 bg-black/50 z-40" onClick={closeMobileMenu} />
            <div data-mobile-menu className="relative z-50 bg-navy border-t border-copper/20">
              <div className="px-4 py-4 space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block px-4 py-3 rounded-lg transition-colors duration-200 font-semibold text-base ${
                      isActive(item.href)
                        ? "text-copper bg-copper/10"
                        : "text-gray-300 hover:text-copper hover:bg-copper/5"
                    }`}
                    onClick={closeMobileMenu}
                  >
                    {item.name}
                  </Link>
                ))}

                <div className="pt-4 border-t border-copper/20 space-y-3">
                  <div className="px-4">
                    <LanguageSwitcher />
                  </div>
                  <Button
                    type="button"
                    className="bg-gradient-to-r from-copper to-sand text-navy font-bold w-full hover:scale-105 transition-transform duration-200"
                    onClick={handleGetStarted}
                  >
                    {t("getStarted")}
                  </Button>
                  <Button
                    variant="outline"
                    className="border-copper text-copper hover:bg-copper hover:text-navy font-semibold w-full transition-all duration-200"
                    asChild
                    onClick={closeMobileMenu}
                  >
                    <Link href={ROUTES.contact}>{t("contactUs")}</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
