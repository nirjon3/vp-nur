import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ShieldCheck,
  Scale,
  HeartHandshake,
  Globe2,
  GraduationCap,
  Sparkles,
  Hammer,
  Plane,
  Briefcase,
  Heart,
  Tractor,
  FileCheck2,
  Calendar,
  MapPin,
  Phone,
  Mail,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  Truck,
  Target,
  Eye,
  Compass,
  Flag,
  Users,
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
      ? "বাংলাদেশ গণ অধিকার পরিষদ (GOP) — অফিশিয়াল পরিচিতি, আদর্শ ও কার্যক্রম"
      : "Bangladesh Gono Odhikar Parishad (GOP) — Official Overview, Ideology & Activities",
    description: bn
      ? "গণ অধিকার পরিষদ (নির্বাচন কমিশন নিবন্ধন: ০২ সেপ্টেম্বর ২০২৪, প্রতীক: ট্রাক) — জনতার অধিকার প্রতিষ্ঠা, সুশাসন, দুর্নীতিবিরোধী রাজনীতি ও রাষ্ট্র সংস্কারের অঙ্গীকারে গঠিত রাজনৈতিক দল।"
      : "Bangladesh Gono Odhikar Parishad (EC Registered: 02 Sep 2024, Symbol: Truck) — Active political party championing human rights, institutional democracy, anti-corruption, and state reform.",
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

  // Official stats from gonoodhikar.com
  const officialStats = [
    {
      value: bn ? "২০০,০০০+" : "200,000+",
      label: bn ? "সক্রিয় সদস্য" : "Active Members",
    },
    {
      value: bn ? "৬৪" : "64",
      label: bn ? "জেলা সাংগঠনিক বিস্তার" : "Districts Nationwide",
    },
    {
      value: bn ? "৭+" : "7+",
      label: bn ? "সম্মুখ অঙ্গসংগঠন" : "Affiliated Fronts",
    },
    {
      value: bn ? "২০২১" : "2021",
      label: bn ? "প্রতিষ্ঠার বছর" : "Founding Year",
    },
  ];

  // 4 Core Principles
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

  // Mission, Vision, and Values from gonoodhikar.com
  const missionCards = [
    {
      title: bn ? "আমাদের মিশন (Mission)" : "Our Mission",
      icon: Target,
      desc: bn
        ? "জনগণের মৌলিক অধিকার প্রতিষ্ঠা, ন্যায়বিচার নিশ্চিতকরণ, দুর্নীতিমুক্ত রাষ্ট্রব্যবস্থা গড়ে তোলা এবং প্রতিটি নাগরিকের মর্যাদা ও সম্মান রক্ষা করা।"
        : "To establish fundamental rights, guarantee institutional justice, build a graft-free state system, and safeguard the dignity of every citizen.",
      points: bn
        ? ["মানবাধিকার প্রতিষ্ঠা", "সুশাসন নিশ্চিতকরণ", "অর্থনৈতিক ন্যায়বিচার", "সামাজিক নিরাপত্তা"]
        : ["Human Rights", "Good Governance", "Economic Justice", "Social Safety"],
    },
    {
      title: bn ? "আমাদের ভিশন (Vision)" : "Our Vision",
      icon: Eye,
      desc: bn
        ? "একটি আধুনিক, প্রগতিশীল, বৈষম্যহীন ও সমৃদ্ধ বাংলাদেশ গঠন যেখানে প্রতিটি নাগরিকের মৌলিক চাহিদা পূরণ হবে এবং সকলের জন্য সমান সুযোগ সৃষ্টি হবে।"
        : "A modern, progressive, discrimination-free, and prosperous Bangladesh where every citizen enjoys equal opportunities and dignified living.",
      points: bn
        ? ["বৈষম্যহীন সমাজ", "আধুনিক রাষ্ট্রব্যবস্থা", "টেকসই উন্নয়ন", "বৈশ্বিক অংশীদারিত্ব"]
        : ["Egalitarian Society", "Modern Governance", "Sustainable Development", "Global Partnership"],
    },
    {
      title: bn ? "আমাদের মূল্যবোধ (Values)" : "Our Core Values",
      icon: Compass,
      desc: bn
        ? "গণতন্ত্র, স্বচ্ছতা, জবাবদিহিতা, ন্যায়বিচার, সহনশীলতা, বৈচিত্র্যের প্রতি শ্রদ্ধা এবং গণতান্ত্রিক মূল্যবোধের প্রতি অবিচল অঙ্গীকার।"
        : "Democracy, institutional transparency, accountability, equity, mutual tolerance, respect for diversity, and constitutional rule of law.",
      points: bn
        ? ["গণতন্ত্র ও স্বাধীনতা", "স্বচ্ছতা ও জবাবদিহিতা", "ন্যায়বিচার ও সমতা", "সহনশীলতা ও শ্রদ্ধা"]
        : ["Democracy & Liberty", "Transparency", "Justice & Equality", "Mutual Respect"],
    },
  ];

  // 7 Affiliated Wings from gonoodhikar.com
  const affiliatedWings = [
    {
      name: bn ? "বাংলাদেশ ছাত্র অধিকার পরিষদ" : "Bangladesh Chhatra Odhikar Parishad",
      role: bn
        ? "শিক্ষার্থী অধিকার, মেধাভিত্তিক সমাজ বিনির্মাণ, নিরাপদ ক্যাম্পাস ও শিক্ষা সংস্কারের অগ্রণী ছাত্র সংগঠন।"
        : "Student front pioneering meritocracy, academic rights, campus democracy, and educational reform.",
      icon: GraduationCap,
      accent: "border-emerald-600/30 bg-emerald-50/50",
    },
    {
      name: bn ? "বাংলাদেশ যুব অধিকার পরিষদ" : "Bangladesh Jubo Odhikar Parishad",
      role: bn
        ? "তরুণদের কর্মসংস্থান, যুব উদ্যোক্তা উন্নয়ন, মাদক ও বেকারত্বমুক্ত সমাজ গঠন এবং তারুণ্যের রাজনৈতিক নেতৃত্ব।"
        : "Youth wing mobilizing dynamic youth employment, entrepreneurship, and next-generation leadership.",
      icon: Sparkles,
      accent: "border-gold/40 bg-gold/10",
    },
    {
      name: bn ? "বাংলাদেশ শ্রমিক অধিকার পরিষদ" : "Bangladesh Sramik Odhikar Parishad",
      role: bn
        ? "শ্রমজীবী মানুষের ন্যায্য মজুরি, কর্মক্ষেত্রের নিরাপত্তা, স্বাস্থ্যসুরক্ষা ও মেহনতি মানুষের নাগরিক অধিকার।"
        : "Workers front championing fair wages, workplace safety, and dignified living standards for laborers.",
      icon: Hammer,
      accent: "border-amber-600/30 bg-amber-50/50",
    },
    {
      name: bn ? "বাংলাদেশ প্রবাসী অধিকার পরিষদ" : "Bangladesh Probashi Odhikar Parishad",
      role: bn
        ? "বিশ্বব্যাপী প্রবাসী বাংলাদেশীদের আইনি সহায়তা, বিমানবন্দরে ভিআইপি সম্মান, ভোটাধিকার ও নিরাপদ অভিবাসন।"
        : "Global diaspora front ensuring expatriate voting rights, consular safety nets, and airport dignity.",
      icon: Plane,
      accent: "border-blue-600/30 bg-blue-50/50",
    },
    {
      name: bn ? "বাংলাদেশ পেশাজীবী অধিকার পরিষদ" : "Bangladesh Peshajibi Odhikar Parishad",
      role: bn
        ? "ডাক্তার, প্রকৌশলী, শিক্ষক, আইনজীবী ও গবেষকসহ সকল পেশাজীবীদের মেধার প্রাতিষ্ঠানিক মূল্যায়ন ও সুরক্ষা।"
        : "Professional guild organizing doctors, engineers, jurists, educators, and architects nationwide.",
      icon: Briefcase,
      accent: "border-indigo-600/30 bg-indigo-50/50",
    },
    {
      name: bn ? "বাংলাদেশ মহিলা / নারী অধিকার পরিষদ" : "Bangladesh Mohila / Nari Odhikar Parishad",
      role: bn
        ? "নারীর সামাজিক নিরাপত্তা, অর্থনৈতিক স্বাবলম্বিতা, কর্মক্ষেত্রে মর্যাদা ও সর্বস্তরে সমান অংশীদারিত্ব নিশ্চিতকরণ।"
        : "Women's council promoting equal empowerment, violence-free communities, and policymaking voice.",
      icon: Heart,
      accent: "border-rose-600/30 bg-rose-50/50",
    },
    {
      name: bn ? "বাংলাদেশ কৃষক অধিকার পরিষদ" : "Bangladesh Krishok Odhikar Parishad",
      role: bn
        ? "কৃষক ও ক্ষেতমজুরদের ন্যায্য অধিকার, ফসলের লাভজনক মূল্য, সার-বীজের সহজপ্রাপ্যতা ও কৃষি পেনশন।"
        : "Agrarian front protecting farmers' fair crop prices, subsidized inputs, and agricultural welfare.",
      icon: Tractor,
      accent: "border-teal-600/30 bg-teal-50/50",
    },
  ];

  // Movement Timeline from gonoodhikar.com
  const movementsTimeline = [
    {
      year: bn ? "২০১৮" : "2018",
      title: bn ? "কোটা সংস্কার আন্দোলন ও জাতীয় নবজাগরণ" : "Historic Quota Reform Movement",
      desc: bn
        ? "সরকারি চাকরিতে বৈষম্যমূলক কোটা পদ্ধতির সংস্কার এবং মেধার ভিত্তিতে নিয়োগের দাবিতে বাংলাদেশ সাধারণ ছাত্র অধিকার সংরক্ষণ পরিষদের নেতৃত্বে দেশব্যাপী নজিরবিহীন ছাত্র আন্দোলন সংগঠিত হয়, যা পরবর্তীতে স্বৈরাচারবিরোধী গণজাগরণের ভিত্তি রচনা করে।"
        : "Massive youth uprising led by quota reform organizers demanding merit-based recruitment, laying the foundational groundwork for nationwide democratic resistance.",
    },
    {
      year: bn ? "২০১৯" : "2019",
      title: bn ? "ডাকসু বিজয় ও নিরাপদ সড়ক আন্দোলন" : "DUCSU Election Victory & Student Movement",
      desc: bn
        ? "দীর্ঘ ২৮ বছর পর অনুষ্ঠিত ঐতিহাসিক ডাকসু নির্বাচনে বিপুল ভোটে নুরুল হক নুর ভিপি (সহ-সভাপতি) নির্বাচিত হন। নিরাপদ সড়ক আন্দোলনসহ সকল গণতান্ত্রিক সংগ্রামে শিক্ষার্থীদের পক্ষে রাষ্ট্রীয় দমনপীড়নের বিরুদ্ধে সম্মুখ প্রতিরোধ গড়ে তোলেন।"
        : "Landslide victory of Nurul Haque Nur as Vice President of DUCSU after 28 years, fearlessly championing safe roads, campus autonomy, and student welfare against brutal state crackdowns.",
    },
    {
      year: bn ? "২০২১" : "2021",
      title: bn ? "গণ অধিকার পরিষদের আনুষ্ঠানিক প্রতিষ্ঠা" : "Official Launch of Gono Odhikar Parishad",
      desc: bn
        ? "২৬ অক্টোবর ২০২১ তারিখে রাজধানীর পুরানা পল্টনের কেন্দ্রীয় কার্যালয়ে গণতন্ত্র, ন্যায়বিচার, অধিকার ও জাতীয় স্বার্থের চার মূলনীতির ওপর ভিত্তি করে আনুষ্ঠানিকভাবে 'বাংলাদেশ গণ অধিকার পরিষদ' রাজনৈতিক দলের ঐতিহাসিক যাত্রা শুরু হয়।"
        : "On 26 October 2021 in Purana Paltan, Dhaka, Gono Odhikar Parishad formally launched as a mainstream political party dedicated to citizen-centric democracy and state reform.",
    },
    {
      year: bn ? "২০২৩" : "2023",
      title: bn ? "ভারতীয় আগ্রাসন বিরোধী জাতীয় আন্দোলন" : "Anti-Hegemony & Sovereignty Movement",
      desc: bn
        ? "বাংলাদেশের সার্বভৌমত্ব ও স্বাধীনতা সুরক্ষায় ভারতের একতরফা নীতি, সীমান্ত হত্যা ও জাতীয় স্বার্থবিরোধী চুক্তির বিরুদ্ধে গণ অধিকার পরিষদ দেশব্যাপী সোচ্চার অবস্থান গ্রহণ করে গণসচেতনতা তৈরি করে।"
        : "Vocal nationwide advocacy defending Bangladesh territorial sovereignty, protesting border killings, and opposing unequal bilateral concessions.",
    },
    {
      year: bn ? "২০২৪" : "2024",
      title: bn ? "ঐতিহাসিক জুলাই গণঅভ্যুত্থানে সম্মুখ নেতৃত্ব" : "Historic July Uprising & Transformation",
      desc: bn
        ? "বৈষম্যবিরোধী ছাত্র-জনতার ঐতিহাসিক জুলাই-আগস্ট গণঅভ্যুত্থানে শীর্ষ নেতারা কারাবরণ ও সম্মুখসারিতে থেকে রক্তক্ষয়ী প্রতিরোধ গড়ে তোলেন, যার চূড়ান্ত পরিণতিতে ১৬ বছরের ফ্যাসিবাদী দুঃশাসনের পতন ঘটে এবং জনগণ বিজয়ী হয়।"
        : "Frontline vanguard during the July-August 2024 mass uprising, enduring imprisonment and police violence to overthrow 16 years of authoritarian misrule.",
    },
    {
      year: bn ? "২০২৪" : "2024",
      title: bn ? "নির্বাচন কমিশন কর্তৃক আনুষ্ঠানিক নিবন্ধন (০২ সেপ্টেম্বর)" : "Official EC Registration & Truck Symbol",
      desc: bn
        ? "বাংলাদেশ নির্বাচন কমিশন কর্তৃক ০২ সেপ্টেম্বর ২০২৪ তারিখে গণ অধিকার পরিষদকে আনুষ্ঠানিকভাবে নিবন্ধিত রাজনৈতিক দল হিসেবে গেজেট প্রদান করা হয় (নিবন্ধন নং ০৫১) এবং দলীয় নির্বাচনী প্রতীক হিসেবে 'ট্রাক' বরাদ্দ করা হয়।"
        : "On 02 September 2024, the Bangladesh Election Commission officially gazetted GOP as a registered political party (Reg. No. 051) allocating the electoral symbol 'Truck'.",
    },
  ];

  // Central Leadership from gonoodhikar.com
  const leadership = [
    {
      name: bn ? "নূরুল হক নূর" : "Nurul Haque Nur",
      title: bn ? "সভাপতি (President)" : "President",
      bio: bn
        ? "প্রাক্তন ডাকসু ভাইস প্রেসিডেন্ট (২০১৯-২০২২); ছাত্র অধিকার, গণতান্ত্রিক আন্দোলন ও মানবাধিকার সংগ্রামের শীর্ষ ব্যক্তিত্ব। কোটা সংস্কার আন্দোলন ও জুলাই গণঅভ্যুত্থানে জাতীয়ভাবে নেতৃত্ব প্রদানকারী জননেতা।"
        : "Former DUCSU Vice President (2019-2022), youth icon, leader of the historic quota reform movement, frontline hero of the July Uprising, and founding President of GOP.",
      image: "/images/nur-official-2026.jpg",
      href: "/about",
    },
    {
      name: bn ? "হাসান আল মামুন" : "Hasan Al Mamun",
      title: bn ? "ভারপ্রাপ্ত সাধারণ সম্পাদক (Acting General Secretary)" : "Acting General Secretary",
      bio: bn
        ? "ছাত্র অধিকার আন্দোলনের অন্যতম প্রতিষ্ঠাতা ও কেন্দ্রীয় সমন্বয়ক। কোটা সংস্কার আন্দোলনের প্রারম্ভিক নেতৃত্ব এবং গণ অধিকার পরিষদের সাংগঠনিক ভিত্তি সুদৃঢ়করণ, নীতিনির্ধারণ ও তৃণমূল সমন্বয়ে মুখ্য ভূমিকা পালন করছেন।"
        : "Co-founder of student movement, quota reform pioneer, and executive coordinator overseeing party organization, ideological alignment, and grassroots campaigns.",
      initials: bn ? "হা" : "H",
    },
    {
      name: bn ? "ফারুক হাসান" : "Faruk Hasan",
      title: bn ? "মুখপাত্র (Spokesperson)" : "Spokesperson",
      bio: bn
        ? "গণ অধিকার পরিষদের কেন্দ্রীয় মুখপাত্র ও শীর্ষ জ্যেষ্ঠ নেতা। দলের প্রাতিষ্ঠানিক অবস্থান, গণমাধ্যম যোগাযোগ, জাতীয় রাজনৈতিক সংলাপ ও সংবাদ ব্রিফিংয়ে নিরবচ্ছিন্ন ভূমিকা পালন করছেন।"
        : "Official party spokesperson and senior leader managing national media relations, institutional press briefings, and policy dialogues.",
      initials: bn ? "ফা" : "F",
    },
  ];

  // 21-point reform proposals
  const reformPoints = [
    {
      title: bn ? "দ্বিকক্ষ বিশিষ্ট সংসদ ব্যবস্থা" : "Bicameral Parliament",
      text: bn
        ? "জাতীয় সংসদের পাশাপাশি গুণীজন, বিশেষজ্ঞ ও আঞ্চলিক প্রতিনিধিদের নিয়ে উচ্চকক্ষ প্রতিষ্ঠা করে নির্বাহী বিভাগের ক্ষমতার ভারসাম্য নিশ্চিত করা।"
        : "Establishing an Upper House of Parliament alongside the Lower House to ensure institutional checks and legislative balance.",
    },
    {
      title: bn ? "প্রধানমন্ত্রী পদের মেয়াদের বাধ্যবাধকতা" : "Prime Ministerial Term Limits",
      text: bn
        ? "এক ব্যক্তি সর্বোচ্চ দুই মেয়াদের বেশি প্রধানমন্ত্রী পদে থাকতে পারবেন না — এমন সাংবিধানic বাধ্যবাধকতা তৈরি করা।"
        : "A constitutional mandate capping the tenure of any Prime Minister to a maximum of two consecutive terms.",
    },
    {
      title: bn ? "বিচার বিভাগের পূর্ণাঙ্গ স্বাধীনতা" : "Independent Judicial Secretariat",
      text: bn
        ? "আইন মন্ত্রণালয় থেকে সুপ্রিম কোর্টের অধীনে পৃথক বিচার বিভাগীয় সচিবালয় গঠন ও বিচারক নিয়োগে স্বচ্ছ কমিশন গঠন।"
        : "Establishing an autonomous Supreme Court secretariat completely free from executive ministry control.",
    },
    {
      title: bn ? "সাংবিধানিক সংস্থাসমূহের সংস্কার" : "Neutral Constitutional Appointments",
      text: bn
        ? "নির্বাচন কমিশন, দুদক, পিএসসি ও মানবাধিকার কমিশনের প্রধান নিয়োগে সর্বদলীয় সংসদীয় কমিটি ও স্বচ্ছ প্রক্রিয়া।"
        : "Codified cross-party parliamentary confirmation for Election Commission, ACC, PSC, and Human Rights bodies.",
    },
    {
      title: bn ? "প্রবাসীদের পূর্ণ সুরক্ষা ও ভোটাধিকার" : "Diaspora Enfranchisement & VIP Safety",
      text: bn
        ? "অনলাইনে প্রবাসীদের ভোটাধিকার বাস্তবায়ন, বিমানবন্দরে ভিআইপি প্রটোকল সম্মান ও দূতাবাসগুলোতে জবাবদিহিতামূলক সেবা।"
        : "Enfranchising global Bangladeshi expatriates, VIP consular fast-tracking, and robust welfare safety nets.",
    },
    {
      title: bn ? "তরুণ উদ্যোক্তা ও বেকারত্ব দূরীকরণ" : "Youth Startups & Fair Employment",
      text: bn
        ? "বেকার যুবকদের জন্য জামানতবিহীন সহজ শর্তে স্টার্টআপ ঋণ এবং সকল সরকারি চাকরির আবেদন ফি সম্পূর্ণ বাতিল।"
        : "Collateral-free venture capital for youth startups and complete elimination of government job application fees.",
    },
  ];

  return (
    <main id="main-content" className="min-h-screen bg-sand-50/50 pb-20">
      {/* Top Header / Identity Section */}
      <section className="relative overflow-hidden border-b border-line bg-gradient-to-b from-forest-ink via-[#0d2822] to-forest-ink py-16 text-white sm:py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-10 bg-[radial-gradient(#B49A67_1px,transparent_1px)] [background-size:24px_24px]"
        />

        <Container className="relative">
          <Breadcrumbs
            locale={locale}
            items={[
              {
                label: bn ? "গণ অধিকার পরিষদ" : "GOP",
                href: "/gop",
              },
            ]}
          />

          <div className="mt-8 flex flex-col items-center text-center">
            {/* Official Head Logo */}
            <div className="group relative mb-6 flex h-32 w-32 items-center justify-center rounded-2xl border-2 border-gold/40 bg-white/95 p-3 shadow-2xl backdrop-blur transition-transform duration-300 hover:scale-105 sm:h-36 sm:w-36">
              <Image
                src="/images/gop-logo.svg"
                alt={bn ? "বাংলাদেশ গণ অধিকার পরিষদ লোগো" : "Bangladesh Gono Odhikar Parishad Logo"}
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
                {bn ? "ইসি নিবন্ধন: ০২ সেপ্টেম্বর ২০২৪" : "EC Registered: 02 Sep 2024"}
              </span>
              <a
                href="https://gonoodhikar.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/40 bg-emerald-700/40 px-3 py-1 text-xs font-semibold text-white transition hover:bg-emerald-600/50"
              >
                <Globe2 className="h-3.5 w-3.5 text-emerald-300" />
                <span>gonoodhikar.com</span>
                <ExternalLink className="h-3 w-3 opacity-80" />
              </a>
            </div>

            {/* Title & Slogan */}
            <h1 className="bn-heading mt-6 max-w-3xl text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              {bn ? "বাংলাদেশ গণ অধিকার পরিষদ" : "Bangladesh Gono Odhikar Parishad"}
            </h1>
            <p className="mt-3 text-lg font-medium text-gold sm:text-xl">
              {bn ? "« জনতার অধিকার, আমাদের অঙ্গীকার »" : "« People's Rights, Our Commitment »"}
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#c9cfc5] sm:text-base">
              {bn
                ? "মানবাধিকার, সুশাসন, দুর্নীতিবিরোধী রাজনীতি, রাষ্ট্র সংস্কার ও জনগণের ক্ষমতায়নের পক্ষে আপসহীন রাজনৈতিক দল। ২০১৮ সালের ঐতিহাসিক কোটা সংস্কার আন্দোলন থেকে ২০২৪ সালের জুলাই গণঅভ্যুত্থানের মাধ্যমে স্বৈরাচার পতনের সম্মুখ সারিতে অবস্থান করেছে গণ অধিকার পরিষদ।"
                : "A vanguard democratic force championing institutional human rights, anti-corruption, youth governance, and deep constitutional state reform forged in the frontline movements of Bangladesh."}
            </p>

            {/* Quick Stats from gonoodhikar.com */}
            <div className="mt-10 grid w-full max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
              {officialStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-lg border border-white/10 bg-white/5 p-4 text-center backdrop-blur-sm"
                >
                  <div className="text-2xl font-bold text-white sm:text-3xl">{stat.value}</div>
                  <div className="mt-1 text-xs text-[#a0a89c]">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Quick External Actions */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href="https://gonoodhikar.com/membership"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-gold px-5 py-2.5 text-xs font-semibold text-forest-ink shadow-md transition hover:bg-gold-deep hover:text-white sm:text-sm"
              >
                <Users className="h-4 w-4" />
                <span>{bn ? "সদস্য হোন (অনলাইন ফর্ম)" : "Become a Member"}</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
              <a
                href="https://gonoodhikar.com/donation"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-white/20 sm:text-sm"
              >
                <Heart className="h-4 w-4 text-gold" />
                <span>{bn ? "দলীয় তহবিলে অনুদান" : "Party Donation"}</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* Mission, Vision & Values from gonoodhikar.com */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="text-center">
            <span className="inline-block rounded-full bg-forest-ink/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-forest-ink">
              {bn ? "উদ্দেশ্য ও দর্শন" : "Mission & Vision"}
            </span>
            <h2 className="bn-heading mt-2 text-2xl font-bold text-forest-ink sm:text-3xl">
              {bn ? "আমাদের মিশন, ভিশন ও মূল্যবোধ" : "Our Mission, Vision & Core Values"}
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-muted">
              {bn
                ? "একটি গণতান্ত্রিক, সংস্কারমুখী এবং জনকল্যাণমূলক রাজনৈতিক দল হিসেবে গণ অধিকার পরিষদের লক্ষ্য ও আদর্শ।"
                : "The guiding charter defining GOP's transformative approach toward an equitable, democratic society."}
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {missionCards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  className="flex flex-col justify-between rounded-2xl border border-line bg-white p-6 shadow-sm transition hover:border-gold/60 hover:shadow-md"
                >
                  <div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-forest-ink/10 text-forest-ink">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="bn-heading mt-4 text-xl font-bold text-forest-ink">
                      {card.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-body">
                      {card.desc}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-line/60">
                    <div className="grid grid-cols-2 gap-2">
                      {card.points.map((pt) => (
                        <div key={pt} className="flex items-center gap-1.5 text-xs font-medium text-forest-ink">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 flex-shrink-0" />
                          <span>{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* 4 Pillars Section */}
      <section className="border-t border-line bg-white py-16 sm:py-20">
        <Container>
          <div className="text-center">
            <span className="inline-block rounded-full bg-forest-ink/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-forest-ink">
              {bn ? "দলের ভিত্তিস্তম্ভ" : "Core Ideology"}
            </span>
            <h2 className="bn-heading mt-2 text-2xl font-bold text-forest-ink sm:text-3xl">
              {bn ? "গণ অধিকার পরিষদের চার মূলনীতি" : "The Four Fundamental Pillars"}
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-muted">
              {bn
                ? "জনগণের আশা-আকাঙ্ক্ষা ধারণ করে গণ অধিকার পরিষদ পরিচালিত হয় এই চারটি অবিনাশী নীতির ওপর।"
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

      {/* Leadership Section from gonoodhikar.com */}
      <section className="border-t border-line bg-sand-50/50 py-16 sm:py-20">
        <Container>
          <div className="text-center">
            <span className="inline-block rounded-full bg-gold/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gold-deep">
              {bn ? "কেন্দ্রীয় নেতৃত্ব" : "Central Leadership"}
            </span>
            <h2 className="bn-heading mt-2 text-2xl font-bold text-forest-ink sm:text-3xl">
              {bn ? "প্রধান নেতৃত্ব পরিচিতি" : "Party Presidium & Leadership"}
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-muted">
              {bn
                ? "দল পরিচালনা ও নীতিনির্ধারণে কেন্দ্রীয় নেতৃত্বের ভূমিকা গুরুত্বপূর্ণ (অফিশিয়াল পোর্টাল অনুযায়ী)।"
                : "Senior executives and organizers guiding party strategy, institutional dialogue, and civic campaigns."}
            </p>
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {leadership.map((leader) => (
              <div
                key={leader.name}
                className="relative overflow-hidden rounded-2xl border border-line bg-white p-6 shadow-sm transition hover:border-gold/60 hover:shadow-md"
              >
                <div className="flex items-start gap-4">
                  {leader.image ? (
                    <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border border-line bg-forest-ink/5">
                      <Image
                        src={leader.image}
                        alt={leader.name}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-xl bg-forest-ink text-2xl font-bold text-gold">
                      {leader.initials}
                    </div>
                  )}
                  <div>
                    <span className="inline-block rounded-full bg-forest-ink/10 px-2.5 py-0.5 text-[11px] font-semibold text-forest-ink">
                      {leader.title}
                    </span>
                    <h3 className="bn-heading mt-1.5 text-lg font-bold text-forest-ink">
                      {leader.name}
                    </h3>
                  </div>
                </div>
                <p className="mt-4 text-xs leading-relaxed text-body sm:text-sm">
                  {leader.bio}
                </p>
                {leader.href && (
                  <div className="mt-4 pt-4 border-t border-line/60">
                    <Link
                      href={localePath(locale, leader.href)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-forest-ink hover:text-gold"
                    >
                      {bn ? "বিস্তারিত প্রোফাইল দেখুন" : "View profile"}
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Affiliated Wings from gonoodhikar.com */}
      <section className="border-t border-line bg-white py-16 sm:py-20">
        <Container>
          <div className="text-center">
            <span className="inline-block rounded-full bg-forest-ink/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-forest-ink">
              {bn ? "সাংগঠনিক বিস্তার" : "Front Organizations"}
            </span>
            <h2 className="bn-heading mt-2 text-2xl font-bold text-forest-ink sm:text-3xl">
              {bn ? "গণ অধিকার পরিষদের অঙ্গসংগঠনসমূহ" : "Affiliated Wings & Fronts"}
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-muted">
              {bn
                ? "ছাত্র, যুব, শ্রমিক, প্রবাসী, পেশাজীবী, নারী ও কৃষকদের অধিকার রক্ষায় নিবেদিত ৭টি অঙ্গসংগঠন।"
                : "Seven specialized civic bodies organizing students, workers, women, youth, professionals, farmers, and global expatriates."}
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

      {/* Historical Movement Timeline from gonoodhikar.com */}
      <section className="border-t border-line bg-sand-100/40 py-16 sm:py-20">
        <Container>
          <div className="text-center">
            <span className="inline-block rounded-full bg-gold/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gold-deep">
              {bn ? "ঐতিহাসিক পরিক্রমা" : "Milestones"}
            </span>
            <h2 className="bn-heading mt-2 text-2xl font-bold text-forest-ink sm:text-3xl">
              {bn ? "ছাত্র আন্দোলন থেকে জাতীয় রাজনীতিতে উত্থানের ইতিহাস" : "From Campus Movement to National Politics"}
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-muted">
              {bn
                ? "কোটা সংস্কার আন্দোলন থেকে ২০২৪ সালের ঐতিহাসিক জুলাই গণঅভ্যুত্থান ও নির্বাচন কমিশনে নিবন্ধন লাভের ধারাবাহিক পরিক্রমা।"
                : "Tracing the historic journey from youth advocacy to becoming a premier national political force."}
            </p>
          </div>

          <div className="relative mt-12 max-w-3xl mx-auto pl-6 sm:pl-8 border-l-2 border-forest-ink/20 space-y-10">
            {movementsTimeline.map((m) => (
              <div key={m.title} className="relative group">
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
      <section className="border-t border-line bg-white py-16 sm:py-20">
        <Container>
          <div className="text-center">
            <span className="inline-block rounded-full bg-forest-ink/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-forest-ink">
              {bn ? "রাষ্ট্র বিনির্মাণ" : "Manifesto & Reforms"}
            </span>
            <h2 className="bn-heading mt-2 text-2xl font-bold text-forest-ink sm:text-3xl">
              {bn ? "রাষ্ট্র সংস্কারে গণ অধিকার পরিষদের ২১ দফা রূপরেখা" : "21-Point National Reform Charter"}
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-sm text-muted">
              {bn
                ? "একটি কার্যকর, জবাবদিহিতামূলক ও শোষণমুক্ত রাষ্ট্রব্যবস্থা প্রতিষ্ঠার লক্ষ্যে গণ অধিকার পরিষদের যুগান্তকারী সংস্কার প্রস্তাবনা।"
                : "Key institutional and constitutional reform proposals outlined in GOP's 21-point manifesto for a modern, accountable Bangladesh."}
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {reformPoints.map((item, idx) => (
              <div
                key={item.title}
                className="rounded-xl border border-line bg-sand-50/50 p-6 shadow-xs transition hover:border-emerald-600/50 hover:shadow-sm"
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
      <section className="border-t border-line bg-sand-50/50 py-16 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            {/* Left: Flag visual and meaning */}
            <div className="rounded-2xl border border-line bg-white p-6 sm:p-8 shadow-xs">
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
                  ? "সবুজ ও লাল রঙের সমন্বয়ে গঠিত গণ অধিকার পরিষদের পতাকা বাংলাদেশের স্বাধীনতা ও সার্বভৌমত্বের প্রতীক। পতাকার চারটি তারকা দলের চার মূলনীতি — গণতন্ত্র, ন্যায়বিচার, অধিকার এবং জাতীয় স্বার্থের দ্যোতক।"
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
                  ? "বাংলাদেশ নির্বাচন কমিশন কর্তৃক গণ অধিকার পরিষদকে বরাদ্দকৃত নির্বাচনী প্রতীক 'ট্রাক'। ট্রাক হলো দেশের অর্থনীতি, কৃষক-শ্রমিকের কঠোর পরিশ্রম, নগর থেকে প্রত্যন্ত অঞ্চলের সংযোগ এবং দেশ গড়ার অন্যতম অবিচ্ছেদ্য হাতিয়ার।"
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

      {/* Central Office & Official Contact Info from gonoodhikar.com */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="rounded-2xl border border-line bg-forest-ink p-8 text-white sm:p-12 shadow-xl">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-8">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/20 px-3 py-1 text-xs font-semibold text-gold">
                  <Flag className="h-3 w-3" />
                  {bn ? "অফিশিয়াল কেন্দ্রীয় কার্যালয়" : "Official Central Headquarters"}
                </span>
                <h2 className="bn-heading mt-3 text-2xl font-bold text-white sm:text-3xl">
                  {bn ? "বাংলাদেশ গণ অধিকার পরিষদ কেন্দ্রীয় দপ্তর" : "Bangladesh Gono Odhikar Parishad Secretariat"}
                </h2>

                <div className="mt-6 space-y-3 text-sm text-[#c9cfc5]">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                    <span>
                      {bn
                        ? "আল রাজী টাওয়ার, (৩য় তলা) বিজয়নগর পানির ট্যাংক, পুরানা পল্টন, ঢাকা-১০০০, বাংলাদেশ।"
                        : "Al-Razi Tower, (3rd Floor), Bijoynagar Water Tank, Purana Paltan, Dhaka-1000, Bangladesh."}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-gold flex-shrink-0" />
                    <a href="tel:+8801772400567" className="hover:text-gold transition">
                      +880 1772-400567
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-gold flex-shrink-0" />
                    <a href="mailto:gopoffice21@gmail.com" className="hover:text-gold transition">
                      gopoffice21@gmail.com
                    </a>
                  </div>
                </div>

                <p className="mt-4 text-xs text-[#a0a89c] sm:text-sm">
                  {bn
                    ? "সদস্যপদ গ্রহণ, সাংগঠনিক সমন্বয়, গঠনতন্ত্র ও প্রকাশনা সংক্রান্ত যেকোনো তথ্যের জন্য কেন্দ্রীয় দপ্তর সরাসরি যোগাযোগ উপযোগী।"
                    : "Official party headquarters open for membership verification, district coordination, and citizen engagement."}
                </p>
              </div>

              <div className="flex flex-col gap-3 lg:col-span-4 sm:flex-row lg:flex-col">
                <a
                  href="https://gonoodhikar.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-gold px-6 py-3 text-sm font-semibold text-forest-ink transition hover:bg-gold-deep hover:text-white"
                >
                  <Globe2 className="h-4 w-4" />
                  <span>{bn ? "gonoodhikar.com ভিজিট করুন" : "Visit gonoodhikar.com"}</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
                <a
                  href="https://gonoodhikar.com/membership"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
                >
                  <Users className="h-4 w-4 text-gold" />
                  <span>{bn ? "অনলাইন সদস্য ফর্ম" : "Online Membership"}</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
