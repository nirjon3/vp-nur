import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, MapPin } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { isLocale, localePath } from "@/i18n/config";
import { pageMetadata } from "@/lib/seo";
import { getDictionary } from "@/i18n/dictionaries";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { PageHeader } from "@/components/shared/page-header";
import { Container } from "@/components/ui/layout";
import { Badge } from "@/components/ui/badge";
import { VerificationBadge } from "@/components/shared/verification";
import { getLiveInitiatives } from "@/lib/cms-live";
import type { InitiativeStatus } from "@/types/content";

const statusVariant: Record<InitiativeStatus, "outline" | "status" | "verified"> = {
  planned: "outline",
  ongoing: "status",
  completed: "verified",
};

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
    path: "/initiatives",
    title: bn ? "জনউদ্যোগ — গালাচিপা–দশমিনার জন্য" : "Initiatives — for Galachipa–Dashmina",
    description: bn
      ? "পটুয়াখালী-৩ এলাকার জন্য গৃহীত ও প্রস্তাবিত জনউদ্যোগসমূহ — অবস্থা ও হালনাগাদ যাচাই সাপেক্ষে প্রকাশিত।"
      : "Public and constituency initiatives taken or proposed for Patuakhali-3 — status and updates published only after verification.",
  });
}

export default async function InitiativesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const bn = locale === "bn";
  const initiatives = await getLiveInitiatives();

  return (
    <>
      <Breadcrumbs locale={locale} items={[{ label: bn ? "জনউদ্যোগ" : "Initiatives" }]} />
      <PageHeader
        kicker={bn ? "জনউদ্যোগ" : "Initiatives"}
        title={bn ? "এলাকার জন্য পরিকল্পিত ও চলমান উদ্যোগ" : "Initiatives planned and ongoing for the area"}
        description={
          bn
            ? "প্রতিটি উদ্যোগের অবস্থা (পরিকল্পিত · চলমান · সম্পন্ন) এবং হালনাগাদ নথি ও উৎস যাচাই করার পরই প্রকাশিত হয়। অনুমানমূলক অগ্রগতি দাবি করা হয় না।"
            : "Every initiative's status (planned · ongoing · completed) and updates are published only after verification against documents and sources. No assumed progress is ever claimed."
        }
      />
      <section className="bg-white py-10 sm:py-14">
        <Container>
          <ul className="divide-y divide-line border-y border-line">
            {initiatives.map((item) => (
              <li key={item.slug}>
                <Link
                  href={localePath(locale, `/initiatives/${item.slug}`)}
                  className="group grid gap-3 py-6 transition-colors hover:bg-offwhite/60 sm:grid-cols-12 sm:gap-6 sm:px-3"
                >
                  <div className="sm:col-span-2">
                    <Badge variant={statusVariant[item.status]} className="normal-case tracking-normal">
                      {dict.status[item.status]}
                    </Badge>
                    <p className="mt-2 text-[10.5px] font-bold uppercase tracking-[0.16em] text-muted">
                      {item.category[locale]}
                    </p>
                  </div>
                  <div className="sm:col-span-8">
                    <h2 className="bn-heading text-lg leading-snug text-forest group-hover:text-forest-deep">
                      {item.title[locale]}
                    </h2>
                    <p className="bn mt-1.5 line-clamp-2 text-[14px] leading-6 text-body">{item.excerpt[locale]}</p>
                    <p className="mt-2 flex items-center gap-1.5 text-[12px] font-medium text-muted">
                      <MapPin aria-hidden="true" className="h-3.5 w-3.5" />
                      {item.location[locale]}
                    </p>
                  </div>
                  <div className="flex items-center justify-between sm:col-span-2 sm:flex-col sm:items-end">
                    <VerificationBadge status={item.verification} locale={locale} />
                    <ArrowRight
                      aria-hidden="true"
                      className="mt-2 h-5 w-5 text-muted transition-transform group-hover:translate-x-1 group-hover:text-forest"
                    />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
