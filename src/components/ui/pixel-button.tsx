'use client';

import * as React from 'react';
import { cn } from '@/lib/cn';

export interface PixelButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

export const PixelButton = React.forwardRef<HTMLButtonElement, PixelButtonProps>(
  ({ className, variant = 'primary', size = 'md', disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          'inline-flex items-center justify-center transition-all duration-75',
          'border-[2px] border-solid',
          'disabled:opacity-50 disabled:pointer-events-none',
          {
            'bg-[var(--accent)] text-[var(--accent-ink)] border-[var(--accent-ink)] shadow-[4px_4px_0_var(--accent-ink)] active:shadow-[1px_1px_0_var(--accent-ink)] active:translate-x-[3px] active:translate-y-[3px]': variant === 'primary',
            'bg-[var(--surface)] text-[var(--text)] border-[var(--border)] shadow-[4px_4px_0_var(--border)] active:shadow-[1px_1px_0_var(--border)] active:translate-x-[3px] active:translate-y-[3px]': variant === 'secondary',
            'bg-transparent text-[var(--text)] border-transparent shadow-none hover:bg-[var(--surface-2)] active:scale-95': variant === 'ghost',
            'bg-[var(--danger)] text-[var(--text)] border-[var(--text)] shadow-[4px_4px_0_var(--text)] active:shadow-[1px_1px_0_var(--text)] active:translate-x-[3px] active:translate-y-[3px]': variant === 'danger',
            'h-8 px-3 text-xs': size === 'sm',
            'h-10 px-4 text-sm': size === 'md',
            'h-12 px-6 text-base': size === 'lg',
          },
          className
        )}
        style={{ fontFamily: 'var(--font-pixel)' }}
        {...props}
      >
        {children}
      </button>
    );
  }
);
PixelButton.displayName = 'PixelButton';
