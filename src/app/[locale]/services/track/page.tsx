import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Locale } from "@/i18n/config";
import { isLocale } from "@/i18n/config";
import { pageMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { PageHeader } from "@/components/shared/page-header";
import { Container } from "@/components/ui/layout";
import { TrackForm } from "@/components/forms/track-form";
import { getDictionary } from "@/i18n/dictionaries";

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
    path: "/services/track",
    title: bn ? "অনুরোধ ট্র্যাক করুন" : "Track a request",
    description: bn
      ? "ট্র্যাকিং নম্বর ও জমা দেওয়া মোবাইল নম্বর দিয়ে অনুরোধের অবস্থা দেখুন।"
      : "Check your request's status with the tracking reference and the phone number used at submission.",
    index: false,
  });
}

export default async function TrackPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const bn = locale === "bn";

  const statuses = [
    { key: "received", label: dict.status.received, desc: bn ? "অনুরোধটি পৌঁছেছে ও নথিতে আছে।" : "The request arrived and is on file." },
    { key: "underReview", label: dict.status.underReview, desc: bn ? "দায়িত্বপ্রাপ্ত ব্যক্তি বা দপ্তর পর্যালোচনা করছেন।" : "Being reviewed by the responsible person or department." },
    { key: "referred", label: dict.status.referred, desc: bn ? "বিষয়টি সংশ্লিষ্ট দপ্তরে প্রেরণ করা হয়েছে।" : "Forwarded to the concerned department." },
    { key: "closed", label: dict.status.closed, desc: bn ? "বিষয়টির নিষ্পত্তি হয়েছে।" : "The matter has been resolved." },
  ];

  return (
    <>
      <Breadcrumbs
        locale={locale}
        items={[
          { label: bn ? "নাগরিক সেবা" : "Citizen services", href: "/services" },
          { label: bn ? "ট্র্যাক" : "Track" },
        ]}
      />
      <PageHeader
        kicker={bn ? "ট্র্যাকিং" : "Tracking"}
        title={bn ? "অনুরোধের অগ্রগতি দেখুন" : "Check your request"}
        description={
          bn
            ? "জমা দেওয়ার সময় পাওয়া ট্র্যাকিং নম্বর এবং আপনার মোবাইল নম্বর — দুটোই দিন। সঠিক মিল পেলে শুধু অবস্থা দেখা যাবে; অন্য কারও তথ্য কখনো দেখা যাবে না।"
            : "Enter the tracking reference and your mobile number. A status is shown only when both match — nobody else's request is ever visible."
        }
      />

      <section className="bg-white py-12 sm:py-16">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <TrackForm locale={locale} />
            </div>
            <aside className="lg:col-span-6">
              <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold-deep">
                {bn ? "অবস্থার অর্থ" : "What the statuses mean"}
              </h2>
              <ol className="mt-4 divide-y divide-line border-y border-line">
                {statuses.map((s) => (
                  <li key={s.key} className="py-4">
                    <p className="bn-heading text-[15px] text-forest">{s.label}</p>
                    <p className="bn mt-1 text-[13px] leading-6 text-body">{s.desc}</p>
                  </li>
                ))}
              </ol>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
