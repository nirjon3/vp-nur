import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Locale } from "@/i18n/config";
import { isLocale } from "@/i18n/config";
import { pageMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { PageHeader } from "@/components/shared/page-header";
import { Container } from "@/components/ui/layout";
import { SpeechList } from "@/components/speeches/speech-list";
import { speeches } from "@/content/speeches";

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
    path: "/speeches",
    title: bn ? "বক্তৃতা ও সাক্ষাৎকার আর্কাইভ" : "Speeches and interviews archive",
    description: bn
      ? "তারিখ, বিষয় ও স্থানসহ বক্তৃতা ও সাক্ষাৎকারের যাচাইকৃত আর্কাইভ।"
      : "A verified archive of speeches and interviews with date, subject and location.",
  });
}

export default async function SpeechesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const bn = locale === "bn";

  return (
    <>
      <Breadcrumbs locale={locale} items={[{ label: bn ? "বক্তৃতা ও সাক্ষাৎকার" : "Speeches & interviews" }]} />
      <PageHeader
        kicker={bn ? "আর্কাইভ" : "Archive"}
        title={bn ? "বক্তৃতা ও সাক্ষাৎকার" : "Speeches and interviews"}
        description={
          bn
            ? "সংসদীয় ভাষণ, মিডিয়া সাক্ষাৎকার ও জনসভা — তারিখ, বিষয় ও স্থানসহ। সংক্ষিপ্ত ও দীর্ঘ দুই ফরম্যাটের রেকর্ড এখানে সংরক্ষিত হয়।"
            : "Parliamentary addresses, media interviews and public meetings — with date, subject and location. Both short clips and full-length recordings live here."
        }
      />
      <section className="bg-white py-10 sm:py-14">
        <Container>
          <SpeechList items={speeches} locale={locale} />
        </Container>
      </section>
    </>
  );
}
