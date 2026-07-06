import React, { useState } from 'react';
import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhyChooseZence from './components/Stats';
import Services from './components/Services';
import Packages from './components/Packages';
import WhyChooseUs from './components/WhyChooseUs';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import Process from './components/Process';
import Faq from './components/Faq';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';

function InfiniteMarquee() {
  const tags = [
    "META ADS SPECIALISTS", "BESPOKE WEB DEVELOPMENT", "AI VOICE AGENTS",
    "ROI DRIVEN STRATEGY", "LUXURY UI/UX DESIGN", "AUTOMATED LEAD FUNNELS",
    "CUSTOM PIXEL INTEGRATIONS", "HYPER-TARGETED CAMPAIGNS"
  ];

  return (
    <div className="relative w-full py-8 bg-[#05080e] border-y border-white/5 overflow-hidden select-none flex items-center">
      {/* Absolute side overlays for smooth fade out */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#05080e] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#05080e] to-transparent z-10 pointer-events-none" />

      <div className="flex w-[200%] animate-marquee-flow whitespace-nowrap gap-16 text-white/10 font-sora font-extrabold text-xl sm:text-2xl tracking-[0.2em] uppercase items-center">
        {/* Double tags array for seamless continuous loop */}
        {tags.concat(tags).map((tag, idx) => (
          <div key={idx} className="flex items-center gap-16 shrink-0">
            <span>{tag}</span>
            <span className="w-2.5 h-2.5 rounded-full bg-accent-cyan shadow-[0_0_10px_rgba(6,182,212,0.6)]" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  return (
    <div className="bg-[#0B1120] min-h-screen text-white antialiased relative selection:bg-accent-cyan selection:text-black overflow-x-hidden w-full max-w-full">
      {/* Premium custom cursor followers */}
      <CustomCursor />

      {/* GSAP Page Loader Screen */}
      {isLoading && (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      )}

      {/* Main Page Layout Wrapper */}
      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full"
        >
          {/* Header Navbar */}
          <Navbar />

          {/* Sections Stack */}
          <main className="w-full">
            <Hero />
            <WhyChooseZence />
            <InfiniteMarquee />
            <Services />
            <Packages />
            <WhyChooseUs />
            <Portfolio />
            <Process />
            <Testimonials />
            <Faq />
            <Contact />
          </main>

          {/* Brand Footer */}
          <Footer onAdminOpen={() => setIsAdminOpen(true)} />

          {/* Admin Portal Dashboard Modal */}
          <AdminDashboard isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
        </motion.div>
      )}
    </div>
  );
}
