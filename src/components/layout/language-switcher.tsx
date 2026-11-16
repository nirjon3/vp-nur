"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, localeNames, type Locale } from "@/i18n/config";
import { Languages } from "lucide-react";

/** Switch between bn/en for the current path. */
export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname() ?? `/${locale}/`;
  const segments = pathname.split("/");
  // segments[0] is "" (leading slash), segments[1] is the locale
  const rest = segments.slice(2).join("/");

  return (
    <div
      className="flex items-center gap-1 rounded-[2px] border border-line-strong p-1 text-[12px] font-semibold"
      role="group"
      aria-label={locale === "bn" ? "ভাষা পরিবর্তন" : "Change language"}
    >
      <Languages aria-hidden="true" className="ml-1 h-4 w-4 text-muted" />
      {locales.map((l) => {
        const href = `/${l}${rest ? `/${rest}` : ""}`;
        const active = l === locale;
        return (
          <Link
            key={l}
            href={href}
            hrefLang={l === "bn" ? "bn-BD" : "en"}
            aria-current={active ? "true" : undefined}
            className={`rounded-[2px] px-2 py-1 transition-colors ${
              active ? "bg-forest text-white" : "text-body hover:text-forest"
            }`}
          >
            {localeNames[l]}
          </Link>
        );
      })}
    </div>
  );
}
