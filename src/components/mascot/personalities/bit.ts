import { shift } from '../creature-helpers';
import type { PersonalityPreset } from './types';

/**
 * Bit — original RetroChunk CRT buddy.
 * Big glowing screen-face, amber bezel body, stubby legs.
 * Designed for product moods (not a ClaudePix clone).
 */
const PALETTE = [
  'transparent', // 0
  '#16181E', // 1 ink / outline
  '#FFB020', // 2 amber body
  '#FFD56A', // 3 amber light
  '#1EC8FF', // 4 screen glow
  '#063447', // 5 screen deep
  '#FF8B6A', // 6 blush
  '#F4F7FB', // 7 white
  '#C48410', // 8 amber shadow
  '#FF5470', // 9 danger
];

const E = 0;
const K = 1;
const A = 2;
const L = 3;
const C = 4;
const D = 5;
const P = 6;
const W = 7;
const S = 8;
const R = 9;

const empty = () => Array.from({ length: 20 }, () => Array(20).fill(E));

/** Paint helper: set many cells */
function fill(grid: number[][], cells: Array<[number, number, number]>) {
  for (const [r, c, v] of cells) {
    if (r >= 0 && r < 20 && c >= 0 && c < 20) grid[r][c] = v;
  }
  return grid;
}

/**
 * Silhouette plan (20×20):
 * - rows 1–2   antenna
 * - rows 3–11  CRT head (bezel + glowing face)
 * - rows 12–15 compact body + arms
 * - rows 16–18 stubby legs
 */
