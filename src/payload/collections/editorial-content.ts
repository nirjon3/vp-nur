import type { CollectionConfig, CollectionBeforeChangeHook } from "payload";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { editorialCollection } from "./editorial.ts";
import { bilingualText, bilingualArea, verificationGroup, workflowGroup } from "./system.ts";
import {
  editorsAndAbove,
  serviceOperatorsAndAbove,
  superAdminOnly,
  serviceOperatorField,
} from "../access.ts";

const dirname = path.dirname(fileURLToPath(import.meta.url));

const slugField = {
  name: "slug",
  type: "text" as const,
  required: true,
  unique: true,
  index: true,
  label: "ওয়েব লিংক আইডি (URL Slug)",
  admin: {
    description: "ইউআরএল তৈরির জন্য ইংরেজি ছোট হাতের অক্ষরে হাইফেন দিয়ে লিখুন (যেমন: quota-movement-speech)",
  },
};

export const News = editorialCollection({
  slug: "news",
  label: "সংবাদ ও প্রেস রিলিজ",
  labels: {
    singular: "সংবাদ বা প্রেস রিলিজ",
    plural: "সংবাদ ও প্রেস রিলিজ (News & Press)",
  },
  adminGroup: "১. প্রধান কার্যক্রম ও সংবাদ (Content & News)",
  description: "ওয়েবসাইটের নিউজ সেকশনের সকল সংবাদ, প্রেস রিলিজ ও বিবৃতি এখান থেকে যোগ বা সম্পাদনা করুন।",
  useAsTitle: "slug",
  extraFields: [
    slugField,
    {
      name: "date",
      type: "date",
      required: true,
      label: "সংবাদের তারিখ (Date)",
      admin: { date: { pickerAppearance: "dayOnly" } },
    },
    {
      name: "category",
      type: "select",
      required: true,
      label: "সংবাদের বিভাগ (Category)",
      options: [
        { label: "সংসদীয় সংবাদ (Parliament)", value: "parliament" },
        { label: "এলাকার খবর / পটুয়াখালী-৩ (Constituency)", value: "constituency" },
        { label: "উন্নয়নমূলক উদ্যোগ (Initiative)", value: "initiative" },
        { label: "গণমাধ্যম ও প্রেস রিলিজ (Media)", value: "media" },
        { label: "জরুরি নোটিশ / ঘোষণা (Announcement)", value: "announcement" },
      ],
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
      label: "গুরুত্বপূর্ণ বা ফিচার্ড সংবাদ (ওয়েবসাইটের প্রথমে বড় করে দেখাবে)",
    },
    bilingualText("title", true, "সংবাদের মূল শিরোনাম", "News Title"),
    bilingualArea("excerpt", true, "সংক্ষিপ্ত সারসংক্ষেপ (কার্ডের জন্য)", "Card Excerpt"),
    {
      name: "body",
      type: "array",
      required: true,
      minRows: 1,
      label: "সংবাদের বিস্তারিত অনুচ্ছেদসমূহ (News Body Paragraphs)",
      fields: [bilingualArea("paragraph", true, "অনুচ্ছেদ", "Paragraph")],
    },
    {
      name: "heroImage",
      type: "upload",
      relationTo: "media",
      required: false,
      label: "সংবাদের প্রধান ছবি (Hero Image)",
    },
  ],
});

export const Speeches = editorialCollection({
  slug: "speeches",
  label: "বক্তব্য ও সাক্ষাৎকার",
  labels: {
    singular: "বক্তব্য ও সাক্ষাৎকার",
    plural: "বক্তৃতা ও সাক্ষাৎকার (Speeches & Interviews)",
  },
  adminGroup: "১. প্রধান কার্যক্রম ও সংবাদ (Content & News)",
  description: "ভিপি নুরের বিভিন্ন সভা, সমাবেশ, সংসদ ও টিভি চ্যানেলের বক্তব্য, ভিডিও ও সাক্ষাৎকার যোগ করুন।",
  extraFields: [
    slugField,
    {
      name: "date",
      type: "date",
      required: true,
      label: "বক্তব্যের তারিখ (Date)",
      admin: { date: { pickerAppearance: "dayOnly" } },
    },
    bilingualText("title", true, "বক্তব্যের শিরোনাম", "Speech Title"),
    bilingualText("subject", true, "মূল বিষয়বস্তু", "Subject"),
    bilingualText("location", false, "বক্তব্যের স্থান বা মঞ্চ", "Location / Venue"),
    {
      name: "videoUrl",
      type: "text",
      label: "ভিডিও লিংক (YouTube বা Facebook ভিডিও লিঙ্ক)",
      admin: { description: "ইউটিউব বা ফেসবুকের সম্পূর্ণ ভিডিও লিঙ্ক দিন" },
    },
    {
      name: "durationMinutes",
      type: "number",
      min: 1,
      label: "বক্তব্যের দৈর্ঘ্য (মিনিট)",
    },
    {
      name: "transcript",
      type: "array",
      label: "বক্তব্যের লিখিত রূপ (Transcript Paragraphs)",
      fields: [bilingualArea("paragraph", true, "লিখিত অনুচ্ছেদ", "Transcript paragraph")],
    },
  ],
});

