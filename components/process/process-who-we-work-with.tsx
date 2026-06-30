"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Factory } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function ProcessWhoWeWorkWith() {
  const { t } = useLanguage()

  const clients = [
    {
      icon: (
        <Factory className="w-5 h-5 text-copper" strokeWidth={1.5} />
      ),
      title: t("processClient1Title"),
      description: t("processClient1Desc"),
    },
    {
      icon: (
        <Image
          src="/process/planet-earth.png"
          alt=""
          width={24}
          height={24}
          className="w-6 h-6 object-contain"
        />
      ),
      title: t("processClient2Title"),
      description: t("processClient2Desc"),
    },
    {
      icon: (
        <span className="text-lg leading-none" role="img" aria-hidden="true">
          🏗️
        </span>
      ),
      title: t("processClient3Title"),
      description: t("processClient3Desc"),
    },
    {
      icon: (
        <Image
          src="/process/world-flag.png"
          alt=""
          width={24}
          height={24}
          className="w-6 h-6 object-contain"
        />
      ),
      title: t("processClient4Title"),
      description: t("processClient4Desc"),
    },
  ]

  return (
    <section className="bg-navy border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="grid lg:grid-cols-[2fr_3fr] gap-12 lg:gap-16 xl:gap-20 items-start">
          {/* Left column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="space-y-8 lg:sticky lg:top-28"
          >
            <div className="flex items-center gap-4">
              <div className="h-px w-10 bg-copper" />
              <span className="text-xs tracking-[0.3em] text-copper uppercase font-medium">
                {t("processSlide4Label")}
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="block text-white">{t("processSlide4Title1")}</span>
              <span className="block text-copper mt-2 sm:mt-3">
                <span className="block">{t("processSlide4Title2")}</span>
                {t("processSlide4Title2b") ? (
                  <span className="block">{t("processSlide4Title2b")}</span>
                ) : null}
              </span>
            </h2>

            <div className="space-y-4 max-w-md">
              <p className="text-base sm:text-lg text-gray-400 leading-relaxed">
                {t("processSlide4Description")}
              </p>
              <p className="text-base sm:text-lg text-gray-400 leading-relaxed">
                {t("processSlide4Description2")}
              </p>
            </div>
          </motion.div>

          {/* Right column — client cards */}
          <div className="space-y-4">
            {clients.map((client, index) => (
              <motion.div
                key={client.title}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="group flex gap-5 sm:gap-6 bg-[#0d1528] border border-white/10 hover:border-copper/60 rounded-lg p-5 sm:p-6 transition-colors duration-300"
              >
                <div className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-navy border border-white/10 rounded-lg flex items-center justify-center">
                  {client.icon}
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm sm:text-base tracking-[0.12em] text-white uppercase font-semibold mb-2">
                    {client.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
                    {client.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
