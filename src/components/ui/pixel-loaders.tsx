'use client';

import * as React from 'react';
import { cn } from '@/lib/cn';

type LoaderSize = 'sm' | 'md' | 'lg';

const loaderShell = 'loader-shell';

const sizeMap = {
  sm: { cell: 'w-1.5 h-1.5', gap: 'gap-0.5', bar: 'h-2 w-24', orbit: 28, stack: 'w-2.5', eq: 'w-1 h-3' },
  md: { cell: 'w-2.5 h-2.5', gap: 'gap-1', bar: 'h-3 w-32', orbit: 40, stack: 'w-3.5', eq: 'w-1.5 h-5' },
  lg: { cell: 'w-4 h-4', gap: 'gap-1.5', bar: 'h-4 w-44', orbit: 56, stack: 'w-5', eq: 'w-2 h-7' },
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
          'flex border-2 border-[var(--border)] bg-[var(--surface)] p-0.5 loader-shell',
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
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border border-[var(--border)] bg-[var(--accent)]"
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
          'relative overflow-hidden loader-shell',
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
          className="absolute left-0 right-0 h-[3px] bg-[var(--accent)]"
          style={{
            boxShadow: '0 0 8px color-mix(in srgb, var(--accent) 55%, transparent)',
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

/** Pixel travels around a square path */
export const PixelSnakeLoader = React.forwardRef<HTMLDivElement, PixelLoaderBaseProps>(
  ({ className, size = 'md', ...props }, ref) => {
    const cell = size === 'sm' ? 6 : size === 'md' ? 8 : 10;
    const gap = size === 'sm' ? 2 : size === 'md' ? 3 : 4;
    const cols = 5;
    const rows = 5;
    const w = cols * cell + (cols - 1) * gap;
    const h = rows * cell + (rows - 1) * gap;

    const path: Array<[number, number]> = [];
    for (let c = 0; c < cols; c++) path.push([0, c]);
    for (let r = 1; r < rows; r++) path.push([r, cols - 1]);
    for (let c = cols - 2; c >= 0; c--) path.push([rows - 1, c]);
    for (let r = rows - 2; r > 0; r--) path.push([r, 0]);

    return (
      <div
        ref={ref}
        role="status"
        aria-label="Loading"
        className={cn('relative', className)}
        style={{ width: w, height: h }}
        {...props}
      >
        {path.map(([r, c], i) => (
          <div
            key={i}
            className="absolute bg-[var(--surface-2)] border border-[var(--border)]"
            style={{
              width: cell,
              height: cell,
              left: c * (cell + gap),
              top: r * (cell + gap),
            }}
          />
        ))}
        {path.map(([r, c], i) => (
          <div
            key={`head-${i}`}
            className="absolute bg-[var(--accent)]"
            style={{
              width: cell,
              height: cell,
              left: c * (cell + gap),
              top: r * (cell + gap),
              animation: 'loader-snake 1.6s infinite steps(1, end)',
              animationDelay: `${-(i / path.length) * 1.6}s`,
            }}
          />
        ))}
      </div>
    );
  }
);
PixelSnakeLoader.displayName = 'PixelSnakeLoader';

/** Sand drains, fills, flips — clean pixel hourglass */
export const PixelHourglassLoader = React.forwardRef<HTMLDivElement, PixelLoaderBaseProps>(
  ({ className, size = 'md', ...props }, ref) => {
    const cell = size === 'sm' ? 4 : size === 'md' ? 6 : 8;
    const gap = 1;
    const cols = 7;
    const rows = 9;
    const cycle = 2.8;

    type Cell = 'frame' | 'air' | 'sand-top' | 'sand-bot';
    const grid: Cell[][] = [
      ['frame', 'frame', 'frame', 'frame', 'frame', 'frame', 'frame'],
      ['frame', 'air', 'air', 'air', 'air', 'air', 'frame'],
      ['frame', 'air', 'sand-top', 'sand-top', 'sand-top', 'air', 'frame'],
      ['frame', 'air', 'air', 'sand-top', 'air', 'air', 'frame'],
      ['frame', 'frame', 'air', 'air', 'air', 'frame', 'frame'],
      ['frame', 'air', 'air', 'sand-bot', 'air', 'air', 'frame'],
      ['frame', 'air', 'sand-bot', 'sand-bot', 'sand-bot', 'air', 'frame'],
      ['frame', 'air', 'air', 'air', 'air', 'air', 'frame'],
      ['frame', 'frame', 'frame', 'frame', 'frame', 'frame', 'frame'],
    ];

    const topDrainOrder: Array<[number, number]> = [
      [3, 3],
      [2, 3],
      [2, 2],
      [2, 4],
    ];
    const bottomFillOrder: Array<[number, number]> = [
      [5, 3],
      [6, 3],
      [6, 2],
      [6, 4],
    ];

    const drainIndex = (r: number, c: number) =>
      topDrainOrder.findIndex(([tr, tc]) => tr === r && tc === c);
    const fillIndex = (r: number, c: number) =>
      bottomFillOrder.findIndex(([br, bc]) => br === r && bc === c);

    const innerW = cols * cell + (cols - 1) * gap;
    const innerH = rows * cell + (rows - 1) * gap;
    const pad = size === 'sm' ? 10 : size === 'md' ? 12 : 14;
    const w = innerW + pad * 2;
    const h = innerH + pad * 2;
    const neckX = 3 * (cell + gap) + cell / 2;
    const neckY = 3 * (cell + gap);
    const fallDist = 2 * (cell + gap);

    return (
      <div
        ref={ref}
        role="status"
        aria-label="Loading"
        className={cn('relative flex items-center justify-center', loaderShell, className)}
        style={{ width: w, height: h, ['--hour-fall' as string]: `${fallDist}px` }}
        {...props}
      >
        <div
          className="relative"
          style={{
            width: innerW,
            height: innerH,
            animation: `loader-hour-flip ${cycle}s infinite ease-in-out`,
          }}
        >
          {grid.map((row, r) =>
            row.map((kind, c) => {
              if (kind === 'air') return null;

              const left = c * (cell + gap);
              const topPos = r * (cell + gap);
              const isFrame = kind === 'frame';
              const drain = kind === 'sand-top' ? drainIndex(r, c) : -1;
              const fill = kind === 'sand-bot' ? fillIndex(r, c) : -1;
              const isTopShell = isFrame && r <= 4;
              const isBottomShell = isFrame && r >= 5;

              let animation: string | undefined;
              let animationDelay: string | undefined;

              if (isTopShell) {
                animation = `loader-hour-shell-top ${cycle}s infinite ease-in-out`;
              } else if (isBottomShell) {
                animation = `loader-hour-shell-bot ${cycle}s infinite ease-in-out`;
              } else if (drain >= 0) {
                animation = `loader-hour-drain ${cycle}s infinite ease-in-out`;
                animationDelay = `${drain * 0.12}s`;
              } else if (fill >= 0) {
                animation = `loader-hour-fill ${cycle}s infinite ease-in-out`;
                animationDelay = `${0.45 + fill * 0.12}s`;
              }

              return (
                <div
                  key={`${r}-${c}`}
                  className={cn(isFrame ? 'bg-[var(--border)]' : 'bg-[var(--accent)]')}
                  style={{
                    position: 'absolute',
                    width: cell,
                    height: cell,
                    left,
                    top: topPos,
                    animation,
                    animationDelay,
                    ...(kind === 'sand-bot' && fill >= 0 ? { opacity: 0, transform: 'scale(0.4)' } : {}),
                  }}
                />
              );
            })
          )}

          <div
            className="absolute bg-[var(--accent)]"
            style={{
              width: cell * 0.5,
              height: cell * 0.5,
              left: neckX - cell * 0.25,
              top: neckY,
              animation: `loader-hour-grain ${cycle}s infinite ease-in`,
            }}
          />
        </div>
      </div>
    );
  }
);
PixelHourglassLoader.displayName = 'PixelHourglassLoader';

/** CRT glitch bars with jitter */
export const PixelGlitchLoader = React.forwardRef<HTMLDivElement, PixelLoaderBaseProps>(
  ({ className, size = 'md', ...props }, ref) => {
    const w = size === 'sm' ? 48 : size === 'md' ? 72 : 96;
    const h = size === 'sm' ? 32 : size === 'md' ? 44 : 56;
    const bars = 5;
    return (
      <div
        ref={ref}
        role="status"
        aria-label="Loading"
        className={cn(
          'relative overflow-hidden loader-shell',
          className
        )}
        style={{ width: w, height: h }}
        {...props}
      >
        {Array.from({ length: bars }).map((_, i) => (
          <div
            key={i}
            className="absolute left-0 right-0 bg-[var(--accent)] opacity-80"
            style={{
              height: size === 'sm' ? 3 : 4,
              top: `${12 + i * 16}%`,
              animation: 'loader-glitch 0.9s infinite steps(2, end)',
              animationDelay: `${i * 0.12}s`,
            }}
          />
        ))}
        <div
          className="absolute inset-0 mix-blend-screen opacity-20 bg-[var(--accent)]"
          style={{ animation: 'loader-glitch-flash 1.2s infinite' }}
        />
      </div>
    );
  }
);
PixelGlitchLoader.displayName = 'PixelGlitchLoader';

/** Square-orbit tracker — runner chases the ring, core pulses */
export const PixelRingLoader = React.forwardRef<HTMLDivElement, PixelLoaderBaseProps>(
  ({ className, size = 'md', ...props }, ref) => {
    const cell = size === 'sm' ? 4 : size === 'md' ? 6 : 8;
    const gap = 1;
    const n = 7;
    const cycle = 2;

    const path: Array<[number, number]> = [];
    for (let c = 0; c < n; c++) path.push([0, c]);
    for (let r = 1; r < n; r++) path.push([r, n - 1]);
    for (let c = n - 2; c >= 0; c--) path.push([n - 1, c]);
    for (let r = n - 2; r > 0; r--) path.push([r, 0]);

    const innerW = n * cell + (n - 1) * gap;
    const pad = size === 'sm' ? 10 : size === 'md' ? 12 : 14;
    const box = innerW + pad * 2;
    const pos = (r: number, c: number) => ({
      left: c * (cell + gap),
      top: r * (cell + gap),
    });

    return (
      <div
        ref={ref}
        role="status"
        aria-label="Loading"
        className={cn('relative flex items-center justify-center', loaderShell, className)}
        style={{ width: box, height: box }}
        {...props}
      >
        <div className="relative" style={{ width: innerW, height: innerW }}>
          {path.map(([r, c], i) => (
            <div
              key={`track-${i}`}
              className="absolute border border-[var(--border)] bg-[var(--surface-2)]"
              style={{ ...pos(r, c), width: cell, height: cell }}
            />
          ))}

          {path.map(([r, c], i) => (
            <div
              key={`head-${i}`}
              className="absolute bg-[var(--accent)]"
              style={{
                ...pos(r, c),
                width: cell,
                height: cell,
                animation: `loader-ring-run ${cycle}s infinite ease-in-out`,
                animationDelay: `${-(i / path.length) * cycle}s`,
              }}
            />
          ))}

          <div
            className="absolute left-1/2 top-1/2 border-2 border-[var(--border)] bg-[var(--accent)]"
            style={{
              width: cell * 1.25,
              height: cell * 1.25,
              marginLeft: -(cell * 0.625),
              marginTop: -(cell * 0.625),
              animation: `loader-ring-core ${cycle}s infinite ease-in-out`,
            }}
          />
        </div>
      </div>
    );
  }
);
PixelRingLoader.displayName = 'PixelRingLoader';

/** Audio equalizer bars */
export const PixelEqualizerLoader = React.forwardRef<HTMLDivElement, PixelLoaderBaseProps>(
  ({ className, size = 'md', ...props }, ref) => {
    const s = sizeMap[size];
    const bars = 7;
    return (
      <div
        ref={ref}
        role="status"
        aria-label="Loading"
        className={cn(
          'flex items-end px-2 py-1.5 loader-shell',
          s.gap,
          className
        )}
        style={{ height: size === 'sm' ? 28 : size === 'md' ? 40 : 52 }}
        {...props}
      >
        {Array.from({ length: bars }).map((_, i) => (
          <div
            key={i}
            className={cn('bg-[var(--accent)] origin-bottom', s.eq.split(' ')[0])}
            style={{
              height: size === 'sm' ? 12 : size === 'md' ? 18 : 24,
              animation: 'loader-eq 0.8s infinite ease-in-out',
              animationDelay: `${i * 0.08}s`,
            }}
          />
        ))}
      </div>
    );
  }
);
PixelEqualizerLoader.displayName = 'PixelEqualizerLoader';

/** Concentric pixel ripple — rings light up from the center outward */
export const PixelPulseLoader = React.forwardRef<HTMLDivElement, PixelLoaderBaseProps>(
  ({ className, size = 'md', ...props }, ref) => {
    const cell = size === 'sm' ? 3 : size === 'md' ? 5 : 7;
    const gap = 1;
    const grid = 9;
    const center = 4;
    const cycle = 1.6;
    const rings = 5;

    const cells: Array<{ r: number; c: number; ring: number }> = [];
    for (let r = 0; r < grid; r++) {
      for (let c = 0; c < grid; c++) {
        cells.push({ r, c, ring: Math.max(Math.abs(r - center), Math.abs(c - center)) });
      }
    }

    const innerW = grid * cell + (grid - 1) * gap;
    const pad = size === 'sm' ? 10 : size === 'md' ? 12 : 14;

    return (
      <div
        ref={ref}
        role="status"
        aria-label="Loading"
        className={cn('relative flex items-center justify-center', loaderShell, className)}
        style={{ width: innerW + pad * 2, height: innerW + pad * 2 }}
        {...props}
      >
        <div className="relative" style={{ width: innerW, height: innerW }}>
          {cells.map(({ r, c, ring }) => (
            <div
              key={`${r}-${c}`}
              className="absolute bg-[var(--accent)]"
              style={{
                width: cell,
                height: cell,
                left: c * (cell + gap),
                top: r * (cell + gap),
                opacity: 0.12,
                animation: `loader-pulse-cell ${cycle}s infinite ease-in-out`,
                animationDelay: `${(ring / rings) * cycle * 0.7}s`,
              }}
            />
          ))}
        </div>
      </div>
    );
  }
);
PixelPulseLoader.displayName = 'PixelPulseLoader';
