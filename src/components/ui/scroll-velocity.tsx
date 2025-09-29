"use client"

import * as React from "react"
import { motion, useScroll, useTransform, useMotionValue, useVelocity, useAnimationFrame, useSpring, wrap, type MotionValue } from "framer-motion"
import { cn } from "@/lib/utils"

interface ScrollVelocityProps extends React.HTMLAttributes<HTMLDivElement> {
  children: string[] | string
  velocity: number
  movable?: boolean
  clamp?: boolean
}

const ScrollVelocity = React.forwardRef<HTMLDivElement, ScrollVelocityProps>(
  ({ children, velocity = 5, movable = true, clamp: _clamp = false, className, ...props }, ref) => {
    const baseX = useMotionValue(0)
    const { scrollY } = useScroll()
    const scrollVelocity = useVelocity(scrollY)
    const smoothVelocity = useSpring(scrollVelocity, {
      damping: 50,
      stiffness: 400,
    })
    const velocityFactor = useTransform(
      smoothVelocity as unknown as MotionValue<number>,
      [0, 1000], 
      [0, 3], 
      { clamp: true }
    )

    const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`)

    // const directionFactor = React.useRef<number>(1) // Unused
    const scrollThreshold = React.useRef<number>(5)

    useAnimationFrame((t, delta) => {
      if (movable) {
        move(delta)
      } else {
        if (Math.abs(smoothVelocity.get() as number) >= scrollThreshold.current) {
          move(delta)
        }
      }
    })

    const move = React.useCallback((delta: number) => {
      const baseDirection = Math.sign(velocity) || 1
      const speed = Math.abs(velocity)
      const baseMove = baseDirection * speed * (delta / 1000)
      
      // Optimize: reduce complexity of scroll-based adjustment
      const scrollFactor = velocityFactor.get()
      const scrollAdjustment = baseDirection * speed * scrollFactor * (delta / 1000) * 0.5
      
      baseX.set(baseX.get() + baseMove + scrollAdjustment)
    }, [velocity, velocityFactor, baseX])

    return (
      <div
        ref={ref}
        className={cn("relative m-0 w-full flex flex-nowrap overflow-hidden leading-relaxed tracking-normal px-4 md:px-6", className)}
        {...props}
      >
        <motion.div
          className="flex flex-row flex-nowrap gap-6 md:gap-12 text-sm md:text-lg font-normal normal-case md:text-xl xl:text-xl"
          style={{ 
            x,
            willChange: 'transform',
            transform: 'translateZ(0)'
          }}
        >
          {Array.isArray(children) ? (
            <>
              {Array.from({ length: 2 }).map((_, repeatIdx) => 
                children.map((message, msgIdx) => (
                  <span 
                    key={`${repeatIdx}-${msgIdx}`}
                    className="block flex-none whitespace-normal leading-relaxed"
                    style={{ 
                      width: 'clamp(120px, 25vw, 300px)'
                    }}
                    dangerouslySetInnerHTML={{ __html: `"${message}"` }}
                  />
                ))
              )}
            </>
          ) : (
            <>
              {Array.from({ length: 5 }).map((_, idx) => (
                <span 
                  key={idx}
                  className="block flex-none whitespace-normal leading-relaxed"
                  style={{ 
                    width: 'clamp(120px, 25vw, 300px)'
                  }}
                  dangerouslySetInnerHTML={{ __html: `"${children}"` }}
                />
              ))}
            </>
          )}
        </motion.div>
      </div>
    )
  }
)
ScrollVelocity.displayName = "ScrollVelocity"

export { ScrollVelocity, type ScrollVelocityProps }