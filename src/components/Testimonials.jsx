import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, MessageSquare, X, Upload, CheckCircle2, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAudio } from '../hooks/useAudio';

const defaultReviews = [
  {
    id: 1,
    name: "Rajesh Kumar",
    company: "Titan Wealth",
    service: "Meta Ads",
    rating: 5,
    feedback: "ZENCE completely rebuilt our customer acquisition engine. Our Meta Ads ROAS spiked to 5.2x in the first three weeks. The team is hyper-focused on numbers that actually impact our bottom line.",
    date: "2026-06-12",
    photo: null // Fallback avatar letter
  },
  {
    id: 2,
    name: "Sophia Sterling",
    company: "Sterling Luxuries",
    service: "Website Development",
    rating: 5,
    feedback: "The web application ZENCE developed for us is a literal masterpiece. It loads instantly and feels incredibly premium. Our online conversions have increased by over 140% since the redesign.",
    date: "2026-06-20",
    photo: null
  },
  {
    id: 3,
    name: "Vikram Malhotra",
    company: "Nexa Health",
    service: "AI Voice Agent",
    rating: 5,
    feedback: "Their custom AI Voice Agent has completely resolved our missed patient call issues. It schedules appointments perfectly and seamlessly handles database mapping. Truly a game-changer.",
    date: "2026-06-28",
    photo: null
  }
];

