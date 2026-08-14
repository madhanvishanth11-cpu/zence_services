import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight, CheckCircle2, MessageSquare, Phone, Play, X, Sparkles, TrendingUp, Cpu } from 'lucide-react';
import { useAudio } from '../hooks/useAudio';

const projects = {
  websites: [
    {
      id: "w1",
      title: "Digital Growth Agency",
      categoryLabel: "Business Website",
      description: "Modern digital marketing agency website showcasing Meta Ads, AI automation, and premium website development.",
      link: "https://madhanvishanth11.wixsite.com/digital-growth-speci",
      image: "/digital_growth.png",
      buttonText: "View Live Demo"
    },
    {
      id: "w2",
      title: "ZARO Course Platform",
      categoryLabel: "Course Sales Landing Page",
      description: "High-converting landing page designed to sell online courses with modern UI and lead generation.",
      link: "https://madhanvishanth11.wixsite.com/zaro",
      image: "/zaro_course.png",
      buttonText: "View Live Demo"
    },
    {
      id: "w3",
      title: "Service Company Website",
      categoryLabel: "Company Website",
      description: "Professional company website featuring premium services, inquiry forms, and conversion-focused design.",
      link: "https://my-site-20ay355b-madhanvishanth11.wix-vibe-site.com/",
      image: "/service_company.png",
      buttonText: "View Live Demo"
    },
    {
      id: "w4",
      title: "Portfolio Pulse",
      categoryLabel: "Portfolio Website",
      description: "Professional personal portfolio designed with premium UI, animations, and responsive layouts.",
      link: "https://madhanvishanth11.wixsite.com/portfolio-pulse",
      image: "/portfolio_pulse.png",
      buttonText: "View Live Demo"
    }
  ],
  ads: [
    {
      id: "a1",
      title: "420+ High-Net-Worth Leads",
      categoryLabel: "Lead Generation",
      businessType: "Financial Advisory",
      description: "Meta Ads campaign for financial advisory business.",
      stat: "420+",
      substat: "Qualified Leads",
      buttonText: "View Case Study",
      caseStudy: {
        problem: "Financial advisory firm needed to source ultra-high-net-worth investors but standard demographic targeting was yielding unqualified leads.",
        solution: "Configured custom wealth-indexing lists, targeted competitor investment channels, and engineered an invite-only financial assessment funnel.",
        results: [
          "420+ Qualified HNW Leads in 30 Days",
          "Investable assets exceeded ₹1 Crore average",
          "8% overall lead-to-client conversion rate"
        ]
      }
    },
    {
      id: "a2",
      title: "3.8x ROAS Campaign",
      categoryLabel: "Sales Growth",
      businessType: "E-Commerce Store",
      description: "Optimized Meta Ads campaign that improved return on ad spend.",
      stat: "3.8x",
      substat: "Average ROAS",
      buttonText: "View Case Study",
      caseStudy: {
        problem: "E-commerce retailer was struggling to scale their sales pipeline with high acquisition costs and fluctuating conversion rates.",
        solution: "Implemented automated Meta Advantage+ shopping setups, deployed high-impact motion hook video ads, and optimized checkout flow speeds.",
        results: [
          "3.8x average Return on Ad Spend",
          "45% reduction in CPA (Cost Per Acquisition)",
          "2.4% increase in online store checkout conversion"
        ]
      }
    },
    {
      id: "a3",
      title: "1,200+ Qualified Leads",
      categoryLabel: "Local Business Ads",
      businessType: "Service Business",
      description: "Lead generation campaign for local service business.",
      stat: "1,200+",
      substat: "Qualified Clicks",
      buttonText: "View Case Study",
      caseStudy: {
        problem: "Local plumbing and electric company struggled with seasonal lead generation and high local competition.",
        solution: "Designed hyper-local radius targeting ads on Facebook, created direct click-to-WhatsApp hook assets, and built mobile landing lead forms.",
        results: [
          "1,200+ Qualified Local Leads",
          "60% increase in monthly appointment bookings",
          "32% lower cost-per-lead than previous benchmarks"
        ]
      }
    }
  ],
  ai: [
    {
      id: "ai1",
      title: "Dental Clinic Voice Agent",
      categoryLabel: "AI Voice Agent",
      description: "Handles patient calls instantly, resolves booking inquiries, and dynamically schedules appointments 24/7.",
      buttonText: "View Demo Flow",
      demoFlow: {
        trigger: "Patient calls clinic phone line after hours",
        actions: [
          "AI receptionist answers instantly with a warm, customized greeting",
          "Resolves common FAQs (hours, services, address) using clinic DB",
          "Integrates with local clinic calendar to book patient slot",
          "Dispatches SMS confirmation with booking link"
        ]
      }
    },
    {
      id: "ai2",
      title: "Coaching Center AI Caller",
      categoryLabel: "AI Lead Assistant",
      description: "Automatically answers student course inquiries, qualifies academic leads, and registers students.",
      buttonText: "View Demo Flow",
      demoFlow: {
        trigger: "Student requests info on educational courses online",
        actions: [
          "AI assistant contacts student instantly to identify career goals",
          "Explains syllabus, fee structures, and scheduling options",
          "Qualifies student interest and updates central student CRM",
          "Routes qualified leads to counselor or books direct session"
        ]
      }
    },
    {
      id: "ai3",
      title: "Customer Support Voice Bot",
      categoryLabel: "AI Support Specialist",
      description: "Resolves customer FAQs, checks order tracking statuses, and routes complex calls autonomously.",
      buttonText: "View Demo Flow",
      demoFlow: {
        trigger: "Customer dials helpline regarding tracking or refund",
        actions: [
          "AI agent answers, authenticates order using voice recognition",
          "Checks live shipping status via Shopify and carriers APIs",
          "Autonomously processes returns or resolves shipping FAQs",
          "Transfers high-priority calls to human staff with full notes transcript"
        ]
      }
    }
  ]
};

