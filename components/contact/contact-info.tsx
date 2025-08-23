"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone, MapPin, Clock } from 'lucide-react'
import { useLanguage } from "@/contexts/language-context"

export function ContactInfo() {
  const { t } = useLanguage()
  const contactMethods = [
    {
      icon: <Mail className="w-6 h-6 text-copper" />,
      title: t('emailUs'),
      details: "globalstratelink@gmail.com",
      description: t('weWillRespondWithin24Hours')
    },
    {
      icon: <Phone className="w-6 h-6 text-copper" />,
      title: t('callUs'),
      details: "+1 (555) 123-4567",
      description: t('monFri9AM6PMEST')
    },
    {
      icon: <MapPin className="w-6 h-6 text-copper" />,
      title: t('visitUs'),
      details: `${t('newYork')} • ${t('london')} • ${t('singapore')}`,
      description: t('globalOfficesWorldwide')
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
      city: t('newYork'),
      address: "123 Business Ave, Suite 100\nNew York, NY 10001",
      phone: "+1 (555) 123-4567"
    },
    {
      city: t('london'),
      address: "456 Strategic Lane\nLondon, UK EC1A 1BB",
      phone: "+44 20 1234 5678"
    },
    {
      city: t('singapore'),
      address: "789 Innovation Street\nSingapore 018956",
      phone: "+65 6123 4567"
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
                  <p className="text-copper font-medium mb-2 break-words leading-tight">{method.details}</p>
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
                <p className="text-gray-300 text-sm whitespace-pre-line mb-2 leading-relaxed">{office.address}</p>
                <p className="text-gray-300 text-sm">{office.phone}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
