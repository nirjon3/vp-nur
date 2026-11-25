import type { GlobalConfig } from "payload";
import { bilingualText, bilingualArea } from "./collections/system.ts";
import { editorsAndAbove } from "./access.ts";

export const HomepageSettings: GlobalConfig = {
  slug: "homepage-settings",
  label: "হোমপেজ ব্যানার ও প্রধান পরিচয়",
  admin: {
    group: "৩. নাগরিক সেবা ও যোগাযোগ (Citizen Services)",
    description: "ওয়েবসাইটের মূল হোমপেজের প্রধান শিরোনাম, পরিচয় ও ছবি এখান থেকে পরিবর্তন করতে পারেন।",
  },
  access: { read: () => true, update: editorsAndAbove },
  fields: [
    bilingualText("heroDesignation", false, "প্রধান পদবি বা পরিচয়", "Hero designation"),
    bilingualArea("heroIntro", false, "হোমপেজের ভূমিকা বা সারসংক্ষেপ", "Hero introduction paragraph"),
    bilingualArea("heroNote", false, "যাচাইকরণ নোট / সতর্কবার্তা", "Hero verification note"),
    {
      name: "heroImage",
      type: "upload",
      relationTo: "media",
      label: "মূল প্রতিকৃতি বা পোর্ট্রেট ছবি (Hero Portrait Photo)",
    },
  ],
};

export const ContactInfoGlobal: GlobalConfig = {
  slug: "contact-info",
  label: "অফিস ও যোগাযোগের ঠিকানা",
  admin: {
    group: "৩. নাগরিক সেবা ও যোগাযোগ (Citizen Services)",
    description: "নাগরিক ও শুভানুধ্যায়ীদের যোগাযোগের জন্য অফিস ঠিকানা, ফোন, ইমেইল ও গুগল ম্যাপ লিঙ্ক।",
  },
  access: { read: () => true, update: editorsAndAbove },
  fields: [
    bilingualArea("officeAddress", false, "অফিসের পূর্ণ ঠিকানা", "Office address"),
    { name: "phone", type: "text", label: "পাবলিক ফোন নম্বর (Phone Number)" },
    { name: "email", type: "email", label: "পাবলিক ইমেইল ঠিকানা (Email Address)" },
    bilingualArea("officeHours", false, "সাক্ষাৎ বা অফিসের সময়সূচি", "Office hours"),
    { name: "mapEmbedUrl", type: "text", label: "গুগল ম্যাপ এমবেড ইউআরএল (Map Embed URL)" },
    { name: "mapLink", type: "text", label: "গুগল ম্যাপ সরাসরি লিংক (Map External Link)" },
  ],
};

export const SocialLinksGlobal: GlobalConfig = {
  slug: "social-links",
  label: "সোশ্যাল মিডিয়া প্রোফাইল লিংক",
  admin: {
    group: "৩. নাগরিক সেবা ও যোগাযোগ (Citizen Services)",
    description: "ভিপি নুরের ভেরিফাইড ফেসবুক পেজ, ইউটিউব চ্যানেল, এক্স (টুইটার) ইত্যাদির লিঙ্ক।",
  },
  access: { read: () => true, update: editorsAndAbove },
  fields: [
    {
      name: "links",
      type: "array",
      label: "সোশ্যাল মিডিয়া লিংক তালিকা (Social Links List)",
      fields: [
        { name: "id", type: "text", required: true, label: "চিহ্ন / কী (যেমন: facebook, youtube, twitter)" },
        { name: "label", type: "text", required: true, label: "প্রদর্শনের নাম (Label, যেমন: অফিসিয়াল ফেসবুক পেজ)" },
        { name: "url", type: "text", required: true, label: "ভেরিফাইড প্রোফাইল লিংক (URL)" },
      ],
    },
  ],
};
