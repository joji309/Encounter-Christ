import React from 'react';
import PrayerWall from '@/components/PrayerWall';
import { fetchPrayerIntentions } from '@/lib/api';
import { Flame, HeartHandshake, Sparkles } from 'lucide-react';

export const metadata = {
  title: 'Prayer Intentions Wall & Virtual Candle Shrine | Encounter Christ',
  description: 'Submit your prayer intention before Jesus in the Blessed Sacrament, light a virtual candle, and intercede for brothers and sisters around the world.',
};

export default async function PrayersPage() {
  const initialPrayers = await fetchPrayerIntentions();

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-12">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono tracking-widest uppercase bg-amber-100 text-amber-900 border border-amber-300 shadow-sm font-bold">
          <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-600" /> Community Intercession
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-stone-900 tracking-tight">
          Virtual Candle Shrine & Prayer Wall
        </h1>
        <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-medium">
          &ldquo;For where two or three are gathered in my name, there am I among them.&rdquo; — Matthew 18:20.
          Place your intention before Jesus Christ, and unite in prayer for pilgrims around the world.
        </p>
      </div>

      {/* Interactive Prayer Wall */}
      <PrayerWall initialPrayers={initialPrayers} />
    </div>
  );
}
