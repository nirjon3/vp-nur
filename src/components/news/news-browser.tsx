"use client";

import * as React from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { localePath } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { formatDateShort } from "@/lib/format";
import { VerificationBadge } from "@/components/shared/verification";
import { newsCategories } from "@/content/news";
import type { NewsArticle, NewsCategory } from "@/types/content";

const PAGE_SIZE = 6;

export function NewsBrowser({ items, locale }: { items: NewsArticle[]; locale: Locale }) {
  const dict = getDictionary(locale);
  const bn = locale === "bn";
  const [query, setQuery] = React.useState("");
  const [category, setCategory] = React.useState<NewsCategory | "all">("all");
  const [page, setPage] = React.useState(1);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return items
      .filter((a) => (category === "all" ? true : a.category === category))
      .filter((a) => {
        if (!q) return true;
        const haystack = [a.title.bn, a.title.en, a.excerpt.bn, a.excerpt.en, ...a.body.flatMap((p) => [p.bn, p.en])]
          .join(" ")
          .toLowerCase();
        return haystack.includes(q);
      })
      .sort((a, b) => b.date.localeCompare(a.date));
  }, [items, query, category]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, totalPages);
  const pageItems = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  // Reset to page 1 whenever the filter changes — derived-state pattern.
  const [prevFilter, setPrevFilter] = React.useState(`${query}|${category}`);
  const filterKey = `${query}|${category}`;
  if (prevFilter !== filterKey) {
    setPrevFilter(filterKey);
    setPage(1);
  }

  const categories = ["all", "parliament", "constituency", "initiative", "media", "announcement"] as const;

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <label className="relative block w-full max-w-md">
          <span className="sr-only">{dict.common.search}</span>
          <Search aria-hidden="true" className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={bn ? "শিরোনাম বা বিবরণ খুঁজুন…" : "Search headlines or details…"}
            className="h-11 w-full rounded-[2px] border border-line-strong bg-white pl-10 pr-4 text-[15px] focus:border-forest focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-forest"
          />
        </label>
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label={bn ? "বিভাগ ফিল্টার" : "Filter by section"}>
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c as NewsCategory | "all")}
              aria-pressed={category === c}
              className={`h-9 rounded-[2px] border px-3 text-[12px] font-semibold transition-colors ${
                category === c
                  ? "border-forest bg-forest text-white"
                  : "border-line-strong bg-white text-body hover:border-forest hover:text-forest"
              }`}
            >
              {c === "all" ? (bn ? "সব" : "All") : newsCategories[c][locale]}
            </button>
          ))}
        </div>
      </div>

      {pageItems.length === 0 ? (
        <p className="mt-12 rounded-[2px] border border-dashed border-line-strong bg-offwhite p-10 text-center text-muted">
          {dict.common.noResults}
        </p>
      ) : (
        <ul className="mt-8 divide-y divide-line border-y border-line">
          {pageItems.map((a) => (
            <li key={a.slug}>
              <Link
                href={localePath(locale, `/news/${a.slug}`)}
                className="group grid gap-2 py-6 transition-colors hover:bg-offwhite/60 sm:grid-cols-12 sm:gap-6 sm:px-3"
              >
                <div className="sm:col-span-2">
                  <time dateTime={a.date} className="block text-[11px] font-bold uppercase tracking-[0.14em] text-muted">
                    {formatDateShort(a.date, locale)}
                  </time>
                  <p className="mt-2 text-[10.5px] font-bold uppercase tracking-[0.16em] text-gold-deep">
                    {newsCategories[a.category][locale]}
                  </p>
                </div>
                <div className="sm:col-span-8">
                  <h2 className="bn-heading text-lg leading-snug text-charcoal group-hover:text-forest">
                    {a.title[locale]}
                  </h2>
                  <p className="bn mt-1.5 line-clamp-2 text-[14px] leading-6 text-body">{a.excerpt[locale]}</p>
                </div>
                <div className="sm:col-span-2 sm:flex sm:items-start sm:justify-end">
                  <VerificationBadge status={a.verification} locale={locale} />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {totalPages > 1 ? (
        <nav aria-label="Pagination" className="mt-6 flex items-center justify-between">
          <p className="text-[12px] text-muted">
            {dict.common.page} {current} {dict.common.of} {totalPages}
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              disabled={current === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="h-10 rounded-[2px] border border-line-strong px-4 text-[13px] font-semibold text-body hover:border-forest hover:text-forest disabled:opacity-40"
            >
              {dict.common.previous}
            </button>
            <button
              type="button"
              disabled={current === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="h-10 rounded-[2px] border border-line-strong px-4 text-[13px] font-semibold text-body hover:border-forest hover:text-forest disabled:opacity-40"
            >
              {dict.common.next}
            </button>
          </div>
        </nav>
      ) : null}
    </div>
  );
}
