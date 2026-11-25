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
  label: "URL Slug",
  admin: {
    description: "Unique URL identifier (lowercase English with hyphens, e.g. quota-movement-speech)",
  },
};

export const News = editorialCollection({
  slug: "news",
  label: "News Article",
  labels: {
    singular: "News Article",
    plural: "📰 News Articles",
  },
  adminGroup: "📰 Content",
  description: "🔗 Updates Live Page: /news — Controls news articles on the News page & Homepage cards.",
  preview: () => "/bn/news",
  defaultColumns: ["title", "heroImage", "category", "date", "updatedAt"],
  useAsTitle: "slug",
  extraFields: [
    slugField,
    {
      name: "date",
      type: "date",
      required: true,
      label: "Date",
      admin: { date: { pickerAppearance: "dayOnly" } },
    },
    {
      name: "category",
      type: "select",
      required: true,
      label: "Category",
      options: [
        { label: "Parliament", value: "parliament" },
        { label: "Constituency (Patuakhali-3)", value: "constituency" },
        { label: "Development Initiative", value: "initiative" },
        { label: "Media & Press", value: "media" },
        { label: "Announcement & Notice", value: "announcement" },
      ],
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
      label: "Featured (Show prominently on homepage)",
    },
    bilingualText("title", true, "শিরোনাম", "Title"),
    bilingualArea("excerpt", true, "সংক্ষিপ্ত সারসংক্ষেপ", "Card Excerpt"),
    {
      name: "body",
      type: "array",
      required: true,
      minRows: 1,
      label: "Article Body Paragraphs",
      fields: [bilingualArea("paragraph", true, "অনুচ্ছেদ", "Paragraph")],
    },
    {
      name: "heroImage",
      type: "upload",
      relationTo: "media",
      required: false,
      label: "Hero Image",
    },
  ],
});

export const Speeches = editorialCollection({
  slug: "speeches",
  label: "Speech",
  labels: {
    singular: "Speech",
    plural: "🎙️ Speeches & Interviews",
  },
  adminGroup: "📰 Content",
  description: "🔗 Updates Live Page: /speeches — Speeches, video recordings, and interview archive.",
  preview: () => "/bn/speeches",
  defaultColumns: ["title", "videoUrl", "date", "updatedAt"],
  extraFields: [
    slugField,
    {
      name: "date",
      type: "date",
      required: true,
      label: "Date",
      admin: { date: { pickerAppearance: "dayOnly" } },
    },
    bilingualText("title", true, "শিরোনাম", "Speech Title"),
    bilingualText("subject", true, "মূল বিষয়", "Main Subject"),
    bilingualText("location", false, "স্থান", "Venue / Location"),
    {
      name: "videoUrl",
      type: "text",
      label: "Video URL (YouTube or Facebook video link)",
    },
    {
      name: "durationMinutes",
      type: "number",
      min: 1,
      label: "Duration (Minutes)",
    },
    {
      name: "transcript",
      type: "array",
      label: "Written Transcript Paragraphs",
      fields: [bilingualArea("paragraph", true, "অনুচ্ছেদ", "Transcript Paragraph")],
    },
  ],
});

export const Events = editorialCollection({
  slug: "events",
  label: "Event",
  labels: {
    singular: "Event",
    plural: "📅 Events & Schedule",
  },
  adminGroup: "📰 Content",
  description: "🔗 Updates Live Page: /events — Public events schedule and calendar.",
  preview: () => "/bn/events",
  defaultColumns: ["title", "location", "date", "updatedAt"],
  extraFields: [
    slugField,
    {
      name: "date",
      type: "date",
      required: true,
      label: "Start Date & Time",
      admin: { date: { pickerAppearance: "dayAndTime" } },
    },
    {
      name: "endDate",
      type: "date",
      label: "End Date & Time",
      admin: { date: { pickerAppearance: "dayAndTime" } },
    },
    bilingualText("title", true, "অনুষ্ঠানের নাম", "Event Title"),
    bilingualText("location", true, "স্থান বা ভেন্যু", "Venue / Location"),
    bilingualArea("description", true, "বিবরণ", "Description"),
    {
      name: "confirmedByOrganiser",
      type: "checkbox",
      defaultValue: false,
      label: "Confirmed by Organiser (Required before publishing)",
    },
  ],
});

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
  label: "Initiative",
  labels: {
    singular: "Initiative",
    plural: "🚀 Initiatives & Projects",
  },
  adminGroup: "📰 Content",
  description: "🔗 Updates Live Page: /initiatives — Development projects on initiatives page & homepage.",
  preview: (doc) => (doc?.slug ? `/bn/initiatives/${doc.slug}` : "/bn/initiatives"),
  defaultColumns: ["title", "status", "category", "location", "updatedAt"],
  extraFields: [
    slugField,
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "planned",
      label: "Project Status",
      options: [
        { label: "📋 Planned", value: "planned" },
        { label: "⚙️ Ongoing", value: "ongoing" },
        { label: "✅ Completed", value: "completed" },
      ],
    },
    {
      name: "category",
      type: "text",
      required: true,
      label: "Category (e.g. Infrastructure, Health, Education)",
    },
    bilingualText("location", true, "এলাকা", "Location"),
    bilingualText("title", true, "উদ্যোগের নাম", "Initiative Title"),
    bilingualArea("excerpt", true, "সংক্ষিপ্ত সারসংক্ষেপ", "Card Excerpt"),
    {
      name: "body",
      type: "array",
      required: true,
      minRows: 1,
      label: "Detailed Initiative Description",
      fields: [bilingualArea("paragraph", true, "অনুচ্ছেদ", "Paragraph")],
    },
    {
      name: "startDate",
      type: "date",
      label: "Start Date",
      admin: { date: { pickerAppearance: "dayOnly" } },
    },
    {
      name: "updates",
      type: "array",
      label: "Progress Updates",
      fields: [
        {
          name: "date",
          type: "date",
          required: true,
          label: "Update Date",
          admin: { date: { pickerAppearance: "dayOnly" } },
        },
        bilingualArea("text", true, "আপডেট বিবরণ", "Update Text"),
      ],
    },
  ],
});

