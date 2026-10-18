# XY's Side Notes

Xiaoyao's public portfolio and personal archive, built on the existing Next.js App Router, TypeScript, Tailwind, Zodiak/Switzer design system. **THE XIAOYAO SYSTEM** remains the internal codename for a future private OS; it is not the public brand. Sprint 3 adds public portfolio pages without a CMS, database, contact backend, or authentication.

## Run locally

Use Node.js 24 (pinned in `.nvmrc`) and npm:

```bash
git clone https://github.com/x1aoyao112/Xiaoyao_website.git
cd Xiaoyao_website
nvm install
nvm use
npm ci
npm run dev
```

If not using nvm, install Node.js 24 and omit the two nvm commands. The server uses port 3000. No secrets or environment variables are required. Never commit real `.env` files or credentials; `.env.example` is a credential-free template.

For production, including Vercel:

```bash
npm run build
npm run start
```

Set Vercel's Build Command to **`npm run build`** so preparation hooks run. First-time builders need HTTPS access to `api.fontshare.com`. Fontshare's license permits this site's self-hosting but prohibits public font repository redistribution: original binaries are downloaded from official archives, checksum-verified, and ignored by Git. Browsers receive preloaded local font assets. See [font provenance and license notes](src/app/fonts/README.md).

Before development, type checking, and builds, hooks also inventory real files in `public/`. Missing assets and invalid PDF/image headers do not produce public media or download links. After adding a file while the dev server is running, run `npm run assets:prepare`; restarting development also refreshes the inventory. No repository-wide runtime filesystem tracing is needed.

## Public routes

| Route             | Purpose                                                                               |
| ----------------- | ------------------------------------------------------------------------------------- |
| `/`               | Approved hero, short introduction, real featured work, optional journal/current notes |
| `/about`          | Editable biography, education, optional skills and personal content                   |
| `/work`           | Published projects and populated category filters                                     |
| `/work/[slug]`    | Reusable case studies; drafts and unknown slugs return 404                            |
| `/journey`        | Education and future verified experience in chronological order                       |
| `/journal`        | Published articles with populated category filters                                    |
| `/journal/[slug]` | Long-form articles; drafts and unknown slugs return 404                               |
| `/contact`        | Configured contact methods; no contact form backend                                   |
| `/recruiter`      | Restrained professional profile with optional resume and verified work                |
| `/design-system`  | Existing illustrative component gallery, excluded from indexing/sitemap               |

`/workspace` remains unconditionally unavailable (404). Route groups do not provide authentication. Do not add private data or bypass the guards; authentication, owner authorization, Supabase, and row-level security belong to a later phase.

## Edit content without changing page layouts

All portfolio data is local TypeScript under `src/content/`. Empty fields deliberately produce hidden sections or restrained empty states. No sample achievements or projects are published.

| File              | What to edit                                                                                                                             |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `profile.ts`      | Name, introduction, draft About paragraphs, education, interests, optional real portrait/beyond-academics sections, resume configuration |
| `about-photos.ts` | Little Moments photographs and display order                                                                                             |
| `social-links.ts` | Email, LinkedIn, GitHub, optional additional HTTPS social links                                                                          |
| `projects.ts`     | Original projects and case studies, publication/feature/recruiter flags                                                                  |
| `journal.ts`      | Original articles, categories, tags, publication dates and sections                                                                      |
| `experience.ts`   | Verified work, leadership, education or milestones; the initial NTU entry is derived from `profile.ts`                                   |
| `skills.ts`       | Confirmed grouped skills only; no inferred proficiency levels                                                                            |
| `currently.ts`    | Genuine current reading, study, exploration or building notes                                                                            |

Structured types live in `src/types/content.ts`. Public selectors live in `src/content/public.ts`; listing/detail/SEO consumers use the same publication gates. Keep each slug unique across both drafts and published entries. Incomplete/invalid or conflicting entries are excluded rather than producing misleading public pages. Content paragraphs are plain text, escaped by React; no HTML or Markdown execution is supported.

### Update profile, education and photos

