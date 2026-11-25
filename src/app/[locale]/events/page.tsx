import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Locale } from "@/i18n/config";
import { isLocale } from "@/i18n/config";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/shared/page-header";
import { Container } from "@/components/ui/layout";
import { EventBrowser } from "@/components/events/event-browser";
import { getLiveEvents } from "@/lib/cms-live";

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
    path: "/events",
    title: bn ? "ইভেন্ট ও অনুষ্ঠানসূচি" : "Events & Public Schedule",
    description: bn
      ? "মাননীয় প্রতিমন্ত্রী মো. নুরুল হক, এমপি (ভিপি নুর)–এর সরকারি ও সংসদীয় এলাকার প্রকাশযোগ্য অনুষ্ঠানসূচি ও গণশুনানি।"
      : "Official public schedule, hearings, and civic engagements of State Minister Md. Nurul Hoque, MP (VP Nur).",
  });
}

export default async function EventsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const bn = locale === "bn";
  const events = await getLiveEvents();

  return (
    <>
      <PageHeader
        title={bn ? "ইভেন্ট ও অনুষ্ঠানসূচি" : "Events & Public Schedule"}
      />

      <section className="bg-white py-10 sm:py-14">
        <Container>
          {/* Event Browser with Live Search & Tabs */}
          <EventBrowser items={events} locale={locale} />
        </Container>
      </section>
    </>
  );
}
