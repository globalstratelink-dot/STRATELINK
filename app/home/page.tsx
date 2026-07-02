"use client"

import { Footer } from "@/components/footer"
import { ProcessHero } from "@/components/process/process-hero"
import { ProcessStats } from "@/components/process/process-stats"
import { ProcessWhatWeDo } from "@/components/process/process-what-we-do"
import { ProcessTradeCorridors } from "@/components/process/process-trade-corridors"
import { ProcessWhoWeWorkWith } from "@/components/process/process-who-we-work-with"
import { ProcessTimeline } from "@/components/process/process-timeline"
import { ProcessCta } from "@/components/process/process-cta"
import { QualificationFormModal } from "@/components/process/qualification-form-modal"
import { QualificationFormProvider } from "@/contexts/qualification-form-context"

export default function HomePage() {
  return (
    <QualificationFormProvider>
      <div className="min-h-screen bg-navy">
        <ProcessHero />
        <ProcessStats />
        <ProcessWhatWeDo />
        <ProcessTradeCorridors />
        <ProcessWhoWeWorkWith />
        <ProcessTimeline />
        <ProcessCta />
        <Footer />
        <QualificationFormModal />
      </div>
    </QualificationFormProvider>
  )
}
