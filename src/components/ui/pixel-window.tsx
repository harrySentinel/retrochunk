'use client';

import * as React from 'react';
import { cn } from '@/lib/cn';

export interface PixelWindowProps {
  title?: string;
  compact?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const PixelWindow = React.forwardRef<HTMLDivElement, PixelWindowProps>(
  ({ className, title, compact, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'bg-[var(--surface)] border-[2px] border-[var(--border)] shadow-[4px_4px_0_var(--border)] flex flex-col',
          className
        )}
        {...props}
      >
        <div className="flex items-center justify-between px-3 py-2 bg-[var(--surface-2)] border-b-[2px] border-[var(--border)]">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 bg-[var(--danger)] border-[1px] border-[var(--border)] rounded-full" />
            <div className="w-2.5 h-2.5 bg-[var(--accent)] border-[1px] border-[var(--border)] rounded-full" />
            <div className="w-2.5 h-2.5 bg-[var(--success)] border-[1px] border-[var(--border)] rounded-full" />
          </div>
          {title && (
            <div 
              className="text-xs uppercase text-[var(--text-2)]" 
              style={{ fontFamily: 'var(--font-pixel)' }}
            >
              {title}
            </div>
          )}
          <div className="w-10" /> {/* Spacer to balance title */}
        </div>
        <div className={cn('flex-1 text-[var(--text)]', compact ? 'p-2' : 'p-4')}>
          {children}
        </div>
      </div>
    );
  }
);
PixelWindow.displayName = 'PixelWindow';
