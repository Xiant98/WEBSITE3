"use client"

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

// Dynamically import Spline to defer loading
const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-transparent">
      <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
    </div>
  )
})

interface DeferredSplineProps {
  scene: string
  className?: string
}

export default function DeferredSpline({ scene, className }: DeferredSplineProps) {
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    // Defer Spline loading until after critical content has had time to load
    const timer = setTimeout(() => {
      setShouldLoad(true)
    }, 2000) // 2 second delay

    return () => clearTimeout(timer)
  }, [])

  if (!shouldLoad) {
    return (
      <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-transparent ${className}`}>
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin mx-auto" />
          <p className="text-sm text-muted-foreground">Loading 3D scene...</p>
        </div>
      </div>
    )
  }

  return (
    <Spline 
      scene={scene}
      className={className}
    />
  )
}