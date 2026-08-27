'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, Sparkles, Flame, Compass, BookOpen, HeartHandshake, Share2, Map } from 'lucide-react';
import AmbientAudioPlayer from './AmbientAudioPlayer';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'Miracles', href: '/miracles', icon: Sparkles },
    { name: 'Interactive Map', href: '/map', icon: Map },
    { name: 'Forensic Science', href: '/science', icon: Compass },
    { name: 'Adoration Room', href: '/adoration', icon: Flame },
    { name: 'Return Home', href: '/return-home', icon: HeartHandshake },
    { name: 'Prayer Wall', href: '/prayers', icon: Flame },
    { name: 'Faith & Answers', href: '/apologetics', icon: BookOpen },
    { name: 'Share Jesus', href: '/share', icon: Share2 },
  ];

  return (
    <header className="sticky top-0 z-50 sacred-glass border-b border-amber-300/60 shadow-md">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between gap-3 h-16 sm:h-20">
          
          {/* Brand Logo */}
          <Link href="/" className="flex min-w-0 items-center gap-2 sm:gap-3 group">
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 shrink-0 flex items-center justify-center transition-all group-hover:scale-110 duration-300">
              <Image
                src="/logo.png"
                alt="Encounter Christ Logo"
                width={48}
                height={48}
                className="object-contain filter drop-shadow-[0_2px_8px_rgba(217,119,6,0.3)]"
                priority
              />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1 sm:gap-1.5 whitespace-nowrap">
                <span className="font-serif tracking-[0.12em] sm:tracking-widest text-sm sm:text-lg font-extrabold text-stone-900 group-hover:text-amber-800 transition-colors">
                  ENCOUNTER
                </span>
                <span className="font-serif tracking-[0.12em] sm:tracking-widest text-sm sm:text-lg font-extrabold gold-gradient-text">
                  CHRIST
                </span>
              </div>
              <p className="hidden sm:block text-[10px] tracking-widest uppercase text-amber-800 font-semibold font-mono">
                The Real Presence & Eucharistic Miracles
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden 2xl:flex items-center gap-1.5">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-[11px] font-bold leading-tight transition-all whitespace-nowrap ${
                    isActive
                      ? 'text-amber-900 bg-amber-200/60 border border-amber-300 shadow-sm'
                      : 'text-stone-700 hover:text-amber-900 hover:bg-amber-100/50'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-700' : 'text-amber-600'}`} />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action: Ambient Sound Player */}
          <div className="hidden 2xl:flex items-center gap-3">
            <AmbientAudioPlayer />
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex shrink-0 items-center gap-2 2xl:hidden">
            <div className="hidden sm:block">
              <AmbientAudioPlayer />
            </div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-stone-700 hover:text-stone-900 hover:bg-amber-100 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="2xl:hidden sacred-glass border-t border-amber-300/60 px-4 pt-3 pb-6 space-y-2 bg-[#FFFDF5]">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                  isActive
                    ? 'text-amber-950 bg-amber-200/80 border border-amber-300 shadow-sm'
                    : 'text-stone-800 hover:text-amber-900 hover:bg-amber-100/60'
                }`}
              >
                <Icon className="w-4 h-4 text-amber-700" />
                {link.name}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
