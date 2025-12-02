"use client"

import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/language-context"
import { Globe, TrendingUp, Palette, Zap, CheckCircle } from "lucide-react"
import Link from "next/link"

export function ServicesContent() {
  const { t } = useLanguage()

  const services = [
    {
      id: "import-export",
      icon: Globe,
      title: t('importExport'),
      description: t('importExportDescription'),
      features: [
        t('sourcing'),
        t('qualityControl'),
        t('logisticsTransport'),
        t('exclusiveCatalog')
      ]
    },
    {
      id: "business-development",
      icon: TrendingUp,
      title: t('businessDevelopment'),
      description: t('businessDevelopmentDescription'),
      features: [
        t('leadGeneration'),
        t('businessDevelopment'),
        t('customerAcquisition'),
        t('salesForce')
      ]
    },
    {
      id: "branding",
      icon: Palette,
      title: t('branding'),
      description: t('brandingDescription'),
      features: [
        t('brandIdentity'),
        t('brandStrategy'),
        t('designVisualCommunication'),
        t('positioningStorytelling')
      ]
    },
    {
      id: "digital-solutions",
      icon: Zap,
      title: t('digitalSolutions'),
      description: t('digitalSolutionsDescription'),
      features: [
        t('processAutomation'),
        t('digitalSolutionsIntegration'),
        t('dataAnalysisExploitation'),
        t('digitalChangeAccompaniment')
      ]
    }
  ]

  return (
    <section className="py-8 md:py-12 bg-gradient-to-br from-navy via-navy to-navy/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Services Header */}
        <div className="text-center mb-16">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-6 py-3 bg-copper/10 border border-copper/20 rounded-full text-copper text-lg font-medium mb-8"
          >
            <Globe className="w-5 h-5 mr-2" />
            {t('services')}
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
          >
            {t('servicesPageTitle')}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-xl md:text-2xl text-copper font-semibold mb-8"
          >
            {t('servicesPageSubtitle')}
          </motion.p>

          {/* Description Lines */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="space-y-4 max-w-4xl mx-auto"
          >
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              {t('servicesPageDescription1')}
            </p>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
            </p>
          </motion.div>
        </div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-2 gap-12">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-navy/50 backdrop-blur-sm border border-copper/20 rounded-3xl p-8 hover:border-copper/40 transition-all duration-300"
            >
              {/* Service Header */}
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-16 h-16 bg-copper/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <service.icon className="w-8 h-8 text-copper" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {service.title}
                  </h2>
                  <p className="text-gray-300 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>

              {/* Features List */}
              <div className="space-y-3">
                {service.features.map((feature, featureIndex) => (
                  <motion.div
                    key={featureIndex}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: featureIndex * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-3"
                  >
                    <CheckCircle className="w-5 h-5 text-copper flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16 md:mt-20"
        >
          <div className="bg-gradient-to-r from-copper/10 to-sand/10 border border-copper/20 rounded-3xl p-12">
            <h3 className="text-3xl font-bold text-white mb-4">
              {t('readyToStart')}
            </h3>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              {t('contactUsForConsultation')}
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/contact"
                className="inline-block bg-gradient-to-r from-copper to-sand text-navy font-bold text-lg px-8 py-4 rounded-xl hover:shadow-lg transition-all duration-300"
              >
                {t('contactUs')}
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 
