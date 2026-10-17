# Zodiak + Switzer

Original fonts by Indian Type Foundry, obtained directly from Fontshare:

- [Zodiak](https://www.fontshare.com/fonts/zodiak) — editorial headlines, normal variable weight 100–900.
- [Switzer](https://www.fontshare.com/fonts/switzer) — body and UI, normal weights 400, 500, 600.

The original files are extracted without modification from the official family ZIP archives downloaded directly from the Fontshare API. `scripts/fonts.json` pins each archive URL, exact member path, and original WOFF2 SHA-256 digest. Font data is not subsetted, converted, renamed internally, or otherwise modified. The original supplied license is preserved in `FFL.txt` (ITF Free Font License v2.0, 17 August 2026).

The license expressly permits self-hosting for the licensee’s own website, but prohibits redistributing font software through repositories or supplying it for third-party use. Therefore **do not commit font binaries**. Each build environment obtains its own original copies directly from Fontshare with `npm run fonts:prepare`. This project is the owner’s personal website, not a font distribution or selectable-font service. Other users must obtain and comply with their own Fontshare license.

The dependency-free Node preparation script validates both cached and freshly downloaded WOFF2 files, writes verified downloads atomically, and fails on network errors or integrity mismatches. Do not disable TLS/checksum verification or replace expected hashes to suppress failures. `npm run dev`, `npm run typecheck`, and `npm run build` prepare the fonts automatically. Keep `api.fontshare.com` accessible during the first build; verified files are cached in this ignored directory.

`src/app/fonts.ts` registers local fonts with preload, `font-display: block`, and metric-adjusted system fallbacks. Hero line breaks, description space, and symbol/button dimensions stay stable while fonts arrive; the brief native font block avoids flashing the wrong typography. Both are served from the website’s own static assets, including on Vercel. The adjusted fallback exists only while the real font loads; it is not a replacement design family. Public headings use a consistent, nonitalic treatment.

On a Node.js 24 cloud machine that routes HTTPS through an environment proxy, use `NODE_USE_ENV_PROXY=1 npm run fonts:prepare` for the first download. Vercel uses its normal outbound HTTPS access. No proxy settings or credentials are committed.
