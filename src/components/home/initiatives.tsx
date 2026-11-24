import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { localePath } from "@/i18n/config";
import { Container } from "@/components/ui/layout";
import { Badge } from "@/components/ui/badge";
import { getDictionary } from "@/i18n/dictionaries";
import { initiatives } from "@/content/initiatives";

const statusVariant = {
  planned: "outline",
  ongoing: "status",
  completed: "verified",
} as const;

/** Clean 3-card initiatives preview. */
export function InitiativesSection({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const bn = locale === "bn";
  const items = initiatives.slice(0, 3);

  return (
    <section className="border-t border-line bg-offwhite py-12 sm:py-16">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line-strong pb-5">
          <div>
            <h2 className="bn-heading text-2xl text-forest sm:text-3xl">
              {bn ? "জনকল্যাণমূলক প্রকল্পসমূহ" : "Community Projects"}
            </h2>
          </div>
          <Link
            href={localePath(locale, "/initiatives")}
            className="group inline-flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-[0.12em] text-forest hover:text-forest-deep"
          >
            {bn ? "সব উদ্যোগ" : "All initiatives"}
            <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <Link
              key={item.slug}
              href={localePath(locale, `/initiatives/${item.slug}`)}
              className="group flex flex-col justify-between rounded-[2px] border border-line bg-white p-5 transition-all hover:border-forest hover:shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <Badge variant={statusVariant[item.status]} className="text-[11px] normal-case tracking-normal">
                    {dict.status[item.status]}
                  </Badge>
                  <span className="flex items-center gap-1 text-[11.5px] text-muted">
                    <MapPin className="h-3 w-3" />
                    {item.location[locale]}
                  </span>
                </div>
                <h3 className="bn-heading mt-3 text-[17px] leading-snug text-charcoal group-hover:text-forest">
                  {item.title[locale]}
                </h3>
              </div>
              <span className="mt-5 inline-flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-[0.12em] text-forest group-hover:underline">
                {bn ? "বিস্তারিত দেখুন" : "View details"} →
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
