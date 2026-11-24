import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Landmark, Award, ShieldCheck, Play } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { localePath } from "@/i18n/config";

export function Hero({ locale }: { locale: Locale }) {
  const bn = locale === "bn";

  return (
    <section className="relative overflow-hidden border-b border-line bg-gradient-to-b from-[#fbfdfa] via-[#f7f9f5] to-white">
      {/* Ambient background glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-0 h-[450px] w-[450px] rounded-full bg-forest/5 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 -left-20 h-[350px] w-[350px] -translate-y-1/2 rounded-full bg-gold/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10">
        <div className="grid items-center gap-10 py-10 sm:py-14 lg:grid-cols-12 lg:gap-14 lg:py-16">
          {/* Left Column: Identity & Purpose */}
          <div className="flex flex-col justify-center lg:col-span-7">
            {/* Live status badge pill */}
            <div className="inline-flex w-fit items-center gap-2.5 rounded-full border border-forest/15 bg-white/95 px-3.5 py-1.5 shadow-xs backdrop-blur-xs">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-600" />
              </span>
              <span className="text-[13px] font-semibold text-forest">
                {bn ? "জাতীয় সংসদ সদস্য" : "Member of Parliament"}
              </span>
              <span className="text-muted/40">•</span>
              <span className="text-[12.5px] font-medium text-muted">
                {bn ? "পটুয়াখালী-৩ (গালাচিপা–দশমিনা)" : "Patuakhali-3 (Galachipa–Dashmina)"}
              </span>
            </div>

            {/* Main Name Heading */}
            <h1 className="bn-heading mt-5 text-[44px] font-extrabold leading-[1.08] tracking-tight text-forest sm:text-6xl lg:text-[72px]">
              {bn ? "নুরুল হক নুর" : "Nurul Haque Nur"}
            </h1>

            {/* Familiar Title Tag */}
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <span className="text-xl font-bold text-gold-deep sm:text-2xl font-sans">
                {bn ? "ভিপি নুর" : "VP Nur"}
              </span>
              <span className="text-muted/40">•</span>
              <span className="text-[14.5px] font-medium text-muted">
                {bn ? "সাবেক ভিপি, ডাকসু (২০১৯)" : "Former DUCSU VP (2019)"}
              </span>
            </div>

            {/* Vision narrative */}
            <p className="bn mt-5 max-w-xl text-[16px] leading-relaxed text-body sm:text-[17.5px]">
              {bn
                ? "উপকূলীয় জনগোষ্ঠীর নাগরিক অধিকার, টেকসই বেড়িবাঁধ উন্নয়ন ও স্বচ্ছ জবাবদিহিতার অঙ্গীকার নিয়ে জনসেবায় নিবেদিত।"
                : "Dedicated to citizen welfare, sustainable coastal development, and accountable public representation."}
            </p>

            {/* Call to Actions */}
            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <Link
                href={localePath(locale, "/services")}
                className="group inline-flex h-12 items-center gap-2 rounded-[2px] bg-forest px-6 text-[14.5px] font-semibold text-white shadow-sm transition-all hover:bg-forest-deep hover:shadow-md"
              >
                <span>{bn ? "নাগরিক সেবা ও আবেদন" : "Citizen Services"}</span>
                <ArrowRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                />
              </Link>
              <Link
                href={localePath(locale, "/about")}
                className="inline-flex h-12 items-center gap-2 rounded-[2px] border border-line-strong bg-white px-6 text-[14.5px] font-semibold text-forest shadow-xs transition-colors hover:border-forest hover:bg-offwhite"
              >
                <span>{bn ? "জীবনবৃত্তান্ত" : "Read Profile"}</span>
              </Link>
              <Link
                href={localePath(locale, "/speeches")}
                className="inline-flex h-12 items-center gap-2 px-3 text-[13.5px] font-semibold text-muted transition-colors hover:text-forest"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gold/15 text-gold-deep">
                  <Play className="h-3 w-3 fill-current pl-0.5" />
                </span>
                <span>{bn ? "ভিডিও বক্তব্য" : "Watch Speeches"}</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Hero Portrait with Floating Glass Accents */}
          <div className="lg:col-span-5">
            <figure className="relative mx-auto max-w-md lg:max-w-none">
              {/* Soft glow behind image */}
              <div
                aria-hidden="true"
                className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-forest/10 via-gold/15 to-transparent blur-xl"
              />

              {/* DUCSU badge floating top right */}
              <div className="absolute -top-3 -right-2 z-20 hidden items-center gap-2 rounded-full border border-line bg-white/95 px-3.5 py-1.5 shadow-md backdrop-blur-xs sm:inline-flex">
                <Award className="h-4 w-4 text-gold-deep" />
                <span className="text-[12px] font-bold text-forest">
                  {bn ? "ডাকসু ভিপি (২০১৯)" : "DUCSU VP (2019)"}
                </span>
              </div>

              {/* Main portrait frame */}
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2px] border-2 border-white bg-forest-deep shadow-2xl ring-1 ring-black/5">
                <Image
                  src="/images/nurul-haque-nur-portrait.jpg"
                  alt={
                    bn
                      ? "নুরুল হক নুর (ভিপি নুর) — প্রতিকৃতি"
                      : "Nurul Haque Nur (VP Nur) — Official Portrait"
                  }
                  fill
                  priority
                  sizes="(min-width: 1024px) 42vw, (min-width: 640px) 28rem, 100vw"
                  className="object-cover object-[center_18%] transition-transform duration-700 hover:scale-103"
                />

                {/* Subtle gradient at bottom for legibility of floating bar */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-forest-ink/70 via-transparent to-transparent"
                />

                {/* Floating bottom identity strip on portrait */}
                <div className="absolute bottom-4 inset-x-4 z-20 flex items-center justify-between rounded-[2px] border border-white/20 bg-forest-ink/85 p-3.5 text-white backdrop-blur-md shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[2px] bg-gold/20 text-gold">
                      <Landmark className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <p className="text-[13px] font-semibold text-white leading-tight">
                        {bn ? "পটুয়াখালী-৩ আসন" : "Patuakhali-3"}
                      </p>
                      <p className="text-[11.5px] text-[#cbd5c8] leading-tight mt-0.5">
                        {bn ? "গালাচিপা · দশমিনা" : "Galachipa · Dashmina"}
                      </p>
                    </div>
                  </div>
                  <span className="inline-flex items-center rounded-[2px] bg-emerald-500/20 px-2.5 py-1 text-[11px] font-semibold text-emerald-300 border border-emerald-400/30">
                    {bn ? "নির্বাচিত এমপি" : "Elected MP"}
                  </span>
                </div>
              </div>

              <figcaption className="sr-only">
                {bn ? "নুরুল হক নুরের প্রতিকৃতি" : "Portrait of Nurul Haque Nur"}
              </figcaption>
            </figure>
          </div>
        </div>

        {/* Bottom Feature Cards: 3 Key Public Pillars */}
        <div className="grid grid-cols-1 gap-4 border-t border-line/80 py-6 sm:grid-cols-3 sm:gap-6 sm:py-8">
          <div className="flex items-center gap-3.5 rounded-[2px] border border-line bg-white/70 p-4 shadow-2xs transition-colors hover:border-forest/40 hover:bg-white">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[2px] bg-forest/5 text-forest">
              <Landmark className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11.5px] font-semibold text-muted">
                {bn ? "সংসদীয় আসন" : "Parliamentary Seat"}
              </p>
              <p className="bn-heading text-[14.5px] font-bold text-forest mt-0.5">
                {bn ? "পটুয়াখালী-৩ (গালাচিপা–দশমিনা)" : "Patuakhali-3 (Galachipa–Dashmina)"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 rounded-[2px] border border-line bg-white/70 p-4 shadow-2xs transition-colors hover:border-forest/40 hover:bg-white">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[2px] bg-gold/10 text-gold-deep">
              <Award className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11.5px] font-semibold text-muted">
                {bn ? "ঐতিহাসিক ছাত্র সংসদ" : "Historic Students' Union"}
              </p>
              <p className="bn-heading text-[14.5px] font-bold text-forest mt-0.5">
                {bn ? "ডাকসু ভিপি (২০১৯), ঢাবি" : "DUCSU VP (2019), DU"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 rounded-[2px] border border-line bg-white/70 p-4 shadow-2xs transition-colors hover:border-forest/40 hover:bg-white">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[2px] bg-emerald-50 text-emerald-700">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11.5px] font-semibold text-muted">
                {bn ? "নাগরিক সেবা ও যোগাযোগ" : "Direct Citizen Service"}
              </p>
              <p className="bn-heading text-[14.5px] font-bold text-forest mt-0.5">
                {bn ? "অনলাইন আবেদন ও ট্র্যাকিং" : "Online Intake & Tracking"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
