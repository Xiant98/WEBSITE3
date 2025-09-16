import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Maximize, Minimize } from 'lucide-react';

// YouTube Player API types
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoId: string;
}

export default function VideoModal({ isOpen, onClose, videoId }: VideoModalProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [player, setPlayer] = useState<any>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);

  // Load YouTube API and initialize player
  useEffect(() => {
    if (!isOpen) return;

    // Load YouTube API if not already loaded
    if (!window.YT) {
      const script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(script);

      window.onYouTubeIframeAPIReady = () => {
        initializePlayer();
      };
    } else {
      initializePlayer();
    }

    function initializePlayer() {
      if (playerRef.current && !player) {
        const newPlayer = new window.YT.Player(playerRef.current, {
          height: '100%',
          width: '100%',
          videoId: videoId,
          playerVars: {
            autoplay: 1,
            controls: 1,
            rel: 0,
            modestbranding: 1,
            enablejsapi: 1,
            origin: window.location.origin
          },
          events: {
            onReady: (event: any) => {
              setPlayer(event.target);
            }
          }
        });
      }
    }
  }, [isOpen, videoId, player]);

  // Handle escape key and fullscreen changes
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('fullscreenchange', handleFullscreenChange);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Update playback rate when player is ready and rate changes
  useEffect(() => {
    if (player && player.setPlaybackRate) {
      player.setPlaybackRate(playbackRate);
    }
  }, [player, playbackRate]);

  // Clean up player when modal closes
  useEffect(() => {
    if (!isOpen && player) {
      player.destroy();
      setPlayer(null);
    }
  }, [isOpen, player]);

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
            <div
              ref={playerRef}
              className="w-full h-full rounded-lg"
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