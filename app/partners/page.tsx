
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"

export default function PartnersPage() {
  const partners = [
    { name: "LOYAL", logo: "/placeholder.svg?height=60&width=120&text=LOYAL" },
    { name: "FORTIS GREEN", logo: "/placeholder.svg?height=60&width=120&text=FORTIS+GREEN" },
    { name: "STARTUP YARD", logo: "/placeholder.svg?height=60&width=120&text=STARTUP+YARD" },
    { name: "TATUM", logo: "/placeholder.svg?height=60&width=120&text=TATUM" },
    { name: "RainFin", logo: "/placeholder.svg?height=60&width=120&text=RainFin" },
    { name: "StartF", logo: "/placeholder.svg?height=60&width=120&text=StartF" }
  ]

  return (
    <div className="min-h-screen bg-slate-900">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">Partners</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Strategic partnerships that drive innovation and growth in the financial technology sector
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {partners.map((partner, index) => (
            <Card key={index} className="bg-slate-800 border-slate-700 hover:border-orange-400 transition-colors">
              <CardContent className="p-8 flex items-center justify-center">
                <img
                  src={partner.logo || "/placeholder.svg"}
                  alt={partner.name}
                  className="max-w-full h-16 object-contain filter brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}
