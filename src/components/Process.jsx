import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Target, Code, Mic, Check } from 'lucide-react';
import { useAudio } from '../hooks/useAudio';

const serviceProcesses = {
  ads: {
    title: "Meta Ads Service",
    steps: [
      { num: "01", title: "Business & Audience Research", desc: "We deep-dive into your analytics, audit competitors, and build precise client personas." },
      { num: "02", title: "Campaign Strategy", desc: "We map out ad funnels, set budgets, and plan conversion paths." },
      { num: "03", title: "Pixel & Tracking Setup", desc: "We install Meta Pixels and verify Conversion APIs to track every single event." },
      { num: "04", title: "Ad Creative Planning", desc: "We direct hooks, copy variants, and high-impact motion assets." },
      { num: "05", title: "Campaign Launch", desc: "We activate targeted ad sets on Facebook and Instagram." },
      { num: "06", title: "Weekly Optimization & Reports", desc: "We prune low-performing ads and deliver detailed ROI summaries." }
    ]
  },
  web: {
    title: "Website Development",
    steps: [
      { num: "01", title: "Business Requirement Analysis", desc: "We gather technical specifications, content goals, and architecture needs." },
      { num: "02", title: "Wireframe & Content Planning", desc: "We draft low-fidelity user flow wireframes and plan content sections." },
      { num: "03", title: "Premium UI/UX Design", desc: "We craft custom layouts, micro-animations, and visual systems." },
      { num: "04", title: "Responsive Website Development", desc: "We code mobile-first React/Next.js pages with clean, fast layouts." },
      { num: "05", title: "SEO, GEO & Analytics Setup", desc: "We optimize tags, inject search engines, and configure tracking maps." },
      { num: "06", title: "Launch & Support", desc: "We push code live to global servers and offer 30 days of free support." }
    ]
  },
  ai: {
    title: "AI Voice Agent",
    steps: [
      { num: "01", title: "Business Call Flow Analysis", desc: "We map incoming/outgoing phone paths and lead routing scenarios." },
      { num: "02", title: "AI Agent Script Planning", desc: "We script conversation dialog trees, guidelines, and API prompts." },
      { num: "03", title: "Voice Agent Setup", desc: "We configure Vapi/Bland AI agents with realistic organic voices." },
      { num: "04", title: "CRM / WhatsApp Integration", desc: "We connect lead pipelines to Twilio, calendar schedules, and CRMs." },
      { num: "05", title: "Testing & Training", desc: "We test call routing latency and run multiple A/B validation calls." },
      { num: "06", title: "Go Live & Optimization", desc: "We launch phone automation lines and optimize conversational flow daily." }
    ]
  }
};

function ProcessStepCard({ num, title, desc, delay }) {
  const { playHover } = useAudio();
  const cardRef = useRef(null);

  // Mouse coords relative to card for 3D tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { damping: 25, stiffness: 180 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { damping: 25, stiffness: 180 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={playHover}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        background: 'radial-gradient(120% 120% at 0% 0%, rgba(37, 99, 235, 0.03) 0%, rgba(13, 18, 34, 0) 50%), #111827',
        willChange: "transform"
      }}
      className="relative p-6 sm:p-8 rounded-[24px] border border-white/5 shadow-xl flex flex-col items-start text-left cursor-pointer transition-all duration-300 backdrop-blur-md select-none group hover:border-accent-cyan/35 hover:shadow-[0_0_20px_rgba(6,182,212,0.1)]"
    >
      {/* Node Marker & Number with pulsing border glow */}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-9 h-9 rounded-full bg-[#0B1120] border-2 border-accent-cyan/40 group-hover:border-accent-cyan flex items-center justify-center shadow-[0_0_10px_rgba(6,182,212,0.15)] group-hover:shadow-[0_0_15px_rgba(6,182,212,0.35)] transition-all duration-300">
          <span className="font-sora font-extrabold text-xs text-accent-cyan animate-pulse">
            {num}
          </span>
        </div>
        <span className="font-poppins text-xs font-bold text-white/30 uppercase tracking-widest group-hover:text-accent-cyan/40 transition-colors">
          Step {num}
        </span>
      </div>

      {/* Step Title */}
      <h4 className="font-sora font-bold text-base sm:text-lg text-white group-hover:text-accent-cyan transition-colors duration-300">
        {title}
      </h4>

      {/* Step Description */}
      <p className="mt-3 font-poppins text-xs sm:text-sm text-white/55 leading-relaxed font-light">
        {desc}
      </p>
    </motion.div>
  );
}

