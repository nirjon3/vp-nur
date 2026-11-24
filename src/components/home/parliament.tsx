import Link from "next/link";
import { ArrowRight, ArrowUpRight, Mic, HelpCircle, FileText, Users, BadgeCheck } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { localePath } from "@/i18n/config";
import { formatDateShort } from "@/lib/format";
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
    question: ["প্রশ্নোত্তর", "Q&A"],
    bill: ["বিল", "Bill"],
    committee: ["কমিটি", "Committee"],
    responsibility: ["দায়িত্ব", "Role"],
  };
  return bn ? map[category][0] : map[category][1];
};

/** Parliamentary activities preview: clean dark band. */
export function ParliamentSection({ locale }: { locale: Locale }) {
  const bn = locale === "bn";
  const items = parliamentActivities.slice(0, 3);

  return (
    <section className="bg-forest-ink py-12 text-[#e9ece7] sm:py-16">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-5">
          <div>
            <h2 className="bn-heading text-2xl text-white sm:text-3xl">
              {bn ? "সংসদীয় কার্যক্রম" : "Parliamentary Activities"}
            </h2>
          </div>
          <Link
            href={localePath(locale, "/parliament")}
            className="group inline-flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-[0.12em] text-gold hover:text-white"
          >
            {bn ? "সকল কার্যক্রম" : "View all"}
            <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <ul className="mt-4 divide-y divide-white/10">
          {items.map((item) => {
            const Icon = categoryIcon[item.category];
            return (
              <li key={item.slug}>
                <Link
                  href={localePath(locale, `/parliament/${item.slug}`)}
                  className="group flex flex-col justify-between gap-3 py-4 transition-colors hover:bg-white/[0.02] sm:flex-row sm:items-center"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[2px] bg-white/5 text-gold">
                      <Icon aria-hidden="true" className="h-4 w-4" />
                    </span>
                    <div>
                      <span className="bn-heading block text-[15.5px] leading-snug text-white group-hover:text-gold">
                        {item.title[locale]}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 self-end sm:self-center">
                    <span className="text-[11px] font-semibold text-[#8fa389]">
                      {categoryLabel(item.category, bn)} · {formatDateShort(item.date, locale)}
                    </span>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="h-4 w-4 text-[#8fa389] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold"
                    />
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
