import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Locale } from "@/i18n/config";
import { isLocale } from "@/i18n/config";
import { pageMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { PageHeader } from "@/components/shared/page-header";
import { Container } from "@/components/ui/layout";
import { ParliamentBrowser } from "@/components/parliament/parliament-browser";
import { parliamentActivities } from "@/content/parliament";

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
    path: "/parliament",
    title: bn ? "সংসদে — কর্মকাণ্ড আর্কাইভ" : "In parliament — activity archive",
    description: bn
      ? "জাতীয় সংসদে বক্তৃতা, লিখিত-মৌখিক প্রশ্ন, কমিটি ও দাপ্তরিক দায়িত্ব — উৎসসহ যাচাইকৃত আর্কাইভ।"
      : "Speeches, written and oral questions, committee work and formal responsibilities in the national parliament — a verified archive with sources.",
  });
}

export default async function ParliamentPage({
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
      <Breadcrumbs locale={locale} items={[{ label: bn ? "সংসদ" : "Parliament" }]} />
      <PageHeader
        kicker={bn ? "সংসদীয় আর্কাইভ" : "Parliament archive"}
        title={bn ? "সংসদে — কর্মকাণ্ডের আর্কাইভ" : "In parliament — the archive"}
        description={
          bn
            ? "বক্তৃতা, প্রশ্ন, বিল, কমিটি বৈঠক ও দাপ্তরিক দায়িত্ব — ধরন অনুযায়ী ফিল্টার করুন, অনুসন্ধান করুন। সংসদীয় কাজকে মন্ত্রীসভার বা দলীয় কার্যক্রম থেকে আলাদা রাখা হয়েছে।"
            : "Speeches, questions, bills, committee meetings and formal responsibilities — filter by type or search. Parliamentary work is kept separate from ministerial and party activity."
        }
      />
      <section className="bg-white py-10 sm:py-14">
        <Container>
          <ParliamentBrowser items={parliamentActivities} locale={locale} />
        </Container>
      </section>
    </>
  );
}
