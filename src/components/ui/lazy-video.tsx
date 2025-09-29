"use client"

import { useEffect, useRef, useState } from 'react'
import { Play } from 'lucide-react'

interface LazyVideoProps {
  src: string
  className?: string
  alt?: string
  poster?: string
  onClick?: () => void
  showPlayButton?: boolean
}

export default function LazyVideo({ src, className, alt, poster, onClick, showPlayButton = true }: LazyVideoProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [shouldLoad, setShouldLoad] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
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
      void videoRef.current.play().then(() => {
        setIsPlaying(true)
      }).catch(() => {
        // Silently handle autoplay failures
      })
    }
  }

  return (
    <div 
      ref={containerRef}
      className={`${className} relative group`}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      {shouldLoad ? (
        <>
          <video
            ref={videoRef}
            src={src}
            muted
            loop
            playsInline
            autoPlay
            preload="metadata"
            className="aspect-video h-full w-full rounded-t-md bg-primary object-cover"
            onCanPlay={handleCanPlay}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />
          {showPlayButton && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-[0_0_0_3px_hsl(var(--primary)/0.3)] group-hover:shadow-[0_0_0_3px_hsl(var(--primary)/0.5)] transform transition-all duration-300 group-hover:scale-110">
                <Play className="w-8 h-8 text-black fill-black ml-1" />
              </div>
            </div>
          )}
        </>
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
          {showPlayButton && poster && (
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-[0_0_0_3px_hsl(var(--primary)/0.3)]">
              <Play className="w-8 h-8 text-black fill-black ml-1" />
            </div>
          )}
        </div>
      )}
    </div>
  )
}