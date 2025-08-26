"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone, MapPin, Clock } from 'lucide-react'
import { useLanguage } from "@/contexts/language-context"

export function ContactInfo() {
  const { t } = useLanguage()

  const getMapsHref = (query: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`

  const contactMethods = [
    {
      icon: <Mail className="w-6 h-6 text-copper" />,
      title: t('emailUs'),
      details: "Contact@stratelink-global.com",
      description: t('weWillRespondWithin24Hours')
    },
    {
      icon: <Phone className="w-6 h-6 text-copper" />,
      title: t('callUs'),
      details: "00971543192348",
      description: t('monFri9AM6PMEST')
    },
    {
      icon: <MapPin className="w-6 h-6 text-copper" />,
      title: t('visitUs'),
      details: "Dubai, United Arab Emirates",
      description: t('globalOfficesWorldwide'),
      mapsQuery: "Dubai, United Arab Emirates"
    },
    {
      icon: <Clock className="w-6 h-6 text-copper" />,
      title: t('businessHours'),
      details: t('support24HoursAvailable'),
      description: t('weAreHereWhenYouNeedUs')
    }
  ]

  const offices = [
    {
      city: "Dubai",
      address: "Building A1, Dubai Digital Park\nDubai Silicon Oasis\nDubai, United Arab Emirates",
      phone: "00971543192348"
    }
  ]

  return (
    <div className="space-y-8">
      {/* Contact Methods */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {contactMethods.map((method, index) => (
          <Card key={index} className="bg-navy/50 border-copper/20 hover:border-copper/50 transition-all duration-300 group">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-copper/10 rounded-xl flex items-center justify-center group-hover:bg-copper/20 transition-colors duration-300">
                  {method.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-white font-semibold mb-2 group-hover:text-copper transition-colors duration-300">
                    {method.title}
                  </h3>
                  {"mapsQuery" in method && method.mapsQuery ? (
                    <a
                      href={getMapsHref(method.mapsQuery as string)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-copper font-medium mb-2 break-words leading-tight underline underline-offset-4"
                    >
                      {method.details}
                    </a>
                  ) : (
                    <p className="text-copper font-medium mb-2 break-words leading-tight">{method.details}</p>
                  )}
                  <p className="text-gray-300 text-sm leading-relaxed">{method.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Office Locations */}
      <Card className="bg-navy/50 border-copper/20">
        <CardContent className="p-6">
          <h3 className="text-white font-semibold text-xl mb-6">{t('ourGlobalOffices')}</h3>
          <div className="space-y-6">
            {offices.map((office, index) => (
              <div key={index} className="border-b border-copper/20 last:border-b-0 pb-4 last:pb-0">
                <h4 className="text-copper font-semibold mb-2">{office.city}</h4>
                <a
                  href={getMapsHref(office.address)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 text-sm whitespace-pre-line mb-2 leading-relaxed underline underline-offset-4"
                >
                  {office.address}
                </a>
                <p className="text-gray-300 text-sm">{office.phone}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
