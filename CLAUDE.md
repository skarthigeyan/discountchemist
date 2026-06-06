# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server at http://localhost:3000
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Stack

- **Next.js 16** with App Router (`src/app/`)
- **React 19**
- **TypeScript**
- **Tailwind CSS v4** (via `@tailwindcss/postcss`)
- **Geist** font family (sans + mono) loaded via `next/font/google`

## Architecture

This is a freshly scaffolded Next.js App Router project. The entry points are:

- `src/app/layout.tsx` — root layout; sets up Geist fonts as CSS variables, applies `antialiased` and flex-column body
- `src/app/page.tsx` — home page (currently the default create-next-app template)
- `src/app/globals.css` — global styles

All new pages go under `src/app/` following Next.js App Router conventions (folders = routes, `page.tsx` = route entry, `layout.tsx` = shared layout).
