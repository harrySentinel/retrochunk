'use client';

import * as React from 'react';
import { cn } from '@/lib/cn';

type LoaderSize = 'sm' | 'md' | 'lg';

const sizeMap = {
  sm: { cell: 'w-1.5 h-1.5', gap: 'gap-0.5', bar: 'h-2 w-24', orbit: 28, stack: 'w-2.5' },
  md: { cell: 'w-2.5 h-2.5', gap: 'gap-1', bar: 'h-3 w-32', orbit: 40, stack: 'w-3.5' },
  lg: { cell: 'w-4 h-4', gap: 'gap-1.5', bar: 'h-4 w-44', orbit: 56, stack: 'w-5' },
} as const;

export interface PixelLoaderBaseProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: LoaderSize;
}

/** 4×4 diagonal wave grid (classic) */
export const PixelLoader = React.forwardRef<HTMLDivElement, PixelLoaderBaseProps>(
  ({ className, size = 'md', ...props }, ref) => {
    const cells = Array.from({ length: 16 });
    const s = sizeMap[size];

    return (
      <div
        ref={ref}
        role="status"
        aria-label="Loading"
        className={cn('grid grid-cols-4 grid-rows-4', s.gap, className)}
        {...props}
      >
        {cells.map((_, i) => {
          const row = Math.floor(i / 4);
          const col = i % 4;
          const delay = (row + col) * 0.12;
          return (
            <div
              key={i}
              className={cn('bg-[var(--accent)]', s.cell)}
              style={{
                animation: 'loader-cell 1.2s infinite ease-in-out',
                animationDelay: `${delay}s`,
              }}
            />
          );
        })}
      </div>
    );
  }
);
PixelLoader.displayName = 'PixelLoader';

/** Three bouncing pixel squares */
export const PixelDotsLoader = React.forwardRef<HTMLDivElement, PixelLoaderBaseProps>(
  ({ className, size = 'md', ...props }, ref) => {
    const s = sizeMap[size];
    return (
      <div
        ref={ref}
        role="status"
        aria-label="Loading"
        className={cn('flex items-end', s.gap, className)}
        {...props}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={cn('bg-[var(--accent)]', s.cell)}
            style={{
              animation: 'loader-bounce 0.7s infinite ease-in-out',
              animationDelay: `${i * 0.12}s`,
            }}
          />
        ))}
      </div>
    );
  }
);
PixelDotsLoader.displayName = 'PixelDotsLoader';

/** Segmented bar that fills left → right */
export const PixelBarLoader = React.forwardRef<HTMLDivElement, PixelLoaderBaseProps>(
  ({ className, size = 'md', ...props }, ref) => {
    const s = sizeMap[size];
    const segments = 8;
    return (
      <div
        ref={ref}
        role="status"
        aria-label="Loading"
        className={cn(
          'flex border-2 border-[var(--border)] bg-[var(--surface)] p-0.5 shadow-[3px_3px_0_var(--border)]',
          s.bar,
          className
        )}
        {...props}
      >
        {Array.from({ length: segments }).map((_, i) => (
          <div
            key={i}
            className="flex-1 h-full bg-[var(--accent)] mx-px first:ml-0 last:mr-0"
            style={{
              animation: 'loader-bar-seg 1.4s infinite ease-in-out',
              animationDelay: `${i * 0.1}s`,
            }}
          />
        ))}
      </div>
    );
  }
);
PixelBarLoader.displayName = 'PixelBarLoader';

/** Orbiting pixels around a center */
export const PixelOrbitLoader = React.forwardRef<HTMLDivElement, PixelLoaderBaseProps>(
  ({ className, size = 'md', ...props }, ref) => {
    const s = sizeMap[size];
    const dots = 8;
    const radius = s.orbit / 2 - 4;

    return (
      <div
        ref={ref}
        role="status"
        aria-label="Loading"
        className={cn('relative', className)}
        style={{ width: s.orbit, height: s.orbit }}
        {...props}
      >
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[var(--cool)]"
          style={{
            width: size === 'sm' ? 4 : size === 'md' ? 6 : 8,
            height: size === 'sm' ? 4 : size === 'md' ? 6 : 8,
          }}
        />
        {Array.from({ length: dots }).map((_, i) => {
          const angle = (i / dots) * Math.PI * 2;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          return (
            <div
              key={i}
              className="absolute left-1/2 top-1/2 bg-[var(--accent)]"
              style={{
                width: size === 'sm' ? 4 : size === 'md' ? 6 : 8,
                height: size === 'sm' ? 4 : size === 'md' ? 6 : 8,
                marginLeft: x - (size === 'sm' ? 2 : size === 'md' ? 3 : 4),
                marginTop: y - (size === 'sm' ? 2 : size === 'md' ? 3 : 4),
                animation: 'loader-orbit-dot 1s infinite ease-in-out',
                animationDelay: `${i * 0.1}s`,
              }}
            />
          );
        })}
      </div>
    );
  }
);
PixelOrbitLoader.displayName = 'PixelOrbitLoader';

/** Blocks stacking upward */
export const PixelStackLoader = React.forwardRef<HTMLDivElement, PixelLoaderBaseProps>(
  ({ className, size = 'md', ...props }, ref) => {
    const s = sizeMap[size];
    const levels = 4;
    return (
      <div
        ref={ref}
        role="status"
        aria-label="Loading"
        className={cn('flex flex-col-reverse items-center', s.gap, className)}
        {...props}
      >
        {Array.from({ length: levels }).map((_, i) => (
          <div
            key={i}
            className={cn('bg-[var(--accent)] border border-[var(--accent-ink)]', s.stack)}
            style={{
              height: size === 'sm' ? 6 : size === 'md' ? 8 : 12,
              width: (size === 'sm' ? 10 : size === 'md' ? 14 : 20) + i * (size === 'sm' ? 4 : 6),
              animation: 'loader-stack 1.3s infinite ease-in-out',
              animationDelay: `${i * 0.15}s`,
            }}
          />
        ))}
      </div>
    );
  }
);
PixelStackLoader.displayName = 'PixelStackLoader';

/** CRT scan beam sweeping a pixel frame */
export const PixelScanLoader = React.forwardRef<HTMLDivElement, PixelLoaderBaseProps>(
  ({ className, size = 'md', ...props }, ref) => {
    const w = size === 'sm' ? 56 : size === 'md' ? 80 : 112;
    const h = size === 'sm' ? 36 : size === 'md' ? 48 : 64;

    return (
      <div
        ref={ref}
        role="status"
        aria-label="Loading"
        className={cn(
          'relative overflow-hidden border-2 border-[var(--border)] bg-[var(--surface)] shadow-[3px_3px_0_var(--border)]',
          className
        )}
        style={{ width: w, height: h }}
        {...props}
      >
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'linear-gradient(to bottom, transparent 0, transparent 2px, rgba(255,255,255,0.06) 2px, rgba(255,255,255,0.06) 4px)',
            backgroundSize: '100% 4px',
          }}
        />
        <div
          className="absolute left-0 right-0 h-[3px] bg-[var(--cool)]"
          style={{
            boxShadow: '0 0 8px var(--cool)',
            animation: 'loader-scan 1.1s infinite linear',
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="font-pixel text-[var(--text-3)]"
            style={{ fontSize: size === 'sm' ? 8 : size === 'md' ? 10 : 12 }}
          >
            LOAD
          </span>
        </div>
      </div>
    );
  }
);
PixelScanLoader.displayName = 'PixelScanLoader';
