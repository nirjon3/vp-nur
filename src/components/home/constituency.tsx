import Link from "next/link";
import {
  ArrowRight,
  Waves,
  Route,
  HeartPulse,
  GraduationCap,
  MapPin,
} from "lucide-react";
import type { Locale } from "@/i18n/config";
import { localePath } from "@/i18n/config";
import { constituency } from "@/content/constituency";
import { Container } from "@/components/ui/layout";
import { ConstituencyAreaMap } from "@/components/shared/constituency-area-map";

const priorityIcons: Record<string, typeof Waves> = {
  embankment: Waves,
  roads: Route,
  health: HeartPulse,
  education: GraduationCap,
};

const priorityTags: Record<string, { bn: string; en: string }> = {
  embankment: { bn: "উপকূলীয় সুরক্ষা", en: "Coastal Defense" },
  roads: { bn: "গ্রামীণ অবকাঠামো", en: "Rural Infrastructure" },
  health: { bn: "জনস্বাস্থ্য সেবা", en: "Healthcare" },
  education: { bn: "শিক্ষা ও প্রশিক্ষণ", en: "Education" },
};

/** Constituency overview: interactive map + structured priority cards. */
export function ConstituencySection({ locale }: { locale: Locale }) {
  const bn = locale === "bn";

  return (
    <section className="border-t border-line bg-offwhite/50 py-12 sm:py-16">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-5">
          <div>
            <h2 className="bn-heading text-2xl text-forest sm:text-3xl">
              {constituency.name[locale]}
              <span className="ml-2 font-normal text-muted text-lg sm:text-xl">
                ({constituency.upazilas.map((u) => u[locale]).join(" · ")})
              </span>
            </h2>
          </div>
          <Link
            href={localePath(locale, "/initiatives")}
            className="group inline-flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-[0.12em] text-forest hover:text-forest-deep"
          >
            {bn ? "উন্নয়ন উদ্যোগসমূহ" : "View all initiatives"}
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Enhanced Priority Cards */}
          <div className="flex flex-col justify-between lg:col-span-7">
            <div>
              <h3 className="bn-heading text-lg font-bold text-forest">
                {bn ? "মূল উন্নয়ন অগ্রাধিকারসমূহ" : "Core Development Priorities"}
              </h3>
              <div className="mt-4 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                {constituency.priorities.map((p) => {
                  const Icon = priorityIcons[p.id] ?? Waves;
                  const tag = priorityTags[p.id] ?? {
                    bn: "উন্নয়ন",
                    en: "Development",
                  };
                  return (
                    <div
                      key={p.id}
                      className="group flex flex-col justify-between rounded-[2px] border border-line bg-white p-4 shadow-2xs transition-all hover:border-forest/40 hover:shadow-xs"
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="flex h-9 w-9 items-center justify-center rounded-[2px] bg-forest/5 text-forest group-hover:bg-forest group-hover:text-white transition-colors">
                            <Icon className="h-4.5 w-4.5" />
                          </span>
                          <span className="rounded-[2px] bg-gold/10 px-2 py-0.5 text-[10.5px] font-semibold text-gold-deep">
                            {tag[locale]}
                          </span>
                        </div>
                        <h4 className="bn-heading mt-3 text-[15px] font-bold leading-snug text-charcoal">
                          {p.title[locale]}
                        </h4>
                      </div>
                      <p className="bn mt-2 text-[12.5px] leading-relaxed text-muted line-clamp-2">
                        {p.body[locale]}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick fact bar */}
            <div className="mt-6 flex flex-wrap items-center gap-4 rounded-[2px] border border-line bg-white p-3.5 text-[12.5px] text-muted">
              <span className="flex items-center gap-1.5 font-semibold text-forest">
                <MapPin className="h-4 w-4 text-gold-deep" />
                {bn ? "উপজেলা: গালাচিপা ও দশমিনা" : "Upazilas: Galachipa & Dashmina"}
              </span>
              <span className="text-line-strong">•</span>
              <span>
                {bn
                  ? "উপকূলীয় ও নদীবেষ্টিত এলাকা"
                  : "Coastal and estuarial belt"}
              </span>
            </div>
          </div>

          {/* Map with interactive area selection */}
          <div className="flex flex-col justify-start lg:col-span-5">
            <ConstituencyAreaMap locale={locale} />
          </div>
        </div>
      </Container>
    </section>
  );
}
