"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone, MapPin, Clock } from 'lucide-react'

export function ContactInfo() {
  const contactMethods = [
    {
      icon: <Mail className="w-6 h-6 text-copper" />,
      title: "Email Us",
      details: "globalstratelink@gmail.com",
      description: "We'll respond within 24 hours"
    },
    {
      icon: <Phone className="w-6 h-6 text-copper" />,
      title: "Call Us",
      details: "+1 (555) 123-4567",
      description: "Mon-Fri 9AM-6PM EST"
    },
    {
      icon: <MapPin className="w-6 h-6 text-copper" />,
      title: "Visit Us",
      details: "New York • London • Singapore",
      description: "Global offices worldwide"
    },
    {
      icon: <Clock className="w-6 h-6 text-copper" />,
      title: "Business Hours",
      details: "24/7 Support Available",
      description: "We're here when you need us"
    }
  ]

  const offices = [
    {
      city: "New York",
      address: "123 Business Ave, Suite 100\nNew York, NY 10001",
      phone: "+1 (555) 123-4567"
    },
    {
      city: "London",
      address: "456 Strategic Lane\nLondon, UK EC1A 1BB",
      phone: "+44 20 1234 5678"
    },
    {
      city: "Singapore",
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
          <h3 className="text-white font-semibold text-xl mb-6">Our Global Offices</h3>
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
