import { patch, shift } from '../creature-helpers';
import type { PersonalityPreset } from './types';

/**
 * Volt — original RetroChunk fighter buddy.
 * Spiky-hair anime energy people love on sites — NOT Goku / any copyrighted character.
 * Teal tunic + amber belt + cyan hair tips (RetroChunk palette).
 */
const PALETTE = [
  'transparent', // 0
  '#111111', // 1 ink / eyes
  '#E8B896', // 2 skin
  '#1B2430', // 3 hair
  '#35C2FF', // 4 cyan tip / aura
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

const BASE: number[][] = [
  // original spiky silhouette — readable, not a DBZ copy
  [E, E, E, E, E, H, E, E, H, E, E, H, E, E, E, E, E, E, E, E],
  [E, E, E, E, H, H, H, E, H, H, E, H, H, E, E, E, E, E, E, E],
  [E, E, E, H, H, H, H, H, H, H, H, H, H, H, E, E, E, E, E, E],
  [E, E, H, H, C, H, H, H, H, H, H, H, C, H, H, E, E, E, E, E],
  [E, E, E, H, H, H, H, H, H, H, H, H, H, H, E, E, E, E, E, E],
  [E, E, E, E, S, S, S, S, S, S, S, S, S, E, E, E, E, E, E, E],
  [E, E, E, S, S, K, S, S, S, S, S, K, S, S, E, E, E, E, E, E],
  [E, E, E, S, S, S, S, S, S, S, S, S, S, S, E, E, E, E, E, E],
  [E, E, E, S, S, S, S, K, K, K, S, S, S, S, E, E, E, E, E, E],
  [E, E, E, E, S, S, S, S, S, S, S, S, S, E, E, E, E, E, E, E],
  [E, E, E, T, T, T, T, T, T, T, T, T, T, T, E, E, E, E, E, E],
  [E, E, T, T, T, T, T, T, T, T, T, T, T, T, T, E, E, E, E, E],
  [E, E, T, TD, T, T, T, A, A, A, A, T, T, TD, T, E, E, E, E, E],
  [E, E, T, T, T, T, T, T, T, T, T, T, T, T, T, E, E, E, E, E],
  [E, E, T, E, T, T, T, T, T, T, T, T, T, E, T, E, E, E, E, E],
  [E, E, E, E, T, T, T, T, T, T, T, T, T, E, E, E, E, E, E, E],
  [E, E, E, E, T, T, T, T, T, T, T, T, T, E, E, E, E, E, E, E],
  [E, E, E, E, E, E, S, E, E, E, E, S, E, E, E, E, E, E, E, E],
  [E, E, E, E, E, E, S, E, E, E, E, S, E, E, E, E, E, E, E, E],
  [E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E],
];

const BLINK = patch(BASE, [
  [6, 5, S],
  [6, 11, S],
]);
const BOB = shift(BASE, 1, 0);

const THINK = patch(BASE, [
  [6, 5, S],
  [6, 11, S],
  [5, 5, K],
  [5, 11, K],
  [2, 16, C],
  [3, 17, W],
]);

// Training punches
const PUNCH_L = patch(BASE, [
  [11, 1, S],
  [11, 2, S],
  [12, 1, S],
  [14, 2, E],
  [14, 14, T],
]);
const PUNCH_R = patch(BASE, [
  [11, 17, S],
  [11, 18, S],
  [12, 18, S],
  [14, 2, T],
  [14, 14, E],
]);
const PUNCH_BOTH = patch(BASE, [
  [10, 1, S],
  [10, 2, S],
  [10, 17, S],
  [10, 18, S],
  [11, 1, S],
  [11, 18, S],
]);

// Power jump celebrate
const CROUCH = patch(shift(BASE, 1, 0), [
  [14, 2, T],
  [14, 17, T],
]);
const UP = patch(shift(BASE, -2, 0), [
  [10, 0, C],
  [11, 0, C],
  [10, 19, C],
  [11, 19, C],
  [3, 4, C],
  [3, 15, C],
]);
const PEAK = patch(shift(BASE, -3, 0), [
  [1, 2, C],
  [2, 3, W],
  [1, 17, C],
  [2, 16, W],
  [8, 0, C],
  [8, 19, C],
  [14, 1, A],
  [14, 18, A],
]);
const LAND = patch(BASE, [
  [18, 4, C],
  [18, 5, A],
  [18, 14, A],
  [18, 15, C],
  [14, 2, T],
  [14, 17, T],
]);

const ERROR = patch(BASE, [
  [6, 5, K],
  [6, 6, R],
  [6, 10, R],
  [6, 11, K],
  [5, 5, K],
  [5, 11, K],
  [7, 5, K],
  [7, 11, K],
  [8, 7, K],
  [8, 8, K],
  [8, 9, K],
  [8, 10, K],
  [1, 9, R],
  [2, 9, R],
]);
const ERROR_SHAKE = shift(ERROR, 0, 1);

export const voltPersonality: PersonalityPreset = {
  id: 'volt',
  name: 'Volt',
  description:
    'Original spiky-haired fighter buddy for sites — teal tunic, amber belt, cyan hair tips. Anime energy without using anyone else’s character.',
  gridSize: 20,
  palette: PALETTE,
  base: BASE,
  moods: {
    idle: [
      { hold: 480, grid: BASE },
      { hold: 420, grid: BOB },
      { hold: 90, grid: BLINK },
      { hold: 500, grid: BASE },
    ],
    working: [
      { hold: 140, grid: PUNCH_L },
      { hold: 140, grid: BASE },
      { hold: 140, grid: PUNCH_R },
      { hold: 140, grid: BASE },
      { hold: 160, grid: PUNCH_BOTH },
      { hold: 100, grid: BLINK },
      { hold: 160, grid: PUNCH_L },
      { hold: 160, grid: PUNCH_R },
    ],
    think: [
      { hold: 500, grid: THINK },
      { hold: 320, grid: patch(THINK, [[3, 17, C], [2, 16, W]]) },
      { hold: 450, grid: THINK },
    ],
    celebrate: [
      { hold: 90, grid: CROUCH },
      { hold: 110, grid: UP },
      { hold: 160, grid: PEAK },
      { hold: 110, grid: UP },
      { hold: 120, grid: LAND },
      { hold: 180, grid: BASE },
    ],
    error: [
      { hold: 260, grid: ERROR },
      { hold: 160, grid: ERROR_SHAKE },
      { hold: 240, grid: ERROR },
      { hold: 160, grid: ERROR_SHAKE },
    ],
  },
};