function drawBit(opts?: {
  eyeY?: number;
  blink?: boolean;
  mouth?: 'smile' | 'flat' | 'frown' | 'open';
  screen?: 'on' | 'dim' | 'error';
  arm?: 'down' | 'out' | 'up' | 'typeL' | 'typeR';
  antenna?: 'center' | 'left' | 'right' | 'off';
  bob?: number;
}): number[][] {
  const eyeY = opts?.eyeY ?? 7;
  const blink = opts?.blink ?? false;
  const mouth = opts?.mouth ?? 'smile';
  const screen = opts?.screen ?? 'on';
  const arm = opts?.arm ?? 'down';
  const antenna = opts?.antenna ?? 'center';
  const bob = opts?.bob ?? 0;

  const g = empty();
  const o = (r: number, c: number, v: number) => {
    const rr = r + bob;
    if (rr >= 0 && rr < 20 && c >= 0 && c < 20) g[rr][c] = v;
  };

  // Antenna
  if (antenna !== 'off') {
    const tipC = antenna === 'left' ? 8 : antenna === 'right' ? 11 : 9;
    o(1, tipC, C);
    o(1, tipC + 1, C);
    o(2, tipC, K);
    o(2, tipC + 1, W);
    o(3, 9, K);
    o(3, 10, K);
  }

  // CRT outer bezel (rounded square)
  for (let c = 5; c <= 14; c++) {
    o(4, c, K);
    o(12, c, K);
  }
  for (let r = 5; r <= 11; r++) {
    o(r, 4, K);
    o(r, 15, K);
  }
  // amber plastic shell
  for (let r = 5; r <= 11; r++) {
    for (let c = 5; c <= 14; c++) {
      const edge = r === 5 || r === 11 || c === 5 || c === 14;
      o(r, c, edge ? S : A);
    }
  }
  // light rim
  for (let c = 6; c <= 13; c++) o(5, c, L);
  o(6, 5, L);
  o(6, 14, L);

  // Screen glass
  const glass = screen === 'error' ? R : screen === 'dim' ? D : D;
  const glow = screen === 'error' ? R : screen === 'dim' ? K : C;
  for (let r = 6; r <= 10; r++) {
    for (let c = 6; c <= 13; c++) o(r, c, glass);
  }
  // inner glow frame
  for (let c = 6; c <= 13; c++) {
    o(6, c, glow);
    o(10, c, glow);
  }
  for (let r = 7; r <= 9; r++) {
    o(r, 6, glow);
    o(r, 13, glow);
  }

  // Cheeks
  if (screen === 'on') {
    o(8, 7, P);
    o(8, 12, P);
  }

  // Eyes
  if (blink) {
    o(eyeY, 8, glow);
    o(eyeY, 9, glow);
    o(eyeY, 10, glow);
    o(eyeY, 11, glow);
  } else if (screen === 'error') {
    // X eyes
    o(eyeY, 8, W);
    o(eyeY, 9, R);
    o(eyeY, 10, R);
    o(eyeY, 11, W);
    o(eyeY - 1, 8, W);
    o(eyeY + 1, 8, W);
    o(eyeY - 1, 11, W);
    o(eyeY + 1, 11, W);
  } else {
    o(eyeY, 8, W);
    o(eyeY, 9, K);
    o(eyeY, 10, W);
    o(eyeY, 11, K);
    // shiny dots
    o(eyeY - 1, 8, W);
    o(eyeY - 1, 10, W);
  }

  // Mouth
  if (mouth === 'smile') {
    o(9, 9, W);
    o(9, 10, W);
    o(10, 8, W);
    o(10, 11, W);
  } else if (mouth === 'open') {
    o(9, 9, W);
    o(9, 10, W);
    o(10, 9, K);
    o(10, 10, K);
  } else if (mouth === 'frown') {
    o(10, 9, W);
    o(10, 10, W);
    o(9, 8, W);
    o(9, 11, W);
  } else {
    o(9, 8, W);
    o(9, 9, W);
    o(9, 10, W);
    o(9, 11, W);
  }

  // Neck / body
  o(13, 8, K);
  o(13, 9, A);
  o(13, 10, A);
  o(13, 11, K);
  for (let r = 14; r <= 15; r++) {
    for (let c = 7; c <= 12; c++) o(r, c, c === 7 || c === 12 ? K : A);
  }
  o(14, 8, L);
  o(14, 9, L);

  // Arms
  if (arm === 'down') {
    o(14, 5, K);
    o(14, 6, A);
    o(15, 5, A);
    o(15, 6, S);
    o(14, 13, A);
    o(14, 14, K);
    o(15, 13, S);
    o(15, 14, A);
  } else if (arm === 'out') {
    o(14, 3, K);
    o(14, 4, A);
    o(14, 5, A);
    o(15, 3, A);
    o(14, 14, A);
    o(14, 15, A);
    o(14, 16, K);
    o(15, 16, A);
  } else if (arm === 'up') {
    o(12, 3, A);
    o(12, 4, A);
    o(13, 3, K);
    o(13, 4, A);
    o(12, 15, A);
    o(12, 16, A);
    o(13, 15, A);
    o(13, 16, K);
  } else if (arm === 'typeL') {
    o(15, 4, K);
    o(15, 5, A);
    o(16, 5, A);
    o(16, 6, L);
    o(14, 13, A);
    o(14, 14, K);
    o(15, 13, S);
    o(15, 14, A);
  } else if (arm === 'typeR') {
    o(14, 5, K);
    o(14, 6, A);
    o(15, 5, A);
    o(15, 6, S);
    o(15, 14, A);
    o(15, 15, K);
    o(16, 13, L);
    o(16, 14, A);
  }

  // Mini keyboard shelf (for working)
  if (arm === 'typeL' || arm === 'typeR') {
    for (let c = 6; c <= 13; c++) o(17, c, K);
    for (let c = 7; c <= 12; c++) o(17, c, c % 2 === 0 ? L : A);
  }

  // Legs
  o(16, 8, K);
  o(16, 9, A);
  o(16, 10, A);
  o(16, 11, K);
  if (arm !== 'typeL' && arm !== 'typeR') {
    o(17, 8, S);
    o(17, 9, A);
    o(17, 10, A);
    o(17, 11, S);
    o(18, 8, K);
    o(18, 9, K);
    o(18, 10, K);
    o(18, 11, K);
  } else {
    o(18, 8, K);
    o(18, 9, K);
    o(18, 10, K);
    o(18, 11, K);
  }

  return g;
}

