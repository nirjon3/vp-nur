import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Locale } from "@/i18n/config";
import { isLocale } from "@/i18n/config";
import { pageMetadata } from "@/lib/seo";
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
    title: bn ? "গ্যালারি" : "Gallery",
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
      <PageHeader
        title={bn ? "গ্যালারি" : "Gallery"}
      />
      <section className="bg-white py-10 sm:py-14">
        <Container>
          <MediaGallery items={mediaItems} locale={locale} />
        </Container>
      </section>
    </>
  );
}
