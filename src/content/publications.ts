import type { Publication } from "@/types/content";

/** Public documents library. Only publicly releasable material belongs here.
 *  fileUrl is attached only when the document is actually available. */
export const publications: Publication[] = [
  {
    id: "budget-response-note",
    date: "2026-06-15",
    category: { bn: "নীতি ও বাজেট", en: "Policy & budget" },
    title: {
      bn: "বাজেট প্রতিক্রিয়া — সংসদীয় নোট (নমুনা)",
      en: "Budget response — parliamentary note (sample)",
    },
    description: {
      bn: "বাজেট বিষয়ে লিখিত প্রতিক্রিয়ার একটি কাঠামো নমুনা। চূড়ান্ত, যাচাইকৃত সংস্করণ নথি সংযুক্ত হলে এখানে প্রকাশিত হবে।",
      en: "A structural sample of a written budget response. The final verified version will be published here with the document attached.",
    },
    verification: "pending",
    updatedAt: "2026-11-17",
  },
  {
    id: "constituency-report-2026",
    date: "2026-11-01",
    category: { bn: "এলাকা প্রতিবেদন", en: "Constituency report" },
    title: {
      bn: "পটুয়াখালী-৩ ষাণ্মাসিক প্রতিবেদন (খসড়া)",
      en: "Patuakhali-3 half-yearly report (draft)",
    },
    description: {
      bn: "এলাকা উন্নয়ন অগ্রাধিকারের অগ্রগতি নিয়ে একটি অর্ধবার্ষিক প্রতিবেদনের খসড়া। যাচাই শেষে প্রকাশযোগ্য সংস্করণ সংযুক্ত হবে।",
      en: "Draft of a half-yearly report on constituency development priorities. The publishable version will be attached after verification.",
    },
    verification: "pending",
    updatedAt: "2026-11-17",
  },
];
