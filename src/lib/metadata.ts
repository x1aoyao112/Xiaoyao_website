import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { safeExternalUrl } from "@/lib/content";

export function siteOrigin() {
  const configured = safeExternalUrl(siteConfig.url);
  const platform = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  const value =
    configured ??
    (platform ? safeExternalUrl(`https://${platform}`) : undefined);
  return value ? new URL(value).origin : undefined;
}
export function pageMetadata(
  title: string,
  description: string,
  pathname: string,
  article?: { date: string; tags: readonly string[] },
): Metadata {
  const origin = siteOrigin();
  return {
    title,
    description,
    ...(origin ? { alternates: { canonical: `${origin}${pathname}` } } : {}),
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      siteName: siteConfig.name,
      locale: "en_US",
      ...(origin ? { url: `${origin}${pathname}` } : {}),
      ...(article
        ? {
            type: "article",
            publishedTime: article.date,
            tags: [...article.tags],
          }
        : { type: "website" }),
    },
  };
}
