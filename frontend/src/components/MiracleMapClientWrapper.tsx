'use client';

import dynamic from 'next/dynamic';
import { Globe } from 'lucide-react';
import { Miracle } from '@/data/miraclesData';

// Leaflet requires window — must be loaded client-side only
const MiracleMap = dynamic(() => import('@/components/MiracleMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full rounded-3xl bg-amber-50 border border-amber-200 flex items-center justify-center" style={{ minHeight: '520px' }}>
      <div className="text-center space-y-3">
        <Globe className="w-10 h-10 text-amber-400 animate-spin mx-auto" />
        <p className="text-xs text-amber-700 font-serif font-bold">Loading Interactive Miracle Map…</p>
        <p className="text-[10px] text-amber-600">Placing sacred pins on the world map</p>
      </div>
    </div>
  ),
});

interface MiracleMapClientWrapperProps {
  miracles: Miracle[];
}

export default function MiracleMapClientWrapper({ miracles }: MiracleMapClientWrapperProps) {
  return <MiracleMap miracles={miracles} />;
}
