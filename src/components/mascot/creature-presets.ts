import { patch, shift } from './creature-helpers';

export const MASCOT_PALETTE = [
  'transparent',
  '#14161B', // 1: surface
  '#ECEFF4', // 2: text
  '#FFB020', // 3: accent
  '#35C2FF', // 4: cool
  '#48D597', // 5: success
  '#FF5470', // 6: danger
];

export const MASCOT_BASE = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0],
  [0, 0, 1, 4, 4, 4, 4, 4, 4, 1, 0, 0],
  [0, 1, 4, 1, 4, 4, 4, 1, 4, 4, 1, 0], // eyes open (1)
  [0, 1, 4, 4, 4, 4, 4, 4, 4, 4, 1, 0],
  [0, 1, 4, 4, 1, 1, 1, 1, 4, 4, 1, 0], // mouth
  [0, 1, 4, 4, 4, 4, 4, 4, 4, 4, 1, 0],
  [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
  [0, 0, 1, 2, 2, 1, 1, 2, 2, 1, 0, 0],
  [0, 1, 2, 2, 2, 1, 1, 2, 2, 2, 1, 0], // arms
  [0, 1, 2, 2, 2, 1, 1, 2, 2, 2, 1, 0],
  [0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0], // feet
];

const MASCOT_BOB = shift(MASCOT_BASE, 1, 0);

const MASCOT_BLINK = patch(MASCOT_BASE, [
  [3, 3, 4], [3, 7, 4], // cover eyes
]);

const MASCOT_WAVE_1 = patch(MASCOT_BASE, [
  [9, 1, 0], [9, 2, 0], [9, 3, 0], [10, 1, 0], [10, 2, 0], [10, 3, 0], // remove left arm
  [7, 0, 1], [7, 1, 2], [7, 2, 2], [8, 0, 1], [8, 1, 2], [8, 2, 1], // raised left arm
]);

const MASCOT_WAVE_2 = patch(MASCOT_WAVE_1, [
  [6, 0, 1], [6, 1, 2], [6, 2, 2], [7, 0, 1], [7, 1, 2], [7, 2, 1], // higher raised left arm
  [8, 0, 0], [8, 1, 0], [8, 2, 0] // clear previous
]);

const MASCOT_CELEBRATE_1 = patch(MASCOT_BASE, [
  [9, 1, 0], [9, 2, 0], [9, 3, 0], [10, 1, 0], [10, 2, 0], [10, 3, 0], // clear arms
  [9, 8, 0], [9, 9, 0], [9, 10, 0], [10, 8, 0], [10, 9, 0], [10, 10, 0], // clear right arm
  [7, 0, 1], [7, 1, 2], [7, 2, 2], [8, 0, 1], [8, 1, 2], [8, 2, 1], // left arm up
  [7, 9, 2], [7, 10, 2], [7, 11, 1], [8, 9, 1], [8, 10, 2], [8, 11, 1], // right arm up
]);

const MASCOT_CELEBRATE_SPARKLES = patch(MASCOT_CELEBRATE_1, [
  [1, 0, 3], [3, 11, 3], [10, 0, 3], // yellow sparkles
]);

const MASCOT_ERROR = patch(MASCOT_BASE, [
  [2, 2, 6], [2, 3, 6], [2, 4, 6], [2, 5, 6], [2, 6, 6], [2, 7, 6], [2, 8, 6], [2, 9, 6],
  [3, 3, 1], [3, 7, 1],
  [3, 4, 6], [3, 6, 6],
  [5, 4, 1], [5, 5, 1], [5, 6, 1], [5, 7, 1],
]);

const MASCOT_ERROR_SHAKE = shift(MASCOT_ERROR, 0, 1);

export const MASCOT_FRAMES: Record<'idle' | 'blink' | 'wave' | 'celebrate' | 'error', number[][][]> = {
  idle: [MASCOT_BASE, MASCOT_BASE, MASCOT_BASE, MASCOT_BASE, MASCOT_BOB, MASCOT_BOB, MASCOT_BOB, MASCOT_BOB],
  blink: [MASCOT_BASE, MASCOT_BLINK, MASCOT_BLINK, MASCOT_BASE],
  wave: [MASCOT_BASE, MASCOT_WAVE_1, MASCOT_WAVE_2, MASCOT_WAVE_1],
  celebrate: [MASCOT_CELEBRATE_1, MASCOT_CELEBRATE_SPARKLES, MASCOT_CELEBRATE_1, MASCOT_CELEBRATE_SPARKLES],
  error: [MASCOT_ERROR, MASCOT_ERROR_SHAKE, MASCOT_ERROR, MASCOT_ERROR_SHAKE],
};
