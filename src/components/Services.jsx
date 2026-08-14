import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Target, Code, Mic } from 'lucide-react';
import { useAudio } from '../hooks/useAudio';

// Reusable 3D Tilt Card following clean agency specs
function ServiceCard({ icon: Icon, title, description, badge, glowColor, ctaColor, delay, onClick }) {
  const cardRef = useRef(null);
  const { playHover } = useAudio();

  // Mouse coords relative to card
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for 3D tilt (max 5 degrees)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [5, -5]), { damping: 25, stiffness: 180 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-5, 5]), { damping: 25, stiffness: 180 });

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

  const isWebsiteDev = title === "Website Development";

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={playHover}
      onClick={onClick}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay }}
      whileHover={{
        y: -8,
        scale: 1.01
      }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        willChange: "transform"
      }}
      className="w-full max-w-[420px] min-h-[580px] rounded-[24px] border border-slate-200 bg-white p-8 sm:p-10 flex flex-col justify-between items-start cursor-pointer shadow-sm hover:shadow-xl hover:border-blue-400/40 transition-all duration-300 relative overflow-hidden group select-none"
    >
      {/* Top: Floating Icon Container */}
      <div style={{ transform: "translateZ(30px)" }} className="w-full items-start">
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{
            repeat: Infinity,
            duration: 4,
            ease: "easeInOut"
          }}
          className="w-[64px] h-[64px] rounded-[16px] border border-blue-100 bg-blue-50/80 flex items-center justify-center text-blue-600 shadow-sm"
        >
          <Icon size={28} className="text-blue-600" />
        </motion.div>
      </div>

      {/* Middle: Centered text content */}
      <div style={{ transform: "translateZ(30px)" }} className="my-auto py-6 flex flex-col gap-4 w-full items-start">
        <h3 
          style={isWebsiteDev ? {
            wordBreak: 'normal',
            overflowWrap: 'normal',
            whiteSpace: 'normal',
            hyphens: 'none',
            paddingRight: '16px',
            maxWidth: '100%',
            width: '100%'
          } : {}}
          className={`font-sora font-extrabold text-left tracking-tight text-slate-900 transition-all duration-300 ${
            isWebsiteDev 
              ? 'text-[28px] sm:text-[32px] lg:text-[38px] leading-[1.15] whitespace-normal' 
              : 'text-[30px] sm:text-[38px] lg:text-[44px] leading-tight'
          }`}
        >
          {title}
        </h3>

        {/* Description */}
        <p className="font-poppins text-base sm:text-[18px] text-slate-600 leading-[1.7] max-w-[340px] text-left font-normal">
          {description}
        </p>
      </div>

      {/* Bottom CTA */}
      <div 
        style={{ transform: "translateZ(20px)" }} 
        className="flex items-center gap-2 font-poppins font-bold text-xs tracking-[2px] uppercase select-none text-blue-600 group-hover:text-blue-700 transition-colors duration-300"
      >
        <span>LEARN MORE</span>
        <span className="transform group-hover:translate-x-1.5 transition-transform duration-300">→</span>
      </div>
    </motion.div>
  );
}

export default function Services() {
  const { playClick } = useAudio();

  const handleCardClick = () => {
    playClick();
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="services" className="relative bg-slate-50 py-24 border-t border-slate-200 overflow-hidden">
      {/* Background glowing decorations */}
      <div className="absolute top-1/3 right-0 w-[450px] h-[450px] bg-blue-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-0 w-[450px] h-[450px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-sora font-extrabold text-3xl sm:text-5xl text-slate-900 tracking-tight"
          >
            Our <span className="text-blue-600">Services</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 font-poppins text-base sm:text-lg text-slate-600 font-normal"
          >
            We design, develop, and market high-growth businesses using advanced digital engines.
          </motion.p>
        </div>

        {/* Services Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 justify-items-center items-stretch max-w-6xl mx-auto">
          {/* Card 1: Meta Ads */}
          <ServiceCard
            icon={Target}
            title="Meta Ads Service"
            description="Generate high-converting Meta Ads that bring real, qualified customers. We build pixel-perfect target profiles, configure hyper-optimized ad sets, and monitor daily metrics to maximize ROAS."
            glowColor="blue"
            ctaColor="#2563EB"
            delay={0.1}
            onClick={handleCardClick}
          />

          {/* Card 2: Website Development */}
          <ServiceCard
            icon={Code}
            title="Website Development"
            description="Premium custom development and luxury no-code websites designed to capture interest and convert visitors into loyal clients. Responsive, fast-loading, SEO optimized, and fully customized."
            glowColor="purple"
            ctaColor="#2563EB"
            delay={0.2}
            onClick={handleCardClick}
          />

          {/* Card 3: AI Voice Agent */}
          <ServiceCard
            icon={Mic}
            title="AI Voice Agent"
            description="AI-powered voice assistants designed for real-time customer support, appointment scheduling, call-routing, and instant lead qualification. Speaks naturally and resolves queries in seconds."
            glowColor="cyan"
            ctaColor="#0284C7"
            delay={0.3}
            onClick={handleCardClick}
          />
        </div>
      </div>
    </section>
  );
}
