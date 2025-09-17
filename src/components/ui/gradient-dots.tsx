'use client';

import React from 'react';
import { motion } from 'framer-motion';

type GradientDotsProps = React.ComponentProps<typeof motion.div> & {
        /** Dot size (default: 12) */
        dotSize?: number;
        /** Spacing between dots (default: 20) */
        spacing?: number;
        /** Animation duration (default: 15) */
        duration?: number;
        /** Color cycle duration (default: 4) */
        colorCycleDuration?: number;
        /** Background color (default: 'var(--background)') */
        backgroundColor?: string;
};

export function GradientDots({
        dotSize = 12,
        spacing = 20,
        duration = 15,
        colorCycleDuration = 4,
        backgroundColor = 'var(--background)',
        className,
        ...props
}: GradientDotsProps) {
        const hexSpacing = spacing * 1.732; // Hexagonal spacing calculation

        return (
                <motion.div
                        className={`fixed inset-0 pointer-events-none ${className}`}
                        style={{
                                backgroundColor,
                                backgroundImage: `
          radial-gradient(circle at 50% 50%, transparent ${dotSize/3}px, ${backgroundColor} 0 ${dotSize}px, transparent ${dotSize}px),
          radial-gradient(circle at 50% 50%, transparent ${dotSize/3}px, ${backgroundColor} 0 ${dotSize}px, transparent ${dotSize}px),
          radial-gradient(circle at 30% 40%, #ff0050, transparent 70%),
          radial-gradient(circle at 70% 60%, #ff8c00, transparent 70%),
          radial-gradient(circle at 20% 70%, #ffd700, transparent 70%),
          radial-gradient(circle at 80% 30%, #32cd32, transparent 70%),
          radial-gradient(circle at 40% 80%, #1e90ff, transparent 70%),
          radial-gradient(circle at 60% 20%, #8a2be2, transparent 70%)
        `,
                                backgroundSize: `
          ${spacing}px ${hexSpacing}px,
          ${spacing}px ${hexSpacing}px,
          300% 300%,
          250% 250%,
          280% 280%,
          320% 320%,
          260% 260%,
          290% 290%
        `,
                                backgroundPosition: `
          0px 0px, ${spacing / 2}px ${hexSpacing / 2}px,
          0% 0%,
          100% 100%,
          50% 50%,
          0% 100%,
          100% 0%,
          25% 75%
        `,
                        }}
                        animate={{
                                backgroundPosition: [
                                        `0px 0px, ${spacing / 2}px ${hexSpacing / 2}px, 
           800% 400%, 1200% -600%, -800% -400%, 
           1000% 800%, -1200% -800%, 600% 1000%`,
                                        `0px 0px, ${spacing / 2}px ${hexSpacing / 2}px, 
           0% 0%, 100% 100%, 50% 50%, 
           0% 100%, 100% 0%, 25% 75%`,
                                ],
                                filter: ['hue-rotate(0deg)', 'hue-rotate(360deg)'],
                        }}
                        transition={{
                                backgroundPosition: {
                                        duration: duration,
                                        ease: 'linear',
                                        repeat: Number.POSITIVE_INFINITY,
                                },
                                filter: {
                                        duration: colorCycleDuration,
                                        ease: 'linear',
                                        repeat: Number.POSITIVE_INFINITY,
                                },
                        }}
                        {...props}
                />
        );
}