"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Lightbulb, Heart, Target, Zap } from 'lucide-react'

export function AboutValues() {
  const values = [
    {
      icon: <Lightbulb className="w-8 h-8 text-copper" />,
      title: "Innovation",
      description: "We constantly push boundaries and embrace cutting-edge solutions to deliver exceptional results."
    },
    {
      icon: <Heart className="w-8 h-8 text-copper" />,
      title: "Integrity",
      description: "We build trust through transparency, honesty, and ethical practices in all our relationships."
    },
    {
      icon: <Target className="w-8 h-8 text-copper" />,
      title: "Excellence",
      description: "We strive for perfection in every project, delivering quality that exceeds expectations."
    },
    {
      icon: <Zap className="w-8 h-8 text-copper" />,
      title: "Agility",
      description: "We adapt quickly to changing markets and client needs, ensuring relevant and timely solutions."
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-r from-copper/10 via-sand/10 to-copper/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-6">Our Core Values</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            The principles that guide everything we do
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <Card key={index} className="bg-navy/50 border-copper/20 hover:border-copper/50 transition-all duration-500 transform hover:scale-105 group">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-copper/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-copper/20 transition-colors duration-300">
                  {value.icon}
                </div>
                <h3 className="text-white font-semibold text-lg mb-3 group-hover:text-copper transition-colors duration-300">
                  {value.title}
                </h3>
                <p className="text-gray-300 text-sm group-hover:text-gray-200 transition-colors duration-300">
                  {value.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
