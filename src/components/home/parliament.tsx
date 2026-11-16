import Link from "next/link";
import { ArrowRight, ArrowUpRight, Mic, HelpCircle, FileText, Users, BadgeCheck } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { localePath } from "@/i18n/config";
import { formatDateShort } from "@/lib/format";
import { VerificationBadge } from "@/components/shared/verification";
import { parliamentActivities } from "@/content/parliament";
import type { ParliamentCategory } from "@/types/content";

const categoryIcon: Record<ParliamentCategory, typeof Mic> = {
  speech: Mic,
  question: HelpCircle,
  bill: FileText,
  committee: Users,
  responsibility: BadgeCheck,
};

const categoryLabel = (category: ParliamentCategory, bn: boolean) => {
  const map: Record<ParliamentCategory, [string, string]> = {
    speech: ["বক্তৃতা", "Speech"],
    question: ["প্রশ্ন ও উত্তর", "Q&A"],
    bill: ["বিল", "Bill"],
    committee: ["কমিটি", "Committee"],
    responsibility: ["দায়িত্ব", "Responsibility"],
  };
  return bn ? map[category][0] : map[category][1];
};

/** 03 — Parliamentary activities preview: dark institutional band. */
export function ParliamentSection({ locale }: { locale: Locale }) {
  const bn = locale === "bn";
  const items = parliamentActivities.slice(0, 4);

  return (
    <section className="bg-forest-ink py-12 text-[#e9ece7] sm:py-16">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <p className="flex items-baseline gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-gold">
              <span aria-hidden="true" className="tabular-nums">০৩</span>
              <span>{bn ? "সংসদে" : "In parliament"}</span>
            </p>
            <h2 className="bn-heading mt-3 text-2xl leading-snug text-white sm:text-3xl">
              {bn ? "সংসদে উত্থাপিত কথা" : "What he takes into the chamber"}
            </h2>
            <p className="bn mt-4 text-[14.5px] leading-7 text-[#b9c2b4]">
              {bn
                ? "বক্তৃতা, লিখিত প্রশ্ন, কমিটি বৈঠক ও দাপ্তরিক দায়িত্ব — প্রতিটি এন্ট্রি উৎসসহ যাচাইয়ের অধীন।"
                : "Speeches, written questions, committee meetings and formal duties — every entry is verified against a source."}
            </p>
            <Link
              href={localePath(locale, "/parliament")}
              className="group mt-6 inline-flex items-center gap-2 rounded-[2px] border border-gold/50 px-5 py-3 text-[12px] font-bold uppercase tracking-[0.12em] text-gold transition-colors hover:border-gold hover:bg-gold hover:text-forest-ink"
            >
              {bn ? "সংসদের আর্কাইভ" : "Parliament archive"}
              <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <ul className="divide-y divide-white/10 border-y border-white/10 lg:col-span-8">
            {items.map((item) => {
              const Icon = categoryIcon[item.category];
              return (
                <li key={item.slug}>
                  <Link
                    href={localePath(locale, `/parliament/${item.slug}`)}
                    className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 py-5 transition-colors hover:bg-white/[0.03] sm:grid-cols-[110px_1fr_auto]"
                  >
                    <span className="bn text-[12px] leading-5 text-[#9aa695]">
                      {formatDateShort(item.date, locale)}
                    </span>
                    <span>
                      <span className="flex items-center gap-2 text-[10.5px] font-bold uppercase tracking-[0.16em] text-gold">
                        <Icon aria-hidden="true" className="h-3.5 w-3.5" />
                        {categoryLabel(item.category, bn)}
                      </span>
                      <span className="bn-heading mt-1 block text-[15px] leading-6 text-white group-hover:text-gold sm:text-base">
                        {item.title[locale]}
                      </span>
                      <span className="mt-2 inline-flex">
                        <VerificationBadge status={item.verification} locale={locale} />
                      </span>
                    </span>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="h-5 w-5 text-[#6f7a6d] transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold"
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
