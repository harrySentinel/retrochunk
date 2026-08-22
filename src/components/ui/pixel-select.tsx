'use client';

import * as React from 'react';
import { cn } from '@/lib/cn';

const sizeMap = {
  sm: { field: 'h-8 pl-2.5 pr-8 text-xs', caret: 'right-2.5' },
  md: { field: 'h-10 pl-3 pr-9 text-sm', caret: 'right-3' },
  lg: { field: 'h-12 pl-4 pr-10 text-base', caret: 'right-4' },
} as const;

/** Stepped triangle — a wider row per line down, so the edges stay blocky. */
const CARET_ROWS: Array<[number, number, number]> = [
  [0, 0, 7], // [y, x, width]
  [1, 1, 5],
  [2, 2, 3],
  [3, 3, 1],
];

export interface PixelSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface PixelSelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size' | 'children'> {
  options: PixelSelectOption[];
  label?: string;
  hint?: string;
  error?: string;
  /** Renders a disabled first option; pairs with defaultValue="" */
  placeholder?: string;
  size?: keyof typeof sizeMap;
}

export const PixelSelect = React.forwardRef<HTMLSelectElement, PixelSelectProps>(
  (
    { className, options, label, hint, error, placeholder, size = 'md', id, disabled, ...props },
    ref
  ) => {
    const generatedId = React.useId();
    const selectId = id ?? generatedId;
    const s = sizeMap[size];

    return (
      <div className="flex w-full flex-col gap-1.5">
        {label ? (
          <label
            htmlFor={selectId}
            className="font-pixel text-[10px] uppercase tracking-wider text-[var(--text-2)]"
          >
            {label}
          </label>
        ) : null}
        <div className="relative w-full">
          <select
            ref={ref}
            id={selectId}
            disabled={disabled}
            aria-invalid={Boolean(error) || undefined}
            aria-describedby={error ? `${selectId}-error` : hint ? `${selectId}-hint` : undefined}
            className={cn(
              'w-full appearance-none bg-[var(--surface)] text-[var(--text)]',
              'border-[2px] border-solid outline-none transition-colors duration-75',
              'focus:border-[var(--accent)] focus:shadow-[3px_3px_0_var(--accent)]',
              'disabled:opacity-50 disabled:pointer-events-none',
              s.field,
              error
                ? 'border-[var(--danger)] shadow-[3px_3px_0_var(--danger)]'
                : 'border-[var(--border)] shadow-[3px_3px_0_var(--border)]',
              className
            )}
            style={{ fontFamily: 'var(--font-sans)' }}
            {...props}
          >
            {placeholder ? (
              <option value="" disabled>
                {placeholder}
              </option>
            ) : null}
            {options.map((opt) => (
              <option
                key={opt.value}
                value={opt.value}
                disabled={opt.disabled}
                style={{ backgroundColor: 'var(--surface)', color: 'var(--text)' }}
              >
                {opt.label}
              </option>
            ))}
          </select>
          {/* Pixel caret. pointer-events-none so clicks fall through to the select. */}
          <svg
            viewBox="0 0 7 4"
            shapeRendering="crispEdges"
            aria-hidden="true"
            className={cn(
              'pointer-events-none absolute top-1/2 w-[7px] -translate-y-1/2',
              disabled && 'opacity-50',
              s.caret
            )}
          >
            {CARET_ROWS.map(([y, x, w]) => (
              <rect key={y} x={x} y={y} width={w} height="1" fill="var(--text-2)" />
            ))}
          </svg>
        </div>
        {error ? (
          <p id={`${selectId}-error`} className="font-sans text-[11px] text-[var(--danger)]">
            {error}
          </p>
        ) : hint ? (
          <p id={`${selectId}-hint`} className="font-sans text-[11px] text-[var(--text-3)]">
            {hint}
          </p>
        ) : null}
      </div>
    );
  }
);
PixelSelect.displayName = 'PixelSelect';
