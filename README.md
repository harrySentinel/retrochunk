# RetroChunk

> Pixel UI for React — buttons to dashboards, plus living mascots.

Hard shadows, crunchy borders, canvas creatures, and CRT vibes. Built with **Next.js 16**, **Tailwind CSS v4**, and **TypeScript**.

![RetroChunk](https://img.shields.io/badge/version-0.1.0-FFB020?style=flat-square)
![Next.js](https://img.shields.io/badge/Next.js-16-000?style=flat-square)
![Tailwind](https://img.shields.io/badge/Tailwind-v4-38bdf8?style=flat-square)

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the gallery, or [http://localhost:3000/playground](http://localhost:3000/playground) to compose login / settings / empty states.

## Project Structure

```
src/
  app/
    layout.tsx             # Fonts + theme
    globals.css            # @theme tokens + keyframes
    page.tsx               # Showcase landing page
    landing-page.tsx       # Hero + gallery + live demos
    playground/page.tsx    # Compose real pixel screens
    docs/[slug]/page.tsx   # Per-component docs with live preview
  components/
    ui/                    # Primitives (button, input, card, …)
    mascot/                # Canvas creatures + emotions
    blocks/                # Composed sections
  lib/
    cn.ts
    component-docs.ts
packages/
  react/                   # Future @retrochunk/react publish surface
```

See [CONTRIBUTING.md](./CONTRIBUTING.md) to add components.

## Theme Tokens

All components read from CSS variables defined in `globals.css`. Override them to re-skin:

| Variable         | Value                         | Description            |
| ---------------- | ----------------------------- | ---------------------- |
| `--bg`           | `#0C0D10`                     | Page background        |
| `--surface`      | `#14161B`                     | Card/panel background  |
| `--surface-2`    | `#1B1E25`                     | Secondary surface      |
| `--border`       | `rgba(255,255,255,0.10)`      | Border color           |
| `--text`         | `#ECEFF4`                     | Primary text           |
| `--text-2`       | `rgba(236,239,244,0.72)`      | Secondary text         |
| `--text-3`       | `rgba(236,239,244,0.5)`       | Muted text             |
| `--accent`       | `#FFB020`                     | Primary accent (amber) |
| `--accent-ink`   | `#0C0D10`                     | Text on accent         |
| `--cool`         | `#35C2FF`                     | Secondary accent       |
| `--success`      | `#48D597`                     | Success color          |
| `--danger`       | `#FF5470`                     | Danger/error color     |

### Changing the Accent Color

To change the accent color, update `--accent` in your CSS:

```css
:root {
  --accent: #8B5CF6;       /* Purple accent */
  --accent-ink: #FFFFFF;   /* White text on purple */
}
```

All components — buttons, badges, highlights — will update automatically.

## Fonts

| CSS Variable      | Font          | Usage                          |
| ------------------ | ------------- | ------------------------------ |
| `--font-pixel`     | Silkscreen    | Headings, buttons, labels only |
| `--font-sans`      | Inter         | Body copy, paragraphs          |
| `--font-mono`      | JetBrains Mono | Code blocks                   |

**Important:** Never use the pixel font for body paragraphs — it kills readability.

## Components

### Primitives

| Component       | Description                                       |
| --------------- | ------------------------------------------------- |
| `PixelButton`   | Button with press effect and 4 variants           |
| `PixelCard`     | Card with hard shadow and optional corner notches |
| `PixelBadge`    | Inline badge with dot indicator option             |
| `PixelWindow`   | Retro OS window with title bar and control dots   |
| `PixelLoader`   | 4×4 grid diagonal-wave loading animation          |

### Mascot

| Component         | Description                               |
| ----------------- | ----------------------------------------- |
| `PixelCreature`   | Canvas sprite grid renderer               |
| `Mascot`          | Interactive creature with idle/wave/blink |

### Blocks

| Component             | Description                              |
| --------------------- | ---------------------------------------- |
| `HeroPixel`           | Hero section with mascot and CTAs        |
| `TestimonialsPixel`   | Scrolling testimonial marquee            |
| `DashboardPixel`      | Pixel-art admin dashboard demo           |

## Pixel Styling Rules

- **2px borders** everywhere — pixel UI is blocky
- **Hard offset shadows** (`4px 4px 0` with no blur) — things look stacked/stamped
- **No rounded corners** (or tiny 2-4px max)
- **Press effect** on buttons: shadow shrinks + translate on `:active`
- **Pixel font** for headings, buttons, labels, stats ONLY
- **`image-rendering: pixelated`** on all canvas/sprite elements
- **Scanline/dotted backgrounds** via `.pixel-scanlines` and `.pixel-dots` utilities

## Portability

Every component is self-contained and themeable via CSS variables. To use a component in another project:

1. Copy the component file
2. Install `clsx` + `tailwind-merge` and add the `cn()` helper
3. Define the CSS variables in your global styles
4. Import and use — no other dependencies needed

## Development

```bash
npm run dev     # Start dev server (Turbopack)
npm run build   # Production build
npm run lint    # ESLint
```

## License

MIT