Edit `profile.ts`. The confirmed education is NTU, **Bachelor of Business**, **2026–2030 (Expected)**. Education blocks, the timeline and recruiter graduation year derive from that record. If facts change, also update any prose in the introduction and About paragraphs. Add only confirmed information. Leave unknown interests, skills, activities, photos and stories empty.

Store genuine images in `public/images/` using simple filenames (letters, digits, hyphens, underscores; PNG, JPEG, WebP or AVIF). Set a content image's `src` to `/images/your-file.jpg` with accurate `width`, `height` and descriptive `alt`; `caption` is optional. Images are optimized with Next.js Image. Missing images, unsupported formats, invalid dimensions or blank alt text stay hidden. Remote images and stock substitutes are not used. Files placed in `public/` are public; never put confidential material there.

### Portrait and Little Moments

1. Add your own photograph to `public/images/`, for example `portrait.jpg`. Use simple filenames, and note its original pixel dimensions.
2. In `src/content/profile.ts`, replace `portrait: undefined` with your image record:

   ```ts
   portrait: {
     src: "/images/portrait.jpg",
     alt: "Your accurate description of the photograph",
     width: 1200,
     height: 1600,
     caption: "", // Optional; write your own caption.
   },
   ```

3. For the gallery, edit `moments` in `src/content/about-photos.ts`. Each entry uses the same image fields plus a numeric `order`:

   ```ts
   export const moments: readonly PersonalPhoto[] = [
     {
       src: "/images/my-photo.jpg",
       alt: "Your accurate description",
       width: 1600,
       height: 1067,
       caption: "", // Optional.
       order: 10,
     },
   ];
   ```

4. Add/remove array entries to add/remove photos. Change `caption` to edit captions; lower `order` values display first (ties preserve array order). Use each source once. Portrait and landscape photos retain their original aspect ratios without cropping or stretching; the gallery alternates vertical spacing on desktop and stacks on mobile.
5. Run `npm run assets:prepare` after adding/changing files during development. Verify locally with `npm run dev`. Run `npm run build`, commit your content and genuine photos on a feature branch, then deploy through your normal PR/Vercel workflow. Build preparation refreshes the asset inventory automatically.

No portrait produces a text-first introduction; no valid gallery entries hides **Little moments.** entirely. A missing file, blank alt text, invalid dimensions or invalid gallery order never creates a public empty frame. No stock or test photographs are bundled on the site. Keep an interest's `description` empty until you have your own explanation; its confirmed topic can still appear without filler. Remove its whole entry to hide the topic.

### Homepage previews

The homepage shows Selected Work only when published **featured** projects exist, Journal only when published entries exist, and Currently only when genuine activities are configured. Empty previews omit their headings, links and spacing. Full Work and Journal routes remain available with minimal empty states.

### Update LinkedIn, GitHub and email

Edit `social-links.ts`:

- `email`: your actual email address, without `mailto:`.
- `linkedin`: your full HTTPS LinkedIn profile URL.
- `github`: your full HTTPS GitHub profile URL.
- `otherSocialLinks`: optional `{ label, url }` entries with genuine HTTPS destinations.

Leave unsupplied values as `""`. Invalid values, mismatched platforms and placeholder domains are hidden. Email addresses are safely encoded; external links open with `noopener noreferrer` and an accessible new-tab label. Rebuild and deploy to publish edits. Network availability/account ownership is not verified by syntactic URL validation.

### Add a resume PDF

1. Put your real resume at `public/resume.pdf` (or a simple nested local PDF path).
2. In `profile.ts`, set `resume.url` to `/resume.pdf` and keep or edit `resume.label`.
3. Rebuild and deploy. Recruiter Mode displays the download only if the local file exists and has a PDF header.

An empty URL, missing file, non-PDF file, or remote URL hides the download. Remote PDFs are intentionally unsupported so unverified external downloads cannot appear. No fake resume is bundled.

### Publish a project

Add an object to `projects.ts` using the `PortfolioProject` type. Required fields: `slug`, `title`, `category`, `summary`, `tools`, `published`. Use lowercase hyphenated slugs; keep them unique. Supported categories can include Finance, Accounting, Data & Python, Business & Marketing, and Personal Projects; only populated published categories become filters.

