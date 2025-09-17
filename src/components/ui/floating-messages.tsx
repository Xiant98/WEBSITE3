"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useAnimationFrame } from "framer-motion";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  text: string;
  x: number;
  y: number;
  rotation: number;
  scale: number;
}

const personalizedMessages = [
  "Hi Jamie, I saw your LinkedIn post about how your team launched that onboarding sprint last month. What do you wish had gone even smoother in the process?",
  "Dana, your company's share on Instagram about hitting record sales in July was inspiring! What helped your team keep momentum during slower retail months?",
  "Alex, your clinic's Facebook comment on patient feedback got a lot of engagement. Has gathering those insights changed how you manage remote consults?",
  "Priya, your CEO's post on sustainability milestones just hit my feed—what's the next big goal you're rallying the team behind?",
  "Marcus, that thread you started about new campaign strategies had some bold ideas. Are there marketing challenges you still feel are unresolved?",
  "Simon, I caught your recent reply on a customer support best practices forum. If you could automate one follow-up, what would you pick first?",
  "Nina, your story about running wellness sessions internally was a great read. What new approach are you currently experimenting with?",
  "Jordan, I noticed your company's post celebrating community event turnout this spring. How does your team measure the long-term impact of those events?",
  "Elena, your thoughtful comment on the analytics tools comparison post really stood out to me. Have you come across any game-changing features this year?",
  "Michael, your LinkedIn article about remote team collaboration tools was insightful. Which platform surprised you the most in terms of adoption?",
  "Sarah, I saw your post about the successful product launch metrics. What was the biggest learning from your pre-launch testing phase?",
  "David, your comment on the industry trends discussion really resonated. How is your team preparing for these upcoming market shifts?",
  "Lisa, your company's case study on customer retention strategies was brilliant. What's the next retention challenge you're tackling?",
  "Carlos, I noticed your thoughtful response to the pricing strategy thread. Have you tested any new models recently?",
  "Amy, your post about team productivity improvements caught my attention. What tools made the biggest difference for your workflow?"
];

const generateRandomPosition = () => ({
  x: 10 + Math.random() * 80, // 10-90% to avoid edges
  y: 10 + Math.random() * 80, // 10-90% to avoid top/bottom
  rotation: (Math.random() - 0.5) * 8, // -4 to +4 degrees
  scale: 0.85 + Math.random() * 0.3, // 0.85 to 1.15 scale
});

const createMessage = (text: string, index: number): Message => ({
  id: `message-${Date.now()}-${index}`,
  text,
  ...generateRandomPosition(),
});

export default function FloatingMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [visibleMessages, setVisibleMessages] = useState<Message[]>([]);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const messageIndexRef = useRef(0);
  const lastTimeRef = useRef(0);
  
  // Motion value for smooth infinite scroll
  const y = useMotionValue(0);

  // Initialize messages
  useEffect(() => {
    const initialMessages = personalizedMessages
      .sort(() => Math.random() - 0.5)
      .slice(0, 9)
      .map((text, index) => createMessage(text, index));
    
    setMessages(initialMessages);
    setVisibleMessages(initialMessages);
  }, []);

  // Seamless infinite scroll animation  
  useAnimationFrame((time) => {
    if (lastTimeRef.current === 0) {
      lastTimeRef.current = time;
      return;
    }
    
    const deltaTime = time - lastTimeRef.current;
    lastTimeRef.current = time;
    
    const speedPxPerSec = 30; // Slow scroll speed (30px per second)
    const increment = (speedPxPerSec * deltaTime) / 1000;
    
    const currentY = y.get();
    const newY = currentY - increment;
    
    // Reset when we've scrolled one full viewport height
    if (newY <= -window.innerHeight) {
      y.set(0);
    } else {
      y.set(newY);
    }
  });

  // Auto-refresh messages
  useEffect(() => {
    const startMessageCycle = () => {
      scrollTimeoutRef.current = setTimeout(() => {
        // Fade out 2-3 random messages
        const messagesToRemove = Math.floor(Math.random() * 2) + 2;
        const shuffledIndices = Array.from({ length: visibleMessages.length }, (_, i) => i)
          .sort(() => Math.random() - 0.5)
          .slice(0, messagesToRemove);

        const remainingMessages = visibleMessages.filter((_, index) => 
          !shuffledIndices.includes(index)
        );

        // Add new messages to replace removed ones
        const newMessages = [];
        for (let i = 0; i < messagesToRemove; i++) {
          const messageIndex = messageIndexRef.current % personalizedMessages.length;
          const messageText = personalizedMessages[messageIndex] || personalizedMessages[0] || "";
          if (messageText) {
            newMessages.push(createMessage(messageText, messageIndexRef.current));
          }
          messageIndexRef.current++;
        }

        setVisibleMessages([...remainingMessages, ...newMessages]);
        startMessageCycle();
      }, 4000 + Math.random() * 3000); // 4-7 seconds interval
    };

    if (visibleMessages.length > 0) {
      startMessageCycle();
    }

    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [visibleMessages]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Duplicated layers for seamless infinite scroll */}
      {[0, 1].map((layerIndex) => (
        <div 
          key={layerIndex}
          className="absolute inset-0 w-full h-full"
          style={{
            transform: `translateY(${layerIndex * 100}vh)`,
          }}
        >
          <motion.div
            className="absolute inset-0 w-full h-full"
            style={{
              y,
              willChange: "transform",
            }}
          >
            <AnimatePresence>
              {visibleMessages.map((message) => (
                <div
                  key={`${message.id}-${layerIndex}`}
                  className="absolute pointer-events-none hidden sm:block"
                  style={{
                    left: `${message.x}%`,
                    top: `${message.y}%`,
                    zIndex: 0,
                  }}
                >
                  {/* Non-motion wrapper for centering */}
                  <div className="absolute -translate-x-1/2 -translate-y-1/2">
                    <motion.div
                      initial={{ 
                        opacity: 0, 
                        scale: 0.8,
                        rotate: message.rotation
                      }}
                      animate={{ 
                        opacity: 0.4,
                        scale: message.scale,
                        rotate: message.rotation
                      }}
                      exit={{ 
                        opacity: 0, 
                        scale: 0.8,
                        transition: { duration: 1.0 }
                      }}
                      transition={{ 
                        duration: 1.5,
                        ease: "easeOut",
                        opacity: { duration: 1.0 }
                      }}
                    >
                      <div 
                        className={cn(
                          "max-w-xs lg:max-w-sm p-3 lg:p-4 bg-card/60 backdrop-blur-sm border border-border/30",
                          "rounded-lg shadow-md text-xs lg:text-sm text-foreground/80",
                          "select-none pointer-events-none"
                        )}
                      >
                        <p className="leading-relaxed">
                          {message.text}
                        </p>
                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-xs text-muted-foreground/60">
                            AI Generated
                          </span>
                          <div className="w-1.5 h-1.5 bg-green-500/60 rounded-full animate-pulse" />
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      ))}
    </div>
  );
}