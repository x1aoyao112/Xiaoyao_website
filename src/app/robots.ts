import type { MetadataRoute } from "next";
import { siteOrigin } from "@/lib/metadata";

export default function robots(): MetadataRoute.Robots {
  const origin = siteOrigin();
  return {
    rules:
      process.env.VERCEL_ENV === "preview"
        ? { userAgent: "*", disallow: "/" }
        : {
            userAgent: "*",
            allow: "/",
            disallow: ["/workspace", "/design-system"],
          },
    ...(origin ? { sitemap: `${origin}/sitemap.xml` } : {}),
  };
}
