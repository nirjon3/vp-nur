import type { Initiative } from "@/types/content";

/**
 * Sample initiatives — all pending verification, all status values are
 * editorial placeholders (not measured progress). No percentages, costs or
 * completion dates may be shown until sourced.
 */
export const initiatives: Initiative[] = [
  {
    slug: "gulshan-expatriate-hospital",
    category: { bn: "স্বাস্থ্য ও প্রবাসী কল্যাণ", en: "Healthcare & Expatriate Welfare" },
    status: "planned",
    location: { bn: "গুলশান, ঢাকা", en: "Gulshan, Dhaka" },
    title: {
      bn: "প্রবাসীদের জন্য গুলশানে বিশেষায়িত হাসপাতাল নির্মাণ উদ্যোগ",
      en: "Specialized Hospital in Gulshan for Expatriate Workers and Families",
    },
    excerpt: {
      bn: "প্রবাসী কর্মী ও তাদের পরিবারের মানসম্মত চিকিৎসা সেবা নিশ্চিত করতে ঢাকার গুলশানে আধুনিক বিশেষায়িত হাসপাতাল নির্মাণের পরিকল্পনা।",
      en: "A plan to establish a modern, specialized hospital in Gulshan, Dhaka, ensuring quality healthcare for migrant workers and their families.",
    },
    body: [
      {
        bn: "প্রবাসী কল্যাণ ও বৈদেশিক কর্মসংস্থান মন্ত্রণালয়ের দায়িত্বপ্রাপ্ত মাননীয় প্রতিমন্ত্রী নুরুল হক নুর (ভিপি নুর) রেমিট্যান্স যোদ্ধা প্রবাসী কর্মী ও তাদের পরিবারের বিশেষায়িত চিকিৎসা সেবা প্রদানে ঢাকার গুলশানে একটি আধুনিক হাসপাতাল নির্মাণের উদ্যোগের কথা ঘোষণা করেছেন।",
        en: "Hon'ble State Minister for Expatriates' Welfare and Overseas Employment, Nurul Haque Nur (VP Nur), has announced an initiative to establish a modern specialized hospital in Gulshan, Dhaka, dedicated to providing quality medical care for migrant workers and their families.",
      },
      {
        bn: "এই উদ্যোগে প্রবাসীদের জন্য বিশেষায়িত স্বাস্থ্যসেবা উইং, প্রবাসী হেলথ কার্ডের মাধ্যমে চিকিৎসা সুবিধা এবং জরুরি চিকিৎসাসেবা নিশ্চিত করার পরিকল্পনা গ্রহণ করা হয়েছে। স্বাস্থ্য মন্ত্রণালয় ও সংশ্লিষ্ট দপ্তরগুলোর সাথে সমন্বয়ের মাধ্যমে প্রাথমিক জরিপ ও বাস্তবায়ন প্রক্রিয়া পরিচালিত হচ্ছে।",
        en: "The initiative encompasses dedicated medical wings, healthcare privileges through expatriate health cards, and emergency response services. Initial surveys and inter-ministerial coordination with the Ministry of Health and relevant authorities are currently in progress.",
      },
    ],
    imageUrl: "/images/initiative-expatriate-hospital.jpg",
    videoUrl: "https://www.facebook.com/reel/1108372675364812",
    startDate: "2026-04-10",
    updates: [
      {
        date: "2026-04-12",
        text: {
          bn: "বায়ান্ন টেলিভিশনের ভিডিও প্রতিবেদনে গুলশানে বিশেষায়িত প্রবাসী হাসপাতাল নির্মাণের পরিকল্পনা তুলে ধরা হয়।",
          en: "Bayanno Television broadcasted a special report highlighting the planned expatriate hospital in Gulshan.",
        },
      },
    ],
    verification: "verified",
    sourceUrl: "https://www.facebook.com/share/r/1CrSLsabWQ/",
    sourceLabel: { bn: "বায়ান্ন টেলিভিশন (ভিডিও রিপোর্ট)", en: "Bayanno Television (Video Report)" },
    updatedAt: "2026-04-15",
  },
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
