"use client"

import { useState } from "react"
import { CatalogueServiceImage } from "@/components/catalogue/catalogue-service-image"
import { cn } from "@/lib/utils"

type CatalogueServiceMediaProps = {
  images: string[]
  videoUrl?: string
  alt: string
}

export function CatalogueServiceMedia({ images, videoUrl, alt }: CatalogueServiceMediaProps) {
  const [index, setIndex] = useState(0)
  const current = images[index] || images[0] || ""

  return (
    <div>
      <div className="relative">
        <CatalogueServiceImage
          src={current}
          alt={alt}
          className="w-full h-44 sm:h-48 rounded-none border-0 border-b border-copper/20"
        />
        {images.length > 1 ? (
          <div className="absolute bottom-2 inset-x-0 flex justify-center gap-1.5">
            {images.map((url, i) => (
              <button
                key={`${url}-${i}`}
                type="button"
                aria-label={`Image ${i + 1}`}
                onClick={() => setIndex(i)}
                className={cn(
                  "h-2 w-2 rounded-full",
                  i === index ? "bg-copper" : "bg-white/60"
                )}
              />
            ))}
          </div>
        ) : null}
      </div>
      {videoUrl ? (
        <video
          src={videoUrl}
          controls
          playsInline
          preload="metadata"
          className="w-full max-h-56 bg-black"
        />
      ) : null}
    </div>
  )
}
