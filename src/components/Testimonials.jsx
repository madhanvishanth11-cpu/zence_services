import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useAudio } from '../hooks/useAudio';

const testimonials = [
  {
    name: "Rajesh Kumar",
    role: "Founder, Titan Wealth",
    quote: "ZENCE completely rebuilt our customer acquisition engine. Our Meta Ads ROAS spiked to 5.2x in the first three weeks. The team is hyper-focused on numbers that actually impact our bottom line.",
    rating: 5,
    avatarGradient: "from-blue-600 to-cyan-500"
  },
  {
    name: "Sophia Sterling",
    role: "VP of Growth, Sterling Luxuries",
    quote: "The web application ZENCE developed for us is a literal masterpiece. It loads instantly and feels incredibly premium. Our online conversions have increased by over 140% since the redesign.",
    rating: 5,
    avatarGradient: "from-purple-600 to-pink-500"
  },
  {
    name: "Vikram Malhotra",
    role: "Managing Director, Nexa Health",
    quote: "Their custom AI Voice Agent has completely resolved our missed patient call issues. It schedules appointments perfectly and seamlessly handles database mapping. Truly a game-changer.",
    rating: 5,
    avatarGradient: "from-teal-600 to-blue-500"
  }
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const { playClick, playHover } = useAudio();
  const timerRef = useRef(null);

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      handleNext();
    }, 6000);
  };

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [index]);

  const handlePrev = () => {
    playClick();
    setDirection(-1);
    setIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    playClick();
    setDirection(1);
    setIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  // Slider animation variants
  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (dir) => ({
      x: dir < 0 ? 100 : -100,
      opacity: 0
    })
  };

  const activeTestimonial = testimonials[index];

  return (
    <section className="relative bg-[#070b13] py-24 border-t border-white/5">
      {/* Background decoration */}
      <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-accent-purple/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Quote symbol mark */}
        <div className="inline-flex justify-center text-accent-purple/20 mb-6">
          <Quote size={64} strokeWidth={1} />
        </div>

        {/* Carousel Container */}
        <div className="relative min-h-[300px] flex items-center justify-center">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={index}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="w-full flex flex-col items-center"
            >
              {/* Quote text */}
              <blockquote className="font-sora font-medium text-lg sm:text-2xl text-white/90 leading-relaxed max-w-2xl">
                "{activeTestimonial.quote}"
              </blockquote>

              {/* Star Rating */}
              <div className="flex items-center gap-1 mt-6 justify-center">
                {[...Array(activeTestimonial.rating)].map((_, i) => (
                  <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Avatar and Name */}
              <div className="mt-8 flex items-center gap-3">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-tr ${activeTestimonial.avatarGradient} flex items-center justify-center font-sora font-extrabold text-white text-base shadow-md`}>
                  {activeTestimonial.name.charAt(0)}
                </div>
                <div className="text-left">
                  <h4 className="font-sora font-bold text-white text-base">
                    {activeTestimonial.name}
                  </h4>
                  <p className="font-poppins text-xs text-white/40 font-medium">
                    {activeTestimonial.role}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-center gap-4 mt-12">
          <button
            onClick={handlePrev}
            onMouseEnter={playHover}
            className="p-3 border border-white/10 rounded-full hover:border-accent-cyan/40 hover:bg-white/5 text-white/60 hover:text-white transition-all cursor-pointer"
            title="Previous Testimonial"
          >
            <ChevronLeft size={18} />
          </button>
          
          {/* Indicator dots */}
          <div className="flex items-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => { playClick(); setDirection(i > index ? 1 : -1); setIndex(i); }}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === i ? 'w-6 bg-accent-cyan' : 'bg-white/20'
                }`}
                title={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            onMouseEnter={playHover}
            className="p-3 border border-white/10 rounded-full hover:border-accent-cyan/40 hover:bg-white/5 text-white/60 hover:text-white transition-all cursor-pointer"
            title="Next Testimonial"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
