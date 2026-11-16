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
    path: "/terms",
    title: bn ? "ব্যবহারের শর্তাবলি" : "Terms of use",
    description: bn ? "এই ওয়েবসাইট ব্যবহারের শর্ত ও দায়বদ্ধতার সীমা।" : "Terms and limits of use for this website.",
  });
}

export default async function TermsPage({
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
          h: "সাইটের প্রকৃতি",
          p: "এটি নুরুল হক নুর (ভিপি নুর) সংক্রান্ত জনতথ্য প্রকাশের একটি ব্যক্তিগত উদ্যোগ। এটি কোনো সরকারি ওয়েবসাইট নয় এবং সরকারি দপ্তরের দাপ্তরিক অবস্থানের বিকল্প নয়।",
        },
        {
          h: "তথ্যের সঠিকতা",
          p: "প্রকাশিত উপাদান উৎসসহ যাচাইকৃত হলেই ‘যাচাইকৃত’ চিহ্নিত হয়। যাচাই চলমান উপাদান ত্রুটিযুক্ত হতে পারে; গুরুত্বপূর্ণ সিদ্ধান্তের আগে সরকারি বা প্রাথমিক উৎস থেকে নিশ্চিত হয়ে নিন।",
        },
        {
          h: "দায়মুক্তি",
          p: "মত প্রকাশের অংশ হিসেবে প্রকাশিত বিশ্লেষণ ও মন্তব্য ব্যক্তিগত; এগুলো কোনো সরকারি সিদ্ধান্ত নয়। এই সাইটের তথ্য ব্যবহারজনিত ক্ষতির জন্য ওয়েবসাইট টিম দায়ী নয়।",
        },
        {
          h: "বৌদ্ধিক সম্পত্তি",
          p: "অনুমতিপ্রাপ্ত ছবি ও দলিলগুলো তাদের নিজ নিজ মালিকদের; অগ্রাধিকারের ক্ষেত্রে ‘যাচাইকৃত উৎস’ লিংকটি অনুসরণ করুন।",
        },
        {
          h: "পরিবর্তন",
          p: "এই শর্তাবলি যেকোনো সময় সংশোধন হতে পারে; গুরুত্বপূর্ণ পরিবর্তন এখানে সুস্পষ্টভাবে উল্লেখ করা হবে।",
        },
      ]
    : [
        {
          h: "Nature of this site",
          p: "This is a private initiative publishing public information about Nurul Haque Nur (VP Nur). It is not a government website and does not replace the official position of government departments.",
        },
        {
          h: "Accuracy of information",
          p: "Content is marked verified only after confirmation against a source. Items pending verification may be inaccurate; confirm through official or primary sources before acting on anything here.",
        },
        {
          h: "Limitation of liability",
          p: "Analytical commentary expresses a personal view and is not a government decision. The website team is not liable for losses arising from use of the information on this site.",
        },
        {
          h: "Intellectual property",
          p: "Authorised photographs and documents remain the property of their respective owners; where applicable, follow the linked source.",
        },
        {
          h: "Changes",
          p: "These terms may be amended at any time; material changes will be stated explicitly on this page.",
        },
      ];

  return (
    <>
      <Breadcrumbs locale={locale} items={[{ label: bn ? "ব্যবহারের শর্তাবলি" : "Terms of use" }]} />
      <PageHeader kicker={bn ? "আইনি" : "Legal"} title={bn ? "ব্যবহারের শর্তাবলি" : "Terms of use"} />
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
