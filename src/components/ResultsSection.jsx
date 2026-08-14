import React, { useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { TrendingUp, Users, MousePointer, ArrowUpRight, BarChart3, ShieldCheck, Sparkles, Target, Layers } from 'lucide-react';
import { useAudio } from '../hooks/useAudio';

// Animated Count-Up Hook for numbers
function CountUpNumber({ endValue, prefix = "", suffix = "", duration = 1.5 }) {
  const [count, setCount] = useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = parseFloat(endValue.replace(/[^0-9.]/g, ''));
    if (isNaN(end)) return;

    const isFloat = endValue.includes('.');
    const steps = 45;
    const increment = end / steps;
    const stepTime = (duration * 1000) / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, endValue, duration]);

  const isFloat = endValue.includes('.');
  const formatted = isFloat ? count.toFixed(1) : Math.floor(count).toLocaleString();

  return (
    <span ref={ref}>
      {prefix}{formatted}{suffix}
    </span>
  );
}

export default function ResultsSection() {
  const { playHover } = useAudio();

  const cardsData = [
    {
      id: "leads",
      number: "420+",
      rawNumber: "420",
      suffix: "+",
      label: "QUALIFIED LEADS",
      subtitle: "Meta Ads & Automated Lead Funnels",
      badgeText: "DEMO METRICS",
      icon: Users,
      visualType: "leads",
      accentColor: "blue",
      metrics: [
        { label: "Cost Per Lead", val: "$12.40", change: "-34%" },
        { label: "Conv. Rate", val: "8.6%", change: "+4.2%" }
      ]
    },
    {
      id: "roas",
      number: "3.8x",
      rawNumber: "3.8",
      suffix: "x",
      label: "AVERAGE ROAS",
      subtitle: "Full-Funnel Ad Optimization",
      badgeText: "DEMO METRICS",
      icon: TrendingUp,
      visualType: "roas",
      accentColor: "indigo",
      metrics: [
        { label: "Ad Revenue", val: "$48.2k", change: "+180%" },
        { label: "Ad Spend", val: "$12.6k", change: "Optimal" }
      ]
    },
    {
      id: "clicks",
      number: "1,200+",
      rawNumber: "1200",
      suffix: "+",
      label: "QUALIFIED CLICKS",
      subtitle: "High-Intent Traffic Campaigns",
      badgeText: "DEMO METRICS",
      icon: MousePointer,
      visualType: "clicks",
      accentColor: "cyan",
      metrics: [
        { label: "Avg. CTR", val: "4.85%", change: "+2.1%" },
        { label: "Cost Per Click", val: "$0.82", change: "-22%" }
      ]
    }
  ];

  return (
    <section id="results" className="relative bg-slate-50 py-24 border-t border-slate-200 overflow-hidden">
      {/* Soft Ambient Background Glows */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-blue-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 px-3.5 py-1.5 rounded-full mb-4 shadow-sm"
          >
            <Sparkles size={14} className="text-blue-600" />
            <span className="font-poppins text-xs font-bold text-blue-600 uppercase tracking-widest">
              PERFORMANCE BLUEPRINT
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-sora font-extrabold text-3xl sm:text-5xl text-slate-900 tracking-tight"
          >
            Results That <span className="text-blue-600">Drive Growth</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 font-poppins text-base sm:text-lg text-slate-600 font-normal leading-relaxed"
          >
            Performance-focused digital marketing strategies designed to generate measurable business results.
          </motion.p>
        </div>

        {/* 3 Horizontal Cards Grid (Desktop 3 cols, Tablet 2 cols, Mobile 1 col) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {cardsData.map((card, idx) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              whileHover={{ y: -6 }}
              onMouseEnter={playHover}
              className="bg-white border border-slate-200 rounded-[24px] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group select-none relative"
            >
              {/* Top Section: Number & Label Badge */}
              <div className="p-8 sm:p-9 pb-4 text-center flex flex-col items-center">
                
                {/* Demo Performance Tag */}
                <div className="mb-3 px-2.5 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  {card.badgeText}
                </div>

                {/* Dominant Large Statistic Number */}
                <div className="font-sora font-extrabold text-5xl sm:text-6xl text-blue-600 tracking-tight leading-none">
                  <CountUpNumber
                    endValue={card.rawNumber}
                    suffix={card.suffix}
                    duration={1.6}
                  />
                </div>

                {/* Clean White Pill Badge Directly Underneath */}
                <div className="mt-4 inline-flex items-center gap-1.5 bg-slate-50 border border-slate-200 shadow-sm px-4 py-1.5 rounded-full text-slate-700 font-poppins text-xs font-extrabold tracking-wider uppercase">
                  <card.icon size={13} className="text-blue-600" />
                  <span>{card.label}</span>
                </div>
              </div>

              {/* Bottom Section: Premium Marketing Dashboard Visual */}
              <div className="p-6 pt-2">
                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 sm:p-5 relative overflow-hidden transition-transform duration-500 group-hover:scale-[1.02]">
                  
                  {/* Dashboard Header Bar */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="font-sora text-xs font-bold text-slate-800">
                        {card.subtitle}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold font-poppins text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                      LIVE DATA
                    </span>
                  </div>

                  {/* Visual Renderings Based on Card Type */}
                  {card.visualType === "leads" && (
                    <div className="space-y-3">
                      {/* SVG Line Graph for Leads Trend */}
                      <div className="h-20 w-full relative flex items-end">
                        <svg className="w-full h-full overflow-visible" viewBox="0 0 300 80">
                          <defs>
                            <linearGradient id="leadGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#2563eb" stopOpacity="0.25" />
                              <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
                            </linearGradient>
                          </defs>
                          <path
                            d="M 0,60 Q 50,40 100,50 T 200,20 T 300,10 L 300,80 L 0,80 Z"
                            fill="url(#leadGrad)"
                          />
                          <path
                            d="M 0,60 Q 50,40 100,50 T 200,20 T 300,10"
                            fill="none"
                            stroke="#2563eb"
                            strokeWidth="3"
                            strokeLinecap="round"
                          />
                          {/* Pulsing indicator dots */}
                          <circle cx="300" cy="10" r="4" fill="#2563eb" className="animate-ping" />
                          <circle cx="300" cy="10" r="4" fill="#2563eb" />
                        </svg>
                      </div>

                      {/* Mini Lead Conversion Rows */}
                      <div className="grid grid-cols-2 gap-2 pt-1">
                        {card.metrics.map((m, i) => (
                          <div key={i} className="bg-white border border-slate-200/80 rounded-xl p-2.5 text-left shadow-2xs">
                            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide">{m.label}</span>
                            <div className="flex items-center justify-between mt-0.5">
                              <span className="font-sora font-extrabold text-sm text-slate-900">{m.val}</span>
                              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">{m.change}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {card.visualType === "roas" && (
                    <div className="space-y-3">
                      {/* ROAS Growth Curve */}
                      <div className="h-20 w-full relative flex items-end">
                        <svg className="w-full h-full overflow-visible" viewBox="0 0 300 80">
                          <defs>
                            <linearGradient id="roasGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.25" />
                              <stop offset="100%" stopColor="#4f46e5" stopOpacity="0" />
                            </linearGradient>
                          </defs>
                          <path
                            d="M 0,70 C 60,65 120,45 180,30 C 240,15 270,10 300,5 L 300,80 L 0,80 Z"
                            fill="url(#roasGrad)"
                          />
                          <path
                            d="M 0,70 C 60,65 120,45 180,30 C 240,15 270,10 300,5"
                            fill="none"
                            stroke="#4f46e5"
                            strokeWidth="3"
                            strokeLinecap="round"
                          />
                          <circle cx="300" cy="5" r="4" fill="#4f46e5" />
                        </svg>
                      </div>

                      {/* ROAS Metrics Breakdown */}
                      <div className="grid grid-cols-2 gap-2 pt-1">
                        {card.metrics.map((m, i) => (
                          <div key={i} className="bg-white border border-slate-200/80 rounded-xl p-2.5 text-left shadow-2xs">
                            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide">{m.label}</span>
                            <div className="flex items-center justify-between mt-0.5">
                              <span className="font-sora font-extrabold text-sm text-slate-900">{m.val}</span>
                              <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">{m.change}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {card.visualType === "clicks" && (
                    <div className="space-y-3">
                      {/* Bar Chart Graphics for Click Volume */}
                      <div className="h-20 w-full flex items-end justify-between gap-2 px-1 pt-2">
                        {[35, 45, 60, 50, 75, 90, 80, 100].map((h, i) => (
                          <div key={i} className="w-full bg-slate-200/80 rounded-t-md h-full flex items-end">
                            <motion.div
                              initial={{ height: 0 }}
                              whileInView={{ height: `${h}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.8, delay: i * 0.05 }}
                              className={`w-full rounded-t-md ${i >= 5 ? 'bg-cyan-600' : 'bg-blue-400/80'}`}
                            />
                          </div>
                        ))}
                      </div>

                      {/* Click Metrics Breakdown */}
                      <div className="grid grid-cols-2 gap-2 pt-1">
                        {card.metrics.map((m, i) => (
                          <div key={i} className="bg-white border border-slate-200/80 rounded-xl p-2.5 text-left shadow-2xs">
                            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide">{m.label}</span>
                            <div className="flex items-center justify-between mt-0.5">
                              <span className="font-sora font-extrabold text-sm text-slate-900">{m.val}</span>
                              <span className="text-[10px] font-bold text-cyan-600 bg-cyan-50 px-1.5 py-0.5 rounded">{m.change}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              </div>

            </motion.div>
          ))}
        </div>

        {/* Portfolio / Demo Disclaimer Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="font-poppins text-xs text-slate-500 font-normal">
            * Demonstration performance benchmarks based on Meta Ads campaigns & high-conversion agency workflows.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
