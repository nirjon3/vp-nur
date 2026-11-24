import Link from "next/link";
import {
  FileText,
  Search,
  CheckCircle2,
} from "lucide-react";
import type { Locale } from "@/i18n/config";
import { localePath } from "@/i18n/config";
import { Container } from "@/components/ui/layout";
import { mediaItems } from "@/content/media";
import { MediaCarousel } from "./media-carousel";
import { VideoSpeeches } from "./video-speeches";

/** Speeches & video interviews ("In His Own Voice"). */
export function SpeechesSection({ locale }: { locale: Locale }) {
  const videoItems = mediaItems.filter((item) => Boolean(item.youtubeId));
  return <VideoSpeeches items={videoItems} locale={locale} />;
}

/** Photo gallery: continuous smooth scrolling 4:3 carousel. */
export function MediaSection({ locale }: { locale: Locale }) {
  const photoItems = mediaItems.filter((item) => !item.youtubeId);
  return (
    <section className="border-t border-line bg-white py-10 sm:py-14">
      <MediaCarousel items={photoItems} locale={locale} />
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
            <h2 className="bn-heading text-2xl leading-snug text-white sm:text-3xl">
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
