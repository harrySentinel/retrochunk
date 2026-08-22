'use client';

import * as React from 'react';
import { cn } from '@/lib/cn';

const sizeMap = {
  sm: { box: 'w-4 h-4', label: 'text-[9px]' },
  md: { box: 'w-5 h-5', label: 'text-[10px]' },
  lg: { box: 'w-6 h-6', label: 'text-[12px]' },
} as const;

/** 2px-thick pixel checkmark plotted on a 7x7 grid — no anti-aliased tick. */
const CHECK_PIXELS: Array<[number, number]> = [
  [0, 2], [1, 3], [2, 4], [3, 3], [4, 2], [5, 1], [6, 0],
  [0, 3], [1, 4], [2, 5], [3, 4], [4, 3], [5, 2], [6, 1],
];

export interface PixelCheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: string;
  hint?: string;
  error?: string;
  size?: keyof typeof sizeMap;
}

export const PixelCheckbox = React.forwardRef<HTMLInputElement, PixelCheckboxProps>(
  ({ className, label, hint, error, size = 'md', id, disabled, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;
    const s = sizeMap[size];

    return (
      <div className={cn('flex w-full flex-col gap-1.5', className)}>
        <label
          htmlFor={inputId}
          className={cn(
            'inline-flex w-fit items-center gap-2.5',
            disabled ? 'cursor-not-allowed' : 'cursor-pointer'
          )}
        >
          {/* Real checkbox: form submission, Space to toggle, a11y tree — all native */}
          <input
            ref={ref}
            id={inputId}
            type="checkbox"
            disabled={disabled}
            aria-invalid={Boolean(error) || undefined}
            aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
            className="peer sr-only"
            {...props}
          />
          <span
            className={cn(
              'relative grid shrink-0 place-items-center border-[2px] border-solid transition-colors duration-75',
              'bg-[var(--surface)] peer-checked:bg-[var(--accent)]',
              'peer-checked:[&>svg]:opacity-100',
              'peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[var(--accent)]',
              'peer-disabled:opacity-50',
              s.box,
              error
                ? 'border-[var(--danger)] shadow-[3px_3px_0_var(--danger)] peer-checked:border-[var(--danger)] peer-checked:shadow-[3px_3px_0_var(--danger)]'
                : 'border-[var(--border)] shadow-[3px_3px_0_var(--border)] peer-checked:border-[var(--accent-ink)] peer-checked:shadow-[3px_3px_0_var(--accent-ink)]'
            )}
          >
            <svg
              viewBox="0 0 7 7"
              shapeRendering="crispEdges"
              aria-hidden="true"
              className="h-full w-full opacity-0"
            >
              {CHECK_PIXELS.map(([x, y]) => (
                <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill="var(--accent-ink)" />
              ))}
            </svg>
          </span>
          {label ? (
            <span
              className={cn('uppercase tracking-wider text-[var(--text-2)]', s.label)}
              style={{ fontFamily: 'var(--font-pixel)' }}
            >
              {label}
            </span>
          ) : null}
        </label>
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
PixelCheckbox.displayName = 'PixelCheckbox';
