import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Check } from 'lucide-react';
import { useAudio } from '../hooks/useAudio';

export default function AboutSection() {
  const { playClick, playHover } = useAudio();
  const cardRef = useRef(null);

  // Mouse coords relative to card for 3D tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for 3D tilt (max 6 degrees)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { damping: 25, stiffness: 180 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { damping: 25, stiffness: 180 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Normalize coordinates to range [-0.5, 0.5]
    const mouseX = (e.clientX - rect.left) / width - 0.5;
    const mouseY = (e.clientY - rect.top) / height - 0.5;
    
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleContactClick = () => {
    playClick();
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const highlights = [
    "Meta Ads Growth Systems",
    "Premium Business Websites",
    "AI Voice Agent Automation"
  ];

  return (
    <section id="why-us" className="relative bg-[#0B1120] py-24 border-t border-white/5 overflow-hidden">
      {/* Background glowing decorations */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent-blue/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent-purple/3 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
        >
          {/* Left Side: Founder Photo Card with 3D Tilt & Float */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            
            {/* Soft animated gradient orb behind the photo */}
            <div className="absolute w-72 h-72 sm:w-96 sm:h-96 bg-gradient-to-tr from-accent-blue/15 to-accent-cyan/10 rounded-full blur-[80px] animate-pulse pointer-events-none z-0" style={{ animationDuration: '5s' }} />

            {/* Float container */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{
                repeat: Infinity,
                duration: 6,
                ease: "easeInOut"
              }}
              className="relative w-full max-w-[360px] sm:max-w-[380px] z-10"
            >
              {/* 3D Tilt Card */}
              <motion.div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onMouseEnter={playHover}
                style={{
                  rotateX,
                  rotateY,
                  transformStyle: "preserve-3d",
                  willChange: "transform"
                }}
                className="relative aspect-[4/5] rounded-[32px] overflow-hidden border border-white/10 shadow-[0_0_40px_rgba(59,130,246,0.15)] bg-slate-950/40 backdrop-blur-md cursor-pointer select-none"
              >
                {/* Image */}
                <img 
                  src="/founder.png" 
                  alt="Founder of ZENCE"
                  className="w-full h-full object-cover pointer-events-none"
                />

                {/* Glassmorphic card frame shadow glow */}
                <div className="absolute inset-0 border border-white/5 rounded-[32px] pointer-events-none" />

                {/* Floating Glowing Label */}
                <div 
                  style={{ transform: "translateZ(30px)" }}
                  className="absolute bottom-6 left-6 z-20 bg-[#0B1120]/80 backdrop-blur-xl border border-accent-cyan/30 px-4 py-2 rounded-full shadow-[0_0_15px_rgba(6,182,212,0.25)] select-none"
                >
                  <span className="font-poppins text-[10px] sm:text-xs font-bold text-accent-cyan uppercase tracking-widest animate-pulse">
                    Founder of ZENCE
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Side: About Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Heading */}
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-sora font-extrabold text-3xl sm:text-5xl text-white tracking-tight"
            >
              About <span className="text-gradient-blue-cyan neon-text-blue">ZENCE</span>
            </motion.h2>

            {/* Subheading */}
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-poppins text-lg sm:text-xl text-accent-cyan font-semibold mt-4 leading-relaxed max-w-xl"
            >
              Built to help businesses grow with Meta Ads, premium websites, and AI automation.
            </motion.h3>

            {/* Body Text */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6 font-poppins text-sm sm:text-base text-white/60 font-light leading-relaxed max-w-2xl"
            >
              ZENCE is a digital growth agency focused on helping businesses generate leads, build trust, and scale online. We combine Meta Ads strategy, premium no-code website development, AI voice agents, and automation systems to create business growth solutions that look professional and convert visitors into customers.
            </motion.p>

            {/* Highlight Points: slides in one by one */}
            <ul className="mt-8 space-y-4">
              {highlights.map((h, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 + idx * 0.1 }}
                  className="flex items-center gap-3 text-white/80 font-poppins text-sm sm:text-base"
                >
                  <span className="p-0.5 bg-accent-blue/10 border border-accent-blue/20 rounded-lg text-accent-cyan shrink-0">
                    <Check size={14} strokeWidth={3} />
                  </span>
                  <span className="font-medium">{h}</span>
                </motion.li>
              ))}
            </ul>

            {/* Button with blue glow hover */}
            <motion.button
              onClick={handleContactClick}
              onMouseEnter={playHover}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-10 px-8 py-4 bg-gradient-to-r from-accent-blue to-accent-cyan text-white rounded-2xl font-poppins font-bold tracking-wide transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] hover:scale-[1.02] cursor-pointer"
            >
              Work With ZENCE
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
