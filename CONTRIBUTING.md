# Contributing to RetroChunk

Thanks for helping build a pixel React UI kit.

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project rules

- **Primitives** live in `src/components/ui`
- **Mascot / creatures** live in `src/components/mascot`
- **Composed blocks** live in `src/components/blocks`
- Document every public component in `src/lib/component-docs.ts`
- Theme via CSS variables in `src/app/globals.css` — no one-off hex in new primitives when a token exists

## Pixel styling

- 2px borders, hard offset shadows, little or no radius
- Pixel font for labels / headings / buttons only — never long body copy
- Prefer `cn()` from `src/lib/cn.ts`

## Pull requests

1. Keep PRs focused (one component or one concern)
2. Add / update docs + gallery preview when you add a component
3. Check mobile layout (drawer, wrapping, touch targets)
4. Do not commit `AGENTS.md` / `CLAUDE.md` (gitignored)

## Package publish surface

`packages/react` is a scaffold for the future npm package. Prefer implementing in `src/components` first.
