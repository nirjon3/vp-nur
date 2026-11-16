"use client";

import * as React from "react";
import { Search, FileText, Download, ExternalLink } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { formatDateShort } from "@/lib/format";
import { VerificationBadge } from "@/components/shared/verification";
import type { Publication } from "@/types/content";

export function PublicationsBrowser({ items, locale }: { items: Publication[]; locale: Locale }) {
  const dict = getDictionary(locale);
  const bn = locale === "bn";
  const [query, setQuery] = React.useState("");
  const [category, setCategory] = React.useState<string>("all");

  const categories = React.useMemo(
    () => ["all", ...Array.from(new Set(items.map((p) => p.category[locale])))],
    [items, locale],
  );

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return items
      .filter((p) => (category === "all" ? true : p.category[locale] === category))
      .filter((p) => {
        if (!q) return true;
        return [p.title.bn, p.title.en, p.description.bn, p.description.en]
          .join(" ")
          .toLowerCase()
          .includes(q);
      })
      .sort((a, b) => b.date.localeCompare(a.date));
  }, [items, query, category, locale]);

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
            placeholder={bn ? "প্রকাশনা খুঁজুন…" : "Search publications…"}
            className="h-11 w-full rounded-[2px] border border-line-strong bg-white pl-10 pr-4 text-[15px] focus:border-forest focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-forest"
          />
        </label>
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label={bn ? "বিভাগ ফিল্টার" : "Filter by category"}>
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              aria-pressed={category === c}
              className={`h-9 rounded-[2px] border px-3 text-[12px] font-semibold transition-colors ${
                category === c
                  ? "border-forest bg-forest text-white"
                  : "border-line-strong bg-white text-body hover:border-forest hover:text-forest"
              }`}
            >
              {c === "all" ? (bn ? "সব" : "All") : c}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-12 rounded-[2px] border border-dashed border-line-strong bg-offwhite p-10 text-center text-muted">
          {dict.common.noResults}
        </p>
      ) : (
        <ul className="mt-8 divide-y divide-line border-y border-line">
          {filtered.map((p) => (
            <li key={p.id} className="grid grid-cols-[auto_1fr] gap-4 py-6 sm:grid-cols-[auto_1fr_auto] sm:items-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-[2px] bg-forest/5 text-forest">
                <FileText aria-hidden="true" className="h-5 w-5" />
              </span>
              <div>
                <p className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-gold-deep">
                  {p.category[locale]} · <time dateTime={p.date}>{formatDateShort(p.date, locale)}</time>
                </p>
                <h2 className="bn-heading mt-0.5 text-[16px] leading-snug text-charcoal">{p.title[locale]}</h2>
                <p className="bn mt-1 line-clamp-2 text-[13px] leading-6 text-body">{p.description[locale]}</p>
                <div className="mt-2">
                  <VerificationBadge status={p.verification} locale={locale} />
                </div>
              </div>
              <div className="col-span-2 sm:col-span-1">
                {p.fileUrl ? (
                  <a
                    href={p.fileUrl}
                    download
                    className="inline-flex h-11 items-center gap-2 rounded-[2px] border border-forest bg-forest px-4 text-[13px] font-semibold text-white hover:bg-forest-deep"
                  >
                    <Download aria-hidden="true" className="h-4 w-4" />
                    PDF
                  </a>
                ) : (
                  <span className="inline-flex h-11 items-center gap-2 rounded-[2px] border border-line-strong px-4 text-[12.5px] font-semibold text-muted">
                    <ExternalLink aria-hidden="true" className="h-4 w-4" />
                    {bn ? "নথি যুক্ত করা হবে" : "Document to be attached"}
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
