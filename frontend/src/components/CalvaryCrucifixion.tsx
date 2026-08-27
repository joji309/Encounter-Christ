'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Microscope, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import Image from 'next/image';

interface Particle {
  x: number;
  y: number;
  speed: number;
  size: number;
  color: string;
  opacity: number;
  type: 'blood' | 'water';
  wiggle: number;
  wiggleSpeed: number;
  isSplat: boolean;
  splatTimer: number;
  maxSplatTimer: number;
}

export default function CalvaryCrucifixion() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  // You can replace this video URL with your own Cloudinary Calvary video URL
  const videoUrl = 'https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c054ba2011c350bb20954e180c54dcf1&profile_id=139&oauth2_token_id=57447761';

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => {});
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const particles: Particle[] = [];

    const handleResize = () => {
      if (canvas) {
        canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
        canvas.height = canvas.parentElement?.clientHeight || 450;
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    const createParticle = (type: 'blood' | 'water'): Particle => {
      const isBlood = type === 'blood';
      return {
        x: Math.random() * (canvas.width || window.innerWidth),
        y: -10,
        speed: isBlood ? 1.5 + Math.random() * 2 : 1.2 + Math.random() * 1.5,
        size: isBlood ? 2 + Math.random() * 3 : 1.5 + Math.random() * 2,
        color: isBlood ? 'rgba(185, 28, 28, ' : 'rgba(255, 255, 255, ', // Tailwind red-700 & White
        opacity: isBlood ? 0.6 + Math.random() * 0.4 : 0.4 + Math.random() * 0.4,
        type,
        wiggle: Math.random() * 100,
        wiggleSpeed: 0.02 + Math.random() * 0.03,
        isSplat: false,
        splatTimer: 0,
        maxSplatTimer: 20 + Math.random() * 15,
      };
    };

    // Initialize some particles
    for (let i = 0; i < 40; i++) {
      const type = Math.random() > 0.4 ? 'blood' : 'water';
      const p = createParticle(type);
      p.y = Math.random() * canvas.height;
      particles.push(p);
    }

    const drawRipple = (ctx: CanvasRenderingContext2D, p: Particle) => {
      const ratio = p.splatTimer / p.maxSplatTimer;
      const rippleRadius = p.size * (1 + ratio * 3);
      const alpha = p.opacity * (1 - ratio);

      ctx.beginPath();
      ctx.ellipse(p.x, p.y, rippleRadius, rippleRadius * 0.4, 0, 0, Math.PI * 2);
      ctx.strokeStyle = p.type === 'blood' ? `rgba(185, 28, 28, ${alpha})` : `rgba(255, 255, 255, ${alpha})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Slow spawn rate
      if (Math.random() < 0.15 && particles.length < 70) {
        const type = Math.random() > 0.4 ? 'blood' : 'water';
        particles.push(createParticle(type));
      }

      particles.forEach((p, index) => {
        if (p.isSplat) {
          p.splatTimer++;
          drawRipple(ctx, p);

          if (p.splatTimer >= p.maxSplatTimer) {
            particles[index] = createParticle(Math.random() > 0.4 ? 'blood' : 'water');
          }
          return;
        }

        // Apply path wiggle for water
        let currentX = p.x;
        if (p.type === 'water') {
          p.wiggle += p.wiggleSpeed;
          currentX += Math.sin(p.wiggle) * 0.6;
        }

        // Draw drop shape
        ctx.beginPath();
        const dropHeight = p.size * 2.5;

        // Create gradient tail for drops
        const gradient = ctx.createLinearGradient(currentX, p.y, currentX, p.y + dropHeight);
        gradient.addColorStop(0, p.type === 'blood' ? `rgba(185, 28, 28, 0)` : `rgba(255, 255, 255, 0)`);
        gradient.addColorStop(1, p.type === 'blood' ? `${p.color}${p.opacity})` : `${p.color}${p.opacity})`);

        ctx.fillStyle = gradient;
        ctx.ellipse(currentX, p.y + dropHeight / 2, p.size, dropHeight / 2, 0, 0, Math.PI * 2);
        ctx.fill();

        // Update positions
        p.y += p.speed;

        // Collision with the ground (bottom 15px)
        const groundLevel = canvas.height - 15 - (Math.random() * 10);
        if (p.y >= groundLevel) {
          p.y = groundLevel;
          p.isSplat = true;
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative w-full min-h-[480px] bg-stone-950 rounded-3xl overflow-hidden border border-amber-500/30 shadow-2xl flex flex-col justify-end p-6 sm:p-12">
      {/* 1. Loop Video Background */}
      <video
        ref={videoRef}
        src={videoUrl}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-35 mix-blend-luminosity pointer-events-none"
      />

      {/* The soldier at Calvary anchors the Hour of Mercy reflection. */}
      <Image
        src="/soldier.jpg"
        alt="The soldier who pierced the side of Jesus at the Crucifixion"
        fill
        sizes="(max-width: 768px) 100vw, 1200px"
        className="absolute inset-0 h-full w-full object-cover object-center opacity-40 mix-blend-luminosity pointer-events-none"
        aria-hidden="true"
      />

      {/* Warm Ambient Vignette Shadow Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/70 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-radial from-transparent via-transparent to-stone-950/90 pointer-events-none" />

      {/* 2. Canvas Particle Overlay */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
      />

      {/* 3. Controls (Video Play/Pause & Audio Toggle) */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
        <button
          onClick={togglePlay}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white/80 hover:text-white transition-all text-xs flex items-center justify-center backdrop-blur-sm"
          title={isPlaying ? 'Pause Background' : 'Play Background'}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>
        <button
          onClick={toggleMute}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white/80 hover:text-white transition-all text-xs flex items-center justify-center backdrop-blur-sm"
          title={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>

      {/* 4. Elegant Text & Info Content Overlay */}
      <div className="relative z-20 max-w-4xl space-y-6 text-left">
        {/* Sacred Quote Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase bg-red-950/70 text-red-300 border border-red-800/50 backdrop-blur-sm animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
            <span>The Hour of Mercy</span>
          </div>

          <blockquote className="font-serif italic text-xl sm:text-3xl text-stone-100 leading-relaxed max-w-3xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] font-medium">
            &ldquo;But one of the soldiers pierced his side with a spear, and immediately there came out <span className="text-red-400 font-serif">blood</span> and <span className="text-stone-300 font-serif">water</span>.&rdquo;
          </blockquote>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-[1px] bg-amber-400/50" />
            <p className="text-amber-400 text-xs font-mono font-bold tracking-widest uppercase">JOHN 19:34</p>
          </div>
        </div>

        {/* Forensic Matching Callout Card */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-4 border-t border-stone-800/80">
          <div className="md:col-span-8 space-y-3">
            <h4 className="font-serif text-lg font-bold text-stone-100 flex items-center gap-2">
              <Microscope className="w-5 h-5 text-red-500 animate-pulse" />
              The Blood of the Crucifixion Matches the Host
            </h4>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-medium">
              In Eucharistic miracles verified by leading forensic pathologists (such as Lanciano, Sokolka, and Buenos Aires), the blood group is consistently identified as <strong className="text-red-300">AB+</strong> (the same group found on the Shroud of Turin). The tissue found is always living <strong className="text-stone-100">left ventricular myocardium</strong> (heart muscle), showing signs of severe trauma and stress—exactly matching the physical agony of death by crucifixion.
            </p>
          </div>
          
          {/* Side Badge / Monstrance Visual */}
          <div className="md:col-span-4 flex items-center justify-start md:justify-center">
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 backdrop-blur-sm">
              <div className="relative w-12 h-12 flex-shrink-0 flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="Monstrance Emblem"
                  width={42}
                  height={42}
                  className="object-contain filter drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]"
                />
              </div>
              <div className="space-y-0.5">
                <p className="text-[10px] font-mono tracking-widest uppercase text-amber-400 font-extrabold">Forensic Evidence</p>
                <p className="text-xs text-white font-serif font-bold">Traumatized Myocardium</p>
                <p className="text-[10px] text-stone-400 font-semibold">AB+ Blood Type Match</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Ground Rim showing splat baseline */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-t from-stone-900/60 to-transparent border-b border-stone-950 pointer-events-none" />
    </div>
  );
}
