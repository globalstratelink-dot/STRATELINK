import { CONTACT_EMAIL } from "@/lib/site-contact"
import { DEFAULT_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/seo"

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/logo.png`,
      email: CONTACT_EMAIL,
      sameAs: ["https://www.linkedin.com/company/stratelink-global"],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: ["en", "fr"],
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#service`,
      name: SITE_NAME,
      url: SITE_URL,
      image: `${SITE_URL}/og-image.png`,
      description: DEFAULT_DESCRIPTION,
      email: CONTACT_EMAIL,
      areaServed: [
        { "@type": "Country", name: "United Arab Emirates" },
        { "@type": "Country", name: "China" },
        { "@type": "Country", name: "France" },
        { "@type": "Continent", name: "Africa" },
      ],
      serviceType: [
        "Import Export",
        "International Trade",
        "Sourcing",
        "Logistics",
        "Customs Compliance",
      ],
    },
  ],
}

export function OrganizationJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
