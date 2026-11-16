import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Locale } from "@/i18n/config";
import { isLocale } from "@/i18n/config";
import { pageMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { PageHeader } from "@/components/shared/page-header";
import { Container } from "@/components/ui/layout";
import { MediaGallery } from "@/components/media/media-gallery";
import { mediaItems } from "@/content/media";

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
    path: "/media",
    title: bn ? "মিডিয়া সেন্টার — ছবি ও ভিডিও" : "Media centre — photos and videos",
    description: bn
      ? "ছবি, ভিডিও, সাক্ষাৎকার ও অনুষ্ঠানের সংগৃহীত ও যাচাইকৃত মিডিয়া আর্কাইভ।"
      : "A curated, verified archive of photos, videos, interviews and event coverage.",
  });
}

export default async function MediaPage({
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
      <Breadcrumbs locale={locale} items={[{ label: bn ? "মিডিয়া সেন্টার" : "Media centre" }]} />
      <PageHeader
        kicker={bn ? "মিডিয়া" : "Media"}
        title={bn ? "মিডিয়া সেন্টার" : "Media centre"}
        description={
          bn
            ? "সংসদীয় কার্যক্রম, জনসমাবেশ, সাক্ষাৎকার ও বিভিন্ন ঐতিহাসিক মুহূর্তের যাচাইকৃত আলোকচিত্র ও ভিডিও সংকলন।"
            : "A curated and verified archive of parliamentary activities, public speeches, interviews, and historical moments."
        }
      />
      <section className="bg-white py-10 sm:py-14">
        <Container>
          <MediaGallery items={mediaItems} locale={locale} />
        </Container>
      </section>
    </>
  );
}
