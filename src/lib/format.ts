import type { Locale } from "@/i18n/config";

const localeMap: Record<Locale, string> = {
  bn: "bn-BD",
  en: "en-GB",
};

export function formatDate(iso: string | Date, locale: Locale): string {
  const d = typeof iso === "string" ? new Date(iso) : iso;
  if (Number.isNaN(d.getTime())) return "—";
  return new Intl.DateTimeFormat(localeMap[locale], {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);
}

export function formatDateShort(iso: string | Date, locale: Locale): string {
  const d = typeof iso === "string" ? new Date(iso) : iso;
  if (Number.isNaN(d.getTime())) return "—";
  return new Intl.DateTimeFormat(localeMap[locale], {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(d);
}

/** Bengali long-form digits for stats that must localise (e.g. ১, ২, ৩). */
export function formatNumber(n: number, locale: Locale): string {
  return new Intl.NumberFormat(localeMap[locale]).format(n);
}
