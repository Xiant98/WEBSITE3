"use client"

import { useEffect, useRef, useState } from 'react'

interface LazyVideoProps {
  src: string
  className?: string
  alt?: string
  poster?: string
  onClick?: () => void
}

export default function LazyVideo({ src, className, alt, poster, onClick }: LazyVideoProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [shouldLoad, setShouldLoad] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry && entry.isIntersecting) {
          setIsVisible(true)
          // Delay loading slightly to avoid loading all videos at once
          setTimeout(() => setShouldLoad(true), 100)
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '50px'
      }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleCanPlay = () => {
    if (videoRef.current && shouldLoad) {
      void videoRef.current.play().catch(() => {
        // Silently handle autoplay failures
      })
    }
  }

  return (
    <div 
      ref={containerRef}
      className={className}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      {shouldLoad ? (
        <video
          src={src}
          muted
          loop
          playsInline
          preload="metadata"
          className="aspect-video h-full w-full rounded-t-md bg-primary object-cover"
          onCanPlay={handleCanPlay}
        />
      ) : (
        <div 
          className="aspect-video h-full w-full rounded-t-md bg-primary object-cover flex items-center justify-center"
          style={{
            backgroundImage: poster ? `url(${poster})` : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {!poster && (
            <div className="w-12 h-12 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />
          )}
        </div>
      )}
    </div>
  )
}