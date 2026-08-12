# `@retrochunk/react` (scaffold)

This folder is the future **npm publish surface** for RetroChunk.

## Status

- **Scaffold only** — `private: true` until the extract + build pipeline is ready
- Re-exports live components from the Next.js showcase app
- Peer deps: `react`, `react-dom`

## Planned install (when published)

```bash
npm install @retrochunk/react
```

```tsx
import { PixelButton, Mascot, PixelInput } from '@retrochunk/react';
```

You will also need the CSS variables / pixel utilities from `src/app/globals.css`.

## Local development

Work in `src/components/**` inside the docs app. This package tracks that API.
