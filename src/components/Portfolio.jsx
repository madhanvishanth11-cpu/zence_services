import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight, Globe } from 'lucide-react';
import { useAudio } from '../hooks/useAudio';

const projects = [
  {
    id: 1,
    title: "Digital Growth Agency",
    category: "business",
    categoryLabel: "Business Website",
    description: "Modern digital marketing agency website showcasing Meta Ads, AI automation, and premium website development.",
    link: "https://madhanvishanth11.wixsite.com/digital-growth-speci",
    image: "/digital_growth.png"
  },
  {
    id: 2,
    title: "Portfolio Pulse",
    category: "portfolio",
    categoryLabel: "Portfolio Website",
    description: "Professional personal portfolio designed with premium UI, animations, and responsive layouts.",
    link: "https://madhanvishanth11.wixsite.com/portfolio-pulse",
    image: "/portfolio_pulse.png"
  },
  {
    id: 3,
    title: "ZARO Course Platform",
    category: "landing",
    categoryLabel: "Course Sales Landing Page",
    description: "High-converting landing page designed to sell online courses with modern UI and lead generation.",
    link: "https://madhanvishanth11.wixsite.com/zaro",
    image: "/zaro_course.png"
  },
  {
    id: 4,
    title: "Service Company Website",
    category: "services",
    categoryLabel: "Company Website",
    description: "Professional company website featuring premium services, inquiry forms, and conversion-focused design.",
    link: "https://my-site-20ay355b-madhanvishanth11.wix-vibe-site.com/",
    image: "/service_company.png"
  }
];

function PortfolioCard({ project, playHover, playClick }) {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 180, damping: 25 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 180, damping: 25 });

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
    playClick();
    window.open(project.link, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      onMouseEnter={playHover}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className="group relative rounded-2xl overflow-hidden bg-[#111827]/85 backdrop-blur-xl border border-white/5 hover:border-accent-cyan/30 transition-colors flex flex-col hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] shadow-xl cursor-pointer h-[420px] will-change-transform"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -6 }}
    >
      {/* Visual Image container */}
      <div className="relative w-full h-[52%] overflow-hidden bg-slate-950">
        {/* Glass reflection shine */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out z-10 pointer-events-none" />
        
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-750 ease-out group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Hover overlay with cyan shadow and glow */}
        <div className="absolute inset-0 bg-[#0B1120]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
      </div>

      {/* Info Area */}
      <div className="p-5 flex flex-col justify-between flex-grow z-20" style={{ transform: 'translateZ(30px)' }}>
        <div className="text-left">
          <span className="inline-block px-2.5 py-1 rounded-full font-poppins text-[10px] font-bold text-accent-cyan bg-accent-cyan/10 border border-accent-cyan/20 uppercase tracking-widest">
            {project.categoryLabel}
          </span>
          <h3 className="font-sora font-extrabold text-lg text-white mt-3 group-hover:text-accent-cyan transition-colors">
            {project.title}
          </h3>
          <p className="font-poppins text-xs text-white/50 mt-2 font-light leading-relaxed line-clamp-3">
            {project.description}
          </p>
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
          <span className="font-poppins text-xs font-bold text-white group-hover:text-accent-cyan transition-colors flex items-center gap-1.5">
            View Live Demo
          </span>
          <div className="p-2 rounded-lg bg-white/5 text-white/50 group-hover:text-white group-hover:bg-accent-cyan/10 transition-all duration-300">
            <ArrowUpRight size={16} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Portfolio() {
  const [filter, setFilter] = useState('all');
  const { playClick, playHover } = useAudio();

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter);

  const handleFilterClick = (cat) => {
    playClick();
    setFilter(cat);
  };

  const filterTabs = [
    { id: 'all', label: 'All Websites' },
    { id: 'business', label: 'Business' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'landing', label: 'Landing Page' },
    { id: 'services', label: 'Services' }
  ];

  return (
    <section id="portfolio" className="relative bg-[#0B1120] py-24 border-t border-white/5">
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
            Our Website <span className="text-gradient-blue-cyan neon-text-blue">Portfolio</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 font-poppins text-base sm:text-lg text-white/50 font-light leading-relaxed"
          >
            Explore some of our live website projects. Click any card to open the live demo and experience the quality of our work.
          </motion.p>
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
                  ? 'bg-gradient-to-r from-accent-blue to-accent-cyan text-white shadow-[0_0_15px_rgba(59,130,246,0.35)]'
                  : 'bg-white/5 border border-white/10 hover:border-white/20 text-white/60 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 sm:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
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
                  playHover={playHover}
                  playClick={playClick}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
