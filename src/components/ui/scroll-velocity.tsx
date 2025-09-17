"use client"

import * as React from "react"
import { motion, useScroll, useSpring, useTransform, useMotionValue, useVelocity, useAnimationFrame, wrap } from "framer-motion"
import { cn } from "@/lib/utils"

interface ScrollVelocityProps extends React.HTMLAttributes<HTMLDivElement> {
  children: string[] | string
  velocity: number
  movable?: boolean
  clamp?: boolean
}

const ScrollVelocity = React.forwardRef<HTMLDivElement, ScrollVelocityProps>(
  ({ children, velocity = 5, movable = true, clamp = false, className, ...props }, ref) => {
    const baseX = useMotionValue(0)
    const { scrollY } = useScroll()
    const scrollVelocity = useVelocity(scrollY)
    const smoothVelocity = useSpring(scrollVelocity, {
      damping: 50,
      stiffness: 100,
    })
    const velocityFactor = useTransform(smoothVelocity, [0, 10000], [0, 5], {
      clamp,
    })

    const x = useTransform(baseX, (v) => `${wrap(0, -50, v)}%`)

    const directionFactor = React.useRef<number>(1)
    const scrollThreshold = React.useRef<number>(5)

    useAnimationFrame((t, delta) => {
      if (movable) {
        move(delta)
      } else {
        if (Math.abs(scrollVelocity.get()) >= scrollThreshold.current) {
          move(delta)
        }
      }
    })

    function move(delta: number) {
      const baseDirection = Math.sign(velocity) || 1
      const speed = Math.abs(velocity)
      let moveBy = baseDirection * speed * (delta / 1000)
      
      // Add scroll-based velocity adjustment while maintaining base direction
      const scrollAdjustment = baseDirection * speed * velocityFactor.get() * (delta / 1000)
      moveBy += scrollAdjustment
      
      baseX.set(baseX.get() + moveBy)
    }

    return (
      <div
        ref={ref}
        className={cn("relative m-0 flex flex-nowrap overflow-hidden leading-relaxed tracking-normal", className)}
        {...props}
      >
        <motion.div
          className="flex flex-row flex-nowrap text-lg font-normal normal-case md:text-xl xl:text-2xl"
          style={{ x }}
        >
          {Array.isArray(children) ? (
            <>
              {Array.from({ length: 3 }).map((_, repeatIdx) => 
                children.map((message, msgIdx) => (
                  <span 
                    key={`${repeatIdx}-${msgIdx}`}
                    className="mr-8 block max-w-[300px] line-clamp-2 whitespace-normal"
                    style={{ 
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}
                  >
                    "{message}"
                  </span>
                ))
              )}
            </>
          ) : (
            <>
              {Array.from({ length: 5 }).map((_, idx) => (
                <span 
                  key={idx}
                  className="mr-8 block max-w-[300px] line-clamp-2 whitespace-normal"
                  style={{ 
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}
                >
                  "{children}"
                </span>
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