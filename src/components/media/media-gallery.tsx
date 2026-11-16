"use client";

import * as React from "react";
import Image from "next/image";
import { X, Camera, Video, MessagesSquare, Mic, CalendarClock, Play, ExternalLink } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { formatDateShort } from "@/lib/format";
import type { MediaItem, MediaKind } from "@/types/content";

const kindIcon = {
  photo: Camera,
  video: Video,
  interview: MessagesSquare,
  speech: Mic,
  event: CalendarClock,
} as const;

const kinds: (MediaKind | "all")[] = ["all", "photo", "video", "interview", "speech", "event"];

export function MediaGallery({ items, locale }: { items: MediaItem[]; locale: Locale }) {
  const dict = getDictionary(locale);
  const bn = locale === "bn";
  const [kind, setKind] = React.useState<MediaKind | "all">("all");
  const [active, setActive] = React.useState<MediaItem | null>(null);
  const closeRef = React.useRef<HTMLButtonElement>(null);

  const filtered = items.filter((i) => kind === "all" || i.kind === kind);

  React.useEffect(() => {
    if (active) {
      closeRef.current?.focus();
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") setActive(null);
      };
      window.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
      return () => {
        window.removeEventListener("keydown", onKey);
        document.body.style.overflow = "";
      };
    }
  }, [active]);

  const kindLabel = (k: MediaKind | "all") => {
    if (k === "all") return bn ? "সব" : "All";
    const map: Record<MediaKind, [string, string]> = {
      photo: ["ছবি", "Photos"],
      video: ["ভিডিও", "Videos"],
      interview: ["সাক্ষাৎকার", "Interviews"],
      speech: ["বক্তৃতা", "Speeches"],
      event: ["অনুষ্ঠান", "Events"],
    };
    return bn ? map[k][0] : map[k][1];
  };

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2" role="group" aria-label={bn ? "মিডিয়া ফিল্টার" : "Media filter"}>
        {kinds.map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => setKind(k)}
            aria-pressed={kind === k}
            className={`h-9 rounded-[2px] border px-3 text-[12px] font-semibold transition-colors ${
              kind === k
                ? "border-forest bg-forest text-white"
                : "border-line-strong bg-white text-body hover:border-forest hover:text-forest"
            }`}
          >
            {kindLabel(k)}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-12 rounded-[2px] border border-dashed border-line-strong bg-offwhite p-10 text-center text-muted">
          {dict.common.noResults}
        </p>
      ) : (
        <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {filtered.map((item) => {
            const Icon = kindIcon[item.kind];
            const thumb = item.imageUrl ?? (item.youtubeId ? `https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg` : null);
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => setActive(item)}
                  className="group relative flex aspect-[4/5] w-full flex-col justify-between overflow-hidden rounded-[2px] bg-forest-deep p-4 text-left transition-all hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
                >
                  {thumb ? (
                    <>
                      <Image
                        src={thumb}
                        alt={item.title[locale]}
                        fill
                        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-forest-ink via-forest-ink/40 to-forest-ink/20 group-hover:from-forest-ink/95" />
                    </>
                  ) : null}
                  <span className="relative z-10 flex items-center justify-between">
                    <span className="flex h-7 w-7 items-center justify-center rounded-[2px] bg-forest-ink/80 text-gold shadow-xs backdrop-blur-xs">
                      <Icon aria-hidden="true" className="h-4 w-4" />
                    </span>
                    {item.youtubeId ? (
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold/90 text-forest-ink shadow-sm transition-transform group-hover:scale-110">
                        <Play aria-hidden="true" className="h-4 w-4 fill-forest-ink" />
                      </span>
                    ) : null}
                  </span>
                  <span className="relative z-10">
                    <span className="bn block text-[12.5px] font-semibold leading-snug text-white drop-shadow-xs">
                      {item.title[locale]}
                    </span>
                    <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.16em] text-[#b9cbb4]">
                      {formatDateShort(item.date, locale)}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      )}

      {/* Lightbox */}
      {active ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.title[locale]}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-forest-ink/90 p-4 backdrop-blur-sm"
          onClick={() => setActive(null)}
        >
          <div
            className="relative w-full max-w-3xl overflow-hidden rounded-[2px] bg-forest-ink"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              ref={closeRef}
              type="button"
              onClick={() => setActive(null)}
              aria-label={dict.common.close}
              className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-[2px] bg-forest-ink/80 text-white backdrop-blur-xs hover:bg-forest-ink"
            >
              <X aria-hidden="true" className="h-5 w-5" />
            </button>
            {active.youtubeId ? (
              <div className="aspect-video w-full overflow-hidden rounded-[2px]">
                <iframe
                  src={`https://www.youtube.com/embed/${encodeURIComponent(active.youtubeId)}?rel=0&autoplay=1`}
                  title={active.title[locale]}
                  className="h-full w-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : active.imageUrl ? (
              <div className="relative aspect-[4/3] sm:aspect-video w-full overflow-hidden rounded-[2px] bg-black">
                <Image
                  src={active.imageUrl}
                  alt={active.title[locale]}
                  fill
                  sizes="(min-width: 768px) 48rem, 100vw"
                  className="object-contain"
                />
              </div>
            ) : (
              <div className="flex aspect-video w-full flex-col items-center justify-center gap-3 rounded-[2px] bg-forest-deep p-6 text-center">
                <Camera aria-hidden="true" className="h-10 w-10 text-gold/70" />
                <p className="bn max-w-md text-sm leading-6 text-[#cfd6cb]">
                  {bn
                    ? "অনুমতিপ্রাপ্ত ছবি/ভিডিও এখনো সংযুক্ত করা হয়নি। যাচাই শেষে এটি এখানে প্রকাশিত হবে।"
                    : "An authorised image/video has not yet been attached. It will be published here after verification."}
                </p>
              </div>
            )}
            <div className="p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="bn-heading text-base text-white">{active.title[locale]}</p>
                {active.sourceUrl ? (
                  <a
                    href={active.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-gold hover:underline"
                  >
                    <span>{active.sourceLabel?.[locale] ?? (bn ? "উৎস দেখুন" : "View source")}</span>
                    <ExternalLink aria-hidden="true" className="h-3 w-3" />
                  </a>
                ) : null}
              </div>
              {active.caption ? (
                <p className="bn mt-1.5 text-[13px] leading-6 text-[#b9c2b4]">{active.caption[locale]}</p>
              ) : null}
              <p className="mt-2 text-[10.5px] font-bold uppercase tracking-[0.18em] text-[#8fa389]">
                {formatDateShort(active.date, locale)}
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
