"use client";

import * as React from "react";
import {
  Search,
  MapPin,
  Clock,
  Calendar,
  CalendarDays,
  CheckCircle2,
  Tag,
} from "lucide-react";
import type { Locale } from "@/i18n/config";
import { formatDateShort } from "@/lib/format";
import type { PublicEvent } from "@/types/content";

export function EventBrowser({
  items,
  locale,
}: {
  items: PublicEvent[];
  locale: Locale;
}) {
  const bn = locale === "bn";
  const [query, setQuery] = React.useState("");
  const [filter, setFilter] = React.useState<"all" | "upcoming" | "past">("all");

  const counts = React.useMemo(() => {
    return {
      all: items.length,
      upcoming: items.filter((i) => i.status === "upcoming").length,
      past: items.filter((i) => i.status === "past").length,
    };
  }, [items]);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return items
      .filter((i) => (filter === "all" ? true : i.status === filter))
      .filter((i) => {
        if (!q) return true;
        const haystack = [
          i.title.bn,
          i.title.en,
          i.location.bn,
          i.location.en,
          i.description.bn,
          i.description.en,
          i.category?.bn || "",
          i.category?.en || "",
        ]
          .join(" ")
          .toLowerCase();
        return haystack.includes(q);
      })
      .sort((a, b) => {
        // If sorting upcoming, nearest first; if past, latest first
        if (filter === "upcoming") {
          return a.date.localeCompare(b.date);
        }
        return b.date.localeCompare(a.date);
      });
  }, [items, query, filter]);

  const getCalendarParts = (iso: string) => {
    const d = new Date(iso);
    const day = d.toLocaleDateString(bn ? "bn-BD" : "en-GB", { day: "2-digit" });
    const month = d.toLocaleDateString(bn ? "bn-BD" : "en-GB", { month: "short" });
    const year = d.toLocaleDateString(bn ? "bn-BD" : "en-GB", { year: "numeric" });
    return { day, month, year };
  };

  return (
    <div>
      {/* Search and Status Filter Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Search */}
        <label className="relative block w-full max-w-md">
          <span className="sr-only">{bn ? "ইভেন্ট খুঁজুন" : "Search events"}</span>
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
                ? "অনুষ্ঠান, স্থান বা বিষয় অনুসন্ধান করুন…"
                : "Search by title, venue or topic…"
            }
            className="h-11 w-full rounded-[2px] border border-line-strong bg-white pl-10 pr-4 text-[14.5px] text-charcoal placeholder:text-muted shadow-2xs focus:border-forest focus:outline-none"
          />
        </label>

        {/* Tab Filters */}
        <div
          className="flex flex-wrap items-center gap-2"
          role="group"
          aria-label={bn ? "অবস্থা অনুযায়ী ফিল্টার" : "Filter by status"}
        >
          <button
            type="button"
            onClick={() => setFilter("all")}
            aria-pressed={filter === "all"}
            className={`inline-flex items-center gap-1.5 rounded-[2px] border px-3.5 py-1.5 text-[12px] font-semibold transition-all shadow-2xs ${
              filter === "all"
                ? "border-forest bg-forest text-gold"
                : "border-line-strong bg-white text-body hover:border-forest hover:text-forest"
            }`}
          >
            <span>{bn ? "সব ইভেন্ট" : "All Events"}</span>
            <span
              className={`ml-0.5 rounded-full px-1.5 py-0.2 text-[10.5px] font-bold ${
                filter === "all" ? "bg-forest-deep text-gold" : "bg-line text-muted"
              }`}
            >
              {counts.all}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setFilter("upcoming")}
            aria-pressed={filter === "upcoming"}
            className={`inline-flex items-center gap-1.5 rounded-[2px] border px-3.5 py-1.5 text-[12px] font-semibold transition-all shadow-2xs ${
              filter === "upcoming"
                ? "border-forest bg-forest text-gold"
                : "border-line-strong bg-white text-body hover:border-forest hover:text-forest"
            }`}
          >
            <CalendarDays className="h-3.5 w-3.5" />
            <span>{bn ? "আসন্ন কর্মসূচি" : "Upcoming"}</span>
            <span
              className={`ml-0.5 rounded-full px-1.5 py-0.2 text-[10.5px] font-bold ${
                filter === "upcoming" ? "bg-forest-deep text-gold" : "bg-emerald-100 text-emerald-800"
              }`}
            >
              {counts.upcoming}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setFilter("past")}
            aria-pressed={filter === "past"}
            className={`inline-flex items-center gap-1.5 rounded-[2px] border px-3.5 py-1.5 text-[12px] font-semibold transition-all shadow-2xs ${
              filter === "past"
                ? "border-forest bg-forest text-gold"
                : "border-line-strong bg-white text-body hover:border-forest hover:text-forest"
            }`}
          >
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>{bn ? "সম্পন্ন কর্মসূচি" : "Concluded"}</span>
            <span
              className={`ml-0.5 rounded-full px-1.5 py-0.2 text-[10.5px] font-bold ${
                filter === "past" ? "bg-forest-deep text-gold" : "bg-line text-muted"
              }`}
            >
              {counts.past}
            </span>
          </button>
        </div>
      </div>

      {/* Results Header Counter */}
      <div className="mt-6 flex items-center justify-between border-b border-line pb-3 text-[12.5px] text-muted">
        <p>
          {bn
            ? `মোট ${filtered.length}টি অনুষ্ঠান প্রদর্শিত হচ্ছে`
            : `Showing ${filtered.length} events`}
        </p>
      </div>

      {/* Event Cards Grid */}
      {filtered.length === 0 ? (
        <div className="mt-12 rounded-[2px] border border-dashed border-line-strong bg-offwhite p-12 text-center text-muted">
          <p className="text-[15px] font-semibold text-charcoal">
            {bn ? "কোনো অনুষ্ঠান পাওয়া যায়নি" : "No events found"}
          </p>
          <p className="mt-1 text-[13px]">
            {bn
              ? "অনুসন্ধানের শব্দ পরিবর্তন করে বা ফিল্টার সরিয়ে আবার চেষ্টা করুন।"
              : "Try adjusting your search terms or clearing filters."}
          </p>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-5 sm:gap-6">
          {filtered.map((item) => {
            const isUpcoming = item.status === "upcoming";
            const { day, month, year } = getCalendarParts(item.date);

            return (
              <article
                key={item.id}
                className={`group relative overflow-hidden rounded-xl border bg-white p-4 sm:p-6 sm:p-7 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${
                  isUpcoming
                    ? "border-emerald-200/80 shadow-2xs hover:border-forest"
                    : "border-line shadow-2xs hover:border-forest/40"
                }`}
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
                  {/* Calendar Date Badge: Responsive horizontal on mobile, vertical block on desktop */}
                  <div className="flex flex-row items-center justify-between sm:flex-col sm:justify-center shrink-0 w-full sm:w-20 rounded-lg border border-line bg-gradient-to-r sm:bg-gradient-to-b from-offwhite to-white px-3.5 py-2 sm:p-3 text-center shadow-2xs group-hover:border-forest/30">
                    <span className="text-[12px] sm:text-[11.5px] font-bold text-forest">
                      {month}
                    </span>
                    <span className="bn-heading text-xl sm:text-2xl font-bold leading-none text-forest sm:my-1">
                      {day}
                    </span>
                    <span className="text-[11.5px] sm:text-[11px] font-medium text-muted">
                      {year}
                    </span>
                  </div>

                  {/* Right Event Content */}
                  <div className="flex-1">
                    {/* Meta Bar */}
                    <div className="flex flex-wrap items-center gap-2">
                      {/* Status Badge */}
                      {isUpcoming ? (
                        <span className="inline-flex items-center gap-1.5 rounded-[2px] border border-emerald-300 bg-emerald-50 px-2.5 py-0.5 text-[11.5px] font-semibold text-emerald-800">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse" />
                          {bn ? "আসন্ন কর্মসূচি" : "Upcoming"}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-[2px] border border-line bg-offwhite px-2.5 py-0.5 text-[11.5px] font-medium text-muted">
                          <CheckCircle2 className="h-3 w-3 text-muted/70" />
                          {bn ? "সম্পন্ন" : "Concluded"}
                        </span>
                      )}

                      {/* Category Pill */}
                      {item.category ? (
                        <>
                          <span className="text-muted/40">•</span>
                          <span className="inline-flex items-center gap-1 text-[12px] font-medium text-forest">
                            <Tag className="h-3 w-3 text-forest/70" />
                            {item.category[locale]}
                          </span>
                        </>
                      ) : null}
                    </div>

                    {/* Title */}
                    <h2 className="bn-heading mt-2.5 text-[18px] font-bold leading-snug text-charcoal transition-colors group-hover:text-forest sm:text-[20px]">
                      {item.title[locale]}
                    </h2>

                    {/* Venue & Time details */}
                    <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-[13px] text-muted">
                      <div className="flex items-center gap-1.5 text-forest-deep font-medium">
                        <MapPin className="h-3.5 w-3.5 text-forest shrink-0" />
                        <span>{item.location[locale]}</span>
                      </div>

                      {item.time ? (
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5 text-muted/80 shrink-0" />
                          <span>{item.time[locale]}</span>
                        </div>
                      ) : null}

                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-muted/80 shrink-0" />
                        <span>{formatDateShort(item.date, locale)}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="bn mt-3 text-[14.5px] leading-relaxed text-body">
                      {item.description[locale]}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
