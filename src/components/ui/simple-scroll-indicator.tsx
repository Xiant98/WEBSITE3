'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const SimpleScrollIndicator = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const aboutSection = document.getElementById('about');
    if (!aboutSection) return;

    // Use IntersectionObserver for better compatibility with Locomotive Scroll
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) {
          // Hide arrow when about section starts becoming visible
          setIsVisible(!entry.isIntersecting);
        }
      },
      {
        rootMargin: '0px', // Hide immediately when section starts entering viewport
        threshold: 0
      }
    );

    observer.observe(aboutSection);

    return () => {
      observer.disconnect();
    };
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed bottom-16 left-1/2 transform -translate-x-1/2 z-50 flex flex-col items-center pointer-events-none"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.5 }}
    >
      
      {/* Simple blue down arrow - minimal design */}
      <motion.div
        animate={{ 
          y: [0, 8, 0],
          opacity: [0.8, 1, 0.8]
        }}
        transition={{ 
          duration: 1.5, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="w-8 h-8"
      >
        <svg 
          className="w-full h-full" 
          fill="#3B82F6" 
          viewBox="0 0 24 24"
        >
          <path d="M7 10l5 5 5-5z"/>
        </svg>
      </motion.div>
    </motion.div>
  );
};

export default SimpleScrollIndicator;