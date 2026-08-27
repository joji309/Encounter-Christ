'use client';

import React, { useState } from 'react';
import { PrayerIntention } from '@/data/miraclesData';
import { submitPrayerIntention, prayForIntention } from '@/lib/api';
import { Flame, Heart, Send, Plus, CheckCircle, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface PrayerWallProps {
  initialPrayers: PrayerIntention[];
}

export default function PrayerWall({ initialPrayers }: PrayerWallProps) {
  const [prayers, setPrayers] = useState<PrayerIntention[]>(initialPrayers);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [prayedIds, setPrayedIds] = useState<Set<number>>(new Set());

  // Form State
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('FAITH_RETURN');
  const [intentionText, setIntentionText] = useState('');
  const [formSuccess, setFormSuccess] = useState(false);

  const categories = [
    { id: 'ALL', label: 'All Intentions' },
    { id: 'FAITH_RETURN', label: 'Return to Faith' },
    { id: 'HEALING', label: 'Healing' },
    { id: 'FAMILY', label: 'Family & Marriage' },
    { id: 'VOCATIONS', label: 'Vocations' },
    { id: 'PEACE', label: 'Peace & Thanksgiving' },
  ];

  const filteredPrayers = selectedCategory === 'ALL'
    ? prayers
    : prayers.filter(p => p.category === selectedCategory);

  const handlePrayClick = async (id: number) => {
    if (prayedIds.has(id)) return;

    // Trigger subtle golden celebration sparkles
    confetti({
      particleCount: 25,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#D97706', '#F59E0B', '#FEF08A']
    });

    setPrayedIds(prev => new Set(prev).add(id));
    setPrayers(prev => prev.map(p => p.id === id ? { ...p, prayers_count: p.prayers_count + 1 } : p));
    await prayForIntention(id);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!intentionText.trim()) return;

    setIsSubmitting(true);
    const result = await submitPrayerIntention({
      name: name.trim() || 'A Fellow Pilgrim',
      location: location.trim(),
      category,
      intention_text: intentionText.trim(),
    });

    if (result.success && result.data) {
      setPrayers(prev => [result.data!, ...prev]);
      setFormSuccess(true);
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D97706', '#DC2626', '#F59E0B']
      });
      setTimeout(() => {
        setIsModalOpen(false);
        setFormSuccess(false);
        setName('');
        setLocation('');
        setIntentionText('');
      }, 2000);
    }
    setIsSubmitting(false);
  };

  return (
    <div className="space-y-8">
      {/* Category Pills & Action Button */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-amber-500 text-white shadow-md'
                  : 'bg-amber-100/90 text-amber-900 border border-amber-300 hover:bg-amber-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="gold-button flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider shadow-md"
        >
          <Flame className="w-4 h-4" />
          Light a Candle & Intention
        </button>
      </div>

      {/* Grid of Prayer Candles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPrayers.map((prayer) => {
          const hasPrayed = prayedIds.has(prayer.id);

          return (
            <div
              key={prayer.id}
              className="sacred-glass-card rounded-3xl p-6 flex flex-col justify-between space-y-5 relative overflow-hidden group border border-amber-300/80 bg-white/95 shadow-md"
            >
              {/* Sacred Candle Flame Animation */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center animate-candle shadow-sm">
                      <Flame className="w-5 h-5 text-amber-600 fill-amber-500" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-sm text-stone-900">
                      {prayer.name}
                    </h4>
                    {prayer.location && (
                      <p className="text-[11px] text-stone-500 font-medium">{prayer.location}</p>
                    )}
                  </div>
                </div>

                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300 font-bold">
                  {prayer.category_display || prayer.category}
                </span>
              </div>

              {/* Intention Text */}
              <p className="text-xs text-stone-800 leading-relaxed italic bg-amber-50/70 p-4 rounded-2xl border border-amber-200">
                &ldquo;{prayer.intention_text}&rdquo;
              </p>

              {/* Bottom Pray Counter & Action */}
              <div className="flex items-center justify-between pt-2 border-t border-amber-200 text-xs">
                <div className="flex items-center gap-1.5 text-amber-800 font-bold">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>{prayer.prayers_count} {prayer.prayers_count === 1 ? 'prayer lifted' : 'prayers lifted'}</span>
                </div>

                <button
                  onClick={() => handlePrayClick(prayer.id)}
                  disabled={hasPrayed}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
                    hasPrayed
                      ? 'bg-amber-100 text-amber-800 border border-amber-300 cursor-default'
                      : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${hasPrayed ? 'fill-amber-600 text-amber-600' : 'text-white'}`} />
                  <span>{hasPrayed ? 'Prayed ✓' : 'I Prayed'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Light a Candle / Submit Intention Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-sm">
          <div className="bg-[#FFFDF5] border border-amber-400 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 p-2 font-bold"
            >
              ✕
            </button>

            {formSuccess ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 bg-amber-100 border border-amber-300 rounded-full flex items-center justify-center mx-auto text-amber-600 shadow-sm">
                  <CheckCircle className="w-10 h-10 text-amber-600" />
                </div>
                <h3 className="font-serif text-xl font-bold text-stone-900">
                  Your Candle Has Been Lit
                </h3>
                <p className="text-xs text-stone-700">
                  May our Lord Jesus Christ, truly present in the Holy Eucharist, receive your prayer with boundless love and divine mercy.
                </p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="text-center space-y-1 mb-4">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-amber-100 text-amber-600 mb-2 shadow-sm">
                    <Flame className="w-5 h-5 fill-amber-500" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-stone-900">
                    Submit a Prayer Intention
                  </h3>
                  <p className="text-xs text-stone-600">
                    Place your burden or thanksgiving before Christ in the Blessed Sacrament.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Your Name / Initials</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. John D. or Anonymous Pilgrim"
                    className="w-full bg-white border border-amber-200 rounded-xl px-4 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-amber-500 shadow-inner"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Location (Optional)</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Rome, Italy or Chicago, USA"
                    className="w-full bg-white border border-amber-200 rounded-xl px-4 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-amber-500 shadow-inner"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Intention Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-white border border-amber-200 rounded-xl px-4 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-amber-500 shadow-inner"
                  >
                    <option value="FAITH_RETURN">Return to Faith & Family</option>
                    <option value="HEALING">Physical & Spiritual Healing</option>
                    <option value="FAMILY">Marriage & Family Peace</option>
                    <option value="VOCATIONS">Priesthood & Religious Life</option>
                    <option value="PEACE">World Peace & Protection</option>
                    <option value="THANKSGIVING">Thanksgiving & Praise</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Your Prayer Intention *</label>
                  <textarea
                    required
                    rows={4}
                    value={intentionText}
                    onChange={(e) => setIntentionText(e.target.value)}
                    placeholder="Pour out your heart to Jesus..."
                    className="w-full bg-white border border-amber-200 rounded-xl px-4 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-amber-500 shadow-inner"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full gold-button py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 mt-4"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Lighting Candle...' : 'Light Candle & Lift Prayer'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