const BASE = drawBit();
const BLINK = drawBit({ blink: true });
const BOB = drawBit({ bob: 1 });
const IDLE_GLOW = drawBit({ antenna: 'center' });
const IDLE_GLOW2 = fill(drawBit({ antenna: 'center' }), [
  [1, 9, W],
  [1, 10, C],
]);

const WORK_L = drawBit({ arm: 'typeL', antenna: 'left', mouth: 'flat' });
const WORK_R = drawBit({ arm: 'typeR', antenna: 'right', mouth: 'flat' });
const WORK_BOTH = drawBit({ arm: 'typeL', antenna: 'center', mouth: 'open' });
const WORK_BLINK = drawBit({ arm: 'typeR', blink: true, mouth: 'flat' });

const THINK = drawBit({ eyeY: 6, mouth: 'flat', antenna: 'right' });
const THINK_DOT = fill(drawBit({ eyeY: 6, mouth: 'flat', antenna: 'right' }), [
  [2, 15, W],
  [3, 16, C],
  [4, 16, W],
]);

const JUMP = drawBit({ bob: -2, arm: 'up', mouth: 'open', antenna: 'center' });
const JUMP2 = fill(drawBit({ bob: -3, arm: 'up', mouth: 'open' }), [
  [5, 2, W],
  [6, 17, C],
  [16, 3, L],
  [16, 16, C],
  [17, 4, W],
  [17, 15, W],
]);
const LAND = fill(drawBit({ bob: 1, arm: 'out', mouth: 'smile' }), [
  [19, 6, C],
  [19, 7, W],
  [19, 12, W],
  [19, 13, C],
]);

const ERROR = drawBit({ screen: 'error', mouth: 'frown', antenna: 'off', arm: 'down' });
const ERROR_SHAKE = shift(ERROR, 0, 1);
const ERROR_DIM = drawBit({ screen: 'dim', mouth: 'frown', antenna: 'off', blink: true });

export const bitPersonality: PersonalityPreset = {
  id: 'bit',
  name: 'Bit',
  description:
    'RetroChunk’s original CRT buddy — glowing screen-face, amber shell, stubby legs. Moods map to real UI states.',
  gridSize: 20,
  palette: PALETTE,
  base: BASE,
  moods: {
    idle: [
      { hold: 520, grid: BASE },
      { hold: 480, grid: IDLE_GLOW },
      { hold: 420, grid: BOB },
      { hold: 100, grid: BLINK },
      { hold: 380, grid: IDLE_GLOW2 },
      { hold: 500, grid: BASE },
    ],
    working: [
      { hold: 140, grid: WORK_L },
      { hold: 140, grid: WORK_R },
      { hold: 140, grid: WORK_L },
      { hold: 140, grid: WORK_R },
      { hold: 120, grid: WORK_BOTH },
      { hold: 90, grid: WORK_BLINK },
      { hold: 140, grid: WORK_L },
      { hold: 140, grid: WORK_R },
    ],
    think: [
      { hold: 520, grid: THINK },
      { hold: 340, grid: THINK_DOT },
      { hold: 480, grid: THINK },
      { hold: 280, grid: THINK_DOT },
    ],
    celebrate: [
      { hold: 100, grid: BASE },
      { hold: 120, grid: JUMP },
      { hold: 160, grid: JUMP2 },
      { hold: 120, grid: JUMP },
      { hold: 140, grid: LAND },
      { hold: 180, grid: BASE },
    ],
    error: [
      { hold: 260, grid: ERROR },
      { hold: 160, grid: ERROR_SHAKE },
      { hold: 240, grid: ERROR_DIM },
      { hold: 160, grid: ERROR_SHAKE },
      { hold: 260, grid: ERROR },
    ],
  },
};
