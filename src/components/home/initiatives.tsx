import Link from "next/link";
import { ArrowRight, ArrowUpRight, MapPin } from "lucide-react";
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

/** 05 — Initiatives: one lead item + two secondary, deliberately un-card-like. */
export function InitiativesSection({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const bn = locale === "bn";
  const [lead, ...rest] = initiatives;

  return (
    <section className="border-t border-line bg-offwhite py-12 sm:py-16">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line-strong pb-5">
          <div>
            <p className="flex items-baseline gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-gold-deep">
              <span aria-hidden="true" className="tabular-nums">০৫</span>
              <span>{bn ? "জনউদ্যোগ" : "Public initiatives"}</span>
            </p>
            <h2 className="bn-heading mt-2 text-2xl text-forest sm:text-3xl">
              {bn ? "এলাকার জন্য নেওয়া উদ্যোগ" : "Initiatives taken for the area"}
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

        <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-14">
          {lead ? (
            <Link
              href={localePath(locale, `/initiatives/${lead.slug}`)}
              className="group lg:col-span-6"
            >
              <div className="flex h-44 items-end rounded-[2px] bg-forest-deep p-6 transition-colors group-hover:bg-forest">
                <span className="bn-heading text-2xl leading-snug text-white">{lead.title[locale]}</span>
              </div>
              <p className="bn mt-4 max-w-lg text-[14.5px] leading-7 text-body">{lead.excerpt[locale]}</p>
              <p className="mt-3 flex flex-wrap items-center gap-3 text-[12px] text-muted">
                <Badge variant={statusVariant[lead.status]} className="normal-case tracking-normal">
                  {dict.status[lead.status]}
                </Badge>
                <span className="inline-flex items-center gap-1">
                  <MapPin aria-hidden="true" className="h-3.5 w-3.5" />
                  {lead.location[locale]}
                </span>
              </p>
            </Link>
          ) : null}

          <div className="divide-y divide-line border-y border-line lg:col-span-6">
            {rest.map((item) => (
              <Link
                key={item.slug}
                href={localePath(locale, `/initiatives/${item.slug}`)}
                className="group grid grid-cols-[1fr_auto] items-center gap-4 py-5"
              >
                <div>
                  <p className="flex items-center gap-3 text-[10.5px] font-bold uppercase tracking-[0.16em] text-muted">
                    <Badge variant={statusVariant[item.status]} className="normal-case tracking-normal">
                      {dict.status[item.status]}
                    </Badge>
                    {item.category[locale]}
                  </p>
                  <p className="bn-heading mt-1.5 text-[17px] leading-snug text-charcoal group-hover:text-forest">
                    {item.title[locale]}
                  </p>
                  <p className="mt-1 text-[12px] text-muted">{item.location[locale]}</p>
                </div>
                <ArrowUpRight
                  aria-hidden="true"
                  className="h-5 w-5 text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-forest"
                />
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
