import type { SiteConfig } from "@/types";

export const siteConfig = {
  name: "THE XIAOYAO SYSTEM",
  description: "A personal operating system and professional portfolio. Built with intention.",
  locale: "en",
  access: "owner-only",
} as const satisfies SiteConfig;
