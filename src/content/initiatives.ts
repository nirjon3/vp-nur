import type { Initiative } from "@/types/content";

/**
 * Sample initiatives — all pending verification, all status values are
 * editorial placeholders (not measured progress). No percentages, costs or
 * completion dates may be shown until sourced.
 */
export const initiatives: Initiative[] = [
  {
    slug: "embankment-restoration",
    category: { bn: "ভিত্তি উন্নয়ন", en: "Infrastructure" },
    status: "planned",
    location: { bn: "গালাচিপা ও দশমিনা", en: "Galachipa and Dashmina" },
    title: {
      bn: "বেড়িবাঁধ সংস্কার ও নদীভাঙন প্রতিরোধ",
      en: "Embankment rehabilitation and erosion prevention",
    },
    excerpt: {
      bn: "মেঘনা ও তেংরা নদী ব্যবস্থার ভাঙনপ্রবণ পয়েন্টগুলো চিহ্নিত করে সংস্কার প্রস্তাব প্রণয়ন।",
      en: "Identifying erosion-prone points along the river system and preparing rehabilitation proposals.",
    },
    body: [
      {
        bn: "ইঞ্জিনিয়ারিং জরিপ, পানি উন্নয়ন বোর্ড ও স্থানীয় প্রশাসনের সমন্বয়ে এলাকাভিত্তিক সংস্কার প্রস্তাব তৈরির কাজ পরিকল্পনামাফিক চলছে। কাজের পরিধি, বাজেট ও সময়সীমা সংশ্লিষ্ট দপ্তর কর্তৃক অনুমোদনের পর প্রকাশিত হবে।",
        en: "Area-wise rehabilitation proposals are being prepared with engineering surveys in coordination with the Water Development Board and the local administration. Scope, budget and timeline will be published after departmental approval.",
      },
    ],
    startDate: undefined,
    updates: [],
    verification: "pending",
    updatedAt: "2026-11-17",
  },
  {
    slug: "community-clinic-strengthening",
    category: { bn: "স্বাস্থ্য", en: "Health" },
    status: "ongoing",
    location: { bn: "গালাচিপা উপজেলা", en: "Galachipa Upazila" },
    title: {
      bn: "কমিউনিটি ক্লিনিক শক্তিশালীকরণ",
      en: "Strengthening community clinics",
    },
    excerpt: {
      bn: "উপস্বাস্থ্য কেন্দ্রগুলোতে ওষুধ সরবরাহ ও সেবা সময়সূচি নিশ্চিতকরণের উদ্যোগ।",
      en: "Efforts to ensure medicine supply and service schedules at community clinics.",
    },
    body: [
      {
        bn: "ক্লিনিকগুলোর রসদ ও জনবল চাহিদা চিহ্নিত করে স্বাস্থ্য বিভাগের সঙ্গে সমন্বয়ে কাজ এগোচ্ছে। অগ্রগতি যাচাই সাপেক্ষে আপডেট প্রকাশিত হবে।",
        en: "Supplies and staffing gaps are being mapped in coordination with the health department. Progress will be published as items are verified.",
      },
    ],
    startDate: "2026-09-01",
    updates: [
      {
        date: "2026-10-20",
        text: {
          bn: "প্রারম্ভিক রসদ চাহিদার একটি তালিকা স্বাস্থ্য বিভাগের কাছে উপস্থাপন করা হয়েছে।",
          en: "An initial supplies list has been submitted to the health department.",
        },
      },
    ],
    verification: "pending",
    updatedAt: "2026-11-17",
  },
  {
    slug: "school-lab-programme",
    category: { bn: "শিক্ষা", en: "Education" },
    status: "planned",
    location: { bn: "দশমিনা উপজেলা", en: "Dashmina Upazila" },
    title: {
      bn: "মাধ্যমিক বিদ্যালয়ে বিজ্ঞান ল্যাব সহায়তা",
      en: "Science lab support for secondary schools",
    },
    excerpt: {
      bn: "দশমিনার মাধ্যমিক বিদ্যালয়গুলোতে বিজ্ঞান ল্যাব স্থাপনা ও যন্ত্রপাতি সরবরাহের পরিকল্পনা।",
      en: "A plan to equip secondary schools in Dashmina with science laboratories and instruments.",
    },
    body: [
      {
        bn: "বিদ্যালয়ভিত্তিক চাহিদা নিরূপণ করে উপজেলা শিক্ষা অফিসের সঙ্গে তালিকা চূড়ান্ত করার পর কাজ শুরু হবে। ব্যয় ও উৎস যাচাই শেষে প্রকাশিত হবে।",
        en: "School-wise needs assessment will be finalised with the upazila education office before implementation. Costs and funding sources will be published after verification.",
      },
    ],
    updates: [],
    verification: "pending",
    updatedAt: "2026-11-17",
  },
];
