'use client';

import React, { useState } from 'react';
import { Share2, Copy, Check, MessageCircle, Send, Sparkles, Download, ArrowRight, Heart } from 'lucide-react';

export default function ShareJesusPage() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const shareableSnippets = [
    {
      title: 'Eucharistic Miracle & Forensic Science Spotlight',
      text: 'Did you know that independent laboratory studies of Eucharistic Miracles (like Buenos Aires and Lanciano) reveal living human left-ventricular heart muscle and AB+ blood under intense trauma? Discover the evidence at https://encounterchrist.vercel.app',
      tag: 'Scientific Evidence'
    },
    {
      title: 'Invitation for a Friend Who Left Church',
      text: 'Hey friend, I was thinking about you today. If you ever feel like you want to return to prayer or Mass, know that Jesus is waiting with open arms and zero judgment. Check this out: https://encounterchrist.vercel.app/return-home',
      tag: 'Returning Home'
    },
    {
      title: 'Bread of Life (John 6:35) Reflection',
      text: '“I am the bread of life; whoever comes to me shall not hunger, and whoever believes in me shall never thirst.” — Jesus (John 6:35). Encounter Christ today at https://encounterchrist.vercel.app',
      tag: 'Scripture Verse'
    }
  ];

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  const openWhatsApp = (text: string) => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-16">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono tracking-widest uppercase bg-amber-100 text-amber-900 border border-amber-300 shadow-sm font-bold">
          <Share2 className="w-3.5 h-3.5 text-amber-700" /> The Great Commission
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-stone-900 tracking-tight">
          Share Jesus With the World
        </h1>
        <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-serif italic font-medium">
          &ldquo;Go into all the world and proclaim the gospel to the whole creation.&rdquo; — Mark 16:15
        </p>
      </div>

      {/* Shareable Message Cards */}
      <div className="space-y-6">
        <h2 className="font-serif font-bold text-xl text-stone-900 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-700" />
          One-Click WhatsApp & Social Evangelization Cards
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {shareableSnippets.map((snippet, idx) => (
            <div
              key={idx}
              className="sacred-glass-card rounded-3xl p-6 flex flex-col justify-between space-y-4 border border-amber-300 bg-white shadow-md"
            >
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 font-bold">
                  {snippet.tag}
                </span>
                <h3 className="font-serif font-bold text-sm text-stone-900 mt-3 mb-2">
                  {snippet.title}
                </h3>
                <p className="text-xs text-stone-800 leading-relaxed italic bg-amber-50/70 p-4 rounded-2xl border border-amber-200 font-medium">
                  &ldquo;{snippet.text}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-amber-200">
                <button
                  onClick={() => openWhatsApp(snippet.text)}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-sm"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </button>
                <button
                  onClick={() => handleCopy(snippet.text, idx)}
                  className="py-2.5 px-3 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-sm"
                >
                  {copiedIndex === idx ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-amber-700" />
                      <span className="text-amber-800 font-bold">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-amber-700" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Carlo Acutis Digital Apostle Tribute */}
      <div className="sacred-glass-card rounded-3xl p-8 sm:p-12 border border-amber-300 bg-gradient-to-br from-amber-50/90 via-white to-amber-100/70 space-y-4 text-center shadow-xl">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-100 border border-amber-300 text-amber-700 mb-2 shadow-sm">
          <Heart className="w-6 h-6 fill-amber-500 text-amber-600" />
        </div>
        <h3 className="font-serif text-2xl font-bold text-stone-900">
          Inspired by Blessed Carlo Acutis (1991–2006)
        </h3>
        <p className="text-xs sm:text-sm text-stone-700 max-w-2xl mx-auto leading-relaxed font-medium">
          At age 11, Blessed Carlo Acutis used modern computer programming to build the world&apos;s first virtual museum of Eucharistic Miracles to bring people back to the Catholic faith. He famously stated:
        </p>
        <blockquote className="font-serif italic text-base text-amber-900 max-w-xl mx-auto font-bold">
          &ldquo;The Eucharist is my highway to Heaven. All people are born originals, but many end up as photocopies.&rdquo;
        </blockquote>
      </div>
    </div>
  );
}
