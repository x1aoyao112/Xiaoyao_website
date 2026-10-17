# THE XIAOYAO SYSTEM

Sprint 2 design system built on the Sprint 1 foundation for an owner-only personal operating system and professional portfolio. English-only, with Apple-inspired restraint, a young visionary perspective, and financial-terminal precision. The public homepage and `/design-system` component gallery establish the signature visual language. No dashboard features, authentication, or Supabase integration are implemented.

## Requirements

- Node.js 24 LTS (see `.nvmrc`); npm included with Node.
- No accounts, API keys, database, or environment variables are required for Sprint 1.

## Setup and development

```bash
git clone https://github.com/x1aoyao112/Xiaoyao_website.git
cd Xiaoyao_website
nvm install
nvm use
npm ci
npm run dev
```

The development server listens on port 3000. If you do not use nvm, install Node.js 24 directly and omit the two nvm commands.

`.env.example` is a credential-free template for future configuration. There is no need to copy it in this sprint. When future configuration is introduced, use `.env.local` locally and your hosting provider's secure environment settings for production. Never commit real `.env` files, passwords, or API keys.

## Validation and production

```bash
npm run lint
npm run typecheck
npm run build
npm run start
```

With the production server running, in another terminal:

```bash
npm run test:smoke
```

The smoke check verifies the English public holding page and HTTP 404 responses for `/workspace`, nested workspace paths, and query-string variants. For a different port, run `SMOKE_BASE_URL=http://127.0.0.1:3001 npm run test:smoke`. `npm run check` combines lint and type checking. Type checking generates Next.js route types before running TypeScript.

## Structure

```text
src/
  app/
    layout.tsx                 Shared English document and metadata
    globals.css                Tailwind and design tokens
    (public)/                  Public holding page and layout
    (private)/                 Fail-closed future private route group
      workspace/page.tsx       Unconditionally unavailable
  components/ui/button.tsx     shadcn-style reusable Button primitive
  config/                      Typed site and route configuration
  features/                    Future domain modules
  hooks/                       Future shared client hooks
  lib/utils.ts                 Tailwind-aware class merging
  types/                       Shared TypeScript contracts
scripts/smoke.mjs               HTTP readiness and private-route checks
components.json                shadcn/ui generator configuration
```

Stack: Next.js App Router, strict TypeScript, Tailwind CSS v4, shadcn/ui conventions with Radix, Motion, and Lucide. `@/*` resolves to `src/*`. Motion is installed for future interactions. Theme controls, mobile navigation, and the component sandbox use small client boundaries; primary page content remains server-rendered. Use `motion/react` only in client components and respect reduced-motion preferences. The lockfile fixes the dependency graph; use `npm ci` for repeatable installation. Zodiak and Switzer are self-hosted with `next/font/local`. The first development run, type check, or production build downloads the original files directly from Fontshare and verifies pinned SHA-256 checksums; subsequent runs reuse verified local files. Font binaries are intentionally ignored by Git under their license.

## Private access contract

Only the generic homepage and illustrative component gallery are public. `/workspace` always calls server-side `notFound()` in both its page and private layout, including in production. There is no environment flag to unlock it. Route groups are organizational, not security boundaries. No private data, API endpoints, or Supabase clients exist in this sprint.

Before implementing any private functionality, add verified server-side authentication, explicit owner authorization at each data-access entry point, and Supabase row-level security. A layout alone does not protect route handlers, server actions, or data-fetching code. Keep private routes disabled until those checks exist and are tested. The current `noindex` metadata discourages indexing but is not access control.

## Scope and next sprint

Authentication, Supabase integration, portfolio content, and workspace features are deferred. Do not put personal data in the public page or repository. Future CI/deployment should run `npm ci`, `npm run check`, `npm run build`, and smoke checks against the running production build.

## Signature design system (Sprint 2)

See [the design system guide](docs/design-system.md) for semantic color roles, section moods, component APIs, accessibility rules, and responsive behavior. Explore `/design-system` for buttons, pastel bento widgets, financial table/metrics, loading/empty states, and an unsaved form/dialog sandbox. All gallery figures are explicitly illustrative. The header includes a persistent light/dark toggle and responsive mobile navigation. Private route guards are unchanged.

### Browser verification

```bash
npx playwright install chromium
npm run test:ui
```

The suite builds and starts a separate production server on port 3100. It checks both color themes with axe, theme persistence, keyboard controls and dialogs, mobile navigation, responsive overflow, reduced motion, and private-route 404s. In a cloud environment with system Chromium, use `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm run test:ui` instead of downloading a browser. Install browser OS dependencies with your platform package manager if Playwright reports them missing.

Formatting is standardized with Prettier: run `npm run format` to format files or `npm run format:check` to verify formatting. Browser traces and test result files are ignored by Git.

## Public typography

Zodiak (editorial headlines) and Switzer (body, UI, and tabular data) are the only public design families. See [font source and license notes](src/app/fonts/README.md). `npm run fonts:prepare` explicitly prepares them; `predev`, `pretypecheck`, and `prebuild` also run it automatically. There are no new dependencies or API keys.

For Vercel, use **Build Command: `npm run build`** so the font preparation hook runs. Fresh builders need HTTPS access to `api.fontshare.com`. Visitors receive preloaded, cached, same-origin font assets rather than depending on Fontshare at runtime. A download or integrity failure stops setup/build instead of silently changing the typography.