export const Events = editorialCollection({
  slug: "events",
  label: "গণসংযোগ ও অনুষ্ঠান",
  labels: {
    singular: "অনুষ্ঠান বা কর্মসূচি",
    plural: "গণসংযোগ ও কর্মসূচি (Public Events)",
  },
  adminGroup: "১. প্রধান কার্যক্রম ও সংবাদ (Content & News)",
  description: "আসন্ন ও সাম্প্রতিক রাজনৈতিক সমাবেশ, জনসংযোগ সফর ও কর্মসূচির সময়সূচি ও ভেন্যু নির্ধারণ করুন।",
  extraFields: [
    slugField,
    {
      name: "date",
      type: "date",
      required: true,
      label: "অনুষ্ঠানের শুরুর তারিখ ও সময় (Start Date & Time)",
      admin: { date: { pickerAppearance: "dayAndTime" } },
    },
    {
      name: "endDate",
      type: "date",
      label: "অনুষ্ঠানের সমাপ্তি তারিখ ও সময় (End Date & Time)",
      admin: { date: { pickerAppearance: "dayAndTime" } },
    },
    bilingualText("title", true, "অনুষ্ঠানের নাম ও শিরোনাম", "Event Title"),
    bilingualText("location", true, "স্থান ও ভেন্যুর নাম", "Location / Venue"),
    bilingualArea("description", true, "অনুষ্ঠানের বিস্তারিত বিবরণ", "Event Description"),
    {
      name: "confirmedByOrganiser",
      type: "checkbox",
      defaultValue: false,
      label: "আয়োজক কর্তৃক তারিখ ও স্থান নিশ্চিত করা হয়েছে (Confirmed by Organiser)",
      admin: { description: "টিক চিহ্ন না দিলে এটি ওয়েবসাইটে প্রকাশিত হবে না।" },
    },
  ],
});

// Additional guard: an event may not be published unless the organiser confirmed it
const confirmEventBeforeChange: CollectionBeforeChangeHook = ({ data }) => {
  const d = data as { confirmedByOrganiser?: boolean; workflow?: { status?: string } } | undefined;
  if (d?.workflow?.status === "published" && d.confirmedByOrganiser !== true) {
    throw new Error("An event may be published only after confirmation by the organiser.");
  }
  return data;
};
Events.hooks = {
  ...Events.hooks,
  beforeChange: [
    confirmEventBeforeChange,
    ...((Events.hooks?.beforeChange as CollectionBeforeChangeHook[] | undefined) ?? []),
  ],
};

export const Initiatives = editorialCollection({
  slug: "initiatives",
  label: "উন্নয়নমূলক উদ্যোগ ও প্রকল্প",
  labels: {
    singular: "উন্নয়ন উদ্যোগ",
    plural: "উন্নয়নমূলক উদ্যোগ ও প্রকল্প (Initiatives)",
  },
  adminGroup: "১. প্রধান কার্যক্রম ও সংবাদ (Content & News)",
  description: "পটুয়াখালী-৩ ও সারাদেশের রাস্তাঘাট, ব্রিজ, শিক্ষা ও স্বাস্থ্য সংক্রান্ত উন্নয়নমূলক প্রকল্পের বিবরণ।",
  extraFields: [
    slugField,
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "planned",
      label: "প্রকল্পের বর্তমান অগ্রগতি (Status)",
      options: [
        { label: "পরিকল্পিত (Planned)", value: "planned" },
        { label: "চলমান কাজ (Ongoing)", value: "ongoing" },
        { label: "সম্পন্ন হয়েছে (Completed)", value: "completed" },
      ],
    },
    {
      name: "category",
      type: "text",
      required: true,
      label: "উদ্যোগের ধরন (Category)",
      admin: { description: "যেমন: অবকাঠামো, স্বাস্থ্যসেবা, যুব কর্মসংস্থান, শিক্ষা ইত্যাদি" },
    },
    bilingualText("location", true, "এলাকা বা স্থান", "Location"),
    bilingualText("title", true, "উদ্যোগের নাম ও শিরোনাম", "Initiative Title"),
    bilingualArea("excerpt", true, "সংক্ষিপ্ত সারসংক্ষেপ", "Card Excerpt"),
    {
      name: "body",
      type: "array",
      required: true,
      minRows: 1,
      label: "উদ্যোগের পূর্ণাঙ্গ বিবরণ (Initiative Details)",
      fields: [bilingualArea("paragraph", true, "অনুচ্ছেদ", "Paragraph")],
    },
    {
      name: "startDate",
      type: "date",
      label: "কাজের শুরুর তারিখ (Start Date)",
      admin: { date: { pickerAppearance: "dayOnly" } },
    },
    {
      name: "updates",
      type: "array",
      label: "অগ্রগতির সাম্প্রতিক আপডেটসমূহ (Progress Updates)",
      fields: [
        {
          name: "date",
          type: "date",
          required: true,
          label: "আপডেটের তারিখ",
          admin: { date: { pickerAppearance: "dayOnly" } },
        },
        bilingualArea("text", true, "অগ্রগতির বিবরণ", "Update text"),
      ],
    },
  ],
});

