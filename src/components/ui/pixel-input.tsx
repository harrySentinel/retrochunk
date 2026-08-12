'use client';

import * as React from 'react';
import { cn } from '@/lib/cn';

export interface PixelInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const PixelInput = React.forwardRef<HTMLInputElement, PixelInputProps>(
  ({ className, label, error, hint, id, disabled, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;

    return (
      <div className="flex w-full flex-col gap-1.5">
        {label ? (
          <label
            htmlFor={inputId}
            className="font-pixel text-[10px] uppercase tracking-wider text-[var(--text-2)]"
          >
            {label}
          </label>
        ) : null}
        <input
          ref={ref}
          id={inputId}
          disabled={disabled}
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
          className={cn(
            'w-full h-10 px-3 bg-[var(--surface)] text-[var(--text)]',
            'border-[2px] border-solid outline-none transition-colors duration-75',
            'placeholder:text-[var(--text-3)]',
            'focus:border-[var(--accent)] focus:shadow-[3px_3px_0_var(--accent)]',
            'disabled:opacity-50 disabled:pointer-events-none',
            error
              ? 'border-[var(--danger)] shadow-[3px_3px_0_var(--danger)]'
              : 'border-[var(--border)] shadow-[3px_3px_0_var(--border)]',
            className
          )}
          style={{ fontFamily: 'var(--font-sans)' }}
          {...props}
        />
        {error ? (
          <p id={`${inputId}-error`} className="font-sans text-[11px] text-[var(--danger)]">
            {error}
          </p>
        ) : hint ? (
          <p id={`${inputId}-hint`} className="font-sans text-[11px] text-[var(--text-3)]">
            {hint}
          </p>
        ) : null}
      </div>
    );
  }
);
PixelInput.displayName = 'PixelInput';
