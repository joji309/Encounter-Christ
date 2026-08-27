import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="sacred-glass border-t border-amber-300/80 mt-20 pt-16 pb-12 text-stone-600 text-sm bg-gradient-to-b from-[#FFFDF5] to-[#FEF9E7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Sacred Quote */}
        <div className="text-center max-w-3xl mx-auto pb-12 border-b border-amber-200/80 mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-amber-50 border border-amber-300/80 mb-4 animate-divine-pulse shadow-sm">
            <Image
              src="/logo.png"
              alt="Monstrance Logo"
              width={36}
              height={36}
              className="object-contain"
            />
          </div>
          <blockquote className="font-serif italic text-lg text-stone-900 mb-2 font-medium">
            &ldquo;I am the living bread that came down from heaven. If anyone eats of this bread, he will live forever.&rdquo;
          </blockquote>
          <p className="text-amber-700 text-xs font-mono font-bold tracking-wider">— JOHN 6:51</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Col 1: About & Mission */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <Image
                src="/logo.png"
                alt="Encounter Christ Logo"
                width={28}
                height={28}
                className="object-contain filter drop-shadow-[0_1px_4px_rgba(217,119,6,0.2)]"
              />
              <span className="font-serif font-bold text-stone-900 tracking-wider">ENCOUNTER CHRIST</span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              A Catholic evangelization platform illuminating the forensic reality of Eucharistic Miracles, guiding souls back to the Sacraments, and cultivating personal encounter with Jesus Christ in the Blessed Sacrament.
            </p>
            <p className="text-[11px] text-amber-800 font-bold font-mono">
              Ad Maiorem Dei Gloriam (AMDG)
            </p>
          </div>

          {/* Col 2: The Spiritual Pathways */}
          <div>
            <h4 className="font-serif font-bold text-stone-900 mb-3 text-sm tracking-wide flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              Spiritual Pathways
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li><Link href="/miracles" className="hover:text-amber-700 transition-colors">Eucharistic Miracles Explorer</Link></li>
              <li><Link href="/map" className="hover:text-amber-700 transition-colors">Interactive Miracle Map</Link></li>
              <li><Link href="/science" className="hover:text-amber-700 transition-colors">Forensic & Medical Dossier</Link></li>
              <li><Link href="/return-home" className="hover:text-amber-700 transition-colors">Coming Home & Confession Guide</Link></li>
              <li><Link href="/adoration" className="hover:text-amber-700 transition-colors">Virtual Adoration Room</Link></li>
              <li><Link href="/prayers" className="hover:text-amber-700 transition-colors">Prayer Intentions & Candles</Link></li>
            </ul>
          </div>

          {/* Col 3: Catholic Resources */}
          <div>
            <h4 className="font-serif font-bold text-stone-900 mb-3 text-sm tracking-wide">
              Catholic Resources
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <a href="https://www.vatican.va" target="_blank" rel="noopener noreferrer" className="hover:text-amber-700 transition-colors inline-flex items-center gap-1">
                  The Holy See (Vatican) <ExternalLink className="w-3 h-3 text-amber-600" />
                </a>
              </li>
              <li>
                <a href="http://www.therealpresence.org" target="_blank" rel="noopener noreferrer" className="hover:text-amber-700 transition-colors inline-flex items-center gap-1">
                  The Real Presence Association <ExternalLink className="w-3 h-3 text-amber-600" />
                </a>
              </li>
              <li>
                <a href="http://www.miracolieucaristici.org" target="_blank" rel="noopener noreferrer" className="hover:text-amber-700 transition-colors inline-flex items-center gap-1">
                  Bl. Carlo Acutis Miracles Exhibition <ExternalLink className="w-3 h-3 text-amber-600" />
                </a>
              </li>
              <li>
                <a href="https://masstimes.org" target="_blank" rel="noopener noreferrer" className="hover:text-amber-700 transition-colors inline-flex items-center gap-1">
                  Find Mass & Adoration Near You <ExternalLink className="w-3 h-3 text-amber-600" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Daily Prayer */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-stone-900 text-sm tracking-wide">
              Eucharistic Prayer
            </h4>
            <p className="text-xs italic text-stone-700 bg-amber-100/60 p-3 rounded-xl border border-amber-200">
              &ldquo;My God, I believe, I adore, I hope and I love Thee! I beg pardon for those who do not believe, do not adore, do not hope and do not love Thee.&rdquo;
            </p>
            <p className="text-[11px] text-amber-800 font-bold font-mono">— The Angel of Fatima (1916)</p>
          </div>
        </div>

        {/* Bottom copyright & attribution */}
        <div className="pt-8 border-t border-amber-200/80 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} Encounter Christ. All Glory be to God the Father, the Son, and the Holy Spirit.</p>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <Link href="/apologetics" className="hover:text-amber-800 transition-colors">Catholic Answers</Link>
            <span>•</span>
            <Link href="/share" className="hover:text-amber-800 transition-colors">Share Jesus</Link>
            <span>•</span>
            <a href="http://127.0.0.1:8000/admin/" target="_blank" rel="noopener noreferrer" className="hover:text-amber-800 transition-colors">Django Admin</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
