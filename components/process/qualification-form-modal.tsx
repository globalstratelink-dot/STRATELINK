"use client"

import { useMemo, useState, useEffect, useRef, useLayoutEffect } from "react"
import { ArrowLeft, ArrowRight, Check, Paperclip } from "lucide-react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { useLanguage } from "@/contexts/language-context"
import { useQualificationForm } from "@/contexts/qualification-form-context"
import {
  CHINA_OPTIONS,
  CORRIDOR_OPTIONS,
  EXPERIENCE_OPTIONS,
  FORM_STEPS,
  INCOTERM_OPTIONS,
  PAYMENT_OPTIONS,
  PRODUCT_SECTOR_IDS,
  PRODUCT_SECTOR_KEYS,
  ROLE_OPTIONS,
  TIMELINE_OPTIONS,
  VOLUME_DEFAULT_K,
  VOLUME_MAX_K,
  VOLUME_MIN_K,
  VOLUME_SCALE_LABELS,
  VOLUME_STEP_K,
  formatVolumeK,
} from "@/lib/qualification-form-data"
import { ALL_COUNTRIES } from "@/lib/all-countries"
import { CONTACT_EMAIL } from "@/lib/site-contact"
import { cn } from "@/lib/utils"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const inputClass =
  "bg-[#0d1528] border-white/15 text-gray-100 placeholder:text-gray-500 focus-visible:ring-copper/40 focus-visible:border-copper h-11 rounded-sm text-sm"
const inputClassCompact =
  "bg-[#0d1528] border-white/15 text-gray-100 placeholder:text-gray-500 focus-visible:ring-copper/40 focus-visible:border-copper h-9 text-sm rounded-sm"
const labelClass = "text-[11px] tracking-[0.2em] text-copper uppercase font-semibold block mb-2"
const labelClassCompact = "text-[11px] tracking-[0.15em] text-copper uppercase font-semibold block mb-1"
const descClass = "text-gray-300 text-sm leading-relaxed"
const descClassCompact = "text-gray-300 text-xs leading-snug"
const hintClass = "text-xs text-gray-400"
const cardDescClass = "text-gray-400"

function empty(value?: string | null) {
  return value?.trim() ? value.trim() : "—"
}

