import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Trash2, Search, Shield, Download, RefreshCw } from 'lucide-react';
import { useAudio } from '../hooks/useAudio';

export default function AdminDashboard({ isOpen, onClose }) {
  const { playClick, playHover } = useAudio();
  const [inquiries, setInquiries] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    if (isOpen) {
      loadInquiries();
    }
  }, [isOpen]);

  const loadInquiries = () => {
    const saved = localStorage.getItem('zence_inquiries');
    if (saved) {
      try {
        setInquiries(JSON.parse(saved));
      } catch (e) {
        setInquiries([]);
      }
    } else {
      setInquiries([]);
    }
  };

  const handleStatusChange = (id, newStatus) => {
    playClick();
    const updated = inquiries.map(item => {
      if (item.id === id) {
        return { ...item, status: newStatus };
      }
      return item;
    });
    setInquiries(updated);
    localStorage.setItem('zence_inquiries', JSON.stringify(updated));
  };

  const handleDelete = (id) => {
    playClick();
    if (window.confirm("Are you sure you want to delete this inquiry?")) {
      const updated = inquiries.filter(item => item.id !== id);
      setInquiries(updated);
      localStorage.setItem('zence_inquiries', JSON.stringify(updated));
    }
  };

  const handleClearAll = () => {
    playClick();
    if (window.confirm("WARNING: This will permanently delete ALL inquiries. Are you sure?")) {
      setInquiries([]);
      localStorage.removeItem('zence_inquiries');
    }
  };

  const handleExportCSV = () => {
    playClick();
    if (inquiries.length === 0) return;
    
    const headers = ["Name", "Email", "Service", "Project Scope", "Date", "Status"];
    const rows = inquiries.map(item => [
      `"${item.name.replace(/"/g, '""')}"`,
      `"${item.email.replace(/"/g, '""')}"`,
      `"${item.service.replace(/"/g, '""')}"`,
      `"${item.scope.replace(/"/g, '""')}"`,
      `"${item.date.replace(/"/g, '""')}"`,
      `"${item.status.replace(/"/g, '""')}"`
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
    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.scope.toLowerCase().includes(searchQuery.toLowerCase());
      
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

      {/* Modal Content container */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-6xl h-[85vh] bg-[#0d1322] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col z-10"
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-white/5 flex items-center justify-between bg-slate-950/40">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-accent-blue/10 text-accent-cyan border border-accent-blue/20">
              <Shield size={20} />
            </div>
            <div>
              <h3 className="font-sora font-extrabold text-xl text-white">
                ZENCE Admin Panel
              </h3>
              <p className="font-poppins text-xs text-white/40 font-light mt-0.5">
                Manage and track website inquiry bookings.
              </p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            onMouseEnter={playHover}
            className="p-2 rounded-full bg-white/5 border border-white/10 hover:border-white/20 text-white/50 hover:text-white transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Filters and Actions Bar */}
        <div className="p-6 border-b border-white/5 flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center bg-slate-950/20">
          {/* Search and filter inputs */}
          <div className="flex flex-col sm:flex-row gap-3 flex-grow max-w-xl">
            <div className="relative flex-grow">
              <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-white/30" size={16} />
              <input
                type="text"
                placeholder="Search by name, email, or scope..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/5 focus:border-accent-cyan/40 rounded-xl pl-10 pr-4 py-2.5 text-white font-poppins text-xs outline-none transition-all focus:bg-white/10"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-white/5 border border-white/5 text-white/70 font-poppins text-xs rounded-xl px-4 py-2.5 outline-none focus:border-accent-cyan/40"
            >
              <option value="all" className="bg-[#0d1322]">All Statuses</option>
              <option value="New" className="bg-[#0d1322]">New</option>
              <option value="Contacted" className="bg-[#0d1322]">Contacted</option>
              <option value="Converted" className="bg-[#0d1322]">Converted</option>
            </select>
          </div>

          {/* Database actions */}
          <div className="flex gap-2 shrink-0">
            <button
              onClick={loadInquiries}
              onMouseEnter={playHover}
              title="Refresh database"
              className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 text-white/60 hover:text-white transition-all cursor-pointer"
            >
              <RefreshCw size={16} />
            </button>

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
                No inquiries recorded.
              </span>
              <p className="text-white/40 font-poppins text-xs font-light mt-1 max-w-xs">
                Inquiry submissions submitted via the frontend form will show up here.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-white/5">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="bg-slate-950/40 border-b border-white/5 text-[10px] font-bold text-white/50 uppercase tracking-widest font-poppins">
                    <th className="py-4 px-5">Name</th>
                    <th className="py-4 px-5">Email</th>
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
                      <td className="py-4 px-5 font-semibold text-white">{item.name}</td>
                      <td className="py-4 px-5">{item.email}</td>
                      <td className="py-4 px-5">
                        <span className="px-2.5 py-1 rounded-full font-bold text-[10px] text-accent-cyan bg-accent-cyan/10 border border-accent-cyan/20">
                          {item.service}
                        </span>
                      </td>
                      <td className="py-4 px-5 max-w-[250px] truncate" title={item.scope}>
                        {item.scope}
                      </td>
                      <td className="py-4 px-5 text-white/50">{item.date}</td>
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
    </div>
  );
}
