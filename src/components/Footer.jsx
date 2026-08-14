import React, { useState } from 'react';
import { Mail, Sparkles } from 'lucide-react';
import { useAudio } from '../hooks/useAudio';

export default function Footer() {
  const { playClick, playHover } = useAudio();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    playClick();
    setSubscribed(true);
    setEmail('');
  };

  const handleLinkClick = (id) => {
    playClick();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-white border-t border-slate-200 py-16 relative overflow-hidden">
      {/* Background glow decoration */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Brand info */}
        <div className="md:col-span-5 flex flex-col items-start text-left">
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); handleLinkClick('home'); }}
            className="flex items-center gap-2 select-none group cursor-pointer"
            onMouseEnter={playHover}
          >
            <span className="font-sora font-extrabold text-2xl tracking-wider text-slate-900">
              ZEN<span className="text-blue-600">CE</span>
            </span>
            <span className="w-2 h-2 bg-blue-600 rounded-full" />
          </a>
          <p className="mt-4 font-poppins text-sm text-slate-600 font-normal leading-relaxed max-w-sm">
            ZENCE is a premium digital agency engineering high-converting Meta Ads, bespoke custom-coded React applications, and natural conversational AI Voice Systems for global luxury brands.
          </p>
        </div>

        {/* Center Column: Navigation Links */}
        <div className="md:col-span-3 flex flex-col items-start text-left">
          <h4 className="font-sora font-bold text-xs uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-1.5">
            <Sparkles size={12} className="text-blue-600" />
            Quick Navigation
          </h4>
          <ul className="space-y-3">
            {[
              { id: 'services', label: 'Our Services' },
              { id: 'packages', label: 'Premium Packages' },
              { id: 'why-us', label: 'Why ZENCE' },
              { id: 'portfolio', label: 'Project Portfolio' },
              { id: 'process', label: 'Strategic Process' }
            ].map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={(e) => { e.preventDefault(); handleLinkClick(link.id); }}
                  className="font-poppins text-sm text-slate-600 hover:text-slate-900 font-medium transition-colors cursor-pointer"
                  onMouseEnter={playHover}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Column: Newsletter Subscription */}
        <div className="md:col-span-4 flex flex-col items-start text-left">
          <h4 className="font-sora font-bold text-xs uppercase tracking-widest text-slate-400 mb-4">
            Agency Blueprint News
          </h4>
          <p className="font-poppins text-xs text-slate-600 font-normal leading-relaxed mb-4 max-w-xs">
            Subscribe to receive our latest insights on Meta ad hooks, web speed audits, and AI workflows.
          </p>

          {!subscribed ? (
            <form onSubmit={handleSubscribe} className="flex w-full gap-2 bg-slate-50 p-1.5 rounded-xl border border-slate-300 focus-within:border-blue-600 transition-all">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent px-3 py-2 text-slate-900 font-poppins text-xs outline-none flex-grow placeholder:text-slate-400"
                placeholder="enter your email..."
              />
              <button
                type="submit"
                onMouseEnter={playHover}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-lg cursor-pointer shadow-sm"
              >
                Join
              </button>
            </form>
          ) : (
            <div className="text-blue-600 font-poppins text-xs font-semibold flex items-center gap-1.5 py-2.5">
              <Mail size={14} />
              <span>Subscribed! Check your inbox soon.</span>
            </div>
          )}
        </div>

      </div>

      {/* Footer Bottom copyright */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-slate-200 relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="font-poppins text-xs text-slate-500 font-normal">
          © 2026 ZENCE. All rights reserved. Made in Tamil Nadu, IN.
        </span>
        <div className="flex items-center gap-6">
          <a href="#" className="font-poppins text-xs text-slate-500 hover:text-slate-900 transition-colors">Privacy Policy</a>
          <a href="#" className="font-poppins text-xs text-slate-500 hover:text-slate-900 transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
