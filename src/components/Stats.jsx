import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Zap, MessageSquare, Cpu } from 'lucide-react';
import { useAudio } from '../hooks/useAudio';

function ZenceFeatureCard({ icon: Icon, title, description, delay }) {
  const { playHover } = useAudio();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay }}
      whileHover={{
        y: -6, // Lift by exactly 6px
        scale: 1.02,
        borderColor: 'rgba(56, 189, 248, 0.35)', // Border glow becomes slightly brighter
        boxShadow: '0 0 25px rgba(56, 189, 248, 0.15)' // Glow increases slightly
      }}
      onMouseEnter={playHover}
      style={{
        background: 'radial-gradient(120% 120% at 0% 0%, rgba(56, 189, 248, 0.05) 0%, rgba(11, 17, 32, 0) 60%), #111827', // Card Background #111827
        willChange: 'transform, box-shadow'
      }}
      className="glassmorphism p-6 sm:p-8 rounded-[24px] border border-white/5 shadow-xl flex flex-col items-start text-left cursor-pointer transition-all duration-300 relative overflow-hidden group select-none"
    >
      {/* Subtle Noise overlay for luxury look */}
      <div 
        className="absolute inset-0 opacity-[0.01] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
        }}
      />

      {/* Icon Wrapper: Dark navy glass + Soft cyan-blue glow + #38BDF8 icon color */}
      <div className="p-3.5 bg-[#0B1120]/80 rounded-xl text-[#38BDF8] border border-[#38BDF8]/20 shadow-[0_0_12px_rgba(56,189,248,0.15)] group-hover:bg-[#0B1120] group-hover:border-[#38BDF8]/40 group-hover:shadow-[0_0_20px_rgba(56,189,248,0.3)] transition-all duration-300 mb-6">
        <Icon size={22} className="transition-transform duration-300 group-hover:scale-[1.05]" />
      </div>

      {/* Heading */}
      <h3 className="font-sora font-semibold text-lg sm:text-xl text-white tracking-wide">
        {title}
      </h3>

      {/* Description */}
      <p className="mt-3.5 font-poppins text-sm text-white/50 leading-relaxed font-light">
        {description}
      </p>
    </motion.div>
  );
}

export default function WhyChooseZence() {
  const cards = [
    {
      icon: TrendingUp,
      title: "Performance-Driven Strategy",
      description: "Every decision is focused on helping businesses generate measurable growth. We run campaigns driven by actual revenue metrics, not superficial vanity impressions.",
      delay: 0.1
    },
    {
      icon: Zap,
      title: "Fast Delivery",
      description: "Premium websites and marketing systems delivered quickly without compromising quality. Our modern development pipelines ensure swift, robust deployments.",
      delay: 0.2
    },
    {
      icon: MessageSquare,
      title: "Transparent Communication",
      description: "Regular updates, honest advice, and complete project transparency. We align directly on deliverables and keep you updated every step of the roadmap.",
      delay: 0.3
    },
    {
      icon: Cpu,
      title: "Modern AI Solutions",
      description: "We use AI automation, Meta Ads, and modern web technologies to help businesses grow. We build custom-crafted platforms optimized for high conversion rates.",
      delay: 0.4
    }
  ];

  return (
    <section className="relative bg-[#0B1120] py-20 border-t border-white/5">
      {/* Background blue/cyan glow */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#2563EB]/4 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {cards.map((card, idx) => (
            <ZenceFeatureCard
              key={idx}
              icon={card.icon}
              title={card.title}
              description={card.description}
              delay={card.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
