'use client';

import * as React from 'react';
import { cn } from '@/lib/cn';
import { PixelCard } from '@/components/ui';

interface Testimonial {
  name: string;
  role: string;
  text: string;
  avatarGrid: number[][]; // 6x6 grid
  avatarPalette: string[];
}

interface TestimonialsPixelProps {
  testimonials?: Testimonial[];
  className?: string;
}

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    name: 'ALEX.JS',
    role: 'Frontend Dev',
    text: 'This UI library brings so much nostalgic joy to my side projects. The components are super easy to use!',
    avatarPalette: ['transparent', '#FFB020', '#ECEFF4', '#0C0D10'],
    avatarGrid: [
      [0,1,1,1,1,0],
      [1,2,2,2,2,1],
      [1,3,2,2,3,1],
      [1,2,2,2,2,1],
      [1,2,3,3,2,1],
      [0,1,1,1,1,0],
    ]
  },
  {
    name: 'SARAH_88',
    role: 'Game Designer',
    text: 'Crisp borders and true pixel-art aesthetics. It feels like an authentic 8-bit experience in the browser.',
    avatarPalette: ['transparent', '#35C2FF', '#ECEFF4', '#0C0D10'],
    avatarGrid: [
      [0,1,1,1,1,0],
      [1,2,2,2,2,1],
      [1,3,2,2,3,1],
      [1,2,1,1,2,1],
      [1,2,2,2,2,1],
      [0,1,1,1,1,0],
    ]
  },
  {
    name: 'PIXEL_DAN',
    role: 'Indie Hacker',
    text: 'I rebuilt my entire portfolio with RetroChunk in a weekend. The CSS variables make theming a breeze.',
    avatarPalette: ['transparent', '#48D597', '#ECEFF4', '#0C0D10'],
    avatarGrid: [
      [0,1,1,1,1,0],
      [1,2,2,2,2,1],
      [1,2,3,3,2,1],
      [1,2,2,2,2,1],
      [1,3,2,2,3,1],
      [0,1,1,1,1,0],
    ]
  },
  {
    name: 'MIA_CODES',
    role: 'UX Engineer',
    text: 'Love the attention to detail. The active states on buttons and the shadows are perfectly executed.',
    avatarPalette: ['transparent', '#FF5470', '#ECEFF4', '#0C0D10'],
    avatarGrid: [
      [0,1,1,1,1,0],
      [1,2,2,2,2,1],
      [1,3,2,3,2,1],
      [1,2,2,2,2,1],
      [1,2,3,2,2,1],
      [0,1,1,1,1,0],
    ]
  },
  {
    name: 'RETRO_GUY',
    role: 'Streamer',
    text: 'My chat loves the new overlay built with RetroChunk. The mascot component is especially cute!',
    avatarPalette: ['transparent', '#FFB020', '#ECEFF4', '#0C0D10'],
    avatarGrid: [
      [0,1,1,1,1,0],
      [1,2,2,2,2,1],
      [1,3,3,3,3,1],
      [1,2,2,2,2,1],
      [1,2,3,3,2,1],
      [0,1,1,1,1,0],
    ]
  },
  {
    name: 'LISA_T',
    role: 'Fullstack Dev',
    text: 'Finally a library that takes pixel art seriously but uses modern React patterns. SSR works flawlessly.',
    avatarPalette: ['transparent', '#35C2FF', '#ECEFF4', '#0C0D10'],
    avatarGrid: [
      [0,1,1,1,1,0],
      [1,1,2,2,1,1],
      [1,3,2,2,3,1],
      [1,2,2,2,2,1],
      [1,2,3,3,2,1],
      [0,1,1,1,1,0],
    ]
  }
];

const Avatar = ({ grid, palette }: { grid: number[][]; palette: string[] }) => (
  <div className="flex flex-col gap-0 shadow-sm" style={{ width: '48px', height: '48px' }}>
    {grid.map((row, y) => (
      <div key={y} className="flex gap-0 flex-1">
        {row.map((val, x) => (
          <div key={x} className="flex-1" style={{ backgroundColor: palette[val] }} />
        ))}
      </div>
    ))}
  </div>
);

export const TestimonialsPixel: React.FC<TestimonialsPixelProps> = ({
  testimonials = DEFAULT_TESTIMONIALS,
  className
}) => {
  return (
    <section className={cn("py-10 sm:py-16 md:py-20 overflow-hidden w-full bg-[var(--bg)]", className)}>
      <div className="container mx-auto px-4 mb-12 text-center">
        <h2 className="text-3xl md:text-5xl text-[var(--text)] mb-4" style={{ fontFamily: 'var(--font-pixel)' }}>
          WHAT PLAYERS SAY
        </h2>
        <div className="h-1 w-24 bg-[var(--accent)] mx-auto" />
      </div>

      <div className="relative w-full overflow-hidden flex whitespace-nowrap group">
        <div 
          className="flex gap-6 animate-marquee shrink-0 pl-6 group-hover:[animation-play-state:paused]" 
          style={{ animation: 'marquee-scroll 40s linear infinite' }}
          onClick={(e) => {
            const el = e.currentTarget;
            el.style.animationPlayState = el.style.animationPlayState === 'paused' ? 'running' : 'paused';
          }}
        >
          {[...testimonials, ...testimonials].map((t, idx) => (
            <PixelCard key={idx} className="w-[280px] sm:w-[350px] whitespace-normal flex flex-col gap-4 p-6 shrink-0 bg-[var(--surface)]">
              <div className="flex items-center gap-4 border-b-2 border-[var(--border)] pb-4">
                <Avatar grid={t.avatarGrid} palette={t.avatarPalette} />
                <div className="flex flex-col">
                  <span className="text-lg text-[var(--text)]" style={{ fontFamily: 'var(--font-pixel)' }}>{t.name}</span>
                  <span className="text-sm text-[var(--text-3)]" style={{ fontFamily: 'var(--font-sans)' }}>{t.role}</span>
                </div>
              </div>
              <p className="text-[var(--text-2)] leading-relaxed text-sm md:text-base" style={{ fontFamily: 'var(--font-sans)' }}>
                "{t.text}"
              </p>
            </PixelCard>
          ))}
        </div>
      </div>
      
      {/* Required keyframes for marquee */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-50% - 12px)); }
        }
      `}} />
    </section>
  );
};
