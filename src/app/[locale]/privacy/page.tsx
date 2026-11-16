import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Locale } from "@/i18n/config";
import { isLocale } from "@/i18n/config";
import { pageMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { PageHeader } from "@/components/shared/page-header";
import { Container } from "@/components/ui/layout";

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
    path: "/privacy",
    title: bn ? "গোপনীয়তা নীতি" : "Privacy policy",
    description: bn
      ? "এই ওয়েবসাইট কোন তথ্য সংগ্রহ করে, কেন করে এবং কীভাবে সুরক্ষিত রাখে।"
      : "What this website collects, why, and how it is protected.",
  });
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const bn = locale === "bn";

  const sections = bn
    ? [
        {
          h: "যে তথ্য সংগ্রহ করা হয়",
          p: "নাগরিক সেবা ফর্মে আপনি যে নাম, মোবাইল নম্বর, এলাকা, বিষয় ও বিবরণ দেন — এবং ঐচ্ছিকভাবে সংযুক্ত ফাইল। সাইটটি কোনো ট্র্যাকিং কুকি ব্যবহার করে না।",
        },
        {
          h: "তথ্য কেন সংগ্রহ করা হয়",
          p: "একমাত্র উদ্দেশ্য — আপনার অনুরোধ নথিভুক্ত করা, যথাযথ দায়িত্বপ্রাপ্ত কর্মকর্তা বা দপ্তরে প্রেরণ করা এবং ট্র্যাকিং নম্বরসহ আপনাকে জানাতে পারা। বিপণন বা বিজ্ঞাপনের জন্য তথ্য ব্যবহার করা হয় না।",
        },
        {
          h: "কে দেখতে পারে",
          p: "শুধু অনুমোদিত সেবাকর্মী (Service Operator) ও ওয়েবসাইট প্রশাসক। ট্র্যাকিংয়ের সময় ট্র্যাকিং নম্বর ও সঠিক মোবাইল নম্বর — দুটো মিললে তবেই অবস্থা দেখা যায়; অন্য কারও অনুরোধ দেখা যায় না।",
        },
        {
          h: "কতদিন রাখা হয়",
          p: "নিষ্পত্তির পর নির্ধারিত মেয়াদ পর্যন্ত রাখা হয়; মেয়াদ শেষে মুছে ফেলা বা বেনামী করা হয়। অনুরোধ করলে নাম মুছে দেওয়ার আবেদন করা যাবে।",
        },
        {
          h: "সুরক্ষা",
          p: "তথ্য সংরক্ষণে অ্যাক্সেস-নিয়ন্ত্রিত ডাটাবেজ ব্যবহৃত হয়; সংক্রমণের ক্ষেত্রে ৯৯৯ বা জাতীয় সহায়তা চ্যানেলে সরাসরি যোগাযোগ করুন।",
        },
      ]
    : [
        {
          h: "What is collected",
          p: "The citizen services form stores the name, phone number, area, subject and details you enter — and optionally an attached file. The site sets no tracking cookies.",
        },
        {
          h: "Why it is collected",
          p: "The sole purpose is to log your request, refer it to the responsible officer or department, and let you check progress with a tracking reference. Data is never used for marketing or advertising.",
        },
        {
          h: "Who can see it",
          p: "Only authorised Service Operators and website administrators. On the tracking page, status is shown only when both the reference and the exact phone number match; nobody else's request is visible.",
        },
        {
          h: "Retention",
          p: "Requests are retained for a defined period after closure, after which they are deleted or anonymised. You may ask for your name to be removed on request.",
        },
        {
          h: "Security",
          p: "Data is stored in an access-controlled database. For emergencies, always call the national hotline (999) rather than waiting for a website response.",
        },
      ];

  return (
    <>
      <Breadcrumbs locale={locale} items={[{ label: bn ? "গোপনীয়তা নীতি" : "Privacy policy" }]} />
      <PageHeader kicker={bn ? "আইনি" : "Legal"} title={bn ? "গোপনীয়তা নীতি" : "Privacy policy"} />
      <section className="bg-white py-12 sm:py-14">
        <Container>
          <div className="max-w-3xl space-y-8">
            {sections.map((s) => (
              <div key={s.h}>
                <h2 className="bn-heading text-lg text-forest">{s.h}</h2>
                <p className="bn mt-2 text-[15px] leading-8 text-body">{s.p}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