export function QualificationFormModal() {
  const { t } = useLanguage()
  const { isOpen, closeForm, step, stepIndex, form, updateForm, nextStep, prevStep, setStep, resetForm } =
    useQualificationForm()
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [volumeTouched, setVolumeTouched] = useState(false)

  useEffect(() => {
    if (isOpen) setVolumeTouched(false)
  }, [isOpen])

  const stepLabels = useMemo(
    () => [
      t("qualStepIdentity"),
      t("qualStepProfile"),
      t("qualStepCorridors"),
      t("qualStepOpportunity"),
      t("qualStepReview"),
    ],
    [t]
  )

  const toggleArray = (field: "corridors" | "productSectors", id: string) => {
    const current = form[field]
    updateForm({
      [field]: current.includes(id) ? current.filter((v) => v !== id) : [...current, id],
    })
  }

  const labelFor = (options: readonly { id: string; labelKey?: string; titleKey?: string }[], id: string | null) => {
    if (!id) return "—"
    const opt = options.find((o) => o.id === id)
    if (!opt) return id
    const key = ("labelKey" in opt && opt.labelKey) || ("titleKey" in opt && opt.titleKey)
    return key ? String(t(key as never)) : id
  }

  const reviewRows = useMemo(
    () => [
      { label: t("qualReviewFullName"), value: [form.firstName, form.lastName].filter(Boolean).join(" ") || "—" },
      { label: t("qualReviewCompany"), value: empty(form.companyName) },
      { label: t("qualReviewEmail"), value: empty(form.email) },
      { label: t("qualReviewPhone"), value: empty(form.phone) },
      {
        label: t("qualReviewCountry"),
        value: form.country || form.city ? [form.country, form.city].filter(Boolean).join(", ") : "—",
      },
      { label: t("qualReviewWebsite"), value: empty(form.website) },
      { label: t("qualReviewRole"), value: labelFor(ROLE_OPTIONS, form.role) },
      { label: t("qualReviewExperience"), value: labelFor(EXPERIENCE_OPTIONS, form.experience) },
      { label: t("qualReviewChina"), value: labelFor(CHINA_OPTIONS, form.chinaSourcing) },
      {
        label: t("qualReviewCorridors"),
        value:
          form.corridors.length > 0
            ? form.corridors.map((id) => labelFor(CORRIDOR_OPTIONS, id)).join(", ")
            : "—",
      },
      {
        label: t("qualReviewSectors"),
        value:
          form.productSectors.length > 0
            ? form.productSectors
                .map((id) => {
                  const idx = PRODUCT_SECTOR_IDS.indexOf(id as (typeof PRODUCT_SECTOR_IDS)[number])
                  return idx >= 0 ? String(t(PRODUCT_SECTOR_KEYS[idx] as never)) : id
                })
                .join(", ")
            : "—",
      },
      { label: t("qualReviewIncoterm"), value: labelFor(INCOTERM_OPTIONS, form.incoterm) },
      {
        label: t("qualReviewVolume"),
        value: volumeTouched && form.annualVolumeK !== null ? formatVolumeK(form.annualVolumeK) : "—",
      },
      { label: t("qualReviewTimeline"), value: labelFor(TIMELINE_OPTIONS, form.timeline) },
      { label: t("qualReviewPayment"), value: labelFor(PAYMENT_OPTIONS, form.payment) },
      { label: t("qualReviewBrief"), value: empty(form.projectBrief) },
    ],
    [form, t, volumeTouched]
  )

  const handleSubmit = async () => {
    if (!form.consent) return
    setSubmitting(true)
    try {
      const res = await fetch("/api/qualification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setSubmitted(true)
      }
    } catch {
      // user can retry
    } finally {
      setSubmitting(false)
    }
  }

  const handleClose = () => {
    closeForm()
    setSubmitted(false)
    resetForm()
  }

  const isIdentity = step === "identity"
  const isCorridors = step === "corridors"
  const isReview = step === "review"
  const isCompactStep = isIdentity || isCorridors
  const contentPadding = isCompactStep ? "px-4 py-3 sm:px-5 sm:py-4" : "px-4 py-4 sm:px-6 sm:py-6 md:px-8 md:py-8"
  const headerPadding = isCompactStep ? "px-4 pt-4 pb-3 sm:px-5 sm:pt-5" : "px-4 pt-5 pb-3 sm:px-6 sm:pt-6 md:px-8 md:pt-8 md:pb-4"
  const footerPadding = isCompactStep ? "px-4 py-3 sm:px-5 sm:py-4" : "px-4 py-3 sm:px-6 sm:py-5 md:px-8"
  const stepNavRef = useRef<HTMLDivElement>(null)
  const [stepIndicator, setStepIndicator] = useState({ left: 0, width: 0 })

  useLayoutEffect(() => {
    if (!isOpen) return

    const updateIndicator = () => {
      const nav = stepNavRef.current
      if (!nav) return
      const activeButton = nav.querySelector<HTMLButtonElement>(`[data-step-index="${stepIndex}"]`)
      if (!activeButton) return

      const next = {
        left: activeButton.offsetLeft,
        width: activeButton.offsetWidth,
      }

      setStepIndicator((prev) =>
        prev.left === next.left && prev.width === next.width ? prev : next
      )
    }

    updateIndicator()
    window.addEventListener("resize", updateIndicator)
    return () => window.removeEventListener("resize", updateIndicator)
  }, [stepIndex, isOpen])

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent
        className={cn(
          "w-full max-w-lg lg:max-w-xl bg-navy border border-white/15 p-0 gap-0 text-white flex flex-col overflow-hidden",
          "max-sm:fixed max-sm:inset-0 max-sm:left-0 max-sm:top-0 max-sm:translate-x-0 max-sm:translate-y-0",
          "max-sm:max-w-none max-sm:max-h-none max-sm:h-[100dvh] max-sm:rounded-none max-sm:border-0",
          "sm:w-[92vw] sm:max-h-[96vh] sm:min-h-[640px] sm:rounded-lg",
          "[&>button]:text-gray-300 [&>button]:border [&>button]:border-white/20 [&>button]:rounded-sm",
          "[&>button]:p-1.5 [&>button]:top-3 [&>button]:right-3 sm:[&>button]:top-4 sm:[&>button]:right-4 [&>button]:opacity-100"
        )}
      >
        <DialogTitle className="sr-only">{t("qualFormTitle")}</DialogTitle>

        <div className={cn("border-b border-white/10 shrink-0", headerPadding)}>
          <p className="text-sm sm:text-base md:text-lg tracking-[0.15em] sm:tracking-[0.2em] text-copper uppercase font-medium pr-8 sm:pr-10">
            {t("qualFormTitle")}
          </p>
          <div className={cn("border-t border-white/15", isCompactStep ? "mt-2.5 pt-2.5 sm:mt-3 sm:pt-3" : "mt-3 pt-3 sm:mt-4 sm:pt-4 md:mt-5 md:pt-5")}>
            <div className="relative pb-1">
              <div
                ref={stepNavRef}
                className="flex gap-3 sm:gap-4 overflow-x-auto scrollbar-hide"
              >
                {FORM_STEPS.map((s, i) => (
                  <button
                    key={s}
                    data-step-index={i}
                    type="button"
                    onClick={() => i <= stepIndex && setStep(s)}
                    className={cn(
                      "text-[11px] sm:text-xs tracking-[0.15em] uppercase whitespace-nowrap pb-3 transition-colors duration-300",
                      step === s
                        ? "text-copper"
                        : i < stepIndex
                          ? "text-gray-300 hover:text-copper"
                          : "text-gray-500 cursor-default"
                    )}
                  >
                    {stepLabels[i]}
                  </button>
                ))}
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-px bg-white/15" aria-hidden="true" />
              <div
                className="absolute bottom-0 h-0.5 bg-copper transition-all duration-500 ease-in-out"
                style={{ left: stepIndicator.left, width: stepIndicator.width }}
                aria-hidden="true"
              />
            </div>
          </div>
        </div>

        <div
          className={cn(
            contentPadding,
            "flex-1 min-h-0 overflow-y-auto",
            isReview ? "scrollbar-form" : "scrollbar-hide sm:scrollbar-hide",
            isCompactStep && "sm:overflow-hidden"
          )}
        >
          {submitted ? (
            <div className="text-center py-12">
              <p className="text-copper text-sm tracking-widest uppercase mb-4">{t("qualSubmitSuccessTitle")}</p>
              <p className="text-gray-300">{t("qualSubmitSuccessDesc")}</p>
              <Button onClick={handleClose} className="mt-8 bg-copper text-navy font-bold uppercase tracking-wider">
                {t("qualClose")}
              </Button>
            </div>
          ) : (
            <>
              <p className={cn("text-[11px] tracking-[0.25em] text-copper uppercase font-medium", isCompactStep ? "mb-2" : "mb-3")}>
                STEP {String(stepIndex + 1).padStart(2, "0")} OF 05
              </p>

              {step === "identity" && (
                <div className="space-y-3">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-0.5">{t("qualIdentityTitle")}</h3>
                    <p className={descClassCompact}>{t("qualIdentityDesc")}</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className={labelClassCompact}>{t("qualFirstName")} *</label>
                      <Input className={inputClassCompact} value={form.firstName} onChange={(e) => updateForm({ firstName: e.target.value })} placeholder={t("qualFirstNamePlaceholder")} />
                    </div>
                    <div>
                      <label className={labelClassCompact}>{t("qualLastName")} *</label>
                      <Input className={inputClassCompact} value={form.lastName} onChange={(e) => updateForm({ lastName: e.target.value })} placeholder={t("qualLastNamePlaceholder")} />
                    </div>
                  </div>
                  <div>
                    <label className={labelClassCompact}>{t("qualCompanyName")} *</label>
                    <Input className={inputClassCompact} value={form.companyName} onChange={(e) => updateForm({ companyName: e.target.value })} placeholder={t("qualCompanyPlaceholder")} />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className={labelClassCompact}>{t("qualEmail")} *</label>
                      <Input type="email" className={inputClassCompact} value={form.email} onChange={(e) => updateForm({ email: e.target.value })} placeholder="email@company.com" />
                    </div>
                    <div>
                      <label className={labelClassCompact}>{t("qualPhone")}</label>
                      <Input className={inputClassCompact} value={form.phone} onChange={(e) => updateForm({ phone: e.target.value })} placeholder="+971 54 XXX XXXX" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className={labelClassCompact}>{t("qualCountry")} *</label>
                      <Select
                        value={form.country || undefined}
                        onValueChange={(value) => updateForm({ country: value })}
                      >
                        <SelectTrigger className={cn(inputClassCompact, "w-full [&>span]:text-left [&>span]:text-gray-100")}>
                          <SelectValue placeholder={t("qualSelect")} />
                        </SelectTrigger>
                        <SelectContent
                          position="popper"
                          sideOffset={4}
                          className="z-[200] max-h-[220px] bg-[#0d1528] border-white/15 text-white [&_[data-radix-select-viewport]]:max-h-[200px]"
                        >
                          {ALL_COUNTRIES.map((country) => (
                            <SelectItem
                              key={country}
                              value={country}
                              className="text-sm text-gray-100 focus:bg-copper/20 focus:text-white"
                            >
                              {country}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className={labelClassCompact}>{t("qualCity")}</label>
                      <Input className={inputClassCompact} value={form.city} onChange={(e) => updateForm({ city: e.target.value })} placeholder={t("qualCityPlaceholder")} />
                    </div>
                  </div>
                  <div>
                    <label className={labelClassCompact}>{t("qualWebsite")}</label>
                    <Input className={inputClassCompact} value={form.website} onChange={(e) => updateForm({ website: e.target.value })} placeholder="https://linkedin.com/company/..." />
                  </div>
                </div>
              )}

              {step === "profile" && (
                <div className="space-y-5 sm:space-y-8">
                  <div>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1.5 sm:mb-2">{t("qualProfileTitle")}</h3>
                    <p className={descClass}>{t("qualProfileDesc")}</p>
                  </div>
                  <div>
                    <p className={labelClass}>{t("qualRoleLabel")}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {ROLE_OPTIONS.map((opt) => (
                        <SelectCard key={opt.id} selected={form.role === opt.id} onClick={() => updateForm({ role: opt.id })} title={String(t(opt.titleKey as never))} description={String(t(opt.descKey as never))} />
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className={labelClass}>{t("qualExperienceLabel")}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {EXPERIENCE_OPTIONS.map((opt) => (
                        <RadioCard key={opt.id} selected={form.experience === opt.id} onClick={() => updateForm({ experience: opt.id })} title={String(t(opt.labelKey as never))} />
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className={labelClass}>{t("qualChinaLabel")}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {CHINA_OPTIONS.map((opt) => (
                        <RadioCard key={opt.id} selected={form.chinaSourcing === opt.id} onClick={() => updateForm({ chinaSourcing: opt.id })} title={String(t(opt.labelKey as never))} />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {step === "corridors" && (
                <div className="space-y-3.5">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-0.5">{t("qualCorridorsTitle")}</h3>
                    <p className={descClassCompact}>{t("qualCorridorsDesc")}</p>
                  </div>
                  <div>
                    <p className={labelClassCompact}>{t("qualCorridorLabel")}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {CORRIDOR_OPTIONS.map((opt) => (
                        <CheckCard
                          key={opt.id}
                          compact
                          selected={form.corridors.includes(opt.id)}
                          onClick={() => toggleArray("corridors", opt.id)}
                          title={String(t(opt.titleKey as never))}
                          description={String(t(opt.descKey as never))}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="relative py-1.5">
                    <div className="absolute inset-x-0 top-1/2 h-px bg-white/10" />
                    <p className="relative text-center text-[10px] tracking-[0.2em] text-copper uppercase font-medium bg-navy px-3 mx-auto w-fit">
                      {t("qualSectorsDivider")}
                    </p>
                  </div>
                  <div>
                    <p className={labelClassCompact}>{t("qualSectorsLabel")}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {PRODUCT_SECTOR_IDS.map((id, i) => (
                        <button
                          key={id}
                          type="button"
                          onClick={() => toggleArray("productSectors", id)}
                          className={cn(
                            "text-[10px] tracking-wider uppercase px-2 py-1 border transition-colors leading-tight",
                            form.productSectors.includes(id)
                              ? "border-copper text-copper bg-copper/10"
                              : "border-white/25 text-gray-300 hover:border-copper/50"
                          )}
                        >
                          {t(PRODUCT_SECTOR_KEYS[i] as never)}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className={labelClassCompact}>{t("qualIncotermLabel")}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {INCOTERM_OPTIONS.map((opt) => (
                        <RadioCard
                          key={opt.id}
                          compact
                          selected={form.incoterm === opt.id}
                          onClick={() => updateForm({ incoterm: opt.id })}
                          title={String(t(opt.titleKey as never))}
                          description={String(t(opt.descKey as never))}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {step === "opportunity" && (
                <div className="space-y-5 sm:space-y-8">
                  <div>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1.5 sm:mb-2">{t("qualOpportunityTitle")}</h3>
                    <p className={descClass}>{t("qualOpportunityDesc")}</p>
                  </div>
                  <div>
                    <p className={labelClass}>{t("qualVolumeLabel")}</p>
                    <p className="text-2xl sm:text-3xl md:text-4xl text-copper font-serif font-light text-center mb-4 sm:mb-6 transition-all duration-150">
                      {volumeTouched && form.annualVolumeK !== null ? formatVolumeK(form.annualVolumeK) : "—"}
                    </p>
                    <Slider
                      min={VOLUME_MIN_K}
                      max={VOLUME_MAX_K}
                      step={VOLUME_STEP_K}
                      value={[form.annualVolumeK ?? VOLUME_DEFAULT_K]}
                      onValueChange={(v) => {
                        setVolumeTouched(true)
                        updateForm({ annualVolumeK: v[0] })
                      }}
                      className={cn(
                        "py-2",
                        "[&>span:first-child]:h-[2px] [&>span:first-child]:rounded-none [&>span:first-child]:bg-copper/25",
                        "[&>span:first-child>span]:rounded-none [&>span:first-child>span]:bg-copper",
                        "[&_[role=slider]]:h-4 [&_[role=slider]]:w-4 [&_[role=slider]]:rounded-full [&_[role=slider]]:bg-copper",
                        "[&_[role=slider]]:border-0 [&_[role=slider]]:shadow-none [&_[role=slider]]:ring-0 [&_[role=slider]]:ring-offset-0",
                        "[&_[role=slider]]:focus:outline-none [&_[role=slider]]:focus-visible:outline-none",
                        "[&_[role=slider]]:focus-visible:ring-0 [&_[role=slider]]:focus-visible:ring-offset-0"
                      )}
                    />
                    <div className="grid grid-cols-5 gap-0.5 sm:gap-1 text-[8px] sm:text-[11px] text-gray-400 mt-3">
                      {VOLUME_SCALE_LABELS.map((label) => (
                        <span key={label} className="text-center leading-tight">
                          {label}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className={labelClass}>{t("qualTimelineLabel")}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {TIMELINE_OPTIONS.map((opt) => (
                        <RadioCard key={opt.id} selected={form.timeline === opt.id} onClick={() => updateForm({ timeline: opt.id })} title={String(t(opt.labelKey as never))} />
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className={labelClass}>{t("qualPaymentLabel")}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {PAYMENT_OPTIONS.map((opt) => (
                        <RadioCard key={opt.id} selected={form.payment === opt.id} onClick={() => updateForm({ payment: opt.id })} title={String(t(opt.titleKey as never))} description={String(t(opt.descKey as never))} />
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className={labelClass}>{t("qualBriefLabel")}</p>
                    <Textarea className={cn(inputClass, "min-h-[120px] h-auto resize-none")} value={form.projectBrief} onChange={(e) => updateForm({ projectBrief: e.target.value })} placeholder={t("qualBriefPlaceholder")} />
                    <p className={cn(hintClass, "mt-2")}>{t("qualBriefHint")}</p>
                  </div>
                  <div>
                    <p className={labelClass}>{t("qualAttachLabel")}</p>
                    <label className="flex flex-col items-center justify-center border border-dashed border-white/20 rounded-sm p-4 sm:p-8 cursor-pointer hover:border-copper/40 transition-colors">
                      <Paperclip className="w-5 h-5 text-gray-400 mb-2" />
                      <span className="text-sm text-gray-300"><span className="text-copper">{t("qualAttachClick")}</span> {t("qualAttachDrag")}</span>
                      <span className={cn(hintClass, "mt-2")}>{t("qualAttachHint")}</span>
                      <input type="file" className="hidden" accept=".pdf,.xlsx,.docx" onChange={() => {}} />
                    </label>
                  </div>
                </div>
              )}

              {step === "review" && (
                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1.5 sm:mb-2">{t("qualReviewTitle")}</h3>
                    <p className={descClass}>{t("qualReviewDesc")}</p>
                  </div>
                  <div className="border-t border-white/10">
                    {reviewRows.map((row) => (
                      <div key={row.label} className="grid grid-cols-1 sm:grid-cols-[1fr_1.2fr] gap-1 sm:gap-4 py-3 sm:py-4 border-b border-white/10 text-sm">
                        <span className="text-[11px] tracking-[0.15em] text-copper uppercase font-medium">{row.label}</span>
                        <span className="text-gray-200 sm:text-right break-words">{row.value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-3 items-start border border-white/15 p-3 sm:p-4 rounded-sm">
                    <Checkbox id="consent" checked={form.consent} onCheckedChange={(v) => updateForm({ consent: v === true })} className="mt-0.5 border-copper data-[state=checked]:bg-copper data-[state=checked]:border-copper" />
                    <label htmlFor="consent" className="text-xs text-gray-300 leading-relaxed cursor-pointer">
                      {t("qualConsent1")}{" "}
                      <a href={`mailto:${CONTACT_EMAIL}`} className="text-copper hover:underline">
                        {CONTACT_EMAIL}
                      </a>
                    </label>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {!submitted && (
          <div className={cn("border-t border-white/10 flex justify-between items-center gap-2 sm:gap-4 shrink-0 pb-[max(0.75rem,env(safe-area-inset-bottom))]", footerPadding)}>
            {stepIndex > 0 ? (
              <Button type="button" variant="outline" onClick={prevStep} className="border-white/25 bg-transparent text-gray-200 hover:bg-white/5 uppercase tracking-wider text-[10px] sm:text-xs px-3 sm:px-4 h-9 sm:h-10">
                <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />{t("qualBack")}
              </Button>
            ) : (<div />)}
            {step === "review" ? (
              <Button type="button" onClick={handleSubmit} disabled={!form.consent || submitting} className="bg-copper hover:bg-copper/90 text-navy font-bold uppercase tracking-wider text-[10px] sm:text-xs px-4 sm:px-6 h-9 sm:h-10">
                {submitting ? t("qualSubmitting") : t("qualSubmit")}<ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1.5 sm:ml-2" />
              </Button>
            ) : (
              <Button type="button" onClick={nextStep} className="bg-copper hover:bg-copper/90 text-navy font-bold uppercase tracking-wider text-[10px] sm:text-xs px-4 sm:px-6 h-9 sm:h-10">
                {step === "opportunity" ? t("qualReviewBtn") : t("qualContinue")}<ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1.5 sm:ml-2" />
              </Button>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

function CircleIndicator({ selected }: { selected: boolean }) {
  return (
    <div className={cn("w-4 h-4 rounded-full border shrink-0 flex items-center justify-center transition-colors", selected ? "border-copper bg-copper" : "border-white/30 bg-transparent")}>
      {selected && <Check className="w-2.5 h-2.5 text-navy" strokeWidth={3} />}
    </div>
  )
}

function SelectCard({ selected, onClick, title, description }: { selected: boolean; onClick: () => void; title: string; description: string }) {
  return (
    <button type="button" onClick={onClick} className={cn("flex gap-3 text-left p-3 sm:p-4 border rounded-sm transition-colors w-full", selected ? "border-copper bg-copper/5" : "border-white/15 hover:border-white/30")}>
      <CircleIndicator selected={selected} />
      <div><p className="text-xs font-semibold text-gray-100 uppercase tracking-wide">{title}</p><p className={cn("text-xs mt-1", cardDescClass)}>{description}</p></div>
    </button>
  )
}

function RadioCard({
  selected,
  onClick,
  title,
  description,
  compact,
}: {
  selected: boolean
  onClick: () => void
  title: string
  description?: string
  compact?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex text-left border rounded-sm transition-colors w-full",
        compact ? "gap-2 p-2.5 items-start" : "gap-3 p-3 sm:p-4",
        selected ? "border-copper bg-copper/5" : "border-white/15 hover:border-white/30"
      )}
    >
      <CircleIndicator selected={selected} />
      <div className="min-w-0">
        <p className={cn("font-semibold text-gray-100 uppercase tracking-wide", compact ? "text-[11px] leading-tight" : "text-xs")}>
          {title}
        </p>
        {description && (
          <p className={cn(cardDescClass, compact ? "text-[10px] mt-0.5 leading-snug line-clamp-2" : "text-xs mt-1")}>
            {description}
          </p>
        )}
      </div>
    </button>
  )
}

function CheckCard({
  selected,
  onClick,
  title,
  description,
  compact,
}: {
  selected: boolean
  onClick: () => void
  title: string
  description: string
  compact?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex text-left border rounded-sm transition-colors",
        compact ? "gap-2 p-2.5 items-start" : "gap-3 p-3 sm:p-4",
        selected ? "border-copper bg-copper/5" : "border-white/15 hover:border-white/30"
      )}
    >
      <div
        className={cn(
          "w-4 h-4 border shrink-0 flex items-center justify-center transition-colors",
          compact ? "mt-0" : "mt-0.5",
          selected ? "border-copper bg-copper" : "border-white/30"
        )}
      >
        {selected && <Check className="w-2.5 h-2.5 text-navy" strokeWidth={3} />}
      </div>
      <div className="min-w-0">
        <p className={cn("font-semibold text-gray-100 uppercase tracking-wide", compact ? "text-[11px] leading-tight" : "text-xs")}>
          {title}
        </p>
        <p className={cn(cardDescClass, compact ? "text-[10px] mt-0.5 leading-snug line-clamp-2" : "text-xs mt-1")}>
          {description}
        </p>
      </div>
    </button>
  )
}
