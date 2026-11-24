"use client";

import * as React from "react";
import Link from "next/link";
import {
  Search,
  Mic,
  HelpCircle,
  FileText,
  Users,
  ShieldCheck,
  Calendar,
  ArrowRight,
} from "lucide-react";
import type { Locale } from "@/i18n/config";
import { localePath } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { formatDateShort } from "@/lib/format";
import type { ParliamentActivity, ParliamentCategory } from "@/types/content";

const PAGE_SIZE = 6;

const categoryInfo: Record<
  ParliamentCategory,
  {
    label: { bn: string; en: string };
    icon: typeof Mic;
    color: string;
    badgeClass: string;
  }
> = {
  speech: {
    label: { bn: "বক্তব্য ও ভাষণ", en: "Speech & Debate" },
    icon: Mic,
    color: "text-emerald-700 bg-emerald-50 border-emerald-200",
    badgeClass: "bg-emerald-50 text-emerald-800 border-emerald-300",
  },
  question: {
    label: { bn: "সংসদীয় প্রশ্নোত্তর", en: "Parliamentary Q&A" },
    icon: HelpCircle,
    color: "text-blue-700 bg-blue-50 border-blue-200",
    badgeClass: "bg-blue-50 text-blue-800 border-blue-300",
  },
  bill: {
    label: { bn: "বিল ও প্রস্তাবনা", en: "Bills & Motions" },
    icon: FileText,
    color: "text-amber-700 bg-amber-50 border-amber-200",
    badgeClass: "bg-amber-50 text-amber-800 border-amber-300",
  },
  committee: {
    label: { bn: "স্থায়ী কমিটি বৈঠক", en: "Standing Committee" },
    icon: Users,
    color: "text-purple-700 bg-purple-50 border-purple-200",
    badgeClass: "bg-purple-50 text-purple-800 border-purple-300",
  },
  responsibility: {
    label: { bn: "দাপ্তরিক প্রতিবেদন", en: "Official Report" },
    icon: ShieldCheck,
    color: "text-teal-700 bg-teal-50 border-teal-200",
    badgeClass: "bg-teal-50 text-teal-800 border-teal-300",
  },
};

