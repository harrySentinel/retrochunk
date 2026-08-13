import { patch, shift } from '../creature-helpers';
import type { PersonalityPreset } from './types';

/**
 * Bit — original RetroChunk personality.
 * Clarity-first (big shapes, high contrast), like good pixel mascots:
 * soft amber body, square eyes, cyan UI caret. Not a ClaudePix clone.
 */
const PALETTE = [
  'transparent', // 0
  '#111111', // 1 eye / ink
  '#FFB020', // 2 body
  '#35C2FF', // 3 caret / cool
  '#FFE08A', // 4 body highlight
  '#5A5E66', // 5 laptop screen
  '#2A2C30', // 6 laptop / desk dark
  '#D0D4D8', // 7 laptop logo / light gray
  '#1A1C20', // 8 desk leg
  '#FF5470', // 9 danger
];

const E = 0;
const Y = 1; // eye / ink
const B = 2; // body
const C = 3; // cyan caret
const H = 4; // highlight
const SC = 5; // screen
const DK = 6; // dark metal
const LG = 7; // light gray
const DL = 8; // desk leg
const R = 9; // danger

const BASE: number[][] = [
  // clear silhouette: caret + round head + body + feet
  [E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E],
  [E, E, E, E, E, E, E, E, E, C, E, E, E, E, E, E, E, E, E, E],
  [E, E, E, E, E, E, E, E, E, C, E, E, E, E, E, E, E, E, E, E],
  [E, E, E, E, E, E, E, E, E, C, E, E, E, E, E, E, E, E, E, E],
  [E, E, E, E, E, E, B, B, B, B, B, B, B, B, E, E, E, E, E, E],
  [E, E, E, E, E, B, B, B, B, B, B, B, B, B, B, E, E, E, E, E],
  [E, E, E, E, B, B, Y, B, B, B, B, B, Y, B, B, B, E, E, E, E],
  [E, E, E, E, B, B, B, B, B, B, B, B, B, B, B, B, E, E, E, E],
  [E, E, E, E, B, B, B, B, Y, Y, Y, Y, B, B, B, B, E, E, E, E],
  [E, E, E, E, E, B, B, B, B, B, B, B, B, B, B, E, E, E, E, E],
  [E, E, E, E, E, E, B, B, B, B, B, B, B, B, E, E, E, E, E, E],
  [E, E, E, E, B, B, B, B, B, B, B, B, B, B, B, B, E, E, E, E],
  [E, E, E, B, B, B, B, B, B, B, B, B, B, B, B, B, B, E, E, E],
  [E, E, E, B, B, B, B, B, B, B, B, B, B, B, B, B, B, E, E, E],
  [E, E, E, B, E, B, B, B, B, B, B, B, B, B, B, E, B, E, E, E],
  [E, E, E, E, E, B, B, B, B, B, B, B, B, B, B, E, E, E, E, E],
  [E, E, E, E, E, B, B, B, B, B, B, B, B, B, B, E, E, E, E, E],
  [E, E, E, E, E, E, E, B, E, E, E, E, B, E, E, E, E, E, E, E],
  [E, E, E, E, E, E, E, B, E, E, E, E, B, E, E, E, E, E, E, E],
  [E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E],
];

const BLINK = patch(BASE, [
  [6, 6, B],
  [6, 12, B],
]);

const CARET_OFF = patch(BASE, [
  [1, 9, E],
  [2, 9, E],
  [3, 9, E],
]);

const BOB = shift(BASE, 1, 0);

// ── Working: creature at laptop + desk (readable props) ───────
const WORK_BASE: number[][] = [
  [E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E],
  [E, E, E, E, E, E, E, E, E, C, E, E, E, E, E, E, E, E, E, E],
  [E, E, E, E, E, E, E, E, E, C, E, E, E, E, E, E, E, E, E, E],
  [E, E, E, E, E, B, B, B, B, B, B, B, B, B, E, E, E, E, E, E],
  [E, E, E, E, B, B, B, B, B, B, B, B, B, B, B, E, E, E, E, E],
  [E, E, E, E, B, B, Y, B, B, B, B, B, Y, B, B, E, E, E, E, E],
  [E, E, E, E, B, B, B, B, B, B, B, B, B, B, B, E, E, E, E, E],
  [E, E, E, E, B, B, B, B, Y, Y, Y, Y, B, B, B, E, E, E, E, E],
  [E, E, E, B, B, B, B, B, B, B, B, B, B, B, B, B, E, E, E, E],
  [E, E, E, B, B, B, SC, SC, SC, SC, SC, SC, SC, SC, B, B, E, E, E],
  [E, E, E, B, B, B, SC, SC, SC, SC, SC, SC, SC, SC, B, B, E, E, E],
  [E, E, E, B, B, B, SC, SC, SC, LG, LG, SC, SC, SC, B, B, E, E, E],
  [E, E, E, E, B, DK, DK, DK, DK, DK, DK, DK, DK, DK, DK, B, E, E, E],
  [E, DK, DK, DK, DK, DK, DK, DK, DK, DK, DK, DK, DK, DK, DK, DK, DK, DK, DK, E],
  [E, E, DL, DL, E, E, E, E, E, E, E, E, E, E, E, E, DL, DL, E, E],
  [E, E, DL, DL, E, E, E, E, E, E, E, E, E, E, E, E, DL, DL, E, E],
  [E, E, DL, DL, E, E, E, E, E, E, E, E, E, E, E, E, DL, DL, E, E],
  [E, E, DL, DL, E, E, E, E, E, E, E, E, E, E, E, E, DL, DL, E, E],
  [E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E],
  [E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E],
];

