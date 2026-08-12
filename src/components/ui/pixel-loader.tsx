'use client';

import * as React from 'react';
import { cn } from '@/lib/cn';

export interface PixelLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg';
}

export const PixelLoader = React.forwardRef<HTMLDivElement, PixelLoaderProps>(
  ({ className, size = 'md', ...props }, ref) => {
    const cells = Array.from({ length: 16 });
    
    return (
      <div
        ref={ref}
        className={cn(
          'grid grid-cols-4 grid-rows-4 gap-0.5',
          className
        )}
        {...props}
      >
        {cells.map((_, i) => {
          const row = Math.floor(i / 4);
          const col = i % 4;
          const delay = (row + col) * 0.15;
          return (
            <div
              key={i}
              className={cn(
                'bg-[var(--accent)]',
                {
                  'w-1.5 h-1.5': size === 'sm',
                  'w-2.5 h-2.5': size === 'md',
                  'w-4 h-4': size === 'lg',
                }
              )}
              style={{
                animation: `loader-cell 1.2s infinite ease-in-out`,
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
