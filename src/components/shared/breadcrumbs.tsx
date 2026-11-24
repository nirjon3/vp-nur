import type { Locale } from "@/i18n/config";

export interface Crumb {
  label: string;
  /** Path relative to locale root; omit for current page */
  href?: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function Breadcrumbs(_props?: { locale?: Locale; items?: Crumb[] }) {
  // Breadcrumbs removed per user request across all pages
  return null;
}
