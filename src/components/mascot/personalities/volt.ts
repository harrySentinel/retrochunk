import { patch, shift } from '../creature-helpers';
import type { PersonalityPreset } from './types';

/**
 * Volt — original RetroChunk character.
 * Soft rounded hair (not spikes), teal tunic, amber belt.
 * Rich behaviours: idle, wave, work/train, think, dash, flex, celebrate, error.
 */
const PALETTE = [
  'transparent', // 0
  '#111111', // 1 ink / eyes
  '#E8B896', // 2 skin
  '#243044', // 3 hair
  '#35C2FF', // 4 cyan accent / streak
  '#2A9D8F', // 5 tunic
  '#1B6B63', // 6 tunic dark
  '#FFB020', // 7 belt / accent
  '#F5F7FB', // 8 white
  '#FF5470', // 9 danger
];

const E = 0;
const K = 1;
const S = 2;
const H = 3;
const C = 4;
const T = 5;
const TD = 6;
const A = 7;
const W = 8;
const R = 9;

/** Soft bowl / hero cut — rounded volume, side fringe, tiny cyan streak */
const BASE: number[][] = [
  [E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E],
  [E, E, E, E, E, E, H, H, H, H, H, H, H, E, E, E, E, E, E, E],
  [E, E, E, E, E, H, H, H, H, H, H, H, H, H, E, E, E, E, E, E],
  [E, E, E, E, H, H, H, H, H, H, H, H, H, H, H, E, E, E, E, E],
  [E, E, E, H, H, H, H, H, H, H, H, H, H, C, H, E, E, E, E, E],
  [E, E, E, H, H, H, H, H, H, H, H, H, H, H, H, E, E, E, E, E],
  [E, E, E, H, S, S, S, S, S, S, S, S, S, S, H, E, E, E, E, E],
  [E, E, E, E, S, K, S, S, S, S, S, K, S, S, E, E, E, E, E, E],
  [E, E, E, E, S, S, S, S, S, S, S, S, S, S, E, E, E, E, E, E],
  [E, E, E, E, S, S, S, K, K, K, S, S, S, S, E, E, E, E, E, E],
  [E, E, E, E, E, S, S, S, S, S, S, S, S, E, E, E, E, E, E, E],
  [E, E, E, T, T, T, T, T, T, T, T, T, T, T, E, E, E, E, E, E],
  [E, E, T, T, T, T, T, T, T, T, T, T, T, T, T, E, E, E, E, E],
  [E, E, T, TD, T, T, T, A, A, A, A, T, T, TD, T, E, E, E, E, E],
  [E, E, T, T, T, T, T, T, T, T, T, T, T, T, T, E, E, E, E, E],
  [E, E, T, E, T, T, T, T, T, T, T, T, T, E, T, E, E, E, E, E],
  [E, E, E, E, T, T, T, T, T, T, T, T, T, E, E, E, E, E, E, E],
  [E, E, E, E, T, T, T, T, T, T, T, T, T, E, E, E, E, E, E, E],
  [E, E, E, E, E, E, S, E, E, E, E, S, E, E, E, E, E, E, E, E],
  [E, E, E, E, E, E, S, E, E, E, E, S, E, E, E, E, E, E, E, E],
];

const BLINK = patch(BASE, [
  [7, 5, S],
  [7, 11, S],
]);

const BOB = shift(BASE, 1, 0);

/** Hair sway — fringe shifts slightly */
const HAIR_L = patch(BASE, [
  [4, 13, H],
  [4, 14, C],
  [5, 3, H],
  [6, 3, H],
  [6, 2, H],
]);
const HAIR_R = patch(BASE, [
  [4, 13, C],
  [4, 14, H],
  [5, 14, H],
  [6, 14, H],
  [6, 15, H],
]);

