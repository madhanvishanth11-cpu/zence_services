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

    // Percentage loading ticker (Optimized to 0.4s total)
    const val = { progress: 0 };
    const progressTimeline = gsap.to(val, {
      progress: 100,
      duration: 0.4,
      ease: "power1.inOut",
      onUpdate: () => {
        setProgress(Math.floor(val.progress));
      }
    });

    // Words morph/cycler timeline
    const wordTimeline = gsap.timeline();
    words.forEach((_, idx) => {
      if (idx > 0) {
        wordTimeline.to({}, {
          duration: 0.08,
          onComplete: () => setWordIndex(idx)
        });
      }
    });

    // Exit animation when loading completes (Optimized duration and delay)
    gsap.timeline({
      delay: 0.45,
      onComplete: () => {
        document.body.style.overflow = '';
        if (onComplete) onComplete();
      }
    })
    .to(textRef.current, {
      opacity: 0,
      y: -30,
      duration: 0.2,
      ease: "power2.in"
    })
    .to(screenRef.current, {
      clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
      duration: 0.4,
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
      {/* Dynamic Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-blue/10 rounded-full blur-[120px] animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-purple/10 rounded-full blur-[120px] animate-pulse-slow" />

      {/* Main Content */}
      <div ref={textRef} className="flex flex-col items-center select-none text-center">
        {/* Animated Brand word */}
        <h1 className="text-4xl md:text-6xl font-sora font-extrabold tracking-[0.25em] text-white h-20 flex items-center justify-center transition-all duration-300">
          <span className="text-gradient-rainbow neon-text-blue">
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
            className="h-full bg-gradient-to-r from-accent-blue to-accent-purple rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
