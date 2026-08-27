'use client';

import React, { useState, useEffect } from 'react';
import MiracleCard from '@/components/MiracleCard';
import { fetchMiracles } from '@/lib/api';
import { Miracle } from '@/data/miraclesData';
import { Sparkles, Search, Filter, Globe, Microscope, Shield, Map } from 'lucide-react';
import Link from 'next/link';

export default function MiraclesExplorerPage() {
  const [miracles, setMiracles] = useState<Miracle[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCentury, setSelectedCentury] = useState('ALL');
  const [selectedApproval, setSelectedApproval] = useState('ALL');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const data = await fetchMiracles();
      setMiracles(data);
      setLoading(false);
    }
    loadData();
  }, []);

  const centuries = [
    { id: 'ALL', label: 'All Centuries' },
    { id: '21st', label: '21st Century (Modern)' },
    { id: '20th', label: '20th Century' },
    { id: '8th', label: 'Ancient (8th Century)' },
  ];

  const approvals = [
    { id: 'ALL', label: 'All Approvals' },
    { id: 'VATICAN', label: 'Vatican Approved' },
    { id: 'DIOCESAN', label: 'Diocesan Bishop Approved' },
  ];

  const filteredMiracles = miracles.filter(m => {
    const matchesSearch =
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.location_city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.location_country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.summary.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCentury =
      selectedCentury === 'ALL' ||
      m.century.toLowerCase().includes(selectedCentury.toLowerCase()) ||
      m.year_occurred.includes(selectedCentury);

    const matchesApproval =
      selectedApproval === 'ALL' || m.church_approval === selectedApproval;

    return matchesSearch && matchesCentury && matchesApproval;
  });

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono tracking-widest uppercase bg-amber-100 text-amber-900 border border-amber-300 shadow-sm">
          <Microscope className="w-3.5 h-3.5 text-amber-700" /> Scientifically & Ecclesiastically Vetted
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-stone-900 tracking-tight">
          Eucharistic Miracles Explorer
        </h1>
        <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-medium">
          Explore documented instances where the consecrated Bread and Wine visibly transformed into living human Heart Muscle and Blood (AB+), verified by modern forensic pathology and independent university laboratories.
        </p>
        <div className="pt-2">
          <Link
            href="/map"
            className="inline-flex items-center gap-2 text-xs font-bold text-amber-800 bg-amber-100/90 border border-amber-300 hover:bg-amber-200 px-4 py-2 rounded-xl transition-all shadow-sm"
          >
            <Map className="w-4 h-4 text-amber-700" />
            <span>Switch to Interactive World Map View</span>
          </Link>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="sacred-glass-card rounded-3xl p-6 border border-amber-300 space-y-4 shadow-md bg-white">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          
          {/* Search input */}
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by miracle, city (Lanciano, Buenos Aires), or country..."
              className="w-full bg-amber-50/50 border border-amber-200 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-amber-500 placeholder:text-stone-400 shadow-inner"
            />
          </div>

          {/* Century Filter */}
          <div className="md:col-span-3">
            <select
              value={selectedCentury}
              onChange={(e) => setSelectedCentury(e.target.value)}
              className="w-full bg-amber-50/50 border border-amber-200 rounded-2xl px-3.5 py-2.5 text-xs text-stone-800 focus:outline-none focus:border-amber-500 font-medium shadow-inner"
            >
              {centuries.map(c => (
                <option key={c.id} value={c.id}>{c.label}</option>
              ))}
            </select>
          </div>

          {/* Church Approval Filter */}
          <div className="md:col-span-3">
            <select
              value={selectedApproval}
              onChange={(e) => setSelectedApproval(e.target.value)}
              className="w-full bg-amber-50/50 border border-amber-200 rounded-2xl px-3.5 py-2.5 text-xs text-stone-800 focus:outline-none focus:border-amber-500 font-medium shadow-inner"
            >
              {approvals.map(a => (
                <option key={a.id} value={a.id}>{a.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Active Filter Counter */}
        <div className="flex items-center justify-between text-xs text-stone-600 pt-2 border-t border-amber-100 font-medium">
          <span>Showing <strong className="text-amber-800">{filteredMiracles.length}</strong> documented miracles</span>
          {(searchQuery || selectedCentury !== 'ALL' || selectedApproval !== 'ALL') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCentury('ALL');
                setSelectedApproval('ALL');
              }}
              className="text-amber-800 font-bold hover:underline"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Miracles Grid */}
      {loading ? (
        <div className="text-center py-20 text-stone-500 text-sm">
          Loading Eucharistic Miracles...
        </div>
      ) : filteredMiracles.length === 0 ? (
        <div className="sacred-glass-card rounded-3xl p-12 text-center max-w-md mx-auto space-y-4 border border-amber-200 bg-white">
          <Globe className="w-10 h-10 text-amber-400 mx-auto" />
          <h3 className="font-serif text-lg font-bold text-stone-900">No miracles match your search</h3>
          <p className="text-xs text-stone-600">Try clearing your filters or searching for keywords like &ldquo;Poland&rdquo; or &ldquo;Heart&rdquo;.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMiracles.map((miracle) => (
            <MiracleCard key={miracle.id} miracle={miracle} />
          ))}
        </div>
      )}
    </div>
  );
}
