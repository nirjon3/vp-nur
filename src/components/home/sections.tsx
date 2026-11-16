import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Mic, Camera, MessagesSquare, Video, CalendarClock, Landmark, Play } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { localePath } from "@/i18n/config";
import { Container } from "@/components/ui/layout";
import { formatDateShort } from "@/lib/format";
import { speeches } from "@/content/speeches";
import { mediaItems } from "@/content/media";

/** 07 — Speeches & interviews preview. */
export function SpeechesSection({ locale }: { locale: Locale }) {
  const bn = locale === "bn";
  return (
    <section className="border-t border-line bg-offwhite py-12 sm:py-14">
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4">
            <p className="flex items-baseline gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-gold-deep">
              <span aria-hidden="true" className="tabular-nums">০৭</span>
              <span>{bn ? "বক্তৃতা ও সাক্ষাৎকার" : "Speeches & interviews"}</span>
            </p>
            <h2 className="bn-heading mt-2 text-2xl text-forest">
              {bn ? "নিজের কণ্ঠে" : "In his own voice"}
            </h2>
            <Link
              href={localePath(locale, "/speeches")}
              className="group mt-4 inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.12em] text-forest hover:text-forest-deep"
            >
              {bn ? "সম্পূর্ণ আর্কাইভ" : "Full archive"}
              <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
          <ul className="divide-y divide-line border-y border-line lg:col-span-8">
            {speeches.map((s) => (
              <li key={s.id} className="grid grid-cols-[auto_1fr] items-center gap-4 py-4 sm:grid-cols-[auto_1fr_auto]">
                <span className="flex h-11 w-11 items-center justify-center rounded-[2px] bg-forest/5 text-forest">
                  {s.durationMinutes && s.durationMinutes >= 15 ? (
                    <MessagesSquare aria-hidden="true" className="h-5 w-5" />
                  ) : (
                    <Mic aria-hidden="true" className="h-5 w-5" />
                  )}
                </span>
                <span>
                  <span className="bn-heading block text-[15.5px] leading-snug text-charcoal">{s.title[locale]}</span>
                  <span className="mt-1 block text-[12px] text-muted">
                    <time dateTime={s.date}>{formatDateShort(s.date, locale)}</time>
                    {s.location ? ` · ${s.location[locale]}` : ""}
                    {s.durationMinutes ? ` · ${s.durationMinutes} ${bn ? "মিনিট" : "min"}` : ""}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

const kindIcon = { photo: Camera, video: Video, interview: MessagesSquare, speech: Mic, event: CalendarClock } as const;

/** 08 — Media highlights: labelled editorial placeholder tiles. */
export function MediaSection({ locale }: { locale: Locale }) {
  const bn = locale === "bn";
  const items = mediaItems.slice(0, 6);

  return (
    <section className="border-t border-line bg-white py-12 sm:py-16">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="flex items-baseline gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-gold-deep">
              <span aria-hidden="true" className="tabular-nums">০৮</span>
              <span>{bn ? "মিডিয়া" : "Media"}</span>
            </p>
            <h2 className="bn-heading mt-2 text-2xl text-forest sm:text-3xl">
              {bn ? "আলোকচিত্র ও ভিডিও" : "Photographs and videos"}
            </h2>
          </div>
          <Link
            href={localePath(locale, "/media")}
            className="group inline-flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-[0.12em] text-forest hover:text-forest-deep"
          >
            {bn ? "মিডিয়া সেন্টার" : "Media centre"}
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
        <p className="mt-3 flex items-center gap-2 text-[11.5px] text-muted">
          <Landmark aria-hidden="true" className="h-4 w-4 text-forest" />
          {bn
            ? "জাতীয় সংসদ, বিভিন্ন গণমাধ্যম ও উন্মুক্ত আর্কাইভ থেকে সংগৃহীত ও যাচাইকৃত আলোকচিত্র ও ভিডিও।"
            : "Verified photographs and video recordings curated from parliament, public media, and open archives."}
        </p>
      </Container>
    </section>
  );
}

/** 09 — Citizen services wide band. */
export function ServicesBand({ locale }: { locale: Locale }) {
  const bn = locale === "bn";
  return (
    <section className="bg-forest py-12 text-white sm:py-14">
      <Container>
        <div className="grid items-center gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-gold">
              {bn ? "নাগরিক সেবা" : "Citizen services"}
            </p>
            <h2 className="bn-heading mt-2 text-2xl leading-snug text-white sm:text-3xl">
              {bn ? "আপনার এলাকার সমস্যা, আমাদের জানান" : "Tell us what your area needs"}
            </h2>
            <p className="bn mt-3 max-w-2xl text-[15px] leading-7 text-[#d5dcd0]">
              {bn
                ? "একটি সংক্ষিপ্ত ফর্ম পূরণ করুন, একটি ট্র্যাকিং নম্বর পান এবং যেকোনো সময় অনুরোধের অগ্রগতি দেখুন। তথ্য শুধু অনুমোদিত সেবাকর্মীদের কাছে পৌঁছায়।"
                : "Fill in a short form, receive a tracking reference and check its progress any time. Your details reach only authorised service operators."}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:flex-col">
            <Link
              href={localePath(locale, "/services")}
              className="inline-flex h-12 items-center justify-center rounded-[2px] border border-gold bg-gold px-6 text-[15px] font-bold text-forest-ink transition-colors hover:bg-white hover:border-white"
            >
              {bn ? "অনুরোধ জমা দিন" : "Submit a request"}
            </Link>
            <Link
              href={localePath(locale, "/services/track")}
              className="inline-flex h-12 items-center justify-center rounded-[2px] border border-white/30 px-6 text-[15px] font-semibold text-white transition-colors hover:border-white hover:bg-white/10"
            >
              {bn ? "অনুরোধ ট্র্যাক করুন" : "Track a request"}
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

/** 10 — Compact contact strip with honest pending states. */
export function ContactStrip({ locale }: { locale: Locale }) {
  const bn = locale === "bn";
  return (
    <section className="border-t border-line bg-white py-10">
      <Container>
        <div className="grid items-center gap-6 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-gold-deep">
              {bn ? "যোগাযোগ" : "Contact"}
            </p>
            <p className="bn-heading mt-1 text-xl text-forest">
              {bn ? "অফিসে অথবা অনলাইনে" : "In person or online"}
            </p>
          </div>
          <div className="bn text-[14px] leading-7 text-body lg:col-span-6">
            <p>
              {bn
                ? "যাচাইকৃত অফিস ঠিকানা, ফোন নম্বর ও ইমেইল শিগগিরই এখানে প্রকাশিত হবে। প্রয়োজনে নাগরিক সেবা ফর্ম ব্যবহার করুন।"
                : "Verified office address, phone and email will be published here shortly. In the meantime, please use the citizen services form."}
            </p>
          </div>
          <div className="lg:col-span-2 lg:text-right">
            <Link
              href={localePath(locale, "/contact")}
              className="inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.12em] text-forest hover:text-forest-deep"
            >
              {bn ? "যোগাযোগ পৃষ্ঠা" : "Contact page"}
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
