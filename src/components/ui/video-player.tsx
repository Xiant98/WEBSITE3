"use client";

import React, { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, Volume2, Volume1, VolumeX, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

const CustomSlider = ({
  value,
  onChange,
  className,
}: {
  value: number;
  onChange: (value: number) => void;
  className?: string;
}) => {
  return (
    <motion.div
      className={cn(
        "relative w-full h-1 bg-white/20 rounded-full cursor-pointer",
        className
      )}
      onClick={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percentage = (x / rect.width) * 100;
        onChange(Math.min(Math.max(percentage, 0), 100));
      }}
    >
      <motion.div
        className="absolute top-0 left-0 h-full bg-white rounded-full"
        style={{ width: `${value}%` }}
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />
    </motion.div>
  );
};

interface VideoPlayerProps {
  isOpen: boolean;
  onClose: () => void;
  videoId: string;
}

const VideoPlayer = ({ isOpen, onClose, videoId }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLIFrameElement>(null);
  const [player, setPlayer] = useState<any>(null);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showControls, setShowControls] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // YouTube IFrame API integration
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
      if (videoRef.current && !player && isOpen) {
        const newPlayer = new window.YT.Player(videoRef.current, {
          height: '100%',
          width: '100%',
          videoId: videoId,
          playerVars: {
            autoplay: 1,
            controls: 0, // Hide default controls
            rel: 0,
            modestbranding: 1,
            enablejsapi: 1,
            origin: window.location.origin
          },
          events: {
            onReady: (event: any) => {
              setPlayer(event.target);
              setIsLoading(false);
            }
          }
        });
      }
    }
  }, [isOpen, videoId, player]);

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

  // Update playback rate
  useEffect(() => {
    if (player && player.setPlaybackRate) {
      player.setPlaybackRate(playbackSpeed);
    }
  }, [player, playbackSpeed]);

  // Clean up player when modal closes
  useEffect(() => {
    if (!isOpen && player) {
      player.destroy();
      setPlayer(null);
      setIsLoading(true);
    }
  }, [isOpen, player]);

  const setSpeed = (speed: number) => {
    setPlaybackSpeed(speed);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
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

          {/* Video Player Container */}
          <motion.div
            className="relative w-full max-w-4xl mx-auto rounded-xl overflow-hidden bg-[#11111198] shadow-[0_0_20px_rgba(0,0,0,0.2)] backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
          >
            {/* Close Button */}
            <motion.button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2 bg-black/50 rounded-full text-white hover:bg-red-500/70 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <X className="w-5 h-5" />
            </motion.button>

            {/* YouTube Video */}
            <div className="relative w-full aspect-video">
              <iframe
                ref={videoRef}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                style={{ border: 'none' }}
              />

              {/* Loading Animation */}
              {isLoading && (
                <motion.div
                  className="absolute inset-0 bg-black/20 flex items-center justify-center"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: isLoading ? 1 : 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin" />
                </motion.div>
              )}

              {/* Custom Controls Overlay */}
              <AnimatePresence>
                {showControls && !isLoading && (
                  <motion.div
                    className="absolute bottom-0 mx-auto max-w-xl left-0 right-0 p-4 m-2 bg-[#11111198] backdrop-blur-md rounded-2xl"
                    initial={{ y: 20, opacity: 0, filter: "blur(10px)" }}
                    animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                    exit={{ y: 20, opacity: 0, filter: "blur(10px)" }}
                    transition={{ duration: 0.6, ease: "circInOut", type: "spring" }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className="text-white text-sm font-medium">Speed:</span>
                      </div>

                      <div className="flex items-center gap-2">
                        {[0.5, 1, 1.5, 2].map((speed) => (
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            key={speed}
                          >
                            <Button
                              onClick={() => setSpeed(speed)}
                              variant="ghost"
                              size="icon"
                              className={cn(
                                "text-white hover:bg-[#111111d1] hover:text-white",
                                playbackSpeed === speed && "bg-[#111111d1]"
                              )}
                            >
                              {speed}x
                            </Button>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VideoPlayer;