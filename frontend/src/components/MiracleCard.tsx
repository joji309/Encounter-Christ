import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Miracle } from '@/data/miraclesData';
import { MapPin, Calendar, Activity, Dna, ArrowRight, ShieldCheck } from 'lucide-react';

interface MiracleCardProps {
  miracle: Miracle;
}

export default function MiracleCard({ miracle }: MiracleCardProps) {
  return (
    <div className="sacred-glass-card rounded-3xl overflow-hidden group flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 border border-amber-300/70 bg-white/95 shadow-md">
      {/* Cover Image Container */}
      <div className="relative h-56 w-full overflow-hidden bg-amber-100">
        <Image
          src={miracle.cover_image_url || '/logo.png'}
          alt={miracle.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
        
        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wide bg-amber-500 text-white shadow-md">
            {miracle.century}
          </span>
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide bg-white/95 text-amber-900 border border-amber-300 backdrop-blur-md flex items-center gap-1 shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
            {miracle.church_approval === 'VATICAN' ? 'Vatican Approved' : 'Church Approved'}
          </span>
        </div>

        {/* Location tag on bottom left of image */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-xs text-amber-100 font-semibold drop-shadow">
          <MapPin className="w-3.5 h-3.5 text-amber-300" />
          <span>{miracle.location_city}, {miracle.location_country}</span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-amber-800 font-semibold mb-2">
            <Calendar className="w-3.5 h-3.5 text-amber-600" />
            <span>Year: {miracle.year_occurred}</span>
          </div>

          <h3 className="font-serif text-lg font-bold text-stone-900 group-hover:text-amber-700 transition-colors leading-snug">
            {miracle.title}
          </h3>

          <p className="text-xs text-stone-700 mt-2 line-clamp-3 leading-relaxed">
            {miracle.summary}
          </p>
        </div>

        {/* Forensic Highlights Box */}
        <div className="bg-amber-50/90 rounded-2xl p-3.5 border border-amber-200/80 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-stone-600 flex items-center gap-1 font-medium">
              <Activity className="w-3.5 h-3.5 text-red-600" /> Blood Type:
            </span>
            <span className="font-bold text-red-700 bg-red-100 px-2.5 py-0.5 rounded-md border border-red-300">
              {miracle.blood_type}
            </span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-stone-600 flex items-center gap-1 font-medium">
              <Dna className="w-3.5 h-3.5 text-amber-700" /> Tissue:
            </span>
            <span className="font-semibold text-amber-950 truncate max-w-[150px]" title={miracle.tissue_type}>
              Heart Myocardium
            </span>
          </div>
        </div>

        {/* Action Link */}
        <Link
          href={`/miracles/${miracle.slug}`}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 shadow-md hover:shadow-amber-500/30 transition-all group-hover:translate-x-0.5"
        >
          <span>Examine Forensic Evidence</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
