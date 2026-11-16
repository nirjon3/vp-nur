import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { isLocale, localePath } from "@/i18n/config";
import { pageMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { PageHeader } from "@/components/shared/page-header";
import { Container } from "@/components/ui/layout";
import { VerificationBadge, SourceLine } from "@/components/shared/verification";
import { timeline } from "@/content/timeline";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const bn = locale === "bn";
  return pageMetadata({
    locale: locale as Locale,
    path: "/about",
    title: bn ? "পরিচয় — নুরুল হক নুর (ভিপি নুর)" : "About — Nurul Haque Nur (VP Nur)",
    description: bn
      ? "নুরুল হক নুরের প্রারম্ভিক জীবন, ছাত্ররাজনীতি, ডাকসু–র সহ-সভাপতিত্ব, রাজনৈতিক যাত্রা ও বর্তমান দায়িত্ব — উৎসসহ।"
      : "Early life, student politics, DUCSU vice-presidency, political journey and current responsibilities of Nurul Haque Nur — with sources.",
  });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const bn = locale === "bn";

  return (
    <>
      <Breadcrumbs
        locale={locale}
        items={[{ label: bn ? "পরিচয়" : "About" }]}
      />
      <PageHeader
        kicker={bn ? "পরিচয়" : "Profile"}
        title={bn ? "নুরুল হক নুর" : "Nurul Haque Nur"}
        description={
          bn
            ? "প্রারম্ভিক জীবন থেকে জাতীয় সংসদ পর্যন্ত — একটি যাচাইকৃত সময়রেখা। প্রতিটি তথ্য উৎসসহ যাচাই করা হওয়ার পরই ‘যাচাইকৃত’ হিসেবে চিহ্নিত হয়।"
            : "From early life to the national parliament — a verified timeline. Every entry is marked verified only after confirmation against a source."
        }
      />

      {/* Intro + portrait */}
      <section className="bg-white py-12 sm:py-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <figure>
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2px] bg-forest-deep shadow-sm">
                  <Image
                    src="/images/nur-official-2026.jpg"
                    alt={
                      bn
                        ? "নুরুল হক নুর (ভিপি নুর) — আনুষ্ঠানিক প্রতিকৃতি"
                        : "Nurul Haque Nur (VP Nur) — Official Portrait"
                    }
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-cover object-top"
                  />
                </div>
                <figcaption className="mt-3 text-[11.5px] text-muted">
                  {bn
                    ? "জাতীয় সংসদ সদস্য মো. নুরুল হক (ভিপি নুর) — উইকিমিডিয়া কমন্স আর্কাইভ।"
                    : "Member of Parliament Md. Nurul Haque (VP Nur) — Wikimedia Commons archive."}
                </figcaption>
              </figure>
            </div>
            <div className="lg:col-span-8">
              <h2 className="bn-heading text-xl text-forest">{bn ? "সংক্ষেপে" : "In brief"}</h2>
              <div className="bn prose-measure mt-4 space-y-4 text-[16px] leading-8 text-body">
                <p>
                  {bn
                    ? "নুরুল হক নুর (ভিপি নুর) একজন বাংলাদেশি রাজনীতিবিদ। ঢাকা বিশ্ববিদ্যালয় কেন্দ্রীয় ছাত্র সংসদের (ডাকসু) সহ-সভাপতি নির্বাচিত হওয়ার মাধ্যমে তিনি জাতীয় পরিচিতি লাভ করেন।"
                    : "Nurul Haque Nur (VP Nur) is a Bangladeshi politician. He first came to national attention as the elected Vice President of the Dhaka University Central Students' Union (DUCSU)."}
                </p>
                <p>
                  {bn
                    ? "ছাত্র রাজনীতির মধ্য দিয়ে জাতীয় রাজনীতিতে প্রবেশ করার পর তিনি গালাচিপা–দশমিনাসহ পটুয়াখালী-৩ আসনের মানুষের উন্নয়ন ও সরকারি সেবা সহজ করার ইস্যুতে সক্রিয় থেকেছেন।"
                    : "After entering national politics through student politics, he has remained active on issues of development and easier access to public services for the people of the Patuakhali-3 area, including Galachipa and Dashmina."}
                </p>
                <p className="text-[14px] leading-7 text-muted">
                  {bn
                    ? "বি.দ্র: জন্মতারিখ, শিক্ষাগত যোগ্যতা, দলীয় পদ ও বর্তমান দাপ্তরিক দায়িত্বের সুনির্দিষ্ট তারিখ ও বিবরণ যাচাই সম্পন্ন হলে এখানে প্রকাশিত হবে। অনুমাননির্ভর তথ্য প্রকাশ করা হয় না।"
                    : "Note: exact dates and details for birth, education, party office and current formal responsibilities will be published once verified. Information is never published on assumption."}
                </p>
              </div>
              <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-[2px] border border-line bg-line sm:grid-cols-4">
                {[
                  { k: bn ? "আসন" : "Seat", v: bn ? "পটুয়াখালী-৩" : "Patuakhali-3" },
                  { k: bn ? "এলাকা" : "Areas", v: bn ? "গালাচিপা · দশমিনা" : "Galachipa · Dashmina" },
                  { k: bn ? "পরিচিতি" : "Known as", v: bn ? "ভিপি নুর" : "VP Nur" },
                  { k: bn ? "ভাষা" : "Languages", v: bn ? "বাংলা · English" : "Bengali · English" },
                ].map((item) => (
                  <div key={item.k} className="bg-offwhite p-4">
                    <dt className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted">{item.k}</dt>
                    <dd className="bn mt-1 text-[13px] font-semibold leading-5 text-forest">{item.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Container>
      </section>

      {/* Timeline */}
      <section className="border-t border-line bg-offwhite py-12 sm:py-16">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-gold-deep">
                {bn ? "সময়রেখা" : "Timeline"}
              </p>
              <h2 className="bn-heading mt-2 text-2xl text-forest sm:text-3xl">
                {bn ? "যাত্রাপথ এক নজরে" : "The journey at a glance"}
              </h2>
            </div>
            <Link
              href={localePath(locale, "/parliament")}
              className="group inline-flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-[0.12em] text-forest hover:text-forest-deep"
            >
              {bn ? "সংসদীয় কর্মকাণ্ড" : "Parliamentary record"}
              <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <ol className="mt-10 border-l-2 border-line-strong pl-6 sm:pl-10">
            {timeline.map((item) => (
              <li key={item.id} className="relative grid gap-2 pb-8 last:pb-0 sm:grid-cols-12 sm:gap-6">
                <span
                  aria-hidden="true"
                  className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full border-2 border-forest bg-white sm:-left-[47px]"
                />
                <div className="sm:col-span-3">
                  <span className="bn text-[12px] font-bold uppercase tracking-[0.14em] text-muted">
                    {item.date}
                  </span>
                </div>
                <div className="sm:col-span-9">
                  <h3 className="bn-heading text-lg leading-snug text-forest">{item.title[locale]}</h3>
                  <p className="bn mt-1.5 max-w-3xl text-[14.5px] leading-7 text-body">{item.body[locale]}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <VerificationBadge status={item.verification} locale={locale} />
                    <SourceLine
                      locale={locale}
                      sourceUrl={item.sourceUrl}
                      sourceLabel={item.sourceLabel}
                      updatedAt={item.updatedAt}
                    />
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>
    </>
  );
}
