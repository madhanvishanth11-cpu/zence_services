import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Menu, X, ArrowRight } from 'lucide-react';
import { useAudio } from '../hooks/useAudio';

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isMuted, toggleMute, playHover, playClick } = useAudio();

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'packages', label: 'Packages' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'why-us', label: 'Why ZENCE' },
    { id: 'process', label: 'Process' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Track active section on scroll
      const sections = navLinks.map(link => document.getElementById(link.id));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navLinks[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id) => {
    playClick();
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContactClick = () => {
    playClick();
    setIsMobileMenuOpen(false);
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 2.8 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'py-3' : 'py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className={`flex items-center justify-between px-6 py-3 rounded-2xl transition-all duration-300 ${
            scrolled ? 'glassmorphism shadow-2xl backdrop-blur-xl' : 'bg-transparent border-b border-transparent'
          }`}>
            {/* Logo */}
            <a
              href="#home"
              onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}
              className="flex items-center gap-2 select-none group"
              onMouseEnter={playHover}
            >
              <span className="font-sora font-extrabold text-2xl md:text-3xl tracking-wider text-white group-hover:text-accent-blue transition-colors">
                ZEN<span className="text-accent-cyan group-hover:text-accent-purple transition-colors">CE</span>
              </span>
              <span className="w-2.5 h-2.5 bg-accent-blue rounded-full group-hover:bg-accent-purple animate-pulse" />
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.id); }}
                  className={`relative font-poppins text-sm font-medium tracking-wide transition-colors py-2 px-1 hover:text-white ${
                    activeSection === link.id ? 'text-white' : 'text-white/60'
                  }`}
                  onMouseEnter={playHover}
                >
                  {link.label}
                  {activeSection === link.id && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent-blue to-accent-cyan rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              ))}
            </div>

            {/* CTA & Controls */}
            <div className="hidden lg:flex items-center gap-4">
              {/* Audio Toggle */}
              <button
                onClick={toggleMute}
                className={`p-2.5 rounded-full border transition-all duration-300 cursor-pointer ${
                  isMuted 
                    ? 'border-white/10 hover:border-white/30 text-white/50 hover:text-white bg-white/5' 
                    : 'border-accent-blue/30 hover:border-accent-blue/60 text-accent-cyan bg-accent-blue/10 glow-blue'
                }`}
                onMouseEnter={playHover}
                title={isMuted ? "Unmute UI Sounds" : "Mute UI Sounds"}
              >
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} className="animate-pulse" />}
              </button>

              <button
                onClick={handleContactClick}
                className="relative overflow-hidden group flex items-center gap-2 bg-gradient-to-r from-accent-blue to-accent-purple text-white px-5 py-2.5 rounded-xl font-poppins text-sm font-semibold tracking-wide hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all cursor-pointer"
                onMouseEnter={playHover}
              >
                <span>Let's Talk</span>
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Mobile Actions (Audio & Menu) */}
            <div className="flex lg:hidden items-center gap-3">
              {/* Audio Toggle for Mobile */}
              <button
                onClick={toggleMute}
                className={`p-2 rounded-full border transition-all ${
                  isMuted 
                    ? 'border-white/10 text-white/50 bg-white/5' 
                    : 'border-accent-blue/30 text-accent-cyan bg-accent-blue/10'
                }`}
                onMouseEnter={playHover}
              >
                {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>

              {/* Hamburger Button */}
              <button
                onClick={() => { playClick(); setIsMobileMenuOpen(!isMobileMenuOpen); }}
                className="p-2 text-white border border-white/10 rounded-full hover:bg-white/5 bg-white/5 cursor-pointer"
                onMouseEnter={playHover}
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-[70px] left-4 right-4 z-40 lg:hidden glassmorphism rounded-2xl shadow-2xl overflow-hidden border border-white/10"
          >
            <div className="flex flex-col gap-1 p-4 bg-[#0a0f19]/90">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.id); }}
                  className={`font-poppins text-base font-semibold tracking-wide py-3 px-4 rounded-xl transition-colors hover:bg-white/5 ${
                    activeSection === link.id ? 'text-accent-cyan bg-accent-cyan/5' : 'text-white/70'
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <hr className="border-white/10 my-2" />
              <button
                onClick={handleContactClick}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-accent-blue to-accent-purple text-white py-3.5 rounded-xl font-poppins text-base font-semibold tracking-wide hover:shadow-lg"
              >
                <span>Let's Talk</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
