"use client"

import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/language-context"

export function WhyChooseStratelink() {
  const { t } = useLanguage()

  return (
    <section id="why-stratelink" className="py-20 bg-gradient-to-br from-navy/95 to-navy relative scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-4 py-2 bg-copper/20 backdrop-blur-sm border border-copper/30 rounded-full text-copper font-semibold text-sm mb-6"
          >
            <span className="w-2 h-2 bg-copper rounded-full mr-2"></span>
            {t("whyUsBadge")}
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="title-section text-white mb-6"
          >
            {t("whyChooseStratelinkGlobal")}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-xl text-gray-300 max-w-4xl mx-auto"
          >
            {t("excellenceAtServiceOfGrowth")}
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
        >
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
            className="bg-navy/50 backdrop-blur-sm border border-copper/20 rounded-2xl p-8 hover:border-copper/40 transition-all duration-300 group"
          >
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-copper/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-copper/30 transition-all duration-300">
                <span className="text-2xl font-bold text-copper">1</span>
              </div>
              <div className="flex-1">
                <h3 className="title-card text-white mb-4">{t("privilegedMarketAccess")}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{t("privilegedMarketAccessDesc")}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            viewport={{ once: true }}
            className="bg-navy/50 backdrop-blur-sm border border-copper/20 rounded-2xl p-8 hover:border-copper/40 transition-all duration-300 group"
          >
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-copper/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-copper/30 transition-all duration-300">
                <span className="text-2xl font-bold text-copper">2</span>
              </div>
              <div className="flex-1">
                <h3 className="title-card text-white mb-4">{t("customerAcquisitionRetention")}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{t("customerAcquisitionRetentionDesc")}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            viewport={{ once: true }}
            className="bg-navy/50 backdrop-blur-sm border border-copper/20 rounded-2xl p-8 hover:border-copper/40 transition-all duration-300 group"
          >
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-copper/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-copper/30 transition-all duration-300">
                <span className="text-2xl font-bold text-copper">3</span>
              </div>
              <div className="flex-1">
                <h3 className="title-card text-white mb-4">{t("turnkeySolutions")}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{t("turnkeySolutionsDesc")}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            viewport={{ once: true }}
            className="bg-navy/50 backdrop-blur-sm border border-copper/20 rounded-2xl p-8 hover:border-copper/40 transition-all duration-300 group"
          >
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-copper/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-copper/30 transition-all duration-300">
                <span className="text-2xl font-bold text-copper">4</span>
              </div>
              <div className="flex-1">
                <h3 className="title-card text-white mb-4">{t("rapidReliableDeployment")}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{t("rapidReliableDeploymentDesc")}</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
