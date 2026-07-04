import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, TrendingUp, BarChart3 } from 'lucide-react';
import { useAudio } from '../hooks/useAudio';

export default function Hero() {
  const mountRef = useRef(null);
  const { playHover, playClick } = useAudio();
  const [typedText, setTypedText] = useState('');
  const fullText = "We Build Businesses That Grow.";

  // Typing effect
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.substring(0, index));
      index++;
      if (index > fullText.length) {
        clearInterval(interval);
      }
    }, 80);
    return () => clearInterval(interval);
  }, []);

  // Three.js interactive particle background
  useEffect(() => {
    const mountElem = mountRef.current;
    if (!mountElem) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, mountElem.clientWidth / mountElem.clientHeight, 1, 1000);
    camera.position.z = 180;
    camera.position.y = 80;
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mountElem.clientWidth, mountElem.clientHeight);
    mountElem.appendChild(renderer.domElement);

    // Particles creation
    const particleCount = 2000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const color1 = new THREE.Color('#3B82F6'); // Electric Blue
    const color2 = new THREE.Color('#06B6D4'); // Cyan
    const color3 = new THREE.Color('#8B5CF6'); // Purple Glow

    // Position particles in a digital grid wave
    const rows = 40;
    const cols = 50;
    const spacing = 12;
    const startX = -(cols * spacing) / 2;
    const startZ = -(rows * spacing) / 2;

    let index = 0;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (index >= particleCount) break;

        const x = startX + c * spacing;
        const z = startZ + r * spacing;
        const y = 0; // Wave height calculated dynamically in render

        positions[index * 3] = x;
        positions[index * 3 + 1] = y;
        positions[index * 3 + 2] = z;

        // Gradient color based on grid position
        const mixedColor = new THREE.Color();
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

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Particle texture - create round points instead of square blocks
    const canvas = document.createElement('canvas');
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 16, 16);
    const texture = new THREE.CanvasTexture(canvas);

    const material = new THREE.PointsMaterial({
      size: 4.5,
      vertexColors: true,
      map: texture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Mouse movement listeners
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (event) => {
      targetMouseX = (event.clientX - window.innerWidth / 2) * 0.08;
      targetMouseY = (event.clientY - window.innerHeight / 2) * 0.08;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    let animationId = null;
    let time = 0;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      time += 0.015;

      // Smooth mouse follow
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

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
            Math.sin(x * 0.02 + time) * 15 +
            Math.cos(z * 0.02 + time) * 15 +
            Math.sin((x + z) * 0.01 + time) * 8 +
            // Mouse gravity effect
            (Math.sin(time + particleIdx) * (Math.abs(mouseX) * 0.1));

          particleIdx++;
        }
      }

      geometry.attributes.position.needsUpdate = true;

      // Slow camera orbits based on mouse
      camera.position.x = mouseX * 1.5;
      camera.position.y = 80 + (mouseY * 0.8);
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
      window.removeEventListener('mousemove', handleMouseMove);
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

  return (
    <section id="home" className="relative min-h-[80vh] lg:min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#0B1120] pt-24 pb-16 lg:py-0">
      {/* 3D WebGL Canvas container */}
      <div ref={mountRef} className="absolute inset-0 z-0 opacity-80" />

      {/* Floating Glowing Ambient Blobs */}
      <div className="absolute top-1/4 left-1/10 w-80 h-80 bg-accent-blue/10 rounded-full blur-[100px] animate-blob-spin pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-accent-purple/10 rounded-full blur-[120px] animate-blob-spin pointer-events-none" style={{ animationDelay: '-4s' }} />

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
            transition={{ duration: 0.6, delay: 3.0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent-blue/20 bg-accent-blue/5 w-fit mb-6 glassmorphism-light"
          >
            <Sparkles size={14} className="text-accent-cyan animate-pulse" />
            <span className="font-poppins text-xs font-semibold tracking-wider text-accent-cyan uppercase">
              Digital Growth Agency
            </span>
          </motion.div>

          {/* Headline with Typing Effect */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 3.2 }}
            className="text-3xl sm:text-5xl md:text-6xl font-sora font-extrabold text-white leading-tight"
          >
            {typedText}
            <span className="w-1.5 h-10 md:h-14 bg-accent-cyan inline-block ml-1 animate-pulse" />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 3.4 }}
            className="mt-6 text-base sm:text-lg text-white/60 font-poppins max-w-xl font-light leading-relaxed"
          >
            ZENCE combines high-converting Meta Ads, cutting-edge customized web platforms, and automated AI Voice Agents to build luxury businesses that scale to millions.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 3.6 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            {/* Primary button */}
            <button
              onClick={() => scrollToSection('contact')}
              className="group relative flex items-center justify-center gap-2 bg-gradient-to-r from-accent-blue to-accent-purple hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] text-white px-7 py-4 rounded-2xl font-poppins text-sm md:text-base font-bold tracking-wide transition-all duration-300 cursor-pointer"
              onMouseEnter={playHover}
            >
              <span>Book Free Consultation</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Secondary button */}
            <button
              onClick={() => scrollToSection('portfolio')}
              className="group flex items-center justify-center gap-2 bg-white/5 border border-white/10 hover:border-accent-cyan/40 hover:bg-white/10 text-white px-7 py-4 rounded-2xl font-poppins text-sm md:text-base font-bold tracking-wide transition-all duration-300 cursor-pointer glassmorphism-light"
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
            className="absolute w-56 h-56 sm:w-72 sm:h-72 rounded-full bg-gradient-to-tr from-accent-blue/20 to-accent-purple/20 blur-xl animate-pulse"
          />

          {/* Floating Card 1: Revenue Card */}
          <motion.div
            initial={{ opacity: 0, y: 40, x: -30 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            transition={{ duration: 0.8, delay: 3.8 }}
            className="absolute top-1/10 left-1/10 sm:left-0 glassmorphism p-5 rounded-2xl shadow-2xl flex flex-col items-start gap-2 border-l-4 border-l-accent-cyan max-w-[200px] hover:translate-y-[-5px] transition-transform pointer-events-auto"
            style={{ animation: 'float-anim 6s ease-in-out infinite' }}
          >
            <div className="p-2 rounded-lg bg-accent-cyan/10 text-accent-cyan">
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
            <div className="p-2 rounded-lg bg-accent-purple/10 text-accent-purple">
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
