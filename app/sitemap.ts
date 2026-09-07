import type { MetadataRoute } from "next";
import { collections } from "@/lib/content";
import { abs } from "@/lib/site";

/* Required under output: 'export' — emits a static sitemap.xml at build. */
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    { url: abs("/"), lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: abs("/about"), lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: abs("/enquire"), lastModified: now, changeFrequency: "yearly", priority: 0.9 },
    ...collections.map((c) => ({
      url: abs(`/work/${c.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
