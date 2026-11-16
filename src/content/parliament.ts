import type { ParliamentActivity } from "@/types/content";

/**
 * Parliamentary activity archive — development samples only.
 * Entries carry `verification: "pending"` and no fabricated sitting dates,
 * bills or quotes. Replace with records from the official parliament
 * (hansard / parliament publications), each with a sourceUrl.
 */
export const parliamentActivities: ParliamentActivity[] = [
  {
    slug: "speech-coastal-embankment",
    date: "2026-10-08",
    category: "speech",
    title: {
      bn: "উপকূলীয় বেড়িবাঁধ বিষয়ে বক্তব্য",
      en: "Speech on coastal embankments",
    },
    excerpt: {
      bn: "তেংরা–মেঘনা মোহনার ভাঙনপ্রবণ এলাকাগুলোর বেড়িবাঁধ সংস্কার দাবি সংসদে উত্থাপন।",
      en: "Raising the demand for embankment rehabilitation in erosion-prone points of the estuarial river system.",
    },
    body: [
      {
        bn: "বক্তব্যের সারসংক্ষেপ: উপকূলীয় এলাকার নদীভাঙন পরিস্থিতি, সাম্প্রতিক ভাঙন ক্ষয়ক্ষতি এবং বেড়িবাঁধ সংস্কারে পানি উন্নয়ন বোর্ডের ভূমিকা নিয়ে আলোচনা করা হয়েছে। হুবহু উক্তি সংসদের দাপ্তরিক হ্যান্সার্ড থেকে সংগৃহীত হলে এখানে যোগ করা হবে।",
        en: "Summary of the speech: discussion of river erosion in the coastal belt, recent damages and the role of the Water Development Board in embankment rehabilitation. Verbatim text will be added from the official hansard once retrieved.",
      },
    ],
    session: { bn: "জাতীয় সংসদ অধিবেশন", en: "National parliament sitting" },
    verification: "pending",
    updatedAt: "2026-11-17",
  },
  {
    slug: "question-salinity",
    date: "2026-09-17",
    category: "question",
    title: {
      bn: "উপকূলীয় অঞ্চলে লবণাক্ততা নিয়ে লিখিত প্রশ্ন",
      en: "Written question on salinity in the coastal belt",
    },
    excerpt: {
      bn: "কৃষি জমিতে লবণাক্ততার প্রভাব ও মিষ্টি পানির বিকল্প সরবরাহ বিষয়ে প্রশ্নোত্তর।",
      en: "Q&A on salinity intrusion in farmland and alternative fresh-water supply.",
    },
    body: [
      {
        bn: "প্রশ্নোত্তরের সারসংক্ষেপ: লবণাক্ততা মাপার বর্তমান ব্যবস্থা, সেচব্যবস্থার বিকল্প এবং বিকল্প জীবিকা সহায়তা নিয়ে তথ্য চাওয়া হয়েছে। সরকারি উত্তরসহ সম্পূর্ণ উপাদান যাচাইয়ের পর এখানে প্রকাশ করা হবে।",
        en: "Summary of the Q&A: information sought on salinity monitoring, irrigation alternatives and livelihood support. The complete record with the government's answer will be published here after verification.",
      },
    ],
    session: { bn: "জাতীয় সংসদ অধিবেশন", en: "National parliament sitting" },
    verification: "pending",
    updatedAt: "2026-11-17",
  },
  {
    slug: "committee-statement",
    date: "2026-08-25",
    category: "committee",
    title: {
      bn: "সংসদীয় স্থায়ী কমিটির বৈঠকে অংশগ্রহণ",
      en: "Participation in a standing committee meeting",
    },
    excerpt: {
      bn: "কমিটি বৈঠকে উপকূলীয় অবকাঠামো বিষয়ক আলোচনার অংশ হিসেবে অবদান।",
      en: "Contribution in a committee meeting on coastal infrastructure.",
    },
    body: [
      {
        bn: "কমিটি বৈঠকের কার্যবিবরণী ও সিদ্ধান্ত হ্যান্সার্ড থেকে যাচাই শেষে এই এন্ট্রি হালনাগাদ করা হবে।",
        en: "This entry will be updated after verification against the committee minutes and hansard.",
      },
    ],
    verification: "pending",
    updatedAt: "2026-11-17",
  },
  {
    slug: "responsibility-parliamentary-role",
    date: "2026-06-30",
    category: "responsibility",
    title: {
      bn: "সংসদীয় দায়িত্ব ও কার্যক্রম প্রতিবেদন",
      en: "Parliamentary duties and activity report",
    },
    excerpt: {
      bn: "চলতি মেয়াদের সংসদীয় দায়িত্ব ও কার্যক্রমের একটি সারসংক্ষেপ প্রতিবেদন।",
      en: "A consolidated summary of parliamentary duties and activities in the current term.",
    },
    body: [
      {
        bn: "এই প্রতিবেদনটি হ্যান্সার্ড, সংসদ সচিবালয় প্রকাশনা ও দপ্তরবিহীন সূত্র থেকে যাচাই করে পর্যায়ক্রমে সম্পূর্ণ করা হচ্ছে।",
        en: "This report is compiled progressively from hansard, parliament secretariat publications and official channels.",
      },
    ],
    verification: "pending",
    updatedAt: "2026-11-17",
  },
];
