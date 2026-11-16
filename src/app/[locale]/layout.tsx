import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Hind_Siliguri, Manrope } from "next/font/google";
import { isLocale, localePath, type Locale } from "@/i18n/config";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
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
        ? "নুরুল হক নুর — ভিপি নুর | জাতীয় সংসদ সদস্য, পটুয়াখালী-৩"
        : "Nurul Haque Nur — VP Nur | Member of Parliament, Patuakhali-3",
      template: isBn ? "%s — নুরুল হক নুর" : "%s — Nurul Haque Nur",
    },
    description: isBn
      ? "নুরুল হক নুর (ভিপি নুর)–এর সংসদীয় কর্মকাণ্ড, গালাচিপা–দশমিনার উন্নয়ন উদ্যোগ, সংবাদ ও সহজে যোগাযোগের তথ্য।"
      : "Official public information on Nurul Haque Nur (VP Nur): parliamentary activities, Galachipa–Dashmina initiatives, news and citizen services.",
    applicationName: isBn ? "নুরুল হক নুর" : "Nurul Haque Nur",
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
        <p className="sr-only">
          {localePath(locale)} — {dict.site.tagline}
        </p>
      </body>
    </html>
  );
}
