"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, ArrowRight, X, ExternalLink } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { localePath } from "@/i18n/config";
import { Container } from "@/components/ui/layout";
import { formatDateShort } from "@/lib/format";
import type { MediaItem } from "@/types/content";

export function VideoSpeeches({
  items,
  locale,
}: {
  items: MediaItem[];
  locale: Locale;
}) {
  const bn = locale === "bn";
  const [activeVideo, setActiveVideo] = React.useState<MediaItem | null>(null);
  const closeRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (activeVideo) {
      closeRef.current?.focus();
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") setActiveVideo(null);
      };
      window.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
      return () => {
        window.removeEventListener("keydown", onKey);
        document.body.style.overflow = "";
      };
    }
  }, [activeVideo]);

  const displayVideos = items.slice(0, 3);

  return (
    <section className="border-t border-line bg-offwhite py-12 sm:py-16">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-5">
          <div>
            <h2 className="bn-heading text-2xl text-forest sm:text-3xl">
              {bn ? "বক্তৃতা, সাক্ষাৎকার ও ভিডিও" : "Speeches, Interviews & Videos"}
            </h2>
          </div>
          <Link
            href={localePath(locale, "/speeches")}
            className="group inline-flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-[0.12em] text-forest hover:text-forest-deep"
          >
            {bn ? "সব ভিডিও বক্তৃতা" : "View all videos"}
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        {/* 3 Large Video Cards Grid */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayVideos.map((video) => {
            const thumb =
              video.imageUrl ??
              (video.youtubeId
                ? `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`
                : null);

            return (
              <div
                key={video.id}
                onClick={() => setActiveVideo(video)}
                className="group flex flex-col justify-between overflow-hidden rounded-[2px] border border-line bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-forest hover:shadow-md cursor-pointer"
              >
                {/* Video Thumbnail with Play Button */}
                <div className="relative aspect-video w-full overflow-hidden bg-forest-deep">
                  {thumb ? (
                    <Image
                      src={thumb}
                      alt={video.title[locale]}
                      fill
                      loading="lazy"
                      decoding="async"
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : null}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-forest-ink/30 transition-colors group-hover:bg-forest-ink/15"
                  />

                  {/* Center Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="flex h-13 w-13 items-center justify-center rounded-full bg-gold/90 text-forest-ink shadow-lg transition-transform duration-300 group-hover:scale-115 group-hover:bg-gold">
                      <Play className="h-5 w-5 fill-forest-ink pl-0.5" />
                    </span>
                  </div>

                  {/* Channel / Source Tag */}
                  {video.sourceLabel ? (
                    <span className="absolute bottom-2.5 right-2.5 rounded-[2px] bg-forest-ink/80 px-2 py-0.5 text-[10.5px] font-semibold text-gold backdrop-blur-xs">
                      {video.sourceLabel[locale]}
                    </span>
                  ) : null}
                </div>

                {/* Video Content */}
                <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-muted">
                      {formatDateShort(video.date, locale)}
                    </span>
                    <h3 className="bn-heading mt-1.5 text-[16px] font-semibold leading-snug text-charcoal group-hover:text-forest">
                      {video.title[locale]}
                    </h3>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-line pt-3">
                    <span className="inline-flex items-center gap-1.5 text-[12px] font-bold text-forest">
                      <Play className="h-3.5 w-3.5 fill-current" />
                      {bn ? "ভিডিও দেখুন" : "Watch Video"}
                    </span>
                    <ArrowRight className="h-4 w-4 text-muted transition-transform group-hover:translate-x-1 group-hover:text-forest" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>

      {/* Video Lightbox Modal */}
      {activeVideo && activeVideo.youtubeId ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeVideo.title[locale]}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-forest-ink/90 p-4 backdrop-blur-sm"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative w-full max-w-3xl overflow-hidden rounded-[2px] bg-forest-ink shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              ref={closeRef}
              type="button"
              onClick={() => setActiveVideo(null)}
              aria-label={bn ? "বন্ধ করুন" : "Close"}
              className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-[2px] bg-forest-ink/80 text-white backdrop-blur-xs transition-colors hover:bg-forest-deep"
            >
              <X aria-hidden="true" className="h-5 w-5" />
            </button>

            <div className="aspect-video w-full overflow-hidden rounded-[2px]">
              <iframe
                src={`https://www.youtube.com/embed/${encodeURIComponent(
                  activeVideo.youtubeId
                )}?rel=0&autoplay=1`}
                title={activeVideo.title[locale]}
                className="h-full w-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="bn-heading text-lg text-white">
                  {activeVideo.title[locale]}
                </p>
                {activeVideo.sourceUrl ? (
                  <a
                    href={activeVideo.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-gold hover:underline"
                  >
                    <span>
                      {activeVideo.sourceLabel?.[locale] ??
                        (bn ? "উৎস দেখুন" : "View source")}
                    </span>
                    <ExternalLink aria-hidden="true" className="h-3 w-3" />
                  </a>
                ) : null}
              </div>
              {activeVideo.caption ? (
                <p className="bn mt-1.5 text-[13.5px] leading-relaxed text-[#b9c2b4]">
                  {activeVideo.caption[locale]}
                </p>
              ) : null}
              <p className="mt-2 text-[11px] font-bold uppercase tracking-wider text-[#8fa389]">
                {formatDateShort(activeVideo.date, locale)}
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
