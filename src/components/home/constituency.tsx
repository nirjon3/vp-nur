import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { localePath } from "@/i18n/config";
import { constituency } from "@/content/constituency";
import { Container } from "@/components/ui/layout";

/** Constituency overview: simple map + priorities. */
export function ConstituencySection({ locale }: { locale: Locale }) {
  const bn = locale === "bn";

  return (
    <section className="border-t border-line bg-white py-12 sm:py-16">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-5">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold-deep">
              {bn ? "নির্বাচনী এলাকা" : "Constituency"}
            </p>
            <h2 className="bn-heading mt-1.5 text-2xl text-forest sm:text-3xl">
              {constituency.name[locale]}
              <span className="ml-2 font-normal text-muted text-lg sm:text-xl">
                ({constituency.upazilas.map((u) => u[locale]).join(" · ")})
              </span>
            </h2>
          </div>
          <Link
            href={localePath(locale, "/constituency")}
            className="group inline-flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-[0.12em] text-forest hover:text-forest-deep"
          >
            {bn ? "এলাকার বিস্তারিত" : "View details"}
            <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Priorities */}
          <div className="flex flex-col justify-between lg:col-span-6">
            <div>
              <p className="text-[11.5px] font-bold uppercase tracking-[0.16em] text-gold-deep">
                {bn ? "মূল অগ্রাধিকারসমূহ" : "Core Priorities"}
              </p>
              <ul className="mt-4 grid gap-3">
                {constituency.priorities.map((p) => (
                  <li
                    key={p.id}
                    className="flex items-center gap-3 rounded-[2px] border border-line bg-offwhite p-3.5"
                  >
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-forest" />
                    <span className="bn-heading text-[14.5px] text-charcoal">
                      {p.title[locale]}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="bn mt-6 text-[13.5px] leading-relaxed text-muted">
              {bn
                ? "উপকূলীয় বাঁধ সংস্কার, চিকিৎসা সেবা ও গ্রামীণ যোগাযোগ ব্যবস্থার উন্নয়নে সক্রিয় উদ্যোগ গ্রহণ করা হচ্ছে।"
                : "Active initiatives underway for coastal defense, healthcare, and rural infrastructure."}
            </p>
          </div>

          {/* Map */}
          <div className="overflow-hidden rounded-[2px] border border-line lg:col-span-6">
            <iframe
              title={bn ? "পটুয়াখালী-৩ মানচিত্র" : "Patuakhali-3 map"}
              src={constituency.mapEmbed}
              className="h-64 w-full border-0 sm:h-72"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
