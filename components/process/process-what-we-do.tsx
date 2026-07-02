"use client"

import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/language-context"
import { SectionScrollHintAnchor, sectionWithScrollHintClass } from "@/components/section-scroll-hint"
import { cn } from "@/lib/utils"

export function ProcessWhatWeDo() {
  const { t } = useLanguage()

  const services = [
    { number: "01", title: t("processService1Title"), description: t("processService1Desc") },
    { number: "02", title: t("processService2Title"), description: t("processService2Desc") },
    { number: "03", title: t("processService3Title"), description: t("processService3Desc") },
    { number: "04", title: t("processService4Title"), description: t("processService4Desc") },
    { number: "05", title: t("processService5Title"), description: t("processService5Desc") },
  ]

  return (
    <section id="how-it-works" className={cn("bg-navy border-t border-white/10", sectionWithScrollHintClass)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="grid lg:grid-cols-[2fr_3fr] gap-12 lg:gap-16 xl:gap-20 items-start">
          {/* Left column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="flex items-center gap-4">
              <div className="h-px w-10 bg-copper" />
              <span className="text-xs tracking-[0.3em] text-copper uppercase font-medium">
                {t("processSlide2Label")}
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="block text-white">{t("processSlide2Title1")}</span>
              <span className="block text-copper mt-1">{t("processSlide2Title2")}</span>
            </h2>
            <p className="text-sm sm:text-base tracking-[0.15em] text-gray-500 uppercase">
              {t("processSlide2ResponseTime")}
            </p>

            <div className="space-y-4 max-w-md">
              <p className="text-base sm:text-lg text-gray-400 leading-relaxed">
                {t("processSlide2DescPart1")}
                <span className="text-white font-semibold">{t("processSlide2DescBold1")}</span>
                {t("processSlide2DescPart2")}
              </p>
              <p className="text-base sm:text-lg text-gray-400 leading-relaxed">
                {t("processSlide2DescPart3")}
                <span className="text-white font-semibold">{t("processSlide2DescBold2")}</span>
                {t("processSlide2DescPart4")}
                <span className="text-white font-semibold">{t("processSlide2DescBold3")}</span>
                {t("processSlide2DescPart5")}
              </p>
            </div>
          </motion.div>

          {/* Right column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            viewport={{ once: true }}
            className="border-t border-white/10"
          >
            {services.map((service, index) => (
              <div
                key={service.number}
                className={`grid grid-cols-[auto_1fr] gap-x-6 sm:gap-x-8 gap-y-2 py-8 sm:py-10 ${
                  index < services.length - 1 ? "border-b border-white/10" : ""
                }`}
              >
                <span className="text-sm text-gray-500 font-medium pt-1">{service.number}</span>
                <div>
                  <h3 className="text-sm sm:text-base tracking-[0.15em] text-gray-300 uppercase font-medium mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <SectionScrollHintAnchor targetId="trade-corridors" />
    </section>
  )
}
