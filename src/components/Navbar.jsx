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
    { id: 'why-zence', label: 'Why ZENCE' },
    { id: 'process', label: 'Process' },
    { id: 'feedback', label: 'Feedback' }
  ];

  // Header background state on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // IntersectionObserver for active section highlighting
  useEffect(() => {
    const header = document.querySelector('[data-main-header]');
    const headerHeight = header ? header.getBoundingClientRect().height : 80;
    const sections = navLinks.map((link) => document.getElementById(link.id)).filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: `-${headerHeight + 10}px 0px -60% 0px`,
        threshold: 0.1
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Handle ESC key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  // Shared navigation function for desktop and mobile
  const handleNavigation = (sectionId) => {
    playClick();

    const target = document.getElementById(sectionId);

    if (!target) {
      console.error(`Navigation target not found: ${sectionId}`);
      setIsMobileMenuOpen(false);
      return;
    }

    setIsMobileMenuOpen(false);
    setActiveSection(sectionId);

    requestAnimationFrame(() => {
      const header = document.querySelector('[data-main-header]');
      const headerHeight = header ? header.getBoundingClientRect().height : 80;

      const targetPosition =
        target.getBoundingClientRect().top +
        window.scrollY -
        headerHeight -
        12;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });

      if (window.history && window.history.replaceState) {
        window.history.replaceState(null, '', `#${sectionId}`);
      }
    });
  };

  const handleContactClick = () => {
    playClick();
    setIsMobileMenuOpen(false);
    handleNavigation('contact');
  };

  return (
    <>
      <motion.header
        data-main-header
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
              onClick={(e) => { e.preventDefault(); handleNavigation('home'); }}
              className="flex items-center gap-2 select-none group cursor-pointer"
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
                  onClick={(e) => { e.preventDefault(); handleNavigation(link.id); }}
                  className={`relative font-poppins text-sm font-medium tracking-wide transition-colors py-2 px-1 hover:text-white cursor-pointer ${
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

            {/* Desktop CTA & Controls */}
            <div className="hidden lg:flex items-center gap-4">
              <button
                onClick={() => handleNavigation('feedback')}
                className="relative overflow-hidden group flex items-center gap-2 bg-white/5 border border-white/10 text-white px-5 py-2.5 rounded-xl font-poppins text-sm font-semibold tracking-wide hover:border-accent-cyan/15 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(20,184,166,0.09)] transition-all duration-300 cursor-pointer"
                onMouseEnter={playHover}
              >
                <MessageSquare size={15} className="text-accent-cyan" />
                <span>Feedback</span>
              </button>

              <a
                href="tel:+917904035820"
                className="relative overflow-hidden group flex items-center gap-2 bg-gradient-to-r from-accent-blue to-accent-cyan text-white px-5 py-2.5 rounded-xl font-poppins text-sm font-semibold tracking-wide hover:shadow-[0_0_20px_rgba(124,58,237,0.12)] transition-all cursor-pointer"
                onMouseEnter={playHover}
                onClick={playClick}
              >
                <span>Let's Talk</span>
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Mobile Header Buttons (Feedback & Hamburger Toggle) */}
            <div className="flex lg:hidden items-center gap-3">
              <button
                onClick={() => handleNavigation('feedback')}
                className="flex items-center gap-1.5 bg-white/5 border border-white/10 text-white px-3 py-1.5 rounded-xl font-poppins text-xs font-semibold tracking-wide hover:border-accent-cyan/15 hover:bg-white/10 hover:shadow-[0_0_15px_rgba(20,184,166,0.09)] transition-all cursor-pointer"
                onMouseEnter={playHover}
              >
                <MessageSquare size={13} className="text-accent-cyan" />
                <span>Feedback</span>
              </button>

              <button
                type="button"
                aria-label="Toggle navigation menu"
                onClick={() => { playClick(); setIsMobileMenuOpen(!isMobileMenuOpen); }}
                className="p-2 text-white border border-white/10 rounded-full hover:bg-white/5 bg-white/5 cursor-pointer touch-manipulation relative z-50"
                onMouseEnter={playHover}
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Drawer Navigation System */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop Layer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-[#090B14]/80 backdrop-blur-md z-40 lg:hidden cursor-pointer"
            />

            {/* Mobile Navigation Panel */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.96 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="fixed top-[74px] left-4 right-4 z-50 lg:hidden glassmorphism rounded-2xl shadow-2xl overflow-hidden border border-white/10 mobile-menu-panel pointer-events-auto"
            >
              <nav className="mobile-menu flex flex-col gap-1 p-3 bg-[#0a0f19]/95 pointer-events-auto" aria-label="Mobile navigation">
                {navLinks.map((link) => (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavigation(link.id);
                    }}
                    className={`font-poppins text-base font-semibold tracking-wide w-full flex items-center min-h-[52px] px-4 rounded-xl transition-all pointer-events-auto touch-manipulation cursor-pointer select-none active:scale-[0.98] ${
                      activeSection === link.id
                        ? 'text-accent-cyan bg-accent-cyan/10 border border-accent-cyan/20'
                        : 'text-white/80 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {link.label}
                  </a>
                ))}
                <hr className="border-white/10 my-2" />
                <a
                  href="tel:+917904035820"
                  onClick={playClick}
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-accent-blue to-accent-cyan text-white w-full min-h-[52px] rounded-xl font-poppins text-base font-bold tracking-wide shadow-lg hover:shadow-xl pointer-events-auto touch-manipulation cursor-pointer active:scale-[0.98]"
                >
                  <span>Let's Talk</span>
                  <ArrowRight size={18} />
                </a>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

