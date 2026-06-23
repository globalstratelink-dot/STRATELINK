"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronDown } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { LanguageSwitcher } from "@/components/language-switcher"
import { ResponsiveOptimizedLogo } from "@/components/optimized-logo"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Navbar() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isCompactNav, setIsCompactNav] = useState(true)

  // Menu hamburger jusqu'à lg (< 1024px) — mobile + tablettes
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

  const stringify = (value: string | string[]) => Array.isArray(value) ? value.join(' ') : value

  // Gestion du scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Fermer le menu mobile
  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false)
  }, [])

  // Gestion du clic à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      
      // Ne pas fermer si on clique sur le bouton de menu
      if (target.closest('[data-menu-button]')) {
        return
      }
      
      // Ne pas fermer si on clique dans le menu
      if (target.closest('[data-mobile-menu]')) {
        return
      }
      
      closeMobileMenu()
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMobileMenu()
      }
    }

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen, closeMobileMenu])

  // Fermer le menu quand la route change
  useEffect(() => {
    closeMobileMenu()
  }, [pathname, closeMobileMenu])

  const navItems = useMemo(() => [
    { name: stringify(t('home')), href: "/" },
    { name: stringify(t('contact')), href: "/contact" },
  ], [t])

  const solutionsItems = useMemo(() => [
    { name: stringify(t('services')), href: "/services" },
    { name: stringify(t('agency')), href: "/agency" },
  ], [t])

  const catalogueItems = useMemo(() => [
    { name: stringify(t('catalogue')), href: "/catalogue" },
    { name: stringify(t('process')), href: "/process" },
  ], [t])

  const isSolutionsActive = pathname === "/services" || pathname === "/agency"
  const isCatalogueActive = pathname === "/catalogue" || pathname === "/process"

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-navy shadow-lg" 
          : "bg-navy lg:bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-20 lg:h-24 pt-2 lg:pt-4 gap-3">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 lg:gap-2 xl:gap-4 min-w-0 shrink-0 lg:-ml-4 xl:-ml-12 2xl:-ml-20">
            <ResponsiveOptimizedLogo className="w-12 h-10 sm:w-16 sm:h-12 lg:w-14 lg:h-11 xl:w-20 xl:h-14 2xl:w-24 2xl:h-16 shrink-0 filter brightness-125 contrast-110 drop-shadow-[0_0_6px_rgba(255,255,255,0.25)]" />
            <div className="text-white min-w-0 flex flex-col justify-center">
              <div className="text-sm sm:text-xl lg:text-lg xl:text-xl 2xl:text-2xl font-bold tracking-wide sm:tracking-wider leading-tight lg:leading-none xl:whitespace-nowrap">
                {t('companyName')}
              </div>
              <div className="hidden xl:block text-xs xl:text-sm text-copper tracking-widest font-semibold mt-1">
                {t('companyTagline')}
              </div>
            </div>
          </Link>

          {/* Desktop Navigation — monté uniquement >= 1024px (évite les dropdowns Radix sur tablette) */}
          {!isCompactNav && (
          <div className="flex items-center space-x-3 xl:space-x-8">
            {navItems.slice(0, 1).map((item) => (
              <Link
                key={String(item.name)}
                href={item.href}
                className={`relative px-4 py-2 text-base font-semibold transition-colors duration-200 ${
                  pathname === item.href
                    ? "text-copper"
                    : "text-gray-300 hover:text-copper"
                }`}
              >
                {item.name}
                {pathname === item.href && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-copper" />
                )}
              </Link>
            ))}

            <DropdownMenu>
              <DropdownMenuTrigger
                className={`relative flex items-center gap-1 px-4 py-2 text-base font-semibold transition-colors duration-200 outline-none ${
                  isSolutionsActive
                    ? "text-copper"
                    : "text-gray-300 hover:text-copper"
                }`}
              >
                {stringify(t('services'))}
                <ChevronDown className="w-4 h-4" />
                {isSolutionsActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-copper" />
                )}
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-navy border-white/15 text-gray-200 min-w-[180px]">
                {solutionsItems.map((item) => (
                  <DropdownMenuItem key={item.href} asChild className="focus:bg-copper/10 focus:text-copper cursor-pointer">
                    <Link href={item.href}>{item.name}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger
                className={`relative flex items-center gap-1 px-4 py-2 text-base font-semibold transition-colors duration-200 outline-none ${
                  isCatalogueActive
                    ? "text-copper"
                    : "text-gray-300 hover:text-copper"
                }`}
              >
                {stringify(t('catalogue'))}
                <ChevronDown className="w-4 h-4" />
                {isCatalogueActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-copper" />
                )}
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-navy border-white/15 text-gray-200 min-w-[180px]">
                {catalogueItems.map((item) => (
                  <DropdownMenuItem key={item.href} asChild className="focus:bg-copper/10 focus:text-copper cursor-pointer">
                    <Link href={item.href}>{item.name}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {navItems.slice(1).map((item) => (
              <Link
                key={String(item.name)}
                href={item.href}
                className={`relative px-4 py-2 text-base font-semibold transition-colors duration-200 ${
                  pathname === item.href
                    ? "text-copper"
                    : "text-gray-300 hover:text-copper"
                }`}
              >
                {item.name}
                {pathname === item.href && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-copper" />
                )}
              </Link>
            ))}
          </div>
          )}

          {/* Desktop Buttons */}
          {!isCompactNav && (
          <div className="flex items-center space-x-4 lg:-mr-8">
            <LanguageSwitcher />
            <Button 
              variant="outline"
              className="border-copper text-copper hover:bg-copper hover:text-navy font-semibold transition-all duration-200" 
              asChild
            >
              <Link href="/contact">
                {t('contactUs')}
              </Link>
            </Button>
            <Button 
              className="bg-gradient-to-r from-copper to-sand text-navy font-bold hover:scale-105 transition-transform duration-200" 
              asChild
            >
              <Link href="/calendly">
                {t('getStarted')}
              </Link>
            </Button>
          </div>
          )}

          {/* Mobile / tablette — menu hamburger */}
          {isCompactNav && (
          <div className="flex items-center shrink-0">
            {/* Menu Button */}
            <button
              data-menu-button
              className="text-white p-2 hover:bg-copper/10 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-copper/50"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? stringify(t('closeMenu')) : stringify(t('openMenu'))}
              aria-expanded={isMobileMenuOpen}
              type="button"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
          )}
        </div>

        {/* Mobile Menu */}
        {isCompactNav && isMobileMenuOpen && (
          <div>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black/50 z-40"
              onClick={closeMobileMenu}
            />
            
            {/* Menu Content */}
            <div 
              data-mobile-menu
              className="relative z-50 bg-navy border-t border-copper/20"
            >
              <div className="px-4 py-4 space-y-2">
                {/* Navigation Links */}
                {navItems.slice(0, 1).map((item) => (
                  <Link
                    key={String(item.name)}
                    href={item.href}
                    className={`block px-4 py-3 rounded-lg transition-colors duration-200 font-semibold text-base ${
                      pathname === item.href
                        ? "text-copper bg-copper/10"
                        : "text-gray-300 hover:text-copper hover:bg-copper/5"
                    }`}
                    onClick={closeMobileMenu}
                  >
                    {item.name}
                  </Link>
                ))}

                <div className="px-4 py-2">
                  <p className="text-xs uppercase tracking-wider text-copper font-semibold mb-1">
                    {stringify(t('services'))}
                  </p>
                  {solutionsItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`block pl-3 pr-4 py-2.5 rounded-lg transition-colors duration-200 font-semibold text-base ${
                        pathname === item.href
                          ? "text-copper bg-copper/10"
                          : "text-gray-300 hover:text-copper hover:bg-copper/5"
                      }`}
                      onClick={closeMobileMenu}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>

                <div className="px-4 py-2">
                  <p className="text-xs uppercase tracking-wider text-copper font-semibold mb-1">
                    {stringify(t('catalogue'))}
                  </p>
                  {catalogueItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`block pl-3 pr-4 py-2.5 rounded-lg transition-colors duration-200 font-semibold text-base ${
                        pathname === item.href
                          ? "text-copper bg-copper/10"
                          : "text-gray-300 hover:text-copper hover:bg-copper/5"
                      }`}
                      onClick={closeMobileMenu}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>

                {navItems.slice(1).map((item) => (
                  <Link
                    key={String(item.name)}
                    href={item.href}
                    className={`block px-4 py-3 rounded-lg transition-colors duration-200 font-semibold text-base ${
                      pathname === item.href
                        ? "text-copper bg-copper/10"
                        : "text-gray-300 hover:text-copper hover:bg-copper/5"
                    }`}
                    onClick={closeMobileMenu}
                  >
                    {item.name}
                  </Link>
                ))}
                
                {/* Bottom Section */}
                <div className="pt-4 border-t border-copper/20 space-y-3">
                  {/* Get Started Button */}
                  <Button 
                    className="bg-gradient-to-r from-copper to-sand text-navy font-bold w-full hover:scale-105 transition-transform duration-200" 
                    asChild
                    onClick={closeMobileMenu}
                  >
                    <Link href="/calendly">
                      {t('getStarted')}
                    </Link>
                  </Button>
                  
                  {/* Contact Button */}
                  <Button 
                    variant="outline"
                    className="border-copper text-copper hover:bg-copper hover:text-navy font-semibold w-full transition-all duration-200" 
                    asChild
                    onClick={closeMobileMenu}
                  >
                    <Link href="/contact">
                      {t('contactUs')}
                    </Link>
                  </Button>
                  
                  {/* WhatsApp Button moved to global floating component */}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
