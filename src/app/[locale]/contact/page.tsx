import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MapPin, Phone, Mail, Clock, ShieldCheck } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { isLocale } from "@/i18n/config";
import { pageMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { PageHeader } from "@/components/shared/page-header";
import { Container } from "@/components/ui/layout";
import { RequestForm } from "@/components/forms/request-form";
import { contactInfo } from "@/content/contact";

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
    path: "/contact",
    title: bn ? "যোগাযোগ" : "Contact",
    description: bn
      ? "যাচাইকৃত সরকারি যোগাযোগের তথ্য এবং সরাসরি অনুরোধ পাঠানোর ফর্ম।"
      : "Verified official contact details and a direct request form.",
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const bn = locale === "bn";

  const pendingBadge = (
    <span className="inline-flex rounded-[2px] border border-gold/50 bg-gold/15 px-2 py-0.5 text-[10.5px] font-bold uppercase tracking-[0.14em] text-gold-deep">
      {bn ? "যাচাই চলমান" : "Verification pending"}
    </span>
  );

  return (
    <>
      <Breadcrumbs locale={locale} items={[{ label: bn ? "যোগাযোগ" : "Contact" }]} />
      <PageHeader
        kicker={bn ? "যোগাযোগ" : "Contact"}
        title={bn ? "যোগাযোগ করুন" : "Get in touch"}
        description={
          bn
            ? "যাচাইকৃত অফিস তথ্য ও সহজ যোগাযোগ। যাচাই না হওয়া নম্বর বা ঠিকানা প্রকাশ করা হয় না — তাই কিছু ঘর এখনো ফাঁকা।"
            : "Verified office details and easy ways to reach us. Unverified numbers and addresses are never published — some fields are intentionally empty."
        }
      />

      <section className="bg-white py-12 sm:py-16">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <h2 className="bn-heading text-xl text-forest sm:text-2xl">
                {bn ? "অফিস" : "The office"}
              </h2>
              <ul className="mt-4 divide-y divide-line border-y border-line">
                <li className="flex gap-4 py-5">
                  <MapPin aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-forest" />
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted">
                      {bn ? "ঠিকানা" : "Address"}
                    </p>
                    {contactInfo.officeAddress ? (
                      <p className="bn mt-1 whitespace-pre-line text-[15px] leading-7 text-body">
                        {contactInfo.officeAddress[locale]}
                      </p>
                    ) : (
                      <p className="mt-1.5">{pendingBadge}</p>
                    )}
                  </div>
                </li>
                <li className="flex gap-4 py-5">
                  <Phone aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-forest" />
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted">
                      {bn ? "ফোন" : "Phone"}
                    </p>
                    {contactInfo.phone ? (
                      <a href={`tel:${contactInfo.phone}`} className="link-underline mt-1 inline-block font-semibold text-body">
                        {contactInfo.phone}
                      </a>
                    ) : (
                      <p className="mt-1.5">{pendingBadge}</p>
                    )}
                  </div>
                </li>
                <li className="flex gap-4 py-5">
                  <Mail aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-forest" />
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted">
                      {bn ? "ইমেইল" : "Email"}
                    </p>
                    {contactInfo.email ? (
                      <a href={`mailto:${contactInfo.email}`} className="link-underline mt-1 inline-block font-semibold text-body">
                        {contactInfo.email}
                      </a>
                    ) : (
                      <p className="mt-1.5">{pendingBadge}</p>
                    )}
                  </div>
                </li>
                <li className="flex gap-4 py-5">
                  <Clock aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-forest" />
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted">
                      {bn ? "কার্যঘণ্টা" : "Office hours"}
                    </p>
                    {contactInfo.officeHours ? (
                      <p className="bn mt-1 text-[15px] text-body">{contactInfo.officeHours[locale]}</p>
                    ) : (
                      <p className="mt-1.5">{pendingBadge}</p>
                    )}
                  </div>
                </li>
              </ul>

              {contactInfo.mapEmbedUrl ? (
                <div className="mt-6 overflow-hidden rounded-[2px] border border-line">
                  <iframe
                    title={bn ? "অফিসের মানচিত্র" : "Office map"}
                    src={contactInfo.mapEmbedUrl}
                    className="h-56 w-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              ) : (
                <p className="mt-6 flex items-start gap-3 rounded-[2px] border border-dashed border-line-strong bg-offwhite p-4 text-[12.5px] leading-6 text-muted">
                  <ShieldCheck aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0" />
                  {bn
                    ? "অফিসের মানচিত্র যাচাইকৃত ঠিকানা প্রকাশের পর এখানে যুক্ত হবে।"
                    : "An office map will be embedded once the verified address is published."}
                </p>
              )}

              <div className="mt-6">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted">
                  {bn ? "সামাজিক মাধ্যম" : "Social profiles"}
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {contactInfo.socials.map((s) =>
                    s.url ? (
                      <a
                        key={s.id}
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer me"
                        className="rounded-[2px] border border-line-strong px-3 py-1.5 text-[12px] font-semibold text-body hover:border-forest hover:text-forest"
                      >
                        {s.label}
                      </a>
                    ) : (
                      <span
                        key={s.id}
                        className="rounded-[2px] border border-line px-3 py-1.5 text-[12px] font-medium text-muted"
                        title={bn ? "যাচাইকৃত প্রোফাইল যুক্ত করা হবে" : "Verified profile to be linked"}
                      >
                        {s.label} · {bn ? "যাচাইাধীন" : "pending"}
                      </span>
                    ),
                  )}
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <h2 className="bn-heading text-xl text-forest sm:text-2xl">
                {bn ? "অনলাইনে বার্তা পাঠান" : "Send a message online"}
              </h2>
              <p className="bn mt-2 max-w-xl text-[14px] leading-7 text-body">
                {bn
                  ? "নিচের ফর্মটি ‘নাগরিক সেবা’–র মতোই — যা সংরক্ষণ করা হয় তাই দেখানো হয়; কোনো মিথ্যা নিশ্চিতকরণ বার্তা দেখানো হয় না।"
                  : "This form works like the citizen services form — what is stored is what you are told; no false confirmation is ever shown."}
              </p>
              <div className="mt-5">
                <RequestForm locale={locale} />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
