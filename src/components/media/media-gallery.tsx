"use client";

import * as React from "react";
import Image from "next/image";
import {
  X,
  Camera,
  Video,
  MessagesSquare,
  Mic,
  CalendarClock,
  Play,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Images,
} from "lucide-react";
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
  const [activeImageIndex, setActiveImageIndex] = React.useState<number>(0);
  const closeRef = React.useRef<HTMLButtonElement>(null);

  const filtered = items.filter((i) => kind === "all" || i.kind === kind);

  const openItem = (item: MediaItem) => {
    setActive(item);
    setActiveImageIndex(0);
  };

  const allActiveImages = React.useMemo(() => {
    if (!active) return [];
    if (active.images && active.images.length > 0) return active.images;
    if (active.imageUrl) return [active.imageUrl];
    return [];
  }, [active]);

  const handlePrevImage = React.useCallback(() => {
    if (allActiveImages.length <= 1) return;
    setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : allActiveImages.length - 1));
  }, [allActiveImages.length]);

  const handleNextImage = React.useCallback(() => {
    if (allActiveImages.length <= 1) return;
    setActiveImageIndex((prev) => (prev < allActiveImages.length - 1 ? prev + 1 : 0));
  }, [allActiveImages.length]);

  React.useEffect(() => {
    if (active) {
      closeRef.current?.focus();
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setActive(null);
        } else if (e.key === "ArrowLeft") {
          handlePrevImage();
        } else if (e.key === "ArrowRight") {
          handleNextImage();
        }
      };
      window.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
      return () => {
        window.removeEventListener("keydown", onKey);
        document.body.style.overflow = "";
      };
    }
  }, [active, handlePrevImage, handleNextImage]);

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

  const currentDisplayImage = allActiveImages[activeImageIndex] ?? active?.imageUrl;

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
            const photoCount = item.images && item.images.length > 0 ? item.images.length : (item.imageUrl ? 1 : 0);
            const isAlbum = photoCount > 1;

            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => openItem(item)}
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
                    ) : isAlbum ? (
                      <span className="flex items-center gap-1 rounded-[2px] bg-forest-ink/85 px-2 py-0.5 text-[11px] font-bold text-gold shadow-xs backdrop-blur-xs">
                        <Images aria-hidden="true" className="h-3.5 w-3.5" />
                        <span>{photoCount} {bn ? "ছবি" : "Photos"}</span>
                      </span>
                    ) : null}
                  </span>
                  <span className="relative z-10">
                    <span className="bn block text-[12.5px] font-semibold leading-snug text-white drop-shadow-xs line-clamp-2">
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

      {/* Lightbox Modal */}
      {active ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.title[locale]}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-forest-ink/95 p-3 sm:p-4 backdrop-blur-sm"
          onClick={() => setActive(null)}
        >
          <div
            className="relative flex max-h-[95vh] w-full max-w-4xl flex-col overflow-hidden rounded-[2px] bg-forest-ink shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              ref={closeRef}
              type="button"
              onClick={() => setActive(null)}
              aria-label={dict.common.close}
              className="absolute right-3 top-3 z-30 flex h-10 w-10 items-center justify-center rounded-[2px] bg-forest-ink/80 text-white backdrop-blur-xs hover:bg-forest-ink"
            >
              <X aria-hidden="true" className="h-5 w-5" />
            </button>

            {/* Media Canvas */}
            <div className="relative w-full flex-1 bg-black">
              {active.youtubeId ? (
                <div className="aspect-video w-full overflow-hidden">
                  <iframe
                    src={`https://www.youtube.com/embed/${encodeURIComponent(active.youtubeId)}?rel=0&autoplay=1`}
                    title={active.title[locale]}
                    className="h-full w-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : currentDisplayImage ? (
                <div className="relative aspect-[4/3] sm:aspect-[16/10] max-h-[65vh] w-full overflow-hidden bg-black flex items-center justify-center">
                  <Image
                    src={currentDisplayImage}
                    alt={`${active.title[locale]} — ${activeImageIndex + 1}`}
                    fill
                    sizes="(min-width: 1024px) 56rem, 100vw"
                    className="object-contain"
                    loading="lazy"
                    decoding="async"
                  />

                  {/* Album Photo Counter Indicator */}
                  {allActiveImages.length > 1 ? (
                    <span className="absolute left-3 top-3 z-20 rounded-[2px] bg-forest-ink/80 px-2.5 py-1 text-[11px] font-bold text-white shadow-xs backdrop-blur-xs">
                      {activeImageIndex + 1} / {allActiveImages.length}
                    </span>
                  ) : null}

                  {/* Previous / Next Arrow Controls */}
                  {allActiveImages.length > 1 ? (
                    <>
                      <button
                        type="button"
                        onClick={handlePrevImage}
                        aria-label={bn ? "পূর্ববর্তী ছবি" : "Previous photo"}
                        className="absolute left-2.5 top-1/2 z-20 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-forest-ink/75 text-white shadow-md backdrop-blur-xs hover:bg-forest hover:text-gold transition-colors"
                      >
                        <ChevronLeft className="h-6 w-6" />
                      </button>
                      <button
                        type="button"
                        onClick={handleNextImage}
                        aria-label={bn ? "পরবর্তী ছবি" : "Next photo"}
                        className="absolute right-2.5 top-1/2 z-20 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-forest-ink/75 text-white shadow-md backdrop-blur-xs hover:bg-forest hover:text-gold transition-colors"
                      >
                        <ChevronRight className="h-6 w-6" />
                      </button>
                    </>
                  ) : null}
                </div>
              ) : (
                <div className="flex aspect-video w-full flex-col items-center justify-center gap-3 rounded-[2px] bg-forest-deep p-6 text-center">
                  <Camera aria-hidden="true" className="h-10 w-10 text-gold/70" />
                  <p className="bn max-w-md text-sm leading-6 text-[#cfd6cb]">
                    {bn
                      ? "অনুমতিপ্রাপ্ত ছবি/ভিডিও এখনো সংযুক্ত করা হয়নি।"
                      : "An authorised image/video has not yet been attached."}
                  </p>
                </div>
              )}

              {/* Album Thumbnail Strip */}
              {allActiveImages.length > 1 ? (
                <div className="flex items-center justify-center gap-2 overflow-x-auto border-t border-forest-deep/80 bg-forest-ink/90 p-2">
                  {allActiveImages.map((img, idx) => (
                    <button
                      key={img + idx}
                      type="button"
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative h-12 w-16 shrink-0 overflow-hidden rounded-[2px] border-2 transition-all ${
                        activeImageIndex === idx
                          ? "border-gold scale-105 shadow-sm"
                          : "border-transparent opacity-50 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`Thumbnail ${idx + 1}`}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </button>
                  ))}
                </div>
              ) : null}
            </div>

            {/* Bottom Details Footer */}
            <div className="p-4 sm:p-5 bg-forest-ink">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="bn-heading text-base font-bold text-white">{active.title[locale]}</p>
                {active.sourceUrl ? (
                  <a
                    href={active.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11.5px] font-semibold text-gold hover:underline"
                  >
                    <span>{active.sourceLabel?.[locale] ?? (bn ? "উৎস দেখুন" : "View source")}</span>
                    <ExternalLink aria-hidden="true" className="h-3.5 w-3.5" />
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
