'use client';

import * as React from 'react';
import { PixelCreature } from './pixel-creature';
import { MASCOT_PALETTE, MASCOT_BASE, MASCOT_FRAMES } from './creature-presets';
import { cn } from '@/lib/cn';

export type MascotAnimation = 'idle' | 'blink' | 'wave' | 'celebrate' | 'error';

export interface MascotProps {
  animation?: MascotAnimation;
  size?: number;
  className?: string;
}

export function Mascot({
  animation = 'idle',
  size = 8,
  className,
}: MascotProps) {
  const [currentAnim, setCurrentAnim] = React.useState<MascotAnimation>(animation);
  const interacting = React.useRef(false);
  const resetTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearResetTimer = () => {
    if (resetTimer.current) {
      clearTimeout(resetTimer.current);
      resetTimer.current = null;
    }
  };

  React.useEffect(() => {
    if (!interacting.current) {
      setCurrentAnim(animation);
    }
  }, [animation]);

  React.useEffect(() => {
    if (interacting.current) return;

    if (animation === 'idle') {
      const interval = setInterval(() => {
        if (!interacting.current) {
          setCurrentAnim('blink');
          setTimeout(() => {
            if (!interacting.current) setCurrentAnim('idle');
          }, 1000);
        }
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [animation]);

  React.useEffect(() => () => clearResetTimer(), []);

  const playTemp = (next: MascotAnimation, ms = 1800) => {
    interacting.current = true;
    setCurrentAnim(next);
    clearResetTimer();
    resetTimer.current = setTimeout(() => {
      interacting.current = false;
      setCurrentAnim(animation);
    }, ms);
  };

  const frames = MASCOT_FRAMES[currentAnim];

  return (
    <div
      role="img"
      aria-label={`RetroChunk mascot (${currentAnim})`}
      className={cn(
        'inline-block cursor-pointer touch-manipulation transition-transform active:translate-y-[2px] max-w-full select-none',
        className
      )}
      onMouseEnter={() => {
        if (animation === 'error') return;
        interacting.current = true;
        setCurrentAnim('wave');
      }}
      onMouseLeave={() => {
        interacting.current = false;
        clearResetTimer();
        setCurrentAnim(animation);
      }}
      onClick={() => {
        if (animation === 'error') {
          playTemp('celebrate');
          return;
        }
        playTemp(currentAnim === 'celebrate' ? 'wave' : 'celebrate');
      }}
      onTouchStart={(e) => {
        e.preventDefault();
        playTemp(animation === 'error' ? 'wave' : 'celebrate');
      }}
    >
      <PixelCreature
        base={MASCOT_BASE}
        palette={MASCOT_PALETTE}
        frames={frames}
        size={size}
      />
    </div>
  );
}
