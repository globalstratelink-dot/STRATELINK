"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"
import { SectionScrollHintAnchor, sectionWithScrollHintClass } from "@/components/section-scroll-hint"
import { cn } from "@/lib/utils"

const CHINA_ICON = "/process/icons8-chine-emoji-48.png"

export function ProcessTradeCorridors() {
  const { t } = useLanguage()

  const corridors = [
    {
      destinationIcon: "/process/european-union.png",
      destinationAlt: "European Union",
      label: t("processCorridor1Label"),
      title: t("processCorridor1Title"),
      description: t("processCorridor1Desc"),
      tags: [
        t("processCorridor1Tag1"),
        t("processCorridor1Tag2"),
        t("processCorridor1Tag3"),
        t("processCorridor1Tag4"),
      ],
    },
    {
      destinationIcon: "/process/world-flag.png",
      destinationAlt: "United Arab Emirates",
      label: t("processCorridor2Label"),
      title: t("processCorridor2Title"),
      description: t("processCorridor2Desc"),
      tags: [
        t("processCorridor2Tag1"),
        t("processCorridor2Tag2"),
        t("processCorridor2Tag3"),
        t("processCorridor2Tag4"),
      ],
    },
    {
      destinationIcon: "/process/planet-earth.png",
      destinationAlt: "Africa",
      label: t("processCorridor3Label"),
      title: t("processCorridor3Title"),
      description: t("processCorridor3Desc"),
      tags: [
        t("processCorridor3Tag1"),
        t("processCorridor3Tag2"),
        t("processCorridor3Tag3"),
        t("processCorridor3Tag4"),
      ],
    },
  ]

  return (
    <section id="trade-corridors" className={cn("bg-navy border-t border-white/10 scroll-mt-28", sectionWithScrollHintClass)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-12 sm:mb-16"
        >
          <div className="flex items-center gap-4">
            <div className="h-px w-10 bg-copper" />
            <span className="text-xs tracking-[0.3em] text-copper uppercase font-medium">
              {t("processSlide3Label")}
            </span>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {corridors.map((corridor, index) => (
            <motion.div
              key={corridor.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col bg-[#0d1528] border border-white/10 rounded-lg p-6 sm:p-8"
            >
              <div className="flex items-center gap-3 mb-8">
                <Image
                  src={CHINA_ICON}
                  alt="China"
                  width={32}
                  height={32}
                  className="w-8 h-8 object-contain"
                />
                <ArrowRight className="w-4 h-4 text-white/70 shrink-0" />
                <Image
                  src={corridor.destinationIcon}
                  alt={corridor.destinationAlt}
                  width={32}
                  height={32}
                  className="w-8 h-8 object-contain"
                />
              </div>

              <span className="text-[10px] sm:text-xs tracking-[0.2em] text-copper uppercase font-medium mb-3">
                {corridor.label}
              </span>

              <h3 className="text-lg sm:text-xl text-white font-semibold mb-4">
                {corridor.title}
              </h3>

              <p className="text-sm sm:text-base text-gray-400 leading-relaxed mb-8 flex-1">
                {corridor.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {corridor.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] sm:text-xs tracking-wider uppercase text-copper border border-copper/40 px-2.5 py-1.5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <SectionScrollHintAnchor targetId="our-partners" />
    </section>
  )
}
