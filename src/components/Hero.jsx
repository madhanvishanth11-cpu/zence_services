import React, { useEffect, useRef, useState } from 'react';
import * as THREE_LIB from 'three';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, TrendingUp, BarChart3 } from 'lucide-react';
import { useAudio } from '../hooks/useAudio';

export default function Hero() {
  const mountRef = useRef(null);
  const { playHover, playClick } = useAudio();
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile viewports dynamically
  useEffect(() => {
    const handleViewportCheck = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleViewportCheck();
    window.addEventListener('resize', handleViewportCheck);
    return () => window.removeEventListener('resize', handleViewportCheck);
  }, []);

  // Three.js interactive particle background
  useEffect(() => {
    const isMobileDevice = window.innerWidth < 768;
    if (isMobileDevice) {
      // Bypass WebGL initialization entirely on mobile for absolute native 60fps performance
      return;
    }

    const mountElem = mountRef.current;
    if (!mountElem) return;

    // Scene setup
    const scene = new THREE_LIB.Scene();
    const camera = new THREE_LIB.PerspectiveCamera(60, mountElem.clientWidth / mountElem.clientHeight, 1, 1000);
    camera.position.z = 180;
    camera.position.y = 80;
    camera.lookAt(0, 0, 0);

    const renderer = new THREE_LIB.WebGLRenderer({ antialias: false, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(mountElem.clientWidth, mountElem.clientHeight);
    mountElem.appendChild(renderer.domElement);

    // Particles creation - highly optimized count (reduced by 75%)
    const particleCount = 250;
    const geometry = new THREE_LIB.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const color1 = new THREE_LIB.Color('#7C3AED'); // Purple
    const color2 = new THREE_LIB.Color('#14B8A6'); // Teal
    const color3 = new THREE_LIB.Color('#F8FAFC'); // Soft White

    // Position particles in a digital grid wave
    const rows = isMobileDevice ? 8 : 16;
    const cols = isMobileDevice ? 10 : 16;
    const spacing = isMobileDevice ? 30 : 25;
    const startX = -(cols * spacing) / 2;
    const startZ = -(rows * spacing) / 2;

    let index = 0;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (index >= particleCount) break;

        const x = startX + c * spacing;
        const z = startZ + r * spacing;
        const y = 0; 

        positions[index * 3] = x;
        positions[index * 3 + 1] = y;
        positions[index * 3 + 2] = z;

        // Gradient color based on grid position
        const mixedColor = new THREE_LIB.Color();
        const factor = (c / cols) * 0.5 + (r / rows) * 0.5;
        if (factor < 0.5) {
          mixedColor.lerpColors(color1, color2, factor * 2);
        } else {
          mixedColor.lerpColors(color2, color3, (factor - 0.5) * 2);
        }

        colors[index * 3] = mixedColor.r;
        colors[index * 3 + 1] = mixedColor.g;
        colors[index * 3 + 2] = mixedColor.b;

        index++;
      }
    }

    geometry.setAttribute('position', new THREE_LIB.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE_LIB.BufferAttribute(colors, 3));

    // Particle texture - create round points
    const canvas = document.createElement('canvas');
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 16, 16);
    const texture = new THREE_LIB.CanvasTexture(canvas);

    const material = new THREE_LIB.PointsMaterial({
      size: isMobileDevice ? 6 : 4.5,
      vertexColors: true,
      map: texture,
      transparent: true,
      blending: THREE_LIB.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE_LIB.Points(geometry, material);
    scene.add(particles);

    // Mouse movement listeners - disabled on mobile
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (event) => {
      if (isMobileDevice) return;
      targetMouseX = (event.clientX - window.innerWidth / 2) * 0.08;
      targetMouseY = (event.clientY - window.innerHeight / 2) * 0.08;
    };

    if (!isMobileDevice) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    // Animation Loop
    let animationId = null;
    let time = 0;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      
      // Speed up wave movement slightly on mobile devices
      time += isMobileDevice ? 0.025 : 0.015;

      // Smooth mouse follow
      if (!isMobileDevice) {
        mouseX += (targetMouseX - mouseX) * 0.05;
        mouseY += (targetMouseY - mouseY) * 0.05;
      }

      // Wave calculation
      const posArray = geometry.attributes.position.array;
      let particleIdx = 0;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (particleIdx >= particleCount) break;

          const x = posArray[particleIdx * 3];
          const z = posArray[particleIdx * 3 + 2];

          // Complex Wave equation influenced by time and mouse positions
          posArray[particleIdx * 3 + 1] = 
            Math.sin(x * 0.02 + time) * 12 +
            Math.cos(z * 0.02 + time) * 12 +
            Math.sin((x + z) * 0.01 + time) * 6 +
            (!isMobileDevice ? (Math.sin(time + particleIdx) * (Math.abs(mouseX) * 0.1)) : 0);

          particleIdx++;
        }
      }

      geometry.attributes.position.needsUpdate = true;

      // Slow camera orbits based on mouse / subtle motion
      if (!isMobileDevice) {
        camera.position.x = mouseX * 1.5;
        camera.position.y = 80 + (mouseY * 0.8);
      } else {
        camera.position.x = Math.sin(time * 0.1) * 8;
        camera.position.y = 80;
      }
      camera.lookAt(0, 0, 0);

      // Spin grid slightly
      particles.rotation.y = time * 0.03;

      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      if (!mountElem) return;
      camera.aspect = mountElem.clientWidth / mountElem.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountElem.clientWidth, mountElem.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (!isMobileDevice) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      if (mountElem && renderer.domElement) {
        mountElem.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      texture.dispose();
    };
  }, []);

  const scrollToSection = (id) => {
    playClick();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Dynamic animation speeds:
  // Desktop delay aligns with GSAP loader (3.0s - 4.0s)
  // Mobile delay runs immediately on load (0.1s - 0.3s) with 40-50% reduced durations
  const badgeDelay = isMobile ? 0.1 : 3.0;
  const badgeDuration = isMobile ? 0.35 : 0.6;

  const headlineDelay = isMobile ? 0.1 : 3.2; // Visible within first 0.5s of mobile load
  const headlineDuration = isMobile ? 0.4 : 0.8;

  const descDelay = isMobile ? 0.2 : 3.4; // Fades in subtitle after 0.2s on mobile
  const descDuration = isMobile ? 0.4 : 0.8;

  const ctaDelay = isMobile ? 0.3 : 3.6; // Fades in CTAs after 0.3s on mobile
  const ctaDuration = isMobile ? 0.4 : 0.8;

  return (
    <section id="home" className="relative min-h-[80vh] lg:min-h-screen w-full flex items-center justify-center overflow-hidden bg-primary pt-24 pb-16 lg:py-0" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(124, 58, 237, 0.03) 0%, #090B14 80%)' }}>
      {/* 3D WebGL Canvas container */}
      <div ref={mountRef} className="absolute inset-0 z-0 opacity-80" />

      {/* Floating Glowing Ambient Blobs (hidden on mobile to save performance) */}
      <div className="hidden md:block absolute top-1/4 left-1/10 w-80 h-80 bg-accent-blue/3 rounded-full blur-[100px] animate-blob-spin pointer-events-none" />
      <div className="hidden md:block absolute bottom-1/4 right-1/10 w-96 h-96 bg-accent-purple/3 rounded-full blur-[120px] animate-blob-spin pointer-events-none" style={{ animationDelay: '-4s' }} />

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_60%,transparent_100%)] pointer-events-none z-1" />

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left text column */}
        <div className="lg:col-span-7 flex flex-col text-left">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: badgeDuration, delay: badgeDelay }}
            style={{ willChange: "transform, opacity", transform: "translate3d(0,0,0)" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent-blue/10 bg-accent-blue/2 w-fit mb-6 glassmorphism-light will-change-transform transform-gpu"
          >
            <Sparkles size={14} className="text-accent-cyan animate-pulse" />
            <span className="font-poppins text-xs font-semibold tracking-wider text-accent-cyan uppercase">
              Digital Growth Agency
            </span>
          </motion.div>

          {/* Headline - simple static fade-up with dynamic timing */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: headlineDuration, delay: headlineDelay }}
            style={{ willChange: "transform, opacity", transform: "translate3d(0,0,0)" }}
            className="text-3xl sm:text-5xl md:text-6xl font-sora font-extrabold text-white leading-tight will-change-transform transform-gpu"
          >
            We Build Businesses That <span className="text-gradient-blue-cyan neon-text-blue">Grow.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: descDuration, delay: descDelay }}
            style={{ willChange: "transform, opacity", transform: "translate3d(0,0,0)" }}
            className="mt-6 text-base sm:text-lg text-white/60 font-poppins max-w-xl font-light leading-relaxed will-change-transform transform-gpu"
          >
            ZENCE combines high-converting Meta Ads, cutting-edge customized web platforms, and automated AI Voice Agents to build luxury businesses that scale to millions.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: ctaDuration, delay: ctaDelay }}
            style={{ willChange: "transform, opacity", transform: "translate3d(0,0,0)" }}
            className="mt-10 flex flex-wrap gap-4 will-change-transform transform-gpu"
          >
            {/* Primary button */}
            <button
              onClick={() => scrollToSection('contact')}
              className="group relative flex items-center justify-center gap-2 bg-gradient-to-r from-accent-blue to-accent-cyan hover:shadow-[0_0_30px_rgba(124,58,237,0.15)] text-white px-7 py-4 rounded-2xl font-poppins text-sm md:text-base font-bold tracking-wide transition-all duration-300 cursor-pointer"
              onMouseEnter={playHover}
            >
              <span>Book Free Consultation</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Secondary button */}
            <button
              onClick={() => scrollToSection('portfolio')}
              className="group flex items-center justify-center gap-2 bg-white/5 border border-white/10 hover:border-accent-cyan/15 hover:bg-white/10 text-white px-7 py-4 rounded-2xl font-poppins text-sm md:text-base font-bold tracking-wide transition-all duration-300 cursor-pointer glassmorphism-light"
              onMouseEnter={playHover}
            >
              <span>View Portfolio</span>
            </button>
          </motion.div>
        </div>

        {/* Right dashboard column */}
        <div className="hidden lg:flex lg:col-span-5 relative w-full h-[350px] sm:h-[450px] items-center justify-center">
          {/* Main Visual Center: Glowing Hologram Sphere */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay: 3.2 }}
            className="absolute w-56 h-56 sm:w-72 sm:h-72 rounded-full bg-gradient-to-tr from-accent-blue/20 to-accent-cyan/20 blur-xl animate-pulse"
          />

          {/* Floating Card 1: Revenue Card */}
          <motion.div
            initial={{ opacity: 0, y: 40, x: -30 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            transition={{ duration: 0.8, delay: 3.8 }}
            className="absolute top-1/10 left-1/10 sm:left-0 glassmorphism p-5 rounded-2xl shadow-2xl flex flex-col items-start gap-2 border-l-4 border-l-accent-cyan max-w-[200px] hover:translate-y-[-5px] transition-transform pointer-events-auto"
            style={{ animation: 'float-anim 6s ease-in-out infinite' }}
          >
            <div className="p-2 rounded-lg bg-accent-cyan/3 text-accent-cyan">
              <TrendingUp size={18} />
            </div>
            <span className="font-poppins text-xs font-semibold text-white/50 tracking-wide">ROAS average</span>
            <span className="font-sora font-extrabold text-xl text-white">4.8x+</span>
            <span className="font-poppins text-[10px] text-emerald-400">▲ +12% this month</span>
          </motion.div>

          {/* Floating Card 2: AI Agent Status Card */}
          <motion.div
            initial={{ opacity: 0, y: -40, x: 30 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            transition={{ duration: 0.8, delay: 4.0 }}
            className="absolute bottom-1/10 right-1/10 sm:right-0 glassmorphism p-5 rounded-2xl shadow-2xl flex flex-col items-start gap-2 border-l-4 border-l-accent-purple max-w-[200px] hover:translate-y-[-5px] transition-transform pointer-events-auto"
            style={{ animation: 'float-anim 6s ease-in-out infinite', animationDelay: '-2s' }}
          >
            <div className="p-2 rounded-lg bg-accent-purple/3 text-accent-purple">
              <BarChart3 size={18} />
            </div>
            <span className="font-poppins text-xs font-semibold text-white/50 tracking-wide">AI Conversational Agents</span>
            <span className="font-sora font-extrabold text-xl text-white">99.4%</span>
            <span className="font-poppins text-[10px] text-accent-cyan">Accuracy Rate</span>
          </motion.div>

          {/* Decorative floating grids */}
          <div className="absolute w-full h-full border border-white/5 rounded-full animate-spin pointer-events-none opacity-20" style={{ animationDuration: '60s' }} />
          <div className="absolute w-[80%] h-[80%] border border-white/5 border-dashed rounded-full animate-spin pointer-events-none opacity-30" style={{ animationDuration: '40s', animationDirection: 'reverse' }} />
        </div>
      </div>

      {/* Mouse parallax scrolling hint */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <span className="font-poppins text-[10px] text-white/40 uppercase tracking-widest">Scroll to explore</span>
        <div className="w-5 h-8 border-2 border-white/20 rounded-full flex justify-center p-1">
          <motion.div 
            className="w-1.5 h-1.5 bg-accent-cyan rounded-full" 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
        </div>
      </div>
    </section>
  );
}
