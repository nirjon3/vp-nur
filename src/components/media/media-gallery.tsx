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
  Pause,
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

interface MediaCardItemProps {
  item: MediaItem;
  locale: Locale;
  bn: boolean;
  onOpen: () => void;
}

function MediaCardItem({ item, locale, bn, onOpen }: MediaCardItemProps) {
  const Icon = kindIcon[item.kind];
  const itemImages = item.images && item.images.length > 0 ? item.images : (item.imageUrl ? [item.imageUrl] : []);
  const photoCount = itemImages.length;
  const isAlbum = photoCount > 1;

  const [hoverIndex, setHoverIndex] = React.useState(0);
  const [isHovered, setIsHovered] = React.useState(false);

  // Auto-slide thumbnail on hover/focus every 1 sec if there are multiple images
  React.useEffect(() => {
    if (!isAlbum || !isHovered) return;
    const interval = setInterval(() => {
      setHoverIndex((prev) => (prev + 1) % itemImages.length);
    }, 1000);
    return () => clearInterval(interval);
  }, [isAlbum, isHovered, itemImages.length]);

  const currentThumb = isAlbum && isHovered
    ? itemImages[hoverIndex]
    : (item.imageUrl ?? (item.youtubeId ? `https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg` : null));

  return (
    <button
      type="button"
      onClick={onOpen}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setHoverIndex(0);
      }}
      className="group relative flex aspect-[4/5] w-full flex-col justify-between overflow-hidden rounded-[2px] bg-forest-deep p-4 text-left transition-all hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
    >
      {currentThumb ? (
        <>
          <Image
            key={currentThumb}
            src={currentThumb}
            alt={item.title[locale]}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-forest-ink via-forest-ink/40 to-forest-ink/20 group-hover:from-forest-ink/95"
          />
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
            <span>
              {isHovered ? `${hoverIndex + 1}/${photoCount}` : `${photoCount} ${bn ? "ছবি" : "Photos"}`}
            </span>
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
  );
}

