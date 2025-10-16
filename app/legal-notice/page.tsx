"use client"

import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/language-context"
import { Mail, Phone, Building2, FileText, User } from "lucide-react"
import { Footer } from "@/components/footer"

export default function LegalNoticePage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-navy pt-24 md:pt-32">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 bg-copper/30 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-64 h-64 bg-sand/30 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {t('legalNoticeTitle')}
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-copper to-sand mx-auto" />
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-copper/20"
          >
            {/* Site Publisher */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <Building2 className="w-6 h-6 text-copper" />
                <h2 className="text-2xl font-bold text-white">{t('sitePublisher')}</h2>
              </div>
              <div className="space-y-3 text-gray-300">
                <p className="text-lg font-semibold text-white">{t('companyLegalName')}</p>
              </div>
            </div>

            {/* Business License */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-6 h-6 text-copper" />
                <h2 className="text-2xl font-bold text-white">{t('businessLicense')}</h2>
              </div>
              <p className="text-gray-300">{t('businessLicenseNumber')}</p>
            </div>

            {/* Headquarters */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <Building2 className="w-6 h-6 text-copper" />
                <h2 className="text-2xl font-bold text-white">{t('headquarters')}</h2>
              </div>
              <p className="text-gray-300">{t('headquartersAddress')}</p>
            </div>

            {/* Contact */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <Mail className="w-6 h-6 text-copper" />
                <h2 className="text-2xl font-bold text-white">Email</h2>
              </div>
              <a 
                href="mailto:admin@stratelink-global.com" 
                className="text-copper hover:text-sand transition-colors"
              >
                admin@stratelink-global.com
              </a>
            </div>

            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <Phone className="w-6 h-6 text-copper" />
                <h2 className="text-2xl font-bold text-white">Téléphone</h2>
              </div>
              <a 
                href="tel:+971543192348" 
                className="text-copper hover:text-sand transition-colors"
              >
                +971 543 192 348
              </a>
            </div>

            {/* Legal Representative */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <User className="w-6 h-6 text-copper" />
                <h2 className="text-2xl font-bold text-white">{t('legalRepresentative')}</h2>
              </div>
              <p className="text-gray-300">{t('legalRepName')}</p>
            </div>

            {/* Activities */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Building2 className="w-6 h-6 text-copper" />
                <h2 className="text-2xl font-bold text-white">{t('activities')}</h2>
              </div>
              <p className="text-gray-300">{t('activitiesList')}</p>
            </div>
          </motion.div>

          {/* Last Updated */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 text-center text-gray-400 text-sm"
          >
            <p>Last updated: October 2025</p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

