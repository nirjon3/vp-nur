import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { isLocale, localePath } from "@/i18n/config";
import { pageMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Container } from "@/components/ui/layout";
import { VerificationBadge, SourceLine } from "@/components/shared/verification";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/format";
import { parliamentActivities } from "@/content/parliament";
import { getLiveParliamentActivities } from "@/lib/cms-live";

export function generateStaticParams() {
  return [
    { locale: "bn" },
    { locale: "en" },
  ].flatMap(({ locale }) => parliamentActivities.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const item = parliamentActivities.find((p) => p.slug === slug);
  if (!item) return {};
  return pageMetadata({
    locale: locale as Locale,
    path: `/parliament/${slug}`,
    title: item.title[locale as Locale],
    description: item.excerpt[locale as Locale],
  });
}

const categoryLabel = (c: string, bn: boolean) => {
  const map: Record<string, [string, string]> = {
    speech: ["বক্তৃতা", "Speech"],
    question: ["প্রশ্ন ও উত্তর", "Q&A"],
    bill: ["বিল", "Bill"],
    committee: ["কমিটি", "Committee"],
    responsibility: ["দায়িত্ব", "Responsibility"],
  };
  const pair = map[c] ?? ["—", "—"];
  return bn ? pair[0] : pair[1];
};

export default async function ParliamentDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const bn = locale === "bn";
  const allActivities = await getLiveParliamentActivities();
  const item = allActivities.find((p) => p.slug === slug);
  if (!item) notFound();

  return (
    <>
      <Breadcrumbs
        locale={locale}
        items={[
          { label: bn ? "সংসদ" : "Parliament", href: "/parliament" },
          { label: item.title[locale] },
        ]}
      />
      <article className="bg-white py-12 sm:py-16">
        <Container>
          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="outline" className="normal-case tracking-normal">
                {categoryLabel(item.category, bn)}
              </Badge>
              <time dateTime={item.date} className="text-[13px] font-medium text-muted">
                {formatDate(item.date, locale)}
              </time>
              <VerificationBadge status={item.verification} locale={locale} />
            </div>
            <h1 className="bn-heading mt-4 text-3xl leading-[1.3] text-forest sm:text-4xl">{item.title[locale]}</h1>
            {item.session ? (
              <p className="bn mt-2 text-[14px] font-semibold text-gold-deep">
                {item.session[locale]}
              </p>
            ) : null}
            <div className="bn prose-measure mt-8 space-y-5 text-[16.5px] leading-8 text-body">
              {item.body.map((paragraph, i) => (
                <p key={i}>{paragraph[locale]}</p>
              ))}
            </div>
            <SourceLine
              locale={locale}
              sourceUrl={item.sourceUrl}
              sourceLabel={item.sourceLabel}
              updatedAt={item.updatedAt}
            />
            <div className="mt-10 border-t border-line pt-6">
              <Link
                href={localePath(locale, "/parliament")}
                className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.12em] text-forest hover:text-forest-deep"
              >
                <ArrowLeft aria-hidden="true" className="h-4 w-4" />
                {bn ? "আর্কাইভে ফিরে যান" : "Back to the archive"}
              </Link>
            </div>
          </div>
        </Container>
      </article>
    </>
  );
}
