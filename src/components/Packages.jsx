import React from 'react';
import { motion } from 'framer-motion';
import { Check, Flame, Sparkles, Zap, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAudio } from '../hooks/useAudio';

function PackageCard({ name, price, badge, icon: Icon, features, bonuses, buttonText, popular = false, delay }) {
  const { playClick, playHover } = useAudio();

  const handleCardClick = (e) => {
    playClick();
    
    // Confetti effect burst
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 120,
      spread: 70,
      origin: { x, y: y - 0.1 },
      colors: ['#3b82f6', '#8b5cf6', '#06b6d4', '#ffffff']
    });

    // Scroll to contact form
    setTimeout(() => {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 800);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: delay }}
      className={`relative flex flex-col p-8 sm:p-10 rounded-3xl transition-all duration-300 ${
        popular 
          ? 'glassmorphism border-accent-purple/50 bg-[#0F172A]/70 shadow-[0_0_40px_rgba(139,92,246,0.15)] glow-purple scale-105 z-10' 
          : 'glassmorphism border-white/5 hover:border-white/10 hover:shadow-2xl shadow-xl'
      }`}
    >
      {/* Popular Tag */}
      {popular && (
        <span className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-accent-purple to-accent-cyan text-white text-xs font-bold font-poppins uppercase tracking-widest px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-[0_0_15px_rgba(139,92,246,0.4)]">
          <Award size={12} className="animate-spin" style={{ animationDuration: '6s' }} />
          Best Value
        </span>
      )}

      {/* Package Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <span className="font-poppins text-xs font-bold tracking-widest text-accent-cyan uppercase">
            {badge}
          </span>
          <h3 className="font-sora font-extrabold text-2xl text-white mt-1">
            {name}
          </h3>
        </div>
        <div className={`p-3 rounded-2xl ${popular ? 'bg-accent-purple/10 text-accent-purple' : 'bg-white/5 text-accent-cyan'}`}>
          <Icon size={22} />
        </div>
      </div>

      {/* Pricing */}
      <div className="flex items-baseline gap-1 mb-8">
        <span className="font-poppins text-white/50 text-xl font-medium">₹</span>
        <span className="font-sora font-extrabold text-4xl sm:text-5xl text-white tracking-tight">
          {price.toLocaleString('en-IN')}
        </span>
        <span className="font-poppins text-white/40 text-sm ml-1">/ project</span>
      </div>

      {/* Divider */}
      <hr className="border-white/5 mb-8" />

      {/* Includes list */}
      <div className="flex-grow">
        <p className="font-poppins text-xs font-bold tracking-wide uppercase text-white/40 mb-4">
          Includes
        </p>
        <ul className="space-y-3.5">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span className="p-0.5 bg-accent-blue/10 rounded text-accent-blue mt-0.5">
                <Check size={12} strokeWidth={3} />
              </span>
              <span className="font-poppins text-sm text-white/70 font-light">
                {feature}
              </span>
            </li>
          ))}
        </ul>

        {/* Bonus list */}
        {bonuses && bonuses.length > 0 && (
          <>
            <p className="font-poppins text-xs font-bold tracking-wide uppercase text-accent-purple mt-8 mb-4 flex items-center gap-1.5">
              <Sparkles size={12} className="animate-pulse" />
              Bonus Features
            </p>
            <ul className="space-y-3.5">
              {bonuses.map((bonus, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="p-0.5 bg-accent-purple/10 rounded text-accent-purple mt-0.5">
                    <Check size={12} strokeWidth={3} />
                  </span>
                  <span className="font-poppins text-sm text-accent-purple/95 font-semibold">
                    {bonus}
                  </span>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      {/* CTA Button */}
      <button
        onClick={handleCardClick}
        onMouseEnter={playHover}
        className={`w-full mt-10 py-4 px-6 rounded-2xl font-poppins text-sm sm:text-base font-bold tracking-wide transition-all duration-300 cursor-pointer ${
          popular 
            ? 'bg-gradient-to-r from-accent-purple to-accent-blue text-white shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)]' 
            : 'bg-white/5 border border-white/10 hover:border-accent-cyan/40 text-white hover:bg-white/10'
        }`}
      >
        {buttonText}
      </button>
    </motion.div>
  );
}

export default function Packages() {
  const packages = [
    {
      name: "Lead Booster",
      price: 19999,
      badge: "META ADS SCALE",
      icon: Zap,
      features: [
        "Meta Business Manager Setup",
        "Meta Pixel Installation & Integration",
        "1 Core Campaign Creation",
        "Detailed Audience Research",
        "Weekly Budget Optimization",
        "Weekly Performance Reports"
      ],
      bonuses: [
        "WhatsApp Automated Funnel",
        "Ad Competitor Analysis",
        "Priority Support (Email/WhatsApp)"
      ],
      buttonText: "Get Started",
      popular: false,
      delay: 0.1
    },
    {
      name: "Business Website Pro",
      price: 29999,
      badge: "LUXURY DEVELOP",
      icon: Flame,
      features: [
        "Premium Visual Website Design",
        "Fully Mobile & Tablet Responsive",
        "WhatsApp Direct Integration",
        "Google Analytics Setup & Mapping",
        "SEO On-Page Optimization",
        "Meta Conversion Pixel Setup"
      ],
      bonuses: [
        "Google Business Profile Setup",
        "Custom Business Domain Email",
        "30 Days Post-Launch Support"
      ],
      buttonText: "Get Started",
      popular: true,
      delay: 0.2
    },
    {
      name: "Business Growth System",
      price: 49999,
      badge: "ULTIMATE SUITE",
      icon: Sparkles,
      features: [
        "Full Custom Design Website",
        "2 Meta Ads Core Campaigns",
        "WhatsApp Lead Automations",
        "Advanced Analytics & Tracking",
        "Google Business Profile Mapping",
        "24/7 Priority Emergency Support"
      ],
      bonuses: [
        "Interactive AI Voice Lead Agent",
        "Quarterly Strategic Review",
        "1-on-1 Growth Consultation"
      ],
      buttonText: "Book Consultation",
      popular: false,
      delay: 0.3
    }
  ];

  return (
    <section id="packages" className="relative bg-[#070b13] py-24 border-t border-white/5">
      {/* Background glowing decorations */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-blue/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-purple/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-sora font-extrabold text-3xl sm:text-5xl text-white tracking-tight"
          >
            Premium <span className="text-gradient-blue-cyan neon-text-blue">Packages</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 font-poppins text-base sm:text-lg text-white/50 font-light"
          >
            Clear pricing tailored for ambitious businesses. Invest in world-class systems built to generate ROI.
          </motion.p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-8 items-start max-w-6xl mx-auto">
          {packages.map((pkg, idx) => (
            <PackageCard
              key={idx}
              name={pkg.name}
              price={pkg.price}
              badge={pkg.badge}
              icon={pkg.icon}
              features={pkg.features}
              bonuses={pkg.bonuses}
              buttonText={pkg.buttonText}
              popular={pkg.popular}
              delay={pkg.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
