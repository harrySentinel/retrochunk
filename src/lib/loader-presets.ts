import type { ComponentDoc } from './component-docs';

export type LoaderKind =
  | 'grid'
  | 'dots'
  | 'bar'
  | 'orbit'
  | 'stack'
  | 'scan';

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
