import React from 'react';
import MiracleMapClientWrapper from '@/components/MiracleMapClientWrapper';
import { fetchMiracles } from '@/lib/api';

export const dynamic = 'force-dynamic';
import { Globe } from 'lucide-react';

export const metadata = {
  title: 'Interactive World Map of Eucharistic Miracles | Encounter Christ',
  description: 'Explore the global geographic distribution of verified Eucharistic Miracles across centuries with forensic pathology findings.',
};

export default async function MapPage() {
  const miracles = await fetchMiracles();

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono tracking-widest uppercase bg-amber-100 text-amber-900 border border-amber-300 shadow-sm font-bold">
          <Globe className="w-3.5 h-3.5 text-amber-700" /> Georeferenced Relics & Pathology
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-stone-900 tracking-tight">
          Interactive Miracle Map
        </h1>
        <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-medium">
          From 8th-century Italy to 21st-century Poland and Mexico, explore where the living Heart and Blood
          of Jesus Christ have been scientifically documented. Pin locations are managed through the Admin Panel.
        </p>
      </div>

      {/* Interactive Leaflet Map (client-side only via wrapper) */}
      <MiracleMapClientWrapper miracles={miracles} />
    </div>
  );
}
