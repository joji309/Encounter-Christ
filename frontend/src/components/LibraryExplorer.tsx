'use client';

import { useMemo, useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import MediaCard from './MediaCard';
import { MediaCategory, MediaItem, MediaType } from '@/lib/library';

const types: { value: 'ALL' | MediaType; label: string }[] = [
  { value: 'ALL', label: 'Everything' }, { value: 'MUSIC', label: 'Music' }, { value: 'EBOOK', label: 'E-books' },
  { value: 'ANIMATION', label: 'Animated videos' }, { value: 'MOVIE', label: 'Movies' }, { value: 'DOCUMENT', label: 'Documents' },
];

export default function LibraryExplorer({ items, categories, initialCollection = '' }: { items: MediaItem[]; categories: MediaCategory[]; initialCollection?: string }) {
  const [query, setQuery] = useState('');
  const [type, setType] = useState<'ALL' | MediaType>('ALL');
  const [category, setCategory] = useState('');
  const [collection, setCollection] = useState(initialCollection);
  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return items.filter((item) => (type === 'ALL' || item.content_type === type) && (!category || item.categories.some((entry) => entry.slug === category)) && (!collection || item.collections.some((entry) => entry.slug === collection)) && (!normalized || [item.title, item.creator, item.short_description, item.description, ...item.categories.map((entry) => entry.name)].join(' ').toLowerCase().includes(normalized)));
  }, [items, query, type, category, collection]);
  return (
    <section className="space-y-6">
      <div className="grid gap-3 rounded-2xl border border-amber-200 bg-white p-4 shadow-sm lg:grid-cols-[1fr_auto]">
        <label className="flex items-center gap-3 rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 focus-within:border-amber-500">
          <Search className="h-5 w-5 text-amber-700" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search songs, books, saints, topics…" className="w-full bg-transparent text-sm text-stone-900 outline-none placeholder:text-stone-400" />
        </label>
        <label className="flex items-center gap-2 rounded-xl border border-stone-200 bg-stone-50 px-3 text-sm text-stone-700"><SlidersHorizontal className="h-4 w-4 text-amber-700" /><span className="sr-only">Category</span><select value={category} onChange={(event) => setCategory(event.target.value)} className="bg-transparent py-3 outline-none"><option value="">All topics</option>{categories.map((entry) => <option key={entry.id} value={entry.slug}>{entry.name}</option>)}</select></label>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-2">{types.map((entry) => <button key={entry.value} onClick={() => setType(entry.value)} className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold transition ${type === entry.value ? 'bg-amber-700 text-white' : 'border border-amber-200 bg-white text-stone-700 hover:border-amber-400'}`}>{entry.label}</button>)}</div>
      {collection ? <button onClick={() => setCollection('')} className="text-xs font-bold text-amber-800 underline underline-offset-4">Showing a curated collection — show all resources</button> : null}
      <p className="text-sm text-stone-600">{filtered.length} {filtered.length === 1 ? 'resource' : 'resources'} available free to explore</p>
      {filtered.length ? <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{filtered.map((item) => <MediaCard key={item.id} item={item} />)}</div> : <div className="rounded-2xl border border-dashed border-amber-300 bg-amber-50 p-12 text-center"><h2 className="font-serif text-2xl font-bold text-stone-900">No resources match yet</h2><p className="mt-2 text-sm text-stone-600">Try another search or filter. The library will continue to grow.</p></div>}
    </section>
  );
}
