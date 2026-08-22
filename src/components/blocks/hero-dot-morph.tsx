'use client';

import React, { useEffect, useRef, useMemo } from 'react';
import { cn } from '@/lib/cn';

// #C8102E → little-endian RGBA Uint32
const DOT_32 = (0xFF << 24 | 46 << 16 | 16 << 8 | 200) >>> 0;
// #FAF8F5
const BG_32  = (0xFF << 24 | 245 << 16 | 248 << 8 | 250) >>> 0;

const DOT_PX      = 2;
const STEP        = 3;
const N_ANG       = 2048;
const N_RAYS      = 17;
const ROT_SPEED   = 0.28;   // rad/s — one full rotation ≈ 22 s
const SPIKE_CYC   = 2.2;    // s — alternating spike pulse period
const BREATHE_CYC = 3.5;    // s — base circle breathe period
const BREATHE_AMP = 0.09;   // ±9% radius breathing
const POWER       = 2.2;    // ray tip sharpness
const BASE_R      = 0.82;   // solid body between rays

function seededRand(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 0x100000000;
  };
}

interface RayDef { a: number; halfW: number; amp: number; phase: number; }

function buildRayDefs(): RayDef[] {
  const rand = seededRand(0xBEEFCAFE);
  const rays: RayDef[] = [];
  for (let i = 0; i < N_RAYS; i++) {
    const base   = (i / N_RAYS) * Math.PI * 2;
    const jitter = (rand() - 0.5) * (Math.PI * 2 / N_RAYS) * 0.85;
    const amp    = 0.22 + rand() * 0.52;   // 0.22 – 0.74
    const halfW  = 0.11 + rand() * 0.09;   // 0.11 – 0.20 rad
    // Even rays: phase 0 — extend when sin > 0
    // Odd rays:  phase π — extend when sin < 0 (always opposite)
    rays.push({ a: base + jitter, halfW, amp, phase: (i % 2) * Math.PI });
  }
  return rays;
}

// Rebuild shape table each frame — 2048 × 17 ≈ 35k ops, negligible cost
function buildFrameRadii(rays: RayDef[], elapsed: number, out: Float32Array) {
  const TWO_PI   = Math.PI * 2;
  const spikeSin = Math.sin(elapsed * TWO_PI / SPIKE_CYC);

  for (let i = 0; i < N_ANG; i++) {
    const angle = (i / N_ANG) * TWO_PI;
    let r = BASE_R;
    for (const { a, halfW, amp, phase } of rays) {
      let d = angle - a;
      if (d >  Math.PI) d -= TWO_PI;
      if (d < -Math.PI) d += TWO_PI;
      if (Math.abs(d) < halfW) {
        const t      = Math.cos(d * Math.PI / (2 * halfW));
        // phase=0 → uses +spikeSin; phase=π → uses -spikeSin (always opposite)
        const morphT = (1 + (phase === 0 ? spikeSin : -spikeSin)) / 2;
        r += amp * Math.pow(Math.max(0, t), POWER) * morphT;
      }
    }
    out[i] = r;
  }
}

interface HeroDotMorphProps { className?: string; }

export function HeroDotMorph({ className }: HeroDotMorphProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rayDefs   = useMemo(buildRayDefs, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: false });
    if (!ctx) return;

    let raf = 0, t0: number | null = null;
    let W = 0, H = 0;
    let buf32: Uint32Array | null = null;
    let imgData: ImageData | null = null;
    const frameRadii = new Float32Array(N_ANG);

    const setup = () => {
      const dpr = window.devicePixelRatio || 1;
      const rec = canvas.getBoundingClientRect();
      const nW  = Math.round(rec.width  * dpr);
      const nH  = Math.round(rec.height * dpr);
      if (nW === W && nH === H) return;
      W = nW; H = nH;
      // A collapsed or not-yet-laid-out canvas measures 0 and createImageData throws on
      // that. Drop the buffers and let the ResizeObserver call us back with real numbers.
      if (W <= 0 || H <= 0) {
        imgData = null;
        buf32   = null;
        return;
      }
      canvas.width  = W;
      canvas.height = H;
      imgData = ctx.createImageData(W, H);
      buf32   = new Uint32Array(imgData.data.buffer);
    };

    const draw = (ts: number) => {
      if (!t0) t0 = ts;
      if (!buf32 || !imgData || W === 0) { raf = requestAnimationFrame(draw); return; }

      const elapsed  = (ts - t0) / 1000;
      const dpr      = window.devicePixelRatio || 1;
      const physStep = Math.round(STEP   * dpr);
      const physDot  = Math.max(1, Math.round(DOT_PX * dpr));

      // Rebuild shape table with this frame's per-ray phases
      buildFrameRadii(rayDefs, elapsed, frameRadii);

      // Continuous spin
      const rotOff = elapsed * ROT_SPEED;
      // Slow breathing of the base circle radius
      const breatheR = Math.min(W, H) * 0.44
        * (1 + BREATHE_AMP * Math.sin(elapsed * Math.PI * 2 / BREATHE_CYC));

      buf32.fill(BG_32);

      const cx      = W / 2;
      const cy      = H / 2;
      const TWO_PI  = Math.PI * 2;
      const INV_2PI = 1 / TWO_PI;
      const N1      = N_ANG - 1;

      for (let py = 0; py < H; py += physStep) {
        for (let px = 0; px < W; px += physStep) {
          const dx   = px - cx;
          const dy   = py - cy;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const angle = (Math.atan2(dy, dx) - rotOff + TWO_PI * 8) % TWO_PI;
          const idx   = Math.round(angle * INV_2PI * N1) % N_ANG;
          const bR    = breatheR * frameRadii[idx];

          if (dist > bR) continue;

          for (let r = 0; r < physDot; r++) {
            const row = py + r;
            if (row >= H) break;
            const off = row * W;
            for (let c = 0; c < physDot; c++) {
              const col = px + c;
              if (col < W) buf32[off + col] = DOT_32;
            }
          }
        }
      }

      ctx.putImageData(imgData, 0, 0);
      raf = requestAnimationFrame(draw);
    };

    setup();
    const ro = new ResizeObserver(setup);
    ro.observe(canvas);
    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, [rayDefs]);

  return (
    <div
      className={cn('relative w-full h-full overflow-hidden', className)}
      style={{ backgroundColor: '#FAF8F5' }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
    </div>
  );
}
