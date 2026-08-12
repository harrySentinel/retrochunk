'use client';

import * as React from 'react';
import { cn } from '@/lib/cn';

export interface PixelCreatureProps {
  base: number[][];
  palette: string[];
  frames?: number[][][];
  size?: number;
  gridLines?: boolean;
  className?: string;
}

export function PixelCreature({
  base,
  palette,
  frames,
  size = 8,
  gridLines = false,
  className,
}: PixelCreatureProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [currentFrameIndex, setCurrentFrameIndex] = React.useState(0);
  const isReducedMotion = React.useRef(false);
  const isVisible = React.useRef(true);
  const isTabVisible = React.useRef(true);
  const rAFRef = React.useRef<number | null>(null);
  const lastFrameTime = React.useRef(0);

  const fps = 4;
  const frameInterval = 1000 / fps;

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      isReducedMotion.current = mediaQuery.matches;

      const handleVisibilityChange = () => {
        isTabVisible.current = document.visibilityState === 'visible';
      };
      document.addEventListener('visibilitychange', handleVisibilityChange);

      return () => {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      };
    }
  }, []);

  React.useEffect(() => {
    if (!canvasRef.current || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible.current = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    observer.observe(canvasRef.current);
    return () => observer.disconnect();
  }, []);

  // Animation Loop
  React.useEffect(() => {
    if (isReducedMotion.current || !frames || frames.length <= 1) {
      if (rAFRef.current) cancelAnimationFrame(rAFRef.current);
      setCurrentFrameIndex(0);
      return;
    }

    const loop = (time: number) => {
      rAFRef.current = requestAnimationFrame(loop);

      if (!isVisible.current || !isTabVisible.current) return;

      if (time - lastFrameTime.current >= frameInterval) {
        lastFrameTime.current = time;
        setCurrentFrameIndex((prev) => (prev + 1) % frames.length);
      }
    };

    rAFRef.current = requestAnimationFrame(loop);

    return () => {
      if (rAFRef.current) cancelAnimationFrame(rAFRef.current);
    };
  }, [frames, frameInterval]);

  // Drawing Loop
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const currentGrid = (frames && frames.length > 0 && !isReducedMotion.current) 
      ? frames[currentFrameIndex] || base 
      : base;

    const rows = currentGrid.length;
    const cols = rows > 0 ? currentGrid[0].length : 0;

    const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
    const width = cols * size;
    const height = rows * size;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx.scale(dpr, dpr);
    ctx.imageSmoothingEnabled = false;

    ctx.clearRect(0, 0, width, height);

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const colorIndex = currentGrid[r][c];
        if (colorIndex > 0 && colorIndex < palette.length) {
          ctx.fillStyle = palette[colorIndex];
          ctx.fillRect(c * size, r * size, size, size);
        }
      }
    }

    if (gridLines) {
      ctx.fillStyle = 'rgba(255,255,255,0.08)';
      for (let c = 0; c <= cols; c++) {
        ctx.fillRect(c * size, 0, 1, height);
      }
      for (let r = 0; r <= rows; r++) {
        ctx.fillRect(0, r * size, width, 1);
      }
    }
  }, [base, palette, frames, size, gridLines, currentFrameIndex]);

  return (
    <canvas
      ref={canvasRef}
      className={cn('block [image-rendering:pixelated]', className)}
    />
  );
}