Optional case-study fields are paragraph arrays: `overview`, `objective`, `myRole`, `approach`, `results`, `learned`. Describe **your individual contribution** under `myRole`; distinguish group results in the outcome text. Do not invent metrics or achievements. Optional `coverImage`, `artifacts` and `{ label, url }` links are validated; empty detail sections are omitted.

Start with `published: false`. When the real content is ready, set `published: true`; use `featured: true` for homepage selection (up to three), and `recruiterRelevant: true` for Recruiter Mode selection (up to three). Rebuild/deploy. Drafts never enter public listings, detail metadata or sitemap paths; direct draft URLs return 404. The repository is public, so a draft flag is **not** confidentiality protection for its source. Never commit private information in drafts.

### Publish a journal entry

Add a `JournalEntry` to `journal.ts` with `slug`, `title`, `category`, `excerpt`, a real `date` in `YYYY-MM-DD`, `tags`, `sections`, and `published`. A section has optional `heading`, `paragraphs: string[]`, and an optional local content image. A `coverImage` is optional. At least one real paragraph is required for publication.

Keep `published: false` until ready. Set it to `true`, rebuild, and deploy. Listings sort newest first, format dates consistently in UTC, and show only categories with published articles. Tags appear on the article. Drafts/invalid dates/duplicate slugs are excluded. No scheduled publication is implied by the date; the flag controls publication.

### Update Currently, skills or experience

Add `{ label, text, link? }` to `currently.ts` for real current activities; the optional link needs a meaningful label and safe HTTPS URL. The section is hidden when empty. Add confirmed `{ title, skills: string[] }` groups in `skills.ts` and verified timeline records in `experience.ts`. `sortYear` sorts newest first; `period` is the human-readable display text. No proficiency level, job title, achievement or hobby is inferred automatically.

## SEO and branding

`src/config/site.ts` owns public branding. Set its `url` to your actual production origin if needed; on Vercel, `VERCEL_PROJECT_PRODUCTION_URL` is used automatically when available. No domain is invented. Without an origin, local sitemap output is empty and absolute canonical URLs are omitted. Page titles, descriptions and Open Graph site names use **XY's Side Notes**. Preview deployments are marked noindex. `robots.txt` excludes the private workspace and component gallery; access protection still comes from the server-side 404 guards.

## Reusable presentation

`src/components/portfolio/` contains PageIntro, ProjectCard, ArticleCard, CategoryFilter, PortfolioImage, ContentSections, EducationBlock, SkillsList, Timeline, SocialLinks, ResumeLink and TextLink. They reuse existing buttons, surface tokens and typography. Public navigation and active-route rules are centralized in `src/config/navigation.ts`. Font families and palette remain unchanged. See [the design system guide](docs/design-system.md).

## Verification

```bash
npm run format:check
npm run check
npm run test:content
npm run build
```

For real browser checks:

```bash
npx playwright install chromium
npm run test:ui
```

In this cloud environment, system Chromium is available:

```bash
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm run test:ui
```

Browser tests start a separate production build/server on port 3100. They cover navigation, branding, metadata, empty states, unconfigured links/resume, responsive overflow at 320/375/430/tablet/desktop, themes, accessibility, keyboard controls, original homepage copy/fonts and font-loading stability. Native content tests use clearly synthetic test-only fixtures for publication gates, filters, social URL validation, asset checks and sitemap exclusion. Application content files never import the fixtures.

To exercise published detail pages and positive contact/resume configuration without adding fictitious portfolio content, run:

```bash
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm run test:fixtures
```

This creates a disposable copy under the OS temporary directory, reuses installed dependency files, adds synthetic test-only records, builds it, and checks project/category navigation, article rendering, safe external links, an optional image, resume download, sitemap publication gates and direct draft 404s on port 3120. It then removes the copy. Allow roughly 1 GB of temporary disk space; real application content files remain unchanged. Omit the Chromium environment variable when using Playwright's installed browser.

With a production server running, `npm run test:smoke` checks the homepage, component gallery and private-route 404s; set `SMOKE_BASE_URL` for another port. Use `npm run format` to format edits. Font binaries, generated asset inventory, browser traces and test results are ignored by Git.
