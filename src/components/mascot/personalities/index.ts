import type { PersonalityPreset } from './types';
import { bitPersonality } from './bit';

export * from './types';
export { bitPersonality } from './bit';

export const personalities: PersonalityPreset[] = [bitPersonality];

export function getPersonality(id: string): PersonalityPreset | undefined {
  return personalities.find((p) => p.id === id);
}
