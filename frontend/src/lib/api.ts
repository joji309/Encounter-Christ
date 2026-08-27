import { Miracle, PrayerIntention, DailyReflection, ApologeticsTopic, Event, INITIAL_MIRACLES, INITIAL_PRAYERS, INITIAL_DAILY_REFLECTION } from '@/data/miraclesData';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';

export async function fetchMiracles(params?: { category?: string; century?: string; search?: string; featured?: boolean }): Promise<Miracle[]> {
  try {
    const searchParams = new URLSearchParams();
    if (params?.category) searchParams.set('category', params.category);
    if (params?.century) searchParams.set('century', params.century);
    if (params?.search) searchParams.set('search', params.search);
    if (params?.featured) searchParams.set('featured', 'true');

    const res = await fetch(`${API_BASE_URL}/miracles/?${searchParams.toString()}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error('API fetch failed');
    const data = await res.json();
    return Array.isArray(data) ? data : data.results || INITIAL_MIRACLES;
  } catch {
    // Fallback to local dataset for instant offline / pre-rendered response
    let list = [...INITIAL_MIRACLES];
    if (params?.featured) {
      list = list.filter(m => m.is_featured);
    }
    if (params?.century) {
      list = list.filter(m => m.century.toLowerCase().includes(params.century!.toLowerCase()));
    }
    if (params?.search) {
      const q = params.search.toLowerCase();
      list = list.filter(m =>
        m.title.toLowerCase().includes(q) ||
        m.location_city.toLowerCase().includes(q) ||
        m.location_country.toLowerCase().includes(q) ||
        m.summary.toLowerCase().includes(q)
      );
    }
    return list;
  }
}

export async function fetchMiracleBySlug(slug: string): Promise<Miracle | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/miracles/${slug}/`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error('API fetch failed');
    return await res.json();
  } catch {
    const found = INITIAL_MIRACLES.find(m => m.slug === slug);
    return found || null;
  }
}

export async function fetchPrayerIntentions(): Promise<PrayerIntention[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/prayers/`, { cache: 'no-store' });
    if (!res.ok) throw new Error('API fetch failed');
    const data = await res.json();
    return Array.isArray(data) ? data : data.results || INITIAL_PRAYERS;
  } catch {
    return INITIAL_PRAYERS;
  }
}

export async function submitPrayerIntention(payload: { name: string; location?: string; category: string; intention_text: string }): Promise<{ success: boolean; data?: PrayerIntention }> {
  try {
    const res = await fetch(`${API_BASE_URL}/prayers/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Failed to submit intention');
    const data = await res.json();
    return { success: true, data };
  } catch {
    // Client-side fallback
    const mockNew: PrayerIntention = {
      id: Date.now(),
      name: payload.name || 'A Fellow Pilgrim',
      location: payload.location || '',
      category: payload.category,
      category_display: payload.category,
      intention_text: payload.intention_text,
      is_candle_lit: true,
      prayers_count: 1,
      created_at: 'Just now'
    };
    return { success: true, data: mockNew };
  }
}

export async function prayForIntention(id: number): Promise<{ success: boolean; newCount?: number }> {
  try {
    const res = await fetch(`${API_BASE_URL}/prayers/${id}/pray/`, {
      method: 'POST',
    });
    if (!res.ok) throw new Error('Pray action failed');
    const data = await res.json();
    return { success: true, newCount: data.prayers_count };
  } catch {
    return { success: true };
  }
}

export async function fetchDailyReflection(): Promise<DailyReflection> {
  try {
    const res = await fetch(`${API_BASE_URL}/reflections/today/`, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error('Reflection fetch failed');
    return await res.json();
  } catch {
    return INITIAL_DAILY_REFLECTION;
  }
}

export async function fetchEvents(): Promise<Event[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/events/`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error('Events fetch failed');
    const data = await res.json();
    return Array.isArray(data) ? data : data.results || [];
  } catch {
    return [];
  }
}
