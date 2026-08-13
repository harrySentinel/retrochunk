import type { PersonalityPreset } from './types';
import { bitPersonality } from './bit';
import { voltPersonality } from './volt';

export * from './types';
export { bitPersonality } from './bit';
export { voltPersonality } from './volt';

export const personalities: PersonalityPreset[] = [bitPersonality, voltPersonality];

export function getPersonality(id: string): PersonalityPreset | undefined {
  return personalities.find((p) => p.id === id);
}
