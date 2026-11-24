import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Locale } from "@/i18n/config";
import { isLocale } from "@/i18n/config";
import { pageMetadata } from "@/lib/seo";
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
      <PageHeader
        title={bn ? "বক্তৃতা, সাক্ষাৎকার ও ভিডিও" : "Speeches, Interviews & Videos"}
      />
      <section className="bg-white py-10 sm:py-14">
        <Container>
          <SpeechList items={speeches} locale={locale} />
        </Container>
      </section>
    </>
  );
}
