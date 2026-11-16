import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { localePath } from "@/i18n/config";

/** Typographic interlude — a full-width palette cleanser between the media
 *  section and the citizen-services band. No claims; just the constituency. */
export function InterludeSection({ locale }: { locale: Locale }) {
  const bn = locale === "bn";

  return (
    <section
      aria-label={bn ? "নির্বাচনী এলাকা" : "Constituency"}
      className="border-y border-line bg-white"
    >
      <Link
        href={localePath(locale, "/constituency")}
        className="group mx-auto block max-w-[1280px] px-4 py-14 sm:px-6 sm:py-20 lg:px-10"
      >
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-gold-deep">
              {bn ? "পটুয়াখালী-৩" : "Patuakhali-3"}
            </p>
            <p className="bn-heading mt-3 text-[clamp(2.6rem,8.5vw,5.5rem)] leading-[1.12] text-forest">
              {bn ? "গালাচিপা" : "Galachipa"}
              <br />
              <span className="text-gold-deep">{bn ? "দশমিনা" : "Dashmina"}</span>
            </p>
          </div>
          <div className="max-w-xs pb-2 sm:max-w-[16rem]">
            <p className="border-t border-line-strong pt-4 text-[12px] font-semibold uppercase tracking-[0.18em] text-muted">
              {bn ? "নির্বাচনী আসন" : "The seat"}
            </p>
            <p className="bn mt-2 text-[14px] leading-7 text-body">
              {bn
                ? "দক্ষিণ-পূর্ব বাংলাদেশের উপকূলীয় জেলার দুই উপজেলা — নদীভাঙন, লবণাক্ততা ও ঘূর্ণিঝড়ের বিরুদ্ধে মানুষের দৈনন্দিন সংগ্রাম আমাদের কাজের কেন্দ্র।"
                : "Two upazilas of Bangladesh's coastal south — and the daily fight against erosion, salinity and cyclones that shapes our work."}
            </p>
            <span className="mt-4 inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.14em] text-forest">
              {bn ? "এলাকার পরিচিতি" : "About the area"}
              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5"
              />
            </span>
          </div>
        </div>
      </Link>
    </section>
  );
}
