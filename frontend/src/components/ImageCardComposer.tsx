'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  X, Upload, Download, MessageCircle, Image as ImageIcon, Check
} from 'lucide-react';

interface ImageCardComposerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  text: string;
  tag: string;
}

const CANVAS_SIZE = 1080;

const PRESETS = [
  { label: 'Last Supper',   src: '/last-supper.jpg' },
  { label: 'Padre Pio',     src: '/st.padre-pio.png' },
  { label: 'Sacred Gold',   src: null },
];

function measureLines(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let line = '';
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
  maxLines = 999
): number {
  const lines = measureLines(ctx, text, maxWidth).slice(0, maxLines);
  for (const line of lines) {
    ctx.fillText(line, x, y);
    y += lineHeight;
  }
  return y;
}

export default function ImageCardComposer({
  isOpen,
  onClose,
  title,
  text,
  tag,
}: ImageCardComposerProps) {
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [bgImage,        setBgImage]        = useState<HTMLImageElement | null>(null);
  const [selectedPreset, setSelectedPreset] = useState<number>(0);
  const [downloaded,     setDownloaded]     = useState(false);

  useEffect(() => {
    if (isOpen) loadPreset(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  function loadPreset(index: number) {
    setSelectedPreset(index);
    const preset = PRESETS[index];
    if (!preset.src) { setBgImage(null); return; }
    const img = new Image();
    img.onload = () => setBgImage(img);
    img.src    = preset.src;
  }

  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.onload = () => { setBgImage(img); setSelectedPreset(-1); };
      img.src = ev.target?.result as string;
    };
    reader.readAsDataURL(file);
  }

  const drawCard = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const S   = CANVAS_SIZE;
    const PAD = 80;
    canvas.width  = S;
    canvas.height = S;

    // 1. Background
    if (bgImage) {
      const scale = Math.max(S / bgImage.naturalWidth, S / bgImage.naturalHeight);
      const sw = bgImage.naturalWidth  * scale;
      const sh = bgImage.naturalHeight * scale;
      ctx.drawImage(bgImage, (S - sw) / 2, (S - sh) / 2, sw, sh);
    } else {
      const grad = ctx.createLinearGradient(0, 0, S, S);
      grad.addColorStop(0,   '#7c2d12');
      grad.addColorStop(0.4, '#92400e');
      grad.addColorStop(0.8, '#44403c');
      grad.addColorStop(1,   '#1c1917');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, S, S);
    }

    // 2. Dark overlay
    const overlay = ctx.createLinearGradient(0, 0, 0, S);
    overlay.addColorStop(0,    'rgba(0,0,0,0.50)');
    overlay.addColorStop(0.35, 'rgba(0,0,0,0.52)');
    overlay.addColorStop(1,    'rgba(0,0,0,0.78)');
    ctx.fillStyle = overlay;
    ctx.fillRect(0, 0, S, S);

    // 3. Gold accent stripe
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(PAD, 90, 8, 56);

    // 4. Tag label
    ctx.font      = 'bold 28px "Courier New", monospace';
    ctx.fillStyle = '#fcd34d';
    ctx.textAlign = 'left';
    ctx.fillText(tag.toUpperCase(), PAD + 24, 132);

    // 5. Title
    ctx.font      = 'bold 56px Georgia, "Times New Roman", serif';
    ctx.fillStyle = '#ffffff';
    const afterTitle = wrapText(ctx, title, PAD, 220, S - PAD * 2, 68, 3);

    // 6. Dashed divider
    const divY = afterTitle + 40;
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth   = 2.5;
    ctx.setLineDash([10, 8]);
    ctx.beginPath();
    ctx.moveTo(PAD, divY);
    ctx.lineTo(S - PAD, divY);
    ctx.stroke();
    ctx.setLineDash([]);

    // 7. Opening quote mark
    const quoteStartY = divY + 72;
    ctx.font         = 'bold 90px Georgia, serif';
    ctx.fillStyle    = '#f59e0b';
    ctx.globalAlpha  = 0.85;
    ctx.fillText('\u201C', PAD - 8, quoteStartY);
    ctx.globalAlpha  = 1;

    // 8. Quote body
    ctx.font      = 'italic 36px Georgia, "Times New Roman", serif';
    ctx.fillStyle = 'rgba(255,255,255,0.93)';
    const displayText = text.length > 280 ? text.slice(0, 277) + '\u2026' : text;
    wrapText(ctx, displayText, PAD + 28, quoteStartY + 10, S - PAD * 2 - 28, 52, 7);

    // 9. Bottom branding bar
    const barH = 88;
    ctx.fillStyle = 'rgba(0,0,0,0.65)';
    ctx.fillRect(0, S - barH, S, barH);

    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(0, S - barH, S, 3);

    ctx.font      = 'bold 40px serif';
    ctx.fillStyle = '#fcd34d';
    ctx.textAlign = 'left';
    ctx.fillText('\u2726', PAD, S - barH / 2 + 14);

    ctx.font      = 'bold 30px "Courier New", monospace';
    ctx.fillStyle = '#fcd34d';
    ctx.fillText('encounterchrist.online', PAD + 52, S - barH / 2 + 14);

    ctx.font      = '22px "Courier New", monospace';
    ctx.fillStyle = 'rgba(253,211,77,0.65)';
    ctx.textAlign = 'right';
    ctx.fillText('The Real Presence', S - PAD, S - barH / 2 + 14);
    ctx.textAlign = 'left';
  }, [bgImage, title, text, tag]);

  useEffect(() => { drawCard(); }, [drawCard]);

  function getCanvasBlob(): Promise<Blob | null> {
    return new Promise((resolve) => {
      canvasRef.current?.toBlob(resolve, 'image/png');
    });
  }

  async function handleDownload() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = 'encounter-christ-share-card.png';
    link.href     = canvas.toDataURL('image/png');
    link.click();
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  }

  async function handleShare() {
    const blob = await getCanvasBlob();
    if (!blob) return;

    if (typeof navigator.share === 'function') {
      const file = new File([blob], 'encounter-christ-card.png', { type: 'image/png' });
      try {
        if (navigator.canShare?.({ files: [file] })) {
          await navigator.share({ files: [file], title, text: `${title}\n\n${text}` });
          return;
        }
      } catch {
        // User cancelled -- fall through to desktop fallback
      }
    }

    // Desktop fallback
    const link = document.createElement('a');
    link.download = 'encounter-christ-share-card.png';
    link.href     = URL.createObjectURL(blob);
    link.click();
    setTimeout(() => {
      const msg = `${title}\n\n${text}\n\n(Attach the downloaded image to this message!)`;
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`, '_blank');
    }, 600);
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-stone-950/80 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-amber-300 overflow-hidden max-h-[95vh] flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-amber-200 bg-gradient-to-r from-amber-50 to-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center shadow-sm">
              <ImageIcon className="w-4 h-4 text-amber-700" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-stone-900 text-sm">Create Image Card</h2>
              <p className="text-[10px] text-stone-500 font-medium">Design &amp; share a beautiful card on WhatsApp</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-stone-600" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px]">

            {/* Canvas preview */}
            <div className="p-5 sm:p-8 flex items-center justify-center bg-stone-50 border-b lg:border-b-0 lg:border-r border-amber-100">
              <div className="w-full max-w-[440px] aspect-square rounded-2xl overflow-hidden shadow-2xl border border-amber-200 ring-4 ring-amber-100">
                <canvas
                  ref={canvasRef}
                  width={CANVAS_SIZE}
                  height={CANVAS_SIZE}
                  className="w-full h-full block"
                />
              </div>
            </div>

            {/* Controls */}
            <div className="p-5 space-y-5">

              {/* Upload */}
              <div className="space-y-2">
                <h3 className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">Your Background Photo</h3>
                <label className="flex items-center gap-3 w-full py-3.5 px-4 rounded-2xl border-2 border-dashed border-amber-300 hover:border-amber-500 cursor-pointer transition-colors bg-amber-50/60 hover:bg-amber-50 group">
                  <div className="w-8 h-8 rounded-full bg-amber-100 border border-amber-200 flex items-center justify-center shrink-0 group-hover:bg-amber-200 transition-colors">
                    <Upload className="w-3.5 h-3.5 text-amber-700" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-amber-800">Upload a Photo</p>
                    <p className="text-[10px] text-stone-500">JPG or PNG -- any size</p>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                </label>
              </div>

              {/* Presets */}
              <div className="space-y-2">
                <h3 className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">Or Choose a Preset</h3>
                <div className="grid grid-cols-3 gap-2">
                  {PRESETS.map((preset, i) => (
                    <button
                      key={i}
                      onClick={() => loadPreset(i)}
                      className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                        selectedPreset === i
                          ? 'border-amber-500 ring-2 ring-amber-300 scale-95 shadow-lg'
                          : 'border-stone-200 hover:border-amber-300 hover:scale-95'
                      }`}
                    >
                      {preset.src ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={preset.src} alt={preset.label} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-amber-800 via-amber-700 to-stone-900" />
                      )}
                      <div className="absolute inset-0 bg-black/35 flex items-end p-1.5">
                        <span className="text-[9px] font-bold text-white leading-tight drop-shadow">{preset.label}</span>
                      </div>
                      {selectedPreset === i && (
                        <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-amber-500 border-2 border-white flex items-center justify-center shadow-md">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Card text preview */}
              <div className="space-y-2">
                <h3 className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">Card Content</h3>
                <div className="bg-amber-50 rounded-2xl p-3.5 border border-amber-200 space-y-1">
                  <span className="text-[9px] font-mono font-bold text-amber-700 uppercase tracking-wider">{tag}</span>
                  <p className="text-xs font-bold text-stone-900 leading-snug">{title}</p>
                  <p className="text-[10px] text-stone-600 leading-relaxed line-clamp-3 italic">{text}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2 pt-2 border-t border-amber-100">
                <button
                  onClick={handleDownload}
                  className="w-full py-3 px-4 rounded-2xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-amber-400/40"
                >
                  {downloaded ? (
                    <><Check className="w-4 h-4" /> Saved to Downloads!</>
                  ) : (
                    <><Download className="w-4 h-4" /> Download Image (.png)</>
                  )}
                </button>

                <button
                  onClick={handleShare}
                  className="w-full py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-emerald-500/30"
                >
                  <MessageCircle className="w-4 h-4" />
                  Share to WhatsApp
                </button>

                <p className="text-[9px] text-stone-400 text-center leading-relaxed pt-1">
                  ?? <strong>Mobile:</strong> tap Share ? WhatsApp opens with the image.<br />
                  ?? <strong>Desktop:</strong> image downloads, then WhatsApp Web opens.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
