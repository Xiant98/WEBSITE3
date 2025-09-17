"use client"

import * as React from "react"
import { ScrollVelocity } from "./scroll-velocity"

const FlowingBackground = () => {
  // Create flowing gradient streams at different velocities and positions
  const streamElements = React.useMemo(() => {
    return Array.from({ length: 15 }, (_, i) => (
      <div
        key={i}
        className="h-1 bg-gradient-to-r from-purple-500/20 via-blue-500/30 to-cyan-400/20 rounded-full"
        style={{
          width: `${Math.random() * 400 + 200}px`,
          marginRight: `${Math.random() * 100 + 50}px`,
        }}
      />
    ))
  }, [])

  const velocities = [2, -1.5, 3, -2.5, 1.8, -3.2, 2.8]

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Multiple layers of flowing streams */}
      <div className="absolute inset-0 flex flex-col justify-center space-y-8 transform rotate-12 scale-150">
        {velocities.map((velocity, index) => (
          <ScrollVelocity
            key={index}
            velocity={velocity}
            className="opacity-60"
            style={{
              transform: `translateY(${index * 80 - 200}px)`,
            }}
          >
            {streamElements}
          </ScrollVelocity>
        ))}
      </div>

      {/* Additional diagonal streams */}
      <div className="absolute inset-0 flex flex-col justify-center space-y-12 transform -rotate-6 scale-125">
        {velocities.slice(0, 4).map((velocity, index) => (
          <ScrollVelocity
            key={`diagonal-${index}`}
            velocity={velocity * 0.7}
            className="opacity-40"
            style={{
              transform: `translateY(${index * 120 - 100}px)`,
            }}
          >
            {Array.from({ length: 10 }, (_, i) => (
              <div
                key={i}
                className="h-0.5 bg-gradient-to-r from-indigo-500/25 via-purple-400/35 to-pink-400/25 rounded-full"
                style={{
                  width: `${Math.random() * 300 + 150}px`,
                  marginRight: `${Math.random() * 80 + 40}px`,
                }}
              />
            ))}
          </ScrollVelocity>
        ))}
      </div>

      {/* Subtle overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black/5 to-purple-900/10" />
    </div>
  )
}

export { FlowingBackground }