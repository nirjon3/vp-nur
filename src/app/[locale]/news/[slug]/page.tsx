import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { isLocale, localePath } from "@/i18n/config";
import { pageMetadata } from "@/lib/seo";
import { getDictionary } from "@/i18n/dictionaries";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Container } from "@/components/ui/layout";
import { VerificationBadge, SourceLine } from "@/components/shared/verification";
import { formatDate } from "@/lib/format";
import { newsArticles, newsCategories } from "@/content/news";

export function generateStaticParams() {
  return [{ locale: "bn" }, { locale: "en" }].flatMap(({ locale }) =>
    newsArticles.map((a) => ({ locale, slug: a.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const article = newsArticles.find((a) => a.slug === slug);
  if (!article) return {};
  return pageMetadata({
    locale: locale as Locale,
    path: `/news/${slug}`,
    title: article.title[locale as Locale],
    description: article.excerpt[locale as Locale],
  });
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const bn = locale === "bn";
  const article = newsArticles.find((a) => a.slug === slug);
  if (!article) notFound();

  const related = newsArticles
    .filter((a) => a.slug !== article.slug && a.category === article.category)
    .slice(0, 2);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title[locale],
    datePublished: article.date,
    dateModified: article.updatedAt ?? article.date,
    inLanguage: locale === "bn" ? "bn-BD" : "en",
    author: { "@type": "Person", name: "Nurul Haque Nur — Website Team" },
    publisher: { "@type": "Organization", name: dict.site.name },
  };

  return (
    <>
      <Breadcrumbs
        locale={locale}
        items={[
          { label: bn ? "সংবাদ" : "News", href: "/news" },
          { label: article.title[locale] },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="bg-white py-12 sm:py-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-8">
              <div className="flex flex-wrap items-center gap-3 text-[11px] font-bold uppercase tracking-[0.16em] text-muted">
                <span className="text-gold-deep">{newsCategories[article.category][locale]}</span>
                <time dateTime={article.date}>{formatDate(article.date, locale)}</time>
                <VerificationBadge status={article.verification} locale={locale} />
              </div>
              <h1 className="bn-heading mt-4 text-3xl leading-[1.3] text-forest sm:text-[40px] sm:leading-[1.25]">
                {article.title[locale]}
              </h1>
              <p className="bn mt-4 border-l-2 border-gold pl-4 text-[17px] leading-8 text-body">
                {article.excerpt[locale]}
              </p>
              <div className="bn prose-measure mt-8 space-y-5 text-[17px] leading-8 text-charcoal">
                {article.body.map((p, i) => (
                  <p key={i}>{p[locale]}</p>
                ))}
              </div>
              <SourceLine
                locale={locale}
                sourceUrl={article.sourceUrl}
                sourceLabel={article.sourceLabel}
                updatedAt={article.updatedAt}
              />
            </div>

            {/* Sidebar: related */}
            <aside className="lg:col-span-4">
              <div className="border-t border-line pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
                <h2 className="bn-heading text-lg font-semibold text-forest">
                  {bn ? "সম্পর্কিত সংবাদ" : "Related"}
                </h2>
                <ul className="mt-4 divide-y divide-line">
                  {related.length === 0 ? (
                    <li className="py-4 text-[13px] text-muted">
                      {bn ? "সম্পর্কিত প্রকাশনা এখনো নেই।" : "No related stories yet."}
                    </li>
                  ) : (
                    related.map((a) => (
                      <li key={a.slug}>
                        <Link href={localePath(locale, `/news/${a.slug}`)} className="group block py-4">
                          <time dateTime={a.date} className="text-[10.5px] font-bold uppercase tracking-[0.14em] text-muted">
                            {formatDate(a.date, locale)}
                          </time>
                          <p className="bn-heading mt-1 text-[15px] leading-snug text-charcoal group-hover:text-forest">
                            {a.title[locale]}
                          </p>
                        </Link>
                      </li>
                    ))
                  )}
                </ul>
                <Link
                  href={localePath(locale, "/news")}
                  className="mt-6 inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.12em] text-forest hover:text-forest-deep"
                >
                  <ArrowLeft aria-hidden="true" className="h-4 w-4" />
                  {bn ? "সব সংবাদ" : "All news"}
                </Link>
              </div>
            </aside>
          </div>
        </Container>
      </article>
    </>
  );
}
