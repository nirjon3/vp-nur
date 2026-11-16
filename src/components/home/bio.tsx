import type { Locale } from "@/i18n/config";
import { localePath } from "@/i18n/config";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/layout";
import { timeline } from "@/content/timeline";

/** 01 — Brief biography with asymmetric editorial grid. */
export function BioSection({ locale }: { locale: Locale }) {
  const bn = locale === "bn";
  return (
    <section className="bg-white py-12 sm:py-16">
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4">
            <p className="flex items-baseline gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-gold-deep">
              <span aria-hidden="true" className="tabular-nums">০১</span>
              <span>{bn ? "পরিচিতি" : "Profile"}</span>
            </p>
            <h2 className="bn-heading mt-3 text-2xl leading-snug text-forest sm:text-3xl">
              {bn ? "ছাত্ররাজনীতি থেকে জাতীয় পর্যায়ে" : "From student politics to the national stage"}
            </h2>
          </div>
          <div className="lg:col-span-8 lg:border-l lg:border-line lg:pl-14">
            <p className="bn prose-measure text-[16px] leading-8 text-body">
              {bn
                ? "নুরুল হক নুরের রাজনৈতিক পথচলা শুরু হয় ঢাকা বিশ্ববিদ্যালয়ের ছাত্র রাজনীতিতে সক্রিয় অংশগ্রহণের মধ্য দিয়ে। ঢাকা বিশ্ববিদ্যালয় কেন্দ্রীয় ছাত্র সংসদের (ডাকসু) সহ-সভাপতি নির্বাচিত হওয়ার পর তিনি ‘ভিপি নুর’ নামে পরিচিত হন এবং পরবর্তীতে জাতীয় রাজনীতিতে প্রবেশ করেন।"
                : "Nurul Haque Nur began his political journey through active participation in student politics at the University of Dhaka. After being elected Vice President of the Dhaka University Central Students' Union (DUCSU), he became widely known as ‘VP Nur’, and later moved into national politics."}
            </p>
            <p className="bn prose-measure mt-4 text-[16px] leading-8 text-body">
              {bn
                ? "বর্তমানে তিনি পটুয়াখালী-৩ (গালাচিপা–দশমিনা) আসনের সংসদ সদস্য। এলাকার মানুষের জীবনযাত্রার মানোন্নয়ন, নদীভাঙন রোধ ও সরকারি সেবা সহজীকরণ — এসব তাঁর প্রধান কর্মপরিধি বলে উল্লেখ করা হয়।"
                : "He currently serves as the Member of Parliament for Patuakhali-3 (Galachipa–Dashmina). Improving living conditions, tackling river erosion and easing access to public services are consistently cited as his core priorities."}
            </p>
            <Link
              href={localePath(locale, "/about")}
              className="group mt-6 inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.12em] text-forest hover:text-forest-deep"
            >
              {bn ? "সম্পূর্ণ পরিচয় ও যাত্রাপথ" : "Full profile and journey"}
              <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

/** 02 — Chronological journey strip (scrollable on mobile). */
export function JourneySection({ locale }: { locale: Locale }) {
  const bn = locale === "bn";
  return (
    <section className="border-t border-line bg-offwhite py-12 sm:py-14">
      <Container>
        <p className="flex items-baseline gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-gold-deep">
          <span aria-hidden="true" className="tabular-nums">০২</span>
          <span>{bn ? "যাত্রাপথ" : "Journey"}</span>
        </p>
        <ol className="mt-6 flex snap-x snap-mandatory gap-0 overflow-x-auto border-y border-line-strong [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {timeline.map((item) => (
            <li
              key={item.id}
              className="w-[240px] shrink-0 snap-start border-r border-line px-5 py-6 last:border-r-0 sm:w-[260px]"
            >
              <span className="bn block text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
                {item.date}
              </span>
              <span className="bn-heading mt-2 block text-[15px] leading-snug text-forest">
                {item.title[locale]}
              </span>
              <span aria-hidden="true" className="mt-4 block h-0.5 w-8 bg-gold" />
            </li>
          ))}
        </ol>
        <p className="mt-3 text-[12px] text-muted">
          {bn
            ? "বিস্তারিত ও উৎসসহ সময়রেখা — পরিচয় পৃষ্ঠায়।"
            : "Full timeline with sources lives on the profile page."}{" "}
          <Link href={localePath(locale, "/about")} className="font-semibold text-forest link-underline">
            {bn ? "দেখুন" : "See it"}
          </Link>
        </p>
      </Container>
    </section>
  );
}
