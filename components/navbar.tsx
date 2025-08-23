"use client"

import { useState, useEffect, useCallback, useMemo, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X, Languages } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useMobileDetection } from "@/hooks/use-mobile-detection"
import { ResponsiveOptimizedLogo } from "@/components/optimized-logo"

export function Navbar() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const { t } = useLanguage()
  const { isMobile } = useMobileDetection()

  // Handle mobile menu toggle
  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(prev => !prev)
  }

  // Handle scroll effect
  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 50)
  }, [])

  // Throttled scroll handler
  const throttledScrollHandler = useCallback(() => {
    let timeoutId: NodeJS.Timeout
    return () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(handleScroll, 100)
    }
  }, [handleScroll])

  useEffect(() => {
    const scrollHandler = throttledScrollHandler()
    window.addEventListener("scroll", scrollHandler)
    return () => window.removeEventListener("scroll", scrollHandler)
  }, [throttledScrollHandler])

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false)
      }
    }

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  const navItems = useMemo(() => [
    { name: t('home'), href: "/" },
    { name: t('services'), href: "/services" },
    { name: t('agency'), href: "/agency" },
    { name: t('contact'), href: "/contact" },
  ], [t])

  return (
    <motion.nav 
      className={`fixed w-full z-50 transition-all duration-500 pt-[7px] ${
        isScrolled 
          ? "bg-navy/95 backdrop-blur-md shadow-2xl border-b border-copper/30" 
          : "bg-navy md:bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20 lg:h-24">
          {/* Logo */}
          <div>
            <Link href="/" className="flex items-center space-x-4 lg:space-x-5">
              <div className="relative">
                <ResponsiveOptimizedLogo />
              </div>
              <div className="text-white">
                <div className="text-lg sm:text-xl lg:text-2xl font-bold tracking-wider">
                  STRATELINK
                </div>
                <div className="text-sm sm:text-base lg:text-lg text-copper tracking-widest font-semibold">
                  GLOBAL
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <div key={item.name} className={`${!isMobile ? 'hover:scale-105' : ''} transition-transform duration-200`}>
                <Link
                  href={item.href}
                  className={`relative px-4 py-2 text-sm font-semibold transition-colors duration-200 ${
                    pathname === item.href
                      ? "text-copper"
                      : "text-gray-300 hover:text-copper"
                  }`}
                >
                  {item.name}
                  {pathname === item.href && (
                    <div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-copper"
                    />
                  )}
                </Link>
              </div>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSwitcher />
            <Button 
              className="bg-gradient-to-r from-copper to-sand text-navy font-bold" 
              asChild
            >
              <Link href="/contact">
                {t('contactUs')}
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2 hover:bg-copper/10 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-copper/50 z-50"
            onClick={handleMobileMenuToggle}
            aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              ref={mobileMenuRef}
              className="md:hidden bg-navy border-t border-copper/20 overflow-hidden z-50"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <div className="px-4 pt-4 pb-6 space-y-1">
                {navItems.map((item, index) => (
                  <div key={item.name}>
                    <Link
                      href={item.href}
                      className={`block px-4 py-3 rounded-lg transition-colors duration-200 font-semibold text-base ${
                        pathname === item.href
                          ? "text-copper bg-copper/10"
                          : "text-gray-300 hover:text-copper hover:bg-copper/5"
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </div>
                ))}
                <div className="flex flex-col space-y-3 px-4 pt-6 border-t border-copper/20">
                  <div className="flex justify-center">
                    <LanguageSwitcher />
                  </div>
                  <Button 
                    className="bg-gradient-to-r from-copper to-sand text-navy font-bold w-full" 
                    asChild
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Link href="/contact">
                      {t('contactUs')}
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}
