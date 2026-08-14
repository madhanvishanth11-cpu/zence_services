import React from 'react';
import { motion } from 'framer-motion';
import { Truck, BarChart3, Palette, ShieldCheck, HeartHandshake, Eye } from 'lucide-react';
import { useAudio } from '../hooks/useAudio';

function BenefitCard({ icon: Icon, title, description, delay }) {
  const { playHover } = useAudio();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: delay }}
      onMouseEnter={playHover}
      className="p-6 sm:p-8 rounded-2xl border border-slate-200 bg-slate-50 shadow-sm flex flex-col items-start text-left relative overflow-hidden group hover:border-blue-400/40 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
    >
      {/* Icon */}
      <div className="p-3.5 bg-blue-50 rounded-xl text-blue-600 group-hover:bg-blue-100 transition-all duration-300 mb-6">
        <Icon size={20} className="text-blue-600" />
      </div>

      {/* Title */}
      <h3 className="font-sora font-extrabold text-lg sm:text-xl text-slate-900 tracking-wide">
        {title}
      </h3>

      {/* Description */}
      <p className="mt-3 font-poppins text-sm text-slate-600 leading-relaxed font-normal">
        {description}
      </p>
    </motion.div>
  );
}

export default function WhyChooseUs() {
  const benefits = [
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "We deploy lean agile methodologies to build, test, and release your custom systems within weeks instead of months, without sacrificing code quality.",
      delay: 0.1
    },
    {
      icon: BarChart3,
      title: "ROI Focused",
      description: "We align all Meta Ads, lead campaigns, and conversion flows directly to revenue metrics. Our strategies target profitable, repeatable scaling.",
      delay: 0.2
    },
    {
      icon: Palette,
      title: "Premium Designs",
      description: "Our websites follow award-winning UI/UX layouts. Bold typography, custom WebGL interactions, and smooth animations wow your high-ticket clients.",
      delay: 0.3
    },
    {
      icon: ShieldCheck,
      title: "Business Growth",
      description: "We create systematic customer acquisition models. Combine web forms, email flows, and ads into a unified engine that runs automatically.",
      delay: 0.4
    },
    {
      icon: HeartHandshake,
      title: "Dedicated Support",
      description: "You receive direct access to our core specialists. We offer active technical maintenance, weekly updates, and priority Slack/WhatsApp channels.",
      delay: 0.5
    },
    {
      icon: Eye,
      title: "Advanced Analytics",
      description: "Get full transparency into your campaigns. We integrate custom Google Tag Manager, custom dashboards, and conversion trackers for absolute clarity.",
      delay: 0.6
    }
  ];

  return (
    <section id="why-zence" className="relative bg-white py-24 border-t border-slate-200">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/10 w-96 h-96 bg-blue-500/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/10 right-1/10 w-80 h-80 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-sora font-extrabold text-3xl sm:text-5xl text-slate-900 tracking-tight"
          >
            Why Choose <span className="text-blue-600">ZENCE</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 font-poppins text-base sm:text-lg text-slate-600 font-normal"
          >
            We don't just deliver files; we build fully-automated client acquisition pipelines.
          </motion.p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {benefits.map((benefit, idx) => (
            <BenefitCard
              key={idx}
              icon={benefit.icon}
              title={benefit.title}
              description={benefit.description}
              delay={benefit.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