const TYPE_L = patch(WORK_BASE, [[12, 5, B]]);
const TYPE_R = patch(WORK_BASE, [[12, 15, B]]);
const TYPE_BOTH = patch(WORK_BASE, [
  [12, 5, B],
  [12, 15, B],
]);
const WORK_BLINK = patch(WORK_BASE, [
  [5, 6, B],
  [5, 12, B],
]);
const WORK_THINK = patch(WORK_BASE, [
  [5, 6, B],
  [5, 12, B],
  [4, 6, Y],
  [4, 12, Y],
]);
const CUR_ON = patch(WORK_THINK, [[10, 13, LG]]);

// ── Celebrate: bounce + particles ─────────────────────────────
const CROUCH = patch(shift(BASE, 1, 0), [
  [14, 2, B],
  [14, 17, B],
]);
const UP1 = shift(BASE, -1, 0);
const UP2 = patch(shift(BASE, -2, 0), [
  [12, 1, B],
  [12, 2, B],
  [13, 1, B],
  [12, 17, B],
  [12, 18, B],
  [13, 18, B],
]);
const LAND = patch(BASE, [
  [18, 4, C],
  [18, 5, H],
  [18, 14, H],
  [18, 15, C],
]);
const IMPACT = patch(shift(BASE, 1, 0), [
  [18, 3, C],
  [18, 4, H],
  [18, 15, H],
  [18, 16, C],
  [14, 2, B],
  [14, 17, B],
]);

function spark(frame: number[][], pts: Array<[number, number]>) {
  return pt(
    frame,
    pts.map(([r, c]) => [r, c, C] as [number, number, number])
  );
}
function pt(f: number[][], ops: Array<[number, number, number]>) {
  return patch(f, ops);
}

const TL: Array<[number, number]> = [
  [0, 1],
  [1, 1],
  [0, 2],
];
const TR: Array<[number, number]> = [
  [0, 18],
  [1, 18],
  [0, 17],
];
const ML: Array<[number, number]> = [
  [6, 1],
  [7, 0],
];
const MR: Array<[number, number]> = [
  [6, 18],
  [7, 19],
];

// ── Error ─────────────────────────────────────────────────────
const ERROR = patch(BASE, [
  [1, 9, R],
  [2, 9, R],
  [3, 9, R],
  [6, 6, Y],
  [6, 7, R],
  [6, 11, R],
  [6, 12, Y],
  [5, 6, Y],
  [5, 12, Y],
  [7, 6, Y],
  [7, 12, Y],
  [8, 8, Y],
  [8, 9, Y],
  [8, 10, Y],
  [8, 11, Y],
]);
const ERROR_SHAKE = shift(ERROR, 0, 1);

const THINK_STAND = patch(BASE, [
  [6, 6, B],
  [6, 12, B],
  [5, 6, Y],
  [5, 12, Y],
]);
const THINK_CARET = patch(THINK_STAND, [
  [1, 9, E],
  [0, 9, C],
  [0, 10, C],
  [1, 10, C],
]);

export const bitPersonality: PersonalityPreset = {
  id: 'bit',
  name: 'Bit',
  description:
    'RetroChunk’s amber UI buddy — big readable shapes, square eyes, cyan caret. Moods for idle, work, think, celebrate, error.',
  gridSize: 20,
  palette: PALETTE,
  base: BASE,
  moods: {
    idle: [
      { hold: 500, grid: BASE },
      { hold: 450, grid: BOB },
      { hold: 90, grid: BLINK },
      { hold: 400, grid: BASE },
      { hold: 220, grid: CARET_OFF },
      { hold: 400, grid: BASE },
    ],
    working: [
      { hold: 160, grid: TYPE_L },
      { hold: 160, grid: TYPE_R },
      { hold: 160, grid: TYPE_L },
      { hold: 160, grid: TYPE_R },
      { hold: 140, grid: TYPE_BOTH },
      { hold: 90, grid: WORK_BLINK },
      { hold: 160, grid: TYPE_L },
      { hold: 160, grid: TYPE_R },
      { hold: 350, grid: WORK_THINK },
      { hold: 280, grid: CUR_ON },
      { hold: 260, grid: WORK_THINK },
      { hold: 280, grid: CUR_ON },
    ],
    think: [
      { hold: 420, grid: THINK_STAND },
      { hold: 320, grid: THINK_CARET },
      { hold: 400, grid: THINK_STAND },
      { hold: 280, grid: THINK_CARET },
    ],
    celebrate: [
      { hold: 90, grid: spark(CROUCH, [...TL, ...TR]) },
      { hold: 80, grid: spark(UP1, ML) },
      { hold: 140, grid: spark(UP2, [...TL, ...TR, ...MR]) },
      { hold: 80, grid: spark(UP1, TR) },
      { hold: 70, grid: spark(LAND, TL) },
      { hold: 90, grid: spark(IMPACT, [...TL, ...TR]) },
      { hold: 120, grid: spark(BASE, [...TL, ...TR, ...ML, ...MR]) },
      { hold: 100, grid: BASE },
    ],
    error: [
      { hold: 280, grid: ERROR },
      { hold: 160, grid: ERROR_SHAKE },
      { hold: 240, grid: ERROR },
      { hold: 160, grid: ERROR_SHAKE },
    ],
  },
};
