import React from 'react';
import Link from 'next/link';
import ConfessionGuide from '@/components/ConfessionGuide';
import { HeartHandshake, Sparkles, Church, Flame, ArrowRight, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'Coming Home to the Catholic Church & Confession Guide | Encounter Christ',
  description: 'A loving, judgment-free guide for returning Catholics and seekers. Learn how to return to Mass, make a good confession, and encounter Christ anew.',
};

export default function ReturnHomePage() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-16">
      
      {/* Welcome Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono tracking-widest uppercase bg-amber-100 text-amber-900 border border-amber-300 shadow-sm font-bold">
          <HeartHandshake className="w-3.5 h-3.5 text-amber-700" /> Welcome Home
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-stone-900 tracking-tight">
          Jesus Has Been Waiting for You
        </h1>
        <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-serif italic font-medium">
          &ldquo;There is more joy in heaven over one sinner who repents than over ninety-nine righteous persons who need no repentance.&rdquo; — Luke 15:7
        </p>
      </div>

      {/* 3 Step Practical Roadmap */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Step 1 */}
        <div className="sacred-glass-card rounded-3xl p-6 space-y-3 border border-amber-300 relative bg-white shadow-md">
          <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-900 font-extrabold text-xs flex items-center justify-center border border-amber-300 shadow-sm">
            1
          </div>
          <h3 className="font-serif font-bold text-base text-stone-900">
            Quiet Reflection & Prayer
          </h3>
          <p className="text-xs text-stone-700 leading-relaxed">
            Take a deep breath. Recognize that the longing in your soul is God calling you back. You don&apos;t need to have all your answers figured out right now.
          </p>
        </div>

        {/* Step 2 */}
        <div className="sacred-glass-card rounded-3xl p-6 space-y-3 border border-amber-300 relative bg-white shadow-md">
          <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-900 font-extrabold text-xs flex items-center justify-center border border-amber-300 shadow-sm">
            2
          </div>
          <h3 className="font-serif font-bold text-base text-stone-900">
            Sacrament of Reconciliation
          </h3>
          <p className="text-xs text-stone-700 leading-relaxed">
            Make a good Confession. It wipes away every past sin, resets your relationship with Christ, and restores you to full communion in a state of grace.
          </p>
        </div>

        {/* Step 3 */}
        <div className="sacred-glass-card rounded-3xl p-6 space-y-3 border border-amber-300 relative bg-white shadow-md">
          <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-900 font-extrabold text-xs flex items-center justify-center border border-amber-300 shadow-sm">
            3
          </div>
          <h3 className="font-serif font-bold text-base text-stone-900">
            Receive the Holy Eucharist
          </h3>
          <p className="text-xs text-stone-700 leading-relaxed">
            Step back into Holy Mass on Sunday with a pure heart and receive Jesus Christ in the Blessed Sacrament—the spiritual medicine for your soul.
          </p>
        </div>
      </div>

      {/* Interactive Examination & Confession Guide Component */}
      <ConfessionGuide />

      {/* Reassuring Common Questions */}
      <div className="sacred-glass-card rounded-3xl p-6 sm:p-10 space-y-6 border border-amber-300 bg-white shadow-md">
        <h3 className="font-serif text-xl font-bold text-stone-900 border-b border-amber-200 pb-4">
          Common Questions When Returning Home
        </h3>

        <div className="space-y-4 text-xs">
          <div className="p-4 bg-amber-50/70 rounded-2xl border border-amber-200 space-y-1">
            <h4 className="font-bold text-amber-900">Can God really forgive the things I&apos;ve done?</h4>
            <p className="text-stone-700 leading-relaxed">
              Yes, absolutely! God&apos;s Divine Mercy is infinite and vastly greater than any sin. St. Faustina wrote that even if a soul&apos;s sins were as dark as night, when it approaches God&apos;s mercy, it receives unfathomable grace.
            </p>
          </div>

          <div className="p-4 bg-amber-50/70 rounded-2xl border border-amber-200 space-y-1">
            <h4 className="font-bold text-amber-900">What if I don&apos;t remember how to confess?</h4>
            <p className="text-stone-700 leading-relaxed">
              That is completely okay! Just tell the priest: <em>&ldquo;Father, I haven&apos;t been in a long time and I need your help.&rdquo;</em> He will ask gentle questions and walk you through every step.
            </p>
          </div>

          <div className="p-4 bg-amber-50/70 rounded-2xl border border-amber-200 space-y-1">
            <h4 className="font-bold text-amber-900">Can I attend Mass before going to Confession?</h4>
            <p className="text-stone-700 leading-relaxed">
              Yes! You are always warmly welcome to attend Holy Mass, pray, listen to the Word of God, and join in worship. Simply remain seated in your pew or cross your arms over your chest for a blessing during Communion until you have made your Confession.
            </p>
          </div>
        </div>
      </div>

      {/* Find a Parish Action */}
      <div className="sacred-glass rounded-3xl p-8 text-center border border-amber-300 space-y-4 shadow-xl bg-gradient-to-b from-amber-50 to-[#FFFDF5]">
        <Church className="w-10 h-10 text-amber-700 mx-auto" />
        <h3 className="font-serif text-xl font-bold text-stone-900">Ready to Visit a Catholic Parish?</h3>
        <p className="text-xs text-stone-700 max-w-xl mx-auto font-medium">
          Find Catholic parishes, confession times, and Eucharistic adoration chapels in your city or anywhere worldwide.
        </p>
        <div className="pt-2">
          <a
            href="https://masstimes.org"
            target="_blank"
            rel="noopener noreferrer"
            className="gold-button inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider shadow-md"
          >
            <span>Locate Mass & Confession Near You (MassTimes.org)</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
