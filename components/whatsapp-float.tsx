'use client'

import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useLanguage } from '@/contexts/language-context'

interface WhatsAppFloatProps {
  phoneNumber?: string
  message?: string
}

export function WhatsAppFloat({ phoneNumber, message }: WhatsAppFloatProps) {
  const { t } = useLanguage()
  const [mounted, setMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768
      setIsMobile(mobile)
      console.log('WhatsApp Button - Mobile detected:', mobile, 'Width:', window.innerWidth)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Format phone number
  const formatPhoneNumber = (phone: string) => {
    return phone.replace(/\s|\+/g, '').replace(/^00/, '')
  }

  const phoneNumberFormatted = formatPhoneNumber(phoneNumber || '00971543192348')
  const whatsappUrl = `https://wa.me/${phoneNumberFormatted}${message ? `?text=${encodeURIComponent(message)}` : ''}`

  console.log('WhatsApp Button - URL:', whatsappUrl, 'Mobile:', isMobile)

  const buttonStyle: React.CSSProperties = {
    position: 'fixed',
    bottom: isMobile ? '40px' : '24px',
    right: isMobile ? '16px' : '24px',
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    backgroundColor: '#25D366',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 12px rgba(37, 211, 102, 0.4)',
    border: 'none',
    cursor: 'pointer',
    zIndex: 9999,
    transition: 'all 0.2s ease',
    WebkitTapHighlightColor: 'transparent',
    touchAction: 'manipulation',
  }

  const content = (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      style={buttonStyle}
      aria-label={t('openWhatsApp')}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.1)'
        e.currentTarget.style.boxShadow = '0 6px 16px rgba(37, 211, 102, 0.6)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)'
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(37, 211, 102, 0.4)'
      }}
      onTouchStart={(e) => {
        e.currentTarget.style.transform = 'scale(0.95)'
      }}
      onTouchEnd={(e) => {
        e.currentTarget.style.transform = 'scale(1)'
      }}
    >
      <img
        src="/icons8-whatsapp-48.png"
        alt="WhatsApp"
        width="24"
        height="24"
        style={{ 
          display: 'block',
          width: '24px',
          height: '24px'
        }}
      />
    </a>
  )

  if (!mounted || typeof document === 'undefined') return null
  return createPortal(content, document.body)
} 