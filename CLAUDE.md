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

## Data Fetching

Full standards are documented in [`docs/data-fetching.md`](docs/data-fetching.md). The non-negotiable rules:

- **Server Components only** — ALL data fetching must happen in Server Components. Never fetch data in Client Components.
- **`/data` directory** — ALL database queries must go through helper functions in `src/data/`. Never query the database directly from a page or component.
- **Drizzle ORM only** — All `src/data/` helpers must use Drizzle ORM. No raw SQL, no other query builders.

## UI Standards

Full standards are documented in [`docs/ui.md`](docs/ui.md). The non-negotiable rules:

- **shadcn/ui only** — ABSOLUTELY NO custom UI components. Every UI element must come from shadcn/ui. Install components via `npx shadcn@latest add <component>` and import from `src/components/ui/`.
- **date-fns only** — ALL dates displayed in the UI must use `date-fns` with the format `"do MMM yyyy"` (e.g. `07th Jun 2026`, `02nd Jan 2026`). No `toLocaleDateString`, `Intl.DateTimeFormat`, moment, or dayjs.
