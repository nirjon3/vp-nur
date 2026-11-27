import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  Sparkles,
  GraduationCap,
  Award,
  Megaphone,
  Landmark,
  Building2,
  Flag,
} from "lucide-react";
import type { Locale } from "@/i18n/config";
import { isLocale, localePath } from "@/i18n/config";
import { pageMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { PageHeader } from "@/components/shared/page-header";
import { Container } from "@/components/ui/layout";
import { getLiveTimeline } from "@/lib/cms-live";

const timelineMeta = [
  {
    icon: Sparkles,
    tag: { bn: "জন্ম ও শৈশব", en: "Early Life" },
  },
  {
    icon: GraduationCap,
    tag: { bn: "উচ্চশিক্ষা", en: "Education" },
  },
  {
    icon: Megaphone,
    tag: { bn: "কোটা সংস্কার", en: "Student Movement" },
  },
  {
    icon: Award,
    tag: { bn: "ডাকসু ভিপি", en: "DUCSU Leadership" },
  },
  {
    icon: Flag,
    tag: { bn: "গণঅধিকার পরিষদ", en: "Party Foundation" },
  },
  {
    icon: Landmark,
    tag: { bn: "সংসদ সদস্য", en: "Member of Parliament" },
  },
  {
    icon: Building2,
    tag: { bn: "মাননীয় প্রতিমন্ত্রী", en: "Hon'ble State Minister" },
  },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const bn = locale === "bn";
  return pageMetadata({
    locale: locale as Locale,
    path: "/about",
    title: bn ? "পরিচয় — নুরুল হক নুর (ভিপি নুর)" : "About — Nurul Haque Nur (VP Nur)",
    description: bn
      ? "নুরুল হক নুরের প্রারম্ভিক জীবন, ছাত্ররাজনীতি, ডাকসু–র সহ-সভাপতিত্ব, রাজনৈতিক যাত্রা ও বর্তমান দায়িত্ব — উৎসসহ।"
      : "Early life, student politics, DUCSU vice-presidency, political journey and current responsibilities of Nurul Haque Nur — with sources.",
  });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const bn = locale === "bn";
  const timeline = await getLiveTimeline();

  return (
    <>
      <Breadcrumbs
        locale={locale}
        items={[{ label: bn ? "পরিচয়" : "About" }]}
      />
      <PageHeader
        kicker={bn ? "পরিচয়" : "Profile"}
        title={bn ? "নুরুল হক নুর" : "Nurul Haque Nur"}
        description={
          bn
            ? "প্রারম্ভিক জীবন থেকে জাতীয় সংসদ পর্যন্ত — একটি যাচাইকৃত সময়রেখা। প্রতিটি তথ্য উৎসসহ যাচাই করা হওয়ার পরই ‘যাচাইকৃত’ হিসেবে চিহ্নিত হয়।"
            : "From early life to the national parliament — a verified timeline. Every entry is marked verified only after confirmation against a source."
        }
      />

      {/* Intro + portrait */}
      <section className="bg-white py-12 sm:py-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <figure>
                <div className="relative overflow-hidden rounded-[2px] bg-white shadow-md border border-line">
                  <Image
                    src="/images/nur-about-portrait.jpg"
                    alt={
                      bn
                        ? "নুরুল হক নুর (ভিপি নুর) — প্রতিকৃতি"
                        : "Nurul Haque Nur (VP Nur) — Portrait"
                    }
                    width={892}
                    height={1024}
                    className="w-full h-auto block"
                    priority
                    unoptimized
                  />
                </div>
                <figcaption className="mt-3 text-[11.5px] text-muted">
                  {bn
                    ? "মোঃ নুরুল হক (ভিপি নুর) — অফিসিয়াল প্রতিকৃতি।"
                    : "Md. Nurul Haque (VP Nur) — Official Portrait."}
                </figcaption>
              </figure>
            </div>
            <div className="lg:col-span-8">
              <h2 className="bn-heading text-xl text-forest">{bn ? "সংক্ষেপে" : "In brief"}</h2>
              <div className="bn prose-measure mt-4 space-y-4 text-[16px] leading-8 text-body">
                <p>
                  {bn
                    ? "মোঃ নুরুল হক, এমপি (জনপ্রিয় পরিচিতি ভিপি নুর) গণপ্রজাতন্ত্রী বাংলাদেশ সরকারের প্রবাসী কল্যাণ ও বৈদেশিক কর্মসংস্থান মন্ত্রণালয়ের মাননীয় প্রতিমন্ত্রী এবং পটুয়াখালী-৩ (গালাচিপা–দশমিনা) আসনের সংসদ সদস্য। ২০১৯ সালে ঢাকা বিশ্ববিদ্যালয় কেন্দ্রীয় ছাত্র সংসদের (ডাকসু) সহ-সভাপতি নির্বাচিত হওয়ার মধ্য দিয়ে তিনি জাতীয় রাজনৈতিক পরিমণ্ডলে ঐতিহাসিক পরিচিতি লাভ করেন।"
                    : "Md. Nurul Haque, MP (widely known as VP Nur) serves as State Minister for the Ministry of Expatriates' Welfare & Overseas Employment, Government of Bangladesh, and Member of Parliament for Patuakhali-3 (Galachipa–Dashmina). He came to prominent national leadership in 2019 when elected Vice President of DUCSU."}
                </p>
                <p>
                  {bn
                    ? "বর্তমানে তিনি প্রবাসী কর্মীদের অধিকার সুরক্ষা, অভিবাসন খাতের স্বচ্ছতা, রেমিট্যান্স প্রবাহের নিরাপত্তা এবং পটুয়াখালী-৩ আসনের উপকূলীয় বাঁধ ও অবকাঠামোগত উন্নয়নে অগ্রণী ভূমিকা পালন করছেন।"
                    : "Currently, his priorities center on the welfare and rights of migrant workers, transparency in overseas employment, secure remittance flows, and the coastal infrastructure and embankment development of Patuakhali-3."}
                </p>
                <p className="text-[14px] leading-7 text-muted">
                  {bn
                    ? "উইকিপিডিয়া ও প্রাতিষ্ঠানিক নথিপত্র অনুসারে তাঁর জন্ম, শিক্ষা, ছাত্র আন্দোলন, ডাকসু নির্বাচন, দল প্রতিষ্ঠা এবং রাষ্ট্রীয় দায়িত্বের যাবতীয় তথ্য নিচে সবিস্তারে উপস্থাপিত হলো।"
                    : "According to Wikipedia and verified institutional records, detailed records of his early life, education, student activism, DUCSU tenure, party founding, and state responsibilities are presented below."}
                </p>
              </div>
              <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-[2px] border border-line bg-line sm:grid-cols-4">
                {[
                  { k: bn ? "নির্বাহী পদ" : "Executive Role", v: bn ? "প্রতিমন্ত্রী, প্রবাসী কল্যাণ" : "State Minister" },
                  { k: bn ? "সংসদীয় আসন" : "Parliamentary Seat", v: bn ? "পটুয়াখালী-৩" : "Patuakhali-3" },
                  { k: bn ? "এলাকা" : "Areas", v: bn ? "গালাচিপা · দশমিনা" : "Galachipa · Dashmina" },
                  { k: bn ? "পরিচিতি" : "Known as", v: bn ? "ভিপি নুর" : "VP Nur" },
                ].map((item) => (
                  <div key={item.k} className="bg-offwhite p-4">
                    <dt className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted">{item.k}</dt>
                    <dd className="bn mt-1 text-[13px] font-semibold leading-5 text-forest">{item.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Container>
      </section>

      {/* Timeline: Two-column spine layout matching user's reference */}
      <section className="relative border-t border-line bg-gradient-to-b from-[#f8faf7] via-offwhite to-white py-14 sm:py-20">
        <Container>
          {/* Centered section title with underline accent */}
          <div className="mb-12 text-center sm:mb-16">
            <h2 className="bn-heading text-2xl font-bold uppercase tracking-wider text-forest sm:text-3xl lg:text-[34px]">
              {bn ? "যাত্রাপথ এক নজরে" : "The Journey at a Glance"}
            </h2>
            <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-gold/80" />
          </div>

          <div className="relative mx-auto max-w-5xl">
            {/* Center vertical spine (desktop) */}
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-4 bottom-4 hidden w-[2px] -translate-x-1/2 bg-line-strong/80 md:block"
            />

            {/* Left vertical spine (mobile) */}
            <div
              aria-hidden="true"
              className="absolute left-4 top-4 bottom-4 block w-[2px] bg-line-strong/80 md:hidden"
            />

            <div className="space-y-8 md:space-y-12">
              {timeline.map((item, index) => {
                const meta = timelineMeta[index] || {
                  icon: Award,
                  tag: { bn: "মাইলফলক", en: "Milestone" },
                };
                const Icon = meta.icon;
                const isEven = index % 2 === 0;

                return (
                  <div
                    key={item.id}
                    className="relative flex items-center md:justify-between"
                  >
                    {/* Unique Node Icon on Central Spine (Desktop) */}
                    <div
                      aria-hidden="true"
                      className="absolute left-4 top-6 z-10 flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-[4px] border border-forest/30 bg-forest text-gold shadow-sm transition-transform duration-200 hover:scale-110 md:left-1/2"
                      title={meta.tag[locale]}
                    >
                      <Icon className="h-4.5 w-4.5" />
                    </div>

                    {/* Card: Alternating Left / Right on md: screens */}
                    <div
                      className={`ml-11 w-full md:ml-0 md:w-[calc(50%-2.5rem)] ${
                        isEven ? "md:mr-auto" : "md:ml-auto"
                      }`}
                    >
                      <div className="group rounded-xl border border-line bg-white p-6 shadow-2xs transition-all duration-200 hover:-translate-y-0.5 hover:border-forest/40 hover:shadow-md sm:rounded-2xl sm:p-7">
                        {/* Title & Body */}
                        <h3 className="bn-heading text-[18px] font-bold leading-snug text-forest sm:text-[19px]">
                          {item.title[locale]}
                        </h3>
                        <p className="bn mt-3 text-[14.5px] leading-relaxed text-body">
                          {item.body[locale]}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Link to Parliamentary Record */}
            <div className="mt-14 text-center">
              <Link
                href={localePath(locale, "/parliament")}
                className="group inline-flex items-center gap-2 rounded-[2px] border border-forest/20 bg-white px-5 py-2.5 text-[12.5px] font-bold uppercase tracking-[0.1em] text-forest shadow-2xs transition-all hover:border-forest hover:bg-forest hover:text-white"
              >
                {bn ? "সংসদীয় কর্মকাণ্ডের বিবরণ দেখুন" : "View Parliamentary Record"}
                <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
