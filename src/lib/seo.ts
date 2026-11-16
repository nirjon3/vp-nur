import type { Metadata } from "next";
import { defaultLocale, type Locale } from "@/i18n/config";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://nurulhaquenur.com.bd";

export function siteUrl(path = "/"): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export interface PageMetaInput {
  title: string;
  description: string;
  locale: Locale;
  path: string;
  /** Set false for private/utility pages */
  index?: boolean;
}

export function pageMetadata({
  title,
  description,
  locale,
  path,
  index = true,
}: PageMetaInput): Metadata {
  const localizedPath = path === "/" ? `/${locale}` : `/${locale}${path}`;
  const alternate = Object.fromEntries(
    (["bn", "en"] as const).map((l) => [
      l === "bn" ? "bn-BD" : "en",
      siteUrl(path === "/" ? `/${l}` : `/${l}${path}`),
    ]),
  );

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: {
      canonical: siteUrl(localizedPath),
      languages: { ...alternate, "x-default": siteUrl(`/${defaultLocale}${path === "/" ? "" : path}`) },
    },
    openGraph: {
      type: "website",
      siteName: locale === "bn" ? "নুরুল হক নুর" : "Nurul Haque Nur",
      title,
      description,
      url: siteUrl(localizedPath),
      locale: locale === "bn" ? "bn_BD" : "en_GB",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: index ? { index: true, follow: true } : { index: false, follow: false },
  };
}
