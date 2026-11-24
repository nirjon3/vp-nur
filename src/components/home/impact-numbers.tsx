import Link from "next/link";
import { Award, Landmark, FolderGit2, ShieldCheck, ArrowRight } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { localePath } from "@/i18n/config";
import { Container } from "@/components/ui/layout";

export function ImpactNumbers({ locale }: { locale: Locale }) {
  const bn = locale === "bn";

  const stats = [
    {
      icon: Award,
      value: bn ? "২০১৯" : "2019",
      label: bn ? "ঐতিহাসিক ছাত্র নেতৃত্ব" : "Historic Student Leadership",
      detail: bn
        ? "ডাকসু ভিপি নির্বাচিত, ঢাকা বিশ্ববিদ্যালয়"
        : "Elected DUCSU VP, University of Dhaka",
      href: "/about",
    },
    {
      icon: Landmark,
      value: bn ? "আসন ৩" : "Seat 3",
      label: bn ? "সংসদীয় নির্বাচনী আসন" : "Parliamentary Constituency",
      detail: bn
        ? "পটুয়াখালী-৩ (গালাচিপা · দশমিনা)"
        : "Patuakhali-3 (Galachipa · Dashmina)",
      href: "/constituency",
    },
    {
      icon: FolderGit2,
      value: bn ? "৬+" : "6+",
      label: bn ? "উন্নয়ন উদ্যোগ ও প্রকল্প" : "Development Initiatives",
      detail: bn
        ? "উপকূলীয় বেড়িবাঁধ ও নাগরিক প্রকল্প"
        : "Coastal embankments & infrastructure",
      href: "/initiatives",
    },
    {
      icon: ShieldCheck,
      value: bn ? "১০০%" : "100%",
      label: bn ? "নাগরিক সেবা প্ল্যাটফর্ম" : "Direct Citizen Service",
      detail: bn
        ? "সরাসরি আবেদনপত্র ও সার্বক্ষণিক ট্র্যাকিং"
        : "Online submission & status tracking",
      href: "/services",
    },
  ];

  return (
    <section className="border-b border-line bg-white py-10 sm:py-14">
      <Container>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <Link
                key={i}
                href={localePath(locale, stat.href)}
                className="group flex flex-col justify-between rounded-[2px] border border-line bg-offwhite/70 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-forest hover:bg-white hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="flex h-10 w-10 items-center justify-center rounded-[2px] bg-forest/5 text-forest transition-colors group-hover:bg-forest group-hover:text-white">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="font-mono text-2xl font-bold tracking-tight text-gold-deep sm:text-3xl">
                      {stat.value}
                    </span>
                  </div>

                  <h3 className="bn-heading mt-4 text-[16px] font-bold text-forest">
                    {stat.label}
                  </h3>
                  <p className="bn mt-1 text-[13px] leading-relaxed text-muted">
                    {stat.detail}
                  </p>
                </div>

                <div className="mt-4 flex items-center gap-1 text-[11.5px] font-bold text-forest group-hover:text-forest-deep">
                  <span>{bn ? "বিস্তারিত" : "Learn more"}</span>
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
