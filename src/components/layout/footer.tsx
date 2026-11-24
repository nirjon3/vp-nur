import Link from "next/link";
import { getDictionary } from "@/i18n/dictionaries";
import { localePath, type Locale } from "@/i18n/config";
import { contactInfo } from "@/content/contact";

export function Footer({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const year = new Date().getFullYear();

  const exploreLinks = [
    { href: "/about", label: dict.nav.about },
    { href: "/parliament", label: dict.nav.parliament },
    { href: "/constituency", label: dict.nav.constituency },
    { href: "/news", label: dict.nav.news },
    { href: "/initiatives", label: dict.nav.initiatives },
  ];
  const serviceLinks = [
    { href: "/services", label: dict.nav.services },
    { href: "/services/track", label: locale === "bn" ? "অনুরোধ ট্র্যাক করুন" : "Track a request" },
    { href: "/events", label: dict.nav.events },
    { href: "/publications", label: dict.nav.publications },
    { href: "/media", label: dict.nav.media },
  ];

  return (
    <footer className="border-t border-forest-ink/10 bg-forest-ink text-[#e9ece7]">
      <div className="mx-auto max-w-[1280px] px-4 py-12 sm:px-6 sm:py-16 lg:px-10">
        <div className="grid gap-10 md:grid-cols-12">
          {/* Identity */}
          <div className="md:col-span-4">
            <Link
              href={localePath(locale, "/")}
              className="flex items-center gap-3"
              aria-label={dict.site.homeAria}
            >
              <span
                aria-hidden="true"
                className="flex h-10 w-10 items-center justify-center rounded-[2px] bg-gold font-bengali text-[22px] font-semibold text-forest-ink"
              >
                {locale === "bn" ? "ন" : "N"}
              </span>
              <span className="leading-tight">
                <span className="bn-heading block text-base text-white">{dict.site.name}</span>
                <span className="block text-[10px] font-semibold uppercase tracking-[0.22em] text-gold">
                  {dict.site.shortName}
                </span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-[13.5px] leading-relaxed text-[#c9cfc5]">
              {dict.footer.description}
            </p>
            <p className="mt-4 max-w-sm border-l-2 border-gold/60 pl-3 text-[11.5px] leading-relaxed text-[#a9b3a4]">
              {dict.footer.disclosure}
            </p>
          </div>

          {/* Explore */}
          <div className="md:col-span-2">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.18em] text-gold">
              {dict.footer.explore}
            </h2>
            <ul className="mt-3 space-y-2 text-[13.5px]">
              {exploreLinks.map((l) => (
                <li key={l.href}>
                  <Link className="hover:text-white hover:underline" href={localePath(locale, l.href)}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="md:col-span-2">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.18em] text-gold">
              {dict.footer.services}
            </h2>
            <ul className="mt-3 space-y-2 text-[13.5px]">
              {serviceLinks.map((l) => (
                <li key={l.href}>
                  <Link className="hover:text-white hover:underline" href={localePath(locale, l.href)}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-4">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.18em] text-gold">
              {dict.footer.contact}
            </h2>
            <div className="mt-3 text-[13.5px] leading-relaxed text-[#c9cfc5]">
              {contactInfo.officeAddress ? (
                <p className="whitespace-pre-line">{contactInfo.officeAddress[locale]}</p>
              ) : (
                <p className="text-[#a9b3a4]">{dict.footer.contactPending}</p>
              )}
              {contactInfo.phone ? (
                <p className="mt-2">
                  <a href={`tel:${contactInfo.phone}`} className="hover:text-white hover:underline">
                    {contactInfo.phone}
                  </a>
                </p>
              ) : null}
              {contactInfo.email ? (
                <p className="mt-1">
                  <a href={`mailto:${contactInfo.email}`} className="hover:text-white hover:underline">
                    {contactInfo.email}
                  </a>
                </p>
              ) : null}
              <div className="mt-3 flex gap-3 text-[12px]">
                {contactInfo.socials.map((s) =>
                  s.url ? (
                    <a
                      key={s.id}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer me"
                      className="rounded-[2px] border border-white/15 px-2 py-1 hover:border-gold hover:text-gold"
                    >
                      {s.label}
                    </a>
                  ) : null,
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <p className="mt-8 border-t border-white/10 pt-5 text-[11px] leading-5 text-[#8f9a89]">
          {locale === "bn"
            ? "আলোকচিত্র ও ভিডিওর উৎস প্রতিটি মিডিয়া পৃষ্ঠায় উল্লেখিত; Wikimedia Commons-এর লাইসেন্সপ্রযোজ্য ফাইলগুলো সেখানেই দেখা যায়।"
            : "Sources for photographs and videos are listed on each media page; license-applicable Wikimedia Commons files are attributed there."}
        </p>
        <div className="mt-3 flex flex-col gap-3 text-[12px] text-[#a9b3a4] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {dict.site.name} — {dict.footer.rights}
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link href={localePath(locale, "/privacy")} className="hover:text-white hover:underline">
              {dict.footer.privacy}
            </Link>
            <Link href={localePath(locale, "/terms")} className="hover:text-white hover:underline">
              {dict.footer.terms}
            </Link>
            <span className="hidden sm:inline">{dict.footer.ownership}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
