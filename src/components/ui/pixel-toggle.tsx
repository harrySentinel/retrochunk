'use client';

import * as React from 'react';
import { cn } from '@/lib/cn';

type ToggleSize = 'sm' | 'md' | 'lg';

/**
 * Geometry is hand-tuned so every size leaves an exact 2px gutter around the
 * knob — no sub-pixel gaps, which is what keeps the edges crunchy.
 * travel = inner track width − knob − (2px × 2)
 */
const sizeMap = {
  sm: { track: 'w-9 h-5', knob: 'w-3 h-3', travel: 'translate-x-4', label: 'text-[9px]' },
  md: { track: 'w-12 h-6', knob: 'w-4 h-4', travel: 'translate-x-6', label: 'text-[10px]' },
  lg: { track: 'w-16 h-8', knob: 'w-6 h-6', travel: 'translate-x-8', label: 'text-[12px]' },
} as const;

export interface PixelToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Controlled state. Omit to let the toggle manage its own. */
  checked?: boolean;
  /** Initial state when uncontrolled. */
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  size?: ToggleSize;
  /** Optional pixel-font label rendered beside the track. Doubles as the accessible name. */
  label?: string;
}

export const PixelToggle = React.forwardRef<HTMLButtonElement, PixelToggleProps>(
  (
    {
      className,
      checked,
      defaultChecked = false,
      onCheckedChange,
      size = 'md',
      label,
      disabled,
      onClick,
      ...props
    },
    ref
  ) => {
    const [internal, setInternal] = React.useState(defaultChecked);
    const isControlled = checked !== undefined;
    const isOn = isControlled ? checked : internal;
    const s = sizeMap[size];

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      const next = !isOn;
      // Updater form so clicks batched into one render still each toggle
      if (!isControlled) setInternal((prev) => !prev);
      onCheckedChange?.(next);
      onClick?.(event);
    };

    return (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={isOn}
        disabled={disabled}
        onClick={handleClick}
        className={cn(
          'group inline-flex items-center gap-3 bg-transparent',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]',
          'disabled:opacity-50 disabled:pointer-events-none',
          className
        )}
        {...props}
      >
        {/* Track */}
        <span
          className={cn(
            'relative shrink-0 border-[2px] border-solid transition-all duration-75',
            'group-active:translate-x-[2px] group-active:translate-y-[2px]',
            s.track,
            isOn
              ? 'bg-[var(--accent)] border-[var(--accent-ink)] shadow-[3px_3px_0_var(--accent-ink)] group-active:shadow-[1px_1px_0_var(--accent-ink)]'
              : 'bg-[var(--surface-2)] border-[var(--border)] shadow-[3px_3px_0_var(--border)] group-active:shadow-[1px_1px_0_var(--border)]'
          )}
        >
          {/* Knob — steps() keeps the travel chunky instead of smoothly eased */}
          <span
            className={cn(
              'absolute top-[2px] left-[2px] transition-transform duration-100',
              '[transition-timing-function:steps(3,end)]',
              s.knob,
              isOn ? cn(s.travel, 'bg-[var(--accent-ink)]') : 'bg-[var(--text-3)]'
            )}
          />
        </span>

        {label ? (
          <span
            className={cn(
              'uppercase tracking-wider',
              s.label,
              isOn ? 'text-[var(--text)]' : 'text-[var(--text-2)]'
            )}
            style={{ fontFamily: 'var(--font-pixel)' }}
          >
            {label}
          </span>
        ) : null}
      </button>
    );
  }
);
PixelToggle.displayName = 'PixelToggle';
