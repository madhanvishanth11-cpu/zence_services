import React from 'react';
import { motion } from 'framer-motion';
import { Check, Target, Code, Mic } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAudio } from '../hooks/useAudio';

const glowStyles = {
  blue: {
    radial: 'radial-gradient(120% 120% at 0% 0%, rgba(124, 58, 237, 0.024) 0%, rgba(13, 18, 34, 0) 50%)',
    border: 'rgba(124, 58, 237, 0.075)',
    borderHover: 'rgba(124, 58, 237, 0.24)',
    shadow: '0 0 30px rgba(124, 58, 237, 0.03)',
    shadowHover: '0 0 45px rgba(124, 58, 237, 0.075)',
    iconBg: 'rgba(124, 58, 237, 0.03)',
    iconBorder: 'rgba(124, 58, 237, 0.09)',
    iconColor: '#7C3AED',
    btnBg: 'from-[#7C3AED] to-[#0EA5E9] hover:from-[#0EA5E9] hover:to-[#7C3AED] hover:shadow-[0_0_20px_rgba(124,58,237,0.12)]',
    badgeText: 'text-accent-blue'
  },
  purple: {
    radial: 'radial-gradient(120% 120% at 0% 0%, rgba(124, 58, 237, 0.015) 0%, rgba(13, 18, 34, 0) 50%)',
    border: 'rgba(124, 58, 237, 0.105)',
    borderHover: 'rgba(124, 58, 237, 0.24)',
    shadow: '0 0 25px rgba(124, 58, 237, 0.03)',
    shadowHover: '0 0 40px rgba(124, 58, 237, 0.075)',
    iconBg: 'rgba(124, 58, 237, 0.03)',
    iconBorder: 'rgba(124, 58, 237, 0.09)',
    iconColor: '#7C3AED',
    btnBg: 'from-[#7C3AED] to-[#0EA5E9] hover:from-[#0EA5E9] hover:to-[#7C3AED] hover:shadow-[0_0_30px_rgba(124,58,237,0.165)]', // Matches left and right blue gradient but maintains a purple glow
    badgeText: 'text-accent-purple'
  },
  cyan: {
    radial: 'radial-gradient(120% 120% at 0% 0%, rgba(20, 184, 166, 0.024) 0%, rgba(13, 18, 34, 0) 50%)',
    border: 'rgba(20, 184, 166, 0.075)',
    borderHover: 'rgba(20, 184, 166, 0.24)',
    shadow: '0 0 30px rgba(20, 184, 166, 0.03)',
    shadowHover: '0 0 45px rgba(20, 184, 166, 0.075)',
    iconBg: 'rgba(20, 184, 166, 0.03)',
    iconBorder: 'rgba(20, 184, 166, 0.09)',
    iconColor: '#14B8A6',
    btnBg: 'from-[#0EA5E9] to-[#7C3AED] hover:from-[#7C3AED] hover:to-[#0EA5E9] hover:shadow-[0_0_20px_rgba(20,184,166,0.12)]',
    badgeText: 'text-accent-cyan'
  }
};

function PackageCard({ name, priceText, priceLabel, badge, icon: Icon, description, features, buttonText, popular = false, delay }) {
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
      colors: ['#2563EB', '#0284C7', '#0F172A', '#94A3B8']
    });

    // Scroll to contact form
    setTimeout(() => {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 800);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: delay }}
      whileHover={{
        y: -6,
        scale: 1.01
      }}
      whileTap={{
        y: -4,
        scale: 1.01
      }}
      className="group relative rounded-[28px] transition-all duration-300 cursor-pointer select-none shadow-sm hover:shadow-xl outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50"
      onClick={handleCardClick}
      onMouseEnter={playHover}
    >
      {/* Animated Border Glow Wrapper (Visible on hover/touch) */}
      <div className="absolute inset-[-2px] rounded-[30px] overflow-hidden opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-400 pointer-events-none z-0">
        <div className="absolute inset-[-100%] animate-[spin_2.5s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,rgba(37,99,235,0.2)_40%,rgba(6,182,212,0.8)_100%)]" />
      </div>

      {/* Card Inner Container */}
      <div className="relative h-full flex flex-col justify-between p-8 sm:p-10 rounded-[28px] bg-white border border-slate-200 group-hover:border-transparent z-10 transition-colors duration-300">
      <div className="relative z-10">
        {/* Package Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <span className="font-poppins text-xs font-extrabold tracking-widest uppercase text-blue-600">
              {badge}
            </span>
            <h3 className="font-sora font-extrabold text-2xl text-slate-900 mt-1">
              {name}
            </h3>
          </div>
          <div 
            className="p-3 rounded-2xl border border-blue-100 bg-blue-50 text-blue-600 transition-all duration-300"
          >
            <Icon size={22} className="text-blue-600" />
          </div>
        </div>

        {/* Pricing */}
        <div className="flex flex-col gap-1 mb-6">
          <span className="font-poppins text-slate-400 text-xs uppercase tracking-wider font-semibold">
            {priceLabel}
          </span>
          <div className="flex items-baseline gap-1">
            <span className="font-sora font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
              {priceText}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="font-poppins text-sm text-slate-600 mb-8 leading-relaxed font-normal min-h-[60px]">
          {description}
        </p>

        {/* Divider */}
        <hr className="border-slate-200 mb-8" />

        {/* Includes list */}
        <div>
          <p className="font-poppins text-xs font-extrabold tracking-wide uppercase text-slate-400 mb-4">
            Includes
          </p>
          <ul className="space-y-3.5">
            {features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="p-0.5 bg-blue-50 border border-blue-200 rounded text-blue-600 mt-0.5 shrink-0">
                  <Check size={12} strokeWidth={3} className="text-blue-600" />
                </span>
                <span className="font-poppins text-sm text-slate-700 font-medium">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* CTA Button */}
      <button
        className="w-full mt-10 py-4 px-6 rounded-2xl font-poppins text-sm sm:text-base font-bold tracking-wide transition-all duration-300 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md"
      >
        {buttonText}
      </button>
      </div>
    </motion.div>
  );
}

