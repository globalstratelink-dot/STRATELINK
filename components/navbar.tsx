"use client"

import { useState, useEffect, useCallback, useMemo, useRef } from "react"
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
  const [isMobile, setIsMobile] = useState(false)
  const { t } = useLanguage()

  const stringify = (value: string | string[]) => Array.isArray(value) ? value.join(' ') : value

  // Détecter si c'est mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

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
    { name: stringify(t('services')), href: "/services" },
    { name: stringify(t('agency')), href: "/agency" },
    { name: stringify(t('contact')), href: "/contact" },
  ], [t])

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-navy shadow-lg" 
          : "bg-navy md:bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-20 md:h-24 pt-2 md:pt-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-4">
            <ResponsiveOptimizedLogo className="w-16 h-12 sm:w-20 sm:h-14 lg:w-24 lg:h-16 filter brightness-125 contrast-110 drop-shadow-[0_0_6px_rgba(255,255,255,0.25)]" />
                          <div className="text-white h-12 sm:h-14 lg:h-16 flex flex-col justify-center">
                <div className="h-full flex items-center text-lg sm:text-xl lg:text-2xl font-bold tracking-wider leading-none whitespace-nowrap">
                  {t('companyName')}
                </div>
                <div className="hidden md:block text-xs sm:text-sm text-copper tracking-widest font-semibold mt-1">
                  {t('companyTagline')}
                </div>
              </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={String(item.name)}
                href={item.href}
                className={`relative px-4 py-2 text-sm font-semibold transition-colors duration-200 ${
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

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center space-x-4">
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
                Get Started
              </Link>
            </Button>
          </div>

          {/* Mobile Buttons */}
          <div className="md:hidden flex items-center">
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
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
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
                {navItems.map((item) => (
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
                      Get Started
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
