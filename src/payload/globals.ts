import type { GlobalConfig } from "payload";
import { bilingualText, bilingualArea } from "./collections/system.ts";
import { editorsAndAbove } from "./access.ts";

export const HomepageSettings: GlobalConfig = {
  slug: "homepage-settings",
  label: "🏠 Homepage Banner",
  admin: {
    group: "📩 Citizen & Site",
    description: "Main homepage hero title, subtitle, and intro portrait",
  },
  access: { read: () => true, update: editorsAndAbove },
  fields: [
    bilingualText("heroDesignation", false, "প্রধান পদবি বা পরিচয়", "Hero Designation"),
    bilingualArea("heroIntro", false, "ভূমিকা বা মূল বিবরণ", "Hero Introduction"),
    bilingualArea("heroNote", false, "যাচাইকরণ বার্তা / নোট", "Verification Notice"),
    {
      name: "heroImage",
      type: "upload",
      relationTo: "media",
      label: "Hero Portrait Photo",
    },
  ],
};

export const ContactInfoGlobal: GlobalConfig = {
  slug: "contact-info",
  label: "📍 Contact Info",
  admin: {
    group: "📩 Citizen & Site",
    description: "Public office address, email, phone number, and Google Map",
  },
  access: { read: () => true, update: editorsAndAbove },
  fields: [
    bilingualArea("officeAddress", false, "অফিসের ঠিকানা", "Office Address"),
    { name: "phone", type: "text", label: "Phone Number" },
    { name: "email", type: "email", label: "Email Address" },
    bilingualArea("officeHours", false, "অফিসের সময়সূচি", "Office Hours"),
    { name: "mapEmbedUrl", type: "text", label: "Google Map Embed URL" },
    { name: "mapLink", type: "text", label: "Google Map Link" },
  ],
};

export const SocialLinksGlobal: GlobalConfig = {
  slug: "social-links",
  label: "🔗 Social Links",
  admin: {
    group: "📩 Citizen & Site",
    description: "Verified Facebook, YouTube, X/Twitter, and other links",
  },
  access: { read: () => true, update: editorsAndAbove },
  fields: [
    {
      name: "links",
      type: "array",
      label: "Social Media Links",
      fields: [
        { name: "id", type: "text", required: true, label: "Platform Key (e.g. facebook, youtube)" },
        { name: "label", type: "text", required: true, label: "Display Label (e.g. Official Facebook Page)" },
        { name: "url", type: "text", required: true, label: "Profile URL" },
      ],
    },
  ],
};
