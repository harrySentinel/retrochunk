'use client';

import * as React from 'react';
import { cn } from '@/lib/cn';
import { PixelButton } from '@/components/ui';
import { Mascot } from '@/components/mascot';
import Link from 'next/link';

interface HeroPixelProps {
  title: string;
  titleAccent?: string;
  subtitle: string;
  ctaText?: string;
  ctaHref?: string;
  secondaryText?: string;
  secondaryHref?: string;
  className?: string;
}

export const HeroPixel: React.FC<HeroPixelProps> = ({
  title,
  titleAccent,
  subtitle,
  ctaText,
  ctaHref,
  secondaryText,
  secondaryHref,
  className
}) => {
  return (
    <section className={cn("relative overflow-hidden w-full min-h-[80vh] flex items-center justify-center py-20", className)}>
      {/* Decorative floating pixels */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-[var(--text-3)] w-2 h-2 opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `pixel-float ${3 + Math.random() * 5}s ease-in-out infinite alternate`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 flex flex-col md:flex-row items-center gap-12 md:gap-20">
        <div className="flex-1 text-center md:text-left space-y-6 md:space-y-8 max-w-2xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl leading-tight" style={{ fontFamily: 'var(--font-pixel)' }}>
            <span className="text-[var(--text)]">{title}</span>
            {titleAccent && (
              <>
                {' '}
                <span className="text-[var(--accent)]">{titleAccent}</span>
              </>
            )}
          </h1>
          
          <p className="text-lg md:text-xl text-[var(--text-2)] max-w-2xl leading-relaxed" style={{ fontFamily: 'var(--font-sans)' }}>
            {subtitle}
          </p>
          
          <div className="flex flex-wrap items-center gap-4 pt-4">
            {ctaText && (
              ctaHref ? (
                <Link href={ctaHref}>
                  <PixelButton variant="primary" size="lg">{ctaText}</PixelButton>
                </Link>
              ) : (
                <PixelButton variant="primary" size="lg">{ctaText}</PixelButton>
              )
            )}
            
            {secondaryText && (
              secondaryHref ? (
                <Link href={secondaryHref}>
                  <PixelButton variant="secondary" size="lg">{secondaryText}</PixelButton>
                </Link>
              ) : (
                <PixelButton variant="secondary" size="lg">{secondaryText}</PixelButton>
              )
            )}
          </div>
        </div>

        <div className="flex-shrink-0 flex items-center justify-center pt-8 md:pt-0">
          <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 flex items-center justify-center">
            {/* Mascot background decoration */}
            <div className="absolute inset-0 bg-[var(--surface-2)] opacity-50 rounded-full blur-[80px]" />
            <Mascot size={12} animation="idle" />
          </div>
        </div>
      </div>
    </section>
  );
};
