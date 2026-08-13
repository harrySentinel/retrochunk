import type { ComponentDoc } from './component-docs';

export type LibrarySectionId = 'primitive' | 'mascot' | 'block';

export interface LibrarySection {
  id: LibrarySectionId;
  label: string;
  description: string;
  icon: string;
}

/** Sidebar / gallery sections — add new buckets here as the library grows. */
export const librarySections: LibrarySection[] = [
  {
    id: 'primitive',
    label: 'PRIMITIVES',
    description: 'Buttons, inputs, cards, and building blocks',
    icon: '▣',
  },
  {
    id: 'mascot',
    label: 'MASCOTS',
    description: 'Creatures & named personalities (Bit, Volt, …)',
    icon: '◈',
  },
  {
    id: 'block',
    label: 'BLOCKS',
    description: 'Heroes, dashboards, testimonials, and sections',
    icon: '▦',
  },
];

export function getSectionMeta(id: string): LibrarySection | undefined {
  return librarySections.find((s) => s.id === id);
}

export function groupDocsBySection(docs: ComponentDoc[]) {
  return librarySections.map((section) => ({
    ...section,
    items: docs.filter((d) => d.category === section.id),
  }));
}
