import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { fetchMiracleBySlug, fetchMiracles } from '@/lib/api';
import {
  MapPin,
  Calendar,
  Microscope,
  Activity,
  Dna,
  ShieldCheck,
  ArrowLeft,
  Share2,
  BookOpen,
  Sparkles,
  Heart
} from 'lucide-react';
import type { Metadata } from 'next';

interface MiraclePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: MiraclePageProps): Promise<Metadata> {
  const { slug } = await params;
  const miracle = await fetchMiracleBySlug(slug);

  if (!miracle) {
    return {
      title: 'Eucharistic Miracle Not Found | Encounter Christ',
    };
  }

  return {
    title: `${miracle.title} - Forensic Evidence & Real Presence | Encounter Christ`,
    description: miracle.summary,
    openGraph: {
      title: `${miracle.title} | Encounter Christ`,
      description: miracle.summary,
      images: [{ url: miracle.cover_image_url }],
    },
  };
}

export async function generateStaticParams() {
  const miracles = await fetchMiracles();
  return miracles.map((m) => ({
    slug: m.slug,
  }));
}

export default async function MiracleDetailPage({ params }: MiraclePageProps) {
  const { slug } = await params;
  const miracle = await fetchMiracleBySlug(slug);

  if (!miracle) {
    notFound();
  }

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-10">
      
      {/* Back Navigation Bar */}
      <div className="flex items-center justify-between">
        <Link
          href="/miracles"
          className="inline-flex items-center gap-2 text-xs font-bold text-amber-800 hover:text-amber-950 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Miracles Explorer</span>
        </Link>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-300 shadow-sm">
            {miracle.century}
          </span>
          <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-white text-emerald-800 border border-emerald-300 flex items-center gap-1 shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            {miracle.church_approval === 'VATICAN' ? 'Vatican Formally Approved' : 'Church Approved'}
          </span>
        </div>
      </div>

      {/* Hero Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs text-amber-800 font-bold font-mono">
          <MapPin className="w-3.5 h-3.5 text-amber-600" />
          <span>{miracle.location_city}, {miracle.location_country}</span>
          <span>•</span>
          <Calendar className="w-3.5 h-3.5 text-amber-600" />
          <span>Year: {miracle.year_occurred}</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-stone-900 leading-tight">
          {miracle.title}
        </h1>

        <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-serif italic border-l-3 border-amber-500 pl-4 bg-amber-50/60 py-2 rounded-r-xl font-medium">
          &ldquo;{miracle.summary}&rdquo;
        </p>
      </div>

      {/* Featured Image */}
      <div className="relative h-80 sm:h-[450px] w-full rounded-3xl overflow-hidden shadow-xl border border-amber-300 bg-amber-100">
        <Image
          src={miracle.cover_image_url}
          alt={miracle.title}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 1024px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent" />
      </div>

      {/* Forensic Medical Dossier Banner */}
      <div className="sacred-glass-card rounded-3xl p-6 sm:p-8 border border-red-300 bg-gradient-to-br from-white via-red-50/40 to-white space-y-6 shadow-md">
        <div className="flex items-center gap-2.5 text-red-700 border-b border-red-200 pb-4">
          <Microscope className="w-6 h-6" />
          <h2 className="font-serif font-bold text-lg text-stone-900">
            Forensic & Histopathological Dossier
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-5 rounded-2xl border border-red-200 space-y-1 shadow-sm">
            <span className="text-[11px] text-stone-600 flex items-center gap-1 font-medium">
              <Activity className="w-3.5 h-3.5 text-red-600" /> Human Blood Group
            </span>
            <p className="font-extrabold text-lg text-red-700">{miracle.blood_type}</p>
            <p className="text-[10px] text-stone-500 font-medium">Universal recipient type consistent with the Shroud of Turin</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-amber-200 space-y-1 shadow-sm">
            <span className="text-[11px] text-stone-600 flex items-center gap-1 font-medium">
              <Dna className="w-3.5 h-3.5 text-amber-700" /> Tissue Pathology
            </span>
            <p className="font-bold text-sm text-amber-900 truncate" title={miracle.tissue_type}>
              {miracle.tissue_type}
            </p>
            <p className="text-[10px] text-stone-500 font-medium">Living heart muscle exhibiting intense trauma/agony</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-emerald-200 space-y-1 shadow-sm">
            <span className="text-[11px] text-stone-600 flex items-center gap-1 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> Living White Blood Cells
            </span>
            <p className="font-extrabold text-base text-emerald-800">
              {miracle.white_blood_cells_present ? 'Active & Infiltrating' : 'Preserved'}
            </p>
            <p className="text-[10px] text-stone-500 font-medium">Biochemically signifies human life at moment of sampling</p>
          </div>
        </div>

        <div className="space-y-2 text-xs text-stone-800 leading-relaxed bg-amber-50/70 p-5 rounded-2xl border border-amber-200 font-medium">
          <p><strong className="text-stone-900">Pathology Summary:</strong> {miracle.scientific_summary}</p>
          {miracle.forensic_lead_scientist && (
            <p><strong className="text-amber-800">Chief Scientists / Forensic Institutes:</strong> {miracle.forensic_lead_scientist}</p>
          )}
          {miracle.scientific_notes && (
            <p className="italic text-stone-700 pt-2 border-t border-amber-200">{miracle.scientific_notes}</p>
          )}
        </div>
      </div>

      {/* Detailed Narrative Story */}
      <div className="sacred-glass-card rounded-3xl p-6 sm:p-10 space-y-6 border border-amber-300 bg-white shadow-md">
        <div className="flex items-center gap-2 text-amber-800 border-b border-amber-200 pb-4">
          <BookOpen className="w-5 h-5" />
          <h2 className="font-serif font-bold text-lg text-stone-900">
            Historical Account & Miracle Chronicle
          </h2>
        </div>

        <div className="text-stone-800 text-sm leading-relaxed space-y-4 font-serif font-medium">
          {miracle.full_story?.split('\n\n').map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>
      </div>

      {/* Spiritual Message & Sacred Scripture */}
      <div className="sacred-glass-card rounded-3xl p-6 sm:p-8 space-y-4 border border-amber-300 bg-gradient-to-r from-amber-100/70 via-white to-amber-100/70 text-center shadow-md">
        <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-amber-100 border border-amber-300 text-amber-700 mb-1 shadow-sm">
          <Heart className="w-5 h-5 fill-amber-500 text-amber-600" />
        </div>
        <h3 className="font-serif font-bold text-lg text-stone-900">
          Spiritual Significance for Your Life
        </h3>
        <p className="text-xs sm:text-sm text-stone-700 max-w-2xl mx-auto italic font-medium">
          &ldquo;{miracle.key_spiritual_message}&rdquo;
        </p>
        <p className="text-xs text-amber-900 font-mono font-bold pt-2">
          {miracle.scripture_verse}
        </p>
      </div>

      {/* Bottom CTA to Adoration or Prayer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-amber-200">
        <Link
          href="/adoration"
          className="gold-button w-full sm:w-auto px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md"
        >
          <Sparkles className="w-4 h-4" />
          <span>Enter Online Adoration Room</span>
        </Link>
        <Link
          href="/prayers"
          className="w-full sm:w-auto px-6 py-3.5 rounded-xl text-xs font-bold text-amber-950 bg-white border border-amber-300 hover:bg-amber-100 flex items-center justify-center gap-2 shadow-sm"
        >
          <span>Light a Candle for this Miracle</span>
        </Link>
      </div>
    </div>
  );
}
