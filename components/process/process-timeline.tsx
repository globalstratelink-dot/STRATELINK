"use client"

import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/language-context"

export function ProcessTimeline() {
  const { t } = useLanguage()

  const steps = [
    { number: "01", title: t("processTimeline1Title"), description: t("processTimeline1Desc") },
    { number: "02", title: t("processTimeline2Title"), description: t("processTimeline2Desc") },
    { number: "03", title: t("processTimeline3Title"), description: t("processTimeline3Desc") },
    { number: "04", title: t("processTimeline4Title"), description: t("processTimeline4Desc") },
  ]

  const stepCircleClass =
    "relative z-10 rounded-full border-2 border-copper/60 bg-navy flex items-center justify-center transition-all duration-300 cursor-pointer hover:border-copper hover:bg-copper/10 hover:shadow-[0_0_20px_rgba(169,121,104,0.35)]"

  return (
    <section className="bg-navy border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-14 sm:mb-16 lg:mb-20"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-10 bg-copper" />
            <span className="text-xs tracking-[0.3em] text-copper uppercase font-medium">
              {t("processSlide5Label")}
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
            <span className="text-white">{t("processSlide5Title1")}</span>{" "}
            <span className="text-copper italic">{t("processSlide5Title2")}</span>
          </h2>
        </motion.div>

        {/* Desktop timeline */}
        <div className="hidden lg:block">
          <div className="relative">
            <div className="absolute top-6 left-[12.5%] right-[12.5%] h-px bg-copper/40" />

            <div className="grid grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center text-center"
                >
                  <div className={`${stepCircleClass} w-12 h-12 mb-8`}>
                    <span className="text-sm text-copper font-semibold tracking-wider">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="text-sm tracking-[0.15em] text-white uppercase font-semibold mb-3 min-h-[2.5rem] flex items-start justify-center">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile / tablet timeline */}
        <div className="lg:hidden space-y-0">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              viewport={{ once: true }}
              className="relative flex gap-5 sm:gap-6 pb-10 last:pb-0"
            >
              {index < steps.length - 1 && (
                <div className="absolute left-[23px] sm:left-[27px] top-12 bottom-0 w-px bg-copper/30" />
              )}

              <div className={`${stepCircleClass} shrink-0 w-12 h-12 sm:w-14 sm:h-14`}>
                <span className="text-sm text-copper font-semibold">{step.number}</span>
              </div>

              <div className="pt-1 min-w-0">
                <h3 className="text-sm sm:text-base tracking-[0.12em] text-white uppercase font-semibold mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