export default function ClientFeedback() {
  const { playClick, playHover } = useAudio();
  const [reviews, setReviews] = useState([]);
  const [slideIndex, setSlideIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form States
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('Meta Ads');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(null);
  const [feedbackMsg, setFeedbackMsg] = useState('');
  const [photoBase64, setPhotoBase64] = useState(null);
  const [fileName, setFileName] = useState('');
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const sliderTimerRef = useRef(null);

  // Load reviews from localStorage + defaults
  useEffect(() => {
    const saved = localStorage.getItem('zence_reviews');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Filter out the test review to remove it completely
        const filtered = parsed.filter(review => {
          const isTarget = 
            review.name.toLowerCase().trim() === 'madhan m' &&
            review.company.toLowerCase().trim() === 'zence';
          return !isTarget;
        });
        setReviews(filtered);
        localStorage.setItem('zence_reviews', JSON.stringify(filtered));
      } catch (e) {
        setReviews(defaultReviews);
      }
    } else {
      setReviews(defaultReviews);
      localStorage.setItem('zence_reviews', JSON.stringify(defaultReviews));
    }
  }, []);

  // Slider Timer controls
  const resetSliderTimer = () => {
    if (sliderTimerRef.current) clearInterval(sliderTimerRef.current);
    sliderTimerRef.current = setInterval(() => {
      handleNext();
    }, 5000);
  };

  useEffect(() => {
    if (reviews.length > 0) {
      resetSliderTimer();
    }
    return () => {
      if (sliderTimerRef.current) clearInterval(sliderTimerRef.current);
    };
  }, [slideIndex, reviews]);

  const handlePrev = () => {
    playClick();
    setDirection(-1);
    setSlideIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    playClick();
    setDirection(1);
    setSlideIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  const openFeedbackModal = () => {
    playClick();
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeFeedbackModal = () => {
    playClick();
    setIsModalOpen(false);
    setIsSubmitted(false);
    document.body.style.overflow = '';
    // Reset Form
    setName('');
    setCompany('');
    setEmail('');
    setPhone('');
    setService('Meta Ads');
    setRating(5);
    setFeedbackMsg('');
    setPhotoBase64(null);
    setFileName('');
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoBase64(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!name || !company || !feedbackMsg) return;

    playClick();

    // Create review object
    const newReview = {
      id: Date.now(),
      name,
      company,
      service,
      rating,
      feedback: feedbackMsg,
      photo: photoBase64,
      date: new Date().toISOString().split('T')[0]
    };

    // Update reviews list and save to localStorage
    const updatedReviews = [newReview, ...reviews];
    setReviews(updatedReviews);
    localStorage.setItem('zence_reviews', JSON.stringify(updatedReviews));

    // Show Success screen and trigger confetti
    setIsSubmitted(true);
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#2563EB', '#06B6D4', '#8B5CF6', '#ffffff']
    });

    // Auto navigate to the newly added review in the slider
    setSlideIndex(0);
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

  const currentReview = reviews[slideIndex];

  return (
    <section id="reviews" className="relative bg-[#0B1120] py-24 border-t border-white/5 overflow-hidden">
      
      {/* Background decorations */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-accent-blue/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-accent-purple/3 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-sora font-extrabold text-3xl sm:text-5xl text-white tracking-tight"
          >
            Client Reviews & <span className="text-gradient-blue-cyan neon-text-blue">Feedback</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 font-poppins text-base sm:text-lg text-white/50 font-light"
          >
            Your experience matters. If you've worked with ZENCE, we'd love to hear your feedback.
          </motion.p>
        </div>

        {/* Layout: Split into two columns on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center max-w-6xl mx-auto">
          
          {/* Left Side: Testimonial Slider */}
          <div className="lg:col-span-8 w-full flex flex-col justify-center">
            
            {/* Slider Box */}
            <div className="relative min-h-[340px] sm:min-h-[300px] flex items-center justify-center glassmorphism p-8 sm:p-10 rounded-[32px] border border-white/5 shadow-2xl relative">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                {currentReview && (
                  <motion.div
                    key={currentReview.id}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="w-full flex flex-col text-left justify-between h-full"
                  >
                    <div>
                      {/* Rating Stars */}
                      <div className="flex items-center gap-1 mb-5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={i < currentReview.rating ? "fill-amber-400 text-amber-400" : "text-white/20"}
                          />
                        ))}
                      </div>

                      {/* Feedback message */}
                      <p className="font-sora font-medium text-base sm:text-xl text-white/90 leading-relaxed max-w-2xl italic">
                        "{currentReview.feedback}"
                      </p>
                    </div>

                    {/* Client info footer */}
                    <div className="mt-8 flex items-center justify-between border-t border-white/5 pt-6">
                      <div className="flex items-center gap-4">
                        {currentReview.photo ? (
                          <img
                            src={currentReview.photo}
                            alt={currentReview.name}
                            className="w-12 h-12 rounded-full object-cover border border-white/10"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#2563EB] to-[#06B6D4] flex items-center justify-center font-sora font-extrabold text-white text-base shadow-md">
                            {currentReview.name.charAt(0)}
                          </div>
                        )}
                        <div>
                          <h4 className="font-sora font-bold text-white text-base flex items-center gap-1.5 leading-none">
                            {currentReview.name}
                          </h4>
                          <p className="font-poppins text-xs text-white/40 mt-1.5 leading-none">
                            {currentReview.company} • <span className="text-accent-cyan font-semibold">{currentReview.service}</span>
                          </p>
                        </div>
                      </div>

                      {/* Verified Badge */}
                      <div className="flex items-center gap-1 bg-accent-blue/10 border border-accent-blue/20 px-3 py-1 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.15)] text-[10px] font-bold text-accent-cyan uppercase tracking-widest">
                        <ShieldCheck size={12} className="text-accent-cyan" />
                        <span>Verified</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Slider Controls */}
            <div className="flex items-center justify-center sm:justify-start gap-4 mt-6 pl-4">
              <button
                onClick={handlePrev}
                onMouseEnter={playHover}
                className="p-3 border border-white/10 rounded-full hover:border-accent-cyan/40 hover:bg-white/5 text-white/60 hover:text-white transition-all cursor-pointer shadow-md"
                title="Previous Review"
              >
                <ChevronLeft size={18} />
              </button>

              {/* Dots */}
              <div className="flex items-center gap-2">
                {reviews.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { playClick(); setDirection(i > slideIndex ? 1 : -1); setSlideIndex(i); }}
                    className={`w-2 h-2 rounded-full transition-all ${
                      slideIndex === i ? 'w-6 bg-accent-cyan' : 'bg-white/20'
                    }`}
                    title={`Slide ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                onMouseEnter={playHover}
                className="p-3 border border-white/10 rounded-full hover:border-accent-cyan/40 hover:bg-white/5 text-white/60 hover:text-white transition-all cursor-pointer shadow-md"
                title="Next Review"
              >
                <ChevronRight size={18} />
              </button>
            </div>

          </div>

          {/* Right Side: CTA Button */}
          <div className="lg:col-span-4 w-full flex flex-col items-center justify-center text-center lg:text-left lg:items-start lg:pl-8">
            <h3 className="font-sora font-extrabold text-2xl text-white tracking-wide">
              Share Your Story
            </h3>
            <p className="font-poppins text-sm text-white/50 mt-3 font-light leading-relaxed mb-8">
              We value collaborative partnerships and are constantly improving. Tell us how we helped you scale.
            </p>

            {/* Share Feedback Button with hover glow */}
            <motion.button
              onClick={openFeedbackModal}
              onMouseEnter={playHover}
              whileHover={{ scale: 1.02 }}
              className="flex items-center justify-center gap-2.5 px-8 py-4.5 rounded-2xl bg-gradient-to-r from-accent-blue to-accent-cyan text-white font-poppins font-bold tracking-wide transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] cursor-pointer"
            >
              <MessageSquare size={18} />
              <span>Share Your Feedback</span>
            </motion.button>
          </div>

        </div>

      </div>

      {/* Share Feedback Modal (Popup Modal) */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-9999 flex items-center justify-center px-4">
            
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeFeedbackModal}
              className="absolute inset-0 bg-[#0B1120]/85 backdrop-blur-md cursor-pointer"
            />

            {/* Popup Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-lg glassmorphism rounded-[28px] overflow-hidden shadow-2xl z-10 border border-white/10"
            >
              
              {/* Close Button */}
              <button
                onClick={closeFeedbackModal}
                className="absolute top-5 right-5 p-2 rounded-full bg-white/5 border border-white/10 hover:border-white/20 text-white/60 hover:text-white transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>

              <div className="p-6 sm:p-8 max-h-[85vh] overflow-y-auto">
                <AnimatePresence mode="wait">
                  
                  {!isSubmitted ? (
                    /* Submission Form */
                    <motion.div
                      key="feedback-form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <span className="font-poppins text-xs font-bold text-accent-cyan uppercase tracking-widest">
                        FEEDBACK
                      </span>
                      <h3 className="font-sora font-extrabold text-2xl text-white mt-1 mb-6">
                        Share Your Experience
                      </h3>

                      <form onSubmit={handleFormSubmit} className="space-y-4">
                        {/* Name and Company */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="flex flex-col text-left">
                            <label className="font-poppins text-xs font-semibold text-white/50 mb-1.5 uppercase tracking-wide">
                              Full Name *
                            </label>
                            <input
                              type="text"
                              required
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              placeholder="John Doe"
                              className="w-full bg-white/5 border border-white/5 rounded-xl py-3 px-4 text-white text-sm font-poppins placeholder-white/20 focus:outline-none focus:border-accent-cyan/40 transition-colors"
                            />
                          </div>
                          <div className="flex flex-col text-left">
                            <label className="font-poppins text-xs font-semibold text-white/50 mb-1.5 uppercase tracking-wide">
                              Company Name *
                            </label>
                            <input
                              type="text"
                              required
                              value={company}
                              onChange={(e) => setCompany(e.target.value)}
                              placeholder="Acme Corp"
                              className="w-full bg-white/5 border border-white/5 rounded-xl py-3 px-4 text-white text-sm font-poppins placeholder-white/20 focus:outline-none focus:border-accent-cyan/40 transition-colors"
                            />
                          </div>
                        </div>

                        {/* Email and Phone */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="flex flex-col text-left">
                            <label className="font-poppins text-xs font-semibold text-white/50 mb-1.5 uppercase tracking-wide">
                              Email Address (Optional)
                            </label>
                            <input
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="john@example.com"
                              className="w-full bg-white/5 border border-white/5 rounded-xl py-3 px-4 text-white text-sm font-poppins placeholder-white/20 focus:outline-none focus:border-accent-cyan/40 transition-colors"
                            />
                          </div>
                          <div className="flex flex-col text-left">
                            <label className="font-poppins text-xs font-semibold text-white/50 mb-1.5 uppercase tracking-wide">
                              Phone Number (Optional)
                            </label>
                            <input
                              type="tel"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              placeholder="+91 99999 88888"
                              className="w-full bg-white/5 border border-white/5 rounded-xl py-3 px-4 text-white text-sm font-poppins placeholder-white/20 focus:outline-none focus:border-accent-cyan/40 transition-colors"
                            />
                          </div>
                        </div>

                        {/* Service Used Dropdown */}
                        <div className="flex flex-col text-left">
                          <label className="font-poppins text-xs font-semibold text-white/50 mb-1.5 uppercase tracking-wide">
                            Service Used
                          </label>
                          <select
                            value={service}
                            onChange={(e) => setService(e.target.value)}
                            className="w-full bg-[#111827] border border-white/5 rounded-xl py-3 px-4 text-white text-sm font-poppins focus:outline-none focus:border-accent-cyan/40 transition-colors cursor-pointer"
                          >
                            <option value="Meta Ads">Meta Ads</option>
                            <option value="Website Development">Website Development</option>
                            <option value="AI Voice Agent">AI Voice Agent</option>
                          </select>
                        </div>

                        {/* Interactive 5-Star Rating */}
                        <div className="flex flex-col text-left">
                          <label className="font-poppins text-xs font-semibold text-white/50 mb-1.5 uppercase tracking-wide">
                            Overall Rating
                          </label>
                          <div className="flex items-center gap-1.5 py-1">
                            {[...Array(5)].map((_, idx) => {
                              const ratingVal = idx + 1;
                              return (
                                <button
                                  type="button"
                                  key={idx}
                                  onClick={() => { playClick(); setRating(ratingVal); }}
                                  onMouseEnter={() => setHoverRating(ratingVal)}
                                  onMouseLeave={() => setHoverRating(null)}
                                  className="text-2xl transition-transform hover:scale-120 duration-150 cursor-pointer focus:outline-none"
                                >
                                  <Star
                                    className={`w-6 h-6 ${
                                      ratingVal <= (hoverRating || rating)
                                        ? "fill-amber-400 text-amber-400"
                                        : "text-white/20"
                                    }`}
                                  />
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Feedback Message */}
                        <div className="flex flex-col text-left">
                          <label className="font-poppins text-xs font-semibold text-white/50 mb-1.5 uppercase tracking-wide">
                            Feedback Message *
                          </label>
                          <textarea
                            required
                            rows={3}
                            value={feedbackMsg}
                            onChange={(e) => setFeedbackMsg(e.target.value)}
                            placeholder="Tell us about your experience working with ZENCE..."
                            className="w-full bg-white/5 border border-white/5 rounded-xl py-3 px-4 text-white text-sm font-poppins placeholder-white/20 focus:outline-none focus:border-accent-cyan/40 transition-colors resize-none"
                          />
                        </div>

                        {/* Upload Profile Photo */}
                        <div className="flex flex-col text-left">
                          <label className="font-poppins text-xs font-semibold text-white/50 mb-1.5 uppercase tracking-wide">
                            Upload Profile Photo (Optional)
                          </label>
                          <label className="w-full bg-white/5 border border-dashed border-white/10 hover:border-accent-cyan/30 rounded-xl p-4 flex items-center justify-center gap-3 transition-colors cursor-pointer text-white/40 hover:text-white">
                            <Upload size={16} />
                            <span className="font-poppins text-xs font-semibold">
                              {fileName || "Choose file..."}
                            </span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handlePhotoUpload}
                              className="hidden"
                            />
                          </label>
                        </div>

                        {/* Submit Button */}
                        <button
                          type="submit"
                          className="w-full mt-6 py-4 px-6 rounded-xl bg-gradient-to-r from-accent-blue to-accent-cyan text-white font-poppins text-sm font-bold tracking-wide transition-all shadow-[0_0_15px_rgba(37,99,235,0.25)] hover:shadow-[0_0_25px_rgba(37,99,235,0.45)] cursor-pointer"
                        >
                          Submit Feedback
                        </button>

                      </form>
                    </motion.div>
                  ) : (
                    /* Success Animation & Message */
                    <motion.div
                      key="feedback-success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="text-center py-10 flex flex-col items-center"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: [0, 1.2, 1] }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="w-16 h-16 rounded-full bg-accent-cyan/10 border-2 border-accent-cyan flex items-center justify-center mb-6 text-accent-cyan shadow-[0_0_20px_rgba(6,182,212,0.3)] animate-pulse"
                      >
                        <CheckCircle2 size={32} />
                      </motion.div>

                      <h3 className="font-sora font-extrabold text-2xl text-white tracking-wide">
                        🎉 Thank you for your valuable feedback!
                      </h3>
                      
                      <p className="font-poppins text-sm text-white/60 mt-4 leading-relaxed max-w-sm">
                        Your review has been submitted successfully and will show up in the slider instantly.
                      </p>

                      <button
                        onClick={closeFeedbackModal}
                        className="mt-8 py-3 px-8 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 text-white font-poppins text-sm font-bold tracking-wide transition-all cursor-pointer"
                      >
                        Close Window
                      </button>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
