import { BookOpen, Heart, LibraryBig, Music2, Sparkles } from 'lucide-react';
import Link from 'next/link';
import LibraryExplorer from '@/components/LibraryExplorer';
import MediaCard from '@/components/MediaCard';
import { fetchLibraryCategories, fetchLibraryCollections, fetchLibraryItems } from '@/lib/library';

export const metadata = { title: 'Free Catholic Media Library', description: 'Explore free, credited Catholic music, books, films, animations, and documents.' };

export default async function LibraryPage({ searchParams }: { searchParams: Promise<{ collection?: string }> }) {
  const { collection: selectedCollection = '' } = await searchParams;
  const [items, categories, collections] = await Promise.all([fetchLibraryItems(), fetchLibraryCategories(), fetchLibraryCollections()]);
  const featured = items.filter((item) => item.is_featured).slice(0, 4);
  return <div className="min-h-screen bg-gradient-to-b from-amber-50 via-[#fffdf7] to-stone-100 py-10 sm:py-14">
    <div className="mx-auto max-w-7xl space-y-12 px-4 sm:px-6 lg:px-8">
      <section className="relative overflow-hidden rounded-3xl border border-amber-300 bg-stone-950 px-6 py-12 text-white shadow-2xl sm:px-12 sm:py-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(217,119,6,.4),transparent_38%)]" />
        <div className="relative max-w-3xl space-y-5"><p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.22em] text-amber-300"><Sparkles className="h-4 w-4" />Open to every pilgrim</p><h1 className="font-serif text-4xl font-bold leading-tight sm:text-6xl">A free library for the Catholic journey.</h1><p className="max-w-2xl text-base leading-relaxed text-stone-200 sm:text-lg">Listen, watch, read, and pray—without creating an account. Every resource is chosen and credited by Encounter Christ.</p><div className="flex flex-wrap gap-3 pt-2 text-sm font-semibold text-amber-100"><span className="flex items-center gap-2"><Music2 className="h-4 w-4" />Music</span><span className="flex items-center gap-2"><BookOpen className="h-4 w-4" />Books</span><span className="flex items-center gap-2"><LibraryBig className="h-4 w-4" />Films & documents</span></div></div>
      </section>
      {featured.length > 0 ? <section className="space-y-5"><div><p className="text-xs font-bold uppercase tracking-widest text-amber-700">Chosen for you</p><h2 className="font-serif text-3xl font-bold text-stone-900">Featured encounters</h2></div><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{featured.map((item) => <MediaCard key={item.id} item={item} />)}</div></section> : null}
      {collections.length > 0 ? <section className="space-y-5"><div><p className="text-xs font-bold uppercase tracking-widest text-amber-700">Admin-curated shelves</p><h2 className="font-serif text-3xl font-bold text-stone-900">Explore a collection</h2></div><div className="grid gap-4 md:grid-cols-3">{collections.map((collection) => <Link href={`/library?collection=${encodeURIComponent(collection.slug)}#library-search`} key={collection.id} className="rounded-2xl border border-amber-200 bg-white p-5 transition hover:border-amber-400 hover:shadow-md"><Heart className="mb-3 h-5 w-5 text-amber-700" /><h3 className="font-serif text-xl font-bold text-stone-900">{collection.title}</h3><p className="mt-2 text-sm text-stone-600">{collection.description || 'A curated selection for prayer and formation.'}</p></Link>)}</div></section> : null}
      <div id="library-search"><div className="mb-5"><p className="text-xs font-bold uppercase tracking-widest text-amber-700">All free resources</p><h2 className="font-serif text-3xl font-bold text-stone-900">Find what you need today</h2></div><LibraryExplorer items={items} categories={categories} initialCollection={selectedCollection} /></div>
    </div>
  </div>;
}
