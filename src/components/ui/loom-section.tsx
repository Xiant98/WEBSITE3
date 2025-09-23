'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Loader2 } from 'lucide-react';
import Image from 'next/image';

interface LoomSectionProps {
  loomUrl: string;
  title?: string;
  description?: string;
  className?: string;
}

const LoomSection = ({ 
  loomUrl,
  title = "Watch Our Story",
  description,
  className = ""
}: LoomSectionProps) => {
  
  // Extract Loom video ID and preserve full URL with parameters
  const extractLoomId = (url: string): string | null => {
    if (!url || typeof url !== 'string') return null;
    
    const patterns = [
      /loom\.com\/embed\/([^?&\n#]+)/,
      /loom\.com\/share\/([^?&\n#]+)/
    ];
    
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match?.[1]) return match[1];
    }
    return null;
  };
  
  const loomId = extractLoomId(loomUrl);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handlePlayClick = () => {
    if (!loomId) {
      setIsPlaying(true);
      setIsLoading(false);
      return;
    }
    setIsPlaying(true);
    setIsLoading(true);
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  // Loom doesn't have a public thumbnail API, so we use a custom placeholder
  const getThumbnailUrl = () => {
    return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720"><rect width="100%" height="100%" fill="%231a1a1a"/><circle cx="640" cy="360" r="60" fill="%236366f1" opacity="0.8"/><polygon points="620,340 620,380 660,360" fill="white"/><text x="640" y="420" text-anchor="middle" fill="%239ca3af" font-family="Arial, sans-serif" font-size="24">Loom Video</text></svg>`;
  };

  return (
    <section className={`py-16 md:py-24 bg-background ${className}`} data-scroll-section>
      <div className="container mx-auto px-4 max-w-none">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground">
            {title}
          </h2>
          {description && (
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </motion.div>

        {/* Loom Player Container - Full width with 90% and margins */}
        <motion.div 
          className="relative w-[90%] mx-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative w-full h-0 pb-[65%] rounded-2xl overflow-hidden shadow-2xl bg-black">
            <AnimatePresence mode="wait">
              {!isPlaying ? (
                // Thumbnail with Play Button
                <motion.div
                  key="thumbnail"
                  className="absolute inset-0 cursor-pointer group"
                  onClick={handlePlayClick}
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Loom Thumbnail */}
                  <Image
                    src={getThumbnailUrl()}
                    alt="Loom video thumbnail"
                    className="absolute inset-0 w-full h-full object-cover"
                    fill
                    priority
                  />
                  
                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300" />
                  
                  {/* Play Button */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="bg-primary/90 rounded-full p-6 md:p-8 group-hover:bg-primary transition-colors duration-300 shadow-lg">
                      <Play className="w-8 h-8 md:w-12 md:h-12 text-white fill-white ml-1" />
                    </div>
                  </motion.div>

                  {/* Loading indicator for thumbnail */}
                  <div className="absolute bottom-4 right-4">
                    <div className="bg-black/60 rounded-full px-3 py-1">
                      <p className="text-white text-sm font-medium">Click to play</p>
                    </div>
                  </div>
                </motion.div>
              ) : (
                // Loom iFrame with Loading Overlay
                <motion.div
                  key="video"
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Loom Video iFrame */}
                  {loomId ? (
                    <iframe
                      ref={iframeRef}
                      src={`${loomUrl}${loomUrl.includes('?') ? '&' : '?'}autoplay=1`}
                      title="Loom video player"
                      className="absolute inset-0 w-full h-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      onLoad={handleIframeLoad}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-black">
                      <div className="flex flex-col items-center text-white">
                        <p className="text-lg mb-4">Invalid Loom URL</p>
                        <p className="text-sm text-gray-400">Please provide a valid Loom video URL</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Loading Overlay - Only shown while loading */}
                  {isLoading && (
                    <div className="absolute inset-0 bg-black flex items-center justify-center z-10">
                      <div className="flex flex-col items-center">
                        <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
                        <p className="text-white text-lg">Loading video...</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Optional bottom text */}
        <motion.div 
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-muted-foreground">
            I specialize in deep data-driven personalization that companies & firms struggle to replicate due to technical and ethical reasons.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default LoomSection;