// ── Wave hello ────────────────────────────────────────────────
const WAVE_1 = patch(BASE, [
  [11, 15, E],
  [12, 15, E],
  [14, 14, E],
  [10, 15, S],
  [9, 15, S],
  [8, 15, S],
  [8, 16, S],
  [9, 16, S],
]);
const WAVE_2 = patch(BASE, [
  [11, 15, E],
  [12, 15, E],
  [14, 14, E],
  [10, 15, S],
  [9, 16, S],
  [8, 16, S],
  [7, 16, S],
  [7, 17, S],
  [8, 17, S],
]);
const WAVE_3 = patch(BASE, [
  [11, 15, E],
  [12, 15, E],
  [14, 14, E],
  [10, 15, S],
  [9, 15, S],
  [8, 14, S],
  [8, 15, S],
  [9, 14, S],
]);

// ── Train / working ───────────────────────────────────────────
const PUNCH_L = patch(BASE, [
  [12, 1, S],
  [12, 2, S],
  [13, 1, S],
  [15, 2, E],
  [11, 2, S],
]);
const PUNCH_R = patch(BASE, [
  [12, 17, S],
  [12, 18, S],
  [13, 18, S],
  [15, 14, E],
  [11, 17, S],
]);
const GUARD = patch(BASE, [
  [11, 4, S],
  [11, 5, S],
  [12, 4, S],
  [11, 14, S],
  [11, 15, S],
  [12, 15, S],
  [15, 2, E],
  [15, 14, E],
]);

// ── Think ─────────────────────────────────────────────────────
const THINK = patch(BASE, [
  [7, 5, S],
  [7, 11, S],
  [6, 5, K],
  [6, 11, K],
  [3, 16, C],
  [4, 17, W],
  [5, 17, C],
]);
const THINK2 = patch(THINK, [
  [3, 16, W],
  [4, 17, C],
  [5, 16, W],
]);

// ── Dash (run cycle) ──────────────────────────────────────────
const DASH_1 = patch(shift(BASE, 0, -1), [
  [15, 2, E],
  [15, 14, E],
  [17, 4, S],
  [18, 5, S],
  [17, 12, S],
  [18, 11, S],
  [12, 16, S],
  [13, 17, S],
  [4, 1, C],
]);
const DASH_2 = patch(shift(BASE, 0, 1), [
  [15, 2, E],
  [15, 14, E],
  [17, 8, S],
  [18, 9, S],
  [17, 14, S],
  [18, 15, S],
  [12, 2, S],
  [13, 1, S],
  [4, 18, C],
]);
const DASH_3 = patch(BASE, [
  [15, 2, E],
  [15, 14, E],
  [16, 5, S],
  [17, 6, S],
  [16, 13, S],
  [17, 12, S],
  [11, 1, S],
  [11, 18, S],
  [18, 3, C],
  [18, 16, C],
]);

// ── Flex ──────────────────────────────────────────────────────
const FLEX_1 = patch(BASE, [
  [15, 2, E],
  [15, 14, E],
  [11, 1, S],
  [11, 2, S],
  [12, 1, S],
  [11, 17, S],
  [11, 18, S],
  [12, 18, S],
  [10, 2, S],
  [10, 17, S],
]);
const FLEX_2 = patch(BASE, [
  [15, 2, E],
  [15, 14, E],
  [9, 1, S],
  [10, 1, S],
  [10, 2, S],
  [11, 2, S],
  [9, 18, S],
  [10, 18, S],
  [10, 17, S],
  [11, 17, S],
  [2, 9, C],
  [2, 10, C],
  [1, 9, W],
]);

// ── Celebrate ─────────────────────────────────────────────────
const CROUCH = patch(shift(BASE, 1, 0), [
  [15, 2, T],
  [15, 17, T],
]);
const JUMP = patch(shift(BASE, -2, 0), [
  [10, 1, S],
  [10, 2, S],
  [10, 17, S],
  [10, 18, S],
  [3, 4, C],
  [3, 15, C],
]);
const PEAK = patch(shift(BASE, -3, 0), [
  [9, 0, S],
  [9, 1, S],
  [9, 18, S],
  [9, 19, S],
  [1, 3, C],
  [1, 16, C],
  [2, 2, W],
  [2, 17, W],
  [14, 2, A],
  [14, 17, A],
]);
const LAND = patch(BASE, [
  [18, 4, C],
  [18, 5, A],
  [18, 14, A],
  [18, 15, C],
  [15, 2, T],
  [15, 17, T],
]);

