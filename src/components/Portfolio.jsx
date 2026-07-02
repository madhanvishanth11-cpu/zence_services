import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, TrendingUp, Cpu, Globe, X, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { useAudio } from '../hooks/useAudio';

const projects = [
  {
    id: 1,
    title: "Aether Luxury E-Commerce",
    category: "web",
    tag: "Next.js / Shopify Plus",
    stat: "140% Sales Increase",
    imageGradient: "from-accent-blue/40 to-accent-cyan/10",
    caseStudy: {
      problem: "Aether required a digital storefront that reflected their high-end, premium watches. Traditional themes were too slow and generic, causing high cart abandonment rates.",
      solution: "We engineered a headless React + Shopify architecture with custom WebGL 3D model viewers, scroll-linked typography animations, and instant checkout pages.",
      results: [
        "142% Increase in Conversion Rate",
        "Average Page Load Time cut to 0.4 seconds",
        "42% Higher Average Order Value (AOV)"
      ],
      tech: ["React", "Shopify GraphQL", "GSAP", "Three.js", "Tailwind CSS"]
    }
  },
  {
    id: 2,
    title: "Vortex SaaS Growth Funnels",
    category: "ads",
    tag: "Meta Ads & Retargeting",
    stat: "5.2x Average ROAS",
    imageGradient: "from-accent-purple/40 to-accent-blue/10",
    caseStudy: {
      problem: "Vortex SaaS was burning cash on broad-audience Meta campaigns with low conversion rates and high customer acquisition costs.",
      solution: "Implemented our hyper-targeted custom audience funnel, created dynamic motion design creatives, and engineered custom landing pages with pixel-perfect tracking.",
      results: [
        "5.2x Average Return on Ad Spend",
        "67% Reduction in Cost Per Lead",
        "$120,000+ New ARR Generated in 60 Days"
      ],
      tech: ["Meta Ads Manager", "Conversion API", "Hotjar", "Vite", "Framer Motion"]
    }
  },
  {
    id: 3,
    title: "Nexus Dental Voice Agent",
    category: "ai",
    tag: "AI Conversational Voice Bot",
    stat: "850+ Bookings/Month",
    imageGradient: "from-accent-cyan/40 to-accent-purple/10",
    caseStudy: {
      problem: "Nexus Clinics was losing up to 30% of booking leads because patient receptionists were busy during peak call hours.",
      solution: "We deployed an autonomous conversational AI voice assistant connected to their scheduling calendar. It answers calls instantly and speaks in an organic, natural tone.",
      results: [
        "Zero Missed Patient Calls",
        "850+ Appointments Booked per month autonomously",
        "45% Decrease in Administrative Overhead"
      ],
      tech: ["Vapi / Bland AI", "OpenAI GPT-4o", "Node.js", "Twilio API", "Google Calendar API"]
    }
  },
  {
    id: 4,
    title: "Solas Smart Real Estate Portal",
    category: "web",
    tag: "React + Headless CMS",
    stat: "250K+ Monthly Users",
    imageGradient: "from-emerald-500/40 to-accent-blue/10",
    caseStudy: {
      problem: "Solas needed a fast-filtering property search that could map 10,000+ luxury listings in real-time without sluggishness.",
      solution: "We designed a web app utilizing Elasticsearch and custom Mapbox overlays. We added glassmorphic detail panels and interactive layout transitions.",
      results: [
        "Instant filtering under 50ms",
        "280% Increase in Property Inquiries",
        "Average Session Duration doubled"
      ],
      tech: ["React", "Mapbox GL", "Elasticsearch", "Sanity CMS", "Vite"]
    }
  },
  {
    id: 5,
    title: "Aura Wealth Advisory Ads",
    category: "ads",
    tag: "Lead Generation",
    stat: "420+ High-Net-Worth Leads",
    imageGradient: "from-amber-500/40 to-accent-purple/10",
    caseStudy: {
      problem: "Aura Wealth struggled to target ultra-wealthy investors. Standard demographics filters were catching non-qualified leads.",
      solution: "Developed an exclusive invite-only questionnaire funnel. We layered competitor targeting and custom high-net-worth client lists on Meta.",
      results: [
        "420+ Fully Qualified HNW Leads in 30 Days",
        "Average investable assets of leads exceeded ₹1 Crore",
        "8% Conversion from lead to client"
      ],
      tech: ["Meta Conversion API", "Typeform", "Zapier Integration", "Salesforce CRM"]
    }
  },
  {
    id: 6,
    title: "Echo Customer Support Agent",
    category: "ai",
    tag: "AI Customer Support Bot",
    stat: "78% Tickets Resolved",
    imageGradient: "from-indigo-500/40 to-accent-cyan/10",
    caseStudy: {
      problem: "Echo Retail was experiencing ticket backlogs of over 48 hours, hurting customer satisfaction scores.",
      solution: "Built a customized voice and text agent that integrated with their Shopify inventory and shipping databases to handle tracking, returns, and FAQs.",
      results: [
        "78% of Customer Queries solved without human agents",
        "Customer Wait Time reduced from 12 hours to 0 seconds",
        "94% Customer Satisfaction rating"
      ],
      tech: ["Voiceflow API", "LangChain", "Shopify API", "Pinecone Vector DB"]
    }
  }
];

