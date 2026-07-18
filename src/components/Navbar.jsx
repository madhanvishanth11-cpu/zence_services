import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Menu, X, ArrowRight } from 'lucide-react';
import { useAudio } from '../hooks/useAudio';

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { playHover, playClick } = useAudio();

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

      const scrollPosition = window.scrollY + window.innerHeight / 3;

      // Handle very top of page
      if (window.scrollY < 100) {
        setActiveSection('home');
        return;
      }

      // Handle bottom of page
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50) {
        setActiveSection(navLinks[navLinks.length - 1].id);
        return;
      }

      for (const link of navLinks) {
        const section = document.getElementById(link.id);
        if (section) {
          const top = section.offsetTop;
          const height = section.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(link.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id) => {
    playClick();
    setIsMobileMenuOpen(false);
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContactClick = () => {
    playClick();
    setIsMobileMenuOpen(false);
    window.location.href = "tel:+917904035820";
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'py-3' : 'py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <nav className={`flex items-center justify-between px-3 py-2.5 sm:px-6 sm:py-3 rounded-2xl transition-all duration-300 ${
            scrolled ? 'glassmorphism shadow-2xl backdrop-blur-xl' : 'bg-transparent border-b border-transparent'
          }`}>
            {/* Logo */}
            <a
              href="#home"
              onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}
              className="flex items-center gap-2 select-none group"
              onMouseEnter={playHover}
            >
              <span className="font-sora font-extrabold text-xl sm:text-2xl md:text-3xl tracking-wider text-white group-hover:text-accent-blue transition-colors">
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
              {/* Feedback Button */}
              <button
                onClick={() => handleNavClick('feedback')}
                className="relative overflow-hidden group flex items-center gap-2 bg-white/5 border border-white/10 text-white px-5 py-2.5 rounded-xl font-poppins text-sm font-semibold tracking-wide hover:border-accent-cyan/15 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(20,184,166,0.09)] transition-all duration-300 cursor-pointer"
                onMouseEnter={playHover}
              >
                <MessageSquare size={15} className="text-accent-cyan" />
                <span>Feedback</span>
              </button>

              <button
                onClick={handleContactClick}
                className="relative overflow-hidden group flex items-center gap-2 bg-gradient-to-r from-accent-blue to-accent-cyan text-white px-5 py-2.5 rounded-xl font-poppins text-sm font-semibold tracking-wide hover:shadow-[0_0_20px_rgba(124,58,237,0.12)] transition-all cursor-pointer"
                onMouseEnter={playHover}
              >
                <span>Let's Talk</span>
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Mobile Actions (Feedback & Menu) */}
            <div className="flex lg:hidden items-center gap-3">
              {/* Feedback Button for Mobile */}
              <button
                onClick={() => handleNavClick('feedback')}
                className="flex items-center gap-1.5 bg-white/5 border border-white/10 text-white px-3 py-1.5 rounded-xl font-poppins text-xs font-semibold tracking-wide hover:border-accent-cyan/15 hover:bg-white/10 hover:shadow-[0_0_15px_rgba(20,184,166,0.09)] transition-all cursor-pointer"
                onMouseEnter={playHover}
              >
                <MessageSquare size={13} className="text-accent-cyan" />
                <span>Feedback</span>
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
                    activeSection === link.id ? 'text-accent-cyan bg-accent-cyan/2' : 'text-white/70'
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <hr className="border-white/10 my-2" />
              <button
                onClick={handleContactClick}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-accent-blue to-accent-cyan text-white py-3.5 rounded-xl font-poppins text-base font-semibold tracking-wide hover:shadow-lg"
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
