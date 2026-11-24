"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getDictionary } from "@/i18n/dictionaries";
import { localePath, type Locale } from "@/i18n/config";
import { cn } from "@/lib/cn";
import { MobileMenu } from "./mobile-menu";

export function Header({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const pathname = usePathname() || "";

  const primary = [
    { href: "/about", label: dict.nav.about },
    { href: "/parliament", label: dict.nav.parliament },
    { href: "/initiatives", label: dict.nav.initiatives },
    { href: "/events", label: dict.nav.events },
    { href: "/media", label: dict.nav.media },
    { href: "/speeches", label: dict.nav.speeches },
  ];

  const checkActive = (href: string) => {
    const target = localePath(locale, href);
    if (href === "/") {
      return (
        pathname === `/${locale}` ||
        pathname === `/${locale}/` ||
        pathname === ""
      );
    }
    return pathname === target || pathname.startsWith(`${target}/`);
  };

  const isServicesActive = checkActive("/services");

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
          className="flex min-w-0 items-center gap-3 transition-opacity hover:opacity-90"
        >
          <span
            aria-hidden="true"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[2px] bg-forest font-bengali text-[22px] font-semibold leading-none text-white shadow-2xs"
          >
            {locale === "bn" ? "ন" : "N"}
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

        {/* Desktop nav — flat, all 6 items direct, no dropdown */}
        <nav
          aria-label={locale === "bn" ? "প্রধান মেনু" : "Primary menu"}
          className="hidden items-center gap-1 xl:gap-2 lg:flex"
        >
          {primary.map((item) => {
            const isActive = checkActive(item.href);
            return (
              <Link
                key={item.href}
                href={localePath(locale, item.href)}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "relative rounded-[2px] px-3 py-2 text-[13.5px] font-semibold transition-all whitespace-nowrap",
                  isActive
                    ? "bg-forest/10 font-bold text-forest shadow-2xs after:absolute after:bottom-0 after:left-2.5 after:right-2.5 after:h-0.5 after:bg-forest"
                    : "text-charcoal hover:bg-offwhite hover:text-forest"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href={localePath(locale, "/services")}
            aria-current={isServicesActive ? "page" : undefined}
            className={cn(
              "rounded-[2px] border px-4 py-2 text-[13px] font-semibold transition-all",
              isServicesActive
                ? "border-forest-deep bg-forest-deep text-white shadow-sm ring-2 ring-forest/30"
                : "border-forest bg-forest text-white hover:bg-forest-deep"
            )}
          >
            {dict.servicesCta}
          </Link>
        </div>

        <MobileMenu
          locale={locale}
          primary={primary}
          dict={dict}
        />
      </div>
    </header>
  );
}
