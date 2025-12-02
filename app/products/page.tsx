
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, BarChart3, Globe, Zap } from 'lucide-react'

export default function ProductsPage() {
  const products = [
    {
      title: "TIGR-Markets",
      subtitle: "Financial news, insights, and learning in just 5 minutes",
      description: "Stay updated with the latest market trends, financial insights, and educational content curated for modern investors.",
      tags: ["Market Update", "Investing Fundamental", "Quick Take"],
      icon: <BarChart3 className="w-8 h-8 text-orange-400" />,
      featured: true
    },
    {
      title: "CONSILIENCE 10|10",
      subtitle: "The world's first on-chain crypto index product",
      description: "A tokenised index product combining ERC-20 tokens and traditional index into a hybrid product for diversified crypto exposure.",
      tags: ["Crypto", "Index", "DeFi"],
      icon: <Globe className="w-8 h-8 text-orange-400" />
    },
    {
      title: "Asset Management Platform",
      subtitle: "Next-generation wealth management",
      description: "Comprehensive asset management solutions leveraging blockchain technology for transparent and efficient portfolio management.",
      tags: ["Asset Management", "Blockchain", "Portfolio"],
      icon: <TrendingUp className="w-8 h-8 text-orange-400" />
    },
    {
      title: "Investment Banking Services",
      subtitle: "Traditional banking meets DeFi",
      description: "Bridge traditional investment banking with decentralized finance for innovative financial solutions.",
      tags: ["Banking", "DeFi", "Innovation"],
      icon: <Zap className="w-8 h-8 text-orange-400" />
    }
  ]

  return (
    <div className="min-h-screen bg-slate-900">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">Products</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Innovative financial products and services at the intersection of traditional finance and blockchain technology
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {products.map((product, index) => (
            <Card 
              key={index} 
              className={`bg-slate-800 border-slate-700 hover:border-orange-400 transition-colors ${
                product.featured ? 'lg:col-span-2' : ''
              }`}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    {product.icon}
                    <div>
                      <CardTitle className="text-white text-xl">{product.title}</CardTitle>
                      <CardDescription className="text-gray-300 mt-1">
                        {product.subtitle}
                      </CardDescription>
                    </div>
                  </div>
                  {product.featured && (
                    <Badge className="bg-orange-500 text-white">Featured</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">{product.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.tags.map((tag, tagIndex) => (
                    <Badge 
                      key={tagIndex} 
                      variant="secondary" 
                      className="bg-slate-700 text-gray-300"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}
