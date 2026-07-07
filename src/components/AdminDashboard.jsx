import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Search, Shield, Download, RefreshCw, Lock, User, LogOut, Check } from 'lucide-react';
import { useAudio } from '../hooks/useAudio';
import { supabase } from '../utils/supabase';

export default function AdminDashboard({ isOpen, onClose }) {
  const { playClick, playHover } = useAudio();
  const [inquiries, setInquiries] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Loading and Error states
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Authentication states
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');

  // Load inquiries from Supabase
  const loadInquiries = () => {
    if (!supabase.isEnabled()) {
      setErrorMsg("Supabase credentials not configured in the .env file. Please check settings.");
      return;
    }
    setIsLoading(true);
    setErrorMsg('');
    supabase.getInquiries()
      .then((data) => {
        setInquiries(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load inquiries from Supabase:", err);
        setErrorMsg("Failed to load inquiries from Supabase database. Please check your network or .env settings.");
        setIsLoading(false);
      });
  };

  // Synchronize dynamic updates instantly
  useEffect(() => {
    if (isOpen && isLoggedIn) {
      loadInquiries();
    }
    
    const handleInstantUpdate = () => {
      if (isLoggedIn) loadInquiries();
    };

    window.addEventListener('inquiry_submitted', handleInstantUpdate);
    return () => {
      window.removeEventListener('inquiry_submitted', handleInstantUpdate);
    };
  }, [isOpen, isLoggedIn]);

  // Handle Login submission
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (usernameInput === 'admin' && passwordInput === 'Zence@2026') {
      playClick();
      setIsLoggedIn(true);
      setLoginError('');
    } else {
      playClick();
      setLoginError("Incorrect username or password.");
    }
  };

  // Handle Logout
  const handleLogout = () => {
    playClick();
    setIsLoggedIn(false);
    setPasswordInput('');
    setUsernameInput('');
    setLoginError('');
  };

  const handleStatusChange = (id, newStatus) => {
    playClick();
    // Optimistically update local UI state
    const updated = inquiries.map(item => {
      if (item.id === id) {
        return { ...item, status: newStatus };
      }
      return item;
    });
    setInquiries(updated);

    // Sync status back to Supabase
    supabase.updateStatus(id, newStatus).catch(err => {
      console.error("Failed to update status in Supabase:", err);
      setErrorMsg("Failed to update status. Synced database version restored.");
      loadInquiries();
    });
  };

  const handleDelete = (id) => {
    playClick();
    if (window.confirm("Are you sure you want to delete this inquiry?")) {
      // Optimistically remove locally
      const updated = inquiries.filter(item => item.id !== id);
      setInquiries(updated);

      // Sync deletion back to Supabase
      supabase.deleteInquiry(id).catch(err => {
        console.error("Failed to delete inquiry in Supabase:", err);
        setErrorMsg("Failed to delete entry. Synced database version restored.");
        loadInquiries();
      });
    }
  };

  const handleClearAll = async () => {
    playClick();
    if (window.confirm("WARNING: This will permanently delete ALL inquiries from Supabase. Are you sure?")) {
      const originalInquiries = [...inquiries];
      setInquiries([]);
      setIsLoading(true);
      try {
        for (const item of originalInquiries) {
          await supabase.deleteInquiry(item.id);
        }
        setIsLoading(false);
      } catch (err) {
        console.error("Failed to clear inquiries in Supabase:", err);
        setErrorMsg("Failed to delete all items. Synced database version restored.");
        loadInquiries();
      }
    }
  };

  const handleExportCSV = () => {
    playClick();
    if (inquiries.length === 0) return;
    
    const headers = ["Name", "Email", "Phone", "Service", "Project Scope", "Date", "Status"];
    const rows = inquiries.map(item => [
      `"${(item.full_name || '').replace(/"/g, '""')}"`,
      `"${(item.email || '').replace(/"/g, '""')}"`,
      `"${(item.phone || '').replace(/"/g, '""')}"`,
      `"${(item.selected_service || '').replace(/"/g, '""')}"`,
      `"${(item.project_scope || '').replace(/"/g, '""')}"`,
      `"${new Date(item.created_at || Date.now()).toLocaleString().replace(/"/g, '""')}"`,
      `"${(item.status || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `zence_inquiries_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredInquiries = inquiries.filter(item => {
    const name = item.full_name || '';
    const email = item.email || '';
    const scope = item.project_scope || '';
    const phone = item.phone || '';

    const matchesSearch = 
      name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scope.toLowerCase().includes(searchQuery.toLowerCase()) ||
      phone.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesStatus = 
      statusFilter === 'all' || 
      item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center p-4">
      {/* Backdrop overlay */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-[#0B1120]/90 backdrop-blur-md cursor-pointer"
      />

      <AnimatePresence mode="wait">
        {/* LOGIN SCREEN */}
        {!isLoggedIn && (
          <motion.div
            key="login-screen"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-full max-w-md glassmorphism border border-white/10 rounded-3xl p-8 shadow-2xl z-10 text-center flex flex-col items-center"
          >
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-1.5 rounded-full hover:bg-white/5 text-white/50 hover:text-white transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>

            <div className="p-3 bg-accent-blue/10 border border-accent-blue/20 rounded-2xl text-accent-cyan mb-5">
              <Shield size={28} />
            </div>

            <h3 className="font-sora font-extrabold text-xl text-white">Admin Authentication</h3>
            <p className="font-poppins text-xs text-white/40 mt-1 max-w-[280px]">
              Access restricted to ZENCE team architects.
            </p>

            <form onSubmit={handleLoginSubmit} className="w-full mt-6 space-y-4 text-left">
              <div className="flex flex-col gap-1.5 relative">
                <label className="font-poppins text-[10px] font-bold text-white/50 uppercase tracking-widest ml-1">Username</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/30" size={14} />
                  <input
                    type="text"
                    required
                    placeholder="admin"
                    value={usernameInput}
                    onChange={(e) => setUsernameInput(e.target.value)}
                    className="w-full bg-white/5 border border-white/5 focus:border-accent-cyan/40 rounded-xl pl-9 pr-4 py-3 text-white font-poppins text-sm outline-none transition-all focus:bg-white/10"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5 relative">
                <label className="font-poppins text-[10px] font-bold text-white/50 uppercase tracking-widest ml-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/30" size={14} />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    className="w-full bg-white/5 border border-white/5 focus:border-accent-cyan/40 rounded-xl pl-9 pr-4 py-3 text-white font-poppins text-sm outline-none transition-all focus:bg-white/10"
                  />
                </div>
              </div>

              {loginError && (
                <p className="text-rose-400 font-poppins text-xs font-medium ml-1">{loginError}</p>
              )}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-accent-blue to-accent-cyan text-white py-3 rounded-xl font-poppins text-xs font-bold uppercase tracking-wider hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all cursor-pointer"
                onMouseEnter={playHover}
              >
                Authenticate Session
              </button>
            </form>
          </motion.div>
        )}

        {/* ADMIN DASHBOARD PORTAL */}
        {isLoggedIn && (
          <motion.div
            key="dashboard-portal"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-full max-w-6xl h-[85vh] glassmorphism border border-white/10 rounded-3xl shadow-2xl z-10 flex flex-col overflow-hidden"
          >
            {/* Header section */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 border-b border-white/5 bg-slate-950/40">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-accent-blue/10 border border-accent-blue/20 rounded-xl text-accent-cyan">
                  <Shield size={20} />
                </div>
                <div className="text-left">
                  <h2 className="font-sora font-extrabold text-lg text-white flex items-center gap-2">
                    ZENCE Admin Dashboard
                    {isLoading && (
                      <RefreshCw size={14} className="animate-spin text-accent-cyan" />
                    )}
                  </h2>
                  <p className="font-poppins text-[10px] text-white/40 tracking-wider uppercase font-semibold">
                    Inquiry Database Management
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={loadInquiries}
                  title="Reload DB Entries"
                  onMouseEnter={playHover}
                  className="p-2.5 bg-white/5 border border-white/10 text-white/70 hover:text-white rounded-xl hover:bg-white/10 transition-all cursor-pointer"
                >
                  <RefreshCw size={15} className={isLoading ? "animate-spin" : ""} />
                </button>
                <button
                  onClick={handleLogout}
                  onMouseEnter={playHover}
                  className="flex items-center gap-2 bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-rose-500/10 hover:border-rose-500/20 px-4 py-2.5 rounded-xl font-poppins text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                >
                  <LogOut size={13} />
                  <span>Logout</span>
                </button>
                <button
                  onClick={onClose}
                  onMouseEnter={playHover}
                  className="p-2.5 text-white/50 hover:text-white rounded-xl hover:bg-white/5 transition-all cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Error alerts */}
            {errorMsg && (
              <div className="mx-6 mt-4 p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl text-xs font-medium font-poppins text-left">
                {errorMsg}
              </div>
            )}

            {/* Query Controls row */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-6 py-4 border-b border-white/5 bg-slate-900/10">
              {/* Search input field */}
              <div className="relative w-full md:max-w-xs">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/30" size={14} />
                <input
                  type="text"
                  placeholder="Search inquiries..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/5 border border-white/5 focus:border-accent-cyan/40 rounded-xl pl-9 pr-4 py-2.5 text-white font-poppins text-xs outline-none transition-all focus:bg-white/10"
                />
              </div>

              {/* Status filter selection tabs */}
              <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
                {['all', 'New', 'Contacted', 'Converted'].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => { playClick(); setStatusFilter(filter); }}
                    className={`px-3.5 py-2 rounded-lg font-poppins text-[10px] font-bold uppercase tracking-wider transition-all border cursor-pointer shrink-0 ${
                      statusFilter === filter
                        ? 'bg-accent-blue/10 border-accent-blue/20 text-accent-cyan'
                        : 'bg-white/5 border-transparent text-white/40 hover:text-white hover:border-white/5'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              {/* Actions container */}
              <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                <button
                  onClick={handleExportCSV}
                  disabled={inquiries.length === 0}
                  onMouseEnter={playHover}
                  className="flex items-center gap-2 bg-white/5 border border-white/10 hover:border-accent-cyan/20 hover:text-accent-cyan disabled:opacity-50 text-white px-4 py-2.5 rounded-xl font-poppins text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                >
                  <Download size={14} />
                  <span>Export CSV</span>
                </button>

                <button
                  onClick={handleClearAll}
                  disabled={inquiries.length === 0}
                  onMouseEnter={playHover}
                  className="flex items-center gap-2 bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500/20 text-rose-400 disabled:opacity-50 px-4 py-2.5 rounded-xl font-poppins text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                >
                  <Trash2 size={14} />
                  <span>Clear All</span>
                </button>
              </div>
            </div>

            {/* Data Table */}
            <div className="flex-grow overflow-auto p-6">
              {filteredInquiries.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <span className="text-white/20 font-sora font-semibold text-lg">
                    {isLoading ? "Fetching records..." : "No inquiries recorded."}
                  </span>
                  <p className="text-white/40 font-poppins text-xs font-light mt-1 max-w-xs">
                    {isLoading ? "Querying Supabase cloud database..." : "Inquiry submissions submitted via the frontend form will show up here."}
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto rounded-xl border border-white/5">
                  <table className="w-full text-left border-collapse min-w-[900px]">
                    <thead>
                      <tr className="bg-slate-950/40 border-b border-white/5 text-[10px] font-bold text-white/50 uppercase tracking-widest font-poppins">
                        <th className="py-4 px-5">Name</th>
                        <th className="py-4 px-5">Email</th>
                        <th className="py-4 px-5">Phone</th>
                        <th className="py-4 px-5">Service</th>
                        <th className="py-4 px-5">Project Scope</th>
                        <th className="py-4 px-5">Date</th>
                        <th className="py-4 px-5">Status</th>
                        <th className="py-4 px-5 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 font-poppins text-xs">
                      {filteredInquiries.map((item) => (
                        <tr key={item.id} className="hover:bg-white/2 transition-colors text-white/80">
                          <td className="py-4 px-5 font-semibold text-white">{item.full_name}</td>
                          <td className="py-4 px-5">{item.email}</td>
                          <td className="py-4 px-5 text-white/60">{item.phone || '-'}</td>
                          <td className="py-4 px-5">
                            <span className="px-2.5 py-1 rounded-full font-bold text-[10px] text-accent-cyan bg-accent-cyan/10 border border-accent-cyan/20">
                              {item.selected_service}
                            </span>
                          </td>
                          <td className="py-4 px-5 max-w-[200px] truncate" title={item.project_scope}>
                            {item.project_scope}
                          </td>
                          <td className="py-4 px-5 text-white/50">
                            {new Date(item.created_at || Date.now()).toLocaleString()}
                          </td>
                          <td className="py-4 px-5">
                            <select
                              value={item.status || 'New'}
                              onChange={(e) => handleStatusChange(item.id, e.target.value)}
                              className={`font-semibold text-xs rounded-lg px-2.5 py-1.5 outline-none border cursor-pointer ${
                                item.status === 'Converted'
                                  ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                                  : item.status === 'Contacted'
                                  ? 'bg-accent-blue/10 border-accent-blue/20 text-accent-cyan'
                                  : 'bg-white/5 border-white/10 text-white/60'
                              }`}
                            >
                              <option value="New" className="bg-[#0d1322] text-white/80">New</option>
                              <option value="Contacted" className="bg-[#0d1322] text-white/80">Contacted</option>
                              <option value="Converted" className="bg-[#0d1322] text-white/80">Converted</option>
                            </select>
                          </td>
                          <td className="py-4 px-5 text-right">
                            <button
                              onClick={() => handleDelete(item.id)}
                              onMouseEnter={playHover}
                              className="p-2 rounded-lg bg-white/3 border border-white/5 text-white/40 hover:text-rose-400 hover:bg-rose-500/10 hover:border-rose-500/20 transition-all cursor-pointer"
                              title="Delete entry"
                            >
                              <Trash2 size={13} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
