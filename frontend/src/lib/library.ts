export type MediaType = 'MUSIC' | 'EBOOK' | 'ANIMATION' | 'MOVIE' | 'DOCUMENT';
export type MediaSourceType = 'EXTERNAL' | 'YOUTUBE' | 'VIMEO' | 'SOUNDCLOUD' | 'AUDIO' | 'PDF';

export interface MediaCategory { id: number; name: string; slug: string; description: string; }
export interface MediaCollection { id: number; title: string; slug: string; description: string; cover_image_url: string; order: number; }
export interface MediaItem {
  id: number; title: string; slug: string; content_type: MediaType; content_type_display: string;
  short_description: string; description: string; creator: string; language: string;
  duration_seconds: number | null; publication_year: number | null; age_guidance: string;
  cover_image_url: string; source_type: MediaSourceType; source_url: string; file_url: string;
  license_name: string; attribution: string; categories: MediaCategory[]; collections: MediaCollection[];
  is_featured: boolean; is_new: boolean; published_at: string | null; updated_at: string;
}

const browserApiUrl = '/api';
const vercelOrigin = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
const serverApiUrl = process.env.DJANGO_BACKEND_URL
  ? `${process.env.DJANGO_BACKEND_URL.replace(/\/$/, '')}/api`
  : process.env.NEXT_PUBLIC_SITE_URL
    ? `${process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '')}/api`
    : vercelOrigin ? `https://${vercelOrigin}/api` : null;

function apiBase() {
  const base = typeof window === 'undefined' ? serverApiUrl : browserApiUrl;
  if (!base) throw new Error('Django backend URL is not configured');
  return base;
}

async function fetchList<T>(path: string): Promise<T[]> {
  try {
    const response = await fetch(`${apiBase()}${path}`, { cache: 'no-store' });
    if (!response.ok) throw new Error('Library request failed');
    const data = await response.json();
    return Array.isArray(data) ? data : data.results || [];
  } catch {
    return [];
  }
}

export const fetchLibraryItems = () => fetchList<MediaItem>('/library/items/');
export const fetchLibraryCategories = () => fetchList<MediaCategory>('/library/categories/');
export const fetchLibraryCollections = () => fetchList<MediaCollection>('/library/collections/');

export async function fetchLibraryItem(slug: string): Promise<MediaItem | null> {
  try {
    const response = await fetch(`${apiBase()}/library/items/${encodeURIComponent(slug)}/`, { cache: 'no-store' });
    return response.ok ? response.json() : null;
  } catch {
    return null;
  }
}

export function formatDuration(seconds: number | null): string {
  if (!seconds) return '';
  const minutes = Math.floor(seconds / 60);
  const remaining = seconds % 60;
  return minutes >= 60 ? `${Math.floor(minutes / 60)}h ${minutes % 60}m` : `${minutes}:${String(remaining).padStart(2, '0')}`;
}
