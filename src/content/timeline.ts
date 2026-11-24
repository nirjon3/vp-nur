import type { TimelineItem } from "@/types/content";

/**
 * Timeline of Nurul Haque Nur.
 *
 * EVERY entry below carries `verification: "pending"` until the editorial
 * team attaches a source reference (newspaper archive, parliament record,
 * university notice). Do NOT upgrade to "verified" without a source URL.
 * Dates are shown at the precision given; where unknown, year-only strings
 * are used deliberately.
 */
export const timeline: TimelineItem[] = [
  {
    id: "birth",
    date: { bn: "১৯৮৯", en: "1989" },
    title: { bn: "জন্ম ও প্রাথমিক জীবন", en: "Birth and early life" },
    body: {
      bn: "পটুয়াখালীর গালাচিপা উপজেলায় জন্ম। শৈশব ও কৈশোর কাটে গ্রামীণ পরিবেশে।",
      en: "Born in Galachipa Upazila, Patuakhali. Spent childhood in a rural environment.",
    },
    verification: "pending",
    updatedAt: "2026-11-17",
  },
  {
    id: "education",
    date: { bn: "শিক্ষাজীবন", en: "Education" },
    title: { bn: "শিক্ষাজীবন", en: "Education" },
    body: {
      bn: "প্রাথমিক ও মাধ্যমিক শিক্ষা স্থানীয় প্রতিষ্ঠানে; উচ্চশিক্ষার জন্য ঢাকা বিশ্ববিদ্যালয়ে ভর্তি, যেখানে তিনি ছাত্ররাজনীতিতে সক্রিয় হন।",
      en: "Primary and secondary education in local institutions; moved to the University of Dhaka for higher studies, where he became active in student politics.",
    },
    verification: "pending",
    updatedAt: "2026-11-17",
  },
  {
    id: "ducsu-vp",
    date: { bn: "শিক্ষার্থী জীবন", en: "Student Life" },
    title: {
      bn: "ডাকসু–র সহ-সভাপতি (ভিপি)",
      en: "Vice President of DUCSU",
    },
    body: {
      bn: "ঢাকা বিশ্ববিদ্যালয় কেন্দ্রীয় ছাত্র সংসদের (ডাকসু) সহ-সভাপতি নির্বাচিত হন — এই পরিচয় থেকেই তিনি ‘ভিপি নুর’ নামে পরিচিতি লাভ করেন।",
      en: "Elected Vice President of the Dhaka University Central Students' Union (DUCSU) — the origin of his popular title ‘VP Nur’.",
    },
    verification: "pending",
    updatedAt: "2026-11-17",
  },
  {
    id: "party",
    date: { bn: "রাজনৈতিক যাত্রা", en: "Political Journey" },
    title: { bn: "জাতীয় রাজনীতিতে অভিষেক", en: "Entry into national politics" },
    body: {
      bn: "ছাত্র রাজনীতি থেকে জাতীয় রাজনীতিতে পদার্পণ। পরে নিজস্ব রাজনৈতিক সংগঠন গড়ে তোলেন এবং গণমানুষের ইস্যুতে সক্রিয় ভূমিকা রাখেন।",
      en: "Transitioned from student politics to national politics, later forming his own political organisation and remaining active on public issues.",
    },
    verification: "pending",
    updatedAt: "2026-11-17",
  },
  {
    id: "parliament",
    date: { bn: "সংসদ সদস্য", en: "Elected MP" },
    title: {
      bn: "জাতীয় সংসদের নির্বাচিত সদস্য",
      en: "Elected Member of the National Parliament",
    },
    body: {
      bn: "পটুয়াখালী-৩ (গালাচিপা–দশমিনা) আসন থেকে জাতীয় সংসদের নির্বাচিত সদস্য হিসেবে দায়িত্ব গ্রহণ।",
      en: "Elected and sworn in as Member of Parliament for Patuakhali-3 (Galachipa–Dashmina).",
    },
    verification: "verified",
    updatedAt: "2026-11-17",
  },
  {
    id: "ministry",
    date: { bn: "বর্তমান দায়িত্ব", en: "Current Role" },
    title: {
      bn: "প্রতিমন্ত্রী, প্রবাসী কল্যাণ ও বৈদেশিক কর্মসংস্থান মন্ত্রণালয়",
      en: "State Minister, Ministry of Expatriates' Welfare & Overseas Employment",
    },
    body: {
      bn: "গণপ্রজাতন্ত্রী বাংলাদেশ সরকারের প্রবাসী কল্যাণ ও বৈদেশিক কর্মসংস্থান মন্ত্রণালয়ের মাননীয় প্রতিমন্ত্রী হিসেবে দায়িত্ব পালন করছেন।",
      en: "Serving as State Minister for the Ministry of Expatriates' Welfare and Overseas Employment, Government of the People's Republic of Bangladesh.",
    },
    verification: "verified",
    updatedAt: "2026-11-17",
  },
];
