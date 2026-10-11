'use client';

import { ExternalLink, FileText, Headphones, Play, ShieldCheck } from 'lucide-react';
import { MediaItem } from '@/lib/library';

function embedUrl(item: MediaItem): string | null {
  if (item.source_type === 'YOUTUBE') {
    const match = item.source_url.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([^?&/]+)/);
    return match ? `https://www.youtube-nocookie.com/embed/${match[1]}` : null;
  }
  if (item.source_type === 'VIMEO') {
    const match = item.source_url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
    return match ? `https://player.vimeo.com/video/${match[1]}` : null;
  }
  return null;
}

export default function MediaExperience({ item }: { item: MediaItem }) {
  const embed = embedUrl(item);
  const audioUrl = item.source_type === 'AUDIO' ? item.file_url || item.source_url : '';
  const pdfUrl = item.source_type === 'PDF' ? item.file_url || item.source_url : '';
  return (
    <div className="space-y-5">
      {embed ? <div className="aspect-video overflow-hidden rounded-2xl bg-stone-950 shadow-xl"><iframe title={item.title} src={embed} className="h-full w-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /></div> : null}
      {audioUrl ? <div className="rounded-2xl bg-stone-900 p-6 text-white shadow-xl"><div className="mb-4 flex items-center gap-3"><Headphones className="h-6 w-6 text-amber-300" /><span className="font-serif text-xl font-bold">Listen freely</span></div><audio controls preload="metadata" className="w-full" src={audioUrl}>Your browser does not support audio playback.</audio></div> : null}
      {pdfUrl ? <div className="overflow-hidden rounded-2xl border border-amber-200 bg-white shadow-lg"><div className="flex items-center justify-between gap-3 border-b border-amber-100 p-4"><span className="flex items-center gap-2 text-sm font-bold text-stone-800"><FileText className="h-5 w-5 text-amber-700" />Read in your browser</span><a href={pdfUrl} target="_blank" rel="noreferrer" className="text-xs font-bold text-amber-800 hover:text-amber-950">Open full document</a></div><iframe title={`Read ${item.title}`} src={pdfUrl} className="h-[72vh] w-full" /></div> : null}
      {!embed && !audioUrl && !pdfUrl ? <a href={item.source_url} target="_blank" rel="noreferrer" className="flex w-fit items-center gap-2 rounded-xl bg-amber-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-amber-800"><Play className="h-4 w-4" />Open the free resource <ExternalLink className="h-4 w-4" /></a> : null}
      <div className="flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-stone-700"><ShieldCheck className="h-5 w-5 shrink-0 text-amber-700" /><p><strong>Free and credited:</strong> {item.attribution} Licence: {item.license_name}.</p></div>
    </div>
  );
}
