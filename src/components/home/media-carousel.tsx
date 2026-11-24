"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Camera,
  ArrowRight,
  X,
  ExternalLink,
  Pause,
} from "lucide-react";
import type { Locale } from "@/i18n/config";
import { localePath } from "@/i18n/config";
import { formatDateShort } from "@/lib/format";
import type { MediaItem } from "@/types/content";

export function MediaCarousel({
  items,
  locale,
}: {
  items: MediaItem[];
  locale: Locale;
}) {
  const bn = locale === "bn";
  const [active, setActive] = React.useState<MediaItem | null>(null);
  const [isPaused, setIsPaused] = React.useState(false);
  const closeRef = React.useRef<HTMLButtonElement>(null);

  // Duplicate items for a seamless continuous infinite scroll loop
  const duplicated = React.useMemo(() => [...items, ...items], [items]);

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

  return (
    <div className="relative overflow-hidden py-4">
      {/* Header */}
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-5">
          <div>
            <h2 className="bn-heading text-2xl text-forest sm:text-3xl">
              {bn ? "মাঠপর্যায়ের কার্যক্রম ও আলোকচিত্র" : "Field Work & Activities"}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden text-[12px] text-muted sm:inline-flex items-center gap-1.5">
              <Pause className="h-3.5 w-3.5 text-gold-deep" />
              {bn ? "কার্সার রাখলে থামবে" : "Hover to pause"}
            </span>
            <Link
              href={localePath(locale, "/media")}
              className="group inline-flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-[0.12em] text-forest hover:text-forest-deep"
            >
              {bn ? "সব ছবি দেখুন" : "View all photos"}
              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </div>
      </div>

      {/* Continuous 4:3 Photo Marquee Track */}
      <div
        className="group/track relative mt-7 overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          className={`animate-continuous-scroll flex gap-5 px-4 ${
            isPaused ? "[animation-play-state:paused]" : ""
          }`}
          style={{ willChange: "transform" }}
        >
          {duplicated.map((item, index) => {
            const thumb = item.imageUrl;
            if (!thumb) return null;

            return (
              <button
                key={`${item.id}-${index}`}
                type="button"
                onClick={() => setActive(item)}
                aria-label={item.title[locale]}
                className="group relative aspect-[4/3] w-[320px] shrink-0 overflow-hidden rounded-[2px] bg-forest-deep text-left shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-forest sm:w-[390px] lg:w-[430px]"
              >
                <Image
                  src={thumb}
                  alt={item.title[locale]}
                  fill
                  sizes="(min-width: 1024px) 430px, (min-width: 640px) 390px, 320px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-forest-ink via-forest-ink/30 to-transparent opacity-90 transition-opacity group-hover:opacity-100"
                />

                {/* Top Badge */}
                <div className="relative z-10 flex items-center justify-between p-4">
                  <span className="flex items-center gap-1.5 rounded-[2px] bg-forest-ink/80 px-2.5 py-1 text-[11px] font-semibold text-gold shadow-xs backdrop-blur-xs">
                    <Camera aria-hidden="true" className="h-3.5 w-3.5" />
                    <span>{bn ? "আলোকচিত্র" : "Photograph"}</span>
                  </span>
                </div>

                {/* Bottom Content */}
                <div className="absolute inset-x-0 bottom-0 z-10 p-4 pt-10">
                  <p className="bn-heading text-[15.5px] font-semibold leading-snug text-white drop-shadow-sm group-hover:text-gold sm:text-[16.5px]">
                    {item.title[locale]}
                  </p>
                  <p className="mt-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#b9c2b4]">
                    {formatDateShort(item.date, locale)}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      {active ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.title[locale]}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-forest-ink/90 p-4 backdrop-blur-sm"
          onClick={() => setActive(null)}
        >
          <div
            className="relative w-full max-w-3xl overflow-hidden rounded-[2px] bg-forest-ink shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              ref={closeRef}
              type="button"
              onClick={() => setActive(null)}
              aria-label={bn ? "বন্ধ করুন" : "Close"}
              className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-[2px] bg-forest-ink/80 text-white backdrop-blur-xs transition-colors hover:bg-forest-deep"
            >
              <X aria-hidden="true" className="h-5 w-5" />
            </button>

            {active.imageUrl ? (
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2px] bg-black">
                <Image
                  src={active.imageUrl}
                  alt={active.title[locale]}
                  fill
                  sizes="(min-width: 768px) 48rem, 100vw"
                  className="object-contain"
                />
              </div>
            ) : null}

            <div className="p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="bn-heading text-lg text-white">
                  {active.title[locale]}
                </p>
                {active.sourceUrl ? (
                  <a
                    href={active.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-gold hover:underline"
                  >
                    <span>
                      {active.sourceLabel?.[locale] ??
                        (bn ? "উৎস দেখুন" : "View source")}
                    </span>
                    <ExternalLink aria-hidden="true" className="h-3 w-3" />
                  </a>
                ) : null}
              </div>
              {active.caption ? (
                <p className="bn mt-1.5 text-[13.5px] leading-relaxed text-[#b9c2b4]">
                  {active.caption[locale]}
                </p>
              ) : null}
              <p className="mt-2 text-[11px] font-bold uppercase tracking-wider text-[#8fa389]">
                {formatDateShort(active.date, locale)}
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