export default function Packages() {
  const packages = [
    {
      name: "Meta Ads Growth",
      priceText: "₹19,999",
      priceLabel: "Starting from",
      badge: "META ADS SERVICE",
      icon: Target,
      description: "Launch and manage high-converting Meta advertising campaigns designed to generate qualified leads, increase sales, and maximize return on ad spend.",
      features: [
        "Meta Business Manager Setup",
        "Meta Pixel Installation",
        "Campaign Strategy",
        "Audience Research",
        "Ad Creative Guidance",
        "Conversion Tracking",
        "Weekly Performance Reports",
        "Monthly Optimization"
      ],
      buttonText: "Start Growing",
      popular: false,
      glowColor: "blue",
      delay: 0.1
    },
    {
      name: "Premium Business Website",
      priceText: "₹29,999",
      priceLabel: "Starting from",
      badge: "WEBSITE DEVELOPMENT",
      icon: Code,
      description: "Custom-designed premium business website built for speed, trust, lead generation, and SEO optimization.",
      features: [
        "Premium UI/UX Design",
        "Mobile Responsive Design",
        "SEO Ready Structure",
        "WhatsApp Integration",
        "Contact Form",
        "Google Analytics Setup",
        "Google Search Console Setup",
        "Basic GEO Optimization",
        "Speed Optimization",
        "30 Days Support"
      ],
      buttonText: "Build My Website",
      popular: true,
      glowColor: "purple",
      delay: 0.2
    },
    {
      name: "AI Voice Assistant",
      priceText: "₹39,999",
      priceLabel: "Starting from",
      badge: "AI VOICE AGENT",
      icon: Mic,
      description: "Deploy a 24/7 AI voice assistant that answers calls, books appointments, qualifies leads, and supports customers automatically.",
      features: [
        "AI Voice Agent Setup",
        "Incoming & Outgoing Calls",
        "Appointment Booking",
        "CRM Integration",
        "WhatsApp Integration",
        "Custom Conversation Flow",
        "Analytics Dashboard",
        "30 Days Support"
      ],
      buttonText: "Automate My Business",
      popular: false,
      glowColor: "cyan",
      delay: 0.3
    }
  ];

  return (
    <section id="packages" className="relative bg-slate-50 py-24 border-t border-slate-200">
      {/* Background glowing decorations */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 flex flex-col items-center">
          {/* Urgency Pill Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <div className="px-4.5 py-1.5 rounded-full text-[10px] sm:text-xs font-bold font-poppins bg-blue-600 text-white tracking-widest uppercase shadow-sm">
              🔥 LIMITED TO ONLY 5 CLIENTS
            </div>
          </motion.div>

          {/* Heading */}
          <h2 className="font-sora font-extrabold text-3xl sm:text-5xl text-slate-900 tracking-tight flex flex-wrap justify-center">
            {"Exclusive Launch Offer".split(" ").map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.1 }}
                className="inline-block mr-3 text-slate-900"
              >
                {word}
              </motion.span>
            ))}
          </h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-5 font-poppins text-base sm:text-lg text-slate-600 font-normal leading-relaxed"
          >
            To ensure premium quality and dedicated support, we are accepting only 5 new client projects under our exclusive launch pricing. Once all 5 slots are filled, our standard pricing will apply.
          </motion.p>

          {/* Urgency Text */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="mt-4 font-poppins text-xs sm:text-sm text-blue-600 font-bold tracking-wide"
          >
            <span className="flex items-center justify-center gap-1.5">
              ⚡ Only a few spots remaining.
            </span>
          </motion.p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-8 justify-items-stretch items-stretch max-w-6xl mx-auto">
          {packages.map((pkg, idx) => (
            <PackageCard
              key={idx}
              name={pkg.name}
              priceText={pkg.priceText}
              priceLabel={pkg.priceLabel}
              badge={pkg.badge}
              icon={pkg.icon}
              description={pkg.description}
              features={pkg.features}
              buttonText={pkg.buttonText}
              popular={pkg.popular}
              glowColor={pkg.glowColor}
              delay={pkg.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
