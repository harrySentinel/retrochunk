import { patch, shift } from '../creature-helpers';
import type { PersonalityPreset } from './types';

/**
 * Bit — original RetroChunk personality.
 * Amber chunk with a signal antenna (not headphones). Built for product UI moods.
 */
const PALETTE = [
  'transparent', // 0
  '#0C0D10', // 1 outline / ink
  '#FFB020', // 2 body accent
  '#FFE08A', // 3 highlight
  '#35C2FF', // 4 cool / signal
  '#14161B', // 5 dark panel
  '#FF5470', // 6 danger
  '#ECEFF4', // 7 eye white / spark
];

const E = 0;
const K = 1;
const B = 2;
const H = 3;
const C = 4;
const D = 5;
const R = 6;
const W = 7;

// 16×16 — original RetroChunk "Bit"
const BASE = [
  [E, E, E, E, E, E, E, C, C, E, E, E, E, E, E, E],
  [E, E, E, E, E, E, E, C, K, E, E, E, E, E, E, E],
  [E, E, E, E, E, E, E, K, K, E, E, E, E, E, E, E],
  [E, E, E, E, K, K, K, K, K, K, K, K, E, E, E, E],
  [E, E, E, K, B, B, B, B, B, B, B, B, K, E, E, E],
  [E, E, E, K, B, W, D, B, B, W, D, B, K, E, E, E],
  [E, E, E, K, B, B, B, B, B, B, B, B, K, E, E, E],
  [E, E, E, K, B, B, D, D, D, D, B, B, K, E, E, E],
  [E, E, E, E, K, B, B, B, B, B, B, K, E, E, E, E],
  [E, E, E, K, K, K, B, B, B, B, K, K, K, E, E, E],
  [E, E, K, H, H, K, B, B, B, B, K, H, H, K, E, E],
  [E, E, K, H, H, K, B, B, B, B, K, H, H, K, E, E],
  [E, E, E, K, K, K, B, B, B, B, K, K, K, E, E, E],
  [E, E, E, E, K, B, B, K, K, B, B, K, E, E, E, E],
  [E, E, E, E, K, B, B, K, K, B, B, K, E, E, E, E],
  [E, E, E, E, E, K, K, E, E, K, K, E, E, E, E, E],
];

const BLINK = patch(BASE, [
  [5, 5, B],
  [5, 6, B],
  [5, 9, B],
  [5, 10, B],
]);

const BOB = shift(BASE, 1, 0);
const ANTENNA_LEFT = patch(BASE, [
  [0, 7, E],
  [0, 8, E],
  [0, 6, C],
  [0, 7, C],
  [1, 7, E],
  [1, 6, C],
  [1, 7, K],
]);
const ANTENNA_RIGHT = patch(BASE, [
  [0, 7, E],
  [0, 8, E],
  [0, 8, C],
  [0, 9, C],
  [1, 7, E],
  [1, 8, C],
  [1, 8, K],
]);

const WORKING_A = patch(ANTENNA_LEFT, [
  [10, 3, E],
  [10, 4, E],
  [11, 3, E],
  [11, 4, E],
  [9, 2, K],
  [9, 3, H],
  [10, 2, K],
  [10, 3, H],
]);
const WORKING_B = patch(ANTENNA_RIGHT, [
  [10, 11, E],
  [10, 12, E],
  [11, 11, E],
  [11, 12, E],
  [9, 12, H],
  [9, 13, K],
  [10, 12, H],
  [10, 13, K],
]);

const THINK = patch(BASE, [
  [5, 5, B],
  [5, 6, W],
  [5, 9, B],
  [5, 10, W],
  [4, 6, D],
  [4, 10, D],
  [0, 7, W],
  [0, 8, C],
]);

const CELEBRATE_UP = patch(shift(BASE, -1, 0), [
  [2, 2, W],
  [3, 13, W],
  [14, 1, C],
  [14, 14, C],
]);
const CELEBRATE_ARMS = patch(shift(BASE, -2, 0), [
  [8, 1, H],
  [8, 2, H],
  [9, 1, K],
  [8, 13, H],
  [8, 14, H],
  [9, 14, K],
  [1, 1, W],
  [2, 14, W],
]);

const ERROR = patch(BASE, [
  [4, 4, R],
  [4, 5, R],
  [4, 6, R],
  [4, 7, R],
  [4, 8, R],
  [4, 9, R],
  [4, 10, R],
  [4, 11, R],
  [5, 5, K],
  [5, 6, R],
  [5, 9, R],
  [5, 10, K],
  [7, 5, K],
  [7, 6, K],
  [7, 7, K],
  [7, 8, K],
  [7, 9, K],
  [7, 10, K],
  [0, 7, R],
  [0, 8, R],
]);
const ERROR_SHAKE = shift(ERROR, 0, 1);

export const bitPersonality: PersonalityPreset = {
  id: 'bit',
  name: 'Bit',
  description:
    'Original RetroChunk buddy — amber chunk with a signal antenna. Moods map to product UI states.',
  gridSize: 16,
  palette: PALETTE,
  base: BASE,
  moods: {
    idle: [
      { hold: 700, grid: BASE },
      { hold: 700, grid: BOB },
      { hold: 120, grid: BLINK },
      { hold: 500, grid: BASE },
    ],
    working: [
      { hold: 160, grid: WORKING_A },
      { hold: 160, grid: WORKING_B },
      { hold: 160, grid: WORKING_A },
      { hold: 160, grid: ANTENNA_RIGHT },
      { hold: 100, grid: BLINK },
      { hold: 160, grid: WORKING_B },
    ],
    think: [
      { hold: 500, grid: THINK },
      { hold: 220, grid: patch(THINK, [[0, 7, C], [0, 8, W]]) },
      { hold: 500, grid: THINK },
    ],
    celebrate: [
      { hold: 120, grid: BASE },
      { hold: 140, grid: CELEBRATE_UP },
      { hold: 180, grid: CELEBRATE_ARMS },
      { hold: 140, grid: CELEBRATE_UP },
      { hold: 160, grid: BASE },
    ],
    error: [
      { hold: 220, grid: ERROR },
      { hold: 180, grid: ERROR_SHAKE },
      { hold: 220, grid: ERROR },
      { hold: 180, grid: ERROR_SHAKE },
    ],
  },
};
