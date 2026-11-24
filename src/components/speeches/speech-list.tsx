"use client";

import * as React from "react";
import {
  Search,
  Play,
  MapPin,
  Calendar,
  Tv,
  X,
  Volume2,
} from "lucide-react";
import type { Locale } from "@/i18n/config";
import { formatDateShort } from "@/lib/format";
import type { Speech } from "@/types/content";

function extractYouTubeId(url?: string): string | null {
  if (!url) return null;
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : null;
}

export function SpeechList({
  items,
  locale,
}: {
  items: Speech[];
  locale: Locale;
}) {
  const bn = locale === "bn";
  const [playingId, setPlayingId] = React.useState<string | null>(null);
  const [query, setQuery] = React.useState<string>("");
  const [filter, setFilter] = React.useState<"all" | "rally" | "interview">("all");

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return items
      .filter((s) => {
        if (filter === "rally") {
          return (
            s.subject.bn.includes("জনসভা") ||
            s.subject.en.toLowerCase().includes("rally") ||
            s.title.bn.includes("জনসভা") ||
            s.title.bn.includes("বক্তব্য")
          );
        }
        if (filter === "interview") {
          return (
            s.subject.bn.includes("সাক্ষাৎকার") ||
            s.subject.en.toLowerCase().includes("interview") ||
            s.title.bn.includes("সাক্ষাৎকার") ||
            s.title.bn.includes("অভিমত")
          );
        }
        return true;
      })
      .filter((s) => {
        if (!q) return true;
        const haystack = [
          s.title.bn,
          s.title.en,
          s.subject.bn,
          s.subject.en,
          s.location?.bn || "",
          s.location?.en || "",
          s.sourceLabel?.bn || "",
          s.sourceLabel?.en || "",
        ]
          .join(" ")
          .toLowerCase();
        return haystack.includes(q);
      })
      .sort((a, b) => b.date.localeCompare(a.date));
  }, [items, query, filter]);

  return (
    <div>
      {/* 1. SEARCH AND FILTER CONTROLS */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <label className="relative block w-full max-w-md">
          <span className="sr-only">{bn ? "ভিডিও খুঁজুন" : "Search videos"}</span>
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
                ? "বক্তৃতা, সাক্ষাৎকার বা চ্যানেল খুঁজুন…"
                : "Search speeches, interviews or channels…"
            }
            className="h-11 w-full rounded-[2px] border border-line-strong bg-white pl-10 pr-4 text-[14.5px] text-charcoal placeholder:text-muted shadow-2xs focus:border-forest focus:outline-none"
          />
        </label>

        {/* Filter Tabs */}
        <div
          className="flex flex-wrap items-center gap-2"
          role="group"
          aria-label={bn ? "ক্যাটাগরি ফিল্টার" : "Category filter"}
        >
          <button
            type="button"
            onClick={() => setFilter("all")}
            aria-pressed={filter === "all"}
            className={`inline-flex items-center gap-1.5 rounded-[2px] border px-2.5 py-1 sm:px-3.5 sm:py-1.5 text-[11px] sm:text-[12px] font-semibold transition-all shadow-2xs ${
              filter === "all"
                ? "border-forest bg-forest text-gold"
                : "border-line-strong bg-white text-body hover:border-forest hover:text-forest"
            }`}
          >
            <span>{bn ? "সব ভিডিও" : "All Videos"}</span>
            <span
              className={`ml-0.5 rounded-full px-1.5 py-0.2 text-[10px] sm:text-[10.5px] font-bold ${
                filter === "all" ? "bg-forest-deep text-gold" : "bg-line text-muted"
              }`}
            >
              {items.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setFilter("rally")}
            aria-pressed={filter === "rally"}
            className={`inline-flex items-center gap-1.5 rounded-[2px] border px-2.5 py-1 sm:px-3.5 sm:py-1.5 text-[11px] sm:text-[12px] font-semibold transition-all shadow-2xs ${
              filter === "rally"
                ? "border-forest bg-forest text-gold"
                : "border-line-strong bg-white text-body hover:border-forest hover:text-forest"
            }`}
          >
            <span>{bn ? "জনসভা ও ভাষণ" : "Rallies & Speeches"}</span>
          </button>

          <button
            type="button"
            onClick={() => setFilter("interview")}
            aria-pressed={filter === "interview"}
            className={`inline-flex items-center gap-1.5 rounded-[2px] border px-2.5 py-1 sm:px-3.5 sm:py-1.5 text-[11px] sm:text-[12px] font-semibold transition-all shadow-2xs ${
              filter === "interview"
                ? "border-forest bg-forest text-gold"
                : "border-line-strong bg-white text-body hover:border-forest hover:text-forest"
            }`}
          >
            <span>{bn ? "টিভি সাক্ষাৎকার" : "Interviews"}</span>
          </button>
        </div>
      </div>

      {/* Counter */}
      <div className="mt-6 flex items-center justify-between border-b border-line pb-3 text-[12.5px] text-muted">
        <p>
          {bn
            ? `মোট ${filtered.length}টি ভিডিও বক্তৃতা ও সাক্ষাৎকার তালিকাভুক্ত রয়েছে`
            : `Showing ${filtered.length} video speeches & interviews`}
        </p>
      </div>

      {/* 2. VIDEO CARDS GRID (EACH CARD PLAYS IN PLACE) */}
      {filtered.length === 0 ? (
        <div className="mt-12 rounded-[2px] border border-dashed border-line-strong bg-offwhite p-12 text-center text-muted">
          <p className="text-[15px] font-semibold text-charcoal">
            {bn ? "কোনো ভিডিও খুঁজে পাওয়া যায়নি" : "No videos found"}
          </p>
          <p className="mt-1 text-[13px]">
            {bn
              ? "অনুসন্ধানের শব্দ পরিবর্তন করে আবার চেষ্টা করুন।"
              : "Try adjusting your search query."}
          </p>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((speech) => {
            const ytId = extractYouTubeId(speech.videoUrl);
            const isPlayingThis = playingId === speech.id;

            return (
              <article
                key={speech.id}
                className={`group flex flex-col justify-between overflow-hidden rounded-xl border bg-white shadow-2xs transition-all duration-300 hover:shadow-md ${
                  isPlayingThis
                    ? "border-forest ring-2 ring-forest/30"
                    : "border-line hover:border-forest/50"
                }`}
              >
                <div>
                  {/* VIDEO FRAME: IF PLAYING, EMBED IFRAME; ELSE, SHOW THUMBNAIL */}
                  <div className="relative aspect-video w-full overflow-hidden bg-black">
                    {isPlayingThis && ytId ? (
                      <>
                        <iframe
                          src={`https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1&rel=0`}
                          title={speech.title[locale]}
                          className="h-full w-full border-0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        />
                        {/* Close / Return to thumbnail button */}
                        <button
                          type="button"
                          onClick={() => setPlayingId(null)}
                          aria-label={bn ? "ভিডিও বন্ধ করুন" : "Close video player"}
                          className="absolute top-2 right-2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-black/80 text-white hover:bg-forest transition-colors shadow-md"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </>
                    ) : (
                      <div
                        onClick={() => setPlayingId(speech.id)}
                        className="group/thumb relative h-full w-full cursor-pointer overflow-hidden"
                      >
                        {ytId ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={`https://img.youtube.com/vi/${ytId}/hqdefault.jpg`}
                            alt={speech.title[locale]}
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-500 group-hover/thumb:scale-105"
                          />
                        ) : null}

                        <div
                          aria-hidden="true"
                          className="absolute inset-0 bg-black/30 transition-colors group-hover/thumb:bg-black/15"
                        />

                        {/* Center Play Button */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="flex h-13 w-13 items-center justify-center rounded-full bg-gold/95 text-forest-ink shadow-xl transition-all duration-300 group-hover/thumb:scale-115 group-hover/thumb:bg-gold">
                            <Play className="h-5 w-5 fill-forest-ink pl-0.5" />
                          </span>
                        </div>

                        {/* Duration Pill */}
                        {speech.durationMinutes ? (
                          <div className="absolute bottom-2.5 right-2.5 rounded-[2px] bg-black/85 px-2 py-0.5 text-[11px] font-semibold text-white">
                            {speech.durationMinutes} {bn ? "মিনিট" : "min"}
                          </div>
                        ) : null}
                      </div>
                    )}
                  </div>

                  {/* Card Info */}
                  <div className="p-4 sm:p-5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="rounded-[2px] bg-forest/5 px-2 py-0.5 text-[11.5px] font-semibold text-forest">
                        {speech.subject[locale]}
                      </span>

                      {isPlayingThis ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
                          <Volume2 className="h-3.5 w-3.5 animate-pulse" />
                          <span>{bn ? "চলছে" : "Playing"}</span>
                        </span>
                      ) : null}
                    </div>

                    <h2 className="bn-heading mt-2.5 text-[16.5px] font-bold leading-snug text-charcoal transition-colors group-hover:text-forest">
                      {speech.title[locale]}
                    </h2>

                    <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-muted">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-muted/70" />
                        {formatDateShort(speech.date, locale)}
                      </span>

                      {speech.location ? (
                        <>
                          <span>•</span>
                          <span className="inline-flex items-center gap-1">
                            <MapPin className="h-3 w-3 text-muted/70" />
                            {speech.location[locale]}
                          </span>
                        </>
                      ) : null}

                      {speech.sourceLabel ? (
                        <>
                          <span>•</span>
                          <span className="inline-flex items-center gap-1 text-forest font-medium">
                            <Tv className="h-3 w-3 text-forest/70" />
                            {speech.sourceLabel[locale]}
                          </span>
                        </>
                      ) : null}
                    </div>
                  </div>
                </div>

                {/* Bottom Action Footer */}
                <div
                  onClick={() => setPlayingId(isPlayingThis ? null : speech.id)}
                  className={`cursor-pointer border-t px-5 py-2.5 text-[12.5px] font-semibold transition-colors flex items-center justify-between ${
                    isPlayingThis
                      ? "border-forest/20 bg-forest/5 text-forest"
                      : "border-line/60 bg-offwhite text-forest hover:bg-forest hover:text-white"
                  }`}
                >
                  <span>
                    {isPlayingThis
                      ? bn
                        ? "ভিডিও বন্ধ করতে চাপুন"
                        : "Close video"
                      : bn
                        ? "ভিডিও প্লে করুন"
                        : "Play video here"}
                  </span>
                  {isPlayingThis ? (
                    <X className="h-3.5 w-3.5" />
                  ) : (
                    <Play className="h-3 w-3 fill-current" />
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
