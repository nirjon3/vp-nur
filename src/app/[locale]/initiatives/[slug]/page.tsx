import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, CalendarDays } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { isLocale, localePath } from "@/i18n/config";
import { pageMetadata } from "@/lib/seo";
import { getDictionary } from "@/i18n/dictionaries";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Container } from "@/components/ui/layout";
import { Badge } from "@/components/ui/badge";
import { VerificationBadge, SourceLine } from "@/components/shared/verification";
import { formatDate } from "@/lib/format";
import { initiatives } from "@/content/initiatives";
import type { InitiativeStatus } from "@/types/content";

const statusVariant: Record<InitiativeStatus, "outline" | "status" | "verified"> = {
  planned: "outline",
  ongoing: "status",
  completed: "verified",
};

export function generateStaticParams() {
  return [{ locale: "bn" }, { locale: "en" }].flatMap(({ locale }) =>
    initiatives.map((i) => ({ locale, slug: i.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const item = initiatives.find((i) => i.slug === slug);
  if (!item) return {};
  return pageMetadata({
    locale: locale as Locale,
    path: `/initiatives/${slug}`,
    title: item.title[locale as Locale],
    description: item.excerpt[locale as Locale],
  });
}

export default async function InitiativeDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const bn = locale === "bn";
  const item = initiatives.find((i) => i.slug === slug);
  if (!item) notFound();

  return (
    <>
      <Breadcrumbs
        locale={locale}
        items={[
          { label: bn ? "জনউদ্যোগ" : "Initiatives", href: "/initiatives" },
          { label: item.title[locale] },
        ]}
      />
      <article className="bg-white py-12 sm:py-16">
        <Container>
          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant={statusVariant[item.status]} className="normal-case tracking-normal">
                {dict.status[item.status]}
              </Badge>
              <span className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-muted">
                {item.category[locale]}
              </span>
              <VerificationBadge status={item.verification} locale={locale} />
            </div>
            <h1 className="bn-heading mt-4 text-3xl leading-[1.3] text-forest sm:text-4xl">
              {item.title[locale]}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-muted">
              <span className="inline-flex items-center gap-1.5">
                <MapPin aria-hidden="true" className="h-4 w-4" />
                {item.location[locale]}
              </span>
              {item.startDate ? (
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays aria-hidden="true" className="h-4 w-4" />
                  {bn ? "শুরুর তারিখ: " : "Started: "}
                  {formatDate(item.startDate, locale)}
                </span>
              ) : null}
            </div>

            <div className="bn prose-measure mt-8 space-y-5 text-[16.5px] leading-8 text-body">
              {item.body.map((p, i) => (
                <p key={i}>{p[locale]}</p>
              ))}
            </div>

            {item.updates.length > 0 ? (
              <div className="mt-10 border-t border-line pt-6">
                <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold-deep">
                  {bn ? "সর্বশেষ হালনাগাদ" : "Latest updates"}
                </h2>
                <ol className="mt-3 space-y-4">
                  {item.updates.map((u, i) => (
                    <li key={i} className="flex gap-4">
                      <time dateTime={u.date} className="w-24 shrink-0 text-[12px] font-semibold text-muted">
                        {formatDate(u.date, locale)}
                      </time>
                      <p className="bn text-[14.5px] leading-7 text-body">{u.text[locale]}</p>
                    </li>
                  ))}
                </ol>
              </div>
            ) : null}

            <SourceLine
              locale={locale}
              sourceUrl={item.sourceUrl}
              sourceLabel={item.sourceLabel}
              updatedAt={item.updatedAt}
            />
            <div className="mt-10 border-t border-line pt-6">
              <Link
                href={localePath(locale, "/initiatives")}
                className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.12em] text-forest hover:text-forest-deep"
              >
                <ArrowLeft aria-hidden="true" className="h-4 w-4" />
                {bn ? "সব উদ্যোগ" : "All initiatives"}
              </Link>
            </div>
          </div>
        </Container>
      </article>
    </>
  );
}
