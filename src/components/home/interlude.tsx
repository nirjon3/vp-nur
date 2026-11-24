import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { localePath } from "@/i18n/config";

/** Minimal, elegant constituency accent strip. */
export function InterludeSection({ locale }: { locale: Locale }) {
  const bn = locale === "bn";

  return (
    <section
      aria-label={bn ? "নির্বাচনী এলাকা" : "Constituency"}
      className="border-y border-line bg-forest-ink py-10 text-white sm:py-12"
    >
      <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-4 px-4 text-center sm:flex-row sm:text-left sm:px-6 lg:px-10">
        <div>
          <p className="flex items-center justify-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-gold sm:justify-start">
            <MapPin className="h-3.5 w-3.5" />
            {bn ? "পটুয়াখালী-৩ আসন" : "Patuakhali-3 Constituency"}
          </p>
          <p className="bn-heading mt-1 text-2xl text-white sm:text-3xl">
            {bn ? "গালাচিপা · দশমিনা" : "Galachipa · Dashmina"}
          </p>
        </div>
        <Link
          href={localePath(locale, "/constituency")}
          className="inline-flex items-center gap-2 rounded-[2px] border border-gold/40 px-5 py-2.5 text-[12.5px] font-semibold text-gold transition-colors hover:border-gold hover:bg-gold hover:text-forest-ink"
        >
          {bn ? "এলাকা সম্পর্কিত তথ্য" : "About the Area"}
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
