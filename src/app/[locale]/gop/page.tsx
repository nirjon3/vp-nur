import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ShieldCheck,
  Scale,
  HeartHandshake,
  Globe2,
  Landmark,
  GraduationCap,
  Briefcase,
  Plane,
  Heart,
  Hammer,
  FileCheck2,
  Calendar,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Truck,
  Sparkles,
} from "lucide-react";
import type { Locale } from "@/i18n/config";
import { isLocale, localePath } from "@/i18n/config";
import { pageMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Container } from "@/components/ui/layout";

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
    path: "/gop",
    title: bn
      ? "বাংলাদেশ গণঅধিকার পরিষদ (GOP) — পরিচিতি, মূলনীতি ও কার্যক্রম"
      : "Bangladesh Gono Odhikar Parishad (GOP) — Overview, Ideology & Activities",
    description: bn
      ? "বাংলাদেশ গণঅধিকার পরিষদ (নিবন্ধন নং ০৫১, প্রতীক: ট্রাক) — গণতন্ত্র, ন্যায়বিচার, অধিকার ও জাতীয় স্বার্থ রক্ষার চার মূলনীতি নিয়ে গঠিত রাজনৈতিক দলের বিস্তারিত পরিচিতি ও কার্যক্রম।"
      : "Bangladesh Gono Odhikar Parishad (EC Reg. No. 051, Electoral Symbol: Truck) — Official political party founded on the four principles of Democracy, Justice, Rights, and National Interest.",
  });
}

