'use client';

import { useMemo, useState } from 'react';
import { CalendarDays, ChevronLeft, ChevronRight, Clock3, MapPin } from 'lucide-react';
import type { Event } from '@/data/miraclesData';

const categoryStyles: Record<string, string> = {
  FEAST: 'bg-amber-100 text-amber-800 border-amber-200',
  ADORATION: 'bg-violet-100 text-violet-800 border-violet-200',
  PARISH: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  PRAYER: 'bg-sky-100 text-sky-800 border-sky-200',
  OTHER: 'bg-stone-100 text-stone-700 border-stone-200',
};

const pad = (value: number) => String(value).padStart(2, '0');

export default function EventCalendar({ events, initialMonth }: { events: Event[]; initialMonth: string }) {
  const [month, setMonth] = useState(() => `${initialMonth}-01`);
  const monthDate = new Date(`${month}T12:00:00`);
  const year = monthDate.getFullYear();
  const monthIndex = monthDate.getMonth();
  const firstDay = new Date(year, monthIndex, 1).getDay();
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const monthKey = `${year}-${pad(monthIndex + 1)}`;

  const eventsInMonth = useMemo(() => events.filter(event => event.event_date.slice(0, 7) === monthKey), [events, monthKey]);
  const eventDays = useMemo(() => new Set(eventsInMonth.map(event => Number(event.event_date.slice(8, 10)))), [eventsInMonth]);
  const upcoming = [...events]
    .sort((a, b) => new Date(a.event_date).getTime() - new Date(b.event_date).getTime())
    .slice(0, 4);

  const shiftMonth = (amount: number) => {
    const next = new Date(year, monthIndex + amount, 1);
    setMonth(`${next.getFullYear()}-${pad(next.getMonth() + 1)}-01`);
  };

  const formatEventTime = (date: string) => new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', timeZone: 'UTC' }).format(new Date(date));

  return (
    <section className="sacred-glass-card rounded-3xl border border-amber-300/70 p-5 sm:p-8 shadow-xl" aria-labelledby="events-heading">
      <div className="mb-6 text-center">
        <div className="mb-2 inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-[0.3em] text-amber-700">
          <span className="h-px w-8 bg-amber-400" /> Sacred Timeline <span className="h-px w-8 bg-amber-400" />
        </div>
        <h2 id="events-heading" className="font-serif text-3xl font-bold text-stone-900 sm:text-4xl">Event Calendar</h2>
        <p className="mx-auto mt-2 max-w-2xl text-sm text-stone-600">Stay connected with upcoming liturgical events, parish schedules, and moments of prayer.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-2xl border border-amber-200 bg-white/85 p-4 sm:p-6">
          <div className="mb-5 flex items-center justify-between gap-2">
            <h3 className="font-serif text-xl font-bold text-amber-700 sm:text-2xl">
              {new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(monthDate)}
            </h3>
            <div className="flex gap-1">
              <button type="button" onClick={() => shiftMonth(-1)} aria-label="Previous month" className="rounded-xl p-2 text-amber-700 hover:bg-amber-100"><ChevronLeft className="h-5 w-5" /></button>
              <button type="button" onClick={() => shiftMonth(1)} aria-label="Next month" className="rounded-xl p-2 text-amber-700 hover:bg-amber-100"><ChevronRight className="h-5 w-5" /></button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-bold uppercase tracking-wider text-stone-400 sm:gap-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => <span key={day} className="py-2">{day.slice(0, 1)}<span className="hidden sm:inline">{day.slice(1)}</span></span>)}
            {Array.from({ length: firstDay }, (_, index) => <span key={`blank-${index}`} />)}
            {Array.from({ length: daysInMonth }, (_, index) => {
              const day = index + 1;
              const now = new Date();
              const isToday = now.getUTCFullYear() === year && now.getUTCMonth() === monthIndex && now.getUTCDate() === day;
              return <span key={day} className={`relative flex aspect-square items-center justify-center rounded-full text-sm ${isToday ? 'bg-amber-600 font-bold text-white shadow-md' : eventDays.has(day) ? 'font-bold text-amber-800' : 'text-stone-700'}`}><span>{day}</span>{eventDays.has(day) && !isToday && <i className="absolute bottom-1 h-1 w-1 rounded-full bg-amber-500" />}</span>;
            })}
          </div>
          {eventsInMonth.length === 0 && <p className="mt-5 text-center text-xs text-stone-500">No published events this month.</p>}
        </div>

        <div className="rounded-2xl border border-amber-200 bg-white/85 p-4 sm:p-6">
          <div className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-amber-700"><CalendarDays className="h-4 w-4" /> Upcoming Events</div>
          <div className="space-y-3">
            {upcoming.map(event => <article key={event.id} className="rounded-xl border border-amber-100 bg-amber-50/30 p-4">
              <div className="flex gap-3">
                <div className="min-w-[3rem] text-center font-serif font-bold leading-tight text-amber-800"><div className="text-xl">{new Date(event.event_date).getUTCDate()}</div><div className="text-[10px] uppercase">{new Intl.DateTimeFormat('en-US', { month: 'short', timeZone: 'UTC' }).format(new Date(event.event_date))}</div></div>
                <div className="min-w-0 flex-1"><span className={`inline-block rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${categoryStyles[event.category] || categoryStyles.OTHER}`}>{event.category_display || event.category}</span><h4 className="mt-1 font-serif text-sm font-bold text-stone-900 sm:text-base">{event.title}</h4><div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-stone-500"><span className="inline-flex items-center gap-1"><Clock3 className="h-3 w-3" /> {formatEventTime(event.event_date)}</span>{event.location && <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" /> {event.location}</span>}</div></div>
              </div>
            </article>)}
            {upcoming.length === 0 && <p className="py-8 text-center text-sm text-stone-500">Events will appear here when published in the admin panel.</p>}
          </div>
        </div>
      </div>
    </section>
  );
}
