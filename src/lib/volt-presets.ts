import type { PersonalityMood } from '@/components/mascot/personalities/types';
import type { ComponentDoc } from './component-docs';

export interface VoltPresetMeta {
  mood: PersonalityMood;
  /** ClaudePix-style preset id shown on the card */
  name: string;
  label: string;
  description: string;
}

/** One card per Volt behaviour — browse live, copy the snippet. */
export const voltPresetMeta: VoltPresetMeta[] = [
  {
    mood: 'idle',
    name: 'volt_idle',
    label: 'Idle',
    description: 'Soft bob, hair sway, and blink — default loop for empty states.',
  },
  {
    mood: 'wave',
    name: 'volt_wave',
    label: 'Wave',
    description: 'Friendly hello wave — great for welcome screens and onboarding.',
  },
  {
    mood: 'working',
    name: 'volt_train',
    label: 'Train',
    description: 'Punch / guard training loop — loading or “busy” moments.',
  },
  {
    mood: 'think',
    name: 'volt_think',
    label: 'Think',
    description: 'Looks up with a thought spark — waiting, pondering, AI thinking.',
  },
  {
    mood: 'dash',
    name: 'volt_dash',
    label: 'Dash',
    description: 'Run cycle with motion streaks — progress, sync, or hustle UI.',
  },
  {
    mood: 'flex',
    name: 'volt_flex',
    label: 'Flex',
    description: 'Power pose — success milestones and confidence moments.',
  },
  {
    mood: 'celebrate',
    name: 'volt_celebrate',
    label: 'Celebrate',
    description: 'Jump + flex victory — form success, unlocks, level-ups.',
  },
  {
    mood: 'error',
    name: 'volt_error',
    label: 'Error',
    description: 'Dizzy / sigh — validation errors and failed actions.',
  },
];

function voltCode(mood: PersonalityMood, presetName: string): string {
  return `import { PixelPersonality } from "@/components/mascot";

// ${presetName}
export default function VoltPreset() {
  return (
    <PixelPersonality
      name="volt"
      mood="${mood}"
      size={8}
    />
  );
}`;
}

export const voltPresetDocs: ComponentDoc[] = voltPresetMeta.map((preset) => ({
  slug: preset.name.replace(/_/g, '-'),
  name: preset.name,
  description: preset.description,
  category: 'mascot' as const,
  group: 'volt',
  groupLabel: 'Volt',
  personality: 'volt',
  mood: preset.mood,
  props: [
    { name: 'name', type: "'volt'", default: "'volt'", description: 'Personality id.' },
    { name: 'mood', type: `'${preset.mood}'`, default: `'${preset.mood}'`, description: 'This preset behaviour.' },
    { name: 'size', type: 'number', default: '8', description: 'Pixel size of each cell.' },
  ],
  code: voltCode(preset.mood, preset.name),
}));
