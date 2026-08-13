export type PersonalityMood = 'idle' | 'working' | 'celebrate' | 'error' | 'think';

export interface PersonalityFrame {
  hold: number;
  grid: number[][];
}

export interface PersonalityPreset {
  id: string;
  name: string;
  description: string;
  gridSize: number;
  palette: string[];
  base: number[][];
  moods: Partial<Record<PersonalityMood, PersonalityFrame[]>>;
}
