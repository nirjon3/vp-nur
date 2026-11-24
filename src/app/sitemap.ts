import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { initiatives } from "@/content/initiatives";
import { parliamentActivities } from "@/content/parliament";

export default function sitemap(): MetadataRoute.Sitemap {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "https://nurulhaquenur.com.bd";

  const staticPaths = [
    "",
    "/about",
    "/parliament",
    "/events",
    "/initiatives",
    "/media",
    "/speeches",
    "/services",
    "/services/track",
    "/contact",
    "/privacy",
    "/terms",
  ];

  const dynamicPaths = [
    ...initiatives.map((i) => `/initiatives/${i.slug}`),
    ...parliamentActivities.map((p) => `/parliament/${p.slug}`),
  ];

  const all = [...staticPaths, ...dynamicPaths];

  return locales.flatMap((locale) =>
    all.map((path) => ({
      url: `${base}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: path === "" ? ("weekly" as const) : ("monthly" as const),
      priority: path === "" ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries([
          ...locales.map((l) => [l, `${base}/${l}${path}`]),
          ["x-default", `${base}/bn${path}`],
        ]),
      },
    })),
  );
}
