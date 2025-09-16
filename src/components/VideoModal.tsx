import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Maximize, Minimize, Play, Pause } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoId: string;
}

export default function VideoModal({ isOpen, onClose, videoId }: VideoModalProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const modalRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Fullscreen functionality
  const toggleFullscreen = () => {
    if (!modalRef.current) return;

    if (!isFullscreen) {
      if (modalRef.current.requestFullscreen) {
        modalRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  // Speed control options
  const speedOptions = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

  // YouTube iframe src with autoplay and controls
  const videoSrc = `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&rel=0&modestbranding=1`;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={modalRef}
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Background Overlay - 50% darkened */}
          <motion.div
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Video Container */}
          <motion.div
            className={`relative w-full max-w-6xl mx-4 ${
              isFullscreen ? 'h-screen w-screen max-w-none mx-0' : 'aspect-video'
            }`}
            initial={{ scale: 0.8, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 20 }}
            transition={{ 
              type: "spring",
              damping: 25,
              stiffness: 200
            }}
          >
            {/* Controls Bar */}
            <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/60 to-transparent p-4">
              <div className="flex items-center justify-between">
                {/* Left side - Speed Controls */}
                <div className="flex items-center space-x-2">
                  <span className="text-white text-sm font-medium">Speed:</span>
                  <select
                    value={playbackRate}
                    onChange={(e) => setPlaybackRate(Number(e.target.value))}
                    className="bg-black/50 text-white text-sm rounded px-2 py-1 border border-white/20 focus:outline-none focus:border-white/40"
                  >
                    {speedOptions.map((speed) => (
                      <option key={speed} value={speed}>
                        {speed}x
                      </option>
                    ))}
                  </select>
                </div>

                {/* Right side - Action buttons */}
                <div className="flex items-center space-x-2">
                  <motion.button
                    onClick={toggleFullscreen}
                    className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isFullscreen ? (
                      <Minimize className="w-5 h-5" />
                    ) : (
                      <Maximize className="w-5 h-5" />
                    )}
                  </motion.button>
                  <motion.button
                    onClick={onClose}
                    className="p-2 bg-black/50 rounded-lg text-white hover:bg-red-500/70 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Video Player */}
            <iframe
              ref={iframeRef}
              src={videoSrc}
              className="w-full h-full rounded-lg"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{
                border: 'none',
              }}
            />

            {/* Loading Animation */}
            <motion.div
              className="absolute inset-0 bg-black/20 flex items-center justify-center rounded-lg"
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              style={{ pointerEvents: 'none' }}
            >
              <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin" />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}