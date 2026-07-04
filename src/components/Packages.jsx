import React from 'react';
import { motion } from 'framer-motion';
import { Check, Target, Code, Mic } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAudio } from '../hooks/useAudio';

const glowStyles = {
  blue: {
    radial: 'radial-gradient(120% 120% at 0% 0%, rgba(59, 130, 246, 0.08) 0%, rgba(13, 18, 34, 0) 50%)',
    border: 'rgba(59, 130, 246, 0.25)',
    borderHover: 'rgba(59, 130, 246, 0.8)',
    shadow: '0 0 30px rgba(59, 130, 246, 0.1)',
    shadowHover: '0 0 45px rgba(59, 130, 246, 0.25)',
    iconBg: 'rgba(59, 130, 246, 0.1)',
    iconBorder: 'rgba(59, 130, 246, 0.3)',
    iconColor: '#3B82F6',
    btnBg: 'from-blue-600 to-cyan-500 hover:from-cyan-500 hover:to-blue-600 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]',
    badgeText: 'text-accent-blue'
  },
  purple: {
    radial: 'radial-gradient(120% 120% at 0% 0%, rgba(139, 92, 246, 0.15) 0%, rgba(13, 18, 34, 0) 50%)',
    border: 'rgba(139, 92, 246, 0.55)', // Slightly stronger purple-blue border glow
    borderHover: 'rgba(139, 92, 246, 1)',
    shadow: '0 0 35px rgba(139, 92, 246, 0.15)',
    shadowHover: '0 0 50px rgba(139, 92, 246, 0.45)', // Enhanced shadow expand on hover
    iconBg: 'rgba(139, 92, 246, 0.2)', // Slightly stronger icon container bg
    iconBorder: 'rgba(139, 92, 246, 0.5)', // Stronger border
    iconColor: '#8B5CF6',
    btnBg: 'from-accent-purple to-accent-blue hover:from-accent-blue hover:to-accent-purple hover:shadow-[0_0_30px_rgba(139,92,246,0.75)]', // Much stronger button hover glow
    badgeText: 'text-accent-purple'
  },
  cyan: {
    radial: 'radial-gradient(120% 120% at 0% 0%, rgba(6, 182, 212, 0.08) 0%, rgba(13, 18, 34, 0) 50%)',
    border: 'rgba(6, 182, 212, 0.25)',
    borderHover: 'rgba(6, 182, 212, 0.8)',
    shadow: '0 0 30px rgba(6, 182, 212, 0.1)',
    shadowHover: '0 0 45px rgba(6, 182, 212, 0.25)',
    iconBg: 'rgba(6, 182, 212, 0.1)',
    iconBorder: 'rgba(6, 182, 212, 0.3)',
    iconColor: '#06B6D4',
    btnBg: 'from-cyan-500 to-blue-500 hover:from-blue-500 hover:to-cyan-500 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]',
    badgeText: 'text-accent-cyan'
  }
};

function PackageCard({ name, priceText, priceLabel, badge, icon: Icon, description, features, buttonText, popular = false, glowColor, delay }) {
  const { playClick, playHover } = useAudio();
  const style = glowStyles[glowColor] || glowStyles.blue;

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
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: delay }}
      style={{
        background: `${style.radial}, #0D1222`,
        borderColor: style.border,
        boxShadow: style.shadow,
        borderWidth: popular ? '2px' : '1.5px', // Thicker border for featured card
        willChange: "transform, box-shadow"
      }}
      whileHover={{
        y: -8, // Lift by exactly 8px on hover
        scale: 1.02, // Consistent scale lift across all cards
        boxShadow: style.shadowHover,
        borderColor: style.borderHover
      }}
      className={`relative flex flex-col justify-between p-8 sm:p-10 rounded-[28px] transition-all duration-300 cursor-pointer backdrop-blur-[20px] select-none`}
      onClick={handleCardClick}
      onMouseEnter={playHover}
    >
      {/* Subtle Noise Texture Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.015] pointer-events-none mix-blend-overlay rounded-[28px] z-1"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      {/* Thin Animated Gradient Top Edge Line for Featured Card */}
      {popular && (
        <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-accent-purple via-accent-cyan to-accent-blue rounded-t-[28px] animate-pulse z-10" />
      )}

      {/* Faint Animated Background Glow inside the Card for Premium effect */}
      {popular && (
        <div 
          className="absolute inset-0 bg-gradient-to-br from-accent-purple/5 via-transparent to-accent-blue/5 rounded-[28px] animate-pulse pointer-events-none z-0" 
          style={{ animationDuration: '4s' }}
        />
      )}

      <div className="relative z-10">
        {/* Package Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <span className={`font-poppins text-xs font-bold tracking-widest uppercase ${style.badgeText}`}>
              {badge}
            </span>
            <h3 className="font-sora font-extrabold text-2xl text-white mt-1">
              {name}
            </h3>
          </div>
          <div 
            style={{
              backgroundColor: style.iconBg,
              borderColor: style.iconBorder,
              boxShadow: popular ? '0 0 15px rgba(139, 92, 246, 0.3)' : 'none' // Stronger icon glow for featured
            }}
            className="p-3 rounded-2xl border text-white transition-all duration-300"
          >
            <Icon size={22} color={style.iconColor} />
          </div>
        </div>

        {/* Pricing */}
        <div className="flex flex-col gap-1 mb-6">
          <span className="font-poppins text-white/40 text-xs uppercase tracking-wider font-semibold">
            {priceLabel}
          </span>
          <div className="flex items-baseline gap-1">
            <span className="font-sora font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
              {priceText}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="font-poppins text-sm text-white/50 mb-8 leading-relaxed font-light min-h-[60px]">
          {description}
        </p>

        {/* Divider */}
        <hr className="border-white/5 mb-8" />

        {/* Includes list */}
        <div>
          <p className="font-poppins text-xs font-bold tracking-wide uppercase text-white/40 mb-4">
            Includes
          </p>
          <ul className="space-y-3.5">
            {features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="p-0.5 bg-white/5 border border-white/10 rounded text-accent-cyan mt-0.5 shrink-0">
                  <Check size={12} strokeWidth={3} color={style.iconColor} />
                </span>
                <span className="font-poppins text-sm text-white/70 font-light">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* CTA Button */}
      <button
        className={`w-full mt-10 py-4 px-6 rounded-2xl font-poppins text-sm sm:text-base font-bold tracking-wide transition-all duration-500 cursor-pointer bg-gradient-to-r text-white bg-[length:200%_auto] hover:bg-right ${style.btnBg}`}
      >
        {buttonText}
      </button>
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
