'use client';

import React, { useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react';
import { Radio, ExternalLink, Play, Pause, Sparkles, Volume2 } from 'lucide-react';

export interface LiveAdorationStreamHandle {
  play: () => void;
  pause: () => void;
  stop: () => void;
}

interface LiveAdorationStreamProps {
  youtubeUrl: string;
  isPlaying: boolean;
  onPlayStateChange?: (playing: boolean) => void;
}

// Extract 11-char video ID from common YouTube URLs
export function extractYouTubeId(url: string): string | null {
  if (!url) return null;
  const trimmed = url.trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=|live\/)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = trimmed.match(regex);
  return match ? match[1] : null;
}

declare global {
  interface Window {
    YT?: {
      Player: new (
        elementId: string | HTMLElement,
        options: {
          videoId?: string;
          playerVars?: Record<string, unknown>;
          events?: {
            onReady?: (event: { target: YTPlayerInstance }) => void;
            onStateChange?: (event: { data: number; target: YTPlayerInstance }) => void;
            onError?: (event: unknown) => void;
          };
        }
      ) => YTPlayerInstance;
      PlayerState?: {
        PLAYING: number;
        PAUSED: number;
        ENDED: number;
      };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

interface YTPlayerInstance {
  playVideo: () => void;
  pauseVideo: () => void;
  stopVideo: () => void;
  destroy?: () => void;
  getPlayerState?: () => number;
}

export const LiveAdorationStream = forwardRef<LiveAdorationStreamHandle, LiveAdorationStreamProps>(
  ({ youtubeUrl, isPlaying }, ref) => {
    const videoId = extractYouTubeId(youtubeUrl);
    const containerIdRef = useRef(`yt-adoration-player-${Math.random().toString(36).substring(2, 9)}`);
    const playerRef = useRef<YTPlayerInstance | null>(null);
    const isPlayerReadyRef = useRef<boolean>(false);
    const pendingPlayRef = useRef<boolean>(false);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    useImperativeHandle(ref, () => ({
      play: () => {
        if (isPlayerReadyRef.current && playerRef.current) {
          try {
            playerRef.current.playVideo();
          } catch {
            // ignore
          }
        } else {
          pendingPlayRef.current = true;
        }
      },
      pause: () => {
        pendingPlayRef.current = false;
        if (isPlayerReadyRef.current && playerRef.current) {
          try {
            playerRef.current.pauseVideo();
          } catch {
            // ignore
          }
        }
      },
      stop: () => {
        pendingPlayRef.current = false;
        if (isPlayerReadyRef.current && playerRef.current) {
          try {
            playerRef.current.stopVideo();
          } catch {
            // ignore
          }
        }
      },
    }));

    // Synchronize player with external isPlaying state (Holy Hour Timer)
    useEffect(() => {
      if (!isLoaded || !videoId) return;

      if (isPlaying) {
        if (isPlayerReadyRef.current && playerRef.current) {
          try {
            playerRef.current.playVideo();
          } catch {
            // ignore
          }
        } else {
          pendingPlayRef.current = true;
        }
      } else {
        pendingPlayRef.current = false;
        if (isPlayerReadyRef.current && playerRef.current) {
          try {
            playerRef.current.pauseVideo();
          } catch {
            // ignore
          }
        }
      }
    }, [isPlaying, isLoaded, videoId]);

    // Load YouTube IFrame API and initialize player
    useEffect(() => {
      if (!videoId) return;

      let isMounted = true;

      const initPlayer = () => {
        if (!window.YT || !window.YT.Player) return;
        const container = document.getElementById(containerIdRef.current);
        if (!container || playerRef.current) return;

        playerRef.current = new window.YT.Player(containerIdRef.current, {
          videoId: videoId,
          playerVars: {
            autoplay: 0,
            controls: 1,
            modestbranding: 1,
            rel: 0,
            playsinline: 1,
          },
          events: {
            onReady: (event) => {
              if (!isMounted) return;
              isPlayerReadyRef.current = true;
              setIsLoaded(true);
              if (pendingPlayRef.current || isPlaying) {
                try {
                  event.target.playVideo();
                } catch {
                  // ignore
                }
                pendingPlayRef.current = false;
              }
            },
            onError: () => {
              // Gracefully handle playback error
            },
          },
        });
      };

      // Check if YouTube API script is already inserted
      if (window.YT && window.YT.Player) {
        initPlayer();
      } else {
        const existingScript = document.querySelector('script[src*="youtube.com/iframe_api"]');
        if (!existingScript) {
          const tag = document.createElement('script');
          tag.src = 'https://www.youtube.com/iframe_api';
          tag.async = true;
          const firstScriptTag = document.getElementsByTagName('script')[0];
          firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
        }

        const prevCallback = window.onYouTubeIframeAPIReady;
        window.onYouTubeIframeAPIReady = () => {
          if (prevCallback) prevCallback();
          if (isMounted) {
            initPlayer();
          }
        };
      }

      return () => {
        isMounted = false;
        if (playerRef.current) {
          try {
            playerRef.current.destroy?.();
          } catch {
            // ignore
          }
          playerRef.current = null;
          isPlayerReadyRef.current = false;
        }
      };
    }, [videoId]);

    if (!videoId) {
      return null;
    }

    const fullYouTubeUrl = `https://www.youtube.com/watch?v=${videoId}`;

    return (
      <div className="relative rounded-3xl overflow-hidden sacred-glass border-2 border-amber-300 p-4 sm:p-7 shadow-2xl bg-gradient-to-b from-[#FFFDF7] via-amber-50/40 to-amber-100/30">
        {/* Divine Background Ambient Glow */}
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-amber-300/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          {/* Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-amber-200/80 pb-3.5">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-red-600 text-white shadow-sm shadow-red-500/30 animate-pulse">
                <span className="w-2 h-2 rounded-full bg-white animate-ping inline-block" />
                Live Adoration
              </span>
              <div className="hidden sm:flex items-center gap-1 text-xs text-amber-950 font-serif font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Perpetual Adoration before the Blessed Sacrament</span>
              </div>
            </div>

            <a
              href={fullYouTubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-900 hover:text-amber-700 bg-amber-100/80 hover:bg-amber-200 px-3 py-1.5 rounded-xl border border-amber-300 transition-colors shadow-sm"
              title="Open stream on YouTube"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Open on YouTube</span>
            </a>
          </div>

          {/* YouTube Video Frame Container */}
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-xl bg-stone-950 border border-amber-200">
            <div id={containerIdRef.current} className="w-full h-full" />
          </div>

          {/* Stream Status Banner */}
          <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 rounded-xl bg-amber-100/60 border border-amber-300/80 text-xs text-amber-950">
            <div className="flex items-center gap-2 font-medium">
              {isPlaying ? (
                <>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-semibold text-emerald-950">Holy Hour in progress</span>
                  <span className="hidden md:inline text-stone-600">- Live stream is synchronized with your meditation timer</span>
                </>
              ) : (
                <>
                  <Radio className="w-3.5 h-3.5 text-amber-700" />
                  <span className="text-amber-900">
                    Click <strong>&quot;Begin Meditation&quot;</strong> below to start prayer and live adoration playback
                  </span>
                </>
              )}
            </div>

            <div className="flex items-center gap-1.5 text-[11px] text-stone-600 font-mono">
              <Volume2 className="w-3 h-3 text-amber-700" />
              <span>Synchronized with timer</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

LiveAdorationStream.displayName = 'LiveAdorationStream';

export default LiveAdorationStream;