export const ParliamentActivities = editorialCollection({
  slug: "parliament-activities",
  label: "সংসদীয় কার্যক্রম",
  labels: {
    singular: "সংসদীয় কার্যক্রম",
    plural: "সংসদীয় কার্যক্রমসমূহ (Parliament Activities)",
  },
  adminGroup: "১. প্রধান কার্যক্রম ও সংবাদ (Content & News)",
  description: "জাতীয় সংসদে উত্থাপিত দাবি, বক্তব্য, জনগুরুত্বপূর্ণ প্রশ্ন-উত্তর ও বিলের রেকর্ড।",
  extraFields: [
    slugField,
    {
      name: "date",
      type: "date",
      required: true,
      label: "তারিখ (Date)",
      admin: { date: { pickerAppearance: "dayOnly" } },
    },
    {
      name: "category",
      type: "select",
      required: true,
      label: "কার্যক্রমের ধরন (Type)",
      options: [
        { label: "সংসদে বক্তব্য (Speech)", value: "speech" },
        { label: "প্রশ্ন ও উত্তর (Question & Answer)", value: "question" },
        { label: "আইন বা বিল উত্থাপন (Bill)", value: "bill" },
        { label: "সংসদীয় স্থায়ী কমিটি (Standing Committee)", value: "committee" },
        { label: "আনুষ্ঠানিক সংসদীয় দায়িত্ব (Formal Responsibility)", value: "responsibility" },
      ],
    },
    bilingualText("title", true, "কার্যক্রমের শিরোনাম", "Activity Title"),
    bilingualArea("excerpt", true, "সংক্ষিপ্ত সারসংক্ষেপ", "Card Excerpt"),
    {
      name: "body",
      type: "array",
      required: true,
      minRows: 1,
      label: "বিস্তারিত বিবরণ ও বক্তব্যের অংশ",
      fields: [bilingualArea("paragraph", true, "অনুচ্ছেদ", "Paragraph")],
    },
    bilingualText("session", false, "সংসদের অধিবেশন নম্বর বা নাম", "Parliament Session"),
  ],
});

export const Publications = editorialCollection({
  slug: "publications",
  label: "প্রকাশনা ও নথিপত্র",
  labels: {
    singular: "প্রকাশনা বা নথি",
    plural: "প্রকাশনা ও নথিপত্র (Publications & Docs)",
  },
  adminGroup: "২. মিডিয়া ও রাজনৈতিক জীবন (Media & Archive)",
  description: "নির্বাচনী ইশতেহার, দলীয় বুকলেট, গবেষণা ও আইনি নথিপত্রের ডাউনলোডযোগ্য কপি।",
  extraFields: [
    slugField,
    {
      name: "date",
      type: "date",
      required: true,
      label: "প্রকাশনার তারিখ (Date)",
      admin: { date: { pickerAppearance: "dayOnly" } },
    },
    bilingualText("category", true, "নথির ধরন", "Document Category (যেমন: ইশতেহার, রিপোর্ট)"),
    bilingualText("title", true, "প্রকাশনার শিরোনাম", "Publication Title"),
    bilingualArea("description", true, "প্রকাশনার পরিচিতি ও বিবরণ", "Description"),
    {
      name: "file",
      type: "upload",
      relationTo: "media",
      label: "পিডিএফ বা ফাইল আপলোড (PDF File)",
    },
    {
      name: "externalUrl",
      type: "text",
      label: "অথবা বাইরের ওয়েব লিংক (External Download URL)",
    },
  ],
});

