"use client"

import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/language-context"
import { FileText, Scale, AlertCircle, CheckCircle, XCircle, Globe } from "lucide-react"
import { Footer } from "@/components/footer"

export default function TermsOfUsePage() {
  const { t, language } = useLanguage()

  const sections = language === 'fr' ? [
    {
      icon: FileText,
      title: "Acceptation des conditions",
      content: "En accédant et en utilisant le site web de Stratelink Global, vous acceptez d'être lié par ces conditions d'utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser notre site."
    },
    {
      icon: Globe,
      title: "Utilisation du site",
      content: "Ce site est destiné à fournir des informations sur nos services d'import/export et de développement commercial. Vous vous engagez à utiliser le site de manière légale et conforme à toutes les lois et réglementations applicables."
    },
    {
      icon: Scale,
      title: "Propriété intellectuelle",
      content: "Tout le contenu présent sur ce site, y compris les textes, graphiques, logos, images, et logiciels, est la propriété de Stratelink Global FZCO ou de ses fournisseurs de contenu et est protégé par les lois internationales sur la propriété intellectuelle."
    },
    {
      icon: CheckCircle,
      title: "Services proposés",
      content: "Les informations sur nos services sont fournies à titre indicatif. Nous nous réservons le droit de modifier nos services, prix et conditions à tout moment sans préavis. Tout accord commercial fera l'objet d'un contrat spécifique."
    },
    {
      icon: AlertCircle,
      title: "Limitation de responsabilité",
      content: "Stratelink Global s'efforce de maintenir les informations de ce site à jour et exactes. Cependant, nous ne garantissons pas l'exactitude, l'exhaustivité ou l'actualité des informations. Nous ne serons pas responsables des dommages directs ou indirects résultant de l'utilisation de ce site."
    },
    {
      icon: XCircle,
      title: "Liens externes",
      content: "Notre site peut contenir des liens vers des sites web tiers. Ces liens sont fournis pour votre commodité. Nous n'avons aucun contrôle sur ces sites et ne sommes pas responsables de leur contenu ou de leurs pratiques de confidentialité."
    },
    {
      icon: FileText,
      title: "Modifications des conditions",
      content: "Nous nous réservons le droit de modifier ces conditions d'utilisation à tout moment. Les modifications entreront en vigueur dès leur publication sur le site. Votre utilisation continue du site après de telles modifications constitue votre acceptation des nouvelles conditions."
    },
    {
      icon: Scale,
      title: "Droit applicable",
      content: "Ces conditions d'utilisation sont régies par les lois des Émirats arabes unis. Tout litige relatif à l'utilisation de ce site sera soumis à la juridiction exclusive des tribunaux de Dubaï."
    }
  ] : [
    {
      icon: FileText,
      title: "Acceptance of Terms",
      content: "By accessing and using the Stratelink Global website, you agree to be bound by these terms of use. If you do not accept these terms, please do not use our site."
    },
    {
      icon: Globe,
      title: "Use of the Site",
      content: "This site is intended to provide information about our import/export and business development services. You agree to use the site legally and in compliance with all applicable laws and regulations."
    },
    {
      icon: Scale,
      title: "Intellectual Property",
      content: "All content on this site, including text, graphics, logos, images, and software, is the property of Stratelink Global FZCO or its content suppliers and is protected by international intellectual property laws."
    },
    {
      icon: CheckCircle,
      title: "Services Offered",
      content: "Information about our services is provided for informational purposes. We reserve the right to modify our services, prices, and conditions at any time without notice. Any commercial agreement will be subject to a specific contract."
    },
    {
      icon: AlertCircle,
      title: "Limitation of Liability",
      content: "Stratelink Global strives to keep the information on this site current and accurate. However, we do not guarantee the accuracy, completeness, or timeliness of the information. We will not be liable for any direct or indirect damages resulting from the use of this site."
    },
    {
      icon: XCircle,
      title: "External Links",
      content: "Our site may contain links to third-party websites. These links are provided for your convenience. We have no control over these sites and are not responsible for their content or privacy practices."
    },
    {
      icon: FileText,
      title: "Modifications to Terms",
      content: "We reserve the right to modify these terms of use at any time. Modifications will take effect upon publication on the site. Your continued use of the site after such modifications constitutes your acceptance of the new terms."
    },
    {
      icon: Scale,
      title: "Applicable Law",
      content: "These terms of use are governed by the laws of the United Arab Emirates. Any dispute relating to the use of this site will be subject to the exclusive jurisdiction of the courts of Dubai."
    }
  ]

  return (
    <div className="min-h-screen bg-navy pt-24 md:pt-32">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 bg-copper/30 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-64 h-64 bg-sand/30 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-copper/10 rounded-full border border-copper/20">
                <Scale className="w-12 h-12 text-copper" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {t('termsOfUseTitle')}
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              {language === 'fr' 
                ? "Les conditions régissant l'utilisation de notre site web et de nos services."
                : "The terms governing the use of our website and services."
              }
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-copper to-sand mx-auto" />
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-copper/20 hover:border-copper/40 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-copper/10 rounded-lg border border-copper/20 shrink-0">
                    <section.icon className="w-6 h-6 text-copper" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-white mb-4">{section.title}</h2>
                    <p className="text-gray-300 leading-relaxed">{section.content}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Contact for Questions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mt-12 bg-gradient-to-r from-copper/10 to-sand/10 backdrop-blur-sm rounded-2xl p-8 border border-copper/20"
          >
            <h3 className="text-2xl font-bold text-white mb-4">
              {language === 'fr' ? "Questions sur nos conditions ?" : "Questions about our terms?"}
            </h3>
            <p className="text-gray-300 mb-6">
              {language === 'fr' 
                ? "Pour toute question concernant nos conditions d'utilisation, n'hésitez pas à nous contacter."
                : "For any questions regarding our terms of use, please feel free to contact us."
              }
            </p>
            <a 
              href="mailto:admin@stratelink-global.com"
              className="inline-flex items-center gap-2 px-6 py-3 bg-copper text-white rounded-lg hover:bg-copper/90 transition-colors font-semibold"
            >
              {language === 'fr' ? "Nous contacter" : "Contact us"}
            </a>
          </motion.div>

          {/* Last Updated */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="mt-8 text-center text-gray-400 text-sm"
          >
            <p>{language === 'fr' ? "Dernière mise à jour : Octobre 2025" : "Last updated: October 2025"}</p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

