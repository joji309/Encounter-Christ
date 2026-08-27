'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';

export default function AmbientAudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);

  // Sacred harmonic frequencies (Chant drone in D Minor / Gregorian Dorian scale: D, A, F, D octave)
  const frequencies = [73.42, 110.00, 146.83, 220.00, 293.66, 349.23, 440.00];

  const toggleAudio = () => {
    if (!hasStarted) {
      startSacredChant();
      setHasStarted(true);
      setIsPlaying(true);
      return;
    }

    if (isPlaying) {
      if (gainNodeRef.current && audioCtxRef.current) {
        gainNodeRef.current.gain.setTargetAtTime(0, audioCtxRef.current.currentTime, 0.5);
      }
      setIsPlaying(false);
    } else {
      if (audioCtxRef.current?.state === 'suspended') {
        audioCtxRef.current.resume();
      }
      if (gainNodeRef.current && audioCtxRef.current) {
        gainNodeRef.current.gain.setTargetAtTime(0.08, audioCtxRef.current.currentTime, 0.8);
      }
      setIsPlaying(true);
    }
  };

  const startSacredChant = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0, ctx.currentTime);
      masterGain.gain.setTargetAtTime(0.08, ctx.currentTime, 1.2);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Create warm harmonic drone oscillators
      oscillatorsRef.current = frequencies.map((freq, i) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();

        osc.type = i % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // Subtle slow frequency modulation for organic cathedral warmth
        const lfo = ctx.createOscillator();
        lfo.frequency.setValueAtTime(0.1 + i * 0.05, ctx.currentTime);
        const lfoGain = ctx.createGain();
        lfoGain.gain.setValueAtTime(0.4, ctx.currentTime);
        lfo.connect(osc.frequency);
        lfo.start();

        oscGain.gain.setValueAtTime(0.15 / (i + 1), ctx.currentTime);
        osc.connect(oscGain);
        oscGain.connect(masterGain);
        osc.start();
        return osc;
      });
    } catch (e) {
      console.warn('Audio Context initial error:', e);
    }
  };

  useEffect(() => {
    return () => {
      oscillatorsRef.current.forEach(osc => {
        try { osc.stop(); } catch {}
      });
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <button
      onClick={toggleAudio}
      title={isPlaying ? "Mute Sacred Ambience" : "Play Sacred Cathedral Ambience"}
      className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-300 shadow-sm ${
        isPlaying
          ? 'bg-amber-500 text-white border border-amber-600 shadow-[0_0_15px_rgba(217,119,6,0.35)] animate-pulse'
          : 'bg-amber-100/90 text-amber-900 border border-amber-300 hover:bg-amber-200'
      }`}
    >
      {isPlaying ? (
        <>
          <Volume2 className="w-3.5 h-3.5 text-white" />
          <span className="hidden sm:inline">Chants Playing</span>
          <Sparkles className="w-3 h-3 text-amber-200 animate-spin" />
        </>
      ) : (
        <>
          <VolumeX className="w-3.5 h-3.5 text-amber-700" />
          <span className="hidden sm:inline">Sacred Ambience</span>
        </>
      )}
    </button>
  );
}
