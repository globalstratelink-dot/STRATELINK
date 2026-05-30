"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState, useEffect } from "react"
import { useLanguage } from "@/contexts/language-context"
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { useNodemailerSender } from "@/hooks/use-nodemailer-sender"
import { motion, AnimatePresence } from "framer-motion"
import { countries, getPhoneCode } from "@/lib/utils"

export function ContactForm() {
  const { t } = useLanguage()
  const { emailState, sendEmail, resetState } = useNodemailerSender()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    country: "",
    phoneNumber: "",
    subject: "",
    message: ""
  })

  const [selectedCountry, setSelectedCountry] = useState("")
  const [phoneCode, setPhoneCode] = useState("")

  const [errors, setErrors] = useState<Record<string, string>>({})

  // Reset form after successful submission
  useEffect(() => {
    if (emailState.isSuccess) {
      const timer = setTimeout(() => {
        resetState()
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          company: "",
          country: "",
          phoneNumber: "",
          subject: "",
          message: ""
        })
        setSelectedCountry("")
        setPhoneCode("")
        setErrors({})
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [emailState.isSuccess, resetState])

  // Fonction pour gérer le changement de pays
  const handleCountryChange = (countryCode: string) => {
    setSelectedCountry(countryCode)
    const code = getPhoneCode(countryCode)
    setPhoneCode(code)
    
    // Mettre à jour le formData avec le nom du pays
    const country = countries.find(c => c.code === countryCode)
    setFormData(prev => ({ 
      ...prev, 
      country: country ? country.name : "" 
    }))
    
    // Si le numéro de téléphone commence déjà par un code, le remplacer
    if (formData.phoneNumber && formData.phoneNumber.startsWith("+")) {
      const phoneWithoutCode = formData.phoneNumber.replace(/^\+\d+\s*/, "")
      setFormData(prev => ({ 
        ...prev, 
        phoneNumber: code + " " + phoneWithoutCode 
      }))
    } else if (formData.phoneNumber) {
      setFormData(prev => ({ 
        ...prev, 
        phoneNumber: code + " " + formData.phoneNumber 
      }))
    }
  }

  // Fonction pour gérer le changement du numéro de téléphone
  const handlePhoneChange = (value: string) => {
    // Si l'utilisateur tape un code, ne pas l'ajouter automatiquement
    if (value.startsWith("+")) {
      setFormData(prev => ({ ...prev, phoneNumber: value }))
    } else {
      // Ajouter le code du pays sélectionné
      const fullNumber = phoneCode ? `${phoneCode} ${value}` : value
      setFormData(prev => ({ ...prev, phoneNumber: fullNumber }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.firstName.trim()) {
      newErrors.firstName = String(t('firstNameRequired'))
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = String(t('lastNameRequired'))
    }
    if (!formData.email.trim()) {
      newErrors.email = String(t('emailRequired'))
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = String(t('invalidEmailFormat'))
    }
    if (!formData.subject.trim()) {
      newErrors.subject = String(t('subjectRequired'))
    }
    if (!formData.message.trim()) {
      newErrors.message = String(t('messageRequired'))
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    const success = await sendEmail(formData)
    if (success) {
      console.log("Email envoyé avec succès via Nodemailer!")
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
  }

  const getInputClassName = (field: string) => {
    const baseClass = "bg-navy/50 border-copper/30 text-white placeholder:text-gray-400 focus:border-copper"
    if (errors[field]) {
      return `${baseClass} border-red-500 focus:border-red-500`
    }
    return baseClass
  }

  // Fonction helper pour les traductions avec fallback
  const getTranslation = (key: string, fallback: string = "") => {
    try {
      return String(t(key as any)) || fallback
    } catch {
      return fallback
    }
  }

  return (
    <Card className="bg-navy/50 border-copper/20 shadow-2xl">
      <CardHeader>
        <CardTitle className="text-white text-2xl">{String(t('sendMessage'))}</CardTitle>
        <CardDescription className="text-gray-300">
          {String(t('weWillGetBackToYou'))}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Success Message */}
        <AnimatePresence>
          {emailState.isSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 flex items-center space-x-3"
            >
              <CheckCircle className="w-5 h-5 text-green-400" />
              <div>
                <p className="text-green-400 font-medium">{String(t('messageSentSuccess'))}</p>
                <p className="text-green-300 text-sm">{String(t('weWillContactYouSoon'))}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error Message */}
        <AnimatePresence>
          {emailState.isError && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 flex items-center space-x-3"
            >
              <AlertCircle className="w-5 h-5 text-red-400" />
              <div>
                <p className="text-red-400 font-medium">{String(t('errorSendingMessage'))}</p>
                <p className="text-red-300 text-sm">{emailState.errorMessage}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">{String(t('firstName'))}</label>
              <Input
                type="text"
                placeholder={String(t('johnPlaceholder'))}
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                className={getInputClassName("firstName")}
                required
              />
              {errors.firstName && (
                <p className="text-red-400 text-xs">{errors.firstName}</p>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">{String(t('lastName'))}</label>
              <Input
                type="text"
                placeholder={String(t('doePlaceholder'))}
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                className={getInputClassName("lastName")}
                required
              />
              {errors.lastName && (
                <p className="text-red-400 text-xs">{errors.lastName}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">{String(t('email'))}</label>
            <Input
              type="email"
              placeholder={String(t('emailPlaceholder'))}
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className={getInputClassName("email")}
              required
            />
            {errors.email && (
              <p className="text-red-400 text-xs">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">{String(t('company'))}</label>
            <Input
              type="text"
              placeholder={String(t('companyPlaceholder'))}
              value={formData.company}
              onChange={(e) => handleInputChange("company", e.target.value)}
              className={getInputClassName("company")}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">{getTranslation('country', 'Pays')}</label>
              <Select value={selectedCountry} onValueChange={handleCountryChange}>
                <SelectTrigger className={getInputClassName("country")}>
                  <SelectValue placeholder={getTranslation('selectCountry', 'Sélectionnez votre pays')} />
                </SelectTrigger>
                <SelectContent className="bg-navy border-copper/30">
                  {countries.map((country) => (
                    <SelectItem 
                      key={country.code} 
                      value={country.code}
                      className="text-white hover:bg-copper/20 focus:bg-copper/20"
                    >
                      <div className="flex items-center space-x-2">
                        <span className="text-copper font-mono text-sm">{country.phoneCode}</span>
                        <span>{country.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                {getTranslation('phoneNumber', 'Numéro de téléphone')} {phoneCode && <span className="text-copper">({phoneCode})</span>}
              </label>
              <Input
                type="tel"
                placeholder={phoneCode ? `${phoneCode} 123 456 789` : getTranslation('phoneNumberPlaceholder', 'Entrez votre numéro de téléphone')}
                value={formData.phoneNumber}
                onChange={(e) => handlePhoneChange(e.target.value)}
                className={getInputClassName("phoneNumber")}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">{String(t('subject'))}</label>
            <Input
              type="text"
              placeholder={String(t('subjectPlaceholder'))}
              value={formData.subject}
              onChange={(e) => handleInputChange("subject", e.target.value)}
              className={getInputClassName("subject")}
              required
            />
            {errors.subject && (
              <p className="text-red-400 text-xs">{errors.subject}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">{String(t('message'))}</label>
            <Textarea
              placeholder={String(t('messagePlaceholder'))}
              rows={6}
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              className={getInputClassName("message")}
              required
            />
            {errors.message && (
              <p className="text-red-400 text-xs">{errors.message}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={emailState.isSending}
            className="w-full bg-copper hover:bg-copper/90 text-navy font-semibold py-3 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {emailState.isSending ? (
              <>
                <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                {String(t('sendingInProgress'))}
              </>
            ) : (
              <>
                <Send className="mr-2 w-5 h-5" />
                {String(t('sendMessageBtn'))}
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
