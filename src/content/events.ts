import type { PublicEvent } from "@/types/content";

/** Events — only confirmed, public events belong here. Unverified
 *  schedules must never be published (see /events page note). */
export const events: PublicEvent[] = [
  {
    id: "sample-open-hearing",
    title: {
      bn: "এলাকাভিত্তিক জনশুনানি (প্রস্তাবিত)",
      en: "Area-wise public hearing (proposed)",
    },
    date: "2026-12-05T10:00:00+06:00",
    time: { bn: "সকাল ১০:০০", en: "10:00 AM" },
    location: { bn: "গালাচিপা পৌরসভা (চূড়ান্ত তারিখ ঘোষিতব্য)", en: "Galachipa Municipality (venue to be confirmed)" },
    description: {
      bn: "প্রতিটি ইউনিয়নের সাধারণ মানুষের সঙ্গে সরাসরি মতবিনিময়ের একটি প্রস্তাবনা। তারিখ, সময় ও স্থান চূড়ান্ত হলে এই পৃষ্ঠায় প্রকাশ করা হবে।",
      en: "A proposed open exchange with residents of every union. Date, time and venue will be published here once confirmed.",
    },
    status: "upcoming",
    verification: "pending",
    updatedAt: "2026-11-17",
  },
  {
    id: "sample-past-visit",
    title: { bn: "এলাকা সফর — দশমিনা", en: "Constituency visit — Dashmina" },
    date: "2026-09-30T09:00:00+06:00",
    location: { bn: "দশমিনা উপজেলা", en: "Dashmina Upazila" },
    description: {
      bn: "দশমিনা উপজেলার বিভিন্ন ইউনিয়ন পরিদর্শন ও স্থানীয় মানুষের সঙ্গে মতবিনিময়।",
      en: "Inspection visits across Dashmina unions and exchanges with local residents.",
    },
    status: "past",
    verification: "pending",
    updatedAt: "2026-11-17",
  },
];
