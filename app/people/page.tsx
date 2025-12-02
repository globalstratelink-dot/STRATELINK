
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Linkedin } from 'lucide-react'

export default function PeoplePage() {
  const team = [
    {
      name: "Altesh BAUOO",
      title: "Chief Executive Officer, NSIL Committee",
      education: "INSEAD MFin, University of Stellenbosch MPhil South Africa",
      description: "Altesh gained his Business Management practical know-how via working at multi-national companies and at high growth early-stage companies, and via growth and exit of his own consulting and media business. He gained his Corporate Finance and Investment Management practical know-how via working at high growth early-stage FinTech companies, including a Direct Lending Platform, Licensed Stock Exchange and a Private Debt Marketplace, the latter which he was the Founding Managing Director of. He also established his own investment holding company through which he continues to apply his corporate finance and investment management know-how.",
      linkedin: true
    },
    {
      name: "Benito GRIMAUDO",
      title: "Global Advisory Board",
      education: "Sawyer Business School MBA Italy, South Africa",
      description: "Benito is an Italian national who now lives and works from Johannesburg. He previously lived in the U.K, the U.S. and Kenya. He has 20+ years of Investment Management experience, specifically as it relates to energy and infrastructure. His experience includes stints at the IFC and AfDB, with more than US$ 3 bn of executed project value across 15 African countries. He was also a founding executive of the ARM-Harith Infrastructure Fund; a US$ 250 mn closed-end African infrastructure fund. Most recently he and his business partner announced the close of their inaugural 'Green Fund I' via Fortis Green Renewables.",
      linkedin: true
    },
    {
      name: "Christo HOLTSHAUSEN",
      title: "Non-executive Director, NSIL Committee",
      education: "University of Stellenbosch MBA, PrEng, MIEAust Australia, South Africa",
      description: "Christo gained his Engineering and Product Management practical know-how via working at multi-national companies and government organisations, as well as his own early stage and consulting companies. Also through his graduate education which focused on Innovation Management. Christo is a registered professional engineer in both South Africa (PrEng) and in Australia (MIEAust), as well as a member of the South African Institution of Mechanical Engineering and University of Stellenbosch Business School (USB) Consulting Club.",
      linkedin: true
    },
    {
      name: "Jing LI",
      title: "Global Advisory Board",
      education: "London Business School MBA, Columbia University MPA China, South Africa",
      description: "Jing is a Chinese national who now lives and works from Johannesburg. He previously lived in the U.K, the U.S. and China. He has 15+ years of Investment Management experience, specifically as it relates to emerging markets and cross-border investments. His experience includes working at leading global investment firms and establishing his own investment advisory practice focused on Africa-China investment flows.",
      linkedin: true
    }
  ]

  return (
    <div className="min-h-screen bg-slate-900">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">People</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Meet our experienced team of financial professionals and industry experts
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {team.map((member, index) => (
            <Card key={index} className="bg-orange-400/10 border-orange-400/20 hover:border-orange-400 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                    {member.linkedin && (
                      <Linkedin className="w-5 h-5 text-orange-400 inline" />
                    )}
                  </div>
                </div>
                
                <div className="mb-4">
                  <Badge className="bg-orange-500 text-white mb-2">
                    {member.title}
                  </Badge>
                  <p className="text-orange-300 text-sm font-medium">
                    {member.education}
                  </p>
                </div>

                <p className="text-gray-300 text-sm leading-relaxed">
                  {member.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}
