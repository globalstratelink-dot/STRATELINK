import type { Metadata } from "next"
import { Poppins } from 'next/font/google'
import "./globals.css"
import { LanguageProvider } from "@/contexts/language-context"
import { LayoutShell } from "@/components/layout-shell"
import { MotionProvider } from "@/components/motion-provider"
import { OrganizationJsonLd } from "@/components/seo/organization-json-ld"
import { DEFAULT_DESCRIPTION, DEFAULT_KEYWORDS, SITE_NAME, SITE_URL } from "@/lib/seo"

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins'
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | International Import Export Dubai`,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  keywords: DEFAULT_KEYWORDS,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  robots: { index: true, follow: true },
  alternates: { canonical: SITE_URL },
  verification: {
    google: "vLDfkmTRzDbZIipSCzKT5hk-GUB_bU-Ld8dpJ9SWNMU",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["fr_FR"],
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | International Import Export Dubai`,
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — International Import Export`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | International Import Export Dubai`,
    description: DEFAULT_DESCRIPTION,
    images: ["/og-image.png"],
  },
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
        <OrganizationJsonLd />
        <MotionProvider>
          <LanguageProvider>
            <LayoutShell>{children}</LayoutShell>
          </LanguageProvider>
        </MotionProvider>
      </body>
    </html>
  )
}