export function ParliamentBrowser({
  items,
  locale,
}: {
  items: ParliamentActivity[];
  locale: Locale;
}) {
  const dict = getDictionary(locale);
  const bn = locale === "bn";
  const [query, setQuery] = React.useState("");
  const [category, setCategory] = React.useState<ParliamentCategory | "all">("all");
  const [page, setPage] = React.useState(1);

  // Dynamic counts for each category
  const counts = React.useMemo(() => {
    const c: Record<string, number> = { all: items.length };
    items.forEach((item) => {
      c[item.category] = (c[item.category] || 0) + 1;
    });
    return c;
  }, [items]);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return items
      .filter((i) => (category === "all" ? true : i.category === category))
      .filter((i) => {
        if (!q) return true;
        const haystack = [
          i.title.bn,
          i.title.en,
          i.excerpt.bn,
          i.excerpt.en,
          ...i.body.flatMap((p) => [p.bn, p.en]),
        ]
          .join(" ")
          .toLowerCase();
        return haystack.includes(q);
      })
      .sort((a, b) => b.date.localeCompare(a.date));
  }, [items, query, category]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, totalPages);
  const pageItems = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  // Reset to page 1 whenever the filter changes
  const [prevFilter, setPrevFilter] = React.useState(`${query}|${category}`);
  const filterKey = `${query}|${category}`;
  if (prevFilter !== filterKey) {
    setPrevFilter(filterKey);
    setPage(1);
  }

  const categories: (ParliamentCategory | "all")[] = [
    "all",
    "speech",
    "bill",
    "question",
    "committee",
    "responsibility",
  ];

  return (
    <div>
      {/* Search and Category Filter Controls */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <label className="relative block w-full max-w-md">
          <span className="sr-only">{dict.common.search}</span>
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              bn
                ? "আইন, বক্তব্য, প্রশ্ন বা কার্যবিবরণী খুঁজুন…"
                : "Search speeches, bills, questions or records…"
            }
            className="h-11 w-full rounded-[2px] border border-line-strong bg-white pl-10 pr-4 text-[14.5px] text-charcoal placeholder:text-muted focus:border-forest focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-forest shadow-2xs"
          />
        </label>

        {/* Filter Pills with Counts */}
        <div
          className="flex flex-wrap items-center gap-2"
          role="group"
          aria-label={bn ? "ধরন অনুযায়ী ফিল্টার" : "Filter by type"}
        >
          {categories.map((c) => {
            const isSelected = category === c;
            const count = counts[c] || 0;
            const label =
              c === "all" ? (bn ? "সব কার্যক্রম" : "All Records") : categoryInfo[c].label[locale];
            const Icon = c !== "all" ? categoryInfo[c].icon : null;

            return (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                aria-pressed={isSelected}
                className={`inline-flex items-center gap-1.5 rounded-[2px] border px-2.5 py-1 sm:px-3.5 sm:py-1.5 text-[11px] sm:text-[12px] font-semibold transition-all shadow-2xs ${
                  isSelected
                    ? "border-forest bg-forest text-gold"
                    : "border-line-strong bg-white text-body hover:border-forest hover:text-forest"
                }`}
              >
                {Icon ? <Icon className="h-3.5 w-3.5" /> : null}
                <span>{label}</span>
                <span
                  className={`ml-0.5 rounded-full px-1.5 py-0.2 text-[10.5px] font-bold ${
                    isSelected ? "bg-forest-deep text-gold" : "bg-line text-muted"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Filtered Result Counter */}
      <div className="mt-6 flex items-center justify-between border-b border-line pb-3 text-[12.5px] text-muted">
        <p>
          {bn
            ? `মোট ${filtered.length}টি সংসদীয় কার্যক্রম পাওয়া গেছে`
            : `Found ${filtered.length} parliamentary records`}
        </p>
      </div>

      {/* Modern Institutional Card Grid */}
      {pageItems.length === 0 ? (
        <div className="mt-12 rounded-[2px] border border-dashed border-line-strong bg-offwhite p-12 text-center text-muted">
          <p className="text-[15px] font-semibold text-charcoal">
            {dict.common.noResults}
          </p>
          <p className="mt-1 text-[13px]">
            {bn
              ? "অনুসন্ধান শব্দ পরিবর্তন করে আবার চেষ্টা করুন।"
              : "Try adjusting your search query or filters."}
          </p>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-5 sm:gap-6">
          {pageItems.map((item) => {
            const info = categoryInfo[item.category];
            const Icon = info.icon;

            return (
              <article
                key={item.slug}
                className="group relative overflow-hidden rounded-xl border border-line bg-white p-4.5 sm:p-6 sm:p-7 shadow-2xs transition-all duration-200 hover:-translate-y-0.5 hover:border-forest/40 hover:shadow-md"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-start gap-4">
                    {/* Left Category Icon Avatar */}
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-[4px] border ${info.color} shadow-2xs`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>

                    <div>
                      {/* Meta bar: Category Badge + Session Tag + Date */}
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-[2px] border px-2.5 py-0.5 text-[11.5px] font-semibold ${info.badgeClass}`}
                        >
                          {info.label[locale]}
                        </span>
                        {item.session && (
                          <>
                            <span className="text-muted/40">•</span>
                            <span className="text-[12px] font-semibold text-forest">
                              {item.session[locale]}
                            </span>
                          </>
                        )}
                        <span className="text-muted/40">•</span>
                        <time
                          dateTime={item.date}
                          className="flex items-center gap-1 text-[12px] font-medium text-muted"
                        >
                          <Calendar className="h-3.5 w-3.5 text-muted/70" />
                          {formatDateShort(item.date, locale)}
                        </time>
                      </div>

                      {/* Title */}
                      <h2 className="bn-heading mt-3 text-[18px] font-bold leading-snug text-forest transition-colors group-hover:text-forest-deep sm:text-[20px]">
                        <Link
                          href={localePath(locale, `/parliament/${item.slug}`)}
                          className="focus:outline-none"
                        >
                          {item.title[locale]}
                        </Link>
                      </h2>

                      {/* Excerpt */}
                      <p className="bn mt-2 text-[14.5px] leading-relaxed text-body">
                        {item.excerpt[locale]}
                      </p>
                    </div>
                  </div>

                  {/* Right Action Link */}
                  <div className="sm:self-center shrink-0">
                    <Link
                      href={localePath(locale, `/parliament/${item.slug}`)}
                      className="inline-flex items-center gap-1.5 rounded-[2px] border border-forest/20 bg-forest/5 px-3.5 py-2 text-[12.5px] font-bold text-forest transition-all group-hover:border-forest group-hover:bg-forest group-hover:text-white"
                    >
                      <span>{bn ? "কার্যবিবরণী দেখুন" : "View Record"}</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 ? (
        <nav
          aria-label="Pagination"
          className="mt-8 flex items-center justify-between border-t border-line pt-6"
        >
          <p className="text-[12.5px] text-muted">
            {dict.common.page} {current} {dict.common.of} {totalPages}
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              disabled={current === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="h-10 rounded-[2px] border border-line-strong px-4 text-[13px] font-semibold text-body transition-colors hover:border-forest hover:text-forest disabled:opacity-40"
            >
              {dict.common.previous}
            </button>
            <button
              type="button"
              disabled={current === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="h-10 rounded-[2px] border border-line-strong px-4 text-[13px] font-semibold text-body transition-colors hover:border-forest hover:text-forest disabled:opacity-40"
            >
              {dict.common.next}
            </button>
          </div>
        </nav>
      ) : null}
    </div>
  );
}
