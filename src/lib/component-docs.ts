export interface ComponentDoc {
  slug: string;
  name: string;
  description: string;
  category: "primitive" | "mascot" | "block";
  /** Optional nest under a personality pack in the sidebar (e.g. "volt") */
  group?: string;
  groupLabel?: string;
  /** Personality mood for live previews */
  mood?: string;
  personality?: string;
  props: PropDef[];
  code: string;
}

export interface PropDef {
  name: string;
  type: string;
  default?: string;
  description: string;
}

import { voltPresetDocs } from "./volt-presets";

export const componentDocs: ComponentDoc[] = [
  {
    slug: "pixel-button",
    name: "PixelButton",
    description:
      "A crunchy pixel-art button with hard offset shadows that press on click. Supports primary, secondary, ghost, and danger variants.",
    category: "primitive",
    props: [
      { name: "variant", type: "'primary' | 'secondary' | 'ghost' | 'danger'", default: "'primary'", description: "Visual style variant." },
      { name: "size", type: "'sm' | 'md' | 'lg'", default: "'md'", description: "Button size." },
      { name: "disabled", type: "boolean", default: "false", description: "Disables the button." },
      { name: "children", type: "ReactNode", description: "Button content." },
      { name: "className", type: "string", description: "Additional CSS classes." },
    ],
    code: `import { PixelButton } from "@/components/ui";

<PixelButton variant="primary" size="md">
  Click Me
</PixelButton>

<PixelButton variant="secondary">
  Secondary
</PixelButton>

<PixelButton variant="ghost">
  Ghost
</PixelButton>

<PixelButton variant="danger">
  Delete
</PixelButton>`,
  },
  {
    slug: "pixel-card",
    name: "PixelCard",
    description:
      "A blocky card container with 2px borders, hard shadows, and optional corner notches.",
    category: "primitive",
    props: [
      { name: "notch", type: "boolean", default: "false", description: "Adds pixel-art corner notches via clip-path." },
      { name: "hover", type: "boolean", default: "false", description: "Enables lift effect on hover." },
      { name: "children", type: "ReactNode", description: "Card content." },
      { name: "className", type: "string", description: "Additional CSS classes." },
    ],
    code: `import { PixelCard } from "@/components/ui";

<PixelCard>
  <h3>Basic Card</h3>
  <p>A simple pixel card.</p>
</PixelCard>

<PixelCard notch hover>
  <h3>Notched Card</h3>
  <p>With corner notches and hover effect.</p>
</PixelCard>`,
  },
  {
    slug: "pixel-badge",
    name: "PixelBadge",
    description:
      "Inline pixel-art badge/label with color variants and optional pulsing dot indicator.",
    category: "primitive",
    props: [
      { name: "variant", type: "'default' | 'cool' | 'success' | 'danger' | 'outline'", default: "'default'", description: "Color variant." },
      { name: "dot", type: "boolean", default: "false", description: "Shows a pulsing dot indicator." },
      { name: "children", type: "ReactNode", description: "Badge text." },
      { name: "className", type: "string", description: "Additional CSS classes." },
    ],
    code: `import { PixelBadge } from "@/components/ui";

<PixelBadge>Default</PixelBadge>
<PixelBadge variant="cool">Info</PixelBadge>
<PixelBadge variant="success" dot>Online</PixelBadge>
<PixelBadge variant="danger">Error</PixelBadge>
<PixelBadge variant="outline">Outline</PixelBadge>`,
  },
  {
    slug: "pixel-window",
    name: "PixelWindow",
    description:
      "A retro OS-style window panel with a title bar, control dots, and content area.",
    category: "primitive",
    props: [
      { name: "title", type: "string", default: "'Window'", description: "Title bar text." },
      { name: "compact", type: "boolean", default: "false", description: "Reduces internal padding." },
      { name: "children", type: "ReactNode", description: "Window body content." },
      { name: "className", type: "string", description: "Additional CSS classes." },
    ],
    code: `import { PixelWindow } from "@/components/ui";

<PixelWindow title="pixel_editor.exe">
  <p>Window content goes here.</p>
</PixelWindow>

<PixelWindow title="compact.txt" compact>
  <p>Less padding for tight layouts.</p>
</PixelWindow>`,
  },
  {
    slug: "pixel-loader",
    name: "PixelLoader",
    description:
      "A 4×4 grid loader with a diagonal wave animation. Perfect for loading states.",
    category: "primitive",
    props: [
      { name: "size", type: "'sm' | 'md' | 'lg'", default: "'md'", description: "Loader cell size." },
      { name: "className", type: "string", description: "Additional CSS classes." },
    ],
    code: `import { PixelLoader } from "@/components/ui";

<PixelLoader size="sm" />
<PixelLoader size="md" />
<PixelLoader size="lg" />`,
  },
  {
    slug: "pixel-input",
    name: "PixelInput",
    description:
      "A crunchy text input with hard shadow focus ring, optional label, hint, and error state for forms.",
    category: "primitive",
    props: [
      { name: "label", type: "string", description: "Optional field label." },
      { name: "hint", type: "string", description: "Helper text under the input." },
      { name: "error", type: "string", description: "Error message; switches border to danger." },
      { name: "placeholder", type: "string", description: "Placeholder text." },
      { name: "disabled", type: "boolean", default: "false", description: "Disables the input." },
      { name: "className", type: "string", description: "Additional CSS classes." },
    ],
    code: `import { PixelInput } from "@/components/ui";

<PixelInput label="PLAYER" placeholder="enter name..." />
<PixelInput label="EMAIL" hint="We never share this." />
<PixelInput label="CODE" error="Invalid invite code." />`,
  },
  {
    slug: "pixel-creature",
    name: "PixelCreature",
    description:
      "Canvas-based pixel creature renderer. Feed it a sprite grid and palette and it draws crisp pixel art with optional animation frames.",
    category: "mascot",
    props: [
      { name: "base", type: "number[][]", description: "2D grid of palette color indices." },
      { name: "palette", type: "string[]", description: "Array of color strings (index 0 = transparent)." },
      { name: "frames", type: "number[][][]", description: "Optional animation frame grids." },
      { name: "size", type: "number", default: "8", description: "Pixel size of each grid cell." },
      { name: "gridLines", type: "boolean", default: "false", description: "Show grid lines." },
      { name: "className", type: "string", description: "Additional CSS classes." },
    ],
    code: `import { PixelCreature } from "@/components/mascot";

const grid = [
  [0,0,1,1,0,0],
  [0,1,2,2,1,0],
  [1,2,3,3,2,1],
  [1,2,3,3,2,1],
  [0,1,2,2,1,0],
  [0,0,1,1,0,0],
];

const palette = [
  "transparent",
  "#FFB020",
  "#35C2FF",
  "#ECEFF4",
];

<PixelCreature base={grid} palette={palette} size={12} />`,
  },
  {
    slug: "mascot",
    name: "Mascot",
    description:
      "The RetroChunk mascot — idles, blinks, waves, celebrates, and shows an error mood. Works with hover and tap.",
    category: "mascot",
    props: [
      { name: "animation", type: "'idle' | 'blink' | 'wave' | 'celebrate' | 'error'", default: "'idle'", description: "Animation / emotion preset." },
      { name: "size", type: "number", default: "8", description: "Pixel size of each cell." },
      { name: "className", type: "string", description: "Additional CSS classes." },
    ],
    code: `import { Mascot } from "@/components/mascot";

<Mascot animation="idle" size={8} />
<Mascot animation="wave" size={10} />
<Mascot animation="celebrate" size={12} />
<Mascot animation="error" size={10} />`,
  },
  {
    slug: "bit",
    name: "Bit",
    description:
      "Amber UI buddy with a cyan caret — big readable shapes. Moods: idle, working (desk + laptop), think, celebrate, error. Add more Bit behaviors under this personality over time.",
    category: "mascot",
    props: [
      { name: "name", type: "'bit'", default: "'bit'", description: "Personality id." },
      { name: "mood", type: "'idle' | 'working' | 'think' | 'celebrate' | 'error'", default: "'idle'", description: "Behaviour / emotion." },
      { name: "size", type: "number", default: "8", description: "Pixel size of each cell." },
      { name: "className", type: "string", description: "Additional CSS classes." },
    ],
    code: `import { PixelPersonality } from "@/components/mascot";

<PixelPersonality name="bit" mood="idle" size={8} />
<PixelPersonality name="bit" mood="working" size={8} />
<PixelPersonality name="bit" mood="celebrate" size={8} />
<PixelPersonality name="bit" mood="error" size={8} />`,
  },
  ...voltPresetDocs,
  {
    slug: "hero-pixel",
    name: "HeroPixel",
    description:
      "A hero section block with pixel-font headline, body copy, CTA buttons, and a live mascot.",
    category: "block",
    props: [
      { name: "title", type: "string", description: "Hero headline text." },
      { name: "subtitle", type: "string", description: "Body copy under the headline." },
      { name: "ctaText", type: "string", default: "'Get Started'", description: "Primary CTA button text." },
      { name: "ctaHref", type: "string", default: "'#'", description: "Primary CTA link." },
      { name: "secondaryText", type: "string", description: "Secondary CTA text." },
      { name: "secondaryHref", type: "string", description: "Secondary CTA link." },
      { name: "className", type: "string", description: "Additional CSS classes." },
    ],
    code: `import { HeroPixel } from "@/components/blocks";

<HeroPixel
  title="Build Retro UIs"
  subtitle="Pixel-art components for modern React apps."
  ctaText="Get Started"
  ctaHref="/docs"
  secondaryText="View on GitHub"
  secondaryHref="https://github.com"
/>`,
  },
  {
    slug: "testimonials-pixel",
    name: "TestimonialsPixel",
    description:
      "A marquee wall of pixel-styled testimonial cards with generated pixel avatars.",
    category: "block",
    props: [
      { name: "testimonials", type: "Testimonial[]", description: "Array of testimonial data." },
      { name: "className", type: "string", description: "Additional CSS classes." },
    ],
    code: `import { TestimonialsPixel } from "@/components/blocks";

const testimonials = [
  {
    name: "Player One",
    role: "Game Dev",
    text: "These components are rad!",
    avatar: [/* pixel grid */],
  },
];

<TestimonialsPixel testimonials={testimonials} />`,
  },
  {
    slug: "dashboard-pixel",
    name: "DashboardPixel",
    description:
      "A pixel-art dashboard block with stat tiles, a bar chart, sidebar, and window panels.",
    category: "block",
    props: [
      { name: "className", type: "string", description: "Additional CSS classes." },
    ],
    code: `import { DashboardPixel } from "@/components/blocks";

<DashboardPixel />`,
  },
];

export function getComponentDoc(slug: string): ComponentDoc | undefined {
  return componentDocs.find((doc) => doc.slug === slug);
}

export function getComponentsByCategory(
  category: ComponentDoc["category"]
): ComponentDoc[] {
  return componentDocs.filter((doc) => doc.category === category);
}
