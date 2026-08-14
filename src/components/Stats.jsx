import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';
import { Check } from 'lucide-react';
import { useAudio } from '../hooks/useAudio';

export default function FounderAboutSection() {
  const { playClick, playHover } = useAudio();
  const cardRef = useRef(null);
  const sectionRef = useRef(null);

  // Scroll tracking for zero-gravity parallax
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Parallax Layers
  // Layer 1 - Background (Very slow, large depth)
  const yLayer1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  
  // Layer 2 - Midground (Slow drift, gentle rotation)
  const yLayer2 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const rLayer2 = useTransform(scrollYProgress, [0, 1], [0, 45]);

  // Layer 3 - Foreground (Faster, translucent)
  const yLayer3 = useTransform(scrollYProgress, [0, 1], [0, -500]);
  const rLayer3 = useTransform(scrollYProgress, [0, 1], [0, -90]);

  // Portrait Parallax (Layer 4)
  const portraitY = useTransform(scrollYProgress, [0, 1], [40, -40]);

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
    "Lead Generation Strategy",
    "SEO & GEO Optimization",
    "Client-Focused Digital Solutions"
  ];

  const headingWords = "About MADHAN M".split(" ");

  return (
    <section ref={sectionRef} id="why-us" className="relative bg-white py-24 border-t border-slate-200 overflow-hidden">
      
      {/* --- ZERO GRAVITY PARTICLE LAYERS --- */}
      
      {/* LAYER 1: Background (Deepest, highly blurred) */}
      <motion.div style={{ y: yLayer1 }} className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[10%] left-[5%] w-64 h-64 bg-blue-500/5 rounded-full blur-[100px]" />
        <div className="absolute top-[60%] right-[10%] w-96 h-96 bg-violet-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] left-[40%] w-72 h-72 bg-cyan-500/5 rounded-full blur-[90px]" />
      </motion.div>

      {/* LAYER 2: Midground (Small dust & abstract shapes) */}
      <motion.div style={{ y: yLayer2, rotate: rLayer2 }} className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[20%] left-[15%] w-2 h-2 bg-slate-300 rounded-full blur-[1px] opacity-40" />
        <div className="absolute top-[70%] left-[8%] w-3 h-3 bg-slate-200 rounded-sm blur-[1px] opacity-30 rotate-12" />
        <div className="absolute top-[30%] right-[20%] w-4 h-4 bg-blue-100 rounded-full blur-[2px] opacity-50" />
        <div className="absolute bottom-[25%] right-[15%] w-2 h-2 bg-slate-300 rounded-full blur-[1px] opacity-40" />
        <div className="absolute top-[50%] left-[80%] w-1.5 h-1.5 bg-violet-200 rounded-full opacity-30" />
        <div className="absolute bottom-[40%] left-[25%] w-4 h-4 border border-slate-200 rounded-full opacity-20" />
      </motion.div>

      {/* LAYER 3: Foreground (Faster, translucent geometric elements) */}
      <motion.div style={{ y: yLayer3, rotate: rLayer3 }} className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[15%] right-[25%] w-6 h-6 border border-blue-100 rounded-lg opacity-20 rotate-45 blur-[1px]" />
        <div className="absolute top-[80%] left-[12%] w-8 h-8 border border-violet-100 rounded-full opacity-20 blur-[2px]" />
        <div className="absolute bottom-[15%] right-[8%] w-5 h-5 bg-white shadow-[0_0_15px_rgba(59,130,246,0.1)] rounded-full opacity-60" />
        <div className="absolute top-[40%] left-[5%] w-3 h-3 bg-white shadow-[0_0_10px_rgba(139,92,246,0.1)] rounded-full opacity-50" />
      </motion.div>

      {/* Existing Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-[130px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[160px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
        >
          {/* Left Side: Founder Photo Card with 3D Tilt & Float */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            
            {/* Soft blue gradient orb */}
            <motion.div 
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute w-72 h-72 sm:w-96 sm:h-96 bg-gradient-to-tr from-blue-500/10 to-cyan-500/10 rounded-full blur-[80px] pointer-events-none z-0" 
            />

            {/* Float container with portrait scroll parallax */}
            <motion.div
              style={{ y: portraitY }}
              className="relative w-full max-w-[360px] sm:max-w-[380px] z-10"
            >
              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 6,
                  ease: "easeInOut"
                }}
                className="w-full h-full"
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
                className="relative aspect-[2/3] rounded-[24px] overflow-hidden border border-slate-200 shadow-xl bg-slate-900 cursor-pointer select-none"
              >
                {/* Photo */}
                <img 
                  src="/founder.png" 
                  alt="Madhan M - Founder of ZENCE"
                  className="w-full h-full object-cover pointer-events-none"
                />

                {/* Card border overlay */}
                <div className="absolute inset-0 border border-slate-200/50 rounded-[24px] pointer-events-none" />

                {/* Premium badge at the bottom of the image */}
                <div 
                  style={{ transform: "translateZ(30px)" }}
                  className="absolute bottom-6 left-6 right-6 z-20 bg-slate-900/90 backdrop-blur-xl border border-slate-700/60 p-4 rounded-2xl shadow-xl select-none text-left flex flex-col"
                >
                  <span className="font-poppins text-[10px] font-bold text-cyan-400 uppercase tracking-widest leading-none">
                    Founder
                  </span>
                  <span className="font-sora text-sm font-extrabold text-white tracking-wide mt-2 leading-none">
                    MADHAN M
                  </span>
                </div>
              </motion.div>
            </motion.div>
            </motion.div>
            </motion.div>
          </div>

          {/* Right Side: About Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Word-by-word Heading Reveal */}
            <h2 className="font-sora font-extrabold text-3xl sm:text-5xl text-slate-900 tracking-tight flex flex-wrap">
              {headingWords.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.1 }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.1 }}
                  className="inline-block mr-3 text-slate-900"
                >
                  {word}
                </motion.span>
              ))}
            </h2>

            {/* Sub Heading */}
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="font-poppins text-sm sm:text-base text-blue-600 font-bold uppercase tracking-wider mt-4 leading-relaxed max-w-xl"
            >
              Founder of ZENCE | Meta Ads Strategist | No-Code Website Developer | AI Voice Agent Specialist
            </motion.h3>

            {/* Body Copy */}
            <div className="mt-6 space-y-4 font-poppins text-sm sm:text-base text-slate-600 font-normal leading-relaxed max-w-2xl">
              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                Hi, I'm Madhan M, the founder of ZENCE.
              </motion.p>
              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.1 }}
                transition={{ duration: 0.6, delay: 0.55 }}
              >
                I help businesses grow through high-converting Meta Ads, premium no-code websites, and AI Voice Agents that improve customer communication and lead generation.
              </motion.p>
              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                My mission is to help startups, local businesses, and entrepreneurs build a strong digital presence that generates quality leads, increases sales, and strengthens their online brand.
              </motion.p>
              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.1 }}
                transition={{ duration: 0.6, delay: 0.65 }}
              >
                Every project is built with performance, trust, speed, user experience, and measurable business growth in mind.
              </motion.p>
            </div>

            {/* Highlight Points: slides in one by one in 2-column grid */}
            <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              {highlights.map((h, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.1 }}
                  transition={{ duration: 0.5, delay: 0.6 + idx * 0.08 }}
                  className="flex items-center gap-3 text-slate-700 font-poppins text-sm sm:text-base"
                >
                  <span className="p-1 bg-blue-50 border border-blue-200 rounded-lg text-blue-600 shrink-0">
                    <Check size={14} strokeWidth={3} />
                  </span>
                  <span className="font-semibold text-slate-800">{h}</span>
                </motion.li>
              ))}
            </ul>

            {/* Responsive Buttons Container */}
            <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              {/* Primary Consultation Button */}
              <motion.button
                onClick={handleConsultationClick}
                onMouseEnter={playHover}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-2xl font-poppins font-bold tracking-wide transition-all shadow-md hover:shadow-lg hover:scale-[1.02] cursor-pointer text-center"
              >
                Book Free Consultation
              </motion.button>

              {/* Secondary Portfolio Button */}
              <motion.button
                onClick={handlePortfolioClick}
                onMouseEnter={playHover}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.1 }}
                transition={{ duration: 0.6, delay: 0.88 }}
                className="px-8 py-4 bg-white border border-slate-300 hover:border-slate-400 text-slate-800 rounded-2xl font-poppins font-bold tracking-wide transition-all hover:bg-slate-50 hover:scale-[1.02] cursor-pointer text-center shadow-sm"
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
