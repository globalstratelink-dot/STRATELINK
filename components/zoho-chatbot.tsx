'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    ZOHOIM: any
  }
}

export function ZohoChatbot() {
  useEffect(() => {
    // Supprimer l'ancien script Zoho s'il existe
    const existingScript = document.querySelector('script[src*="zohoim"]')
    if (existingScript) {
      existingScript.remove()
    }

    // Reset le flag pour permettre le rechargement
    if (window.ZOHOIM) {
      window.ZOHOIM.loaded = false
    }

    // Configuration Zoho
    window.ZOHOIM = window.ZOHOIM || {}
    window.ZOHOIM.staticServerPathInfo = {
      css: "https://static.zohocdn.com/zohoim/",
      images: "https://static.zohocdn.com/zohoim/",
      fonts: "https://static.zohocdn.com/zohoim/",
      js: "https://static.zohocdn.com/zohoim/",
      i18n: "https://static.zohocdn.com/zohoim/i18n/"
    }
    window.ZOHOIM.integOrgInfo = {
      integOrgType: "ZOHO_DESK",
      integOrgId: "20109282381"
    }
    
    const nonceScript = document.querySelector('script[nonce]')
    if (nonceScript) {
      window.ZOHOIM.nonce = (nonceScript as HTMLScriptElement).nonce || 
        nonceScript.getAttribute('nonce') || false
    }

    window.ZOHOIM.styles = JSON.stringify({
      mode: "light",
      theme: "#0b1f3b",
      actionTheme: "#1a7063",
      wallpaper: {
        src: {
          id: "wallpapername5",
          light: "https://static.zohocdn.com/zohoim/images/pattern_light_5.9eb8904ec8cba6514bf5.png",
          dark: "https://static.zohocdn.com/zohoim/images/pattern_dark_5.c121183d4bcef5a2077c.png",
          shrink: "https://static.zohocdn.com/zohoim/images/pattern_shrink_5.2f9664cf63219444a16e.png"
        }
      },
      standard: "aa",
      windowSize: "large",
      launcherIcon: { icon: "ZD-TT-imASAP" },
      launcherShape: "bubble",
      position: "right",
      sideSpacing: { value: 16, type: "px" },
      bottomSpacing: { value: 40, type: "px" },
      poweredByTag: { isChecked: false, src: "" }
    })

    window.ZOHOIM.appId = '224c9f6e844f5e259f25fb50b49b2451'
    window.ZOHOIM.isDefaultBotPresent = false
    window.ZOHOIM.baseDomainUrl = 'https://desk.zoho.eu'

    // Charger le script Zoho
    const script = document.createElement('script')
    script.type = 'text/javascript'
    if (window.ZOHOIM.nonce) {
      script.setAttribute('nonce', window.ZOHOIM.nonce)
    }
    script.src = 'https://static.zohocdn.com/zohoim/zohoim-visitor-sdk-1.4.0.js'
    document.head.appendChild(script)

    window.ZOHOIM.loaded = true

    return () => {
      // Cleanup si nécessaire
    }
  }, [])

  return null
}
