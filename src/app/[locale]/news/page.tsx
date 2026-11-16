import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Locale } from "@/i18n/config";
import { isLocale } from "@/i18n/config";
import { pageMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { PageHeader } from "@/components/shared/page-header";
import { Container } from "@/components/ui/layout";
import { NewsBrowser } from "@/components/news/news-browser";
import { newsArticles } from "@/content/news";

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
    path: "/news",
    title: bn ? "সংবাদ ও হালনাগাদ" : "News and updates",
    description: bn
      ? "নুরুল হক নুরের সংসদীয় কর্মকাণ্ড, এলাকার উদ্যোগ ও ঘোষণার সর্বশেষ সংবাদ — উৎসসহ যাচাইকৃত।"
      : "Latest news on parliamentary activities, constituency initiatives and announcements — verified with sources.",
  });
}

export default async function NewsPage({
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
      <Breadcrumbs locale={locale} items={[{ label: bn ? "সংবাদ" : "News" }]} />
      <PageHeader
        kicker={bn ? "সংবাদকক্ষ" : "Newsroom"}
        title={bn ? "সংবাদ ও হালনাগাদ" : "News and updates"}
        description={
          bn
            ? "উৎসসহ যাচাইকৃত সংবাদ ও হালনাগাদ। অযাচাইকৃত খবরে ‘যাচাই চলমান’ ব্যাজ দেখা যাবে; নিশ্চিত না হলে প্রকাশ করা হয় না।"
            : "Verified news and updates with sources. Unverified items carry a ‘verification pending’ badge; unconfirmed information is never published as fact."
        }
      />
      <section className="bg-white py-10 sm:py-14">
        <Container>
          <NewsBrowser items={newsArticles} locale={locale} />
        </Container>
      </section>
    </>
  );
}
