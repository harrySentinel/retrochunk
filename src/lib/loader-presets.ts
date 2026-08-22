import type { ComponentDoc } from './component-docs';

export type LoaderKind =
  | 'grid'
  | 'dots'
  | 'bar'
  | 'orbit'
  | 'stack'
  | 'scan'
  | 'snake'
  | 'hourglass'
  | 'glitch'
  | 'ring'
  | 'equalizer'
  | 'pulse'
  | 'drop'
  | 'helix';

export interface LoaderPresetMeta {
  kind: LoaderKind;
  name: string;
  label: string;
  description: string;
  importName: string;
}

export const loaderPresetMeta: LoaderPresetMeta[] = [
  {
    kind: 'grid',
    name: 'loader_grid',
    label: 'Grid',
    description: '4×4 diagonal wave — the classic RetroChunk pixel loader.',
    importName: 'PixelLoader',
  },
  {
    kind: 'dots',
    name: 'loader_dots',
    label: 'Dots',
    description: 'Three bouncing pixel squares — compact for buttons and inline waits.',
    importName: 'PixelDotsLoader',
  },
  {
    kind: 'bar',
    name: 'loader_bar',
    label: 'Bar',
    description: 'Segmented hard-shadow bar that fills left to right.',
    importName: 'PixelBarLoader',
  },
  {
    kind: 'orbit',
    name: 'loader_orbit',
    label: 'Orbit',
    description: 'Pixels orbit a cool center core — great for overlays.',
    importName: 'PixelOrbitLoader',
  },
  {
    kind: 'stack',
    name: 'loader_stack',
    label: 'Stack',
    description: 'Blocks stacking upward — build / upload / packing vibes.',
    importName: 'PixelStackLoader',
  },
  {
    kind: 'scan',
    name: 'loader_scan',
    label: 'Scan',
    description: 'CRT scan beam across a pixel frame — retro boot energy.',
    importName: 'PixelScanLoader',
  },
  {
    kind: 'snake',
    name: 'loader_snake',
    label: 'Snake',
    description: 'A lit pixel races around a square track — arcade chase energy.',
    importName: 'PixelSnakeLoader',
  },
  {
    kind: 'hourglass',
    name: 'loader_hourglass',
    label: 'Hourglass',
    description: 'Sand drains through the neck, fills the bottom chamber, then flips to reset.',
    importName: 'PixelHourglassLoader',
  },
  {
    kind: 'glitch',
    name: 'loader_glitch',
    label: 'Glitch',
    description: 'Jittery CRT bars with screen flash — corrupted boot sequence vibes.',
    importName: 'PixelGlitchLoader',
  },
  {
    kind: 'ring',
    name: 'loader_ring',
    label: 'Ring',
    description: 'Square-orbit tracker — one pixel chases the ring path while the core pulses.',
    importName: 'PixelRingLoader',
  },
  {
    kind: 'equalizer',
    name: 'loader_equalizer',
    label: 'Equalizer',
    description: 'Bouncing audio bars in a pixel frame — loading with rhythm.',
    importName: 'PixelEqualizerLoader',
  },
  {
    kind: 'pulse',
    name: 'loader_pulse',
    label: 'Pulse',
    description: '9×9 pixel grid — concentric rings flash outward from the center like a radar ping.',
    importName: 'PixelPulseLoader',
  },
  {
    kind: 'drop',
    name: 'loader_drop',
    label: 'Drop',
    description:
      'A tetromino falls row by row into a half-stacked well, completes the bottom line, and the row strobes and clears — then everything above drops under gravity.',
    importName: 'PixelDropLoader',
  },
  {
    kind: 'helix',
    name: 'loader_helix',
    label: 'Helix',
    description:
      'Two-tone double helix — blocks scale and fade as they rotate, with rungs that stretch between the strands.',
    importName: 'PixelHelixLoader',
  },
];

function loaderCode(importName: string, presetName: string): string {
  return `import { ${importName} } from "@/components/ui";

// ${presetName}
export default function LoaderPreset() {
  return <${importName} size="md" />;
}`;
}

export const loaderPresetDocs: ComponentDoc[] = loaderPresetMeta.map((preset) => ({
  slug: preset.name.replace(/_/g, '-'),
  name: preset.name,
  description: preset.description,
  category: 'loader' as const,
  group: 'loaders',
  groupLabel: 'Loaders',
  loader: preset.kind,
  props: [
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Loader scale.' },
    { name: 'className', type: 'string', description: 'Additional CSS classes.' },
  ],
  code: loaderCode(preset.importName, preset.name),
}));
