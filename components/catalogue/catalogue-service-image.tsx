"use client"

import { useState } from "react"
import { ImageIcon } from "lucide-react"
import { CATALOGUE_PLACEHOLDER_IMAGE } from "@/lib/catalogue-types"
import { cn } from "@/lib/utils"

type CatalogueServiceImageProps = {
  src?: string
  alt: string
  className?: string
  imageClassName?: string
  fallbackClassName?: string
}

export function CatalogueServiceImage({
  src,
  alt,
  className,
  imageClassName,
  fallbackClassName,
}: CatalogueServiceImageProps) {
  const [failed, setFailed] = useState(false)
  const resolved = src?.trim()
  const showImage = Boolean(resolved) && !failed

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-[#0d1528] border border-white/10",
        className
      )}
    >
      {showImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={resolved}
          alt={alt}
          className={cn("h-full w-full object-cover", imageClassName)}
          onError={() => setFailed(true)}
        />
      ) : (
        <div
          className={cn(
            "flex h-full w-full items-center justify-center bg-copper/10 text-copper/70",
            fallbackClassName
          )}
        >
          <ImageIcon className="h-6 w-6" aria-hidden />
        </div>
      )}
    </div>
  )
}

export function resolveCatalogueImageUrl(src?: string) {
  const trimmed = src?.trim()
  return trimmed || CATALOGUE_PLACEHOLDER_IMAGE
}
