"use client"

import { useLanguage } from "@/contexts/language-context"

export function ProcessStats() {
  const { t } = useLanguage()

  const stats = [
    { value: "360°", label: t("processStat1Label") },
    { value: "IFZA", label: t("processStat3Label") },
    { value: "B2B", label: t("processStat4Label") },
  ]

  return (
    <section className="bg-navy border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3">
          {stats.map((stat, index) => (
            <div
              key={stat.value}
              className={[
                "flex flex-col items-center justify-center text-center px-4 py-10 sm:py-12 md:py-14 border-white/10",
                index < stats.length - 1 ? "border-b sm:border-b-0 sm:border-r" : "",
              ].join(" ")}
            >
              <span className="text-4xl sm:text-5xl md:text-6xl font-light text-copper tracking-wide mb-3 sm:mb-4">
                {stat.value}
              </span>
              <span className="text-[10px] sm:text-xs tracking-[0.2em] text-gray-400 uppercase font-medium leading-relaxed max-w-[180px]">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
