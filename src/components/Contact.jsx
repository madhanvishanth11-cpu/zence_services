import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, Send, MessageSquare, CheckCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAudio } from '../hooks/useAudio';

const InstagramIcon = ({ size = 16, className = "" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const LinkedinIcon = ({ size = 16, className = "" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const FacebookIcon = ({ size = 16, className = "" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

export default function Contact() {
  const { playClick, playHover } = useAudio();
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'website',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleServiceSelect = (val) => {
    playClick();
    setFormState({ ...formState, service: val });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all required fields are not empty after trimming
    const trimmedName = formState.name.trim();
    const trimmedEmail = formState.email.trim();
    const trimmedPhone = formState.phone.trim();
    const trimmedMessage = formState.message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedPhone || !trimmedMessage) {
      setSubmitError('Please fill in all required fields.');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setSubmitError('Please enter a valid email address.');
      return;
    }

    // Prevent duplicate submissions
    if (isSubmitting) return;

    playClick();
    setIsSubmitting(true);
    setSubmitError('');

    const serviceLabel = formState.service === 'ads' ? 'Meta Ads' : formState.service === 'website' ? 'Web Development' : 'AI Voice Agent';

    const MAKE_WEBHOOK_URL = 'https://hook.us2.make.com/fxokpggy2lnyy1q7jkgkeexek4nwx3g5';

    const payload = {
      date: new Date().toISOString(),
      fullName: trimmedName,
      businessEmail: trimmedEmail,
      businessPhone: trimmedPhone,
      coreService: serviceLabel,
      projectScope: trimmedMessage
    };

    console.log('Sending webhook payload:', payload);

    try {
      const response = await fetch(MAKE_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const responseText = await response.text();

      console.log('Make webhook status:', response.status);
      console.log('Make webhook response:', responseText);

      if (!response.ok) {
        throw new Error(`Webhook failed with status ${response.status}: ${responseText}`);
      }

      setIsSubmitted(true);
      setFormState({ name: '', email: '', phone: '', service: 'website', message: '' });

      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#3b82f6', '#8b5cf6', '#06b6d4', '#ffffff']
      });

    } catch (err) {
      console.error('Make webhook submission error:', err);
      setSubmitError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    playClick();
    setFormState({ name: '', email: '', phone: '', service: 'website', message: '' });
    setIsSubmitted(false);
    setSubmitError('');
  };

  const socialLinks = [
    { icon: InstagramIcon, url: "https://www.instagram.com/zence.service?igsh=MWZpOXoxcGtld3diNg==", label: "Instagram" },
    { icon: LinkedinIcon, url: "https://linkedin.com/company/zence", label: "LinkedIn" },
    { icon: FacebookIcon, url: "https://www.facebook.com/profile.php?id=100077480087016", label: "Facebook" }
  ];

  return (
    <section id="contact" className="relative bg-[#0B1120] py-24 border-t border-white/5">
      {/* Background glowing decorations */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-accent-blue/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-accent-purple/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-start">
          
          {/* Left Side: Contact Information (order-1 on mobile, lg:col-span-5 on desktop) */}
          <div className="order-1 lg:col-span-5 flex flex-col justify-center lg:self-center text-left">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-sora font-extrabold text-3xl sm:text-5xl text-white tracking-tight"
            >
              Let's Build <span className="text-gradient-blue-cyan neon-text-blue">Something Great</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-4 font-poppins text-base text-white/50 font-light leading-relaxed max-w-md"
            >
              Ready to scale your business? Fill out the inquiry form or reach out directly to set up a free consultation.
            </motion.p>

            {/* Desktop-only Direct Contact Links */}
            <div className="hidden lg:block mt-8 space-y-6">
              {/* Email */}
              <motion.a
                href="mailto:zenceservice@gmail.com"
                className="flex items-center gap-4 group cursor-pointer"
                onMouseEnter={playHover}
              >
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 text-accent-cyan group-hover:text-white group-hover:bg-accent-cyan/10 group-hover:border-accent-cyan/20 transition-all duration-300">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="font-poppins text-[10px] font-bold text-white/30 uppercase tracking-widest">Email Us</p>
                  <p className="font-sora font-semibold text-white group-hover:text-accent-cyan transition-colors">zenceservice@gmail.com</p>
                </div>
              </motion.a>

              {/* Phone */}
              <motion.a
                href="tel:+917904035820"
                className="flex items-center gap-4 group cursor-pointer"
                onMouseEnter={playHover}
              >
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 text-accent-purple group-hover:text-white group-hover:bg-accent-purple/10 group-hover:border-accent-purple/20 transition-all duration-300">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="font-poppins text-[10px] font-bold text-white/30 uppercase tracking-widest">Call Us</p>
                  <p className="font-sora font-semibold text-white group-hover:text-accent-purple transition-colors">+91 7904035820</p>
                </div>
              </motion.a>

              {/* Socials Media Grid */}
              <div className="pt-6 border-t border-white/5">
                <p className="font-poppins text-[10px] font-bold text-white/30 uppercase tracking-widest mb-4">Connect Socially</p>
                <div className="flex items-center gap-3">
                  {socialLinks.map((social, idx) => {
                    const SocialIcon = social.icon;
                    return (
                      <a
                        key={idx}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-xl bg-white/5 border border-white/5 text-white/50 hover:text-white hover:bg-white/10 hover:border-accent-blue/20 hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] hover:-translate-y-1 hover:scale-105 transition-all duration-300 cursor-pointer"
                        title={social.label}
                        onMouseEnter={playHover}
                      >
                        <SocialIcon size={16} />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Interactive Inquiry Form (order-2 on mobile, lg:col-span-7 on desktop) */}
          <div className="order-2 lg:col-span-7 w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glassmorphism p-8 sm:p-10 rounded-3xl border border-white/5 shadow-2xl relative"
            >
              {/* WhatsApp direct floating option inside the form header */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                <span className="font-sora font-bold text-lg text-white">Inquiry Form</span>
                <a
                  href="https://wa.me/917904035820?text=Hi%20ZENCE%2C%20I%20want%20to%20know%20about%20your%20services."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white px-4 py-2 rounded-xl font-poppins text-xs font-bold uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(37,211,102,0.3)] hover:shadow-[0_0_20px_rgba(37,211,102,0.5)] cursor-pointer"
                  onMouseEnter={playHover}
                  onClick={playClick}
                >
                  <MessageSquare size={14} className="fill-white" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>

              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form
                    key="contact-form"
                    onSubmit={handleSubmit}
                    className="space-y-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {/* Full Name */}
                    <div className="flex flex-col text-left">
                      <label className="font-poppins text-xs font-semibold text-white/50 uppercase tracking-widest mb-2 ml-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formState.name}
                        onChange={handleChange}
                        className="bg-white/5 border border-white/5 focus:border-accent-cyan/40 rounded-xl px-5 py-4 text-white font-poppins text-sm outline-none transition-all focus:bg-white/10"
                        placeholder="John Doe"
                      />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col text-left">
                      <label className="font-poppins text-xs font-semibold text-white/50 uppercase tracking-widest mb-2 ml-1">
                        Business Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formState.email}
                        onChange={handleChange}
                        className="bg-white/5 border border-white/5 focus:border-accent-cyan/40 rounded-xl px-5 py-4 text-white font-poppins text-sm outline-none transition-all focus:bg-white/10"
                        placeholder="john@company.com"
                      />
                    </div>

                    {/* Phone */}
                    <div className="flex flex-col text-left">
                      <label className="font-poppins text-xs font-semibold text-white/50 uppercase tracking-widest mb-2 ml-1">
                        Business Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formState.phone}
                        onChange={handleChange}
                        className="bg-white/5 border border-white/5 focus:border-accent-cyan/40 rounded-xl px-5 py-4 text-white font-poppins text-sm outline-none transition-all focus:bg-white/10"
                        placeholder="+91 98765 43210"
                      />
                    </div>

                    {/* Service buttons */}
                    <div className="flex flex-col text-left">
                      <label className="font-poppins text-xs font-semibold text-white/50 uppercase tracking-widest mb-3 ml-1">
                        Select Core Service Needed
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {[
                          { id: 'ads', label: 'Meta Ads' },
                          { id: 'website', label: 'Web Development' },
                          { id: 'ai', label: 'AI Voice Agent' }
                        ].map((srv) => (
                          <button
                            key={srv.id}
                            type="button"
                            onClick={() => handleServiceSelect(srv.id)}
                            className={`py-3.5 px-4 rounded-xl font-poppins text-xs font-bold uppercase tracking-wider transition-all border cursor-pointer ${
                              formState.service === srv.id
                                ? 'bg-gradient-to-r from-accent-blue to-accent-cyan border-transparent text-white shadow-md'
                                : 'bg-white/5 border-white/5 text-white/50 hover:border-white/10 hover:text-white'
                            }`}
                          >
                            {srv.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Message */}
                    <div className="flex flex-col text-left">
                      <label className="font-poppins text-xs font-semibold text-white/50 uppercase tracking-widest mb-2 ml-1">
                        Brief Project Scope
                      </label>
                      <textarea
                        name="message"
                        required
                        rows="4"
                        value={formState.message}
                        onChange={handleChange}
                        className="bg-white/5 border border-white/5 focus:border-accent-cyan/40 rounded-xl px-5 py-4 text-white font-poppins text-sm outline-none transition-all focus:bg-white/10 resize-none"
                        placeholder="Describe what you would like to build..."
                      />
                    </div>

                    {submitError && (
                      <div className="rounded-xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-left text-xs font-medium text-rose-300">
                        {submitError}
                      </div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-accent-blue to-accent-purple text-white py-4 rounded-xl font-poppins font-bold tracking-wide hover:shadow-[0_0_25px_rgba(139,92,246,0.35)] transition-all disabled:opacity-50 cursor-pointer"
                      onMouseEnter={playHover}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send size={16} />
                          <span>Submit Request</span>
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success-form"
                    className="flex flex-col items-center justify-center text-center py-10"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="p-4 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20 mb-6 animate-bounce">
                      <CheckCircle size={40} />
                    </div>
                    
                    <h4 className="font-sora font-extrabold text-2xl text-white">
                      Submitted!
                    </h4>
                    
                    <p className="mt-3 font-poppins text-sm text-white/50 leading-relaxed font-light max-w-md">
                      Thank you! Your details have been submitted successfully.
                    </p>

                    <button
                      onClick={resetForm}
                      className="mt-8 border border-white/10 hover:border-white/20 bg-white/5 text-white/70 hover:text-white px-6 py-2.5 rounded-xl font-poppins text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                      onMouseEnter={playHover}
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Mobile-only Direct Contact Links (order-3 on mobile, hidden on desktop) */}
          <div className="lg:hidden order-3 flex flex-col items-center gap-6 mt-8 w-full">
            {/* Email */}
            <motion.a
              href="mailto:zenceservice@gmail.com"
              className="flex items-center gap-4 group cursor-pointer text-left w-fit"
              onMouseEnter={playHover}
            >
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 text-accent-cyan group-hover:text-white group-hover:bg-accent-cyan/10 group-hover:border-accent-cyan/20 transition-all duration-300">
                <Mail size={18} />
              </div>
              <div>
                <p className="font-poppins text-[10px] font-bold text-white/30 uppercase tracking-widest">Email Us</p>
                <p className="font-sora font-semibold text-white group-hover:text-accent-cyan transition-colors">zenceservice@gmail.com</p>
              </div>
            </motion.a>

            {/* Phone */}
            <motion.a
              href="tel:+917904035820"
              className="flex items-center gap-4 group cursor-pointer text-left w-fit"
              onMouseEnter={playHover}
            >
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 text-accent-purple group-hover:text-white group-hover:bg-accent-purple/10 group-hover:border-accent-purple/20 transition-all duration-300">
                <Phone size={18} />
              </div>
              <div>
                <p className="font-poppins text-[10px] font-bold text-white/30 uppercase tracking-widest">Call Us</p>
                <p className="font-sora font-semibold text-white group-hover:text-accent-purple transition-colors">+91 7904035820</p>
              </div>
            </motion.a>

            {/* Socials Media Grid */}
            <div className="pt-6 border-t border-white/5 w-4/5 max-w-[280px] flex flex-col items-center">
              <p className="font-poppins text-[10px] font-bold text-white/30 uppercase tracking-widest mb-4">Connect Socially</p>
              <div className="flex items-center gap-3">
                {socialLinks.map((social, idx) => {
                  const SocialIcon = social.icon;
                  return (
                    <a
                      key={idx}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl bg-white/5 border border-white/5 text-white/50 hover:text-white hover:bg-white/10 hover:border-accent-blue/20 hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] hover:-translate-y-1 hover:scale-105 transition-all duration-300 cursor-pointer"
                      title={social.label}
                      onMouseEnter={playHover}
                    >
                      <SocialIcon size={16} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
