import type { MetadataRoute } from "next";
import { siteOrigin } from "@/lib/metadata";
import { publicProjects, publicJournal } from "@/content/public";
import { publicContentPaths } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = siteOrigin();
  return origin
    ? publicContentPaths(publicProjects, publicJournal).map((path) => ({
        url: `${origin}${path}`,
      }))
    : [];
}
