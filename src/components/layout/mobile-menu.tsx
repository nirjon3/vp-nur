"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  User,
  Flag,
  Landmark,
  Sparkles,
  CalendarDays,
  Image as ImageIcon,
  Video,
  FileText,
  ChevronRight,
} from "lucide-react";
import type { Dictionary } from "@/i18n/dictionaries";
import { localePath, type Locale } from "@/i18n/config";
import { cn } from "@/lib/cn";

interface NavItem {
  href: string;
  label: string;
}

const navIcons: Record<string, typeof User> = {
  "/about": User,
  "/gop": Flag,
  "/parliament": Landmark,
  "/initiatives": Sparkles,
  "/events": CalendarDays,
  "/media": ImageIcon,
  "/speeches": Video,
};

export function MobileMenu({
  locale,
  primary,
  dict,
}: {
  locale: Locale;
  primary: NavItem[];
  dict: Dictionary;
}) {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  // Close the menu on navigation
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
        className="flex h-11 w-11 items-center justify-center rounded-[4px] border border-line-strong bg-white text-forest shadow-2xs transition-colors hover:bg-forest/5"
      >
        {open ? <X aria-hidden="true" className="h-5 w-5" /> : <Menu aria-hidden="true" className="h-5 w-5" />}
      </button>

      {open ? (
        <div
          id="mobile-panel"
          className="fixed inset-x-0 top-[64px] z-40 h-[calc(100dvh-64px)] overflow-y-auto border-t border-line bg-white/98 backdrop-blur-md"
        >
          <nav aria-label={locale === "bn" ? "মোবাইল মেনু" : "Mobile menu"} className="px-4 pb-12 pt-4">
            {/* Nav Links with Icons */}
            <div className="rounded-xl border border-line bg-[#fbfdfa] p-1.5 shadow-2xs">
              <ul className="divide-y divide-line/60">
                {primary.map((item) => {
                  const target = localePath(locale, item.href);
                  const isActive =
                    pathname === target || pathname.startsWith(`${target}/`);
                  const Icon = navIcons[item.href] || Sparkles;

                  return (
                    <li key={item.href}>
                      <Link
                        href={target}
                        aria-current={isActive ? "page" : undefined}
                        className={cn(
                          "flex items-center justify-between rounded-lg px-3.5 py-3.5 text-[15.5px] font-semibold transition-all",
                          isActive
                            ? "bg-forest font-bold text-gold shadow-xs"
                            : "text-charcoal hover:bg-white hover:text-forest"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={cn(
                              "flex h-8 w-8 items-center justify-center rounded-[4px] transition-colors",
                              isActive
                                ? "bg-forest-deep text-gold"
                                : "bg-forest/5 text-forest"
                            )}
                          >
                            <Icon className="h-4 w-4" />
                          </span>
                          <span>{item.label}</span>
                        </div>

                        {isActive ? (
                          <span className="h-2 w-2 rounded-full bg-gold" />
                        ) : (
                          <ChevronRight className="h-4 w-4 text-muted/50" />
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Prominent Citizen Services Action */}
            <div className="mt-6">
              <Link
                href={localePath(locale, "/services")}
                className="flex items-center justify-center gap-2 rounded-xl bg-forest px-4 py-3.5 text-center text-[15px] font-bold text-white shadow-md transition-colors hover:bg-forest-deep"
              >
                <FileText className="h-4 w-4 text-gold" />
                <span>{dict.servicesCta}</span>
              </Link>
            </div>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
