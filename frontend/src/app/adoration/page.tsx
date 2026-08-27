'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Flame, Clock, Play, Pause, RotateCcw, Volume2, Sparkles, BookOpen, Heart } from 'lucide-react';
import AmbientAudioPlayer from '@/components/AmbientAudioPlayer';

export default function AdorationPage() {
  const [selectedDuration, setSelectedDuration] = useState<number>(15 * 60);
  const [timeLeft, setTimeLeft] = useState<number>(15 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [activePrayer, setActivePrayer] = useState<'ANIMA' | 'TANTUM' | 'DIVINE_PRAISES' | 'ST_THOMAS'>('ANIMA');

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.frequency.setValueAtTime(528, ctx.currentTime);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 3);
      } catch {}
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timeLeft]);

  const setTimer = (mins: number) => {
    setSelectedDuration(mins * 60);
    setTimeLeft(mins * 60);
    setIsTimerRunning(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = ((selectedDuration - timeLeft) / selectedDuration) * 100;

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-12">
      
      {/* Sacred Monstrance Altar Hero */}
      <div className="relative rounded-3xl overflow-hidden sacred-glass border border-amber-300 p-8 sm:p-14 text-center shadow-xl bg-gradient-to-b from-amber-100/60 via-[#FFFDF5] to-amber-50">
        {/* Background Divine Halo Radial */}
        <div className="absolute inset-0 bg-radial from-amber-300/30 via-amber-100/20 to-transparent pointer-events-none" />
        
        {/* Holy Monstrance Graphic Representation */}
        <div className="relative z-10 flex flex-col items-center space-y-6">
          <div className="relative flex items-center justify-center">
            {/* Pulsing Light Halo */}
            <div className="absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-amber-400/20 blur-3xl animate-pulse pointer-events-none" />
            <div className="relative w-56 h-56 sm:w-72 sm:h-72 flex items-center justify-center animate-divine-pulse">
              <Image
                src="/logo.png"
                alt="Sacred Monstrance"
                width={280}
                height={280}
                className="object-contain filter drop-shadow-[0_4px_30px_rgba(245,158,11,0.6)] hover:scale-105 transition-transform duration-700 ease-out select-none"
                priority
              />
            </div>
          </div>

          <div className="space-y-2 max-w-2xl">
            <span className="px-4 py-1.5 rounded-full text-xs font-mono tracking-widest uppercase bg-amber-200/80 text-amber-950 border border-amber-400 inline-flex items-center gap-1.5 font-bold shadow-sm">
              <Sparkles className="w-3.5 h-3.5" /> Adoration of the Most Blessed Sacrament
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-stone-900 tracking-tight">
              &ldquo;Be Still, and Know That I Am God&rdquo;
            </h1>
            <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-serif italic font-medium">
              &ldquo;Could you not watch with me one hour?&rdquo; — Matthew 26:40
            </p>
          </div>

          {/* Ambient Chant Controls */}
          <div className="pt-2 flex items-center gap-3">
            <AmbientAudioPlayer />
          </div>
        </div>
      </div>

      {/* Two Column Layout: Holy Hour Timer & Eucharistic Prayers */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Holy Hour Meditation Timer */}
        <div className="lg:col-span-5 sacred-glass-card rounded-3xl p-6 sm:p-8 space-y-6 border border-amber-300 bg-white shadow-md">
          <div className="flex items-center justify-between border-b border-amber-200 pb-4">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-700" />
              <h3 className="font-serif font-bold text-base text-stone-900">Holy Hour Timer</h3>
            </div>
            <span className="text-[11px] text-amber-800 font-mono font-bold">Silent Prayer</span>
          </div>

          {/* Time Display */}
          <div className="text-center py-6 bg-amber-50/70 rounded-2xl border border-amber-200 space-y-2 relative overflow-hidden">
            <div
              className="absolute bottom-0 left-0 top-0 bg-amber-300/30 transition-all duration-1000"
              style={{ width: `${progressPercentage}%` }}
            />
            <span className="relative font-mono text-5xl sm:text-6xl font-extrabold tracking-wider text-amber-900">
              {formatTime(timeLeft)}
            </span>
            <p className="relative text-xs text-stone-600 font-sans font-medium">
              {isTimerRunning ? 'Sacred Holy Hour in progress...' : 'Ready for quiet meditation'}
            </p>
          </div>

          {/* Duration Selector Buttons */}
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => setTimer(15)}
              className={`py-2.5 rounded-xl text-xs font-bold transition-all ${
                selectedDuration === 15 * 60 && !isTimerRunning
                  ? 'bg-amber-500 text-white shadow'
                  : 'bg-amber-100/70 text-amber-900 border border-amber-300 hover:bg-amber-200'
              }`}
            >
              15 Mins
            </button>
            <button
              onClick={() => setTimer(30)}
              className={`py-2.5 rounded-xl text-xs font-bold transition-all ${
                selectedDuration === 30 * 60 && !isTimerRunning
                  ? 'bg-amber-500 text-white shadow'
                  : 'bg-amber-100/70 text-amber-900 border border-amber-300 hover:bg-amber-200'
              }`}
            >
              30 Mins
            </button>
            <button
              onClick={() => setTimer(60)}
              className={`py-2.5 rounded-xl text-xs font-bold transition-all ${
                selectedDuration === 60 * 60 && !isTimerRunning
                  ? 'bg-amber-500 text-white shadow'
                  : 'bg-amber-100/70 text-amber-900 border border-amber-300 hover:bg-amber-200'
              }`}
            >
              1 Hour
            </button>
          </div>

          {/* Control Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className="flex-1 gold-button py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md"
            >
              {isTimerRunning ? (
                <>
                  <Pause className="w-4 h-4" /> Pause Prayer
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-white" /> Begin Meditation
                </>
              )}
            </button>
            <button
              onClick={() => {
                setIsTimerRunning(false);
                setTimeLeft(selectedDuration);
              }}
              title="Reset Timer"
              className="p-3 bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 rounded-xl transition-all shadow-sm"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Column: Eucharistic Devotions & Traditional Prayers */}
        <div className="lg:col-span-7 sacred-glass-card rounded-3xl p-6 sm:p-8 space-y-6 border border-amber-300 bg-white shadow-md">
          <div className="flex items-center justify-between border-b border-amber-200 pb-4">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-700" />
              <h3 className="font-serif font-bold text-base text-stone-900">Sacred Eucharistic Prayers</h3>
            </div>
            <span className="text-[11px] text-amber-800 font-mono font-bold">Traditional Liturgy</span>
          </div>

          {/* Prayer Tabs */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActivePrayer('ANIMA')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activePrayer === 'ANIMA'
                  ? 'bg-amber-500 text-white shadow-sm'
                  : 'bg-amber-100/70 text-amber-900 border border-amber-300 hover:bg-amber-200'
              }`}
            >
              Anima Christi
            </button>
            <button
              onClick={() => setActivePrayer('TANTUM')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activePrayer === 'TANTUM'
                  ? 'bg-amber-500 text-white shadow-sm'
                  : 'bg-amber-100/70 text-amber-900 border border-amber-300 hover:bg-amber-200'
              }`}
            >
              Tantum Ergo
            </button>
            <button
              onClick={() => setActivePrayer('DIVINE_PRAISES')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activePrayer === 'DIVINE_PRAISES'
                  ? 'bg-amber-500 text-white shadow-sm'
                  : 'bg-amber-100/70 text-amber-900 border border-amber-300 hover:bg-amber-200'
              }`}
            >
              The Divine Praises
            </button>
            <button
              onClick={() => setActivePrayer('ST_THOMAS')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activePrayer === 'ST_THOMAS'
                  ? 'bg-amber-500 text-white shadow-sm'
                  : 'bg-amber-100/70 text-amber-900 border border-amber-300 hover:bg-amber-200'
              }`}
            >
              St. Thomas Aquinas
            </button>
          </div>

          {/* Prayer Content Display */}
          <div className="bg-amber-50/70 p-6 rounded-2xl border border-amber-200 leading-relaxed font-serif text-sm text-stone-800 font-medium">
            {activePrayer === 'ANIMA' && (
              <div className="space-y-3">
                <h4 className="font-bold text-amber-900 text-base">Anima Christi (Soul of Christ)</h4>
                <p className="italic leading-relaxed">
                  Soul of Christ, sanctify me.<br />
                  Body of Christ, save me.<br />
                  Blood of Christ, inebriate me.<br />
                  Water from the side of Christ, wash me.<br />
                  Passion of Christ, strengthen me.<br />
                  O good Jesus, hear me.<br />
                  Within Thy wounds hide me.<br />
                  Suffer me not to be separated from Thee.<br />
                  From the malicious enemy defend me.<br />
                  In the hour of my death call me,<br />
                  And bid me come unto Thee,<br />
                  That with Thy Saints I may praise Thee,<br />
                  Forever and ever. Amen.
                </p>
              </div>
            )}

            {activePrayer === 'TANTUM' && (
              <div className="space-y-3">
                <h4 className="font-bold text-amber-900 text-base">Tantum Ergo Sacramentum</h4>
                <p className="italic leading-relaxed">
                  Down in adoration falling, Lo! the sacred Host we hail;<br />
                  Lo! o&apos;er ancient forms departing, Newer rites of grace prevail;<br />
                  Faith for all defects supplying, Where the feeble senses fail.<br /><br />
                  To the everlasting Father, And the Son who comes on high,<br />
                  With the Holy Ghost proceeding Forth from each eternally,<br />
                  Be salvation, honor, blessing, Might and endless majesty. Amen.
                </p>
              </div>
            )}

            {activePrayer === 'DIVINE_PRAISES' && (
              <div className="space-y-3">
                <h4 className="font-bold text-amber-900 text-base">The Divine Praises (Laudes Divinae)</h4>
                <p className="italic text-xs leading-loose">
                  Blessed be God.<br />
                  Blessed be His Holy Name.<br />
                  Blessed be Jesus Christ, true God and true Man.<br />
                  Blessed be the Name of Jesus.<br />
                  Blessed be His Most Sacred Heart.<br />
                  Blessed be His Most Precious Blood.<br />
                  Blessed be Jesus in the Most Holy Sacrament of the Altar.<br />
                  Blessed be the Holy Spirit, the Paraclete.<br />
                  Blessed be the great Mother of God, Mary most Holy.<br />
                  Blessed be her Holy and Immaculate Conception.<br />
                  Blessed be her Glorious Assumption.<br />
                  Blessed be the name of Mary, Virgin and Mother.<br />
                  Blessed be Saint Joseph, her most chaste spouse.<br />
                  Blessed be God in His Angels and in His Saints. Amen.
                </p>
              </div>
            )}

            {activePrayer === 'ST_THOMAS' && (
              <div className="space-y-3">
                <h4 className="font-bold text-amber-900 text-base">Prayer of St. Thomas Aquinas</h4>
                <p className="italic text-xs leading-relaxed">
                  &ldquo;Almighty and everlasting God, behold I come to the Sacrament of Thine only-begotten Son, our Lord Jesus Christ: I come as one sick to the Physician of life, as an unclean person to the Fountain of mercy, as one blind to the Light of the eternal splendor, as one poor and needy to the Lord of heaven and earth.
                  <br /><br />
                  Therefore I beg of Thine immense bounty that Thou wouldst vouchsafe to heal my sickness, to wash away my defilements, to enlighten my blindness, to enrich my poverty, and to clothe my nakedness; that I may receive the Bread of Angels, the King of kings and Lord of lords.&rdquo;
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
