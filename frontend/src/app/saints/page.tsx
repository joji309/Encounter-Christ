import { CalendarDays, Cross, Heart, Quote, Sparkles } from 'lucide-react';
import { fetchEucharisticSaints } from '@/lib/api';

export const metadata = {
  title: 'Saints of the Eucharist',
  description: 'Meet Catholic saints whose lives were formed by love for Jesus in the Holy Eucharist.',
};

function LifeDates({ birth, death }: { birth: string; death: string }) {
  if (!birth && !death) return null;
  return <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-amber-900">
    <CalendarDays className="h-4 w-4 text-amber-700" />
    <span>Born: {birth || 'Unknown'}</span>
    <span className="text-amber-400">•</span>
    <span>Died: {death || 'Unknown'}</span>
  </div>;
}

export default async function SaintsPage() {
  const saints = await fetchEucharisticSaints();
  return <div className="min-h-screen py-12 sm:py-16">
    <div className="mx-auto max-w-7xl space-y-12 px-4 sm:px-6 lg:px-8">
      <header className="mx-auto max-w-3xl text-center space-y-5">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-300 bg-amber-100 px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-widest text-amber-900 shadow-sm"><Sparkles className="h-3.5 w-3.5 text-amber-700" />Witnesses of the Real Presence</div>
        <h1 className="font-serif text-4xl font-extrabold tracking-tight text-stone-900 sm:text-6xl">Saints of the Eucharist</h1>
        <p className="text-sm font-medium leading-relaxed text-stone-700 sm:text-base">Discover holy men and women whose lives were transformed by adoration, Holy Communion, and love for Jesus Christ truly present in the Blessed Sacrament.</p>
      </header>

      {saints.length === 0 ? <section className="mx-auto max-w-xl rounded-3xl border border-dashed border-amber-300 bg-white/80 px-6 py-14 text-center shadow-sm"><Heart className="mx-auto h-11 w-11 text-amber-500" /><h2 className="mt-4 font-serif text-2xl font-bold text-stone-900">The saints will appear here soon</h2><p className="mt-3 text-sm leading-relaxed text-stone-600">This page is curated through the Encounter Christ admin panel. Check back as more Eucharistic witnesses are added.</p></section> : <section className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">{saints.map((saint) => <article key={saint.id} className="group flex flex-col overflow-hidden rounded-3xl border border-amber-300/80 bg-white/95 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
        <div className="relative flex h-64 items-center justify-center overflow-hidden bg-gradient-to-br from-amber-100 via-stone-100 to-amber-50 p-3">
          {saint.portrait_url ? <img src={saint.portrait_url} alt={`Portrait of ${saint.name}`} className="h-full w-full rounded-2xl object-contain transition-transform duration-700 group-hover:scale-[1.02]" /> : <Cross className="absolute inset-0 m-auto h-16 w-16 text-amber-600/70" />}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-stone-950/80 to-transparent" />
          {saint.feast_day ? <div className="absolute bottom-4 left-4 rounded-full border border-amber-200 bg-white/95 px-3 py-1 text-[11px] font-bold text-amber-900 shadow-sm">Feast: {saint.feast_day}</div> : null}
        </div>
        <div className="flex flex-1 flex-col space-y-4 p-6">
          <div className="space-y-3"><h2 className="font-serif text-2xl font-bold text-stone-900 transition-colors group-hover:text-amber-800">{saint.name}</h2><LifeDates birth={saint.date_of_birth} death={saint.date_of_death} /><p className="text-sm leading-relaxed text-stone-700">{saint.short_bio}</p></div>
          <div className="rounded-2xl border border-amber-200 bg-amber-50/90 p-4"><div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800"><Heart className="h-4 w-4 fill-amber-600 text-amber-600" />Eucharistic witness</div><p className="text-sm leading-relaxed text-stone-800">{saint.eucharistic_witness}</p></div>
          {saint.quote ? <blockquote className="mt-auto border-l-2 border-amber-500 pl-4 font-serif text-sm italic leading-relaxed text-stone-700"><Quote className="mb-1 h-4 w-4 text-amber-600" />{saint.quote}</blockquote> : null}
        </div>
      </article>)}</section>}
    </div>
  </div>;
}
