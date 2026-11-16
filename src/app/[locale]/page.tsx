import type { Metadata } from "next";
import type { Locale } from "@/i18n/config";
import { isLocale } from "@/i18n/config";
import { pageMetadata } from "@/lib/seo";
import { Hero } from "@/components/home/hero";
import { BioSection, JourneySection } from "@/components/home/bio";
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
import { InterludeSection } from "@/components/home/interlude";
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
      ? "নুরুল হক নুরের সংসদীয় কর্মকাণ্ড, গালাচিপা–দশমিনার উন্নয়ন উদ্যোগ, সংবাদ, বক্তৃতা ও নাগরিক সেবার তথ্য — যাচাইকৃত উৎসসহ।"
      : "Parliamentary activities, Galachipa–Dashmina initiatives, news, speeches and citizen services for and by Nurul Haque Nur — with verifiable sources.",
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
      <Hero locale={locale} />
      <BioSection locale={locale} />
      <JourneySection locale={locale} />
      <ParliamentSection locale={locale} />
      <ConstituencySection locale={locale} />
      <InitiativesSection locale={locale} />
      <NewsSection locale={locale} />
      <SpeechesSection locale={locale} />
      <MediaSection locale={locale} />
      <InterludeSection locale={locale} />
      <ServicesBand locale={locale} />
      <ContactStrip locale={locale} />
    </>
  );
}
