import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, MapPin, Building2, Waves } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { isLocale, localePath } from "@/i18n/config";
import { pageMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { PageHeader } from "@/components/shared/page-header";
import { Container } from "@/components/ui/layout";
import { VerificationBadge } from "@/components/shared/verification";
import { constituency } from "@/content/constituency";

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
    path: "/constituency",
    title: bn ? "পটুয়াখালী-৩ (গালাচিপা–দশমিনা) — নির্বাচনী এলাকা" : "Patuakhali-3 (Galachipa–Dashmina) — Constituency",
    description: bn
      ? "গালাচিপা ও দশমিনা উপজেলা নিয়ে গঠিত পটুয়াখালী-৩ আসনের ভৌগোলিক পরিচিতি, প্রশাসনিক কাঠামো, উন্নয়ন অগ্রাধিকার ও যোগাযোগের উপায়।"
      : "Geography, administrative structure, development priorities and citizen contact for the Patuakhali-3 constituency of Galachipa and Dashmina.",
  });
}

export default async function ConstituencyPage({
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
      <Breadcrumbs locale={locale} items={[{ label: bn ? "পটুয়াখালী-৩" : "Patuakhali-3" }]} />
      <PageHeader
        kicker={bn ? "নির্বাচনী এলাকা" : "Constituency"}
        title={constituency.name[locale]}
        description={constituency.overview[locale]}
      />

      {/* Geography + administration */}
      <section className="bg-white py-12 sm:py-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <div className="overflow-hidden rounded-[2px] border border-line">
                <iframe
                  title={bn ? "পটুয়াখালী-৩ মানচিত্র" : "Patuakhali-3 map"}
                  src={constituency.mapEmbed}
                  className="h-72 w-full border-0 sm:h-96"
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
                {bn ? "OpenStreetMap-এ বড় মানচিত্র" : "Larger map on OpenStreetMap"} →
              </a>
            </div>
            <div className="lg:col-span-5">
              <h2 className="bn-heading flex items-center gap-2 text-xl text-forest">
                <Waves aria-hidden="true" className="h-5 w-5 text-forest" />
                {bn ? "ভৌগোলিক পরিচয়" : "Geography"}
              </h2>
              <p className="bn mt-2 text-[15px] leading-8 text-body">{constituency.geography[locale]}</p>

              <h2 className="bn-heading mt-8 flex items-center gap-2 text-xl text-forest">
                <Building2 aria-hidden="true" className="h-5 w-5 text-forest" />
                {bn ? "উপজেলা ও প্রশাসনিক একক" : "Upazilas and units"}
              </h2>
              <ul className="mt-2 divide-y divide-line border-y border-line">
                {constituency.upazilas.map((u) => (
                  <li key={u.en} className="flex items-center gap-2 py-3 text-[15px] font-semibold text-charcoal">
                    <MapPin aria-hidden="true" className="h-4 w-4 shrink-0 text-forest" />
                    {u[locale]}
                  </li>
                ))}
                {constituency.unions.map((u) => (
                  <li key={u.en} className="py-3 pl-6 text-[14px] text-body">
                    {u[locale]}
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-[11.5px] leading-5 text-muted">
                {bn
                  ? "ইউনিয়ন ও ওয়ার্ডভিত্তিক তালিকা সম্পূর্ণ করে যাচাই শেষে হালনাগাদ করা হবে।"
                  : "The union and ward-level list will be completed and updated after verification."}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Priorities */}
      <section className="border-t border-line bg-offwhite py-12 sm:py-16">
        <Container>
          <h2 className="bn-heading text-2xl text-forest sm:text-3xl">
            {bn ? "জনসেবার অগ্রাধিকার" : "Public service priorities"}
          </h2>
          <ol className="mt-6 grid gap-px overflow-hidden rounded-[2px] border border-line bg-line sm:grid-cols-2">
            {constituency.priorities.map((p, i) => (
              <li key={p.id} className="bg-white p-6">
                <span aria-hidden="true" className="font-sans text-sm font-bold tabular-nums text-gold-deep">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="bn-heading mt-2 text-[17px] leading-snug text-forest">{p.title[locale]}</h3>
                <p className="bn mt-2 text-[14px] leading-7 text-body">{p.body[locale]}</p>
                <div className="mt-3">
                  <VerificationBadge status={p.verification} locale={locale} />
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Development status note + CTA */}
      <section className="border-t border-line bg-white py-12">
        <Container>
          <div className="grid items-center gap-6 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <h2 className="bn-heading text-xl text-forest">
                {bn ? "প্রকল্পের অবস্থা: ঘোষিত নয়, যাচাইযোগ্য" : "Project status: not self-declared, verifiable"}
              </h2>
              <p className="bn mt-2 max-w-3xl text-[14.5px] leading-7 text-body">
                {bn
                  ? "কোনো প্রকল্প ‘চলমান’ বা ‘সম্পন্ন’ হিসেবে দাবি করার আগে অনুমোদন, বরাদ্দ ও কাজের অগ্রগতি যাচাই করা হয়। অযাচাইকৃত অগ্রগতি প্রকাশ করা হয় না; প্রতিটি এন্ট্রিতে উৎস ও হালনাগাদের তারিখ দেওয়া থাকে।"
                  : "No project is claimed as ongoing or completed before approval, allocation and physical progress are verified. Unverified progress is never published; every entry carries a source and last-updated date."}
              </p>
            </div>
            <div className="lg:col-span-4 lg:text-right">
              <Link
                href={localePath(locale, "/initiatives")}
                className="group inline-flex h-12 items-center gap-2 rounded-[2px] border border-forest bg-forest px-6 text-[14px] font-semibold text-white transition-colors hover:bg-forest-deep"
              >
                {bn ? "জনউদ্যোগ দেখুন" : "See the initiatives"}
                <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