export const ParliamentActivities = editorialCollection({
  slug: "parliament-activities",
  label: "Parliament Activity",
  labels: {
    singular: "Parliament Activity",
    plural: "🏛️ Parliament Activities",
  },
  adminGroup: "📰 Content",
  description: "🔗 Updates Live Page: /parliament — Speeches, Q&A, and bills on parliament page & homepage.",
  preview: (doc) => (doc?.slug ? `/bn/parliament/${doc.slug}` : "/bn/parliament"),
  defaultColumns: ["title", "category", "date", "updatedAt"],
  extraFields: [
    slugField,
    {
      name: "date",
      type: "date",
      required: true,
      label: "Date",
      admin: { date: { pickerAppearance: "dayOnly" } },
    },
    {
      name: "category",
      type: "select",
      required: true,
      label: "Activity Type",
      options: [
        { label: "🎤 Speech", value: "speech" },
        { label: "❓ Question & Answer", value: "question" },
        { label: "📜 Bill / Legislation", value: "bill" },
        { label: "👥 Standing Committee", value: "committee" },
        { label: "🏛️ Formal Responsibility", value: "responsibility" },
      ],
    },
    bilingualText("title", true, "শিরোনাম", "Activity Title"),
    bilingualArea("excerpt", true, "সংক্ষিপ্ত সারসংক্ষেপ", "Card Excerpt"),
    {
      name: "body",
      type: "array",
      required: true,
      minRows: 1,
      label: "Detailed Paragraphs",
      fields: [bilingualArea("paragraph", true, "অনুচ্ছেদ", "Paragraph")],
    },
    bilingualText("session", false, "সংসদ অধিবেশন", "Parliament Session"),
  ],
});

export const Publications = editorialCollection({
  slug: "publications",
  label: "Document",
  labels: {
    singular: "Document",
    plural: "📄 Documents & Publications",
  },
  adminGroup: "🖼️ Media & Milestones",
  description: "🔗 Downloadable manifestos, research papers, booklets, and PDFs.",
  preview: () => "/bn/publications",
  defaultColumns: ["title", "category", "date", "file", "updatedAt"],
  extraFields: [
    slugField,
    {
      name: "date",
      type: "date",
      required: true,
      label: "Publication Date",
      admin: { date: { pickerAppearance: "dayOnly" } },
    },
    bilingualText("category", true, "ধরন", "Document Category (e.g. Manifesto, Report)"),
    bilingualText("title", true, "শিরোনাম", "Document Title"),
    bilingualArea("description", true, "বিবরণ", "Description"),
    {
      name: "file",
      type: "upload",
      relationTo: "media",
      label: "PDF / Document File",
    },
    {
      name: "externalUrl",
      type: "text",
      label: "External Download URL (if hosted elsewhere)",
    },
  ],
});

