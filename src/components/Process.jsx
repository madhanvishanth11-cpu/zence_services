import React from 'react';
import { motion } from 'framer-motion';
import { Search, Compass, Paintbrush, Terminal, Rocket, LineChart } from 'lucide-react';
import { useAudio } from '../hooks/useAudio';

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Discovery & Analysis",
    description: "We deep-dive into your existing analytics, map target audience profiles, audit competitors, and establish core conversion metrics to build a solid growth foundation.",
  },
  {
    number: "02",
    icon: Compass,
    title: "Strategic Planning",
    description: "We map out wireframe structures, build ad campaign mockups, design AI agent conversational workflows, and set clear milestones in a granular roadmap.",
  },
  {
    number: "03",
    icon: Paintbrush,
    title: "UX/UI Design",
    description: "We craft custom, high-fidelity mockups using premium typography, dynamic animations, and luxury layouts designed to captivate visitors and convert them.",
  },
  {
    number: "04",
    icon: Terminal,
    title: "Development & Setup",
    description: "We code responsive Vite+React pages, configure meta conversion tracking APIs, script automated dialog trees, and connect all lead databases together.",
  },
  {
    number: "05",
    icon: Rocket,
    title: "System Launch",
    description: "We push code to fast global servers, activate the Meta Ad campaign sets, wire up live WhatsApp notifications, and release AI voice agents into production.",
  },
  {
    number: "06",
    icon: LineChart,
    title: "Scale & Optimize",
    description: "We review analytics daily, perform A/B split testing on key headlines, prune low-performing ad audiences, and scale your systems to maximize daily revenue.",
  }
];

export default function Process() {
  const { playHover } = useAudio();

  return (
    <section id="process" className="relative bg-[#070b13] py-24 border-t border-white/5">
      {/* Background glowing decorations */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-accent-blue/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-accent-purple/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 sm:mb-28">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-sora font-extrabold text-3xl sm:text-5xl text-white tracking-tight"
          >
            The <span className="text-gradient-purple-cyan neon-text-cyan">Process</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 font-poppins text-base sm:text-lg text-white/50 font-light"
          >
            How we take your business from discovery to automated scaling.
          </motion.p>
        </div>

        {/* Timeline container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Center Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-white/10 -translate-x-1/2" />

          {/* Timeline Steps */}
          <div className="space-y-16 md:space-y-24">
            {steps.map((step, idx) => {
              const StepIcon = step.icon;
              const isEven = idx % 2 === 0;

              return (
                <div key={idx} className="relative flex flex-col md:flex-row md:justify-between items-start">
                  
                  {/* Glowing Node Marker */}
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ type: 'spring', damping: 15, stiffness: 200 }}
                    className="absolute left-4 md:left-1/2 transform -translate-x-1/2 z-10 w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-[#070b13] border-2 border-accent-cyan flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                  >
                    <StepIcon size={16} className="text-accent-cyan animate-pulse" />
                  </motion.div>

                  {/* Empty Spacer column for desktop */}
                  <div className="hidden md:block w-[45%]" />

                  {/* Text Card Column */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 50 : -50, y: 20 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    onMouseEnter={playHover}
                    className={`ml-12 md:ml-0 w-[calc(100%-3rem)] md:w-[45%] glassmorphism p-6 sm:p-8 rounded-2xl border border-white/5 hover:border-accent-cyan/20 transition-all duration-300 relative group ${
                      isEven ? 'md:text-left' : 'md:text-left' // Consistent left-alignment is cleaner for reading
                    }`}
                  >
                    {/* Step Number Tag */}
                    <span className="absolute top-4 right-6 font-sora font-extrabold text-3xl sm:text-4xl text-white/5 select-none group-hover:text-accent-cyan/10 transition-colors">
                      {step.number}
                    </span>

                    {/* Step Title */}
                    <h3 className="font-sora font-bold text-lg sm:text-xl text-white tracking-wide">
                      {step.title}
                    </h3>

                    {/* Step Description */}
                    <p className="mt-3 font-poppins text-xs sm:text-sm text-white/55 leading-relaxed font-light">
                      {step.description}
                    </p>
                  </motion.div>

                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
