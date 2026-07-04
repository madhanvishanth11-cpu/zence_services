import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Target, Code, Mic } from 'lucide-react';
import { useAudio } from '../hooks/useAudio';

// Reusable 3D Tilt Card following exact SaaS specs
function ServiceCard({ icon: Icon, title, description, badge, glowColor, glowClass, ctaColor, delay, onClick }) {
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

  // Glow colors mapping
  const glowStyles = {
    blue: {
      radial: 'radial-gradient(120% 120% at 0% 0%, rgba(59, 130, 246, 0.15) 0%, rgba(13, 18, 34, 0) 50%)',
      border: 'rgba(59, 130, 246, 0.4)',
      borderHover: 'rgba(59, 130, 246, 1)',
      shadow: '0 0 40px rgba(59, 130, 246, 0.15)',
      shadowHover: '0 0 50px rgba(59, 130, 246, 0.3)',
      iconBg: 'rgba(59, 130, 246, 0.1)',
      iconBorder: 'rgba(59, 130, 246, 0.3)',
      iconShadow: '0 0 20px rgba(59, 130, 246, 0.3)',
      iconColor: '#3B82F6'
    },
    purple: {
      radial: 'radial-gradient(120% 120% at 0% 0%, rgba(139, 92, 246, 0.15) 0%, rgba(13, 18, 34, 0) 50%)',
      border: 'rgba(139, 92, 246, 0.4)',
      borderHover: 'rgba(139, 92, 246, 1)',
      shadow: '0 0 40px rgba(139, 92, 246, 0.15)',
      shadowHover: '0 0 50px rgba(139, 92, 246, 0.3)',
      iconBg: 'rgba(139, 92, 246, 0.1)',
      iconBorder: 'rgba(139, 92, 246, 0.3)',
      iconShadow: '0 0 20px rgba(139, 92, 246, 0.3)',
      iconColor: '#8B5CF6'
    },
    cyan: {
      radial: 'radial-gradient(120% 120% at 0% 0%, rgba(6, 182, 212, 0.15) 0%, rgba(13, 18, 34, 0) 50%)',
      border: 'rgba(6, 182, 212, 0.4)',
      borderHover: 'rgba(6, 182, 212, 1)',
      shadow: '0 0 40px rgba(6, 182, 212, 0.15)',
      shadowHover: '0 0 50px rgba(6, 182, 212, 0.3)',
      iconBg: 'rgba(6, 182, 212, 0.1)',
      iconBorder: 'rgba(6, 182, 212, 0.3)',
      iconShadow: '0 0 20px rgba(6, 182, 212, 0.3)',
      iconColor: '#06B6D4'
    }
  };

  const style = glowStyles[glowColor] || glowStyles.blue;
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
        y: -12,
        scale: 1.02,
        boxShadow: style.shadowHover,
        borderColor: style.borderHover
      }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        background: `${style.radial}, #0D1222`,
        borderColor: style.border,
        boxShadow: style.shadow,
        willChange: "transform, box-shadow"
      }}
      className="w-full max-w-[420px] min-h-[620px] rounded-[24px] border-[1.5px] p-8 sm:p-12 flex flex-col justify-between items-start cursor-pointer transition-colors duration-300 relative overflow-hidden group select-none backdrop-blur-[20px]"
    >
      {/* Subtle Noise Texture Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.015] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      {/* Top: Floating Icon Container */}
      <div style={{ transform: "translateZ(40px)" }} className="w-full items-start">
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{
            repeat: Infinity,
            duration: 4,
            ease: "easeInOut"
          }}
          style={{
            backgroundColor: style.iconBg,
            borderColor: style.iconBorder,
            boxShadow: style.iconShadow,
            willChange: "transform"
          }}
          className="w-[72px] h-[72px] rounded-[18px] border flex items-center justify-center backdrop-blur-md"
        >
          <Icon size={32} color={style.iconColor} style={{ filter: `drop-shadow(0 0 8px ${style.iconColor})` }} />
        </motion.div>
      </div>

      {/* Middle: Centered text content */}
      <div style={{ transform: "translateZ(40px)" }} className="my-auto py-6 flex flex-col gap-5 w-full items-start">
        {/* Responsive Heading with Target Custom CSS Rules */}
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
          className={`font-sora font-bold text-left tracking-tight text-white transition-all duration-300 ${
            isWebsiteDev 
              ? 'text-[30px] sm:text-[36px] lg:text-[44px] leading-[1.1] lg:leading-[1.05] whitespace-normal' 
              : 'text-[32px] sm:text-[44px] lg:text-[56px] leading-tight'
          }`}
        >
          {title}
        </h3>

        {/* Description */}
        <p className="font-poppins text-base sm:text-[22px] text-[#9CA3AF] leading-[1.8] max-w-[320px] text-left font-light">
          {description}
        </p>
      </div>

      {/* Bottom CTA */}
      <div 
        style={{ transform: "translateZ(30px)" }} 
        className="flex items-center gap-1 font-poppins font-bold text-sm tracking-[2px] uppercase select-none transition-colors duration-300"
        style={{ color: ctaColor }}
      >
        <span>LEARN MORE</span>
        <span className="transform group-hover:translate-x-2 transition-transform duration-300">→</span>
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
    <section id="services" className="relative bg-[#070b13] py-24 border-t border-white/5 overflow-hidden">
      {/* Dynamic Background glowing decorations */}
      <div className="absolute top-1/3 right-0 w-[450px] h-[450px] bg-accent-blue/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-0 w-[450px] h-[450px] bg-accent-purple/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 sm:mb-28">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-sora font-extrabold text-3xl sm:text-5xl text-white tracking-tight"
          >
            Our <span className="text-gradient-purple-cyan neon-text-purple">Services</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 font-poppins text-base sm:text-lg text-white/50 font-light"
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
            ctaColor="#00D9FF"
            delay={0.1}
            onClick={handleCardClick}
          />

          {/* Card 2: Website Development */}
          <ServiceCard
            icon={Code}
            title="Website Development"
            description="Premium custom development and luxury no-code websites designed to capture interest and convert visitors into loyal clients. Responsive, fast-loading, SEO optimized, and fully customized."
            glowColor="purple"
            ctaColor="#8B5CF6"
            delay={0.2}
            onClick={handleCardClick}
          />

          {/* Card 3: AI Voice Agent */}
          <ServiceCard
            icon={Mic}
            title="AI Voice Agent"
            description="AI-powered voice assistants designed for real-time customer support, appointment scheduling, call-routing, and instant lead qualification. Speaks naturally and resolves queries in seconds."
            glowColor="cyan"
            ctaColor="#06B6D4"
            delay={0.3}
            onClick={handleCardClick}
          />
        </div>
      </div>
    </section>
  );
}
