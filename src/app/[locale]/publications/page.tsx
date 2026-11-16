import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Locale } from "@/i18n/config";
import { isLocale } from "@/i18n/config";
import { pageMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { PageHeader } from "@/components/shared/page-header";
import { Container } from "@/components/ui/layout";
import { PublicationsBrowser } from "@/components/publications/publications-browser";
import { publications } from "@/content/publications";

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
    path: "/publications",
    title: bn ? "প্রকাশনা ও দলিল লাইব্রেরি" : "Publications and document library",
    description: bn
      ? "প্রকাশ্য প্রকাশনা, প্রতিবেদন ও দলিল — অনুসন্ধান ও বিভাগ অনুযায়ী ফিল্টারসহ।"
      : "Public reports and documents — searchable and filterable by category.",
  });
}

export default async function PublicationsPage({
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
      <Breadcrumbs locale={locale} items={[{ label: bn ? "প্রকাশনা" : "Publications" }]} />
      <PageHeader
        kicker={bn ? "দলিল লাইব্রেরি" : "Document library"}
        title={bn ? "প্রকাশনা ও দলিল" : "Publications and documents"}
        description={
          bn
            ? "শুধু প্রকাশ্য করে দেওয়া যেতে পারে এমন উপকরণই এখানে রাখা হয়। প্রতিটি নথি যাচাইকৃত উৎসসহ হালনাগাদ হয়।"
            : "Only publicly releasable material is kept here. Every document is maintained with a verified source."
        }
      />
      <section className="bg-white py-10 sm:py-14">
        <Container>
          <PublicationsBrowser items={publications} locale={locale} />
        </Container>
      </section>
    </>
  );
}
