"use client"

import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/language-context"
import { Globe, FileText, Truck, Landmark, Warehouse } from "lucide-react"
import Link from "next/link"
import { ROUTES } from "@/lib/site-routes"

export function ServicesContent() {
  const { t } = useLanguage()

  const services = [
    {
      id: "sourcing",
      icon: Globe,
      title: t("servicesDetail1Title"),
      description: t("servicesDetail1Desc"),
    },
    {
      id: "negotiation",
      icon: FileText,
      title: t("servicesDetail2Title"),
      description: t("servicesDetail2Desc"),
    },
    {
      id: "logistics",
      icon: Truck,
      title: t("servicesDetail3Title"),
      description: t("servicesDetail3Desc"),
    },
    {
      id: "finance",
      icon: Landmark,
      title: t("servicesDetail4Title"),
      description: t("servicesDetail4Desc"),
    },
    {
      id: "dubai-hub",
      icon: Warehouse,
      title: t("servicesDetail5Title"),
      description: t("servicesDetail5Desc"),
    },
  ]

  return (
    <section className="py-8 md:py-12 bg-gradient-to-br from-navy via-navy to-navy/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-6 py-3 bg-copper/10 border border-copper/20 rounded-full text-copper text-lg font-medium mb-8"
          >
            <Globe className="w-5 h-5 mr-2" />
            {t("services")}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight max-w-4xl mx-auto"
          >
            {t("servicesPageTitle")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto"
          >
            {t("servicesPageDescription1")}
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <motion.article
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-navy/50 backdrop-blur-sm border border-copper/20 rounded-2xl p-8 hover:border-copper/40 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-copper/20 rounded-xl flex items-center justify-center mb-5">
                <service.icon className="w-7 h-7 text-copper" />
              </div>
              <h2 className="text-xl font-bold text-white mb-3">{service.title}</h2>
              <p className="text-gray-300 leading-relaxed text-sm">{service.description}</p>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16 md:mt-20"
        >
          <div className="bg-gradient-to-r from-copper/10 to-sand/10 border border-copper/20 rounded-3xl p-10 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">{t("readyToStart")}</h3>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">{t("contactUsForConsultation")}</p>
            <Link
              href={ROUTES.accueil}
              className="inline-block bg-gradient-to-r from-copper to-sand text-navy font-bold text-lg px-8 py-4 rounded-xl hover:shadow-lg transition-all duration-300"
            >
              {t("qualifyProjectCta")}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
