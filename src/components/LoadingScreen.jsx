import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const screenRef = useRef(null);
  const textRef = useRef(null);

  const words = ["DISCOVER", "DESIGN", "DEVELOP", "SCALE", "ZENCE"];

  useEffect(() => {
    // Prevent scrolling during load
    document.body.style.overflow = 'hidden';

    // Percentage loading ticker (Smooth 2.7s duration)
    const val = { progress: 0 };
    const progressTimeline = gsap.to(val, {
      progress: 100,
      duration: 2.7,
      ease: "power2.inOut",
      onUpdate: () => {
        setProgress(Math.floor(val.progress));
      }
    });

    // Words morph/cycler timeline (0.54s per word to align with 2.7s total)
    const wordTimeline = gsap.timeline();
    words.forEach((_, idx) => {
      if (idx > 0) {
        wordTimeline.to({}, {
          duration: 0.54,
          onComplete: () => setWordIndex(idx)
        });
      }
    });

    // Exit animation when loading completes (Smooth 0.7s curtain exit)
    gsap.timeline({
      delay: 2.8,
      onComplete: () => {
        document.body.style.overflow = '';
        if (onComplete) onComplete();
      }
    })
    .to(textRef.current, {
      opacity: 0,
      y: -30,
      duration: 0.3,
      ease: "power2.in"
    })
    .to(screenRef.current, {
      clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
      duration: 0.7,
      ease: "power3.inOut"
    });

    return () => {
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  return (
    <div
      ref={screenRef}
      className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-[#0B1120]"
      style={{
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
      }}
    >
      {/* Central Blue Ambient Glow */}
      <div 
        className="absolute w-[500px] h-[500px] bg-accent-blue/10 rounded-full blur-[150px] animate-pulse" 
        style={{ animationDuration: '3s' }}
      />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-blue/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-purple/5 rounded-full blur-[120px]" />

      {/* Main Content */}
      <div ref={textRef} className="flex flex-col items-center select-none text-center">
        {/* Animated Brand word with soft pulse */}
        <h1 className="text-4xl md:text-6xl font-sora font-extrabold tracking-[0.25em] text-white h-20 flex items-center justify-center transition-all duration-300">
          <span 
            className="text-gradient-rainbow neon-text-blue"
            style={{
              animation: 'soft-pulse 2s ease-in-out infinite'
            }}
          >
            {words[wordIndex]}
          </span>
        </h1>

        {/* Loading percentage */}
        <div className="mt-8 flex items-baseline gap-1 font-poppins">
          <span className="text-5xl md:text-7xl font-extrabold text-white">
            {progress}
          </span>
          <span className="text-xl md:text-2xl font-semibold text-accent-cyan">%</span>
        </div>

        {/* Progress bar */}
        <div className="w-48 h-[2px] bg-white/10 mt-6 rounded-full overflow-hidden relative">
          <div
            className="h-full bg-gradient-to-r from-accent-blue to-accent-purple rounded-full transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      
      {/* Custom Keyframe animation for soft pulse inline */}
      <style>{`
        @keyframes soft-pulse {
          0%, 100% { opacity: 0.85; transform: scale(0.98); filter: drop-shadow(0 0 10px rgba(6,182,212,0.3)); }
          50% { opacity: 1; transform: scale(1.02); filter: drop-shadow(0 0 20px rgba(6,182,212,0.55)); }
        }
      `}</style>
    </div>
  );
}
