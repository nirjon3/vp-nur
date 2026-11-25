import type { Metadata } from "next";
import type { Locale } from "@/i18n/config";
import { isLocale } from "@/i18n/config";
import { pageMetadata } from "@/lib/seo";
import { Hero } from "@/components/home/hero";
import { ImpactNumbers } from "@/components/home/impact-numbers";
import { QuoteBanner } from "@/components/home/quote-banner";
import { ParliamentSection } from "@/components/home/parliament";
import { ConstituencySection } from "@/components/home/constituency";
import { InitiativesSection } from "@/components/home/initiatives";
import {
  SpeechesSection,
  MediaSection,
  ServicesBand,
  ContactStrip,
} from "@/components/home/sections";
import { getLiveInitiatives, getLiveParliamentActivities } from "@/lib/cms-live";
import { notFound } from "next/navigation";

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
    path: "/",
    title: bn
      ? "মো. নুরুল হক, এমপি (ভিপি নুর) | প্রতিমন্ত্রী, প্রবাসী কল্যাণ ও বৈদেশিক কর্মসংস্থান মন্ত্রণালয়"
      : "Md. Nurul Hoque, MP (VP Nur) | State Minister, Ministry of Expatriates' Welfare & Overseas Employment",
    description: bn
      ? "গণপ্রজাতন্ত্রী বাংলাদেশ সরকারের প্রবাসী কল্যাণ ও বৈদেশিক কর্মসংস্থান মন্ত্রণালয়ের মাননীয় প্রতিমন্ত্রী এবং পটুয়াখালী-৩ আসনের সংসদ সদস্য মো. নুরুল হক (ভিপি নুর)–এর অফিশিয়াল পোর্টাল।"
      : "Official portal of Md. Nurul Hoque, MP (VP Nur), State Minister for the Ministry of Expatriates' Welfare and Overseas Employment, and Member of Parliament for Patuakhali-3.",
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const [initiatives, parliamentActivities] = await Promise.all([
    getLiveInitiatives(),
    getLiveParliamentActivities(),
  ]);

  return (
    <>
      {/* 1. Hero: Confident identity, vision & portrait */}
      <Hero locale={locale} />

      {/* 2. Key Impact Figures & Leadership Stats */}
      <ImpactNumbers locale={locale} />

      {/* 3. Direct Citizen Connect: Immediate utility for people */}
      <ServicesBand locale={locale} />

      {/* 4. Visual Media & Action: Photos & Field work (4:3 Marquee) */}
      <MediaSection locale={locale} />

      {/* 5. Speeches & Voice: Playable video recordings */}
      <SpeechesSection locale={locale} />

      {/* 6. Leadership Quote: Dignified Statement with Author Badge */}
      <QuoteBanner locale={locale} />

      {/* 7. Tangible Work: Local development projects */}
      <InitiativesSection locale={locale} items={initiatives} />

      {/* 8. Parliament: Questions and legislative motions */}
      <ParliamentSection locale={locale} items={parliamentActivities} />

      {/* 9. Constituency: Galachipa · Dashmina map & priority cards */}
      <ConstituencySection locale={locale} />

      {/* 10. Contact: Office address & reach out */}
      <ContactStrip locale={locale} />
    </>
  );
}