export const TimelineMilestones = editorialCollection({
  slug: "timeline-milestones",
  label: "জীবন ও মাইলফলক",
  labels: {
    singular: "মাইলফলক ঘটনা",
    plural: "জীবন ও রাজনৈতিক মাইলফলক (Milestones)",
  },
  adminGroup: "২. মিডিয়া ও রাজনৈতিক জীবন (Media & Archive)",
  description: "ভিপি নুরের জীবনী ও রাজনৈতিক উত্থানের প্রধান প্রধান ঘটনা (কোটা আন্দোলন, ডাকসু, জুলাই অভ্যুত্থান)।",
  useAsTitle: "slug",
  extraFields: [
    slugField,
    bilingualText("dateLabel", true, "সময়কাল বা সাল", "Date label (যেমন: ২০১৮, মার্চ ২০১৯, ২০২৪)"),
    {
      name: "sortOrder",
      type: "number",
      required: true,
      defaultValue: 0,
      label: "ক্রম নম্বর (ছোট থেকে বড় ক্রমে সাজানো হবে, যেমন: ১, ২, ৩)",
    },
    bilingualText("title", true, "ঘটনা বা মাইলফলকের শিরোনাম", "Milestone Title"),
    bilingualArea("body", true, "ঘটনার বিস্তারিত বিবরণ", "Milestone Details"),
  ],
});

export const Media: CollectionConfig = {
  slug: "media",
  labels: {
    singular: "ছবি বা মিডিয়া (Photo)",
    plural: "ছবি ও ফটো গ্যালারি (Photos & Gallery)",
  },
  upload: {
    staticDir: path.resolve(dirname, "../../media"),
    mimeTypes: ["image/jpeg", "image/png", "image/webp", "image/avif", "application/pdf"],
  },
  admin: {
    group: "২. মিডিয়া ও রাজনৈতিক জীবন (Media & Archive)",
    description: "ওয়েবসাইটের ফটো গ্যালারি ও বিভিন্ন নিউজের জন্য ছবি আপলোড (Cloudinary CDN-এ সংরক্ষিত হয়)।",
    useAsTitle: "altBn",
  },
  access: {
    read: () => true,
    create: editorsAndAbove,
    update: editorsAndAbove,
    delete: superAdminOnly,
  },
  fields: [
    {
      name: "altBn",
      type: "text",
      required: true,
      label: "ছবির বর্ণনা (বাংলায়, যেমন: জাতীয় সংসদে বক্তব্যরত ভিপি নুর)",
    },
    {
      name: "altEn",
      type: "text",
      required: true,
      label: "Image Description (English Alt Text)",
    },
    bilingualArea("caption", false, "ছবির ক্যাপশন বা পাদটীকা", "Caption"),
    verificationGroup,
  ],
};

/** Private citizen request attachments — never publicly readable. */
export const CitizenRequestAttachments: CollectionConfig = {
  slug: "citizen-request-attachments",
  upload: {
    staticDir: path.resolve(dirname, "../../media/private"),
    mimeTypes: [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "image/webp",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ],
  },
  admin: { group: "৩. নাগরিক সেবা ও যোগাযোগ (Citizen Services)", hidden: true },
  access: {
    read: serviceOperatorsAndAbove,
    create: () => false, // created only by the intake API via local API
    update: () => false,
    delete: superAdminOnly,
  },
  fields: [
    { name: "note", type: "text", label: "অভ্যন্তরীণ নোট (Internal Note)" },
  ],
};

