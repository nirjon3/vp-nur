import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ShieldCheck, ListChecks, Lock, ServerCrash, ArrowRight } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { isLocale, localePath } from "@/i18n/config";
import { pageMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { PageHeader } from "@/components/shared/page-header";
import { Container } from "@/components/ui/layout";
import { RequestForm } from "@/components/forms/request-form";

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
    path: "/services",
    title: bn ? "নাগরিক সেবা — অনুরোধ জমা দিন" : "Citizen services — submit a request",
    description: bn
      ? "আপনার এলাকার সমস্যা বা সেবার প্রয়োজন জানান — ট্র্যাকিং নম্বরসহ অনুরোধ জমা দিন। ব্যক্তিগত তথ্য শুধু অনুমোদিত সেবাকর্মী দেখেন।"
      : "Report your area's issues or service needs — submit a tracked request. Private details are visible only to authorised service operators.",
  });
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const bn = locale === "bn";

  const steps = bn
    ? [
        "ফর্মটি পূরণ করে জমা দিন — একটি ট্র্যাকিং নম্বর পাবেন।",
        "অনুরোধটি গ্রহণ করে নথিভুক্ত করা হবে এবং দায়িত্বপ্রাপ্ত কর্মকর্তা বা দপ্তরে প্রেরণ করা হবে।",
        "আপনি ‘অনুরোধ ট্র্যাক’ পৃষ্ঠায় অবস্থা যেকোনো সময় দেখতে পারবেন।",
      ]
    : [
        "Fill in the form and submit — you will receive a tracking reference.",
        "Your request is logged and referred to the responsible officer or department.",
        "You can check its status any time on the tracking page.",
      ];

  return (
    <>
      <Breadcrumbs locale={locale} items={[{ label: bn ? "নাগরিক সেবা" : "Citizen services" }]} />
      <PageHeader
        kicker={bn ? "নাগরিক সেবা" : "Citizen services"}
        title={bn ? "অনুরোধ জমা দিন" : "Submit a request"}
        description={
          bn
            ? "এলাকার সমস্যা, উন্নয়ন চাহিদা বা সেবা সংক্রান্ত অনুরোধ — একটি ফর্মে। জমা দেওয়ার পর ট্র্যাকিং নম্বর পাবেন; অন্য কেউ আপনার অনুরোধ দেখতে পারবেন না।"
            : "Area issues, development needs or service requests — one form. After submission you receive a tracking reference; nobody else can view your request."
        }
      />

      <section className="bg-white py-12 sm:py-16">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <RequestForm locale={locale} />
            </div>

            <aside className="lg:col-span-5">
              <div className="rounded-[2px] border border-line bg-offwhite p-6 sm:p-8">
                <h2 className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-gold-deep">
                  <ListChecks aria-hidden="true" className="h-4 w-4" />
                  {bn ? "প্রক্রিয়াটি যেমন" : "How it works"}
                </h2>
                <ol className="mt-4 space-y-4">
                  {steps.map((step, i) => (
                    <li key={i} className="flex gap-3">
                      <span aria-hidden="true" className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-forest font-sans text-[11px] font-bold text-white">
                        {i + 1}
                      </span>
                      <span className="bn text-[14px] leading-7 text-body">{step}</span>
                    </li>
                  ))}
                </ol>

                <div className="mt-6 space-y-4 border-t border-line-strong pt-6">
                  <div className="flex items-start gap-3">
                    <Lock aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-forest" />
                    <p className="bn text-[13px] leading-6 text-body">
                      {bn
                        ? "আপনার নাম, ফোন ও বিবরণ শুধু অনুমোদিত সেবাকর্মী দেখতে পারবেন। ট্র্যাকিংয়ে ট্র্যাকিং নম্বর ও সঠিক মোবাইল নম্বর — দুটোই লাগবে।"
                        : "Your name, phone and details are visible only to authorised service operators. Tracking requires both the reference and the exact phone number used."}
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <ServerCrash aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-forest" />
                    <p className="bn text-[13px] leading-6 text-body">
                      {bn
                        ? "অনুরোধটি সত্যিই সংরক্ষণ না হলে ‘গৃহীত’ দেখানো হয় না — তথ্যভান্ডারে সমস্যা থাকলে ত্রুটি বার্তা দেখাবে ও কিছু সংরক্ষিত হবে না।"
                        : "A request is never shown as received unless it was actually stored — if the datastore fails, you will see an error and nothing is saved."}
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <ShieldCheck aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-forest" />
                    <p className="bn text-[13px] leading-6 text-body">
                      {bn
                        ? "স্প্যাম রোধে সীমা ও স্বয়ংক্রিয় যাচাই প্রয়োগ করা হয়। জরুরি চিকিৎসা বা নিরাপত্তা সমস্যার জন্য সবসময় ৯৯৯–এ কল করুন।"
                        : "Rate limits and automated checks prevent spam. For medical or safety emergencies always call the national hotline (999)."}
                    </p>
                  </div>
                </div>

                <Link
                  href={localePath(locale, "/services/track")}
                  className="group mt-6 inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.12em] text-forest hover:text-forest-deep"
                >
                  {bn ? "আগের অনুরোধ ট্র্যাক করুন" : "Track an earlier request"}
                  <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
