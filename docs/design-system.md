# Signature design system

The public `/design-system` page is a component gallery with explicitly illustrative data. It has no authentication, persistence, financial integrations, or private workspace content. `/workspace` remains blocked by unconditional server-side 404 guards.

## Tokens and themes

`src/app/globals.css` defines brand primitives and theme-sensitive semantic roles. Use `bg-background`, `bg-surface`, `text-foreground`, `text-muted-foreground`, `border-border`, and `ring-ring` rather than component-specific hex values. Hex values belong only in the central tokens and the palette's explanatory labels.

- Butter `#FFF0B8`, powder `#DCEBFA`, ivory `#FAF9F6`: personal identity and welcoming surfaces.
- Navy `#142D4E`, obsidian `#17191D`: structure and typography.
- Gold `#E9B949`: restrained financial emphasis, dark-theme focus ring.
- Silver `#A5A7A9`: decorative neutral; do not use as small text on ivory.

Light mode uses ivory with navy/obsidian text. Dark mode uses charcoal/navy surfaces and ivory text. Pastel cards retain their brand colors and navy text in both modes. Terminal cards use light text on dark navy. Nested components inherit surface-specific muted text and focus colors. Never pair ivory text with pastel surfaces or silver small text with ivory.

`next-themes` initializes from the system preference, avoids the wrong-theme flash, persists manual toggles locally, and updates across tabs. The toggle has an accessible label and no hydration-dependent icon markup. No remote fonts are required.

## Component map

- `ui/button`: default, outline, ghost, accent; default, small, icon sizes. Always label icon-only controls. Native buttons default to `type="button"`; explicitly set `type="submit"` in forms. Disabled styling is for native buttons; do not use disabled anchors.
- `ui/card`: Card, BentoGrid, DashboardWidget. Shared `default`, `butter`, `powder`, `terminal` surface tones.
- `ui/typography`: Eyebrow and SectionHeading; `.display`, `.section-title`, `.body-copy` share a single typography scale.
- `ui/form-controls`: native Input, Select, Textarea, Checkbox and Field. Pass a matching input ID and Field ID. Connect hints with `aria-describedby="<id>-hint"`. For errors, set `aria-invalid` and include `<id>-error` in `aria-describedby`. Controls accept standard HTML attributes.
- `ui/dialog`: Radix-backed Dialog, Trigger, Content, Title, Description, Close. Always include a title and description. Focus is trapped, Escape closes, and focus returns to the trigger. Do not remove close controls.
- `ui/badge`, `ui/progress`: textual status and accessible determinate progress. Progress clamps to 0–100 and handles nonfinite values.
- `ui/financial`: MetricCard and FinancialTable. Currency formatting uses explicit English locale, amounts align with tabular numerals, table headers/caption preserve semantics, horizontal overflow stays within a keyboard-focusable region.
- `ui/states`: Skeleton, LoadingState with status label, EmptyState with an optional action. Skeletons are presentational; only the status label is announced.
- `layout`: shared responsive header, footer, theme toggle; mobile navigation uses the accessible dialog primitive and closes after selection.
- `design-system/component-sandbox`: isolated, unsaved interactive demonstration. Do not connect this gallery to private data.

## Composition and interaction

Personal/academic/day surfaces use butter and powder prominently. Career uses ivory and navy with selective pastels. Finance uses terminal surfaces and restrained gold. Recruiter/resume uses the neutral foundation. `src/config/design-system.ts` records these reusable section defaults; it does not create routes or access permissions.

Spacing follows Tailwind's 4px scale, cards share a 20px radius, controls use 12px corners, actions use pills. Sans-serif carries interface and body text; Georgia italic adds editorial personality; monospace aligns labels and metrics. Page shells cap width at 1280px with consistent responsive gutters. Layouts progress from one column to two or three; tables scroll within their own region.

Transitions use the shared 180ms duration, visible focus outlines, restrained hover feedback, and no automatic page entrances. All animation/transition durations and smooth scrolling respect `prefers-reduced-motion`. The intentionally small number of CSS transitions does not require a Motion client wrapper; Motion remains available for later interactive features. Keep core content visible without animation.

## Verification

Run `npm run check`, `npm run build`, and `npm run test:smoke` against the running build. Browser checks should cover light/dark themes, persisted theme after reload, mobile menu selection and Escape, dialog focus trap/return, keyboard form controls, reduced motion, and horizontal overflow at 375px. No private route may become available as part of a visual change.