export default function Portfolio() {
  const [filter, setFilter] = useState('all');
  const [activeProject, setActiveProject] = useState(null);
  const { playClick, playHover } = useAudio();

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter);

  const handleFilterClick = (cat) => {
    playClick();
    setFilter(cat);
  };

  const handleProjectClick = (project) => {
    playClick();
    setActiveProject(project);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    playClick();
    setActiveProject(null);
    document.body.style.overflow = '';
  };

  return (
    <section id="portfolio" className="relative bg-[#070b13] py-24 border-t border-white/5">
      {/* Background glow decoration */}
      <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-accent-blue/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-accent-purple/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-sora font-extrabold text-3xl sm:text-5xl text-white tracking-tight"
          >
            Our <span className="text-gradient-blue-cyan neon-text-blue">Portfolio</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 font-poppins text-base sm:text-lg text-white/50 font-light"
          >
            Explore our world-class case studies. Built for speed, conversions, and growth.
          </motion.p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {['all', 'web', 'ads', 'ai'].map((cat) => (
            <button
              key={cat}
              onClick={() => handleFilterClick(cat)}
              onMouseEnter={playHover}
              className={`px-5 py-2.5 rounded-full font-poppins text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                filter === cat
                  ? 'bg-gradient-to-r from-accent-blue to-accent-cyan text-white shadow-[0_0_15px_rgba(59,130,246,0.35)]'
                  : 'bg-white/5 border border-white/10 hover:border-white/20 text-white/60 hover:text-white'
              }`}
            >
              {cat === 'all' ? 'All Work' : cat === 'web' ? 'Web Development' : cat === 'ads' ? 'Meta Ads' : 'AI Assistants'}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((p) => (
              <motion.div
                layout
                key={p.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group relative rounded-2xl overflow-hidden cursor-pointer bg-[#0f172a] border border-white/5 hover:border-accent-cyan/30 transition-all flex flex-col hover:shadow-2xl shadow-xl h-96"
                onClick={() => handleProjectClick(p)}
                onMouseEnter={playHover}
              >
                {/* Visual Image / Abstract Gradient Renders */}
                <div className={`relative w-full h-[60%] bg-gradient-to-br ${p.imageGradient} flex items-center justify-center overflow-hidden transition-all duration-500 group-hover:scale-105`}>
                  
                  {/* Decorative digital layout grid */}
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.5))] z-1" />
                  
                  {/* Abstract design elements showing stats or code wireframes */}
                  <div className="relative z-2 text-center flex flex-col items-center">
                    <span className="font-sora font-extrabold text-3xl text-white tracking-tight drop-shadow-lg neon-text-blue">
                      {p.stat}
                    </span>
                    <span className="font-poppins text-xs font-semibold uppercase tracking-wider text-accent-cyan bg-accent-cyan/10 px-3 py-1 rounded-full border border-accent-cyan/20 mt-2">
                      Result
                    </span>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-secondary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                    <div className="flex items-center gap-2 bg-gradient-to-r from-accent-blue to-accent-purple px-4 py-2.5 rounded-xl text-white font-poppins text-xs font-bold uppercase tracking-wider shadow-lg">
                      <span>View Case Study</span>
                      <ArrowUpRight size={14} />
                    </div>
                  </div>
                </div>

                {/* Info Area */}
                <div className="p-6 flex flex-col justify-between flex-grow bg-slate-900/60 z-20">
                  <div>
                    <span className="font-poppins text-[10px] font-bold text-accent-purple uppercase tracking-widest">
                      {p.tag}
                    </span>
                    <h3 className="font-sora font-bold text-lg text-white mt-1 group-hover:text-accent-cyan transition-colors">
                      {p.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-1.5 text-white/40 text-xs font-poppins font-light">
                    <Globe size={12} />
                    <span>Click to read client history</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Case Study Modal */}
      <AnimatePresence>
        {activeProject && (
          <div className="fixed inset-0 z-9999 flex items-center justify-center px-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-[#070b13]/85 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-3xl glassmorphism rounded-3xl overflow-hidden shadow-2xl z-10 border border-white/10"
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-5 right-5 p-2 rounded-full bg-white/5 border border-white/10 hover:border-white/20 text-white/60 hover:text-white transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>

              {/* Case Study Content */}
              <div className="p-6 sm:p-10 max-h-[85vh] overflow-y-auto">
                <span className="font-poppins text-xs font-bold text-accent-cyan uppercase tracking-widest">
                  CASE STUDY
                </span>
                <h3 className="font-sora font-extrabold text-2xl sm:text-3xl text-white mt-1">
                  {activeProject.title}
                </h3>
                <p className="font-poppins text-xs text-white/50 mt-1 uppercase tracking-wide">
                  {activeProject.tag}
                </p>

                <hr className="border-white/5 my-6" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Problem & Solution */}
                  <div className="flex flex-col gap-6">
                    <div>
                      <h4 className="font-sora font-bold text-white text-base sm:text-lg mb-2 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-rose-500 rounded-full" />
                        The Problem
                      </h4>
                      <p className="font-poppins text-sm text-white/60 leading-relaxed font-light">
                        {activeProject.caseStudy.problem}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-sora font-bold text-white text-base sm:text-lg mb-2 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-accent-blue-glow rounded-full" />
                        Our Solution
                      </h4>
                      <p className="font-poppins text-sm text-white/60 leading-relaxed font-light">
                        {activeProject.caseStudy.solution}
                      </p>
                    </div>
                  </div>

                  {/* Results & Tech */}
                  <div className="flex flex-col gap-6 bg-white/3 p-6 rounded-2xl border border-white/5">
                    <div>
                      <h4 className="font-sora font-bold text-accent-cyan text-base sm:text-lg mb-3 flex items-center gap-2">
                        <TrendingUp size={16} />
                        Measurable Results
                      </h4>
                      <ul className="space-y-3">
                        {activeProject.caseStudy.results.map((r, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm font-poppins">
                            <CheckCircle2 size={16} className="text-emerald-400 mt-0.5 shrink-0" />
                            <span className="text-white/80 font-semibold">{r}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-sora font-bold text-white text-xs uppercase tracking-widest text-white/40 mb-3 flex items-center gap-1.5">
                        <Cpu size={14} />
                        Engine Technology
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {activeProject.caseStudy.tech.map((t, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] sm:text-xs font-poppins font-bold bg-[#070b13]/60 px-2.5 py-1.5 rounded-lg border border-white/5 text-white/70"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <button
                    onClick={() => {
                      closeModal();
                      setTimeout(() => {
                        const el = document.getElementById('contact');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }, 400);
                    }}
                    className="flex items-center gap-2 bg-gradient-to-r from-accent-blue to-accent-purple text-white py-3 px-6 rounded-xl font-poppins text-sm font-bold tracking-wide hover:shadow-[0_0_15px_rgba(139,92,246,0.3)] transition-all cursor-pointer"
                  >
                    <span>Request Similar System</span>
                    <ArrowUpRight size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
