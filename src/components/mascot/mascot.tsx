'use client';

import * as React from 'react';
import { PixelCreature } from './pixel-creature';
import { MASCOT_PALETTE, MASCOT_BASE, MASCOT_FRAMES } from './creature-presets';
import { cn } from '@/lib/cn';

export interface MascotProps {
  animation?: 'idle' | 'blink' | 'wave' | 'celebrate';
  size?: number;
  className?: string;
}

export function Mascot({
  animation = 'idle',
  size = 8,
  className,
}: MascotProps) {
  const [currentAnim, setCurrentAnim] = React.useState(animation);
  const isHovered = React.useRef(false);

  React.useEffect(() => {
    if (!isHovered.current) {
      setCurrentAnim(animation);
    }
  }, [animation]);

  React.useEffect(() => {
    if (isHovered.current) return;

    if (animation === 'idle') {
      const interval = setInterval(() => {
        if (!isHovered.current) {
          setCurrentAnim('blink');
          setTimeout(() => {
            if (!isHovered.current) setCurrentAnim('idle');
          }, 1000); // Back to idle
        }
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [animation]);

  const frames = MASCOT_FRAMES[currentAnim];

  return (
    <div 
      className={cn('inline-block cursor-pointer transition-transform active:translate-y-[2px] max-w-full', className)}
      onMouseEnter={() => {
        isHovered.current = true;
        setCurrentAnim('wave');
      }}
      onMouseLeave={() => {
        isHovered.current = false;
        setCurrentAnim(animation);
      }}
      onClick={() => {
        setCurrentAnim(currentAnim === 'wave' ? animation : 'wave');
      }}
      onTouchStart={() => {
        setCurrentAnim('wave');
        setTimeout(() => setCurrentAnim(animation), 2000);
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
