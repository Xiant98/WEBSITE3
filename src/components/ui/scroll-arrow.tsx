'use client';

import { motion } from 'framer-motion';

interface ScrollArrowProps {
  className?: string;
}

const ScrollArrow = ({ className = "" }: ScrollArrowProps) => {
  const handleClick = () => {
    // Scroll to the about section (next section)
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center py-12 ${className}`}>
      {/* Text indicator */}
      <motion.p 
        className="text-primary/70 text-sm mb-4 font-medium tracking-wide uppercase"
        initial={{ opacity: 0.6 }}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        Scroll to continue
      </motion.p>
      
      {/* Animated arrow */}
      <motion.button
        onClick={handleClick}
        className="group cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-full p-2"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          animate={{ 
            y: [0, 12, 0],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{ 
            duration: 1.8, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-8 h-8 text-primary group-hover:text-primary/80 transition-colors duration-200"
        >
          <svg 
            className="w-full h-full" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            strokeWidth={2}
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              d="M19 14l-7 7m0 0l-7-7m7 7V3" 
            />
          </svg>
        </motion.div>
      </motion.button>

      {/* Pulsing dot indicator */}
      <motion.div
        className="mt-2 w-2 h-2 bg-primary rounded-full"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.5, 1, 0.5]
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
};

export default ScrollArrow;