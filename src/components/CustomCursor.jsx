import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  // Position of the mouse
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for the outer ring
  const springConfig = { damping: 30, stiffness: 250, mass: 0.5 };
  const ringX = useSpring(mouseX, springConfig);
  const ringY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Detect mobile touch devices
    const checkDevice = () => {
      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsMobile(isTouch);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);

    if (isMobile) return;

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Attach listeners
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Detect clickable elements for cursor expansion
    const addHoverListeners = () => {
      const hoverables = document.querySelectorAll(
        'a, button, input, textarea, select, [role="button"], .interactive-hover'
      );
      hoverables.forEach((el) => {
        el.addEventListener('mouseenter', () => setIsHovered(true));
        el.addEventListener('mouseleave', () => setIsHovered(false));
      });
    };

    // Run initially and set up a mutation observer for dynamically added items
    addHoverListeners();
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('resize', checkDevice);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      observer.disconnect();
    };
  }, [mouseX, mouseY, isVisible, isMobile]);

  if (isMobile || !isVisible) return null;

  return (
    <>
      {/* Centered dot */}
      <motion.div
        className="cursor-dot"
        style={{
          left: mouseX,
          top: mouseY,
        }}
        animate={{
          scale: isHovered ? 1.8 : 1,
          backgroundColor: isHovered ? '#06b6d4' : '#3b82f6',
        }}
      />

      {/* Spring trailing ring */}
      <motion.div
        className="cursor-ring"
        style={{
          left: ringX,
          top: ringY,
        }}
        animate={{
          scale: isHovered ? 1.5 : 1,
          borderColor: isHovered ? '#06b6d4' : '#8b5cf6',
          borderWidth: isHovered ? '1.5px' : '2.5px',
          boxShadow: isHovered 
            ? '0 0 20px rgba(6, 182, 212, 0.6)' 
            : '0 0 10px rgba(124, 58, 237, 0.1)',
        }}
      />
    </>
  );
}