function PortfolioCard({ project, type, playHover, playClick, onOpenDetails }) {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [5, -5]), { stiffness: 180, damping: 25 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-5, 5]), { stiffness: 180, damping: 25 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    x.set(mouseX / width);
    y.set(mouseY / height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleClick = () => {
    if (type === 'websites') {
      playClick();
      window.open(project.link, '_blank', 'noopener,noreferrer');
    } else {
      onOpenDetails(project);
    }
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      onMouseEnter={playHover}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className="group relative rounded-2xl overflow-hidden bg-white border border-slate-200 hover:border-blue-400/40 transition-all flex flex-col hover:shadow-xl shadow-sm cursor-pointer h-[420px] will-change-transform"
      variants={{
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
      }}
      whileHover={{ y: -6 }}
    >
      {/* CARD HEADER VISUALS */}
      {type === 'websites' && (
        <div className="relative w-full h-[52%] overflow-hidden bg-slate-100">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-750 ease-out group-hover:scale-105"
            loading="lazy"
          />
          
          <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

          {/* DEMO WEBSITE Badge */}
          <div className="absolute top-3 right-3 z-20 px-2.5 py-1 rounded-md bg-blue-600 text-white text-[10px] font-extrabold uppercase tracking-wider shadow-md">
            DEMO WEBSITE
          </div>
        </div>
      )}

      {type === 'ads' && (
        <div className="relative w-full h-[52%] overflow-hidden bg-slate-100 flex items-center justify-center border-b border-slate-200">
          <div className="text-center z-10 flex flex-col items-center">
            <span className="font-sora font-extrabold text-4xl sm:text-5xl text-blue-600 tracking-tight">
              {project.stat}
            </span>
            <span className="font-poppins text-[10px] font-bold uppercase tracking-wider text-slate-700 bg-white px-3 py-1 rounded-full border border-slate-200 mt-3 shadow-sm">
              {project.substat}
            </span>
          </div>
        </div>
      )}

      {type === 'ai' && (
        <div className="relative w-full h-[52%] overflow-hidden bg-slate-100 flex items-center justify-center border-b border-slate-200">
          {/* Audio Wave Visualizer */}
          <div className="flex items-center gap-1.5 z-10">
            {[1, 2, 3, 4, 5, 6, 7].map((bar) => {
              const heights = [24, 48, 32, 64, 40, 52, 28];
              const animationDurations = [1.2, 0.8, 1.4, 0.9, 1.3, 1.1, 1.5];
              return (
                <motion.div
                  key={bar}
                  className="w-1.5 bg-blue-600 rounded-full"
                  style={{ height: heights[bar - 1] }}
                  animate={{
                    scaleY: [1, 1.5, 0.8, 1.3, 1],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: animationDurations[bar - 1],
                    ease: "easeInOut",
                  }}
                />
              );
            })}
          </div>
        </div>
      )}

      {/* CARD CONTENT INFO */}
      <div className="p-5 flex flex-col justify-between flex-grow z-20" style={{ transform: 'translateZ(20px)' }}>
        <div className="text-left">
          <span className="inline-block px-2.5 py-1 rounded-full font-poppins text-[10px] font-bold text-blue-600 bg-blue-50 border border-blue-100 uppercase tracking-widest">
            {project.categoryLabel}
          </span>
          <h3 className="font-sora font-extrabold text-lg text-slate-900 mt-2.5 group-hover:text-blue-600 transition-colors">
            {project.title}
          </h3>
          <p className="font-poppins text-xs text-slate-600 mt-1.5 font-normal leading-relaxed line-clamp-3">
            {project.description}
          </p>
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
          <span className="font-poppins text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center gap-1.5">
            {project.buttonText}
          </span>
          <div className="p-2 rounded-lg bg-slate-100 text-slate-600 group-hover:text-white group-hover:bg-blue-600 transition-all duration-300">
            <ArrowUpRight size={16} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Portfolio() {
  const [filter, setFilter] = useState('websites');
  const [activeProject, setActiveProject] = useState(null);
  const { playClick, playHover } = useAudio();

  const handleFilterClick = (cat) => {
    playClick();
    setFilter(cat);
  };

  const openDetails = (proj) => {
    playClick();
    setActiveProject(proj);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    playClick();
    setActiveProject(null);
    document.body.style.overflow = '';
  };

  const filterTabs = [
    { id: 'websites', label: 'Website Projects' },
    { id: 'ads', label: 'Meta Ads Results' },
    { id: 'ai', label: 'AI Voice Agent Projects' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const getHeaderContent = () => {
    switch (filter) {
      case 'ads':
        return {
          prefix: "Our Meta Ads ",
          highlight: "Results",
          subtitle: "Explore real campaign-style case studies showing lead generation, ROAS growth, and business performance through Meta Ads."
        };
      case 'ai':
        return {
          prefix: "Our AI Voice Agent ",
          highlight: "Projects",
          subtitle: "Explore AI voice agent examples built for call handling, appointment booking, lead qualification, and customer support automation."
        };
      case 'websites':
      default:
        return {
          prefix: "Website Demo ",
          highlight: "Portfolio",
          subtitle: "Explore four demo websites created by ZENCE to showcase our website design, UI/UX, responsiveness, animations, and development capabilities. These are demonstration projects and not completed client websites."
        };
    }
  };

  const headerContent = getHeaderContent();

  return (
    <section id="portfolio" className="relative bg-slate-50 py-24 border-t border-slate-200">
      {/* Background glow decoration */}
      <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 min-h-[180px] sm:min-h-[150px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="flex flex-col items-center text-center"
            >
              {/* Mandatory User Requirement Notice */}
              <div className="max-w-2xl mx-auto p-4 rounded-xl bg-blue-50 border border-blue-200 text-slate-800 font-poppins text-xs leading-relaxed mb-6 shadow-sm">
                <span className="font-bold text-blue-600 block mb-1">PROVEN DESIGN & ENGINEERING CAPABILITIES</span>
                These are demonstration websites created to showcase our design and development capabilities. They are not client projects.
              </div>

              <h2 className="font-sora font-extrabold text-3xl sm:text-5xl text-slate-900 tracking-tight">
                {headerContent.prefix}
                <span className="text-blue-600">{headerContent.highlight}</span>
              </h2>
              <p className="mt-4 font-poppins text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
                {headerContent.subtitle}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleFilterClick(tab.id)}
              onMouseEnter={playHover}
              className={`px-5 py-2.5 rounded-full font-poppins text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                filter === tab.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white border border-slate-200 hover:border-slate-300 text-slate-600 hover:text-slate-900 shadow-sm'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          key={filter}
          className={`grid grid-cols-1 md:grid-cols-2 ${
            filter === 'websites' ? 'xl:grid-cols-4' : 'xl:grid-cols-3'
          } gap-6 sm:gap-8 justify-center`}
        >
          <AnimatePresence mode="popLayout">
            {projects[filter].map((project) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
              >
                <PortfolioCard
                  project={project}
                  type={filter}
                  playHover={playHover}
                  playClick={playClick}
                  onOpenDetails={openDetails}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Case Study Details Modal */}
      <AnimatePresence>
        {activeProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm cursor-pointer"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl z-10 border border-slate-200"
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 border border-slate-200 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>

              {/* Case Study / Demo Flow Content */}
              <div className="p-6 sm:p-10 max-h-[85vh] overflow-y-auto text-left">
                <span className="font-poppins text-xs font-bold text-blue-600 uppercase tracking-widest">
                  {filter === 'ads' ? 'META ADS CASE STUDY' : 'AI VOICE AGENT FLOW'}
                </span>
                <h3 className="font-sora font-extrabold text-2xl sm:text-3xl text-slate-900 mt-1">
                  {activeProject.title}
                </h3>
                <p className="font-poppins text-xs text-slate-500 mt-1 uppercase tracking-wide">
                  {filter === 'ads' ? `Business Type: ${activeProject.businessType}` : `System Type: ${activeProject.categoryLabel}`}
                </p>

                <hr className="border-slate-200 my-6" />

                {filter === 'ads' ? (
                  <div className="grid grid-cols-1 gap-6">
                    {/* Problem & Solution */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-sora font-bold text-slate-900 text-base mb-2 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-rose-500 rounded-full" />
                          The Problem
                        </h4>
                        <p className="font-poppins text-sm text-slate-600 leading-relaxed font-normal">
                          {activeProject.caseStudy.problem}
                        </p>
                      </div>

                      <div>
                        <h4 className="font-sora font-bold text-slate-900 text-base mb-2 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                          Our Solution
                        </h4>
                        <p className="font-poppins text-sm text-slate-600 leading-relaxed font-normal">
                          {activeProject.caseStudy.solution}
                        </p>
                      </div>
                    </div>

                    {/* Results */}
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 mt-4">
                      <h4 className="font-sora font-bold text-blue-600 text-base mb-3 flex items-center gap-2">
                        <TrendingUp size={16} />
                        Measurable Results
                      </h4>
                      <ul className="space-y-3">
                        {activeProject.caseStudy.results.map((r, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-sm font-poppins">
                            <CheckCircle2 size={16} className="text-emerald-600 mt-0.5 shrink-0" />
                            <span className="text-slate-800 font-medium">{r}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div>
                    {/* Trigger Event */}
                    <div className="mb-6">
                      <h4 className="font-sora font-bold text-slate-900 text-base mb-2 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                        Trigger Action
                      </h4>
                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 font-poppins text-sm text-slate-700 leading-relaxed font-normal">
                        {activeProject.demoFlow.trigger}
                      </div>
                    </div>

                    {/* System Response Flow */}
                    <div>
                      <h4 className="font-sora font-bold text-blue-600 text-base mb-3 flex items-center gap-2">
                        <Phone size={16} />
                        Conversational Flow Steps
                      </h4>
                      <div className="space-y-4">
                        {activeProject.demoFlow.actions.map((act, idx) => (
                          <div key={idx} className="flex gap-4 items-start">
                            <div className="w-6 h-6 rounded-full bg-blue-50 border border-blue-200 text-blue-600 font-sora font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                              {idx + 1}
                            </div>
                            <p className="font-poppins text-sm text-slate-700 leading-relaxed font-normal">
                              {act}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-8 flex justify-end">
                  <button
                    onClick={() => {
                      closeModal();
                      setTimeout(() => {
                        const el = document.getElementById('contact');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }, 400);
                    }}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl font-poppins text-sm font-bold tracking-wide shadow-sm hover:shadow-md transition-all cursor-pointer"
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
