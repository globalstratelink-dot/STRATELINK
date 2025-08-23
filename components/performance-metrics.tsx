"use client"

import { useEffect, useState } from 'react'

interface PerformanceMetrics {
  fcp: number | null
  lcp: number | null
  cls: number | null
  fid: number | null
  ttfb: number | null
}

export function PerformanceMetrics() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fcp: null,
    lcp: null,
    cls: null,
    fid: null,
    ttfb: null
  })

  useEffect(() => {
    // Mesurer le FCP (First Contentful Paint)
    if ('PerformanceObserver' in window) {
      const fcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const fcpEntry = entries.find(entry => entry.name === 'first-contentful-paint')
        if (fcpEntry) {
          setMetrics(prev => ({ ...prev, fcp: fcpEntry.startTime }))
        }
      })
      
      try {
        fcpObserver.observe({ entryTypes: ['paint'] })
      } catch (e) {
        console.warn('FCP observer failed:', e)
      }

      // Mesurer le LCP (Largest Contentful Paint)
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1]
        if (lastEntry) {
          setMetrics(prev => ({ ...prev, lcp: lastEntry.startTime }))
        }
      })
      
      try {
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })
      } catch (e) {
        console.warn('LCP observer failed:', e)
      }

      // Mesurer le CLS (Cumulative Layout Shift)
      const clsObserver = new PerformanceObserver((list) => {
        let clsValue = 0
        for (const entry of list.getEntries()) {
          const layoutShiftEntry = entry as any
          if (!layoutShiftEntry.hadRecentInput) {
            clsValue += layoutShiftEntry.value || 0
          }
        }
        setMetrics(prev => ({ ...prev, cls: clsValue }))
      })
      
      try {
        clsObserver.observe({ entryTypes: ['layout-shift'] })
      } catch (e) {
        console.warn('CLS observer failed:', e)
      }

      // Mesurer le FID (First Input Delay)
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const fidEntry = entries.find(entry => entry.name === 'first-input')
        if (fidEntry) {
          setMetrics(prev => ({ ...prev, fid: (fidEntry as any).processingStart - fidEntry.startTime }))
        }
      })
      
      try {
        fidObserver.observe({ entryTypes: ['first-input'] })
      } catch (e) {
        console.warn('FID observer failed:', e)
      }

      // Mesurer le TTFB (Time to First Byte)
      const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      if (navigationEntry) {
        setMetrics(prev => ({ ...prev, ttfb: navigationEntry.responseStart - navigationEntry.requestStart }))
      }

      return () => {
        fcpObserver.disconnect()
        lcpObserver.disconnect()
        clsObserver.disconnect()
        fidObserver.disconnect()
      }
    }
  }, [])

  const getMetricColor = (metric: keyof PerformanceMetrics, value: number | null) => {
    if (value === null) return 'text-gray-500'
    
    const thresholds = {
      fcp: { good: 1800, poor: 3000 },
      lcp: { good: 2500, poor: 4000 },
      cls: { good: 0.1, poor: 0.25 },
      fid: { good: 100, poor: 300 },
      ttfb: { good: 800, poor: 1800 }
    }
    
    const threshold = thresholds[metric]
    if (value <= threshold.good) return 'text-green-600'
    if (value <= threshold.poor) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getMetricLabel = (metric: keyof PerformanceMetrics, value: number | null) => {
    if (value === null) return 'Mesuré...'
    
    const thresholds = {
      fcp: { good: 1800, poor: 3000 },
      lcp: { good: 2500, poor: 4000 },
      cls: { good: 0.1, poor: 0.25 },
      fid: { good: 100, poor: 300 },
      ttfb: { good: 800, poor: 1800 }
    }
    
    const threshold = thresholds[metric]
    if (value <= threshold.good) return 'Excellent'
    if (value <= threshold.poor) return 'Bon'
    return 'À améliorer'
  }

  const formatMetric = (value: number | null) => {
    if (value === null) return '...'
    if (value < 1000) return `${Math.round(value)}ms`
    return `${(value / 1000).toFixed(1)}s`
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg p-4 shadow-lg z-50 max-w-xs">
      <h3 className="text-sm font-semibold text-gray-800 mb-3">Métriques de Performance</h3>
      
      <div className="space-y-2 text-xs">
        <div className="flex justify-between">
          <span className="text-gray-600">FCP:</span>
          <span className={getMetricColor('fcp', metrics.fcp)}>
            {formatMetric(metrics.fcp)} - {getMetricLabel('fcp', metrics.fcp)}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">LCP:</span>
          <span className={getMetricColor('lcp', metrics.lcp)}>
            {formatMetric(metrics.lcp)} - {getMetricLabel('lcp', metrics.lcp)}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">CLS:</span>
          <span className={getMetricColor('cls', metrics.cls)}>
            {metrics.cls ? metrics.cls.toFixed(3) : '...'} - {getMetricLabel('cls', metrics.cls)}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">FID:</span>
          <span className={getMetricColor('fid', metrics.fid)}>
            {formatMetric(metrics.fid)} - {getMetricLabel('fid', metrics.fid)}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">TTFB:</span>
          <span className={getMetricColor('ttfb', metrics.ttfb)}>
            {formatMetric(metrics.ttfb)} - {getMetricLabel('ttfb', metrics.ttfb)}
          </span>
        </div>
      </div>
      
              <div className="mt-3 pt-2 border-t border-gray-200">
          <div className="text-xs text-gray-500">
            Objectif: FCP &lt; 1.8s, LCP &lt; 2.5s, CLS &lt; 0.1
          </div>
        </div>
    </div>
  )
} 