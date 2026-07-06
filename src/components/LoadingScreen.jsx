import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  const words = ["DESIGN", "SCALE", "DEVELOPMENT", "ZENCE"];

  useEffect(() => {
    // Prevent scrolling during load
    document.body.style.overflow = 'hidden';

    // 1. Percentage counter (0 to 100 over 2.7s, leaving 0.3s for final reveal)
    const startTime = performance.now();
    const duration = 2700; // 2.7 seconds

    let frameId;
    const updateProgress = (now) => {
      const elapsed = now - startTime;
      const pct = Math.min(elapsed / duration, 1);
      
      // Cinematic ease-in-out calculation
      const easePct = pct < 0.5 
        ? 2 * pct * pct 
        : 1 - Math.pow(-2 * pct + 2, 2) / 2;

      setProgress(Math.floor(easePct * 100));

      // Calculate word index based on current progress
      // DESIGN (0-25%), SCALE (25-50%), DEVELOPMENT (50-75%), ZENCE (75-100%)
      const currentWordIdx = Math.min(Math.floor(pct * 4), 3);
      setWordIndex(currentWordIdx);

      if (pct < 1) {
        frameId = requestAnimationFrame(updateProgress);
      } else {
        // Reached 100%, trigger exit animation sequence
        setTimeout(() => {
          setIsExiting(true);
        }, 100);

        setTimeout(() => {
          document.body.style.overflow = '';
          if (onComplete) onComplete();
        }, 600); // 0.6s fade out
      }
    };

    frameId = requestAnimationFrame(updateProgress);

    return () => {
      cancelAnimationFrame(frameId);
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isExiting ? 0 : 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0B1120] select-none"
    >
      {/* Soft background glow directly behind the text */}
      <div className="absolute w-[350px] h-[350px] bg-accent-blue/10 rounded-full blur-[100px] pointer-events-none animate-pulse" />

      {/* Main Container */}
      <div 
        className="relative flex flex-col items-center text-center px-4 w-full"
        style={{ maxWidth: '90vw', overflow: 'visible' }}
      >
        
        {/* Cinematic Word Reveal with Blur-to-Sharp & Smooth Scale */}
        <div 
          className="h-28 flex items-center justify-center relative w-full"
          style={{ overflow: 'visible' }}
        >
          <AnimatePresence mode="wait">
            <motion.h1
              key={wordIndex}
              initial={{ opacity: 0, scale: 0.92, filter: "blur(12px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.05, filter: "blur(8px)" }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="absolute font-sora font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-accent-blue via-accent-cyan to-accent-blue bg-[size:200%_auto] animate-text-gradient neon-text-blue preloader-word text-center whitespace-nowrap"
            >
              {words[wordIndex]}
            </motion.h1>
          </AnimatePresence>
        </div>

        {/* Progress Percentage Display */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-6 flex items-baseline justify-center gap-0.5 font-poppins text-white/90"
        >
          <span className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            {progress}
          </span>
          <span className="text-lg font-bold text-accent-cyan">%</span>
        </motion.div>

        {/* Thin Gradient Progress Bar */}
        <motion.div 
          initial={{ opacity: 0, scaleX: 0.8 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="w-48 h-[2px] bg-white/10 mt-6 rounded-full overflow-hidden relative"
        >
          <div
            className="h-full bg-gradient-to-r from-accent-blue to-accent-cyan rounded-full transition-all duration-75 ease-out"
            style={{ width: `${progress}%` }}
          />
        </motion.div>
      </div>

      <style>{`
        .preloader-word {
          font-size: clamp(28px, 8vw, 44px);
          letter-spacing: 0.1em;
        }
        @media (min-width: 640px) {
          .preloader-word {
            font-size: clamp(34px, 7vw, 64px);
            letter-spacing: 0.15em;
          }
        }
        @media (min-width: 1024px) {
          .preloader-word {
            font-size: clamp(42px, 6vw, 88px);
            letter-spacing: 0.2em;
          }
        }
        @keyframes text-gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-text-gradient {
          animation: text-gradient 4s linear infinite;
        }
      `}</style>
    </motion.div>
  );
}
