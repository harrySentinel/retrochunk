'use client';

import * as React from 'react';
import { cn } from '@/lib/cn';

const sizeMap = {
  sm: { box: 'w-4 h-4', dot: 'w-1.5 h-1.5', label: 'text-[9px]' },
  md: { box: 'w-5 h-5', dot: 'w-2 h-2', label: 'text-[10px]' },
  lg: { box: 'w-6 h-6', dot: 'w-2.5 h-2.5', label: 'text-[12px]' },
} as const;

export interface PixelRadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface PixelRadioGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  options: PixelRadioOption[];
  /** Shared input name. Auto-generated when omitted. */
  name?: string;
  /** Controlled selection. Omit for uncontrolled use. */
  value?: string;
  /** Initial selection when uncontrolled. */
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  label?: string;
  hint?: string;
  error?: string;
  size?: keyof typeof sizeMap;
  orientation?: 'vertical' | 'horizontal';
  disabled?: boolean;
}

export const PixelRadioGroup = React.forwardRef<HTMLDivElement, PixelRadioGroupProps>(
  (
    {
      className,
      options,
      name,
      value,
      defaultValue,
      onValueChange,
      label,
      hint,
      error,
      size = 'md',
      orientation = 'vertical',
      disabled,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const groupName = name ?? generatedId;
    const s = sizeMap[size];
    const isControlled = value !== undefined;
    const describedBy = error ? `${generatedId}-error` : hint ? `${generatedId}-hint` : undefined;

    return (
      <div ref={ref} className={cn('flex w-full flex-col gap-2', className)} {...props}>
        {label ? (
          <span
            id={`${generatedId}-label`}
            className="font-pixel text-[10px] uppercase tracking-wider text-[var(--text-2)]"
          >
            {label}
          </span>
        ) : null}
        <div
          role="radiogroup"
          aria-labelledby={label ? `${generatedId}-label` : undefined}
          aria-describedby={describedBy}
          aria-invalid={Boolean(error) || undefined}
          className={cn('flex gap-2.5', orientation === 'vertical' ? 'flex-col' : 'flex-row flex-wrap gap-x-5')}
        >
          {options.map((opt) => {
            // ids are per-instance so two groups may share a `name` without colliding
            const optionId = `${generatedId}-${opt.value}`;
            const optionDisabled = disabled || opt.disabled;
            return (
              <label
                key={opt.value}
                htmlFor={optionId}
                className={cn(
                  'inline-flex w-fit items-center gap-2.5',
                  optionDisabled ? 'cursor-not-allowed' : 'cursor-pointer'
                )}
              >
                {/* Native radios give arrow-key navigation within the group for free */}
                <input
                  id={optionId}
                  type="radio"
                  name={groupName}
                  value={opt.value}
                  disabled={optionDisabled}
                  className="peer sr-only"
                  {...(isControlled
                    ? { checked: value === opt.value, onChange: () => onValueChange?.(opt.value) }
                    : {
                        defaultChecked: defaultValue === opt.value,
                        onChange: () => onValueChange?.(opt.value),
                      })}
                />
                <span
                  className={cn(
                    'relative grid shrink-0 place-items-center border-[2px] border-solid transition-colors duration-75',
                    'bg-[var(--surface)] peer-checked:bg-[var(--accent)]',
                    'peer-checked:[&>span]:opacity-100',
                    'peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[var(--accent)]',
                    'peer-disabled:opacity-50',
                    s.box,
                    error
                      ? 'border-[var(--danger)] shadow-[3px_3px_0_var(--danger)] peer-checked:border-[var(--danger)] peer-checked:shadow-[3px_3px_0_var(--danger)]'
                      : 'border-[var(--border)] shadow-[3px_3px_0_var(--border)] peer-checked:border-[var(--accent-ink)] peer-checked:shadow-[3px_3px_0_var(--accent-ink)]'
                  )}
                >
                  {/* Square inside a square — a round dot would break the grid */}
                  <span className={cn('opacity-0 bg-[var(--accent-ink)]', s.dot)} />
                </span>
                <span
                  className={cn(
                    'uppercase tracking-wider text-[var(--text-2)]',
                    optionDisabled && 'opacity-50',
                    s.label
                  )}
                  style={{ fontFamily: 'var(--font-pixel)' }}
                >
                  {opt.label}
                </span>
              </label>
            );
          })}
        </div>
        {error ? (
          <p id={`${generatedId}-error`} className="font-sans text-[11px] text-[var(--danger)]">
            {error}
          </p>
        ) : hint ? (
          <p id={`${generatedId}-hint`} className="font-sans text-[11px] text-[var(--text-3)]">
            {hint}
          </p>
        ) : null}
      </div>
    );
  }
);
PixelRadioGroup.displayName = 'PixelRadioGroup';
