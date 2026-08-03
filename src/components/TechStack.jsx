import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Code2, Database, Shield, Zap, Layers, Server, Cloud, Globe, CpuIcon } from 'lucide-react';

export default function TechStack() {
  const technologies = [
    {
      category: "Frontend & UI",
      description: "High-performance React & WebGL applications with sub-second page loads.",
      tools: [
        { name: "React 19", role: "Component Architecture", badge: "Core" },
        { name: "Vite", role: "Ultra-fast Bundling", badge: "Speed" },
        { name: "Tailwind CSS", role: "Design System Tokens", badge: "Styling" },
        { name: "Framer Motion", role: "Spring-Physics Animations", badge: "Motion" },
        { name: "Three.js", role: "3D & Interactive WebGL", badge: "3D Graphics" }
      ]
    },
    {
      category: "Growth & Automation",
      description: "Engineered pipelines for automated lead distribution & Meta attribution.",
      tools: [
        { name: "Meta Ads API", role: "Conversions API (CAPI)", badge: "Attribution" },
        { name: "Custom AI Voice Agents", role: "Automated Voice Booking", badge: "AI Tech" },
        { name: "Make.com / Webhooks", role: "Real-time Lead Routing", badge: "Automation" },
        { name: "Google Analytics 4 & GTM", role: "Event Tracking & Attribution", badge: "Analytics" }
      ]
    },
    {
      category: "Infrastructure & Security",
      description: "Enterprise-grade cloud hosting with global edge delivery and 99.99% uptime.",
      tools: [
        { name: "Vercel Edge Network", role: "Global CDN & Serverless", badge: "Hosting" },
        { name: "Supabase / PostgreSQL", role: "Database & Secure Auth", badge: "Database" },
        { name: "HTTPS / TLS 1.3", role: "Bank-grade Encryption", badge: "Security" },
        { name: "Schema.org JSON-LD", role: "GEO & AI Search Structured Data", badge: "SEO" }
      ]
    }
  ];

  return (
    <section id="tech-stack" className="relative bg-[#0B1020] py-24 border-t border-white/5 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-blue/3 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-blue/10 border border-accent-blue/20 text-accent-cyan text-xs font-semibold tracking-wide mb-4">
            <Cpu size={14} className="text-accent-cyan" />
            <span>TECHNOLOGY & INFRASTRUCTURE</span>
          </div>

          <h2 className="font-sora font-extrabold text-3xl sm:text-5xl text-white tracking-tight leading-tight">
            Built on Modern <span className="text-gradient-blue-cyan">Engineering Standards</span>
          </h2>

          <p className="mt-4 font-poppins text-base text-slate-400 font-light leading-relaxed">
            We don't build disposable websites. We engineer scalable digital assets utilizing the same stack behind Silicon Valley's fastest-growing tech platforms.
          </p>
        </div>

        {/* Tech Stack Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {technologies.map((col, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="glassmorphism p-8 rounded-2xl border border-white/5 flex flex-col justify-between hover:border-accent-blue/20 transition-all duration-300 group"
            >
              <div>
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
                  <h3 className="font-sora font-bold text-xl text-white tracking-wide">
                    {col.category}
                  </h3>
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-accent-cyan group-hover:text-accent-blue transition-colors">
                    {idx === 0 && <Code2 size={18} />}
                    {idx === 1 && <Zap size={18} />}
                    {idx === 2 && <Shield size={18} />}
                  </div>
                </div>

                <p className="font-poppins text-xs text-slate-400 font-light mb-6 leading-relaxed">
                  {col.description}
                </p>

                <div className="space-y-3">
                  {col.tools.map((tool, tIdx) => (
                    <div
                      key={tIdx}
                      className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between hover:bg-white/[0.04] transition-colors"
                    >
                      <div>
                        <h4 className="font-sora font-semibold text-sm text-white">
                          {tool.name}
                        </h4>
                        <p className="font-poppins text-[11px] text-slate-400">
                          {tool.role}
                        </p>
                      </div>
                      <span className="px-2.5 py-1 rounded-md bg-accent-blue/10 border border-accent-blue/20 text-accent-cyan text-[10px] font-bold tracking-wide uppercase">
                        {tool.badge}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
