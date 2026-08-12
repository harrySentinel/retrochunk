'use client';

import * as React from 'react';
import { cn } from '@/lib/cn';

export interface PixelCardProps extends React.HTMLAttributes<HTMLDivElement> {
  notch?: boolean;
  hover?: boolean;
}

export const PixelCard = React.forwardRef<HTMLDivElement, PixelCardProps>(
  ({ className, notch, hover, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'bg-[var(--surface)] border-[2px] border-[var(--border)] shadow-[4px_4px_0_var(--border)]',
          'p-4 text-[var(--text)] transition-transform duration-75',
          hover && 'hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0_var(--border)]',
          notch && 'clip-path-notch',
          className
        )}
        style={{
          clipPath: notch ? 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)' : undefined,
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);
PixelCard.displayName = 'PixelCard';
