import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { localePath } from "@/i18n/config";
import { Container } from "@/components/ui/layout";
import { formatDateShort } from "@/lib/format";
import { newsArticles, newsCategories } from "@/content/news";

/** Clean news preview with no long excerpts. */
export function NewsSection({ locale }: { locale: Locale }) {
  const bn = locale === "bn";
  const sorted = [...newsArticles].sort((a, b) => b.date.localeCompare(a.date));
  const items = sorted.slice(0, 3);

  return (
    <section className="border-t border-line bg-white py-12 sm:py-16">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-5">
          <div>
            <h2 className="bn-heading text-2xl text-forest sm:text-3xl">
              {bn ? "সাম্প্রতিক সংবাদ" : "Latest News"}
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

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <Link
              key={item.slug}
              href={localePath(locale, `/news/${item.slug}`)}
              className="group flex flex-col justify-between rounded-[2px] border border-line bg-offwhite p-5 transition-colors hover:border-forest hover:bg-white"
            >
              <div>
                <p className="flex items-center gap-2 text-[11px] font-semibold text-muted">
                  <span className="text-gold-deep">{newsCategories[item.category][locale]}</span>
                  <span>·</span>
                  <time dateTime={item.date}>{formatDateShort(item.date, locale)}</time>
                </p>
                <h3 className="bn-heading mt-2.5 text-[16.5px] leading-snug text-charcoal group-hover:text-forest">
                  {item.title[locale]}
                </h3>
              </div>
              <span className="mt-5 text-[12px] font-bold uppercase tracking-[0.12em] text-forest group-hover:underline">
                {bn ? "পড়ুন" : "Read"} →
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