export const TimelineMilestones = editorialCollection({
  slug: "timeline-milestones",
  label: "Milestone",
  labels: {
    singular: "Milestone",
    plural: "⏳ Political Milestones",
  },
  adminGroup: "🖼️ Media & Milestones",
  description: "🔗 Updates Live Page: /about — Historical timeline on the About / Profile page.",
  preview: () => "/bn/about",
  defaultColumns: ["sortOrder", "dateLabel", "title", "updatedAt"],
  useAsTitle: "slug",
  extraFields: [
    slugField,
    bilingualText("dateLabel", true, "সময়কাল বা সাল", "Year / Date Label (e.g. 2018, March 2019, 2024)"),
    {
      name: "sortOrder",
      type: "number",
      required: true,
      defaultValue: 0,
      label: "Sort Order (Low to high, e.g. 1, 2, 3)",
    },
    bilingualText("title", true, "মাইলফলকের নাম", "Milestone Title"),
    bilingualArea("body", true, "বিবরণ", "Milestone Description"),
  ],
});

export const Media: CollectionConfig = {
  slug: "media",
  labels: {
    singular: "Photo",
    plural: "🖼️ Photo Gallery",
  },
  upload: {
    staticDir: path.resolve(dirname, "../../media"),
    mimeTypes: ["image/jpeg", "image/png", "image/webp", "image/avif", "application/pdf"],
  },
  admin: {
    group: "🖼️ Media & Milestones",
    description: "🔗 Updates Live Page: /media — Photo gallery page and homepage photo carousel (Cloudinary CDN).",
    useAsTitle: "altEn",
    preview: () => "/bn/media",
    defaultColumns: ["filename", "altEn", "altBn", "updatedAt"],
  },
  access: {
    read: () => true,
    create: editorsAndAbove,
    update: editorsAndAbove,
    delete: superAdminOnly,
  },
  fields: [
    {
      name: "altEn",
      type: "text",
      required: true,
      label: "Image Alt Text (English)",
    },
    {
      name: "altBn",
      type: "text",
      required: true,
      label: "ছবির বর্ণনা (Bangla Alt Text)",
    },
    bilingualArea("caption", false, "ক্যাপশন", "Caption"),
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
  admin: { group: "📩 Citizen & Site", hidden: true },
  access: {
    read: serviceOperatorsAndAbove,
    create: () => false,
    update: () => false,
    delete: superAdminOnly,
  },
  fields: [
    { name: "note", type: "text", label: "Internal Attachment Note" },
  ],
};

/** Citizen requests — the public never gets direct access. */
export const CitizenRequests: CollectionConfig = {
  slug: "citizen-requests",
  labels: {
    singular: "Citizen Request",
    plural: "📩 Citizen Requests",
  },
  admin: {
    group: "📩 Citizen & Site",
    useAsTitle: "ref",
    defaultColumns: ["ref", "name", "category", "status", "createdAt"],
    description: "🔗 Citizen requests submitted from /services — Trackable by reference ID at /services/track.",
    preview: (doc) => (doc?.ref ? `/bn/services/track?ref=${doc.ref}` : "/bn/services"),
  },
  access: {
    read: serviceOperatorsAndAbove,
    create: () => false,
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
      label: "Tracking Reference ID",
      admin: { readOnly: true },
    },
    {
      name: "name",
      type: "text",
      required: true,
      label: "Citizen Name",
      admin: { readOnly: true },
    },
    {
      name: "phone",
      type: "text",
      required: true,
      label: "Phone Number",
      admin: { readOnly: true },
    },
    {
      name: "union",
      type: "text",
      label: "Union / Area",
      admin: { readOnly: true },
    },
    {
      name: "category",
      type: "select",
      required: true,
      label: "Category",
      options: [
        { label: "General Request", value: "general" },
        { label: "Constituency Matter", value: "constituency" },
        { label: "Development Project", value: "development" },
        { label: "Public Service", value: "service" },
        { label: "Grievance / Issue", value: "grievance" },
        { label: "General Contact", value: "contact" },
      ],
      admin: { readOnly: true },
    },
    {
      name: "subject",
      type: "text",
      required: true,
      label: "Subject",
      admin: { readOnly: true },
    },
    {
      name: "description",
      type: "textarea",
      required: true,
      label: "Description",
      admin: { readOnly: true },
    },
    {
      name: "attachment",
      type: "upload",
      relationTo: "citizen-request-attachments",
      label: "Attachment",
      admin: { readOnly: true },
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "received",
      label: "Processing Status",
      options: [
        { label: "📥 Received", value: "received" },
        { label: "🔍 Under Review", value: "underReview" },
        { label: "📤 Referred", value: "referred" },
        { label: "✅ Closed / Resolved", value: "closed" },
      ],
      access: { update: serviceOperatorField },
    },
    {
      name: "statusHistory",
      type: "array",
      label: "Status History",
      admin: { readOnly: true },
      fields: [
        { name: "status", type: "text", required: true, label: "Status" },
        { name: "at", type: "date", required: true, label: "Timestamp" },
      ],
    },
    {
      name: "internalNote",
      type: "textarea",
      label: "Private Internal Note",
      admin: { description: "Private office note — never visible to the citizen or public." },
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
