'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Sparkles, Activity, Dna, ArrowRight, Layers, Globe } from 'lucide-react';
import { Miracle } from '@/data/miraclesData';

// ─── Leaflet CSS injected once globally ──────────────────────────────────────
const LEAFLET_CSS = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';

interface MiracleMapProps {
  miracles: Miracle[];
}

export default function MiracleMap({ miracles }: MiracleMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<unknown>(null); // stores L.Map
  const markersRef = useRef<unknown[]>([]);

  const [selectedMiracle, setSelectedMiracle] = useState<Miracle | null>(miracles[0] || null);
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'EUROPE' | 'AMERICAS' | 'AFRICA'>('ALL');
  const [mapReady, setMapReady] = useState(false);

  const filteredMiracles = miracles.filter(m => {
    if (activeFilter === 'EUROPE') {
      return ['Italy', 'Poland', 'Portugal', 'France', 'Spain', 'Germany', 'Belgium'].some(c =>
        m.location_country.includes(c)
      );
    }
    if (activeFilter === 'AMERICAS') {
      return ['Argentina', 'Mexico', 'Brazil', 'USA', 'Canada', 'Colombia', 'Peru'].some(c =>
        m.location_country.includes(c)
      );
    }
    if (activeFilter === 'AFRICA') {
      return ['Nigeria', 'Congo', 'Kenya', 'Uganda', 'Tanzania', 'Egypt'].some(c =>
        m.location_country.includes(c)
      );
    }
    return true;
  });

  // ── Inject Leaflet CSS ────────────────────────────────────────────────────
  useEffect(() => {
    if (!document.querySelector(`link[href="${LEAFLET_CSS}"]`)) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = LEAFLET_CSS;
      document.head.appendChild(link);
    }
  }, []);

  // ── Build Leaflet Map ─────────────────────────────────────────────────────
  useEffect(() => {
    if (!mapContainerRef.current) return;

    let isMounted = true;

    const initMap = async () => {
      const L = (await import('leaflet')).default;

      if (!isMounted || !mapContainerRef.current) return;

      // Destroy previous instance if any
      if (mapInstanceRef.current) {
        (mapInstanceRef.current as { remove(): void }).remove();
        mapInstanceRef.current = null;
        markersRef.current = [];
      }

      // ── Create Map ──────────────────────────────────────────────────────
      const map = L.map(mapContainerRef.current!, {
        center: [30, 15],
        zoom: 2,
        minZoom: 2,
        maxZoom: 10,
        zoomControl: true,
        scrollWheelZoom: true,
        attributionControl: true,
      });

      mapInstanceRef.current = map;

      // ── Keyless OpenStreetMap layer ───────────────────────────────────────
      // Carto's public raster endpoint can show an "API KEY REQUIRED" overlay
      // in production. OpenStreetMap provides the same Leaflet-compatible
      // tiles without a client-side key and preserves the admin-managed pins.
      L.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 19,
        }
      ).addTo(map);

      // ── Custom Gold Divicon ─────────────────────────────────────────────
      const createGoldIcon = (selected = false) =>
        L.divIcon({
          className: '',
          html: `
            <div style="
              position: relative;
              width: ${selected ? 44 : 34}px;
              height: ${selected ? 44 : 34}px;
              display: flex;
              align-items: center;
              justify-content: center;
            ">
              <!-- pulsing ring -->
              <div style="
                position: absolute;
                width: 100%;
                height: 100%;
                border-radius: 50%;
                background: rgba(245,158,11,0.3);
                animation: miraclePulse 2s infinite;
              "></div>
              <!-- outer gold circle -->
              <div style="
                width: ${selected ? 28 : 22}px;
                height: ${selected ? 28 : 22}px;
                border-radius: 50%;
                background: ${selected ? '#B45309' : '#D97706'};
                border: ${selected ? '3px' : '2px'} solid #FFFFFF;
                box-shadow: 0 0 12px rgba(217,119,6,0.6), 0 2px 6px rgba(0,0,0,0.2);
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.3s ease;
                position: relative;
                z-index: 2;
              ">
                <div style="
                  width: 8px;
                  height: 8px;
                  border-radius: 50%;
                  background: #FEF9E7;
                "></div>
              </div>
            </div>
          `,
          iconSize: [selected ? 44 : 34, selected ? 44 : 34],
          iconAnchor: [selected ? 22 : 17, selected ? 22 : 17],
          popupAnchor: [0, selected ? -26 : -20],
        });

      // ── Inject pulse keyframe animation once ───────────────────────────
      if (!document.querySelector('#miracle-pin-style')) {
        const style = document.createElement('style');
        style.id = 'miracle-pin-style';
        style.textContent = `
          @keyframes miraclePulse {
            0% { transform: scale(1); opacity: 0.7; }
            50% { transform: scale(1.6); opacity: 0.2; }
            100% { transform: scale(1); opacity: 0.7; }
          }
          .leaflet-container { font-family: 'Georgia', serif; }
          .leaflet-control-attribution { font-size: 10px !important; }
          .leaflet-bar a {
            background: #FFFDF5 !important;
            color: #92400E !important;
            border-color: #FCD34D !important;
          }
          .leaflet-bar a:hover {
            background: #FEF3C7 !important;
          }
        `;
        document.head.appendChild(style);
      }

      // ── Place Markers ───────────────────────────────────────────────────
      const validMiracles = miracles.filter(
        m => m.latitude !== undefined && m.latitude !== null && m.longitude !== undefined && m.longitude !== null
      );

      validMiracles.forEach((miracle, idx) => {
        const lat = Number(miracle.latitude);
        const lng = Number(miracle.longitude);
        if (isNaN(lat) || isNaN(lng)) return;

        const marker = L.marker([lat, lng], {
          icon: createGoldIcon(idx === 0),
          title: miracle.title,
          alt: miracle.location_city,
        }).addTo(map);

        // Tooltip label always visible
        marker.bindTooltip(
          `<div style="
            background: #FFFDF5;
            border: 1px solid #FCD34D;
            border-radius: 8px;
            padding: 4px 8px;
            font-size: 11px;
            font-family: Georgia, serif;
            font-weight: bold;
            color: #92400E;
            white-space: nowrap;
            box-shadow: 0 2px 6px rgba(0,0,0,0.12);
          ">${miracle.location_city}, ${miracle.location_country}<br/><span style="font-size:9px;color:#B45309;">${miracle.year_occurred}</span></div>`,
          { permanent: true, direction: 'top', offset: [0, -8], className: 'miracle-tooltip' }
        );

        marker.on('click', () => {
          // Update all marker icons
          markersRef.current.forEach((m, i) => {
            (m as { setIcon(icon: unknown): void }).setIcon(createGoldIcon(i === idx));
          });
          setSelectedMiracle(miracle);
          map.flyTo([lat, lng], 6, { duration: 1.2 });
        });

        markersRef.current.push(marker);
      });

      // Fit map to all markers bounds if there are enough
      if (validMiracles.length >= 2) {
        const group = L.featureGroup(markersRef.current as L.Layer[]);
        map.fitBounds(group.getBounds().pad(0.25));
      }

      setMapReady(true);
    };

    initMap();

    return () => {
      isMounted = false;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only on mount

  // ── Re-render markers when filter changes ─────────────────────────────────
  useEffect(() => {
    if (!mapInstanceRef.current || markersRef.current.length === 0) return;
    const L_map = mapInstanceRef.current as {
      fitBounds(b: unknown, opts?: unknown): void;
    };

    markersRef.current.forEach((m) => {
      const marker = m as {
        options: { title: string };
        setOpacity(n: number): void;
        getLatLng(): { lat: number; lng: number };
      };
      const miracle = miracles.find(mi => mi.title === marker.options.title);
      if (!miracle) return;
      const visible = filteredMiracles.some(fm => fm.id === miracle.id);
      marker.setOpacity(visible ? 1 : 0.15);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFilter]);

  return (
    <div className="space-y-6">
      {/* Filter + Legend Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {[
            { key: 'ALL', label: '🌍 All Miracles' },
            { key: 'EUROPE', label: '🏰 Europe' },
            { key: 'AMERICAS', label: '🌎 Americas' },
            { key: 'AFRICA', label: '🌍 Africa' },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveFilter(key as typeof activeFilter)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeFilter === key
                  ? 'bg-amber-500 text-white shadow-md'
                  : 'bg-amber-100/80 text-amber-900 border border-amber-300 hover:bg-amber-200'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 text-xs text-amber-800 font-medium">
          <div className="w-3 h-3 rounded-full bg-amber-500 ring-2 ring-amber-300 animate-pulse" />
          <span>Click a golden pin to inspect the dossier</span>
        </div>
      </div>

      {/* Map + Drawer Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* ── Leaflet Map Container ─────────────────────────────────────── */}
        <div className="lg:col-span-8 rounded-3xl overflow-hidden border border-amber-300 shadow-xl relative" style={{ minHeight: '480px' }}>
          {/* Loading overlay */}
          {!mapReady && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-amber-50">
              <div className="text-center space-y-3">
                <Globe className="w-10 h-10 text-amber-500 animate-spin mx-auto" />
                <p className="text-xs text-amber-800 font-serif font-bold">Loading Sacred Map…</p>
              </div>
            </div>
          )}
          {/* The actual Leaflet map div */}
          <div
            ref={mapContainerRef}
            className="w-full h-full"
            style={{ minHeight: '480px', zIndex: 0 }}
          />
          {/* Attribution overlay */}
          <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-4 py-2 bg-amber-50/80 backdrop-blur-sm border-t border-amber-200 text-[10px] text-amber-900 font-mono z-[1000]">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-amber-600" />
              Lat/Lng Georeferenced — All {miracles.length} Documented Miracles
            </span>
            <span>Managed via Django Admin Panel</span>
          </div>
        </div>

        {/* ── Selected Miracle Inspection Drawer ───────────────────────── */}
        <div className="lg:col-span-4 sacred-glass-card rounded-3xl p-6 border border-amber-400/60 space-y-5 flex flex-col shadow-2xl bg-white/95">
          {selectedMiracle ? (
            <div className="space-y-4">
              {/* Cover Image */}
              <div className="relative h-44 w-full rounded-2xl overflow-hidden bg-amber-100 shadow-md">
                <Image
                  src={selectedMiracle.cover_image_url || '/logo.png'}
                  alt={selectedMiracle.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover"
                />
                <div className="absolute top-2 right-2 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500 text-white shadow">
                  {selectedMiracle.century}
                </div>
              </div>

              {/* Location & Title */}
              <div>
                <div className="flex items-center gap-1.5 text-xs text-amber-700 font-semibold mb-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-600" />
                  <span>
                    {selectedMiracle.location_city}, {selectedMiracle.location_country} ({selectedMiracle.year_occurred})
                  </span>
                </div>
                <h3 className="font-serif text-lg font-bold text-stone-900 leading-snug">
                  {selectedMiracle.title}
                </h3>
                <p className="text-xs text-stone-700 mt-2 line-clamp-3 leading-relaxed">
                  {selectedMiracle.summary}
                </p>
              </div>

              {/* Forensic Badges */}
              <div className="bg-amber-50/80 p-3.5 rounded-xl border border-amber-200 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-stone-600 flex items-center gap-1">
                    <Activity className="w-3.5 h-3.5 text-red-600" /> Blood Group:
                  </span>
                  <span className="font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded border border-red-300">
                    {selectedMiracle.blood_type || 'AB Positive'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-600 flex items-center gap-1">
                    <Dna className="w-3.5 h-3.5 text-amber-700" /> Tissue:
                  </span>
                  <span className="font-semibold text-amber-900">
                    {selectedMiracle.tissue_type || 'Left Ventricle Heart'}
                  </span>
                </div>
                {selectedMiracle.latitude && selectedMiracle.longitude && (
                  <div className="flex items-center justify-between pt-1 border-t border-amber-200">
                    <span className="text-stone-500 flex items-center gap-1">
                      <Layers className="w-3.5 h-3.5 text-amber-600" /> Coordinates:
                    </span>
                    <span className="font-mono text-[10px] text-amber-800">
                      {Number(selectedMiracle.latitude).toFixed(3)}°, {Number(selectedMiracle.longitude).toFixed(3)}°
                    </span>
                  </div>
                )}
              </div>

              {/* CTA Button */}
              <Link
                href={`/miracles/${selectedMiracle.slug}`}
                className="gold-button w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <span>Read Full Forensic Dossier</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="text-center py-12 space-y-3">
              <Globe className="w-10 h-10 text-amber-300 mx-auto" />
              <p className="text-stone-500 text-xs font-serif">
                Select a golden pin on the map to inspect the miracle dossier.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
