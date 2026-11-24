"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import type { Dictionary } from "@/i18n/dictionaries";
import { localePath, type Locale } from "@/i18n/config";
import { cn } from "@/lib/cn";
import { LanguageSwitcher } from "./language-switcher";

interface NavItem {
  href: string;
  label: string;
}

export function MobileMenu({
  locale,
  primary,
  secondary,
  dict,
}: {
  locale: Locale;
  primary: NavItem[];
  secondary: NavItem[];
  dict: Dictionary;
}) {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  // Close the menu on navigation — derived-state pattern, no effect needed.
  const [prevPath, setPrevPath] = React.useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setOpen(false);
  }

  React.useEffect(() => {
    if (open) {
      const previous = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = previous;
      };
    }
  }, [open]);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-panel"
        aria-label={open ? dict.nav.menuClose : dict.nav.menuOpen}
        className="flex h-11 w-11 items-center justify-center rounded-[2px] border border-line-strong text-forest"
      >
        {open ? <X aria-hidden="true" className="h-6 w-6" /> : <Menu aria-hidden="true" className="h-6 w-6" />}
      </button>

      {open ? (
        <div
          id="mobile-panel"
          className="fixed inset-x-0 top-[64px] z-40 h-[calc(100dvh-64px)] overflow-y-auto border-t border-line bg-white"
        >
          <nav aria-label={locale === "bn" ? "মোবাইল মেনু" : "Mobile menu"} className="px-4 pb-10 pt-4">
            <ul className="divide-y divide-line border-y border-line">
              {primary.map((item) => {
                const target = localePath(locale, item.href);
                const isActive =
                  pathname === target || pathname.startsWith(`${target}/`);
                return (
                  <li key={item.href}>
                    <Link
                      href={target}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "flex items-center justify-between py-4 text-lg font-semibold transition-colors",
                        isActive
                          ? "border-l-4 border-forest bg-forest/5 pl-3 font-bold text-forest"
                          : "text-charcoal hover:text-forest"
                      )}
                    >
                      <span>{item.label}</span>
                      {isActive && (
                        <span className="h-2 w-2 rounded-full bg-forest" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.18em] text-muted">
              {dict.nav.more}
            </p>
            <ul className="mt-2 grid grid-cols-1 divide-y divide-line border-y border-line sm:grid-cols-2 sm:divide-y-0 sm:gap-px">
              {secondary.map((item) => {
                const target = localePath(locale, item.href);
                const isActive =
                  pathname === target || pathname.startsWith(`${target}/`);
                return (
                  <li key={item.href}>
                    <Link
                      href={target}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "flex items-center justify-between py-3.5 text-[15px] transition-colors",
                        isActive
                          ? "border-l-2 border-forest bg-forest/5 pl-2.5 font-bold text-forest"
                          : "font-medium text-body hover:text-forest"
                      )}
                    >
                      <span>{item.label}</span>
                      {isActive && (
                        <span className="h-1.5 w-1.5 rounded-full bg-forest" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <Link
              href={localePath(locale, "/services")}
              className={cn(
                "mt-6 block rounded-[2px] bg-forest px-4 py-4 text-center text-base font-semibold text-white",
              )}
            >
              {dict.servicesCta}
            </Link>

            <div className="mt-6 flex items-center justify-between border-t border-line pt-5">
              <span className="text-[13px] font-semibold text-charcoal">
                {locale === "bn" ? "ভাষা পরিবর্তন করুন" : "Switch language"}
              </span>
              <LanguageSwitcher locale={locale} />
            </div>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