export default function Process() {
  const [activeTab, setActiveTab] = useState('ads');
  const { playClick, playHover } = useAudio();

  const handleTabClick = (tabId) => {
    playClick();
    setActiveTab(tabId);
  };

  const tabs = [
    { id: 'ads', label: 'Meta Ads', icon: Target },
    { id: 'web', label: 'Website Development', icon: Code },
    { id: 'ai', label: 'AI Voice Agent', icon: Mic }
  ];

  return (
    <section id="process" className="relative bg-[#0B1120] py-24 border-t border-white/5 overflow-hidden">
      
      {/* Animated Background Particles */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-40">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-accent-blue/30"
            style={{
              top: `${15 + Math.random() * 70}%`,
              left: `${10 + Math.random() * 80}%`,
            }}
            animate={{
              y: [0, -60, 0],
              opacity: [0.1, 0.6, 0.1]
            }}
            transition={{
              duration: 7 + Math.random() * 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 3
            }}
          />
        ))}
      </div>

      {/* Background decoration glows */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent-blue/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-accent-purple/3 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section fade-up */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-sora font-extrabold text-3xl sm:text-5xl text-white tracking-tight"
          >
            How We <span className="text-gradient-blue-cyan neon-text-blue">Work</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 font-poppins text-base sm:text-lg text-white/50 font-light"
          >
            A clear step-by-step process for Meta Ads, Premium Websites, and AI Voice Agents.
          </motion.p>
        </div>

        {/* Large Glassmorphism Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glassmorphism p-6 sm:p-12 rounded-[32px] border border-white/5 shadow-2xl relative flex flex-col items-center z-10"
        >
          {/* Service Tabs/Cards: slide in from bottom */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12 sm:mb-16 w-full max-w-4xl z-10">
            {tabs.map((tab) => {
              const TabIcon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <motion.button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  onMouseEnter={playHover}
                  whileHover={{ y: -4, scale: 1.02 }}
                  style={{
                    boxShadow: isActive ? '0 0 20px rgba(6,182,212,0.25)' : 'none'
                  }}
                  className={`relative p-5 rounded-2xl border flex items-center justify-center gap-3.5 font-poppins text-xs sm:text-sm font-bold tracking-wide uppercase transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-accent-blue to-accent-cyan border-accent-cyan text-white'
                      : 'bg-white/5 border-white/10 hover:border-white/20 text-white/60 hover:text-white'
                  }`}
                >
                  <TabIcon size={18} className={isActive ? 'animate-pulse text-white' : 'text-white/40'} />
                  <span>{tab.label}</span>
                </motion.button>
              );
            })}
          </div>

          {/* Process Timeline below */}
          <div className="relative w-full z-10">
            {/* Connecting line animates left to right behind step nodes (desktop/tablet only) */}
            <div className="absolute top-[38px] left-[10%] right-[10%] h-[1.5px] bg-white/5 hidden lg:block z-0">
              <motion.div
                key={activeTab}
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="h-full bg-gradient-to-r from-accent-blue via-accent-cyan to-accent-blue shadow-[0_0_8px_rgba(6,182,212,0.4)]"
              />
            </div>

            {/* Steps list grid with slide transition */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10"
              >
                {serviceProcesses[activeTab].steps.map((step, idx) => (
                  <ProcessStepCard
                    key={idx}
                    num={step.num}
                    title={step.title}
                    desc={step.desc}
                    delay={idx * 0.08}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
