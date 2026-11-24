import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Hind_Siliguri, Manrope } from "next/font/google";
import { isLocale, localePath, type Locale } from "@/i18n/config";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FloatingLanguageSwitcher } from "@/components/layout/floating-language-switcher";
import { BackgroundWatermark } from "@/components/shared/background-watermark";
import { getDictionary } from "@/i18n/dictionaries";
import "../globals.css";

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hind-siliguri",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export function generateStaticParams() {
  return [{ locale: "bn" }, { locale: "en" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isBn = locale === "bn";
  return {
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL ?? "https://nurulhaquenur.com.bd",
    ),
    title: {
      default: isBn
        ? "মো. নুরুল হক, এমপি (ভিপি নুর) | প্রতিমন্ত্রী, প্রবাসী কল্যাণ ও বৈদেশিক কর্মসংস্থান মন্ত্রণালয়"
        : "Md. Nurul Hoque, MP (VP Nur) | State Minister, Ministry of Expatriates' Welfare & Overseas Employment",
      template: isBn ? "%s — মো. নুরুল হক, এমপি" : "%s — Md. Nurul Hoque, MP",
    },
    description: isBn
      ? "গণপ্রজাতন্ত্রী বাংলাদেশ সরকারের প্রবাসী কল্যাণ ও বৈদেশিক কর্মসংস্থান মন্ত্রণালয়ের মাননীয় প্রতিমন্ত্রী এবং পটুয়াখালী-৩ আসনের সংসদ সদস্য মো. নুরুল হক (ভিপি নুর)–এর অফিশিয়াল পোর্টাল।"
      : "Official website of Md. Nurul Hoque, MP (VP Nur), State Minister for the Ministry of Expatriates' Welfare and Overseas Employment, and Member of Parliament for Patuakhali-3.",
    applicationName: isBn ? "মো. নুরুল হক, এমপি" : "Md. Nurul Hoque, MP",
    formatDetection: { telephone: false },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);

  return (
    <html lang={locale === "bn" ? "bn" : "en"} className={`${hindSiliguri.variable} ${manrope.variable}`}>
      <body className="min-h-dvh bg-white font-sans text-body antialiased">
        <Header locale={locale} />
        <main id="main-content">{children}</main>
        <Footer locale={locale} />
        <FloatingLanguageSwitcher locale={locale} />
        <BackgroundWatermark />
        <p className="sr-only">
          {localePath(locale)} — {dict.site.tagline}
        </p>
      </body>
    </html>
  );
}
