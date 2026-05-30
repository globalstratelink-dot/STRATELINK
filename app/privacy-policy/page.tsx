"use client"

import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/language-context"
import { Shield, Eye, Lock, Database, UserCheck, Globe } from "lucide-react"
import { Footer } from "@/components/footer"

export default function PrivacyPolicyPage() {
  const { t, language } = useLanguage()

  const sections = language === 'fr' ? [
    {
      icon: Database,
      title: "Collecte des données",
      content: "Nous collectons uniquement les informations que vous nous fournissez volontairement via notre formulaire de contact : nom, prénom, email, entreprise, pays, numéro de téléphone, et votre message. Ces données sont utilisées exclusivement pour répondre à vos demandes et vous fournir nos services."
    },
    {
      icon: Lock,
      title: "Utilisation des données",
      content: "Vos données personnelles sont utilisées pour : répondre à vos demandes de contact, vous fournir des informations sur nos services, améliorer notre site web et nos services. Nous ne vendons, ne louons ni ne partageons vos informations personnelles avec des tiers à des fins commerciales."
    },
    {
      icon: Shield,
      title: "Protection des données",
      content: "Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles appropriées pour protéger vos données personnelles contre tout accès non autorisé, modification, divulgation ou destruction. Les données sont transmises de manière sécurisée via EmailJS."
    },
    {
      icon: Eye,
      title: "Conservation des données",
      content: "Nous conservons vos données personnelles aussi longtemps que nécessaire pour les finalités pour lesquelles elles ont été collectées, ou conformément aux exigences légales applicables."
    },
    {
      icon: UserCheck,
      title: "Vos droits",
      content: "Conformément au RGPD et aux lois applicables, vous disposez d'un droit d'accès, de rectification, de suppression et de portabilité de vos données personnelles. Vous pouvez exercer ces droits en nous contactant à admin@stratelink-global.com."
    },
    {
      icon: Globe,
      title: "Cookies",
      content: "Notre site utilise des cookies strictement nécessaires au fonctionnement du site, notamment pour la gestion de la langue. Aucun cookie de tracking ou publicitaire n'est utilisé."
    }
  ] : [
    {
      icon: Database,
      title: "Data Collection",
      content: "We only collect information that you voluntarily provide to us through our contact form: first name, last name, email, company, country, phone number, and your message. This data is used exclusively to respond to your inquiries and provide our services."
    },
    {
      icon: Lock,
      title: "Data Usage",
      content: "Your personal data is used to: respond to your contact requests, provide you with information about our services, improve our website and services. We do not sell, rent, or share your personal information with third parties for commercial purposes."
    },
    {
      icon: Shield,
      title: "Data Protection",
      content: "We implement appropriate technical and organizational security measures to protect your personal data against unauthorized access, modification, disclosure, or destruction. Data is transmitted securely via EmailJS."
    },
    {
      icon: Eye,
      title: "Data Retention",
      content: "We retain your personal data for as long as necessary for the purposes for which it was collected, or in accordance with applicable legal requirements."
    },
    {
      icon: UserCheck,
      title: "Your Rights",
      content: "In accordance with GDPR and applicable laws, you have the right to access, rectify, delete, and port your personal data. You can exercise these rights by contacting us at admin@stratelink-global.com."
    },
    {
      icon: Globe,
      title: "Cookies",
      content: "Our site uses cookies strictly necessary for the operation of the site, including language management. No tracking or advertising cookies are used."
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
                <Shield className="w-12 h-12 text-copper" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {t('privacyPolicyTitle')}
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              {language === 'fr' 
                ? "Votre vie privée est importante pour nous. Découvrez comment nous protégeons vos données personnelles."
                : "Your privacy matters to us. Learn how we protect your personal data."
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

          {/* Contact for Privacy Questions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12 bg-gradient-to-r from-copper/10 to-sand/10 backdrop-blur-sm rounded-2xl p-8 border border-copper/20"
          >
            <h3 className="text-2xl font-bold text-white mb-4">
              {language === 'fr' ? "Questions ?" : "Questions?"}
            </h3>
            <p className="text-gray-300 mb-6">
              {language === 'fr' 
                ? "Pour toute question concernant notre politique de confidentialité ou l'utilisation de vos données, n'hésitez pas à nous contacter."
                : "For any questions regarding our privacy policy or the use of your data, please feel free to contact us."
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
            transition={{ duration: 0.6, delay: 0.9 }}
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