export default async function GopPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const bn = locale === "bn";

  const fourPrinciples = [
    {
      num: bn ? "০১" : "01",
      title: bn ? "গণতন্ত্র" : "Democracy",
      icon: ShieldCheck,
      color: "from-emerald-500/10 to-emerald-600/5 text-emerald-800 border-emerald-200",
      summary: bn
        ? "জনগণের সার্বভৌমত্ব প্রতিষ্ঠা, অবাধ ও সুষ্ঠু ভোটাধিকার নিশ্চিতকরণ এবং রাষ্ট্র পরিচালনায় প্রাতিষ্ঠানিক জবাবদিহিতা ও ক্ষমতার বিকেন্দ্রীকরণ।"
        : "Institutionalizing popular sovereignty, transparent and fair suffrage, separation of powers, and decentralized governance.",
    },
    {
      num: bn ? "০২" : "02",
      title: bn ? "ন্যায়বিচার" : "Justice",
      icon: Scale,
      color: "from-amber-500/10 to-amber-600/5 text-amber-800 border-amber-200",
      summary: bn
        ? "বিচারহীনতার সংস্কৃতির অবসান, দলীয় প্রভাবমুক্ত স্বাধীন বিচার বিভাগ প্রতিষ্ঠা, সামাজিক ন্যায়বিচার ও সকল নাগরিকের জন্য আইনের সমান আশ্রয় লাভ।"
        : "Eradicating arbitrary privilege, guaranteeing an independent judicial branch, equal protection under law, and socioeconomic fairness.",
    },
    {
      num: bn ? "০৩" : "03",
      title: bn ? "অধিকার" : "Rights",
      icon: HeartHandshake,
      color: "from-rose-500/10 to-rose-600/5 text-rose-800 border-rose-200",
      summary: bn
        ? "অন্ন, বস্ত্র, বাসস্থান, শিক্ষা ও চিকিৎসার মৌলিক নাগরিক অধিকার সুরক্ষা, মতপ্রকাশের অবাধ স্বাধীনতা এবং মানবিক মর্যাদা নিশ্চিত করা।"
        : "Universal guarantee of fundamental human rights: food, housing, healthcare, quality education, freedom of expression, and citizen dignity.",
    },
    {
      num: bn ? "০৪" : "04",
      title: bn ? "জাতীয় স্বার্থ" : "National Interest",
      icon: Globe2,
      color: "from-blue-500/10 to-blue-600/5 text-blue-800 border-blue-200",
      summary: bn
        ? "দেশের ভৌগোলিক অখণ্ডতা ও সার্বভৌমত্ব রক্ষা, পরনির্ভরশীলতামুক্ত সমমর্যাদার দ্বিপাক্ষিক কূটনীতি এবং স্বনির্ভর জাতীয় অর্থনীতি বিনির্মাণ।"
        : "Defending national territorial integrity, fostering self-reliant dignified foreign diplomacy, and cultivating an equitable domestic economy.",
    },
  ];

  const affiliatedWings = [
    {
      name: bn ? "বাংলাদেশ ছাত্র অধিকার পরিষদ" : "Bangladesh Chhatra Odhikar Parishad",
      role: bn ? "শিক্ষার্থী অধিকার, শিক্ষা সংস্কার ও মেধাভিত্তিক সমাজ গঠনের ছাত্র শাখা" : "Student wing championing academic reform, meritocracy, and campus democracy",
      icon: GraduationCap,
      accent: "border-emerald-600/30 bg-emerald-50/50",
    },
    {
      name: bn ? "বাংলাদেশ যুব অধিকার পরিষদ" : "Bangladesh Jubo Odhikar Parishad",
      role: bn ? "তরুণদের কর্মসংস্থান, উদ্যোক্তা উন্নয়ন ও রাষ্ট্র পরিচালনায় তারুণ্যের নেতৃত্ব" : "Youth wing mobilizing dynamic youth employment, leadership, and public innovation",
      icon: Sparkles,
      accent: "border-gold/40 bg-gold/10",
    },
    {
      name: bn ? "বাংলাদেশ শ্রমিক অধিকার পরিষদ" : "Bangladesh Sramik Odhikar Parishad",
      role: bn ? "শ্রমজীবী মানুষের ন্যায্য মজুরি, কর্মক্ষেত্রের নিরাপত্তা ও জীবনমান উন্নয়ন" : "Workers front protecting fair wages, workplace safety, and dignified livelihoods",
      icon: Hammer,
      accent: "border-amber-600/30 bg-amber-50/50",
    },
    {
      name: bn ? "বাংলাদেশ প্রবাসী অধিকার পরিষদ" : "Bangladesh Probashi Odhikar Parishad",
      role: bn ? "বিশ্বব্যাপী প্রবাসীদের আইনি সুরক্ষা, ভোটাধিকার, সম্মান ও রেমিট্যান্স মূল্যায়ন" : "Global diaspora front ensuring migrant rights, consular protection, and voting rights",
      icon: Plane,
      accent: "border-blue-600/30 bg-blue-50/50",
    },
    {
      name: bn ? "বাংলাদেশ পেশাজীবী অধিকার পরিষদ" : "Bangladesh Peshajibi Odhikar Parishad",
      role: bn ? "ডাক্তার, প্রকৌশলী, আইনজীবী ও শিক্ষকদের মেধার যথাযথ প্রাতিষ্ঠানিক মূল্যায়ন" : "Professional guild uniting doctors, engineers, jurists, educators, and architects",
      icon: Briefcase,
      accent: "border-indigo-600/30 bg-indigo-50/50",
    },
    {
      name: bn ? "বাংলাদেশ নারী অধিকার পরিষদ" : "Bangladesh Nari Odhikar Parishad",
      role: bn ? "নারীর সামাজিক নিরাপত্তা, অর্থনৈতিক ক্ষমতায়ন ও সর্বস্তরে সমান অংশীদারিত্ব" : "Women's council promoting equal empowerment, safety, and legislative representation",
      icon: Heart,
      accent: "border-rose-600/30 bg-rose-50/50",
    },
  ];

  const milestones = [
    {
      year: bn ? "২০১৮" : "2018",
      title: bn ? "কোটা সংস্কার আন্দোলন ও নবজাগরণ" : "Historic Quota Reform Movement",
      desc: bn
        ? "সরকারি চাকরিতে বৈষম্যমূলক কোটা পদ্ধতির সংস্কারের দাবিতে ছাত্র অধিকার সংরক্ষণ পরিষদের নেতৃত্বে দেশব্যাপী নজিরবিহীন ছাত্র আন্দোলন সংগঠিত হয়।"
        : "A massive youth movement led by quota reform organizers captured national attention demanding merit-based civil service recruitment.",
    },
    {
      year: bn ? "২০১৯" : "2019",
      title: bn ? "ডাকসু বিজয় ও ভিপি নুরুল হক নুর" : "DUCSU Election Victory",
      desc: bn
        ? "দীর্ঘ ২৮ বছর পর অনুষ্ঠিত ঢাকা বিশ্ববিদ্যালয় কেন্দ্রীয় ছাত্র সংসদ (ডাকসু) নির্বাচনে বিপুল ভোটে নুরুল হক নুর ভিপি (সহ-সভাপতি) নির্বাচিত হন।"
        : "Nurul Haque Nur secured a landslide victory as Vice President of DUCSU, shattering a 28-year student union vacuum.",
    },
    {
      year: bn ? "২০২১" : "2021",
      title: bn ? "গণঅধিকার পরিষদের আনুষ্ঠানিক আত্মপ্রকাশ" : "Official Foundation of GOP",
      desc: bn
        ? "২৬ অক্টোবর ২০২১ তারিখে রাজধানীর পুরানা পল্টনে চার মূলনীতিকে ভিত্তি করে আনুষ্ঠানিকভাবে 'বাংলাদেশ গণঅধিকার পরিষদ' রাজনৈতিক দলের যাত্রা শুরু হয়।"
        : "On 26 October 2021, Gono Odhikar Parishad formally launched as a mainstream political party dedicated to citizen-centric democracy.",
    },
    {
      year: bn ? "২০২৪" : "2024",
      title: bn ? "ঐতিহাসিক জুলাই গণঅভ্যুত্থান" : "Historic July Uprising & Transformation",
      desc: bn
        ? "বৈষম্যবিরোধী ছাত্র-জনতার ঐতিহাসিক জুলাই-আগস্ট গণঅভ্যুত্থানে সম্মুখসারিতে প্রতিরোধ গড়ে তোলে গণঅধিকার পরিষদ এবং জনগণের বিজয় অর্জিত হয়।"
        : "Frontline participation and steadfast resistance during the historic July-August People's Uprising that ushered in a new democratic era.",
    },
    {
      year: bn ? "২০২৪" : "2024",
      title: bn ? "নির্বাচন কমিশন কর্তৃক সরকারি নিবন্ধন লাভ" : "Official EC Registration (No. 051)",
      desc: bn
        ? "বাংলাদেশ নির্বাচন কমিশন কর্তৃক গণঅধিকার পরিষদকে নিবন্ধন নম্বর ০৫১ প্রদান করা হয় এবং দলীয় নির্বাচনী প্রতীক হিসেবে 'ট্রাক' বরাদ্দ করা হয়।"
        : "The Bangladesh Election Commission formally registered Gono Odhikar Parishad under Registration No. 051 with the 'Truck' symbol.",
    },
  ];

  const reformPoints = [
    {
      title: bn ? "দ্বিকক্ষ বিশিষ্ট সংসদ" : "Bicameral Parliament",
      text: bn
        ? "জাতীয় সংসদের পাশাপাশি গুণীজন, বিশেষজ্ঞ ও আঞ্চলিক প্রতিনিধিদের নিয়ে উচ্চকক্ষ প্রতিষ্ঠা করে ক্ষমতার ভারসাম্য রক্ষা।"
        : "Establishing an Upper House of Parliament alongside the Lower House to ensure checks and legislative balance.",
    },
    {
      title: bn ? "প্রধানমন্ত্রী পদের মেয়াদ নির্ধারণ" : "Prime Ministerial Term Limits",
      text: bn
        ? "এক ব্যক্তি সর্বোচ্চ দুই মেয়াদের বেশি প্রধানমন্ত্রী পদে থাকতে পারবেন না — এমন সাংবিধানিক বাধ্যবাধকতা তৈরি।"
        : "A constitutional mandate capping the tenure of any Prime Minister to a maximum of two consecutive terms.",
    },
    {
      title: bn ? "বিচার বিভাগের পূর্ণ স্বাধীনতা" : "Complete Judicial Independence",
      text: bn
        ? "আইন মন্ত্রণালয় থেকে সুপ্রিম কোর্টের অধীনে পৃথক বিচার বিভাগীয় সচিবালয় গঠন ও নিরপেক্ষ নিয়োগ ব্যবস্থা।"
        : "Establishing an autonomous Supreme Court secretariat independent from executive ministry supervision.",
    },
    {
      title: bn ? "সাংবিধানিক সংস্থাসমূহের সংস্কার" : "Neutral Constitutional Appointments",
      text: bn
        ? "নির্বাচন কমিশন, দুদক, পিএসসি ও মানবাধিকার কমিশনের প্রধান নিয়োগে সর্বদলীয় সার্চ কমিটি ও স্বচ্ছ প্রক্রিয়া।"
        : "Codified cross-party parliamentary confirmation for Election Commission, ACC, PSC, and Human Rights bodies.",
    },
    {
      title: bn ? "প্রবাসীদের ভোটাধিকার ও পূর্ণ সুরক্ষা" : "Diaspora Enfranchisement & Welfare",
      text: bn
        ? "অনলাইনে প্রবাসীদের ভোটাধিকার নিশ্চিত করা, বিমানবন্দরে ভিআইপি মর্যাদা ও দূতাবাসগুলোতে জবাবদিহিতামূলক সেবা।"
        : "Enfranchising global Bangladeshi expatriates, VIP consular fast-tracking, and robust welfare safety nets.",
    },
    {
      title: bn ? "তরুণ উদ্যোক্তা ও কর্মসংস্থান" : "Youth Enterprise & Employment",
      text: bn
        ? "বেকার যুবকদের জন্য বিনা জামানতে সহজ শর্তে স্টার্টআপ ঋণ এবং সকল সরকারি চাকরিতে আবেদন ফি সম্পূর্ণ বাতিল।"
        : "Collateral-free venture capital for youth startups and complete elimination of government job application fees.",
    },
  ];

  return (
    <main id="main-content" className="min-h-screen bg-sand-50/50 pb-20">
      {/* Top Header / Identity Section */}
      <section className="relative overflow-hidden border-b border-line bg-gradient-to-b from-forest-ink via-[#0d2822] to-forest-ink py-16 text-white sm:py-20">
        {/* Subtle patterned backdrop */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-10 bg-[radial-gradient(#B49A67_1px,transparent_1px)] [background-size:24px_24px]"
        />

        <Container className="relative">
          <Breadcrumbs
            locale={locale}
            items={[
              {
                label: bn ? "গণঅধিকার পরিষদ" : "GOP",
                href: "/gop",
              },
            ]}
          />

          <div className="mt-8 flex flex-col items-center text-center">
            {/* Official Head Logo */}
            <div className="group relative mb-6 flex h-32 w-32 items-center justify-center rounded-2xl border-2 border-gold/40 bg-white/95 p-3 shadow-2xl backdrop-blur transition-transform duration-300 hover:scale-105 sm:h-36 sm:w-36">
              <Image
                src="/images/gop-logo.svg"
                alt={bn ? "বাংলাদেশ গণঅধিকার পরিষদ লোগো" : "Bangladesh Gono Odhikar Parishad Logo"}
                width={130}
                height={130}
                priority
                className="h-auto w-auto max-h-full max-w-full object-contain drop-shadow"
              />
            </div>

            {/* Badges row */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gold">
                <FileCheck2 className="h-3.5 w-3.5" />
                {bn ? "নির্বাচন কমিশন নিবন্ধন নং ০৫১" : "EC Registration No. 051"}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white/90">
                <Truck className="h-3.5 w-3.5 text-gold" />
                {bn ? "নির্বাচনী প্রতীক: ট্রাক" : "Electoral Symbol: Truck"}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-200">
                <Calendar className="h-3.5 w-3.5" />
                {bn ? "প্রতিষ্ঠা: ২৬ অক্টোবর ২০২১" : "Founded: 26 Oct 2021"}
              </span>
            </div>

            {/* Title & Slogan */}
            <h1 className="bn-heading mt-6 max-w-3xl text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              {bn ? "বাংলাদেশ গণঅধিকার পরিষদ" : "Bangladesh Gono Odhikar Parishad"}
            </h1>
            <p className="mt-3 text-lg font-medium text-gold sm:text-xl">
              {bn ? "« জনতার অধিকার, আমাদের অঙ্গীকার »" : "« People's Rights, Our Commitment »"}
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#c9cfc5] sm:text-base">
              {bn
                ? "কোটা সংস্কার আন্দোলন ও ডাকসু নেতৃত্বের পটভূমিতে জন্ম নেওয়া গণমানুষের রাজনৈতিক দল। সাম্য, মানবিক মর্যাদা ও সামাজিক ন্যায়বিচারভিত্তিক একটি শোষণমুক্ত, আধুনিক ও গণতান্ত্রিক বাংলাদেশ বিনির্মাণে প্রতিশ্রুতিবদ্ধ।"
                : "A progressive, people-first political party forged through the historic youth and student movements of Bangladesh, fighting for unconditional democracy, citizen sovereignty, and institutional rule of law."}
            </p>

            {/* Quick Stats Banner */}
            <div className="mt-10 grid w-full max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
              <div className="rounded-lg border border-white/10 bg-white/5 p-4 text-center backdrop-blur-sm">
                <div className="text-2xl font-bold text-white sm:text-3xl">৪ টি</div>
                <div className="mt-1 text-xs text-[#a0a89c]">{bn ? "মূলনীতি" : "Fundamental Pillars"}</div>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4 text-center backdrop-blur-sm">
                <div className="text-2xl font-bold text-gold sm:text-3xl">০৫১</div>
                <div className="mt-1 text-xs text-[#a0a89c]">{bn ? "ইসি নিবন্ধন নম্বর" : "EC Reg. Number"}</div>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4 text-center backdrop-blur-sm">
                <div className="text-2xl font-bold text-white sm:text-3xl">৬ টি</div>
                <div className="mt-1 text-xs text-[#a0a89c]">{bn ? "সহযোগী সংগঠন" : "Affiliated Fronts"}</div>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4 text-center backdrop-blur-sm">
                <div className="text-2xl font-bold text-emerald-400 sm:text-3xl">২১ দফা</div>
                <div className="mt-1 text-xs text-[#a0a89c]">{bn ? "রাষ্ট্র সংস্কার প্রস্তাবনা" : "National Reforms"}</div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 4 Pillars Section */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="text-center">
            <span className="inline-block rounded-full bg-forest-ink/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-forest-ink">
              {bn ? "দলের ভিত্তিস্তম্ভ" : "Core Ideology"}
            </span>
            <h2 className="bn-heading mt-2 text-2xl font-bold text-forest-ink sm:text-3xl">
              {bn ? "গণঅধিকার পরিষদের চার মূলনীতি" : "The Four Fundamental Pillars"}
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-muted">
              {bn
                ? "জনগণের আশা-আকাঙ্ক্ষা ধারণ করে গণঅধিকার পরিষদ পরিচালিত হয় এই চারটি অবিনাশী নীতির ওপর।"
                : "Every policy, charter, and legislative initiative of GOP is anchored upon these four guiding principles."}
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {fourPrinciples.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="group relative flex flex-col justify-between rounded-xl border border-line bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold/60 hover:shadow-md"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="rounded-md bg-forest-ink/5 px-2.5 py-1 font-mono text-xs font-bold text-forest-ink">
                        {item.num}
                      </span>
                      <div className={`flex h-11 w-11 items-center justify-center rounded-lg border bg-gradient-to-br ${item.color}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>
                    <h3 className="bn-heading mt-4 text-xl font-bold text-forest-ink">
                      {item.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-body">
                      {item.summary}
                    </p>
                  </div>
                  <div className="mt-6 h-1 w-8 rounded-full bg-gold transition-all group-hover:w-16" />
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Leadership Section */}
      <section className="border-y border-line bg-white py-16 sm:py-20">
        <Container>
          <div className="text-center">
            <span className="inline-block rounded-full bg-gold/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gold-deep">
              {bn ? "কেন্দ্রীয় নেতৃত্ব" : "Central Leadership"}
            </span>
            <h2 className="bn-heading mt-2 text-2xl font-bold text-forest-ink sm:text-3xl">
              {bn ? "দলের শীর্ষ নেতৃত্ব ও সমন্বয়" : "Party Presidium & Leadership"}
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-muted">
              {bn
                ? "ন্যায্যতার লড়াইয়ের অগ্রসেনা ও ছাত্র-জনতার গণআন্দোলনের নেতৃত্বদানকারী ব্যক্তিত্ব।"
                : "Led by youth leaders and grassroots organizers who transformed public activism into mainstream national politics."}
            </p>
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* President: Nurul Haque Nur */}
            <div className="relative overflow-hidden rounded-2xl border border-gold/40 bg-gradient-to-b from-white to-sand-50 p-6 shadow-sm transition hover:shadow-md">
              <div className="flex items-start gap-4">
                <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border border-line bg-forest-ink/5">
                  <Image
                    src="/images/nur-official-2026.jpg"
                    alt="Nurul Haque Nur"
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <span className="inline-block rounded-full bg-forest-ink px-2.5 py-0.5 text-[11px] font-semibold text-white">
                    {bn ? "সভাপতি" : "President"}
                  </span>
                  <h3 className="bn-heading mt-1.5 text-lg font-bold text-forest-ink">
                    {bn ? "নুরুল হক নুর (ভিপি নুর)" : "Nurul Haque Nur (VP Nur)"}
                  </h3>
                  <p className="text-xs font-medium text-gold-deep">
                    {bn ? "সাবেক ভিপি, ডাকসু · সংসদ সদস্য, পটুয়াখালী-৩" : "Former VP, DUCSU · MP, Patuakhali-3"}
                  </p>
                </div>
              </div>
              <p className="mt-4 text-xs leading-relaxed text-body sm:text-sm">
                {bn
                  ? "২০১৮ কোটা সংস্কার আন্দোলনের শীর্ষ নেতা, ডাকসুর সাবেক ভিপি এবং পটুয়াখালী-৩ আসনের নির্বাচিত সংসদ সদস্য ও মাননীয় প্রতিমন্ত্রী। দলীয় প্রতিষ্ঠালগ্ন থেকে সভাপতির দায়িত্ব পালন করছেন।"
                  : "Prominent youth icon, leader of the 2018 Quota reform movement, elected DUCSU VP, Member of Parliament for Patuakhali-3, and founding President of GOP."}
              </p>
              <div className="mt-4 pt-4 border-t border-line/60">
                <Link
                  href={localePath(locale, "/about")}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-forest-ink hover:text-gold"
                >
                  {bn ? "সম্পূর্ণ জীবনী দেখুন" : "View full biography"}
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>

            {/* General Secretary: Md. Rashed Khan */}
            <div className="relative overflow-hidden rounded-2xl border border-line bg-white p-6 shadow-sm transition hover:shadow-md">
              <div className="flex items-start gap-4">
                <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-xl bg-forest-ink text-2xl font-bold text-gold">
                  {bn ? "রা" : "R"}
                </div>
                <div>
                  <span className="inline-block rounded-full bg-gold/20 px-2.5 py-0.5 text-[11px] font-semibold text-forest-ink">
                    {bn ? "সাধারণ সম্পাদক" : "General Secretary"}
                  </span>
                  <h3 className="bn-heading mt-1.5 text-lg font-bold text-forest-ink">
                    {bn ? "মো. রাশেদ খাঁন" : "Md. Rashed Khan"}
                  </h3>
                  <p className="text-xs font-medium text-muted">
                    {bn ? "ছাত্রনেতা ও সংগঠক" : "Youth Leader & Organizer"}
                  </p>
                </div>
              </div>
              <p className="mt-4 text-xs leading-relaxed text-body sm:text-sm">
                {bn
                  ? "কোটা সংস্কার আন্দোলনের অন্যতম শীর্ষ যুগ্ম আহ্বায়ক এবং শুরু থেকেই দলের সাংগঠনিক ভিত্তি সুদৃঢ় করতে অগ্রণী ভূমিকা পালনকারী নিবেদিতপ্রাণ নেতা।"
                  : "Frontline student movement organizer, key architect of the quota reform coordination committee, and General Secretary of GOP."}
              </p>
              <div className="mt-4 pt-4 border-t border-line/60">
                <span className="text-xs text-muted">
                  {bn ? "কেন্দ্রীয় দপ্তর সমন্বয়ক" : "Central Party Executive"}
                </span>
              </div>
            </div>

            {/* Higher Council / Structure */}
            <div className="relative overflow-hidden rounded-2xl border border-line bg-white p-6 shadow-sm transition hover:shadow-md md:col-span-2 lg:col-span-1">
              <div className="flex items-start gap-4">
                <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-xl bg-forest-ink/10 text-forest-ink">
                  <Landmark className="h-8 w-8 text-forest-ink" />
                </div>
                <div>
                  <span className="inline-block rounded-full bg-forest-ink/10 px-2.5 py-0.5 text-[11px] font-semibold text-forest-ink">
                    {bn ? "উচ্চতর পরিষদ" : "Higher Council"}
                  </span>
                  <h3 className="bn-heading mt-1.5 text-lg font-bold text-forest-ink">
                    {bn ? "উচ্চতর ও নির্বাহী পরিষদ" : "Executive Presidium"}
                  </h3>
                  <p className="text-xs font-medium text-muted">
                    {bn ? "নীতিনির্ধারণী শীর্ষ পর্ষদ" : "Apex Decision-Making Body"}
                  </p>
                </div>
              </div>
              <p className="mt-4 text-xs leading-relaxed text-body sm:text-sm">
                {bn
                  ? "দলের নীতি প্রণয়ন, কৌশলগত রাজনৈতিক সিদ্ধান্ত এবং জাতীয় ইস্যুতে অবস্থান নির্ধারণে উচ্চতর পরিষদ ও জাতীয় নির্বাহী কমিটি সার্বিক দায়িত্ব পালন করে থাকে।"
                  : "Formulates ideological directives, legislative agendas, strategic partnerships, and oversees nationwide district committee governance."}
              </p>
              <div className="mt-4 pt-4 border-t border-line/60">
                <span className="text-xs text-muted">
                  {bn ? "৬৪ জেলা ও বৈদেশিক শাখা কমিটি" : "64 District & Overseas Committees"}
                </span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Affiliated Wings */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="text-center">
            <span className="inline-block rounded-full bg-forest-ink/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-forest-ink">
              {bn ? "সাংগঠনিক ভিত্তি" : "Front Organizations"}
            </span>
            <h2 className="bn-heading mt-2 text-2xl font-bold text-forest-ink sm:text-3xl">
              {bn ? "অঙ্গ ও সহযোগী সংগঠনসমূহ" : "Affiliated Wings & Fronts"}
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-muted">
              {bn
                ? "ছাত্র, যুব, শ্রমিক, নারী, পেশাজীবী ও প্রবাসীদের অধিকার রক্ষায় নিবেদিত গণঅধিকার পরিষদের ৬টি সম্মুখ শাখা।"
                : "Six specialized civic bodies organizing students, workers, women, youth, professionals, and the global diaspora."}
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {affiliatedWings.map((wing) => {
              const Icon = wing.icon;
              return (
                <div
                  key={wing.name}
                  className={`rounded-xl border p-5 shadow-xs transition duration-200 hover:shadow-md ${wing.accent}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-xs">
                      <Icon className="h-5 w-5 text-forest-ink" />
                    </div>
                    <h3 className="bn-heading text-base font-bold text-forest-ink">
                      {wing.name}
                    </h3>
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-body sm:text-sm">
                    {wing.role}
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Historical Timeline */}
      <section className="border-t border-line bg-sand-100/40 py-16 sm:py-20">
        <Container>
          <div className="text-center">
            <span className="inline-block rounded-full bg-gold/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gold-deep">
              {bn ? "ঐতিহাসিক পরিক্রমা" : "Milestones"}
            </span>
            <h2 className="bn-heading mt-2 text-2xl font-bold text-forest-ink sm:text-3xl">
              {bn ? "আন্দোলন থেকে রাজনৈতিক দল গঠনের ইতিহাস" : "Movement to Political Institution"}
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-muted">
              {bn
                ? "ছাত্রদের ন্যায্য অধিকারের সংগ্রাম থেকে জাতীয় রাজনীতির প্রধান মঞ্চে গণঅধিকার পরিষদের ঐতিহাসিক রূপান্তর।"
                : "Tracing the historic journey from university campus advocacy to becoming an officially registered national political force."}
            </p>
          </div>

          <div className="relative mt-12 max-w-3xl mx-auto pl-6 sm:pl-8 border-l-2 border-forest-ink/20 space-y-10">
            {milestones.map((m) => (
              <div key={m.title} className="relative group">
                {/* Node dot */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full border-2 border-forest-ink bg-white shadow-sm transition group-hover:scale-110 group-hover:bg-gold">
                  <div className="h-2 w-2 rounded-full bg-forest-ink" />
                </div>
                <div className="rounded-xl border border-line bg-white p-5 sm:p-6 shadow-xs transition hover:border-gold/60 hover:shadow-sm">
                  <span className="inline-block rounded bg-forest-ink/10 px-2.5 py-0.5 text-xs font-bold text-forest-ink">
                    {m.year}
                  </span>
                  <h3 className="bn-heading mt-2 text-lg font-bold text-forest-ink">
                    {m.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-body">
                    {m.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 21-Point National Reform Charter */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="text-center">
            <span className="inline-block rounded-full bg-forest-ink/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-forest-ink">
              {bn ? "রাষ্ট্র বিনির্মাণ" : "Manifesto & Reforms"}
            </span>
            <h2 className="bn-heading mt-2 text-2xl font-bold text-forest-ink sm:text-3xl">
              {bn ? "রাষ্ট্র সংস্কারে গণঅধিকার পরিষদের ২১ দফা প্রস্তাবনা" : "21-Point National Reform Charter"}
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-sm text-muted">
              {bn
                ? "একটি কার্যকর, জবাবদিহিতামূলক ও শোষণমুক্ত রাষ্ট্রব্যবস্থা প্রতিষ্ঠার লক্ষ্যে গণঅধিকার পরিষদের যুগান্তকারী রূপরেখা থেকে নির্বাচিত প্রধান প্রস্তাবনাসমূহ।"
                : "Key institutional and constitutional reform proposals outlined in GOP's 21-point manifesto for a modern, accountable Bangladesh."}
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {reformPoints.map((item, idx) => (
              <div
                key={item.title}
                className="rounded-xl border border-line bg-white p-6 shadow-xs transition hover:border-emerald-600/50 hover:shadow-sm"
              >
                <div className="flex items-center gap-2 text-emerald-700">
                  <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
                  <span className="text-xs font-bold uppercase tracking-wider">
                    {bn ? `প্রস্তাবনা ০${idx + 1}` : `Proposal 0${idx + 1}`}
                  </span>
                </div>
                <h3 className="bn-heading mt-3 text-lg font-bold text-forest-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-body sm:text-sm">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Electoral Symbol & Flag Significance */}
      <section className="border-t border-line bg-white py-16 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            {/* Left: Flag visual and meaning */}
            <div className="rounded-2xl border border-line bg-sand-50/50 p-6 sm:p-8">
              <span className="inline-block rounded-full bg-forest-ink/10 px-3 py-1 text-xs font-semibold text-forest-ink">
                {bn ? "দলীয় পতাকা ও চার তারকা" : "Party Flag & Four Stars"}
              </span>
              <div className="mt-4 overflow-hidden rounded-xl border border-line shadow-sm">
                <Image
                  src="/images/gop-flag.svg"
                  alt="GOP Flag"
                  width={500}
                  height={300}
                  className="w-full h-auto object-cover"
                />
              </div>
              <h3 className="bn-heading mt-4 text-xl font-bold text-forest-ink">
                {bn ? "পতাকার তাৎপর্য" : "Significance of the Flag"}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-body sm:text-sm">
                {bn
                  ? "সবুজ ও লাল রঙের সমন্বয়ে গঠিত গণঅধিকার পরিষদের পতাকা বাংলাদেশের সার্বভৌমত্ব ও মুক্তিসংগ্রামের প্রতীক। পতাকার চারটি তারকা দলের চার মূলনীতি — গণতন্ত্র, ন্যায়বিচার, অধিকার এবং জাতীয় স্বার্থের দ্যোতক।"
                  : "The green and red field reflects the sovereign colors of Bangladesh, while the four white stars commemorate the party's four non-negotiable principles: Democracy, Justice, Rights, and National Interest."}
              </p>
            </div>

            {/* Right: Electoral Symbol 'Truck' */}
            <div className="rounded-2xl border border-gold/40 bg-gradient-to-br from-gold/5 via-white to-white p-6 sm:p-8 shadow-xs">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gold/20 text-gold-deep">
                <Truck className="h-8 w-8 text-forest-ink" />
              </div>
              <span className="mt-4 inline-block rounded-full bg-gold/20 px-3 py-1 text-xs font-semibold text-forest-ink">
                {bn ? "নির্বাচনী প্রতীক: 'ট্রাক'" : "Electoral Symbol: 'Truck'"}
              </span>
              <h3 className="bn-heading mt-3 text-2xl font-bold text-forest-ink">
                {bn ? "নির্বাচন কমিশনের প্রতীক বরাদ্দের তাৎপর্য" : "The 'Truck' Symbol & Working Masses"}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-body">
                {bn
                  ? "বাংলাদেশ নির্বাচন কমিশন কর্তৃক গণঅধিকার পরিষদকে বরাদ্দকৃত নির্বাচনী প্রতীক 'ট্রাক'। ট্রাক হলো দেশের অর্থনীতি, কৃষক-শ্রমিকের কঠোর পরিশ্রম, নগর থেকে প্রত্যন্ত অঞ্চলের সংযোগ এবং দেশ গড়ার অন্যতম অবিচ্ছেদ্য হাতিয়ার।"
                  : "Allocated by the Bangladesh Election Commission under Reg. 051, the 'Truck' embodies labor, production, agricultural transport, rural-urban connectivity, and the resilient force powering the national economy."}
              </p>
              <ul className="mt-4 space-y-2 text-xs text-body sm:text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                  <span>{bn ? "কৃষক ও শ্রমজীবীদের উৎপাদনশীল শক্তির প্রতীক" : "Symbolizes hardworking farmers, day-laborers, and transport workforce"}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                  <span>{bn ? "দেশ গড়ার দৃঢ় প্রত্যয় ও অবিচল যাত্রা" : "Represents unstoppable national progress and heavy-duty resilience"}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                  <span>{bn ? "প্রত্যন্ত গ্রাম থেকে রাজধানী পর্যন্ত অধিকারের কণ্ঠস্বর" : "Connecting rural grassroots to the core halls of governance"}</span>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Central Office & Contact Info */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="rounded-2xl border border-line bg-forest-ink p-8 text-white sm:p-12 shadow-xl">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-8">
                <span className="inline-block rounded-full bg-gold/20 px-3 py-1 text-xs font-semibold text-gold">
                  {bn ? "কেন্দ্রীয় দপ্তর" : "Central Party Headquarters"}
                </span>
                <h2 className="bn-heading mt-3 text-2xl font-bold text-white sm:text-3xl">
                  {bn ? "বাংলাদেশ গণঅধিকার পরিষদ কেন্দ্রীয় কার্যালয়" : "Bangladesh Gono Odhikar Parishad Secretariat"}
                </h2>
                <div className="mt-4 flex items-start gap-3 text-sm text-[#c9cfc5]">
                  <MapPin className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                  <span>
                    {bn
                      ? "আল-রাজি কমপ্লেক্স (লেভেল-৩/৪), ১৬৬-১৬৭ শহীদ সৈয়দ নজরুল ইসলাম সরণি / বিজয়নগর কালভার্ট রোড, পুরানা পল্টন, ঢাকা-১০০০, বাংলাদেশ।"
                      : "Al-Razi Complex (Level-3/4), 166-167 Shaheed Syed Nazrul Islam Sarani / Bijoynagar Culvert Road, Purana Paltan, Dhaka-1000, Bangladesh."}
                  </span>
                </div>
                <p className="mt-3 text-xs text-[#a0a89c] sm:text-sm">
                  {bn
                    ? "সদস্যপদ গ্রহণ, সাংগঠনিক যোগাযোগ এবং দলের গঠনতন্ত্র ও প্রকাশনা সংগ্রহের জন্য কেন্দ্রীয় কার্যালয় প্রতিদিন সকাল ১০টা থেকে রাত ৮টা পর্যন্ত উন্মুক্ত।"
                    : "Open daily from 10:00 AM to 8:00 PM for party membership, district coordination, and official publication acquisition."}
                </p>
              </div>

              <div className="flex flex-col gap-3 lg:col-span-4 sm:flex-row lg:flex-col">
                <Link
                  href={localePath(locale, "/contact")}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-gold px-6 py-3 text-sm font-semibold text-forest-ink transition hover:bg-gold-deep hover:text-white"
                >
                  {bn ? "যোগাযোগের পূর্ণ তথ্য" : "Contact Information"}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href={localePath(locale, "/about")}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
                >
                  {bn ? "ভিপি নুরের পরিচয়" : "VP Nur Biography"}
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
