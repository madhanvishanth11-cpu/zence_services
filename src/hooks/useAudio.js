import { useState, useEffect, useCallback } from 'react';

let audioCtx = null;

const initAudioContext = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
};

export const useAudio = () => {
  const [isMuted, setIsMuted] = useState(() => {
    const saved = localStorage.getItem('zence_muted');
    return saved ? JSON.parse(saved) : true; // Default to muted to follow best UX practices
  });

  useEffect(() => {
    localStorage.setItem('zence_muted', JSON.stringify(isMuted));
  }, [isMuted]);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  const playHover = useCallback(() => {
    if (isMuted) return;
    try {
      const ctx = initAudioContext();
      const now = ctx.currentTime;
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      // Fast, subtle sweep upwards
      osc.frequency.setValueAtTime(450, now);
      osc.frequency.exponentialRampToValueAtTime(750, now + 0.08);
      
      // Keep volume very soft so it's not annoying
      gain.gain.setValueAtTime(0.015, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(now);
      osc.stop(now + 0.08);
    } catch (e) {
      console.warn("Audio Context error: ", e);
    }
  }, [isMuted]);

  const playClick = useCallback(() => {
    if (isMuted) return;
    try {
      const ctx = initAudioContext();
      const now = ctx.currentTime;
      
      // Double impulse click
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(150, now + 0.05);
      
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(now);
      osc.stop(now + 0.06);

      // Second little high-tech tick a millisecond later
      setTimeout(() => {
        if (isMuted) return;
        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(1200, ctx.currentTime);
        osc2.frequency.setValueAtTime(300, ctx.currentTime + 0.02);
        gain2.gain.setValueAtTime(0.02, ctx.currentTime);
        gain2.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.02);
        osc2.connect(gain2);
        gain2.connect(ctx.destination);
        osc2.start();
        osc2.stop(ctx.currentTime + 0.02);
      }, 20);

    } catch (e) {
      console.warn("Audio Context error: ", e);
    }
  }, [isMuted]);

  return { isMuted, toggleMute, playHover, playClick };
};