/** Citizen requests — the public never gets direct access. */
export const CitizenRequests: CollectionConfig = {
  slug: "citizen-requests",
  labels: {
    singular: "নাগরিক আবেদন (Citizen Request)",
    plural: "নাগরিক আবেদন ও অভিযোগ (Citizen Requests)",
  },
  admin: {
    group: "৩. নাগরিক সেবা ও যোগাযোগ (Citizen Services)",
    useAsTitle: "ref",
    defaultColumns: ["ref", "name", "category", "status", "createdAt"],
    description: "ওয়েবসাইট থেকে সাধারণ নাগরিকদের পাঠানো বিভিন্ন সমস্যার আবেদন, অভিযোগ ও ট্র্যাকিং কোড।",
  },
  access: {
    read: serviceOperatorsAndAbove,
    create: () => false, // intake only via /api/requests (local API)
    update: serviceOperatorsAndAbove,
    delete: superAdminOnly,
  },
  timestamps: true,
  fields: [
    {
      name: "ref",
      type: "text",
      required: true,
      unique: true,
      index: true,
      label: "ট্র্যাকিং রেফারেন্স নম্বর (Tracking ID)",
      admin: { readOnly: true },
    },
    {
      name: "name",
      type: "text",
      required: true,
      label: "আবেদনকারীর নাম",
      admin: { readOnly: true },
    },
    {
      name: "phone",
      type: "text",
      required: true,
      label: "আবেদনকারীর মোবাইল নম্বর",
      admin: { readOnly: true },
    },
    {
      name: "union",
      type: "text",
      label: "ইউনিয়ন / এলাকা",
      admin: { readOnly: true },
    },
    {
      name: "category",
      type: "select",
      required: true,
      label: "আবেদনের বিষয়শ্রেণী",
      options: [
        { label: "সাধারণ আবেদন (General request)", value: "general" },
        { label: "এলাকার সমস্যা ও দাবি (Constituency matter)", value: "constituency" },
        { label: "উন্নয়ন প্রকল্প সংক্রান্ত (Development project)", value: "development" },
        { label: "সরকারি সেবা সংক্রান্ত (Public service matter)", value: "service" },
        { label: "অভিযোগ ও প্রত্যাশা (Grievance / expectation)", value: "grievance" },
        { label: "যোগাযোগ ও মতবিনিময় (General contact)", value: "contact" },
      ],
      admin: { readOnly: true },
    },
    {
      name: "subject",
      type: "text",
      required: true,
      label: "আবেদনের বিষয়",
      admin: { readOnly: true },
    },
    {
      name: "description",
      type: "textarea",
      required: true,
      label: "আবেদনের বিস্তারিত বিবরণ",
      admin: { readOnly: true },
    },
    {
      name: "attachment",
      type: "upload",
      relationTo: "citizen-request-attachments",
      label: "সংযুক্ত ফাইল বা ছবি",
      admin: { readOnly: true },
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "received",
      label: "বর্তমান অবস্থা (Status)",
      options: [
        { label: "গৃহীত (Received) — নতুন আবেদন জমা হয়েছে", value: "received" },
        { label: "বিবেচনাধীন (Under review) — যাচাই বাছাই চলছে", value: "underReview" },
        { label: "সংশ্লিষ্ট দপ্তরে প্রেরিত (Referred) — প্রক্রিয়াধীন", value: "referred" },
        { label: "নিষ্পত্তি সম্পন্ন (Closed) — সমাধান সম্পন্ন", value: "closed" },
      ],
      access: { update: serviceOperatorField },
    },
    {
      name: "statusHistory",
      type: "array",
      label: "অগ্রগতির ইতিহাস (Status History)",
      admin: { readOnly: true },
      fields: [
        { name: "status", type: "text", required: true, label: "স্ট্যাটাস" },
        { name: "at", type: "date", required: true, label: "তারিখ ও সময়" },
      ],
    },
    {
      name: "internalNote",
      type: "textarea",
      label: "অভ্যন্তরীণ অফিস নোট (Private Internal Note)",
      admin: { description: "অফিসের নিজস্ব মন্তব্য — এটি আবেদনকারী বা সাধারণ মানুষ দেখতে পাবে না।" },
    },
  ],
  hooks: {
    beforeChange: [
      ({ data, originalDoc }: Parameters<CollectionBeforeChangeHook>[0]) => {
        const d = data as { status?: string; statusHistory?: { status: string; at: string }[] };
        const doc = originalDoc as
          | { status?: string; statusHistory?: { status: string; at: string }[] }
          | undefined;
        if (d?.status && doc?.status && d.status !== doc.status) {
          d.statusHistory = [
            ...(doc.statusHistory ?? []),
            { status: d.status, at: new Date().toISOString() },
          ];
        }
        return data;
      },
    ],
    afterChange: [
      async ({ req, doc, operation }) => {
        if (operation !== "update") return doc;
        try {
          await req.payload.create({
            collection: "audit-logs",
            data: {
              summary: `citizen-requests ${operation}`,
              collection: "citizen-requests",
              documentId: String(doc.id),
              action: "update",
              actor: (req.user as { email?: string } | null | undefined)?.email ?? "system",
            },
            overrideAccess: true,
          });
        } catch {
          // audit failure must not break the operator workflow
        }
        return doc;
      },
    ],
  },
};

export const allEditorialCollections = [
  News,
  Speeches,
  Events,
  Initiatives,
  ParliamentActivities,
  Publications,
  TimelineMilestones,
  Media,
  CitizenRequestAttachments,
  CitizenRequests,
];

export { verificationGroup, workflowGroup };
