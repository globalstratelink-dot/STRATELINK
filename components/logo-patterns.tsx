"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

export function LogoPattern({ className = "", animated = true }: { className?: string, animated?: boolean }) {
  return (
    <div className={`relative ${className}`}>
      <div className="grid grid-cols-3 gap-8 opacity-15">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className={`relative ${animated ? 'animate-pulse' : ''}`}
            style={{ animationDelay: `${i * 200}ms` }}
          >
            <div className="absolute inset-0 bg-copper/10 rounded-lg blur-sm"></div>
            <Image
              src="/logo.png"
              alt="Pattern"
              width={60}
              height={60}
              className="w-15 h-15 opacity-60 filter brightness-125 contrast-110 relative z-10"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export function HexagonalPattern({ size = 40, opacity = 0.1 }: { size?: number, opacity?: number }) {
  const [isClient, setIsClient] = useState(false)
  
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Positions fixes pour éviter l'hydration mismatch
  const hexagonPositions = [
    { left: '10%', top: '10%', delay: 0, duration: 8 },
    { left: '35%', top: '15%', delay: 500, duration: 9 },
    { left: '60%', top: '20%', delay: 1000, duration: 10 },
    { left: '85%', top: '25%', delay: 1500, duration: 11 },
    { left: '15%', top: '45%', delay: 2000, duration: 12 },
    { left: '40%', top: '50%', delay: 2500, duration: 8 },
    { left: '65%', top: '55%', delay: 3000, duration: 9 },
    { left: '90%', top: '60%', delay: 3500, duration: 10 },
    { left: '20%', top: '80%', delay: 4000, duration: 11 },
    { left: '45%', top: '85%', delay: 4500, duration: 12 },
    { left: '70%', top: '90%', delay: 5000, duration: 8 },
    { left: '95%', top: '95%', delay: 5500, duration: 9 }
  ]
  
  if (!isClient) {
    return null // Ne rend rien côté serveur
  }
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="relative w-full h-full">
        {hexagonPositions.map((pos, i) => (
          <div
            key={i}
            className="absolute animate-float-slow"
            style={{
              left: pos.left,
              top: pos.top,
              animationDelay: `${pos.delay}ms`,
              animationDuration: `${pos.duration}s`
            }}
          >
            <div
              className="bg-copper/20 transform rotate-45"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                opacity: opacity,
                clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)'
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export function GeometricOverlay() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg className="w-full h-full opacity-5" viewBox="0 0 1000 1000">
        <defs>
          <pattern id="hexPattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <polygon
              points="50,5 85,25 85,65 50,85 15,65 15,25"
              fill="none"
              stroke="#A97968"
              strokeWidth="1"
              className="animate-pulse"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hexPattern)" />
      </svg>
    </div>
  )
}
