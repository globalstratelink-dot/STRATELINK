"use client"

import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Users, Globe, Award } from 'lucide-react'

export function PortfolioStats() {
  const stats = [
    {
      icon: <TrendingUp className="w-8 h-8 text-copper" />,
      number: "300%",
      label: "Average ROI Improvement",
      description: "Across all client engagements"
    },
    {
      icon: <Users className="w-8 h-8 text-copper" />,
      number: "500+",
      label: "Successful Projects",
      description: "Delivered worldwide"
    },
    {
      icon: <Globe className="w-8 h-8 text-copper" />,
      number: "50+",
      label: "Countries Served",
      description: "Global reach and impact"
    },
    {
      icon: <Award className="w-8 h-8 text-copper" />,
      number: "99%",
      label: "Client Satisfaction",
      description: "Consistently exceeding expectations"
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-r from-copper/10 via-sand/10 to-copper/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-6">Portfolio Impact</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Measurable results that demonstrate our commitment to excellence
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-navy/50 border-copper/20 hover:border-copper/50 transition-all duration-500 transform hover:scale-105 group">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-copper/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-copper/20 transition-colors duration-300">
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold text-copper mb-2">{stat.number}</div>
                <h3 className="text-white font-semibold mb-2 group-hover:text-copper transition-colors duration-300">
                  {stat.label}
                </h3>
                <p className="text-gray-300 text-sm group-hover:text-gray-200 transition-colors duration-300">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
