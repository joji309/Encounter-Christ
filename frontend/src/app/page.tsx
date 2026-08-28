import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import MiracleCard from '@/components/MiracleCard';
import MiracleMap from '@/components/MiracleMap';
import PrayerWall from '@/components/PrayerWall';
import CalvaryCrucifixion from '@/components/CalvaryCrucifixion';
import EventCalendar from '@/components/EventCalendar';
import { fetchMiracles, fetchDailyReflection, fetchPrayerIntentions, fetchEvents } from '@/lib/api';
import {
  Sparkles,
  Flame,
  Microscope,
  HeartHandshake,
  ArrowRight,
  ShieldCheck,
  BookOpen,
  Activity,
  Heart,
  Quote,
  Compass,
  Share2,
  Globe,
  Map
} from 'lucide-react';

export const metadata = {
  title: 'Encounter Christ | Eucharistic Miracles, The Science & Catholic Faith',
  description: 'Encounter Jesus Christ through the scientific and historical realities of Eucharistic Miracles. Return home to the Sacraments, pray in the Adoration room, and grow in faith.',
};

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [allMiracles, featuredMiracles, dailyReflection, initialPrayers, events] = await Promise.all([
    fetchMiracles(),
    fetchMiracles({ featured: true }),
    fetchDailyReflection(),
    fetchPrayerIntentions(),
    fetchEvents()
  ]);

  return (
    <div className="space-y-24 pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center justify-center text-center px-4 sm:px-6 lg:px-8 overflow-hidden pt-10 isolate">
        <video
          className="absolute inset-0 -z-20 h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          aria-hidden="true"
        >
          <source src="/calvery.mp4" type="video/mp4" />
        </video>
        {/* The overlays retain clear contrast over any frame of the video. */}
        <div className="absolute inset-0 -z-10 bg-stone-950/65" aria-hidden="true" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-stone-950/50 via-stone-950/30 to-stone-950/75" aria-hidden="true" />
        <div className="absolute inset-0 -z-10 bg-radial from-amber-300/20 via-transparent to-transparent pointer-events-none" aria-hidden="true" />

        <div className="relative z-10 max-w-4xl mx-auto space-y-8">
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono tracking-widest uppercase bg-white/15 text-amber-100 border border-amber-200/60 backdrop-blur-sm shadow-[0_0_20px_rgba(245,158,11,0.25)] animate-divine-pulse">
            <Image
              src="/logo.png"
              alt="Monstrance Logo"
              width={16}
              height={16}
              className="object-contain"
            />
            <span className="font-bold">The Real Presence of Jesus Christ</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.15] drop-shadow-lg">
            Behold the <span className="gold-gradient-text">Lamb of God</span> Living in the Eucharist
          </h1>

          <p className="text-base sm:text-lg text-stone-100 max-w-2xl mx-auto leading-relaxed font-medium drop-shadow">
            Forensic pathology, cardiology, and WHO laboratory studies confirm what the Catholic Church has proclaimed for 2,000 years: Jesus Christ gives His living, beating Heart to us in the Holy Eucharist.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/miracles"
              className="gold-button px-8 py-4 rounded-2xl text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg hover:shadow-amber-500/40 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>Explore Eucharistic Miracles</span>
            </Link>

            <Link
              href="/map"
              className="px-8 py-4 rounded-2xl text-xs sm:text-sm font-bold text-amber-950 bg-white/95 border border-amber-200 hover:bg-amber-100 hover:border-amber-400 flex items-center gap-2 transition-all shadow-md"
            >
              <Map className="w-4 h-4 text-amber-700" />
              <span>Interactive Miracle Map</span>
            </Link>
          </div>

          {/* Quick Pillar Badges */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-stone-100 font-semibold drop-shadow">
            <span className="flex items-center gap-1.5"><Activity className="w-4 h-4 text-red-300" /> 100% AB+ Blood Group</span>
            <span>•</span>
            <span className="flex items-center gap-1.5"><Microscope className="w-4 h-4 text-amber-300" /> Left Ventricular Heart Muscle</span>
            <span>•</span>
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-300" /> Vatican Vetted</span>
          </div>
        </div>
      </section>

      {/* 2. STATS & FORENSIC METRICS BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="sacred-glass-card rounded-3xl p-8 border border-amber-300 grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-amber-200 shadow-md">
          <div className="p-4 space-y-1">
            <div className="font-serif text-3xl sm:text-4xl font-extrabold gold-gradient-text">140+</div>
            <p className="text-xs text-stone-600 uppercase tracking-wider font-mono font-bold">Church Miracles Catalogued</p>
          </div>
          <div className="p-4 space-y-1">
            <div className="font-serif text-3xl sm:text-4xl font-extrabold text-red-600">AB+</div>
            <p className="text-xs text-stone-600 uppercase tracking-wider font-mono font-bold">Universal Human Blood Group</p>
          </div>
          <div className="p-4 space-y-1">
            <div className="font-serif text-3xl sm:text-4xl font-extrabold text-emerald-700">100%</div>
            <p className="text-xs text-stone-600 uppercase tracking-wider font-mono font-bold">Living Heart Tissue Match</p>
          </div>
          <div className="p-4 space-y-1">
            <div className="font-serif text-3xl sm:text-4xl font-extrabold text-amber-700">2,000+</div>
            <p className="text-xs text-stone-600 uppercase tracking-wider font-mono font-bold">Years of Apostolic Faith</p>
          </div>
        </div>
      </section>

      {/* 2b. CALVARY CRUCIFIXION & FORENSIC INSIGHT SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CalvaryCrucifixion />
      </section>

      {/* 2c. THE LAST SUPPER & THE INSTITUTION OF THE EUCHARIST */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="sacred-glass-card overflow-hidden rounded-3xl border border-amber-300 bg-gradient-to-br from-amber-50 via-white to-amber-50 shadow-xl">
          <div className="grid items-stretch md:grid-cols-[1.05fr_0.95fr]">
            <div className="relative min-h-[250px] overflow-hidden bg-stone-900 sm:min-h-[360px]">
              <Image
                src="/last-supper.jpg"
                alt="The Last Supper, when Jesus instituted the Holy Eucharist"
                fill
                sizes="(max-width: 768px) 100vw, 55vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent" aria-hidden="true" />
              <p className="absolute bottom-4 left-4 right-4 font-serif text-lg font-bold text-white sm:text-xl">“This is my body… this is my blood.”</p>
            </div>
            <div className="flex flex-col justify-center p-6 sm:p-10">
              <p className="mb-2 text-xs font-mono font-bold uppercase tracking-[0.25em] text-amber-700">The First Eucharist</p>
              <h2 className="font-serif text-2xl font-bold text-stone-900 sm:text-3xl">The Promise at the Table</h2>
              <p className="mt-4 text-sm leading-relaxed text-stone-700">
                At the Last Supper, Jesus did not leave us only a memory. He gave us the living Eucharist and commanded us to continue this gift until He comes again.
              </p>
              <blockquote className="mt-5 border-l-2 border-amber-500 pl-4 font-serif text-base italic leading-relaxed text-amber-900">
                “Do this in remembrance of me.” — Luke 22:19
              </blockquote>
              <p className="mt-5 text-xs font-semibold leading-relaxed text-stone-600">
                Every Holy Mass brings us back to this sacred table, where Christ gives Himself completely for the life of the world.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2d. ADMIN-MANAGED EVENT CALENDAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <EventCalendar events={events} initialMonth={new Date().toISOString().slice(0, 7)} />
      </section>

      {/* 3. INTERACTIVE MIRACLE MAP SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-amber-200 pb-4">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-amber-800 font-bold mb-1">
              Global Georeferenced Relics
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-stone-900">
              Interactive Miracle Map
            </h2>
          </div>
          <Link
            href="/map"
            className="text-xs font-bold text-amber-700 hover:text-amber-900 flex items-center gap-1.5 transition-colors self-start sm:self-auto"
          >
            <span>Full Map Explorer</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <MiracleMap miracles={allMiracles} />
      </section>

      {/* 4. DAILY REFLECTION & SAINT WISDOM WIDGET */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="sacred-glass-card rounded-3xl p-8 sm:p-10 border border-amber-300 bg-gradient-to-br from-amber-50/90 via-white to-amber-50/90 space-y-6 relative overflow-hidden shadow-xl">
          <div className="flex items-center justify-between border-b border-amber-200 pb-4">
            <div className="flex items-center gap-2 text-amber-800 text-xs font-mono uppercase tracking-widest font-bold">
              <Sparkles className="w-4 h-4" />
              <span>Daily Eucharistic Meditation</span>
            </div>
            <span className="text-[11px] text-stone-600 font-medium">{dailyReflection.scripture_reference}</span>
          </div>

          <div className="space-y-3">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              {dailyReflection.title}
            </h2>
            <p className="font-serif italic text-xs sm:text-sm text-stone-800 border-l-2 border-amber-500 pl-4 py-1 font-medium">
              &ldquo;{dailyReflection.scripture_text}&rdquo;
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-amber-200 space-y-2 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-800">
              <Quote className="w-4 h-4" />
              <span>{dailyReflection.saint_name} ({dailyReflection.saint_feast_or_title})</span>
            </div>
            <blockquote className="font-serif italic text-xs sm:text-sm text-stone-800 leading-relaxed font-medium">
              &ldquo;{dailyReflection.saint_quote}&rdquo;
            </blockquote>
          </div>

          <p className="text-xs text-stone-700 leading-relaxed font-medium">
            {dailyReflection.reflection_body}
          </p>

          <div className="p-4 bg-amber-100/80 rounded-2xl border border-amber-300 text-xs text-amber-950 font-serif italic text-center font-semibold">
            {dailyReflection.closing_prayer}
          </div>
        </div>
      </section>

      {/* 4b. SAINT PADRE PIO & THE HOLY EUCHARIST */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="sacred-glass-card overflow-hidden rounded-3xl border border-amber-300 bg-gradient-to-br from-amber-50 via-white to-amber-50 shadow-xl">
          <div className="grid items-stretch md:grid-cols-[minmax(220px,0.75fr)_1.25fr]">
            <div className="relative min-h-[260px] overflow-hidden bg-stone-900 sm:min-h-[320px]">
              <Image
                src="/st.padre-pio.png"
                alt="Saint Padre Pio of Pietrelcina"
                fill
                sizes="(max-width: 768px) 100vw, 35vw"
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/75 via-transparent to-transparent" aria-hidden="true" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-amber-200">Saint of the Eucharist</p>
                <p className="mt-1 font-serif text-xl font-bold">St. Padre Pio</p>
              </div>
            </div>
            <div className="flex flex-col justify-center p-6 sm:p-10">
              <div className="mb-3 flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-amber-700">
                <Heart className="h-4 w-4" /> A Eucharistic Witness
              </div>
              <blockquote className="font-serif text-xl font-bold leading-relaxed text-stone-900 sm:text-2xl">
                &ldquo;It would be easier for the earth to exist without the sun than without the Holy Sacrifice of the Mass!&rdquo;
              </blockquote>
              <p className="mt-4 text-sm leading-relaxed text-stone-600">
                For St. Padre Pio, every Mass was Calvary made present and every Holy Communion was a real encounter with the living Jesus. His life invites us to approach the Eucharist with wonder, reverence, and love.
              </p>
              <p className="mt-5 text-xs font-bold uppercase tracking-wider text-amber-800">— St. Padre Pio of Pietrelcina</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FEATURED EUCHARISTIC MIRACLES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-amber-200 pb-4">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-amber-800 font-bold mb-1">
              Documented & Forensically Tested
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-stone-900">
              Featured Eucharistic Miracles
            </h2>
          </div>
          <Link
            href="/miracles"
            className="text-xs font-bold text-amber-700 hover:text-amber-900 flex items-center gap-1.5 transition-colors self-start sm:self-auto"
          >
            <span>View All Miracles</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredMiracles.map((miracle) => (
            <MiracleCard key={miracle.id} miracle={miracle} />
          ))}
        </div>
      </section>

      {/* 6. THE FOUR PILLAR PATHWAYS (ENCOUNTER -> RETURN -> GROW -> SHARE) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-amber-800 font-bold">
            Spiritual Journey
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-stone-900">
            Four Steps to Encounter Jesus
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Pillar 1 */}
          <Link href="/miracles" className="sacred-glass-card rounded-3xl p-6 space-y-4 border border-amber-300 group hover:-translate-y-1.5 transition-all shadow-md bg-white">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-700 group-hover:scale-110 transition-transform shadow-sm">
              <Microscope className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-mono text-amber-800 uppercase tracking-widest font-bold">Step 1</span>
            <h3 className="font-serif text-lg font-bold text-stone-900 group-hover:text-amber-800 transition-colors">
              Encounter the Miracles
            </h3>
            <p className="text-xs text-stone-700 leading-relaxed">
              Examine the historical records and laboratory tests across 13 centuries that verify the living flesh and blood of Christ.
            </p>
          </Link>

          {/* Pillar 2 */}
          <Link href="/return-home" className="sacred-glass-card rounded-3xl p-6 space-y-4 border border-amber-300 group hover:-translate-y-1.5 transition-all shadow-md bg-white">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-700 group-hover:scale-110 transition-transform shadow-sm">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-mono text-emerald-800 uppercase tracking-widest font-bold">Step 2</span>
            <h3 className="font-serif text-lg font-bold text-stone-900 group-hover:text-emerald-800 transition-colors">
              Return Home in Grace
            </h3>
            <p className="text-xs text-stone-700 leading-relaxed">
              Find peace through the Sacrament of Reconciliation with our gentle, step-by-step Confession and examination helper.
            </p>
          </Link>

          {/* Pillar 3 */}
          <Link href="/adoration" className="sacred-glass-card rounded-3xl p-6 space-y-4 border border-amber-300 group hover:-translate-y-1.5 transition-all shadow-md bg-white">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-700 group-hover:scale-110 transition-transform shadow-sm">
              <Flame className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-mono text-amber-800 uppercase tracking-widest font-bold">Step 3</span>
            <h3 className="font-serif text-lg font-bold text-stone-900 group-hover:text-amber-800 transition-colors">
              Grow in Adoration
            </h3>
            <p className="text-xs text-stone-700 leading-relaxed">
              Enter our quiet digital Adoration Chapel, pray a Holy Hour with sacred Gregorian ambience, and lift daily prayers.
            </p>
          </Link>

          {/* Pillar 4 */}
          <Link href="/share" className="sacred-glass-card rounded-3xl p-6 space-y-4 border border-amber-300 group hover:-translate-y-1.5 transition-all shadow-md bg-white">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-700 group-hover:scale-110 transition-transform shadow-sm">
              <Share2 className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-mono text-blue-800 uppercase tracking-widest font-bold">Step 4</span>
            <h3 className="font-serif text-lg font-bold text-stone-900 group-hover:text-blue-800 transition-colors">
              Share Jesus to Others
            </h3>
            <p className="text-xs text-stone-700 leading-relaxed">
              Equip yourself with beautiful WhatsApp cards, social media infographics, and miracle summaries to evangelize friends.
            </p>
          </Link>
        </div>
      </section>

      {/* 7. LIVE PRAYER & VIRTUAL CANDLE WALL SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-amber-200 pb-4">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-amber-800 font-bold mb-1">
              Global Intercessory Prayer
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-stone-900">
              Virtual Candle Shrine & Prayer Wall
            </h2>
          </div>
          <Link
            href="/prayers"
            className="text-xs font-bold text-amber-700 hover:text-amber-900 flex items-center gap-1.5 transition-colors self-start sm:self-auto"
          >
            <span>Open Full Shrine</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <PrayerWall initialPrayers={initialPrayers} />
      </section>

      {/* 8. COMING HOME & CARLO ACUTIS CLOSING INVITATION */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="sacred-glass rounded-3xl p-8 sm:p-14 border border-amber-300 text-center space-y-6 relative overflow-hidden shadow-xl bg-gradient-to-b from-amber-50 to-[#FFFDF5]">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-amber-100 border border-amber-300 shadow-sm p-2">
            <Image
              src="/logo.png"
              alt="Monstrance Logo"
              width={36}
              height={36}
              className="object-contain"
            />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
            Your Seat at the Table of the Lord is Waiting
          </h2>
          <p className="text-xs sm:text-sm text-stone-700 max-w-2xl mx-auto leading-relaxed font-medium">
            No matter how many years you have been away, Jesus has never stopped loving you. Take the first step today: examine your conscience, find a confession time at your local parish, and return to the fullness of the Sacraments.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/return-home"
              className="gold-button px-8 py-3.5 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md"
            >
              <span>Read Coming Home Guide</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/apologetics"
              className="px-8 py-3.5 rounded-2xl text-xs font-bold text-amber-950 bg-white border border-amber-300 hover:border-amber-500 shadow-sm"
            >
              <span>Explore Catholic Answers</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
