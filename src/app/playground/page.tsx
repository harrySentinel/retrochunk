'use client';

import * as React from 'react';
import Link from 'next/link';
import { PixelButton, PixelCard, PixelBadge, PixelInput, PixelWindow } from '@/components/ui';
import { Mascot, type MascotAnimation, PixelPersonality } from '@/components/mascot';
import { useToast } from '@/components/ui/toast';
import { cn } from '@/lib/cn';

type Scene = 'login' | 'settings' | 'empty';

export default function PlaygroundPage() {
  const { toast } = useToast();
  const [scene, setScene] = React.useState<Scene>('login');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [displayName, setDisplayName] = React.useState('Player One');
  const [accentNote, setAccentNote] = React.useState('Amber CRT');
  const [mascotMood, setMascotMood] = React.useState<MascotAnimation>('idle');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Fill both fields to continue.');
      setMascotMood('error');
      return;
    }
    setError('');
    setMascotMood('celebrate');
    toast('Logged in. Welcome back!');
    setTimeout(() => setMascotMood('idle'), 2000);
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] pixel-dots">
      <header className="sticky top-0 z-20 border-b border-[var(--border)] bg-[rgba(12,13,16,0.9)] backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3">
          <div className="flex items-center gap-3 min-w-0">
            <Link href="/" className="font-pixel text-[12px] text-[var(--accent)] shrink-0">
              ← RETROCHUNK
            </Link>
            <span className="hidden sm:inline font-mono text-[10px] text-[var(--text-3)] truncate">
              /playground — compose real screens
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            {([
              ['login', 'Login'],
              ['settings', 'Settings'],
              ['empty', 'Empty'],
            ] as const).map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => {
                  setScene(id);
                  setMascotMood(id === 'empty' ? 'wave' : 'idle');
                  setError('');
                }}
                className={cn(
                  'font-pixel text-[10px] px-2.5 py-1.5 border transition-colors',
                  scene === id
                    ? 'border-[var(--accent)] bg-[rgba(255,176,32,0.12)] text-[var(--accent)]'
                    : 'border-[var(--border)] text-[var(--text-3)] hover:text-[var(--text)]'
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-5xl gap-8 px-4 py-8 md:grid-cols-[1fr_280px] md:py-12">
        <section>
          {scene === 'login' && (
            <PixelWindow title="login.exe" compact className="max-w-md mx-auto md:mx-0">
              <form onSubmit={handleLogin} className="flex flex-col gap-4 p-3 sm:p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h1 className="font-pixel text-lg text-[var(--text)] mb-1">Sign in</h1>
                    <p className="font-sans text-sm text-[var(--text-2)]">
                      Compose a pixel login with inputs, buttons, and mascot feedback.
                    </p>
                  </div>
                  <Mascot animation={mascotMood} size={5} />
                  <PixelPersonality name="bit" mood={mascotMood === 'celebrate' ? 'celebrate' : mascotMood === 'error' ? 'error' : 'working'} size={3} />
                </div>
                <PixelInput
                  label="EMAIL"
                  type="email"
                  placeholder="you@arcade.dev"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={error && !email.trim() ? error : undefined}
                />
                <PixelInput
                  label="PASSWORD"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={error && !password.trim() ? error : undefined}
                />
                {error && email.trim() && password.trim() ? (
                  <p className="font-sans text-[11px] text-[var(--danger)]">{error}</p>
                ) : null}
                <div className="flex flex-wrap gap-2 pt-1">
                  <PixelButton type="submit">Enter</PixelButton>
                  <PixelButton
                    type="button"
                    variant="secondary"
                    onClick={() => {
                      setEmail('');
                      setPassword('');
                      setError('');
                      setMascotMood('idle');
                    }}
                  >
                    Reset
                  </PixelButton>
                </div>
              </form>
            </PixelWindow>
          )}

          {scene === 'settings' && (
            <PixelCard className="max-w-lg space-y-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h1 className="font-pixel text-lg mb-1">Settings</h1>
                  <p className="font-sans text-sm text-[var(--text-2)]">
                    Profile fields with badges and save actions.
                  </p>
                </div>
                <PixelBadge variant="cool" dot>
                  LIVE
                </PixelBadge>
              </div>
              <PixelInput
                label="DISPLAY NAME"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
              <PixelInput
                label="THEME NOTE"
                value={accentNote}
                onChange={(e) => setAccentNote(e.target.value)}
                hint="Purely cosmetic — tokens live in CSS variables."
              />
              <div className="flex flex-wrap items-center gap-3">
                <Mascot animation="idle" size={4} />
                <PixelButton
                  onClick={() => {
                    setMascotMood('celebrate');
                    toast('Settings saved.');
                    setTimeout(() => setMascotMood('idle'), 1600);
                  }}
                >
                  Save
                </PixelButton>
                <PixelButton variant="ghost" onClick={() => toast('No changes')}>
                  Cancel
                </PixelButton>
              </div>
            </PixelCard>
          )}

          {scene === 'empty' && (
            <div className="flex min-h-[320px] flex-col items-center justify-center gap-4 border border-dashed border-[var(--border)] bg-[var(--surface)] px-6 py-12 text-center">
              <Mascot animation="wave" size={7} />
              <h1 className="font-pixel text-base text-[var(--text)]">Nothing here yet</h1>
              <p className="font-sans text-sm text-[var(--text-2)] max-w-sm">
                Empty states are a perfect home for the mascot. Tap it — it celebrates.
              </p>
              <PixelButton variant="secondary" onClick={() => setScene('login')}>
                Back to login
              </PixelButton>
            </div>
          )}
        </section>

        <aside className="space-y-4">
          <PixelCard className="space-y-3">
            <h2 className="font-pixel text-[11px] text-[var(--text-3)] tracking-wider">WHY THIS PAGE</h2>
            <p className="font-sans text-sm text-[var(--text-2)] leading-relaxed">
              RetroChunk is a React UI system — primitives + mascot moods composing real product screens.
            </p>
            <ul className="font-mono text-[11px] text-[var(--text-3)] space-y-1.5">
              <li>• PixelInput + validation</li>
              <li>• Mascot error / celebrate</li>
              <li>• Toast feedback</li>
              <li>• Mobile-safe layout</li>
            </ul>
          </PixelCard>
          <Link
            href="/"
            className="block font-pixel text-[11px] text-center py-2.5 border border-[var(--border)] text-[var(--text-2)] hover:text-[var(--accent)] hover:border-[rgba(255,176,32,0.4)] transition-colors"
          >
            Browse components
          </Link>
        </aside>
      </main>
    </div>
  );
}
