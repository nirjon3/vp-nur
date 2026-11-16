import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { localePath } from "@/i18n/config";
import { Container } from "@/components/ui/layout";
import { VerificationBadge } from "@/components/shared/verification";
import { formatDateShort } from "@/lib/format";
import { newsArticles, newsCategories } from "@/content/news";

/** 06 — News: one typographic feature + a dated list. No thumbnails. */
export function NewsSection({ locale }: { locale: Locale }) {
  const bn = locale === "bn";
  const sorted = [...newsArticles].sort((a, b) => b.date.localeCompare(a.date));
  const featured = sorted.find((a) => a.featured) ?? sorted[0];
  const rest = sorted.filter((a) => a.slug !== featured?.slug).slice(0, 3);

  return (
    <section className="border-t border-line bg-white py-12 sm:py-16">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-5">
          <div>
            <p className="flex items-baseline gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-gold-deep">
              <span aria-hidden="true" className="tabular-nums">০৬</span>
              <span>{bn ? "সর্বশেষ" : "Latest"}</span>
            </p>
            <h2 className="bn-heading mt-2 text-2xl text-forest sm:text-3xl">
              {bn ? "সংবাদ ও হালনাগাদ" : "News and updates"}
            </h2>
          </div>
          <Link
            href={localePath(locale, "/news")}
            className="group inline-flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-[0.12em] text-forest hover:text-forest-deep"
          >
            {bn ? "সব সংবাদ" : "All news"}
            <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-14">
          {featured ? (
            <div className="lg:col-span-7">
              <Link href={localePath(locale, `/news/${featured.slug}`)} className="group block">
                <p className="flex flex-wrap items-center gap-3 text-[11px] font-bold uppercase tracking-[0.16em] text-muted">
                  <span className="text-gold-deep">{newsCategories[featured.category][locale]}</span>
                  <time dateTime={featured.date}>{formatDateShort(featured.date, locale)}</time>
                </p>
                <h3 className="bn-heading mt-3 max-w-2xl text-[26px] leading-[1.35] text-charcoal transition-colors group-hover:text-forest sm:text-[34px]">
                  {featured.title[locale]}
                </h3>
                <p className="bn mt-4 max-w-xl text-[15px] leading-7 text-body">{featured.excerpt[locale]}</p>
                <span className="mt-5 inline-flex">
                  <VerificationBadge status={featured.verification} locale={locale} />
                </span>
              </Link>
            </div>
          ) : null}

          <ul className="divide-y divide-line border-t border-line lg:col-span-5 lg:border-t-0 lg:border-l lg:border-line lg:pl-10">
            {rest.map((a) => (
              <li key={a.slug}>
                <Link href={localePath(locale, `/news/${a.slug}`)} className="group block py-5">
                  <p className="flex flex-wrap items-center gap-3 text-[10.5px] font-bold uppercase tracking-[0.16em] text-muted">
                    <span className="text-gold-deep">{newsCategories[a.category][locale]}</span>
                    <time dateTime={a.date}>{formatDateShort(a.date, locale)}</time>
                  </p>
                  <p className="bn-heading mt-1.5 text-[16.5px] leading-snug text-charcoal group-hover:text-forest">
                    {a.title[locale]}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
