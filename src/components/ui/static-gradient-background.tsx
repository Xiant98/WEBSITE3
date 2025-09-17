"use client"

import * as React from "react"

const StaticGradientBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Main diagonal gradient line */}
      <div className="absolute inset-0">
        <div 
          className="absolute w-[150%] h-[150%] bg-gradient-to-br from-transparent via-purple-500/30 to-blue-500/40"
          style={{
            transform: 'rotate(-15deg) translate(-20%, -20%)',
            transformOrigin: 'center',
            maskImage: 'linear-gradient(135deg, transparent 30%, white 45%, white 55%, transparent 70%)',
            WebkitMaskImage: 'linear-gradient(135deg, transparent 30%, white 45%, white 55%, transparent 70%)'
          }}
        />
        
        {/* Subtle additional glow */}
        <div 
          className="absolute w-[120%] h-[120%] bg-gradient-to-br from-transparent via-blue-400/20 to-cyan-500/25"
          style={{
            transform: 'rotate(-15deg) translate(-10%, -10%)',
            transformOrigin: 'center',
            maskImage: 'linear-gradient(135deg, transparent 35%, white 48%, white 52%, transparent 65%)',
            WebkitMaskImage: 'linear-gradient(135deg, transparent 35%, white 48%, white 52%, transparent 65%)'
          }}
        />
      </div>
      
      {/* Subtle overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-black/20" />
    </div>
  )
}

export { StaticGradientBackground }