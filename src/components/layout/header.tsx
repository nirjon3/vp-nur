import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { getDictionary } from "@/i18n/dictionaries";
import { localePath, type Locale } from "@/i18n/config";
import { LanguageSwitcher } from "./language-switcher";
import { MobileMenu } from "./mobile-menu";

export function Header({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  const primary = [
    { href: "/about", label: dict.nav.about },
    { href: "/parliament", label: dict.nav.parliament },
    { href: "/constituency", label: dict.nav.constituency },
    { href: "/news", label: dict.nav.news },
  ];
  const secondary = [
    { href: "/initiatives", label: dict.nav.initiatives },
    { href: "/speeches", label: dict.nav.speeches },
    { href: "/events", label: dict.nav.events },
    { href: "/media", label: dict.nav.media },
    { href: "/publications", label: dict.nav.publications },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/95 backdrop-blur-sm supports-[backdrop-filter]:bg-white/85">
      <a href="#main-content" className="skip-link">
        {dict.nav.skipToContent}
      </a>
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between gap-3 px-4 sm:px-6 lg:gap-6 lg:px-10">
        {/* Brand */}
        <Link
          href={localePath(locale, "/")}
          aria-label={dict.site.homeAria}
          className="flex min-w-0 items-center gap-3"
        >
          <span
            aria-hidden="true"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[2px] bg-forest font-bengali text-[22px] font-semibold leading-none text-white"
          >
            ন
          </span>
          <span className="min-w-0 leading-tight">
            <span className="bn-heading block truncate text-[15px] text-forest sm:text-base">
              {dict.site.name}
            </span>
            <span className="block text-[10px] font-semibold uppercase tracking-[0.22em] text-gold-deep">
              {dict.site.shortName}
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav
          aria-label={locale === "bn" ? "প্রধান মেনু" : "Primary menu"}
          className="hidden items-center gap-1 lg:flex"
        >
          {primary.map((item) => (
            <Link
              key={item.href}
              href={localePath(locale, item.href)}
              className="rounded-[2px] px-3 py-2 text-[13.5px] font-semibold text-charcoal transition-colors hover:bg-offwhite hover:text-forest"
            >
              {item.label}
            </Link>
          ))}

          {/* Accessible CSS dropdown — hover + focus-within */}
          <div className="group relative">
            <button
              type="button"
              className="flex items-center gap-1 rounded-[2px] px-3 py-2 text-[13.5px] font-semibold text-charcoal transition-colors hover:bg-offwhite hover:text-forest group-focus-within:bg-offwhite"
              aria-haspopup="true"
            >
              {dict.nav.more}
              <ChevronDown
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180"
              />
            </button>
            <div className="invisible absolute right-0 top-full z-50 w-64 translate-y-1 rounded-[2px] border border-line bg-white p-2 opacity-0 shadow-[var(--shadow-lift)] transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
              <ul className="py-1">
                {secondary.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={localePath(locale, item.href)}
                      className="block rounded-[2px] px-3 py-2 text-[13px] font-medium text-body hover:bg-offwhite hover:text-forest"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <LanguageSwitcher locale={locale} />
          <Link
            href={localePath(locale, "/services")}
            className="rounded-[2px] border border-forest bg-forest px-4 py-2 text-[13px] font-semibold text-white transition-colors hover:bg-forest-deep"
          >
            {dict.servicesCta}
          </Link>
        </div>

        <MobileMenu locale={locale} primary={primary} secondary={secondary} dict={dict} />
      </div>
    </header>
  );
}
