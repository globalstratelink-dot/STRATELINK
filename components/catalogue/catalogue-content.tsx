"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, CheckCircle, Layers } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { CatalogueServiceImage } from "@/components/catalogue/catalogue-service-image"
import type { CatalogueService } from "@/lib/catalogue-types"
import { Button } from "@/components/ui/button"

export function CatalogueContent() {
  const { t, language } = useLanguage()
  const [services, setServices] = useState<CatalogueService[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    const loadServices = () => {
      setLoading(true)
      fetch("/api/catalogue/", { cache: "no-store" })
        .then((res) => res.json())
        .then((data) => {
          if (!cancelled) setServices(data.services || [])
        })
        .catch(() => {
          if (!cancelled) setServices([])
        })
        .finally(() => {
          if (!cancelled) setLoading(false)
        })
    }

    loadServices()

    const onVisible = () => {
      if (document.visibilityState === "visible") loadServices()
    }
    document.addEventListener("visibilitychange", onVisible)

    return () => {
      cancelled = true
      document.removeEventListener("visibilitychange", onVisible)
    }
  }, [])

  const label = (service: CatalogueService, field: "name" | "description" | "audience") => {
    const isFr = language === "fr"
    if (field === "name") return isFr ? service.nameFr : service.nameEn
    if (field === "description") return isFr ? service.descriptionFr : service.descriptionEn
    return isFr ? service.audienceFr : service.audienceEn
  }

  const includes = (service: CatalogueService) =>
    (language === "fr" ? service.includesFr : service.includesEn).slice(0, 4)

  const quoteSubject = (service: CatalogueService) =>
    encodeURIComponent(
      language === "fr"
        ? `Demande de devis - ${service.nameFr}`
        : `Quote request - ${service.nameEn}`
    )

  return (
    <section className="py-8 md:py-12 bg-gradient-to-br from-navy via-navy to-navy/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-5 py-2.5 bg-copper/10 border border-copper/20 rounded-full text-copper text-sm font-medium mb-6"
          >
            <Layers className="w-4 h-4 mr-2" />
            {t("catalogueBadge")}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight"
          >
            {t("catalogueTitle")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto"
          >
            {t("catalogueSubtitle")}
          </motion.p>
        </div>

        {loading ? (
          <p className="text-center text-gray-400">{t("loading")}</p>
        ) : services.length === 0 ? (
          <p className="text-center text-gray-400">{t("catalogueEmpty")}</p>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
            {services.map((service, index) => (
              <motion.article
                key={service.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="bg-navy/50 backdrop-blur-sm border border-copper/20 rounded-2xl overflow-hidden hover:border-copper/40 transition-all duration-300 flex flex-col"
              >
                <CatalogueServiceImage
                  src={service.imageUrl}
                  alt={label(service, "name")}
                  className="w-full h-44 sm:h-48 rounded-none border-0 border-b border-copper/20"
                />

                <div className="p-6 md:p-7 flex flex-col flex-1">
                  <h2 className="text-xl md:text-2xl font-bold text-white mb-2">{label(service, "name")}</h2>
                  <p className="text-gray-300 text-sm leading-relaxed line-clamp-2 mb-5">{label(service, "description")}</p>

                  <div className="mb-4">
                    <p className="text-[11px] tracking-[0.15em] uppercase text-copper font-semibold mb-2">
                      {t("catalogueIncludes")}
                    </p>
                    <ul className="space-y-2">
                      {includes(service).map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-gray-300">
                          <CheckCircle className="w-4 h-4 text-copper shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-6">
                    <p className="text-[11px] tracking-[0.15em] uppercase text-copper font-semibold mb-1">
                      {t("catalogueAudience")}
                    </p>
                    <p className="text-sm text-gray-300">{label(service, "audience")}</p>
                  </div>

                  <Button
                    asChild
                    className="mt-auto w-full bg-gradient-to-r from-copper to-sand text-navy font-bold uppercase tracking-wider text-xs sm:text-sm"
                  >
                    <Link href={`/contact?subject=${quoteSubject(service)}`}>
                      {t("catalogueCta")}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
