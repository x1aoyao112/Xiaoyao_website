# THE XIAOYAO SYSTEM

Sprint 1 foundation for an owner-only personal operating system and professional portfolio. English-only, with Apple-inspired restraint, a young visionary perspective, and financial-terminal precision. This sprint creates the project structure and a public holding page; it does not implement a dashboard, authentication, or Supabase.

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

Stack: Next.js App Router, strict TypeScript, Tailwind CSS v4, shadcn/ui conventions with Radix, Motion, and Lucide. `@/*` resolves to `src/*`. Motion is installed for future interactions; the static holding page intentionally has no animation or client bundle requirement. Use `motion/react` only in client components and respect reduced-motion preferences. The lockfile fixes the dependency graph; use `npm ci` for repeatable installation. System fonts avoid build-time font downloads.

## Private access contract

Only the generic holding page is public. `/workspace` always calls server-side `notFound()` in both its page and private layout, including in production. There is no environment flag to unlock it. Route groups are organizational, not security boundaries. No private data, API endpoints, or Supabase clients exist in this sprint.

Before implementing any private functionality, add verified server-side authentication, explicit owner authorization at each data-access entry point, and Supabase row-level security. A layout alone does not protect route handlers, server actions, or data-fetching code. Keep private routes disabled until those checks exist and are tested. The current `noindex` metadata discourages indexing but is not access control.

## Scope and next sprint

Authentication, Supabase integration, portfolio content, and workspace features are deferred. Do not put personal data in the public page or repository. Future CI/deployment should run `npm ci`, `npm run check`, `npm run build`, and smoke checks against the running production build.
