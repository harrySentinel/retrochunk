'use client';

import React, { useState, useEffect } from 'react';
import { HeroDotMorph } from './hero-dot-morph';
import { cn } from '@/lib/cn';

const NAV_LINKS = [
  { label: 'Features', href: '#' },
  { label: 'Docs', href: '#' },
  { label: 'Showcase', href: '#' },
  { label: 'Pricing', href: '#' },
];

interface Stat { label: string; value: string }

interface HeroDotSectionProps {
  logo?: string;
  badge?: string;
  headline?: string;
  accent?: string;
  subheadline?: string;
  ctaPrimary?: { text: string; href: string };
  ctaSecondary?: { text: string; href: string };
  stats?: Stat[];
  avatarCount?: number;
  className?: string;
}

export function HeroDotSection({
  logo = 'RetroChunk',
  badge = 'Now in open beta',
  headline = 'UI components\nthat feel',
  accent = 'alive.',
  subheadline = 'Canvas-powered, pixel-perfect React components. Drop one line of code and watch your product breathe.',
  ctaPrimary = { text: 'Start building free', href: '#' },
  ctaSecondary = { text: 'See all components →', href: '#' },
  stats = [
    { value: '60fps', label: 'Buttery smooth' },
    { value: '0', label: 'Peer deps' },
    { value: '14k+', label: 'Developers' },
  ],
  avatarCount = 5,
  className,
}: HeroDotSectionProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={cn('relative min-h-screen', className)}
      style={{ backgroundColor: '#FAF8F5', color: '#18120F' }}
    >
      {/* ── Navbar ─────────────────────────────────────────────────────── */}
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 flex items-center justify-between transition-all duration-300',
          'px-6 sm:px-10 lg:px-16',
          scrolled
            ? 'py-3.5 border-b border-[#E8E2DA]'
            : 'py-6',
        )}
        style={{
          backgroundColor: scrolled ? 'rgba(250,248,245,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
        }}
      >
        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5 shrink-0">
          <span
            className="flex items-center justify-center w-7 h-7 text-white font-extrabold text-[13px]"
            style={{ backgroundColor: '#C8102E' }}
          >
            R
          </span>
          <span
            className="font-extrabold text-[15px] tracking-[-0.02em]"
            style={{ color: '#18120F' }}
          >
            {logo}
          </span>
        </a>

        {/* Centre nav */}
        <ul className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="text-[14px] font-medium transition-opacity hover:opacity-50"
                style={{ color: '#6B6158' }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right */}
        <div className="flex items-center gap-5">
          <a
            href="#"
            className="hidden sm:block text-[14px] font-medium transition-opacity hover:opacity-50"
            style={{ color: '#6B6158' }}
          >
            Log in
          </a>
          <a
            href={ctaPrimary.href}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 text-[13px] font-semibold text-white transition-all duration-150 hover:brightness-110 active:scale-[0.97]"
            style={{ backgroundColor: '#C8102E' }}
          >
            Get started
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden>
              <path d="M2 9L9 2M9 2H4M9 2V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </nav>

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <div className="relative flex h-screen min-h-[640px] overflow-hidden">

        {/* Right: animation — fills right column, bleeds off all edges */}
        <div
          className="absolute right-0 top-0 h-full pointer-events-none"
          style={{ width: '50%' }}
        >
          <div className="absolute -inset-[6%]">
            <HeroDotMorph />
          </div>
        </div>

        {/* Gradient: dissolves left edge of animation into the cream bg */}
        <div
          className="hidden md:block absolute top-0 h-full pointer-events-none z-[4]"
          style={{
            left: '44%',
            width: '16%',
            background: 'linear-gradient(to right, #FAF8F5 0%, rgba(250,248,245,0) 100%)',
          }}
        />

        {/* Left: text content */}
        <div className="relative z-10 flex flex-col justify-center w-full md:w-[54%] px-6 sm:px-10 lg:px-16 xl:px-20 pt-24 pb-12">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 self-start mb-9">
            <span
              className="w-1.5 h-1.5 rounded-full shrink-0 animate-pulse"
              style={{ backgroundColor: '#C8102E' }}
            />
            <span
              className="font-mono text-[11px] uppercase tracking-[0.16em]"
              style={{ color: '#9E9089' }}
            >
              {badge}
            </span>
          </div>

          {/* Headline */}
          <h1
            className="font-sans font-extrabold mb-6"
            style={{ lineHeight: 1.0, letterSpacing: '-0.035em', color: '#18120F' }}
          >
            {headline.split('\n').map((line, i) => (
              <span
                key={i}
                className="block text-[52px] sm:text-[64px] lg:text-[76px] xl:text-[88px]"
              >
                {line}
              </span>
            ))}
            <span
              className="block text-[52px] sm:text-[64px] lg:text-[76px] xl:text-[88px]"
              style={{ color: '#C8102E' }}
            >
              {accent}
            </span>
          </h1>

          {/* Subheadline */}
          <p
            className="text-[16px] sm:text-[17px] leading-[1.65] mb-10 max-w-[380px]"
            style={{ color: '#7A6F65' }}
          >
            {subheadline}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 mb-12">
            <a
              href={ctaPrimary.href}
              className="inline-flex items-center gap-2 px-7 py-4 text-[14px] font-semibold text-white transition-all duration-150 hover:brightness-110 active:scale-[0.98]"
              style={{ backgroundColor: '#C8102E' }}
            >
              {ctaPrimary.text}
            </a>
            <a
              href={ctaSecondary.href}
              className="text-[14px] font-medium transition-opacity hover:opacity-50"
              style={{ color: '#9E9089' }}
            >
              {ctaSecondary.text}
            </a>
          </div>

          {/* Social proof row */}
          <div className="flex items-center gap-5 flex-wrap">
            {/* Avatar stack */}
            <div className="flex -space-x-2.5">
              {Array.from({ length: avatarCount }).map((_, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-[10px] font-bold"
                  style={{
                    borderColor: '#FAF8F5',
                    backgroundColor: AVATAR_COLORS[i % AVATAR_COLORS.length],
                    color: '#fff',
                    zIndex: avatarCount - i,
                  }}
                >
                  {AVATAR_INITIALS[i % AVATAR_INITIALS.length]}
                </div>
              ))}
            </div>

            {/* Stat dividers */}
            <div
              className="w-px h-5 shrink-0"
              style={{ backgroundColor: '#D8D2C8' }}
            />

            <div className="flex items-center gap-5">
              {stats.map((stat, i) => (
                <React.Fragment key={stat.label}>
                  {i > 0 && (
                    <div
                      className="w-px h-4 shrink-0"
                      style={{ backgroundColor: '#D8D2C8' }}
                    />
                  )}
                  <div>
                    <div
                      className="font-extrabold text-[20px] leading-none"
                      style={{ color: '#18120F', letterSpacing: '-0.02em' }}
                    >
                      {stat.value}
                    </div>
                    <div
                      className="font-mono text-[9px] uppercase tracking-widest mt-[3px]"
                      style={{ color: '#B0A699' }}
                    >
                      {stat.label}
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const AVATAR_COLORS = ['#C8102E', '#2563EB', '#059669', '#D97706', '#7C3AED'];
const AVATAR_INITIALS = ['A', 'J', 'M', 'S', 'K'];
