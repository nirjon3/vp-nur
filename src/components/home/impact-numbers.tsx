import Link from "next/link";
import { Award, Landmark, ShieldCheck, ArrowRight } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { localePath } from "@/i18n/config";
import { Container } from "@/components/ui/layout";

export function ImpactNumbers({ locale }: { locale: Locale }) {
  const bn = locale === "bn";

  const stats = [
    {
      icon: Landmark,
      value: bn ? "প্রতিমন্ত্রী" : "State Min.",
      label: bn ? "প্রবাসী কল্যাণ মন্ত্রণালয়" : "Expatriates' Welfare Ministry",
      detail: bn
        ? "গণপ্রজাতন্ত্রী বাংলাদেশ সরকারের নির্বাহী দায়িত্ব"
        : "Executive portfolio, Government of Bangladesh",
      href: "/about",
    },
    {
      icon: Landmark,
      value: bn ? "আসন ৩" : "Seat 3",
      label: bn ? "সংসদীয় নির্বাচনী আসন" : "Parliamentary Constituency",
      detail: bn
        ? "পটুয়াখালী-৩ (গালাচিপা · দশমিনা)"
        : "Patuakhali-3 (Galachipa · Dashmina)",
      href: "/initiatives",
    },
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
      icon: ShieldCheck,
      value: bn ? "১০০%" : "100%",
      label: bn ? "নাগরিক ও প্রবাসী সেবা" : "Citizen & Diaspora Service",
      detail: bn
        ? "সরাসরি আবেদনপত্র ও সার্বক্ষণিক ট্র্যাকিং"
        : "Online submission & status tracking",
      href: "/services",
    },
  ];

  return (
    <section className="border-b border-line bg-white py-10 sm:py-14">
      <Container>
        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <Link
                key={i}
                href={localePath(locale, stat.href)}
                className="group flex flex-col justify-between rounded-xl border border-line bg-gradient-to-br from-white to-[#fbfdfa] p-3.5 sm:p-5 transition-all duration-300 hover:-translate-y-1 hover:border-forest hover:bg-white hover:shadow-md shadow-2xs"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-[3px] bg-forest/5 text-forest transition-colors group-hover:bg-forest group-hover:text-white">
                      <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                    </span>
                    <span className="font-mono text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-gold-deep">
                      {stat.value}
                    </span>
                  </div>

                  <h3 className="bn-heading mt-3 sm:mt-4 text-[13.5px] sm:text-[16px] font-bold text-forest leading-snug">
                    {stat.label}
                  </h3>
                  <p className="bn mt-1 text-[11.5px] sm:text-[13px] leading-relaxed text-muted line-clamp-2">
                    {stat.detail}
                  </p>
                </div>

                <div className="mt-3 sm:mt-4 flex items-center gap-1 text-[11px] sm:text-[11.5px] font-bold text-forest group-hover:text-forest-deep">
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
