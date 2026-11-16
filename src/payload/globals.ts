import type { GlobalConfig } from "payload";
import { bilingualText, bilingualArea } from "./collections/system.ts";
import { editorsAndAbove } from "./access.ts";

export const HomepageSettings: GlobalConfig = {
  slug: "homepage-settings",
  label: "Homepage settings",
  admin: { group: "Site" },
  access: { read: () => true, update: editorsAndAbove },
  fields: [
    bilingualText("heroDesignation", false, "প্রধান পরিচয় (হিরো)", "Hero designation"),
    bilingualArea("heroIntro", false, "Hero introduction paragraph"),
    bilingualArea("heroNote", false, "Hero verification note"),
    {
      name: "heroImage",
      type: "upload",
      relationTo: "media",
      label: "Hero portrait (authorised photo only)",
    },
  ],
};

export const ContactInfoGlobal: GlobalConfig = {
  slug: "contact-info",
  label: "Contact information",
  admin: {
    group: "Site",
    description: "Only verified public details may be published here.",
  },
  access: { read: () => true, update: editorsAndAbove },
  fields: [
    bilingualArea("officeAddress", false, "Office address"),
    { name: "phone", type: "text", label: "Public phone number" },
    { name: "email", type: "email", label: "Public email" },
    bilingualArea("officeHours", false, "Office hours"),
    { name: "mapEmbedUrl", type: "text", label: "Map embed URL" },
    { name: "mapLink", type: "text", label: "Map external link" },
  ],
};

export const SocialLinksGlobal: GlobalConfig = {
  slug: "social-links",
  label: "Social links",
  admin: { group: "Site" },
  access: { read: () => true, update: editorsAndAbove },
  fields: [
    {
      name: "links",
      type: "array",
      fields: [
        { name: "id", type: "text", required: true, label: "Key (e.g. facebook)" },
        { name: "label", type: "text", required: true },
        { name: "url", type: "text", required: true, label: "Verified profile URL" },
      ],
    },
  ],
};
