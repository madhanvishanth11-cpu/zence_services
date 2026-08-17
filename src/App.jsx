import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
import FloatingWhatsApp from './components/FloatingWhatsApp';

function InfiniteMarquee() {
  const tags = [
    "META ADS SPECIALISTS", "BESPOKE WEB DEVELOPMENT", "AI VOICE AGENTS",
    "ROI DRIVEN STRATEGY", "LUXURY UI/UX DESIGN", "AUTOMATED LEAD FUNNELS",
    "CUSTOM PIXEL INTEGRATIONS", "HYPER-TARGETED CAMPAIGNS"
  ];

  return (
    <div className="relative w-full py-8 bg-white border-y border-slate-200 overflow-hidden select-none flex items-center">
      {/* Absolute side overlays for smooth fade out */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

      <div className="flex w-[200%] animate-marquee-flow whitespace-nowrap gap-16 text-slate-500 font-sora font-extrabold text-xl sm:text-2xl tracking-[0.2em] uppercase items-center">
        {/* Double tags array for seamless continuous loop */}
        {tags.concat(tags).map((tag, idx) => (
          <div key={idx} className="flex items-center gap-16 shrink-0">
            <span className="text-slate-700/80 hover:text-slate-900 transition-colors">{tag}</span>
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 antialiased relative selection:bg-blue-600 selection:text-white overflow-x-hidden w-full max-w-full">
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
          <Footer />

          {/* Fixed Floating WhatsApp Button */}
          <FloatingWhatsApp />
        </motion.div>
      )}
    </div>
  );
}
