import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Locale } from "@/i18n/config";
import { isLocale } from "@/i18n/config";
import { pageMetadata } from "@/lib/seo";
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
      ? "জাতীয় সংসদে বক্তৃতা, লিখিত-মৌখিক প্রশ্ন, বিল, কমিটি ও দাপ্তরিক দায়িত্ব — প্রাতিষ্ঠানিক আর্কাইভ।"
      : "Speeches, written and oral questions, bills, committee work and formal responsibilities in the national parliament — an official archive.",
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
      <PageHeader
        title={bn ? "সংসদে — কর্মকাণ্ডের আর্কাইভ" : "In Parliament — Activity Archive"}
      />

      <section className="bg-white py-10 sm:py-14">
        <Container>
          {/* Featured Landmark Parliamentary Statement Banner */}
          <div className="relative mb-10 overflow-hidden rounded-xl border border-line bg-gradient-to-r from-forest-ink via-forest to-forest-deep p-6 sm:p-8 text-white shadow-md">
            <div className="relative z-10 max-w-3xl">
              <blockquote className="bn-heading text-[17px] font-bold leading-relaxed text-white sm:text-[21px]">
                {bn
                  ? "“উপকূলীয় নদীভাঙন রোধে স্থায়ী টেকসই বাঁধ নির্মাণ এবং রেমিট্যান্স যোদ্ধাদের অধিকার সুরক্ষা আমাদের সর্বোচ্চ জাতীয় অঙ্গীকার।”"
                  : "“Permanent coastal embankments and safeguarding the dignity and rights of our remittance heroes are our highest national commitment.”"}
              </blockquote>
              <div className="mt-4 flex flex-wrap items-center gap-2 text-[12px] text-[#c9d5c5]">
                <span className="font-semibold text-white">
                  {bn ? "মো. নুরুল হক, এমপি" : "Md. Nurul Hoque, MP"}
                </span>
                <span>•</span>
                <span>
                  {bn
                    ? "প্রতিমন্ত্রী, প্রবাসী কল্যাণ ও বৈদেশিক কর্মসংস্থান মন্ত্রণালয় · সংসদ সদস্য, পটুয়াখালী-৩"
                    : "State Minister & Member of Parliament"}
                </span>
              </div>
            </div>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-10 -bottom-10 h-64 w-64 rounded-full bg-gold/10 blur-2xl"
            />
          </div>

          {/* Activity Archive with Smart Filters and Institutional Cards */}
          <ParliamentBrowser items={parliamentActivities} locale={locale} />
        </Container>
      </section>
    </>
  );
}
