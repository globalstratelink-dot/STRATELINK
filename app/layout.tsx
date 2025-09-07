import type { Metadata } from "next"
import { Poppins } from 'next/font/google'
import "./globals.css"
import { LanguageProvider } from "@/contexts/language-context"
import { Navbar } from "@/components/navbar"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { MobileLanguageFAB } from "@/components/mobile-language-fab"

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins'
})

export const metadata: Metadata = {
  title: "Stratelink Global",
  description: "International Import/Export Services",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/FAVICON.png", type: "image/png" }
    ],
    shortcut: "/favicon.ico",
    apple: "/FAVICON.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-sans`}>
        <LanguageProvider>
          <Navbar />
          {children}
          <WhatsAppFloat 
            phoneNumber="00971543192348"
            message="Bonjour, j'aimerais avoir plus d'informations"
          />
          <MobileLanguageFAB />
        </LanguageProvider>
      </body>
    </html>
  )
}
