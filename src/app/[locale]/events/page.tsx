import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CalendarDays, MapPin, ShieldAlert } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { isLocale } from "@/i18n/config";
import { pageMetadata } from "@/lib/seo";
import { getDictionary } from "@/i18n/dictionaries";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { PageHeader } from "@/components/shared/page-header";
import { Container } from "@/components/ui/layout";
import { VerificationBadge } from "@/components/shared/verification";
import { formatDate } from "@/lib/format";
import { events } from "@/content/events";

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
    title: bn ? "অনুষ্ঠানসূচি ও ইভেন্ট" : "Events and schedule",
    description: bn
      ? "নিশ্চিত ও প্রকাশযোগ্য অনুষ্ঠানসূচি — শুধু জনগণের জন্য উন্মুক্ত, নিশ্চিতকৃত ইভেন্ট।"
      : "Confirmed, public events only — never confidential scheduling information.",
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
  const dict = getDictionary(locale);
  const bn = locale === "bn";

  // Classification is editorial (the `status` field), not clock-based, so
  // rendering stays pure and deterministic.
  const upcoming = events
    .filter((e) => e.status === "upcoming")
    .sort((a, b) => a.date.localeCompare(b.date));
  const past = events
    .filter((e) => e.status === "past")
    .sort((a, b) => b.date.localeCompare(a.date));

  const renderEvent = (e: (typeof events)[number]) => (
    <li
      key={e.id}
      className="grid gap-3 border-b border-line py-6 last:border-b-0 sm:grid-cols-12 sm:gap-6"
    >
      <div className="sm:col-span-3">
        <p className="bn-heading text-lg leading-snug text-forest">{formatDate(e.date, locale)}</p>
        {e.time ? <p className="bn mt-0.5 text-[12.5px] font-semibold text-muted">{e.time[locale]}</p> : null}
      </div>
      <div className="sm:col-span-9">
        <h2 className="bn-heading text-[17px] leading-snug text-charcoal">{e.title[locale]}</h2>
        <p className="mt-1 flex items-center gap-1.5 text-[12px] font-medium text-muted">
          <MapPin aria-hidden="true" className="h-4 w-4 shrink-0" />
          {e.location[locale]}
        </p>
        <p className="bn mt-2 text-[14px] leading-7 text-body">{e.description[locale]}</p>
        <div className="mt-3">
          <VerificationBadge status={e.verification} locale={locale} />
        </div>
      </div>
    </li>
  );

  return (
    <>
      <Breadcrumbs locale={locale} items={[{ label: bn ? "অনুষ্ঠানসূচি" : "Events" }]} />
      <PageHeader
        kicker={bn ? "প্রকাশযোগ্য সময়সূচি" : "Public schedule"}
        title={bn ? "অনুষ্ঠান ও সময়সূচি" : "Events and schedule"}
        description={
          bn
            ? "শুধু নিশ্চিত ও জনগণের জন্য উন্মুক্ত অনুষ্ঠানগুলো এখানে প্রকাশিত হয়। ব্যক্তিগত বা নিরাপত্তা-সংবেদনশীল সময়সূচি প্রকাশ করা হয় না; তারিখ পরিবর্তন হলে এই পৃষ্ঠা হালনাগাদ হয়।"
            : "Only confirmed, publicly open events are published here. Private or security-sensitive schedules are never published; this page is updated when details change."
        }
      />

      <section className="bg-white py-12 sm:py-16">
        <Container>
          <p className="flex max-w-2xl items-start gap-3 rounded-[2px] border border-gold/40 bg-gold/10 p-4 text-[12.5px] leading-6 text-charcoal">
            <ShieldAlert aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-gold-deep" />
            <span>
              {bn
                ? "কোনো অনুষ্ঠানের তারিখ, সময় বা স্থান প্রকাশের আগে সংশ্লিষ্ট আয়োজক কর্তৃপক্ষের নিশ্চিতকরণ নেওয়া হয়।"
                : "Date, time and venue are published only after confirmation from the organising authority."}
            </span>
          </p>

          <div className="mt-10 grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-gold-deep">
                <CalendarDays aria-hidden="true" className="h-4 w-4" />
                {dict.status.upcoming}
              </h2>
              {upcoming.length > 0 ? (
                <ul className="mt-4 border-t border-line">{upcoming.map(renderEvent)}</ul>
              ) : (
                <p className="mt-4 rounded-[2px] border border-dashed border-line-strong bg-offwhite p-6 text-[13px] leading-6 text-muted">
                  {bn
                    ? "ঘোষিত কোনো আসন্ন অনুষ্ঠান নেই। নিশ্চিত হওয়া মাত্রই এখানে প্রকাশিত হবে।"
                    : "No confirmed upcoming events right now. They will be published here as soon as they are confirmed."}
                </p>
              )}
            </div>
            <div>
              <h2 className="text-[11px] font-bold uppercase tracking-[0.22em] text-muted">
                {dict.status.past}
              </h2>
              {past.length > 0 ? (
                <ul className="mt-4 border-t border-line">{past.map(renderEvent)}</ul>
              ) : (
                <p className="mt-4 rounded-[2px] border border-dashed border-line-strong bg-offwhite p-6 text-[13px] text-muted">
                  {dict.common.noResults}
                </p>
              )}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
