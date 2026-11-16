import type { Constituency } from "@/types/content-extra";

/** Constituency reference data. Geography/administrative facts marked
 *  verified are basic public-record geography; electoral and development
 *  claims remain pending until sourced. */
export const constituency: Constituency = {
  id: "patuakhali-3",
  name: { bn: "পটুয়াখালী-৩", en: "Patuakhali-3" },
  upazilas: [
    { bn: "গালাচিপা উপজেলা", en: "Galachipa Upazila" },
    { bn: "দশমিনা উপজেলা", en: "Dashmina Upazila" },
  ],
  overview: {
    bn: "পটুয়াখালী-৩ নির্বাচনী আসনটি বাংলাদেশের দক্ষিণ-পূর্বাঞ্চলের উপকূলীয় জেলা পটুয়াখালীর গালাচিপা ও দশমিনা উপজেলা নিয়ে গঠিত। ভৌগোলিক অবস্থানের কারণে এ অঞ্চলটি নদী ভাঙন, লবণাক্ততা ও ঘূর্ণিঝড়ের ঝুঁকিপ্রবণ।",
    en: "The Patuakhali-3 parliamentary constituency comprises the Galachipa and Dashmina upazilas of Patuakhali, a coastal district in southern Bangladesh. Its geography makes the area exposed to river erosion, salinity intrusion and cyclones.",
  },
  geography: {
    bn: "সুরমা–মেঘনা নদী ব্যবস্থার দক্ষিণাঞ্চল; মোহনার নিকটবর্তী নিম্নভূমি ও চর এলাকা। কৃষি ও মৎস্য চাষ প্রধান জীবিকা।",
    en: "Southern lowlands and char (shoal) areas near the estuarial reaches of the lower Gangetic delta; agriculture and aquaculture are the principal livelihoods.",
  },
  unions: [
    // Representative union list — to be completed and verified by the office team.
    { bn: "গালাচিপা পৌরসভা", en: "Galachipa Municipality" },
    { bn: "দশমিনা পৌরসভা", en: "Dashmina Municipality" },
  ],
  priorities: [
    {
      id: "embankment",
      title: { bn: "নদী ভাঙন ও বেড়িবাঁধ সুরক্ষা", en: "River erosion and embankment protection" },
      body: {
        bn: "টেঙরা নদী ও মেঘনার শাখাগুলোর ভাঙন রোধ এবং বেড়িবাঁধ সংস্কার — স্থানীয় মানুষের দীর্ঘদিনের প্রত্যাশা।",
        en: "Preventing erosion along the local rivers and the branches of the Meghna, and repairing embankments — a long-standing local demand.",
      },
      verification: "pending",
    },
    {
      id: "roads",
      title: { bn: "সড়ক ও সেতু যোগাযোগ", en: "Road and bridge connectivity" },
      body: {
        bn: "গ্রামীণ সড়ক, ব্রজ ও কালভার্টের সংস্কার এবং বর্ষা মৌসুমে যোগাযোগ বিচ্ছিন্ন হওয়া রোধে পদক্ষেপ।",
        en: "Upgrading rural roads, bridges and culverts, and measures to keep rural connectivity intact during monsoon.",
      },
      verification: "pending",
    },
    {
      id: "health",
      title: { bn: "স্বাস্থ্যসেবা সম্প্রসারণ", en: "Expanded healthcare access" },
      body: {
        bn: "উপজেলা স্বাস্থ্য কমপ্লেক্স ও কমিউনিটি ক্লিনিকের সেবা শক্তিশালীকরণ; মা ও শিশু স্বাস্থ্য কর্মসূচি।",
        en: "Strengthening upazila health complexes and community clinics; maternal and child health programmes.",
      },
      verification: "pending",
    },
    {
      id: "education",
      title: { bn: "শিক্ষা প্রতিষ্ঠান উন্নয়ন", en: "Education infrastructure" },
      body: {
        bn: "প্রাথমিক ও মাধ্যমিক বিদ্যালয়ের অবকাঠামো, ল্যাব সুবিধা ও শিক্ষক ঘাটতি পূরণে উদ্যোগ।",
        en: "Initiatives for primary and secondary school infrastructure, laboratories and addressing teacher shortages.",
      },
      verification: "pending",
    },
  ],
  /** Approximate centre of the constituency for the embedded map */
  mapEmbed:
    "https://www.openstreetmap.org/export/embed.html?bbox=90.05%2C22.35%2C90.75%2C22.95&layer=mapnik&marker=22.68%2C90.40",
  mapLink: "https://www.openstreetmap.org/#map=11/22.68/90.40",
  verification: "pending",
};
