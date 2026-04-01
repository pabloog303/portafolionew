# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start Vite dev server with HMR
npm run build        # Production build
npm run build:dev    # Development build
npm run lint         # ESLint validation
npm run preview      # Preview production build locally
npm run test         # Run Vitest suite once
npm run test:watch   # Run Vitest in watch mode
```

Test files match `src/**/*.{test,spec}.{ts,tsx}` and run in jsdom environment.

## Environment

Create `.env.local` with:
```
VITE_GEMINI_API_KEY=your_key_here
```
This is required for the AI section (`SeccionIA`) to function.

## Architecture

Single-page React 18 portfolio app built with Vite + TypeScript.

**Entry point flow:**
`src/Principal.tsx` → `src/Aplicacion.tsx` (providers) → `src/Páginas/Index.tsx` (main layout)

`Aplicacion.tsx` wraps the app with React Query (`QueryClient`), React Router, and toast providers.

**Directory naming is in Spanish:**
- `src/Componentes/` — React components
- `src/Ganchos/` — Custom hooks
- `src/Páginas/` — Page-level components
- `src/Lib/` — Utilities and API clients
- `src/assets/` — Images (note: Vite alias `@/assets` points to `src/Activos`, but actual folder is `src/assets`)

**Routing:** Two routes only — `/` (Index) and `*` (NotFound). In-page navigation uses anchor links (`#about`, `#projects`, `#ia`, etc.).

**State management:** No global store. Local `useState` for UI state, React Query for async/server state. `useAgent()` hook manages the Gemini AI request lifecycle (idle → loading → success/error).

## Animation System

Two animation libraries are used together:

- **GSAP** (`src/Lib/gsap.ts`) — primary engine for scroll-triggered reveals, stagger effects, magnetic hover, text animations. ScrollTrigger and TextPlugin are registered once in `gsap.ts`. Always import GSAP from `src/Lib/gsap.ts` (not directly from the package) to ensure plugins are registered.
- **Framer Motion** — declarative motion for simpler animations (`motion.div`, `useScroll`).

Custom hooks `useGsapReveal` and `useGsapStagger` in `src/Ganchos/` handle scroll-triggered animations with GSAP context cleanup on unmount.

## Styling

Tailwind CSS with shadcn/ui components (Radix UI primitives + Tailwind). Dark mode toggles via `.dark` class on root. All colors use CSS custom properties with HSL values (defined in `src/Indice.css`). Use the `cn()` utility from `src/Lib/Utils.ts` for conditional class merging.

45+ pre-built shadcn/ui components live in `src/Componentes/ui/`.

## AI Integration

`src/Lib/api/gemini.ts` — Gemini 2.0 Flash client. Portfolio context (profile, tech stack, projects) is hardcoded here and injected into every request. `useAgent()` hook in `src/Ganchos/useAgent.ts` provides the state interface for components.
