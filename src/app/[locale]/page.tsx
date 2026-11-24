import type { Metadata } from "next";
import type { Locale } from "@/i18n/config";
import { isLocale } from "@/i18n/config";
import { pageMetadata } from "@/lib/seo";
import { Hero } from "@/components/home/hero";
import { BioSection } from "@/components/home/bio";
import { ParliamentSection } from "@/components/home/parliament";
import { ConstituencySection } from "@/components/home/constituency";
import { InitiativesSection } from "@/components/home/initiatives";
import { NewsSection } from "@/components/home/news";
import {
  SpeechesSection,
  MediaSection,
  ServicesBand,
  ContactStrip,
} from "@/components/home/sections";
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
      ? "নুরুল হক নুর — ভিপি নুর | জাতীয় সংসদ সদস্য, পটুয়াখালী-৩"
      : "Nurul Haque Nur — VP Nur | Member of Parliament, Patuakhali-3",
    description: bn
      ? "নুরুল হক নুরের সংসদীয় কর্মকাণ্ড, গালাচিপা–দশমিনার উন্নয়ন উদ্যোগ, সংবাদ, বক্তৃতা ও নাগরিক সেবার তথ্য।"
      : "Parliamentary activities, Galachipa–Dashmina initiatives, news, speeches and citizen services for and by Nurul Haque Nur.",
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

  return (
    <>
      {/* 1. Hero: Confident identity, vision & portrait */}
      <Hero locale={locale} />

      {/* 2. Direct Citizen Connect: Immediate utility for people */}
      <ServicesBand locale={locale} />

      {/* 3. Visual Media & Action: Photos & Field work */}
      <MediaSection locale={locale} />

      {/* 4. Speeches & Voice: Playable video recordings */}
      <SpeechesSection locale={locale} />

      {/* 5. Tangible Work: Local development projects */}
      <InitiativesSection locale={locale} />

      {/* 6. Overview: DUCSU VP to Parliament milestones */}
      <BioSection locale={locale} />

      {/* 7. Parliament: Questions and legislative motions */}
      <ParliamentSection locale={locale} />

      {/* 8. Latest News: Press and official statements */}
      <NewsSection locale={locale} />

      {/* 9. Constituency: Galachipa · Dashmina map & priorities */}
      <ConstituencySection locale={locale} />

      {/* 10. Contact: Office address & reach out */}
      <ContactStrip locale={locale} />
    </>
  );
}