export function MediaGallery({ items, locale }: { items: MediaItem[]; locale: Locale }) {
  const dict = getDictionary(locale);
  const bn = locale === "bn";
  const [kind, setKind] = React.useState<MediaKind | "all">("all");
  const [active, setActive] = React.useState<MediaItem | null>(null);
  const [activeImageIndex, setActiveImageIndex] = React.useState<number>(0);
  const [isAutoSlideActive, setIsAutoSlideActive] = React.useState<boolean>(true);
  const closeRef = React.useRef<HTMLButtonElement>(null);

  const filtered = items.filter((i) => kind === "all" || i.kind === kind);

  const openItem = (item: MediaItem) => {
    setActive(item);
    setActiveImageIndex(0);
    setIsAutoSlideActive(true); // Start 1-sec auto slide automatically on tap
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

  // When tapping directly on the photo inside the modal
  const handleImageTap = React.useCallback(() => {
    if (allActiveImages.length <= 1) return;
    // Advance to next image immediately on tap
    setActiveImageIndex((prev) => (prev < allActiveImages.length - 1 ? prev + 1 : 0));
    // Ensure 1-second auto-slide remains active
    setIsAutoSlideActive(true);
  }, [allActiveImages.length]);

  // 1-second automatic slide effect when multiple images are present
  React.useEffect(() => {
    if (!active || allActiveImages.length <= 1 || !isAutoSlideActive) return;

    const timer = setInterval(() => {
      setActiveImageIndex((prev) => (prev < allActiveImages.length - 1 ? prev + 1 : 0));
    }, 1000); // 1 second interval as requested

    return () => clearInterval(timer);
  }, [active, allActiveImages.length, isAutoSlideActive]);

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
        } else if (e.key === " ") {
          e.preventDefault();
          setIsAutoSlideActive((prev) => !prev);
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
          {filtered.map((item) => (
            <li key={item.id}>
              <MediaCardItem
                item={item}
                locale={locale}
                bn={bn}
                onOpen={() => openItem(item)}
              />
            </li>
          ))}
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
              className="absolute right-3 top-3 z-30 flex h-10 w-10 items-center justify-center rounded-[2px] bg-forest-ink/80 text-white backdrop-blur-xs hover:bg-forest-ink transition-colors"
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
                <div
                  onClick={handleImageTap}
                  title={allActiveImages.length > 1 ? (bn ? "ট্যাপ করে পরবর্তী ছবি দেখুন" : "Tap to see next photo") : undefined}
                  className={`group relative aspect-[4/3] sm:aspect-[16/10] max-h-[65vh] w-full overflow-hidden bg-black flex items-center justify-center ${
                    allActiveImages.length > 1 ? "cursor-pointer select-none" : ""
                  }`}
                >
                  <Image
                    key={currentDisplayImage}
                    src={currentDisplayImage}
                    alt={`${active.title[locale]} — ${activeImageIndex + 1}`}
                    fill
                    sizes="(min-width: 1024px) 56rem, 100vw"
                    className="object-contain transition-opacity duration-300"
                    loading="eager"
                    priority
                  />

                  {/* Album Photo Counter & Auto-Slide Status Indicator */}
                  {allActiveImages.length > 1 ? (
                    <div className="absolute left-3 top-3 z-20 flex items-center gap-2">
                      <span className="rounded-[2px] bg-forest-ink/85 px-2.5 py-1 text-[11px] font-bold text-white shadow-xs backdrop-blur-xs">
                        {activeImageIndex + 1} / {allActiveImages.length}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsAutoSlideActive((prev) => !prev);
                        }}
                        className={`flex items-center gap-1.5 rounded-[2px] px-2.5 py-1 text-[11px] font-semibold shadow-xs backdrop-blur-xs transition-colors ${
                          isAutoSlideActive
                            ? "bg-forest text-gold border border-gold/40"
                            : "bg-forest-ink/80 text-white/80 hover:text-white"
                        }`}
                        title={
                          isAutoSlideActive
                            ? (bn ? "অটো-স্লাইড বন্ধ করতে ক্লিক করুন" : "Click to pause auto-slide")
                            : (bn ? "অটো-স্লাইড চালু করতে ক্লিক করুন" : "Click to resume auto-slide")
                        }
                      >
                        {isAutoSlideActive ? (
                          <>
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-gold"></span>
                            </span>
                            <Pause className="h-3 w-3" />
                            <span>{bn ? "১ সেকেন্ডে স্লাইড হচ্ছে" : "Auto 1s"}</span>
                          </>
                        ) : (
                          <>
                            <Play className="h-3 w-3" />
                            <span>{bn ? "স্লাইড চালান" : "Play 1s"}</span>
                          </>
                        )}
                      </button>
                    </div>
                  ) : null}

                  {/* Top 1-Second Progress Bar */}
                  {allActiveImages.length > 1 && isAutoSlideActive ? (
                    <div className="absolute top-0 left-0 right-0 h-1 bg-white/20 z-30 overflow-hidden">
                      <div
                        key={activeImageIndex}
                        className="h-full bg-gold animate-[progress_1s_linear_infinite]"
                        style={{
                          animation: "slideProgress 1000ms linear",
                        }}
                      />
                    </div>
                  ) : null}

                  {/* Previous / Next Arrow Controls */}
                  {allActiveImages.length > 1 ? (
                    <>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePrevImage();
                        }}
                        aria-label={bn ? "পূর্ববর্তী ছবি" : "Previous photo"}
                        className="absolute left-2.5 top-1/2 z-20 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-forest-ink/75 text-white shadow-md backdrop-blur-xs hover:bg-forest hover:text-gold transition-colors"
                      >
                        <ChevronLeft className="h-6 w-6" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleNextImage();
                        }}
                        aria-label={bn ? "পরবর্তী ছবি" : "Next photo"}
                        className="absolute right-2.5 top-1/2 z-20 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-forest-ink/75 text-white shadow-md backdrop-blur-xs hover:bg-forest hover:text-gold transition-colors"
                      >
                        <ChevronRight className="h-6 w-6" />
                      </button>
                    </>
                  ) : null}

                  {/* Subtle Tap to Advance Overlay Hint */}
                  {allActiveImages.length > 1 ? (
                    <span className="pointer-events-none absolute bottom-3 right-3 z-20 rounded-[2px] bg-forest-ink/70 px-2 py-0.5 text-[10px] text-white/80 opacity-0 group-hover:opacity-100 transition-opacity">
                      {bn ? "ছবির মধ্যে ট্যাপ করে স্লাইড করুন" : "Tap image to slide"}
                    </span>
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
                      onClick={() => {
                        setActiveImageIndex(idx);
                        setIsAutoSlideActive(true);
                      }}
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
