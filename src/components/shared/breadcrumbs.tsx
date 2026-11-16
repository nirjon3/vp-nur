import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { localePath } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export interface Crumb {
  label: string;
  /** Path relative to locale root; omit for current page */
  href?: string;
}

export function Breadcrumbs({ locale, items }: { locale: Locale; items: Crumb[] }) {
  const dict = getDictionary(locale);
  return (
    <nav aria-label={dict.common.breadcrumbAria} className="border-b border-line bg-offwhite/60">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10">
        <ol className="flex h-11 items-center gap-1.5 overflow-x-auto text-[12px] text-muted">
          <li className="flex shrink-0 items-center gap-1.5">
            <Link href={localePath(locale, "/")} className="hover:text-forest hover:underline">
              {locale === "bn" ? "হোম" : "Home"}
            </Link>
          </li>
          {items.map((item, i) => (
            <li key={i} className="flex shrink-0 items-center gap-1.5">
              <ChevronRight aria-hidden="true" className="h-3.5 w-3.5" />
              {item.href ? (
                <Link href={localePath(locale, item.href)} className="hover:text-forest hover:underline">
                  {item.label}
                </Link>
              ) : (
                <span aria-current="page" className="font-semibold text-body">
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