// ── Error ─────────────────────────────────────────────────────
const ERROR = patch(BASE, [
  [7, 5, K],
  [7, 6, R],
  [7, 10, R],
  [7, 11, K],
  [6, 5, K],
  [6, 11, K],
  [8, 5, K],
  [8, 11, K],
  [9, 7, K],
  [9, 8, K],
  [9, 9, K],
  [9, 10, K],
  [2, 9, R],
  [3, 9, R],
]);
const ERROR_SHAKE = shift(ERROR, 0, 1);
const ERROR_SIGH = patch(ERROR, [
  [4, 13, H],
  [5, 14, H],
  [10, 8, S],
  [10, 9, S],
]);

export const voltPersonality: PersonalityPreset = {
  id: 'volt',
  name: 'Volt',
  description:
    'Soft-haired RetroChunk character — teal tunic, amber belt, cyan streak. Behaviours: idle, wave, train, think, dash, flex, celebrate, error.',
  gridSize: 20,
  palette: PALETTE,
  base: BASE,
  moods: {
    idle: [
      { hold: 420, grid: BASE },
      { hold: 380, grid: HAIR_L },
      { hold: 400, grid: BOB },
      { hold: 90, grid: BLINK },
      { hold: 380, grid: HAIR_R },
      { hold: 420, grid: BASE },
    ],
    wave: [
      { hold: 140, grid: WAVE_1 },
      { hold: 140, grid: WAVE_2 },
      { hold: 140, grid: WAVE_1 },
      { hold: 140, grid: WAVE_3 },
      { hold: 140, grid: WAVE_2 },
      { hold: 140, grid: WAVE_1 },
      { hold: 200, grid: BASE },
    ],
    working: [
      { hold: 130, grid: PUNCH_L },
      { hold: 110, grid: BASE },
      { hold: 130, grid: PUNCH_R },
      { hold: 110, grid: BASE },
      { hold: 160, grid: GUARD },
      { hold: 100, grid: BLINK },
      { hold: 130, grid: PUNCH_L },
      { hold: 130, grid: PUNCH_R },
      { hold: 150, grid: GUARD },
    ],
    think: [
      { hold: 480, grid: THINK },
      { hold: 320, grid: THINK2 },
      { hold: 450, grid: THINK },
      { hold: 280, grid: THINK2 },
      { hold: 200, grid: BLINK },
    ],
    dash: [
      { hold: 100, grid: DASH_1 },
      { hold: 100, grid: DASH_2 },
      { hold: 100, grid: DASH_3 },
      { hold: 100, grid: DASH_1 },
      { hold: 100, grid: DASH_2 },
      { hold: 100, grid: DASH_3 },
      { hold: 160, grid: BASE },
    ],
    flex: [
      { hold: 180, grid: FLEX_1 },
      { hold: 280, grid: FLEX_2 },
      { hold: 180, grid: FLEX_1 },
      { hold: 260, grid: FLEX_2 },
      { hold: 160, grid: BASE },
    ],
    celebrate: [
      { hold: 90, grid: CROUCH },
      { hold: 110, grid: JUMP },
      { hold: 160, grid: PEAK },
      { hold: 110, grid: JUMP },
      { hold: 120, grid: LAND },
      { hold: 140, grid: FLEX_2 },
      { hold: 180, grid: BASE },
    ],
    error: [
      { hold: 240, grid: ERROR },
      { hold: 150, grid: ERROR_SHAKE },
      { hold: 220, grid: ERROR_SIGH },
      { hold: 150, grid: ERROR_SHAKE },
      { hold: 240, grid: ERROR },
    ],
  },
};
