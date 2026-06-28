"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { LanguageSwitcher } from "@/components/language-switcher"
import { ResponsiveOptimizedLogo } from "@/components/optimized-logo"

export function Navbar() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isCompactNav, setIsCompactNav] = useState(true)

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)")
    const update = () => setIsCompactNav(!mq.matches)

    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])

  useEffect(() => {
    if (!isCompactNav) setIsMobileMenuOpen(false)
  }, [isCompactNav])

  const { t } = useLanguage()

  const stringify = (value: string | string[]) => (Array.isArray(value) ? value.join(" ") : value)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const closeMobileMenu = useCallback(() => setIsMobileMenuOpen(false), [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (target.closest("[data-menu-button]")) return
      if (target.closest("[data-mobile-menu]")) return
      closeMobileMenu()
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMobileMenu()
    }

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = ""
    }
  }, [isMobileMenuOpen, closeMobileMenu])

  useEffect(() => {
    closeMobileMenu()
  }, [pathname, closeMobileMenu])

  const navItems = useMemo(
    () => [
      { name: stringify(t("home")), href: "/" },
      { name: stringify(t("services")), href: "/services" },
      { name: stringify(t("agency")), href: "/agency" },
      { name: stringify(t("productCatalogue")), href: "/catalogue" },
      { name: stringify(t("sourceFromChina")), href: "/process" },
    ],
    [t]
  )

  const linkClass = (href: string) =>
    `relative px-2 xl:px-3 py-2 text-sm xl:text-base font-semibold transition-colors duration-200 ${
      pathname === href || pathname === `${href}/`
        ? "text-copper"
        : "text-gray-300 hover:text-copper"
    }`

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-navy shadow-lg" : "bg-navy lg:bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-20 lg:h-24 pt-2 lg:pt-4 gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 sm:gap-3 lg:gap-2 xl:gap-4 min-w-0 shrink-0 lg:-ml-4 xl:-ml-12 2xl:-ml-20"
          >
            <ResponsiveOptimizedLogo className="w-12 h-10 sm:w-16 sm:h-12 lg:w-14 lg:h-11 xl:w-20 xl:h-14 2xl:w-24 2xl:h-16 shrink-0 filter brightness-125 contrast-110 drop-shadow-[0_0_6px_rgba(255,255,255,0.25)]" />
            <div className="text-white min-w-0 flex flex-col justify-center">
              <div className="text-sm sm:text-xl lg:text-lg xl:text-xl 2xl:text-2xl font-bold tracking-wide sm:tracking-wider leading-tight lg:leading-none xl:whitespace-nowrap">
                {t("companyName")}
              </div>
              <div className="hidden xl:block text-xs xl:text-sm text-copper tracking-widest font-semibold mt-1">
                {t("companyTagline")}
              </div>
            </div>
          </Link>

          {!isCompactNav && (
            <div className="flex items-center gap-1 xl:gap-2 flex-1 justify-center min-w-0">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} className={linkClass(item.href)}>
                  {item.name}
                  {(pathname === item.href || pathname === `${item.href}/`) && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-copper" />
                  )}
                </Link>
              ))}
            </div>
          )}

          {!isCompactNav && (
            <div className="flex items-center space-x-3 xl:space-x-4 lg:-mr-8 shrink-0">
              <LanguageSwitcher />
              <Button
                variant="outline"
                className="border-copper text-copper hover:bg-copper hover:text-navy font-semibold transition-all duration-200"
                asChild
              >
                <Link href="/contact">{t("contactUs")}</Link>
              </Button>
              <Button
                className="bg-gradient-to-r from-copper to-sand text-navy font-bold hover:scale-105 transition-transform duration-200"
                asChild
              >
                <Link href="/calendly">{t("getStarted")}</Link>
              </Button>
            </div>
          )}

          {isCompactNav && (
            <div className="flex items-center shrink-0">
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
          )}
        </div>

        {isCompactNav && isMobileMenuOpen && (
          <div>
            <div className="fixed inset-0 bg-black/50 z-40" onClick={closeMobileMenu} />
            <div data-mobile-menu className="relative z-50 bg-navy border-t border-copper/20">
              <div className="px-4 py-4 space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block px-4 py-3 rounded-lg transition-colors duration-200 font-semibold text-base ${
                      pathname === item.href || pathname === `${item.href}/`
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
                    className="bg-gradient-to-r from-copper to-sand text-navy font-bold w-full hover:scale-105 transition-transform duration-200"
                    asChild
                    onClick={closeMobileMenu}
                  >
                    <Link href="/calendly">{t("getStarted")}</Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="border-copper text-copper hover:bg-copper hover:text-navy font-semibold w-full transition-all duration-200"
                    asChild
                    onClick={closeMobileMenu}
                  >
                    <Link href="/contact">{t("contactUs")}</Link>
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
