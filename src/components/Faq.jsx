import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import { useAudio } from '../hooks/useAudio';

const faqs = [
  {
    question: "What services does ZENCE specialize in?",
    answer: "ZENCE is a full-funnel digital growth agency. We specialize in high-converting Meta Ads campaigns, custom luxury React/Next.js website development, and autonomous conversational AI Voice Agents for customer support and lead qualification."
  },
  {
    question: "How long does a typical website development project take?",
    answer: "Standard premium website projects take between 2 to 4 weeks. This includes the initial strategy discovery, UX/UI wireframe designs, React frontend coding, pixel integration, and launch configurations."
  },
  {
    question: "What exactly is an AI Voice Agent and how does it work?",
    answer: "An AI Voice Agent is a virtual voice assistant powered by Large Language Models (LLMs) and advanced Text-to-Speech engines. It handles outbound calls to qualify leads, answers inbound customer service lines, and instantly schedules calendar bookings by directly reading/writing to your APIs and databases."
  },
  {
    question: "Are ad budgets included in the Meta Ads packages?",
    answer: "No, ad budgets are paid directly to Meta (Facebook/Instagram) by the client. Our package pricing covers our strategy, audience research, creative supervision, technical pixel setups, daily optimizations, and weekly analysis reporting."
  },
  {
    question: "How do we start working with ZENCE?",
    answer: "Simply scroll to our contact section below and fill out the form or click the WhatsApp button. We'll set up a free strategy call to audit your current systems and present a tailored execution blueprint."
  }
];

function AccordionItem({ question, answer, isOpen, toggleOpen, delay }) {
  const { playClick, playHover } = useAudio();

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: delay }}
      className="border-b border-white/5 last:border-0"
    >
      <button
        onClick={() => { playClick(); toggleOpen(); }}
        onMouseEnter={playHover}
        className="w-full flex items-center justify-between py-6 text-left group cursor-pointer"
      >
        <div className="flex items-center gap-3.5 pr-4">
          <HelpCircle size={18} className="text-accent-cyan shrink-0 group-hover:text-accent-purple transition-colors" />
          <span className="font-sora font-semibold text-base sm:text-lg text-white group-hover:text-accent-cyan transition-colors">
            {question}
          </span>
        </div>
        <div className="shrink-0 p-1.5 rounded-full bg-white/5 border border-white/5 text-white/50 group-hover:text-white transition-all">
          {isOpen ? <Minus size={16} /> : <Plus size={16} />}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-6 pl-8 font-poppins text-sm text-white/60 leading-relaxed font-light max-w-3xl">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative bg-[#0B1120] py-24 border-t border-white/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-sora font-extrabold text-3xl sm:text-5xl text-white tracking-tight"
          >
            Frequently Asked <span className="text-gradient-purple-cyan neon-text-purple">Questions</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 font-poppins text-base sm:text-lg text-white/50 font-light"
          >
            Everything you need to know about our systems and collaboration models.
          </motion.p>
        </div>

        {/* Accordion Wrapper */}
        <div className="glassmorphism p-6 sm:p-10 rounded-3xl border border-white/5 shadow-2xl">
          {faqs.map((faq, idx) => (
            <AccordionItem
              key={idx}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === idx}
              toggleOpen={() => handleToggle(idx)}
              delay={idx * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
