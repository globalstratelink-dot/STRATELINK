import type { Metadata, Viewport } from "next"
import { Inter } from 'next/font/google'
import "./globals.css"
import "../styles/mobile-performance.css"
import "../styles/ultra-fast-loading.css"
import { LanguageProvider } from "@/contexts/language-context"
import { ScrollToTop } from "@/components/scroll-to-top"
import { Navbar } from "@/components/navbar"
import { GlobalCSSPreloader } from "@/components/css-preloader"
import { MobilePerformanceOptimizer } from "@/components/mobile-performance-optimizer"
import { PerformanceOptimizer } from "@/components/performance-optimizer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { AnimationInitializer } from "@/components/animation-initializer"
import Script from "next/script"

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
  metadataBase: new URL('https://stratelink-global.ae'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://stratelink-global.ae',
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
      { url: '/favicon.ico', sizes: 'any', type: 'image/x-icon' },
      { url: '/icon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    other: [
      { rel: 'icon', url: '/favicon.ico', sizes: 'any' },
    ],
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
  maximumScale: 5,
  userScalable: true,
  themeColor: '#041331'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Additional favicon links for better browser and search engine support */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icon-32x32.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/icon-512x512.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Additional meta tags for better favicon recognition */}
        <meta name="theme-color" content="#041331" />
        <meta name="msapplication-TileColor" content="#041331" />
        <meta name="msapplication-TileImage" content="/icon-192x192.png" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
        {/* Force favicon recognition */}
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Additional icon formats for maximum compatibility */}
        <link rel="icon" type="image/svg+xml" href="/logo.svg" />
        <link rel="mask-icon" href="/logo.svg" color="#041331" />
      </head>
      <body className={inter.className}>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-2X983N4TEH"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);} 
            gtag('js', new Date());
            gtag('config', 'G-2X983N4TEH');
          `}
        </Script>
        <GlobalCSSPreloader />
        <MobilePerformanceOptimizer />
        <PerformanceOptimizer />
        <AnimationInitializer />
        <LanguageProvider>
          <ScrollToTop />
          <Navbar />
          {children}
          <WhatsAppFloat phoneNumber="00971543192348" />
        </LanguageProvider>
      </body>
    </html>
  )
}
