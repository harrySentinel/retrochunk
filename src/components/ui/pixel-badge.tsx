'use client';

import * as React from 'react';
import { cn } from '@/lib/cn';

export interface PixelBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'cool' | 'success' | 'danger' | 'outline';
  dot?: boolean;
}

export const PixelBadge = React.forwardRef<HTMLSpanElement, PixelBadgeProps>(
  ({ className, variant = 'default', dot, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center gap-1.5 px-2 py-0.5 text-xs uppercase border-[2px] border-solid',
          {
            'bg-[var(--accent)] text-[var(--accent-ink)] border-[var(--accent-ink)]': variant === 'default',
            'bg-[var(--cool)] text-[var(--bg)] border-[var(--bg)]': variant === 'cool',
            'bg-[var(--success)] text-[var(--bg)] border-[var(--bg)]': variant === 'success',
            'bg-[var(--danger)] text-[var(--text)] border-[var(--text)]': variant === 'danger',
            'bg-transparent text-[var(--text)] border-[var(--border)]': variant === 'outline',
          },
          className
        )}
        style={{ fontFamily: 'var(--font-pixel)' }}
        {...props}
      >
        {dot && (
          <span className="w-1.5 h-1.5 rounded-none bg-current animate-pulse opacity-75" />
        )}
        {children}
      </span>
    );
  }
);
PixelBadge.displayName = 'PixelBadge';
