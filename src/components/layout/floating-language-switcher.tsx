"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Languages } from "lucide-react";
import type { Locale } from "@/i18n/config";

/**
 * Floating bottom-right language toggle button (icon only).
 * Directly toggles between Bengali and English for the current URL route.
 */
export function FloatingLanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname() ?? `/${locale}/`;
  const segments = pathname.split("/");
  // segments[0] is "", segments[1] is the current locale (e.g. "bn" or "en")
  const rest = segments.slice(2).join("/");

  const targetLocale = locale === "bn" ? "en" : "bn";
  const targetHref = `/${targetLocale}${rest ? `/${rest}` : ""}`;

  const isBn = locale === "bn";

  return (
    <aside
      aria-label={isBn ? "Switch to English" : "বাংলায় পরিবর্তন করুন"}
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 print:hidden"
    >
      <Link
        href={targetHref}
        hrefLang={targetLocale === "bn" ? "bn-BD" : "en"}
        title={isBn ? "Switch to English" : "বাংলায় পরিবর্তন করুন"}
        aria-label={isBn ? "Switch to English" : "বাংলায় পরিবর্তন করুন"}
        className="group relative flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-forest/20 bg-white/95 text-forest shadow-[0_4px_16px_rgba(0,0,0,0.12)] backdrop-blur-md transition-all duration-300 hover:scale-108 hover:border-forest hover:bg-forest hover:text-gold hover:shadow-[0_6px_22px_rgba(11,23,16,0.22)] active:scale-95"
      >
        <Languages className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" aria-hidden="true" />
      </Link>
    </aside>
  );
}
