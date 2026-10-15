"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { ArrowRight, CheckCircle, ChevronLeft, ChevronRight, Play } from "lucide-react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { CatalogueServiceImage } from "@/components/catalogue/catalogue-service-image"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import { ROUTES } from "@/lib/site-routes"
import type { CatalogueService } from "@/lib/catalogue-types"
import { cn } from "@/lib/utils"

type CatalogueServiceDetailProps = {
  service: CatalogueService | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

type MediaItem = { kind: "image" | "video"; url: string }

export function CatalogueServiceDetail({ service, open, onOpenChange }: CatalogueServiceDetailProps) {
  const { t, language } = useLanguage()
  const [index, setIndex] = useState(0)

  const media = useMemo<MediaItem[]>(() => {
    if (!service) return []
    const images = (service.imageUrls?.length ? service.imageUrls : service.imageUrl ? [service.imageUrl] : [])
      .map((url) => url.trim())
      .filter(Boolean)
      .map((url) => ({ kind: "image" as const, url }))
    const video = service.videoUrl?.trim()
    return video ? [...images, { kind: "video" as const, url: video }] : images
  }, [service])

  useEffect(() => {
    setIndex(0)
  }, [service?.id])

  if (!service) return null

  const isFr = language === "fr"
  const name = isFr ? service.nameFr : service.nameEn
  const description = isFr ? service.descriptionFr : service.descriptionEn
  const includes = isFr ? service.includesFr : service.includesEn
  const audience = isFr ? service.audienceFr : service.audienceEn
  const current = media[index] || media[0]
  const quoteSubject = encodeURIComponent(isFr ? `Demande de devis - ${service.nameFr}` : `Quote request - ${service.nameEn}`)

  const show = (next: number) => {
    if (!media.length) return
    setIndex((next + media.length) % media.length)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl w-[calc(100%-1.25rem)] max-h-[92vh] overflow-y-auto border border-copper/30 bg-navy p-4 text-white shadow-2xl shadow-black/40 sm:p-6 sm:rounded-2xl [&>button]:text-sand [&>button]:opacity-100 [&>button]:hover:text-white">
        <DialogTitle className="sr-only">{name}</DialogTitle>
        <div className="grid gap-5 lg:grid-cols-[4.25rem_minmax(0,1.15fr)_minmax(0,0.95fr)] lg:gap-6">
          <div className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-y-auto lg:max-h-[32rem]">
            {media.map((item, i) => (
              <button
                key={`${item.kind}-${item.url}-${i}`}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={item.kind === "video" ? (isFr ? "Vidéo" : "Video") : `${isFr ? "Image" : "Image"} ${i + 1}`}
                className={cn(
                  "relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border bg-[#0d1528]",
                  i === index ? "border-copper ring-1 ring-copper" : "border-copper/25"
                )}
              >
                {item.kind === "image" ? (
                  <CatalogueServiceImage src={item.url} alt="" className="h-full w-full border-0 bg-[#0d1528]" />
                ) : (
                  <span className="flex h-full w-full items-center justify-center bg-navy text-copper">
                    <Play className="h-5 w-5 fill-copper" />
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="relative min-h-[16rem] overflow-hidden rounded-xl border border-copper/20 bg-[#0d1528] lg:min-h-[32rem]">
            {current?.kind === "video" ? (
              <video
                key={current.url}
                src={current.url}
                controls
                playsInline
                preload="metadata"
                className="h-full max-h-[32rem] w-full bg-black object-contain"
              />
            ) : (
              <CatalogueServiceImage
                src={current?.url}
                alt={name}
                className="h-full min-h-[16rem] w-full border-0 bg-[#0d1528] lg:min-h-[32rem]"
                imageClassName="object-contain"
              />
            )}
            {media.length > 1 ? (
              <>
                <button
                  type="button"
                  aria-label={isFr ? "Précédent" : "Previous"}
                  onClick={() => show(index - 1)}
                  className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-copper/40 bg-navy/90 text-sand"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  aria-label={isFr ? "Suivant" : "Next"}
                  onClick={() => show(index + 1)}
                  className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-copper/40 bg-navy/90 text-sand"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            ) : null}
          </div>

          <div className="flex flex-col lg:py-1">
            <h2 className="pr-8 text-xl font-bold leading-snug text-white sm:text-2xl">{name}</h2>
            <p className="mt-3 text-sm leading-relaxed text-gray-300 whitespace-pre-line">{description}</p>

            {includes.length > 0 ? (
              <div className="mt-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-copper">{t("catalogueIncludes")}</p>
                <ul className="mt-2 space-y-2">
                  {includes.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-300">
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-copper" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {audience ? (
              <div className="mt-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-copper">{t("catalogueAudience")}</p>
                <p className="mt-2 text-sm text-gray-300">{audience}</p>
              </div>
            ) : null}

            <Button asChild className="mt-8 w-full bg-gradient-to-r from-copper to-sand font-bold uppercase tracking-wider text-navy hover:opacity-90 sm:w-auto">
              <Link href={`${ROUTES.contact}?subject=${quoteSubject}`}>
                {t("catalogueCta")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
