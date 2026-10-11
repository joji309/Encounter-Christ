import Link from 'next/link';
import { BookOpen, FileText, Film, Music2, PlayCircle } from 'lucide-react';
import { MediaItem, formatDuration } from '@/lib/library';

const typeIcon = { MUSIC: Music2, EBOOK: BookOpen, ANIMATION: PlayCircle, MOVIE: Film, DOCUMENT: FileText };

export default function MediaCard({ item }: { item: MediaItem }) {
  const Icon = typeIcon[item.content_type];
  return (
    <Link href={`/library/${item.slug}`} className="group block overflow-hidden rounded-2xl border border-amber-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-amber-400 hover:shadow-lg">
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-amber-100 via-stone-100 to-amber-50">
        {item.cover_image_url ? <img src={item.cover_image_url} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /> : <Icon className="absolute inset-0 m-auto h-14 w-14 text-amber-700" />}
        <div className="absolute left-3 top-3 rounded-full bg-stone-950/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-100">{item.content_type_display}</div>
        {item.is_new && <div className="absolute right-3 top-3 rounded-full bg-amber-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">New</div>}
      </div>
      <div className="space-y-2 p-4">
        <p className="line-clamp-1 text-xs font-bold uppercase tracking-wider text-amber-700">{item.creator || 'Encounter Christ Library'}</p>
        <h3 className="line-clamp-2 font-serif text-lg font-bold leading-tight text-stone-900 group-hover:text-amber-800">{item.title}</h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-stone-600">{item.short_description}</p>
        <div className="flex flex-wrap gap-2 pt-1 text-xs text-stone-500">
          {item.duration_seconds ? <span>{formatDuration(item.duration_seconds)}</span> : null}
          {item.language ? <span>{item.language}</span> : null}
        </div>
      </div>
    </Link>
  );
}
