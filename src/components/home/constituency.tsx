import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { localePath } from "@/i18n/config";
import { constituency } from "@/content/constituency";
import { Container } from "@/components/ui/layout";
import { VerificationBadge } from "@/components/shared/verification";

/** 04 — Constituency: embedded OSM map + numbered priorities. */
export function ConstituencySection({ locale }: { locale: Locale }) {
  const bn = locale === "bn";

  return (
    <section className="border-t border-line bg-white py-12 sm:py-16">
      <Container>
        <p className="flex items-baseline gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-gold-deep">
          <span aria-hidden="true" className="tabular-nums">০৪</span>
          <span>{bn ? "নির্বাচনী এলাকা" : "The constituency"}</span>
        </p>

        <div className="mt-4 grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <h2 className="bn-heading text-2xl leading-snug text-forest sm:text-3xl">
              {constituency.name[locale]}
              <span className="block text-lg font-medium text-muted sm:text-xl">
                {constituency.upazilas.map((u) => u[locale]).join(" · ")}
              </span>
            </h2>
            <p className="bn mt-4 text-[15px] leading-8 text-body">{constituency.overview[locale]}</p>

            <div className="mt-6 overflow-hidden rounded-[2px] border border-line">
              <iframe
                title={bn ? "পটুয়াখালী-৩ মানচিত্র" : "Patuakhali-3 map"}
                src={constituency.mapEmbed}
                className="h-56 w-full border-0 sm:h-64"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <a
              href={constituency.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1.5 text-[12px] font-semibold text-muted hover:text-forest"
            >
              {bn ? "OpenStreetMap-এ বড় মানচিত্র দেখুন" : "Open larger map on OpenStreetMap"} →
            </a>
          </div>

          <div className="lg:col-span-7">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted">
              {bn ? "অগ্রাধিকার ক্ষেত্রসমূহ" : "Priority areas"}
            </h3>
            <ol className="mt-3 divide-y divide-line border-y border-line">
              {constituency.priorities.map((p, i) => (
                <li key={p.id} className="grid grid-cols-[auto_1fr_auto] items-baseline gap-4 py-4">
                  <span aria-hidden="true" className="font-sans text-sm font-bold tabular-nums text-gold-deep">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span className="bn-heading text-[15px] text-charcoal sm:text-base">{p.title[locale]}</span>
                    <span className="bn mt-1 block text-[13.5px] leading-6 text-muted">{p.body[locale]}</span>
                  </span>
                  <VerificationBadge status={p.verification} locale={locale} />
                </li>
              ))}
            </ol>
            <Link
              href={localePath(locale, "/constituency")}
              className="group mt-6 inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.12em] text-forest hover:text-forest-deep"
            >
              {bn ? "এলাকার বিস্তারিত" : "Constituency details"}
              <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
