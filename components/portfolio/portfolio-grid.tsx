"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, TrendingUp } from 'lucide-react'
import { useState } from "react"

export function PortfolioGrid() {
  const [filter, setFilter] = useState('all')

  const projects = [
    {
      title: "Global Tech Expansion",
      client: "TechVision Inc.",
      category: "expansion",
      industry: "Technology",
      description: "Helped a Silicon Valley startup expand to 15 international markets, achieving 400% revenue growth in 18 months.",
      results: ["400% Revenue Growth", "15 New Markets", "200+ New Employees"],
      image: "/placeholder.svg?height=300&width=400&text=Tech+Expansion",
      tags: ["Global Expansion", "Technology", "Scaling"]
    },
    {
      title: "Digital Transformation Initiative",
      client: "Manufacturing Corp",
      category: "digital",
      industry: "Manufacturing",
      description: "Led comprehensive digital transformation, modernizing operations and implementing AI-driven analytics.",
      results: ["60% Efficiency Gain", "50% Cost Reduction", "Real-time Analytics"],
      image: "/placeholder.svg?height=300&width=400&text=Digital+Transform",
      tags: ["Digital Transformation", "AI", "Manufacturing"]
    },
    {
      title: "Strategic Restructuring",
      client: "Financial Services Ltd",
      category: "strategy",
      industry: "Finance",
      description: "Restructured operations and strategy for a financial services company facing market challenges.",
      results: ["300% Profit Increase", "Market Leadership", "Operational Excellence"],
      image: "/placeholder.svg?height=300&width=400&text=Financial+Strategy",
      tags: ["Strategy", "Finance", "Restructuring"]
    },
    {
      title: "Market Entry Strategy",
      client: "Healthcare Innovations",
      category: "expansion",
      industry: "Healthcare",
      description: "Developed market entry strategy for healthcare technology company entering European markets.",
      results: ["5 New Markets", "€10M Revenue", "Regulatory Compliance"],
      image: "/placeholder.svg?height=300&width=400&text=Healthcare+Entry",
      tags: ["Market Entry", "Healthcare", "Europe"]
    },
    {
      title: "Performance Optimization",
      client: "Retail Chain Group",
      category: "optimization",
      industry: "Retail",
      description: "Optimized supply chain and operations for a major retail chain, improving efficiency and customer satisfaction.",
      results: ["40% Faster Delivery", "25% Cost Savings", "95% Customer Satisfaction"],
      image: "/placeholder.svg?height=300&width=400&text=Retail+Optimization",
      tags: ["Optimization", "Retail", "Supply Chain"]
    },
    {
      title: "Innovation Strategy",
      client: "Energy Solutions Inc",
      category: "strategy",
      industry: "Energy",
      description: "Developed innovation strategy for renewable energy company, leading to breakthrough technologies.",
      results: ["3 Patents Filed", "50% R&D Efficiency", "Market Innovation"],
      image: "/placeholder.svg?height=300&width=400&text=Energy+Innovation",
      tags: ["Innovation", "Energy", "R&D"]
    }
  ]

  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'expansion', name: 'Global Expansion' },
    { id: 'digital', name: 'Digital Transformation' },
    { id: 'strategy', name: 'Strategic Consulting' },
    { id: 'optimization', name: 'Performance Optimization' }
  ]

  const filteredProjects = filter === 'all' ? projects : projects.filter(project => project.category === filter)

  return (
    <section className="py-20 bg-gradient-to-b from-navy to-navy/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={filter === category.id ? "default" : "outline"}
              className={filter === category.id 
                ? "bg-copper text-navy" 
                : "border-copper/30 text-copper hover:bg-copper hover:text-navy"
              }
              onClick={() => setFilter(category.id)}
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <Card key={index} className="bg-navy/50 border-copper/20 hover:border-copper/50 transition-all duration-500 transform hover:scale-105 group overflow-hidden">
              <div className="relative">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-copper text-navy">{project.industry}</Badge>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-white font-semibold text-xl mb-2 group-hover:text-copper transition-colors duration-300">
                  {project.title}
                </h3>
                <div className="text-copper text-sm font-medium mb-3">{project.client}</div>
                <p className="text-gray-300 text-sm mb-4 group-hover:text-gray-200 transition-colors duration-300">
                  {project.description}
                </p>
                
                <div className="space-y-2 mb-4">
                  {project.results.map((result, resultIndex) => (
                    <div key={resultIndex} className="flex items-center text-gray-300 text-sm">
                      <TrendingUp className="w-4 h-4 text-copper mr-2 flex-shrink-0" />
                      {result}
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="secondary" className="bg-copper/10 text-copper text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <Button 
                  variant="outline" 
                  className="w-full border-copper/30 text-copper hover:bg-copper hover:text-navy group-hover:border-copper transition-all duration-300"
                >
                  View Case Study
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
