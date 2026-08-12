'use client';

import * as React from 'react';
import { cn } from '@/lib/cn';
import { PixelCard, PixelBadge, PixelWindow } from '@/components/ui';

interface DashboardPixelProps {
  className?: string;
}

const STATS = [
  { label: 'USERS', value: '1,337', change: '+42%', positive: true },
  { label: 'REVENUE', value: '9,001', change: '+12%', positive: true },
  { label: 'ERRORS', value: '404', change: '-5%', positive: false },
  { label: 'SESSIONS', value: '8,192', change: '+8%', positive: true },
];

const ACTIVITY = [
  { icon: '★', text: 'New user registered', time: '2m ago' },
  { icon: '⚔', text: 'Server raid completed', time: '15m ago' },
  { icon: '⚠', text: 'Low memory warning', time: '1h ago' },
  { icon: '❤', text: 'Project deployed', time: '3h ago' },
];

export const DashboardPixel: React.FC<DashboardPixelProps> = ({ className }) => {
  return (
    <div className={cn("w-full min-h-[80vh] flex flex-col md:flex-row bg-[var(--bg)] border-2 border-[var(--border)] shadow-[4px_4px_0_0_rgba(255,255,255,0.1)]", className)}>
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[var(--surface-2)] border-b-2 md:border-b-0 md:border-r-2 border-[var(--border)] p-6 flex flex-col gap-8 shrink-0">
        <div className="text-lg sm:text-2xl text-[var(--accent)] tracking-wider" style={{ fontFamily: 'var(--font-pixel)' }}>
          ADMIN_PANEL
        </div>
        
        <nav className="flex flex-col gap-2">
          {['Dashboard', 'Analytics', 'Users', 'Settings', 'Logout'].map((item, idx) => (
            <button
              key={item}
              className={cn(
                "text-left p-3 flex items-center gap-3 transition-colors duration-200 border-2",
                idx === 0 
                  ? "border-[var(--accent)] bg-[var(--surface)] text-[var(--accent)]" 
                  : "border-transparent text-[var(--text-2)] hover:bg-[var(--surface)] hover:text-[var(--text)] hover:border-[var(--border)]"
              )}
            >
              <span className="text-xl" style={{ fontFamily: 'var(--font-pixel)' }}>
                {idx === 0 ? '▶' : '▸'}
              </span>
              <span className="uppercase text-sm" style={{ fontFamily: 'var(--font-pixel)' }}>
                {item}
              </span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8 flex flex-col gap-8 overflow-hidden">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 sm:gap-0 border-b-2 border-[var(--border)] pb-4">
          <h1 className="text-xl sm:text-3xl text-[var(--text)]" style={{ fontFamily: 'var(--font-pixel)' }}>OVERVIEW</h1>
          <div className="text-[var(--text-3)] text-sm" style={{ fontFamily: 'var(--font-pixel)' }}>SYS_TIME: 12:00:00</div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {STATS.map((stat, i) => (
            <PixelCard key={i} className="p-5 flex flex-col gap-3 bg-[var(--surface)]">
              <div className="text-[var(--text-2)] text-sm uppercase" style={{ fontFamily: 'var(--font-pixel)' }}>
                {stat.label}
              </div>
              <div className="flex items-end justify-between">
                <div className="text-3xl text-[var(--text)]" style={{ fontFamily: 'var(--font-pixel)' }}>
                  {stat.value}
                </div>
                <PixelBadge variant={stat.positive ? 'success' : 'danger'}>
                  {stat.change}
                </PixelBadge>
              </div>
            </PixelCard>
          ))}
        </div>

        {/* Charts & Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 flex-1">
          <div className="lg:col-span-2 flex flex-col min-h-[300px]">
            <PixelWindow title="analytics.exe" className="flex-1 bg-[var(--surface)] flex flex-col h-full">
              <div className="flex-1 p-6 pl-8 flex items-end gap-2 sm:gap-4 md:gap-8 justify-between pt-12 relative min-h-[250px]">
                {/* Y-axis markers */}
                <div className="absolute left-6 top-12 bottom-6 w-px bg-[var(--border)]" />
                <div className="absolute left-4 top-12 bottom-6 flex flex-col justify-between text-[var(--text-3)] text-xs" style={{ fontFamily: 'var(--font-pixel)' }}>
                  <span>100</span>
                  <span>50</span>
                  <span>0</span>
                </div>
                
                {/* Bars */}
                {[40, 75, 30, 90, 60, 85, 50].map((val, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2 group relative z-10">
                    <div 
                      className="w-full bg-[var(--cool)] transition-all duration-300 group-hover:bg-[var(--accent)] border-t-2 border-l-2 border-r-2 border-white/20 shadow-[2px_0_0_0_#000]"
                      style={{ height: `${val}%`, minWidth: '20px' }}
                    />
                    <div className="text-[var(--text-2)] text-[10px] sm:text-xs uppercase" style={{ fontFamily: 'var(--font-pixel)' }}>
                      {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
                    </div>
                  </div>
                ))}
              </div>
            </PixelWindow>
          </div>

          <div className="lg:col-span-1 flex flex-col min-h-[300px]">
            <PixelWindow title="activity.log" className="flex-1 bg-[var(--surface)] h-full">
              <div className="p-4 flex flex-col gap-4">
                {ACTIVITY.map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-3 border-2 border-[var(--border)] hover:bg-[var(--surface-2)] transition-colors">
                    <div className="text-[var(--accent)] text-xl leading-none" style={{ fontFamily: 'var(--font-pixel)' }}>
                      {item.icon}
                    </div>
                    <div className="flex flex-col gap-1 flex-1">
                      <div className="text-[var(--text)] text-sm" style={{ fontFamily: 'var(--font-sans)' }}>
                        {item.text}
                      </div>
                      <div className="text-[var(--text-3)] text-xs" style={{ fontFamily: 'var(--font-pixel)' }}>
                        {item.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </PixelWindow>
          </div>
        </div>
      </main>
    </div>
  );
};
