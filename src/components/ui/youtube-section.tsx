'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Loader2 } from 'lucide-react';

interface YouTubeSectionProps {
  videoId?: string;
  title?: string;
  description?: string;
  className?: string;
}

const YouTubeSection = ({ 
  videoId = "dQw4w9WgXcQ", // Placeholder - Rick Roll 
  title = "Watch Our Story",
  description = "Discover how we're revolutionizing mass messaging with personal touch",
  className = ""
}: YouTubeSectionProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handlePlayClick = () => {
    setIsLoading(true);
    setIsPlaying(true);
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const getThumbnailUrl = (videoId: string) => {
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
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
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {description}
          </p>
        </motion.div>

        {/* Video Player Container - Full width with 90% and margins */}
        <motion.div 
          className="relative w-[90%] mx-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative w-full h-0 pb-[56.25%] rounded-2xl overflow-hidden shadow-2xl bg-black">
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
                  {/* Video Thumbnail */}
                  <img
                    src={getThumbnailUrl(videoId)}
                    alt="Video thumbnail"
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback to default thumbnail if maxres doesn't exist
                      const target = e.target as HTMLImageElement;
                      target.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                    }}
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
                // YouTube iFrame with Loading Overlay
                <motion.div
                  key="video"
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* YouTube iFrame - Always rendered when playing */}
                  <iframe
                    ref={iframeRef}
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&showinfo=0&modestbranding=1`}
                    title="YouTube video player"
                    className="absolute inset-0 w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    onLoad={handleIframeLoad}
                  />
                  
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
            See how we&apos;re transforming business communication with AI-powered personalization
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default YouTubeSection;