import type { SiteConfig } from "@/types";

export const siteConfig = {
  name: "XY's Side Notes",
  description:
    "A personal collection of projects, notes, and things to revisit along the way.",
  locale: "en",
  access: "owner-only", // Future private OS policy; public portfolio routes are public.
  url: "", // Set your real production origin for canonical URLs and sitemap entries.
} as const satisfies SiteConfig;
