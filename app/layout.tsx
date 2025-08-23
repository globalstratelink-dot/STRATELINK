import type { Metadata, Viewport } from "next"
import { Inter } from 'next/font/google'
import "./globals.css"
import { LanguageProvider } from "@/contexts/language-context"
import { ScrollToTop } from "@/components/scroll-to-top"
import { Navbar } from "@/components/navbar"
import { GlobalCSSPreloader } from "@/components/css-preloader"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Stratelink Global - International Import/Export Services",
  description: "Connecting businesses worldwide through innovative import/export solutions, strategic partnerships, and comprehensive trade services to drive international growth and market expansion.",
  generator: 'v0.dev',
  keywords: ['import export', 'international trade', 'business development', 'logistics', 'stratlink global', 'stratlink global solutions'],
  authors: [{ name: 'Stratelink Global' }],
  creator: 'Stratelink Global',
  publisher: 'Stratelink Global',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://stratelinkglobal.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://stratelinkglobal.com',
    title: 'Stratelink Global - International Trade Solutions',
    description: 'Connecting businesses worldwide through innovative import/export solutions, strategic partnerships, and comprehensive trade services to drive international growth and market expansion.',
    siteName: 'Stratelink Global',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Stratelink Global - International Trade Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stratelink Global - International Trade Solutions',
    description: 'Connecting businesses worldwide through innovative import/export solutions, strategic partnerships, and comprehensive trade services to drive international growth and market expansion.',
    images: ['/og-image.png'],
    creator: '@stratlinkglobal',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },
  manifest: '/site.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Stratelink Global'
  },
  other: {
    'mobile-web-app-capable': 'yes'
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#041331'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalCSSPreloader />
        <LanguageProvider>
          <ScrollToTop />
          <Navbar />
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
