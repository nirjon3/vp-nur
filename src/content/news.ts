import type { NewsArticle } from "@/types/content";

/**
 * Development samples. Every article below is `verification: "pending"` and
 * contains neutral, non-attributional placeholder copy — no quotes, dates of
 * real events or claims about the subject are fabricated. Replace through the
 * CMS (or by editing this file) with sourced, verified reporting.
 */
export const newsArticles: NewsArticle[] = [
  {
    slug: "website-launch",
    date: "2026-11-17",
    category: "announcement",
    featured: true,
    title: {
      bn: "নুরুল হক নুরের ব্যক্তিগত ও তথ্যভিত্তিক ওয়েবসাইট চালু",
      en: "Personal information website of Nurul Haque Nur launched",
    },
    excerpt: {
      bn: "সংসদীয় কর্মকাণ্ড, এলাকার উন্নয়ন উদ্যোগ এবং নাগরিক সেবা — সব তথ্য এক জায়গায়, যাচাইকৃত উৎসসহ।",
      en: "Parliamentary activities, constituency development initiatives and citizen services — in one place, with source references.",
    },
    body: [
      {
        bn: "এই ওয়েবসাইটের লক্ষ্য নুরুল হক নুর (ভিপি নুর)–এর সংসদীয় দায়িত্ব, এলাকার জনউদ্যোগ এবং জনগণের সঙ্গে যোগাযোগ সহজ করা। সাইটটি বাংলা ও ইংরেজি — দুই ভাষায় প্রকাশিত হচ্ছে।",
        en: "This website aims to make Nurul Haque Nur (VP Nur)'s parliamentary duties, constituency initiatives and public communication easier to follow. It is published in both Bengali and English.",
      },
      {
        bn: "প্রকাশিত প্রতিটি তথ্য যাচাইকৃত উৎস থেকে নিশ্চিত হওয়ার পর ‘যাচাইকৃত’ হিসেবে চিহ্নিত হবে। এখনো যাচাই হয়নি এমন উপাদানে ‘যাচাই চলমান’ ব্যাজ দেখা যাবে।",
        en: "Every published fact will be marked verified only after confirmation against a source. Items not yet verified carry a ‘verification pending’ badge.",
      },
      {
        bn: "সাইটটি কোনো সরকারি মালিকানাধীন নয়। সরকারি কার্যক্রম সংশ্লিষ্ট দপ্তরের অফিসিয়াল চ্যানেলেই চূড়ান্ত বলে গণ্য হবে।",
        en: "The site is not government-owned. Official records remain authoritative at the respective government channels.",
      },
    ],
    verification: "verified",
    sourceLabel: { bn: "ওয়েবসাইট টিম", en: "Website team" },
    updatedAt: "2026-11-17",
  },
  {
    slug: "constituency-development-sample",
    date: "2026-11-10",
    category: "constituency",
    title: {
      bn: "এলাকার উন্নয়ন অগ্রাধিকার: নদী ভাঙন ও বেড়িবাঁধ",
      en: "Constituency priorities: erosion and embankments",
    },
    excerpt: {
      bn: "গালাচিপা–দশমিনার মানুষের দীর্ঘদিনের দাবিগুলোর মধ্যে নদীভাঙন রোধে সমন্বিত পরিকল্পনা অন্যতম।",
      en: "Among the long-standing demands of Galachipa–Dashmina, coordinated action on river erosion stands out.",
    },
    body: [
      {
        bn: "নদীভাঙন প্রতিরোধ, বেড়িবাঁধ সংস্কার এবং চর এলাকার মানুষের নিরাপত্তা — এসব বিষয়ে স্থানীয় প্রশাসন ও সংশ্লিষ্ট দপ্তরের সঙ্গে কার্যক্রম চলমান। বিস্তারিত ও সময়সীমা যাচাই সম্পন্ন হলে এখানে হালনাগাদ প্রকাশিত হবে।",
        en: "Work with the local administration and relevant departments on embankment repair and char-area safety is ongoing. Details and timelines will be published here once verified.",
      },
    ],
    verification: "pending",
    updatedAt: "2026-11-17",
  },
  {
    slug: "parliament-session-sample",
    date: "2026-10-28",
    category: "parliament",
    title: {
      bn: "সংসদে বক্তৃতা ও প্রশ্নোত্তর: সারসংক্ষেপ যাচাই চলমান",
      en: "Speeches and questions in parliament: summary pending",
    },
    excerpt: {
      bn: "সাম্প্রতিক অধিবেশনে অংশ নেওয়া বক্তৃতা ও প্রশ্নোত্তরের সারসংক্ষেপ যাচাইয়ের পর এখানে প্রকাশিত হবে।",
      en: "A summary of recent speeches and Q&A in parliament will be published here after verification.",
    },
    body: [
      {
        bn: "জাতীয় সংসদের কারেসপন্ডেন্স ও হ্যান্সার্ড থেকে যাচাই শেষে বক্তৃতা ও প্রশ্নোত্তরের সারসংক্ষেপ এই বিভাগে প্রকাশিত হবে। উৎস লিংকসহ প্রতিটি এন্ট্রি সংরক্ষণ করা হচ্ছে।",
        en: "A summary of speeches and questions will be published in this section after verification against official parliament records, with source links retained for every entry.",
      },
    ],
    verification: "pending",
    updatedAt: "2026-11-17",
  },
  {
    slug: "initiative-climate-shelter-sample",
    date: "2026-10-15",
    category: "initiative",
    title: {
      bn: "দুর্যোগ প্রস্তুতি: আশ্রয়কেন্দ্র জরিপ করার উদ্যোগ",
      en: "Disaster preparedness: shelter survey initiative",
    },
    excerpt: {
      bn: "উপকূলীয় এলাকার ঘূর্ণিঝড় আশ্রয়কেন্দ্রগুলোর অবস্থা যাচাই ও সংস্কারের প্রস্তাব নিয়ে আলোচনা শুরু হয়েছে।",
      en: "Discussions have begun on assessing and upgrading cyclone shelters in the coastal belt.",
    },
    body: [
      {
        bn: "গালাচিপা ও দশমিনার ঘূর্ণিঝড় আশ্রয়কেন্দ্রগুলোর বর্তমান অবস্থা চিহ্নিত করতে এবং সংস্কার পরিকল্পনা চূড়ান্ত করতে স্থানীয় জনপ্রতিনিধি ও প্রশাসনের সমন্বয়ে প্রাথমিক জরিপ পরিকল্পনামাফিক হচ্ছে। অগ্রগতি যাচাই সাপেক্ষে প্রকাশিত হবে।",
        en: "A preliminary survey is being planned with local representatives and the administration to assess cyclone shelters across Galachipa and Dashmina. Progress will be published as it is verified.",
      },
    ],
    verification: "pending",
    updatedAt: "2026-11-17",
  },
];

export const newsCategories: Record<string, { bn: string; en: string }> = {
  parliament: { bn: "সংসদ", en: "Parliament" },
  constituency: { bn: "এলাকা", en: "Constituency" },
  initiative: { bn: "উদ্যোগ", en: "Initiative" },
  media: { bn: "মিডিয়া", en: "Media" },
  announcement: { bn: "ঘোষণা", en: "Announcement" },
};
