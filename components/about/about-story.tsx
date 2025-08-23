"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Users, Globe, Award } from 'lucide-react'

export function AboutStory() {
  const milestones = [
    {
      year: "2010",
      title: "Company Founded",
      description: "Started with a vision to transform business strategies globally",
      icon: <Calendar className="w-6 h-6 text-copper" />
    },
    {
      year: "2015",
      title: "Global Expansion",
      description: "Opened offices in London and Singapore, serving 25+ countries",
      icon: <Globe className="w-6 h-6 text-copper" />
    },
    {
      year: "2018",
      title: "Team Growth",
      description: "Reached 200+ expert consultants and strategic advisors",
      icon: <Users className="w-6 h-6 text-copper" />
    },
    {
      year: "2023",
      title: "Industry Recognition",
      description: "Awarded 'Strategic Consulting Firm of the Year'",
      icon: <Award className="w-6 h-6 text-copper" />
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-navy/95 to-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-6">Our Journey</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            From a small consulting firm to a global strategic partner
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {milestones.map((milestone, index) => (
            <Card key={index} className="bg-navy/50 border-copper/20 hover:border-copper/50 transition-all duration-300 group">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-copper/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-copper/20 transition-colors duration-300">
                  {milestone.icon}
                </div>
                <div className="text-2xl font-bold text-copper mb-2">{milestone.year}</div>
                <h3 className="text-white font-semibold mb-2">{milestone.title}</h3>
                <p className="text-gray-300 text-sm">{milestone.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
