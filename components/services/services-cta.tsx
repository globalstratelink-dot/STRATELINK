"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from 'lucide-react'
import { useLanguage } from "@/contexts/language-context"
import Link from "next/link"

export function ServicesCTA() {
  const { t } = useLanguage()

  return (
    <section className="py-20 bg-gradient-to-r from-copper/10 via-sand/10 to-copper/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold text-white mb-6">
          Ready to Transform Your Business?
        </h2>
        <p className="text-xl text-gray-300 mb-8">
          Let's discuss how our strategic solutions can drive your success.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="bg-copper hover:bg-copper/90 text-navy font-semibold px-8 py-4 transform hover:scale-105 transition-all duration-300"
            asChild
          >
            <Link href="/contact">
              {t('contact')}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-2 border-copper text-copper hover:bg-copper hover:text-navy px-8 py-4"
            asChild
          >
            <Link href="/portfolio">View Our Work</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
