"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from 'framer-motion'
import { useLanguage } from "@/contexts/language-context"
import { Mail, Phone, MapPin, Linkedin } from "lucide-react"
import { ResponsiveOptimizedLogo } from "@/components/optimized-logo"

export function Footer() {
  const { t } = useLanguage()
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-navy border-t border-copper/20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <motion.div
          className="absolute top-10 left-10 w-32 h-32 bg-copper/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-24 h-24 bg-sand/20 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.6, 0.3, 0.6] }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Grid */}
        <div className="py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <ResponsiveOptimizedLogo className="w-16 h-12 sm:w-20 sm:h-14 lg:w-24 lg:h-16 filter brightness-125 contrast-110 drop-shadow-[0_0_6px_rgba(255,255,255,0.25)]" />
              <div className="text-white text-xl font-bold tracking-wide">
                <span>{t('companyName')}</span>{' '}
                <span className="text-copper">{t('companyTagline')}</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              {t('strategicPartnerDubaiEuropeAsia')}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t('home')}</h4>
            <ul className="space-y-3 text-gray-300 text-sm">
              <li>
                <Link className="hover:text-copper transition-colors" href="/">
                  {t('home')}
                </Link>
              </li>
              <li>
                <Link className="hover:text-copper transition-colors" href="/services/">
                  {t('services')}
                </Link>
              </li>
              <li>
                <Link className="hover:text-copper transition-colors" href="/agency/">
                  {t('agency')}
                </Link>
              </li>
              <li>
                <Link className="hover:text-copper transition-colors" href="/partners/">
                  {t('globalClients')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Useful Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t('services')}</h4>
            <ul className="space-y-3 text-gray-300 text-sm">
              <li>
                <Link className="hover:text-copper transition-colors" href="/services/#import-export">
                  {t('importExport')}
                </Link>
              </li>
              <li>
                <Link className="hover:text-copper transition-colors" href="/services/#business-development">
                  {t('businessDevelopment')}
                </Link>
              </li>
              <li>
                <Link className="hover:text-copper transition-colors" href="/services/#branding">
                  {t('branding')}
                </Link>
              </li>
              <li>
                <Link className="hover:text-copper transition-colors" href="/services/#digital">
                  {t('digitalSolutions')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t('contact')}</h4>
            <ul className="space-y-3 text-gray-300 text-sm">
              <li className="flex items-start space-x-3">
                <Mail className="w-4 h-4 mt-0.5 text-copper" />
                <a className="hover:text-copper transition-colors" href="mailto:Contact@stratelink-global.com">Contact@stratelink-global.com</a>
              </li>
              <li className="flex items-start space-x-3">
                <Phone className="w-4 h-4 mt-0.5 text-copper" />
                <a className="hover:text-copper transition-colors" href="tel:+971543192348">+971 54 319 2348</a>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 mt-0.5 text-copper" />
                <span>Dubai • Europe • Asia</span>
              </li>
              <li className="flex items-start space-x-3">
                <Linkedin className="w-4 h-4 mt-0.5 text-copper" />
                <a className="hover:text-copper transition-colors" href="https://linkedin.com/company/stratelink-global" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-copper/20" />

        {/* Bottom bar */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Credits */}
          <div className="flex items-center space-x-2 text-sm">
            <span className="text-gray-400">{t('designedBy')}</span>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-1"
            >
              <Image
                src="/optimized/new-logo-16x16.png"
                alt="STRATELINK"
                width={16}
                height={16}
                className="w-4 h-4 filter brightness-110"
              />
              <span className="text-copper font-semibold">{t('companyName')}</span>
            </motion.div>
          </div>

          {/* Copyright */}
          <div className="text-gray-400 text-xs sm:text-sm">
            © {currentYear} STRATELINK GLOBAL. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}
