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
  description,
  className = ""
}: YouTubeSectionProps) => {
  
  // Extract video ID and determine platform
  const extractYouTubeId = (url: string): string | null => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /youtube\.com\/watch\?.*v=([^&\n?#]+)/
    ];
    
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) return match[1];
    }
    return null;
  };
  
  const extractLoomId = (url: string): string | null => {
    const patterns = [
      /loom\.com\/embed\/([^?&\n#]+)/,
      /loom\.com\/share\/([^?&\n#]+)/
    ];
    
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) return match[1];
    }
    return null;
  };
  
  const youtubeId = extractYouTubeId(videoId);
  const loomId = extractLoomId(videoId);
  const isPlainYouTubeId = /^[\w-]{11}$/.test(videoId);
  const isLoom = !!loomId;
  const isYouTube = !!youtubeId || (!loomId && isPlainYouTubeId);
  const finalVideoId = loomId || youtubeId || (isPlainYouTubeId ? videoId : videoId);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handlePlayClick = () => {
    setIsPlaying(true);
    if (isYouTube || isLoom) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const getThumbnailUrl = (videoId: string) => {
    if (isLoom) {
      // Loom doesn't have a public thumbnail API, so we'll use a generic video placeholder (SSR-safe)
      return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720"><rect width="100%" height="100%" fill="%231a1a1a"/><circle cx="640" cy="360" r="60" fill="%236366f1" opacity="0.8"/><polygon points="620,340 620,380 660,360" fill="white"/><text x="640" y="420" text-anchor="middle" fill="%239ca3af" font-family="Arial, sans-serif" font-size="24">Loom Video</text></svg>`;
    }
    if (isYouTube) {
      return `https://img.youtube.com/vi/${finalVideoId}/maxresdefault.jpg`;
    }
    // Fallback for unknown video types
    return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720"><rect width="100%" height="100%" fill="%231a1a1a"/><circle cx="640" cy="360" r="60" fill="%236366f1" opacity="0.8"/><polygon points="620,340 620,380 660,360" fill="white"/><text x="640" y="420" text-anchor="middle" fill="%239ca3af" font-family="Arial, sans-serif" font-size="24">Video</text></svg>`;
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

        {/* Video Player Container - Full width with 90% and margins */}
        <motion.div 
          className="relative w-[90%] mx-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className={`relative w-full h-0 ${isLoom ? 'pb-[65%]' : 'pb-[56.25%]'} rounded-2xl overflow-hidden shadow-2xl bg-black`}>
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
                    src={getThumbnailUrl(finalVideoId)}
                    alt="Video thumbnail"
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback to default thumbnail if maxres doesn't exist
                      const target = e.target as HTMLImageElement;
                      if (isYouTube) {
                        target.src = `https://img.youtube.com/vi/${finalVideoId}/hqdefault.jpg`;
                      }
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
                  {/* Video iFrame - YouTube or Loom */}
                  {(isYouTube || isLoom) ? (
                    <iframe
                      ref={iframeRef}
                      src={isLoom 
                        ? `https://www.loom.com/embed/${finalVideoId}?autoplay=1&hideTitle=true`
                        : `https://www.youtube.com/embed/${finalVideoId}?autoplay=1&rel=0&showinfo=0&modestbranding=1`
                      }
                      title={isLoom ? "Loom video player" : "YouTube video player"}
                      className="absolute inset-0 w-full h-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      onLoad={handleIframeLoad}
                      {...(isLoom && {
                        webkitallowfullscreen: "true",
                        mozallowfullscreen: "true"
                      })}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-black">
                      <div className="flex flex-col items-center text-white">
                        <p className="text-lg mb-4">Unsupported video type</p>
                        <p className="text-sm text-gray-400">Please provide a YouTube or Loom video URL</p>
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
            I specialize in deep data-driven personalization that companies & firms struggle to replicate due to compliance and ethical reasons.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default YouTubeSection;