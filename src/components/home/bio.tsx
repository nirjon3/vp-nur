import type { Locale } from "@/i18n/config";
import { localePath } from "@/i18n/config";
import Link from "next/link";
import { ArrowRight, Award, Landmark } from "lucide-react";
import { Container } from "@/components/ui/layout";
import { timeline } from "@/content/timeline";

/** Brief biography with clean highlight cards. */
export function BioSection({ locale }: { locale: Locale }) {
  const bn = locale === "bn";

  const highlights = [
    {
      icon: Landmark,
      title: bn ? "মাননীয় প্রতিমন্ত্রী" : "Hon'ble State Minister",
      desc: bn ? "প্রবাসী কল্যাণ ও বৈদেশিক কর্মসংস্থান মন্ত্রণালয়" : "Ministry of Expatriates' Welfare & Overseas Employment",
    },
    {
      icon: Award,
      title: bn ? "ডাকসু ভিপি (২০১৯)" : "DUCSU VP (2019)",
      desc: bn ? "ঢাকা বিশ্ববিদ্যালয় কেন্দ্রীয় ছাত্র সংসদ" : "Dhaka University Central Students' Union",
    },
    {
      icon: Landmark,
      title: bn ? "সংসদ সদস্য" : "Member of Parliament",
      desc: bn ? "পটুয়াখালী-৩ (গালাচিপা · দশমিনা)" : "Patuakhali-3 (Galachipa · Dashmina)",
    },
  ];

  return (
    <section className="bg-white py-12 sm:py-16">
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <h2 className="bn-heading text-2xl leading-snug text-forest sm:text-3xl">
              {bn ? "ছাত্ররাজনীতি থেকে জাতীয় পর্যায়ে" : "From Student Politics to Parliament"}
            </h2>
            <p className="bn mt-4 text-[15px] leading-relaxed text-body">
              {bn
                ? "কোটা সংস্কার আন্দোলন ও ডাকসু নির্বাচনের মাধ্যমে জাতীয় রাজনীতিতে উত্থান। বর্তমানে গণপ্রজাতন্ত্রী বাংলাদেশ সরকারের প্রবাসী কল্যাণ ও বৈদেশিক কর্মসংস্থান মন্ত্রণালয়ের মাননীয় প্রতিমন্ত্রী এবং পটুয়াখালী-৩ আসনের সংসদ সদস্য হিসেবে দায়িত্ব পালন করছেন।"
                : "Emerged into national politics through student activism and the historic DUCSU election. Currently serving as State Minister for the Ministry of Expatriates' Welfare & Overseas Employment, and Member of Parliament for Patuakhali-3."}
            </p>
            <Link
              href={localePath(locale, "/about")}
              className="group mt-6 inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.12em] text-forest hover:text-forest-deep"
            >
              {bn ? "সম্পূর্ণ জীবনী" : "Full Profile"}
              <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:col-span-7">
            {highlights.map((h, i) => {
              const Icon = h.icon;
              return (
                <div
                  key={i}
                  className="flex flex-col justify-between rounded-[2px] border border-line bg-offwhite p-5 transition-colors hover:border-forest"
                >
                  <Icon className="h-6 w-6 text-forest" />
                  <div className="mt-4">
                    <h3 className="bn-heading text-[16px] text-charcoal">{h.title}</h3>
                    <p className="bn mt-1 text-[13px] text-muted">{h.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}

/** Chronological journey strip. */
export function JourneySection({ locale }: { locale: Locale }) {
  const bn = locale === "bn";
  return (
    <section className="border-t border-line bg-offwhite py-10 sm:py-12">
      <Container>
        <div className="flex items-center justify-between">
          <h2 className="bn-heading text-xl text-forest sm:text-2xl">
            {bn ? "গুরুত্বপূর্ণ সময়রেখা" : "Milestones"}
          </h2>
          <Link
            href={localePath(locale, "/about")}
            className="text-[12px] font-semibold text-forest hover:underline"
          >
            {bn ? "সম্পূর্ণ সময়রেখা →" : "View timeline →"}
          </Link>
        </div>

        <ol className="mt-5 flex snap-x snap-mandatory gap-0 overflow-x-auto border-y border-line [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {timeline.map((item) => (
            <li
              key={item.id}
              className="w-[220px] shrink-0 snap-start border-r border-line bg-white px-5 py-5 last:border-r-0 sm:w-[240px]"
            >
              <span className="bn block text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
                {typeof item.date === "string" ? item.date : item.date[locale]}
              </span>
              <span className="bn-heading mt-1.5 block text-[14.5px] leading-snug text-forest">
                {item.title[locale]}
              </span>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
