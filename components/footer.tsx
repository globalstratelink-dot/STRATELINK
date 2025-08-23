"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from 'framer-motion'
import { useLanguage } from "@/contexts/language-context"

export function Footer() {
  const { t } = useLanguage()
  
  return (
    <footer className="bg-navy border-t border-copper/20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <motion.div
          className="absolute top-10 left-10 w-32 h-32 bg-copper/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-24 h-24 bg-sand/20 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.6, 0.3, 0.6] }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Footer Content */}
        <div className="py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Copyright */}
            <motion.div 
              className="text-gray-400 text-sm mb-4 md:mb-0 text-center md:text-left"
              whileHover={{ color: "#A97968" }}
            >
              © 2025 STRATELINK GLOBAL {t('allRightsReserved')}
            </motion.div>
            
            {/* Credits */}
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 text-sm">
              {/* Created by viviworks */}
              <div className="flex items-center space-x-2">
                <span className="text-gray-400">{t('createdBy')}</span>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                >
                  <Link 
                    href="https://viviworks.fr" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-copper hover:text-sand font-semibold transition-colors duration-300"
                  >
                    viviworks
                  </Link>
                </motion.div>
              </div>
              
              {/* Designed by STRATELINK */}
              <div className="flex items-center space-x-2">
                <span className="text-gray-400">{t('designedBy')}</span>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-1"
                >
                  <Image
                    src="/optimized/new-logo-16x16.png"
                    alt="STRATELINK"
                    width={16}
                    height={16}
                    className="w-4 h-4 filter brightness-110"
                  />
                  <span className="text-copper font-semibold">STRATELINK</span>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
