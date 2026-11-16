"use client";

import * as React from "react";
import { Search, Mic, MessagesSquare, Video, Play } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { formatDateShort } from "@/lib/format";
import { VerificationBadge } from "@/components/shared/verification";
import type { Speech } from "@/types/content";

export function SpeechList({ items, locale }: { items: Speech[]; locale: Locale }) {
  const dict = getDictionary(locale);
  const bn = locale === "bn";
  const [query, setQuery] = React.useState("");

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return items
      .filter((s) => {
        if (!q) return true;
        return [s.title.bn, s.title.en, s.subject.bn, s.subject.en, s.location?.bn ?? "", s.location?.en ?? ""]
          .join(" ")
          .toLowerCase()
          .includes(q);
      })
      .sort((a, b) => b.date.localeCompare(a.date));
  }, [items, query]);

  return (
    <div>
      <label className="relative block w-full max-w-md">
        <span className="sr-only">{dict.common.search}</span>
        <Search aria-hidden="true" className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={bn ? "বক্তৃতা বা সাক্ষাৎকার খুঁজুন…" : "Search speeches or interviews…"}
          className="h-11 w-full rounded-[2px] border border-line-strong bg-white pl-10 pr-4 text-[15px] focus:border-forest focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-forest"
        />
      </label>

      {filtered.length === 0 ? (
        <p className="mt-12 rounded-[2px] border border-dashed border-line-strong bg-offwhite p-10 text-center text-muted">
          {dict.common.noResults}
        </p>
      ) : (
        <ul className="mt-6 divide-y divide-line border-y border-line">
          {filtered.map((s) => (
            <li key={s.id} className="grid grid-cols-[auto_1fr] items-start gap-4 py-5 sm:grid-cols-[auto_1fr_auto] sm:items-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-[2px] bg-forest/5 text-forest">
                {s.videoUrl ? (
                  <Video aria-hidden="true" className="h-5 w-5" />
                ) : s.durationMinutes && s.durationMinutes >= 15 ? (
                  <MessagesSquare aria-hidden="true" className="h-5 w-5" />
                ) : (
                  <Mic aria-hidden="true" className="h-5 w-5" />
                )}
              </span>
              <span>
                <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-gold-deep">
                  {s.subject[locale]}
                </span>
                <h2 className="bn-heading mt-0.5 text-[17px] leading-snug text-charcoal">{s.title[locale]}</h2>
                <span className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[12.5px] text-muted">
                  <time dateTime={s.date}>{formatDateShort(s.date, locale)}</time>
                  {s.location ? ` · ${s.location[locale]}` : ""}
                  {s.durationMinutes ? ` · ${s.durationMinutes} ${bn ? "মিনিট" : "min"}` : ""}
                  {s.videoUrl ? (
                    <>
                      <span aria-hidden="true">·</span>
                      <a
                        href={s.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-semibold text-forest underline hover:text-forest-deep"
                      >
                        <Play aria-hidden="true" className="h-3 w-3 fill-current" />
                        {bn ? "ভিডিও দেখুন" : "Watch recording"}
                      </a>
                    </>
                  ) : null}
                </span>
              </span>
              <span className="col-span-2 sm:col-span-1 sm:justify-self-end">
                <VerificationBadge status={s.verification} locale={locale} />
              </span>
            </li>
          ))}
        </ul>
      )}
      <p className="mt-4 text-[12px] text-muted">
        {bn
          ? "যাচাইকৃত রেকর্ডিং সংযুক্ত হলে এন্ট্রিগুলো ভিডিও প্লেয়ারসহ দেখা যাবে।"
          : "Once verified recordings are attached, entries will display with video playback."}
      </p>
    </div>
  );
}
