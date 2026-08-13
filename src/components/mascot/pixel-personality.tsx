'use client';

import * as React from 'react';
import { PixelCreature } from './pixel-creature';
import { cn } from '@/lib/cn';
import {
  getPersonality,
  type PersonalityMood,
  type PersonalityPreset,
} from './personalities';

export interface PixelPersonalityProps {
  /** Personality id, e.g. "bit" */
  name?: string;
  mood?: PersonalityMood;
  size?: number;
  gridLines?: boolean;
  className?: string;
  /** Optional override preset (for custom creatures) */
  preset?: PersonalityPreset;
}

export function PixelPersonality({
  name = 'bit',
  mood = 'idle',
  size = 6,
  gridLines = false,
  className,
  preset: presetProp,
}: PixelPersonalityProps) {
  const preset = presetProp ?? getPersonality(name);
  const [frameIndex, setFrameIndex] = React.useState(0);
  const frameIndexRef = React.useRef(0);
  const isReducedMotion = React.useRef(false);
  const isVisible = React.useRef(true);
  const isTabVisible = React.useRef(true);
  const rAFRef = React.useRef<number | null>(null);
  const holdStart = React.useRef(0);
  const hostRef = React.useRef<HTMLDivElement>(null);

  const timeline = React.useMemo(() => {
    if (!preset) return [];
    return preset.moods[mood] ?? preset.moods.idle ?? [{ hold: 1000, grid: preset.base }];
  }, [preset, mood]);

  React.useEffect(() => {
    frameIndexRef.current = 0;
    holdStart.current = 0;
    setFrameIndex(0);
  }, [mood, name, presetProp]);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    isReducedMotion.current = mediaQuery.matches;
    const onVis = () => {
      isTabVisible.current = document.visibilityState === 'visible';
    };
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  React.useEffect(() => {
    const node = hostRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible.current = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    if (isReducedMotion.current || timeline.length <= 1) {
      if (rAFRef.current) cancelAnimationFrame(rAFRef.current);
      frameIndexRef.current = 0;
      setFrameIndex(0);
      return;
    }

    const loop = (time: number) => {
      rAFRef.current = requestAnimationFrame(loop);
      if (!isVisible.current || !isTabVisible.current) return;
      if (!holdStart.current) holdStart.current = time;
      const hold = timeline[frameIndexRef.current]?.hold ?? 200;
      if (time - holdStart.current >= hold) {
        holdStart.current = time;
        const next = (frameIndexRef.current + 1) % timeline.length;
        frameIndexRef.current = next;
        setFrameIndex(next);
      }
    };

    rAFRef.current = requestAnimationFrame(loop);
    return () => {
      if (rAFRef.current) cancelAnimationFrame(rAFRef.current);
    };
  }, [timeline]);

  if (!preset) {
    return (
      <span className="font-pixel text-[10px] text-[var(--danger)]">
        Unknown personality: {name}
      </span>
    );
  }

  const grid = timeline[frameIndex]?.grid ?? preset.base;

  return (
    <div
      ref={hostRef}
      role="img"
      aria-label={`${preset.name} personality (${mood})`}
      className={cn('inline-block max-w-full', className)}
    >
      <PixelCreature
        base={grid}
        palette={preset.palette}
        size={size}
        gridLines={gridLines}
      />
    </div>
  );
}
