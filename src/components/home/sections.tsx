import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Mic,
  Camera,
  Video,
  CalendarClock,
  Play,
  FileText,
  Search,
  CheckCircle2,
} from "lucide-react";
import type { Locale } from "@/i18n/config";
import { localePath } from "@/i18n/config";
import { Container } from "@/components/ui/layout";
import { formatDateShort } from "@/lib/format";
import { speeches } from "@/content/speeches";
import { mediaItems } from "@/content/media";

/** Speeches & interviews preview. */
export function SpeechesSection({ locale }: { locale: Locale }) {
  const bn = locale === "bn";
  const items = speeches.slice(0, 3);

  return (
    <section className="border-t border-line bg-offwhite py-12 sm:py-16">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-5">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold-deep">
              {bn ? "বক্তৃতা ও সাক্ষাৎকার" : "Speeches"}
            </p>
            <h2 className="bn-heading mt-1.5 text-2xl text-forest sm:text-3xl">
              {bn ? "জনসম্মুখে বক্তব্য ও সাক্ষাৎকার" : "In His Own Voice"}
            </h2>
          </div>
          <Link
            href={localePath(locale, "/speeches")}
            className="group inline-flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-[0.12em] text-forest hover:text-forest-deep"
          >
            {bn ? "সম্পূর্ণ আর্কাইভ" : "Full archive"}
            <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <ul className="mt-4 divide-y divide-line">
          {items.map((s) => (
            <li key={s.id} className="flex flex-col justify-between gap-3 py-4 sm:flex-row sm:items-center">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[2px] bg-forest/5 text-forest">
                  <Mic aria-hidden="true" className="h-4 w-4" />
                </span>
                <span className="bn-heading text-[15.5px] leading-snug text-charcoal">
                  {s.title[locale]}
                </span>
              </div>
              <div className="flex items-center gap-4 self-end sm:self-center">
                <span className="text-[11.5px] text-muted">
                  <time dateTime={s.date}>{formatDateShort(s.date, locale)}</time>
                  {s.durationMinutes ? ` · ${s.durationMinutes} ${bn ? "মিনিট" : "min"}` : ""}
                </span>
                {s.videoUrl ? (
                  <a
                    href={s.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-[2px] bg-forest px-3.5 py-1.5 text-[12px] font-semibold text-white shadow-xs transition-colors hover:bg-forest-deep"
                  >
                    <Play className="h-3 w-3 fill-current" />
                    {bn ? "ভিডিও দেখুন" : "Watch"}
                  </a>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

const kindIcon = { photo: Camera, video: Video, interview: Video, speech: Mic, event: CalendarClock } as const;

/** Media highlights: visual thumbnails. */
export function MediaSection({ locale }: { locale: Locale }) {
  const bn = locale === "bn";
  const items = mediaItems.slice(0, 6);

  return (
    <section className="border-t border-line bg-white py-12 sm:py-16">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-5">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold-deep">
              {bn ? "গ্যালারি ও মিডিয়া" : "Gallery & Media"}
            </p>
            <h2 className="bn-heading mt-1.5 text-2xl text-forest sm:text-3xl">
              {bn ? "মাঠপর্যায়ের কার্যক্রম ও ভিডিও" : "Field Work & Recordings"}
            </h2>
          </div>
          <Link
            href={localePath(locale, "/media")}
            className="group inline-flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-[0.12em] text-forest hover:text-forest-deep"
          >
            {bn ? "সব ছবি ও ভিডিও" : "View all"}
            <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
          {items.map((item) => {
            const Icon = kindIcon[item.kind] ?? Camera;
            const thumb = item.imageUrl ?? (item.youtubeId ? `https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg` : null);
            return (
              <Link
                key={item.id}
                href={localePath(locale, "/media")}
                className="group relative flex aspect-[4/5] flex-col justify-between overflow-hidden rounded-[2px] bg-forest-deep p-3 transition-colors hover:shadow-md"
              >
                {thumb ? (
                  <>
                    <Image
                      src={thumb}
                      alt={item.title[locale]}
                      fill
                      sizes="(min-width: 1024px) 16vw, (min-width: 640px) 33vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-forest-ink via-forest-ink/40 to-forest-ink/10 group-hover:from-forest-ink/90" />
                  </>
                ) : null}
                <span className="relative z-10 flex items-center justify-between">
                  <span className="flex h-6 w-6 items-center justify-center rounded-[2px] bg-forest-ink/80 text-gold shadow-xs backdrop-blur-xs">
                    <Icon aria-hidden="true" className="h-3.5 w-3.5" />
                  </span>
                  {item.youtubeId ? (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gold/90 text-forest-ink shadow-xs">
                      <Play aria-hidden="true" className="h-2.5 w-2.5 fill-forest-ink" />
                    </span>
                  ) : null}
                </span>
                <span className="relative z-10 bn text-[11.5px] font-medium leading-snug text-white drop-shadow-xs">
                  {item.title[locale]}
                </span>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

/** Citizen services interactive band. */
export function ServicesBand({ locale }: { locale: Locale }) {
  const bn = locale === "bn";
  return (
    <section className="bg-forest py-10 text-white sm:py-12">
      <Container>
        <div className="grid items-center gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-gold">
              <CheckCircle2 className="h-3.5 w-3.5" />
              {bn ? "নাগরিক সেবা ও গণশুনানি" : "Citizen Services"}
            </p>
            <h2 className="bn-heading mt-2 text-2xl leading-snug text-white sm:text-3xl">
              {bn ? "আপনার এলাকার সমস্যা সরাসরি জানান" : "Tell Us What Your Area Needs"}
            </h2>
            <p className="bn mt-2 text-[14.5px] leading-relaxed text-[#d5dcd0]">
              {bn
                ? "পটুয়াখালী-৩ আসন ও দেশের যেকোনো নাগরিক সমস্যা, দাবি বা আবেদন সরাসরি নেতার দপ্তরে পাঠাতে পারেন।"
                : "Submit constituency concerns, grievances, or community needs directly to the MP's office."}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-[12px] font-medium text-[#cfd6cb]">
              <span className="flex items-center gap-1.5">
                <FileText className="h-3.5 w-3.5 text-gold" />
                {bn ? "সহজ ফর্ম পূরণ" : "Easy Intake"}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Search className="h-3.5 w-3.5 text-gold" />
                {bn ? "অনলাইন ট্র্যাকিং" : "Track Progress"}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-gold" />
                {bn ? "দাপ্তরিক পর্যালোচনা" : "Official Review"}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:justify-end">
            <Link
              href={localePath(locale, "/services")}
              className="inline-flex h-12 items-center justify-center rounded-[2px] border border-gold bg-gold px-7 text-[14.5px] font-bold text-forest-ink shadow-sm transition-colors hover:border-white hover:bg-white"
            >
              {bn ? "অনুরোধ জমা দিন" : "Submit Request"}
            </Link>
            <Link
              href={localePath(locale, "/services/track")}
              className="inline-flex h-12 items-center justify-center rounded-[2px] border border-white/40 px-6 text-[14px] font-semibold text-white transition-colors hover:border-white hover:bg-white/10"
            >
              {bn ? "আবেদন ট্র্যাক করুন" : "Track Request"}
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

/** Compact contact strip. */
export function ContactStrip({ locale }: { locale: Locale }) {
  const bn = locale === "bn";
  return (
    <section className="border-t border-line bg-white py-8">
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="bn-heading text-lg text-forest">
              {bn ? "যোগাযোগ ও সংসদীয় কার্যালয়" : "Constituency Office & Contact"}
            </h3>
            <p className="bn text-[13px] text-muted">
              {bn
                ? "পটুয়াখালী-৩ (গলাচিপা · দশমিনা) সংসদীয় কার্যালয় ও ঢাকা যোগাযোগ।"
                : "Patuakhali-3 (Galachipa · Dashmina) office & Dhaka contact."}
            </p>
          </div>
          <Link
            href={localePath(locale, "/contact")}
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-forest underline hover:text-forest-deep"
          >
            {bn ? "যোগাযোগ ও ঠিকানা দেখুন" : "View Office Details"} →
          </Link>
        </div>
      </Container>
    </section>
  );
}
