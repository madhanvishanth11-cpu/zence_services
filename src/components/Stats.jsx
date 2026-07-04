import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Check } from 'lucide-react';
import { useAudio } from '../hooks/useAudio';

export default function FounderAboutSection() {
  const { playClick, playHover } = useAudio();
  const cardRef = useRef(null);

  // Mouse coordinates relative to card for 3D tilt
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

  const handleConsultationClick = () => {
    playClick();
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handlePortfolioClick = () => {
    playClick();
    const el = document.getElementById('portfolio');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const highlights = [
    "Meta Ads Growth Expert",
    "Premium Website Development",
    "AI Voice Agent Solutions",
    "Business Automation",
    "SEO & GEO Optimization",
    "Client-Focused Digital Solutions"
  ];

  const headingWords = "About MADHAN M".split(" ");

  return (
    <section id="why-us" className="relative bg-[#0B1120] py-24 border-t border-white/5 overflow-hidden">
      
      {/* Animated Background Particles matching the site theme */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-40">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-accent-blue/30"
            style={{
              top: `${15 + Math.random() * 70}%`,
              left: `${10 + Math.random() * 80}%`,
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0.15, 0.7, 0.15]
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 3
            }}
          />
        ))}
      </div>

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
            
            {/* Soft animated blue gradient orb behind the photo gently pulsing */}
            <motion.div 
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute w-72 h-72 sm:w-96 sm:h-96 bg-gradient-to-tr from-accent-blue/15 to-accent-cyan/10 rounded-full blur-[80px] pointer-events-none z-0" 
            />

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
              {/* 3D Tilt Card with 24px Rounded Corners */}
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
                className="relative aspect-[2/3] rounded-[24px] overflow-hidden border border-white/10 shadow-[0_0_45px_rgba(37,99,235,0.2)] bg-slate-950/40 backdrop-blur-md cursor-pointer select-none"
              >
                {/* Photo: Center-aligned, clear, sharp portrait */}
                <img 
                  src="/founder.png" 
                  alt="Madhan M - Founder of ZENCE"
                  className="w-full h-full object-cover pointer-events-none"
                />

                {/* Glassmorphic border glow overlay */}
                <div className="absolute inset-0 border border-white/5 rounded-[24px] pointer-events-none" />

                {/* Premium badge at the bottom of the image */}
                <div 
                  style={{ transform: "translateZ(30px)" }}
                  className="absolute bottom-6 left-6 right-6 z-20 bg-slate-950/85 backdrop-blur-xl border border-accent-blue/40 p-4 rounded-2xl shadow-[0_0_20px_rgba(37,99,235,0.25)] select-none text-left flex flex-col"
                >
                  <span className="font-poppins text-[10px] font-bold text-accent-cyan uppercase tracking-widest leading-none">
                    Founder
                  </span>
                  <span className="font-sora text-sm font-extrabold text-white tracking-wide mt-2 leading-none">
                    MADHAN M
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Side: About Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Word-by-word Heading Reveal */}
            <h2 className="font-sora font-extrabold text-3xl sm:text-5xl text-white tracking-tight flex flex-wrap">
              {headingWords.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.1 }}
                  className="inline-block mr-3 text-gradient-blue-cyan neon-text-blue"
                >
                  {word}
                </motion.span>
              ))}
            </h2>

            {/* Sub Heading */}
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="font-poppins text-sm sm:text-base text-accent-cyan font-bold uppercase tracking-wider mt-4 leading-relaxed max-w-xl"
            >
              Founder of ZENCE | Meta Ads Strategist | No-Code Website Developer | AI Automation Specialist
            </motion.h3>

            {/* Body Copy */}
            <div className="mt-6 space-y-4 font-poppins text-sm sm:text-base text-white/60 font-light leading-relaxed max-w-2xl">
              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                Hi, I'm Madhan M, the founder of ZENCE.
              </motion.p>
              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.55 }}
              >
                I help businesses grow through high-converting Meta Ads, premium no-code websites, AI Voice Agents, and workflow automation.
              </motion.p>
              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                My mission is to help startups, local businesses, and entrepreneurs build a strong digital presence that generates leads, increases sales, and automates repetitive business processes.
              </motion.p>
              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.65 }}
              >
                Every project is designed with performance, speed, trust, and long-term business growth in mind.
              </motion.p>
            </div>

            {/* Highlight Points: slides in one by one in 2-column grid */}
            <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              {highlights.map((h, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 + idx * 0.08 }}
                  className="flex items-center gap-3 text-white/80 font-poppins text-sm sm:text-base"
                >
                  <span className="p-0.5 bg-accent-blue/10 border border-accent-blue/20 rounded-lg text-accent-cyan shrink-0">
                    <Check size={14} strokeWidth={3} />
                  </span>
                  <span className="font-medium text-white/70">{h}</span>
                </motion.li>
              ))}
            </ul>

            {/* Responsive Buttons Container: stacked vertically on mobile, row on tablet/desktop */}
            <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              {/* Primary Consultation Button */}
              <motion.button
                onClick={handleConsultationClick}
                onMouseEnter={playHover}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="px-8 py-4 bg-gradient-to-r from-accent-blue to-accent-cyan text-white rounded-2xl font-poppins font-bold tracking-wide transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] hover:scale-[1.02] cursor-pointer text-center"
              >
                Book Free Consultation
              </motion.button>

              {/* Secondary Portfolio Button */}
              <motion.button
                onClick={handlePortfolioClick}
                onMouseEnter={playHover}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.88 }}
                className="px-8 py-4 bg-white/5 border border-white/10 hover:border-accent-blue/40 text-white rounded-2xl font-poppins font-bold tracking-wide transition-all hover:bg-white/10 hover:scale-[1.02] cursor-pointer text-center"
              >
                View My Portfolio
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
