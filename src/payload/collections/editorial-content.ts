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

const slugField = { name: "slug", type: "text" as const, required: true, unique: true, index: true, label: "URL slug" };

export const News = editorialCollection({
  slug: "news",
  label: "News article",
  adminGroup: "Editorial",
  useAsTitle: "slug",
  extraFields: [
    slugField,
    { name: "date", type: "date", required: true, admin: { date: { pickerAppearance: "dayOnly" } } },
    {
      name: "category",
      type: "select",
      required: true,
      options: [
        { label: "Parliament", value: "parliament" },
        { label: "Constituency", value: "constituency" },
        { label: "Initiative", value: "initiative" },
        { label: "Media", value: "media" },
        { label: "Announcement", value: "announcement" },
      ],
    },
    { name: "featured", type: "checkbox", defaultValue: false },
    bilingualText("title", true, "শিরোনাম", "Title"),
    bilingualArea("excerpt", true, "Card excerpt"),
    {
      name: "body",
      type: "array",
      required: true,
      minRows: 1,
      fields: [bilingualArea("paragraph", true, "Paragraph")],
    },
    {
      name: "heroImage",
      type: "upload",
      relationTo: "media",
      required: false,
    },
  ],
});

export const Speeches = editorialCollection({
  slug: "speeches",
  label: "Speech & Interview",
  labels: {
    singular: "Speech & Interview (বক্তৃতা ও সাক্ষাৎকার)",
    plural: "Speeches & Interviews (বক্তৃতা ও সাক্ষাৎকার)",
  },
  adminGroup: "Editorial",
  extraFields: [
    slugField,
    { name: "date", type: "date", required: true, admin: { date: { pickerAppearance: "dayOnly" } } },
    bilingualText("title", true, "শিরোনাম", "Title"),
    bilingualText("subject", true, "বিষয়", "Subject"),
    bilingualText("location", false, "স্থান", "Location"),
    { name: "videoUrl", type: "text", label: "Video URL (verified recording only)" },
    { name: "durationMinutes", type: "number", min: 1, label: "Duration (minutes)" },
    {
      name: "transcript",
      type: "array",
      fields: [bilingualArea("paragraph", true, "Transcript paragraph")],
    },
  ],
});

export const Events = editorialCollection({
  slug: "events",
  label: "Public Event",
  labels: {
    singular: "Public Event (অনুষ্ঠান)",
    plural: "Public Events (অনুষ্ঠানসমূহ)",
  },
  adminGroup: "Editorial",
  extraFields: [
    slugField,
    { name: "date", type: "date", required: true, admin: { date: { pickerAppearance: "dayAndTime" } } },
    { name: "endDate", type: "date", admin: { date: { pickerAppearance: "dayAndTime" } } },
    bilingualText("title", true, "অনুষ্ঠানের শিরোনাম", "Event title"),
    bilingualText("location", true, "স্থান", "Location"),
    bilingualArea("description", true, "Description"),
    {
      name: "confirmedByOrganiser",
      type: "checkbox",
      defaultValue: false,
      label: "Date, time and venue confirmed by the organising authority",
      admin: { description: "Required before this event can be published." },
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
  label: "Initiative",
  labels: {
    singular: "Initiative (উন্নয়ন উদ্যোগ)",
    plural: "Initiatives (উন্নয়ন উদ্যোগসমূহ)",
  },
  adminGroup: "Editorial",
  extraFields: [
    slugField,
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "planned",
      options: [
        { label: "Planned", value: "planned" },
        { label: "Ongoing", value: "ongoing" },
        { label: "Completed", value: "completed" },
      ],
    },
    { name: "category", type: "text", required: true, label: "Category (e.g. Infrastructure, Health, Education)" },
    bilingualText("location", true, "স্থান", "Location"),
    bilingualText("title", true, "শিরোনাম", "Title"),
    bilingualArea("excerpt", true, "Card excerpt"),
    {
      name: "body",
      type: "array",
      required: true,
      minRows: 1,
      fields: [bilingualArea("paragraph", true, "Paragraph")],
    },
    { name: "startDate", type: "date", admin: { date: { pickerAppearance: "dayOnly" } } },
    {
      name: "updates",
      type: "array",
      fields: [
        { name: "date", type: "date", required: true, admin: { date: { pickerAppearance: "dayOnly" } } },
        bilingualArea("text", true, "Update"),
      ],
    },
  ],
});

export const ParliamentActivities = editorialCollection({
  slug: "parliament-activities",
  label: "Parliament activity",
  labels: {
    singular: "Parliament Activity (সংসদীয় কার্যক্রম)",
    plural: "Parliament Activities (সংসদীয় কার্যক্রম)",
  },
  adminGroup: "Editorial",
  extraFields: [
    slugField,
    { name: "date", type: "date", required: true, admin: { date: { pickerAppearance: "dayOnly" } } },
    {
      name: "category",
      type: "select",
      required: true,
      options: [
        { label: "Speech", value: "speech" },
        { label: "Question & answer", value: "question" },
        { label: "Bill", value: "bill" },
        { label: "Committee", value: "committee" },
        { label: "Formal responsibility", value: "responsibility" },
      ],
    },
    bilingualText("title", true, "শিরোনাম", "Title"),
    bilingualArea("excerpt", true, "Card excerpt"),
    {
      name: "body",
      type: "array",
      required: true,
      minRows: 1,
      fields: [bilingualArea("paragraph", true, "Paragraph")],
    },
    bilingualText("session", false, "অধিবেশন", "Session"),
  ],
});

export const Publications = editorialCollection({
  slug: "publications",
  label: "Publication / document",
  adminGroup: "Editorial",
  extraFields: [
    slugField,
    { name: "date", type: "date", required: true, admin: { date: { pickerAppearance: "dayOnly" } } },
    bilingualText("category", true, "বিভাগ", "Category"),
    bilingualText("title", true, "শিরোনাম", "Title"),
    bilingualArea("description", true, "Description"),
    { name: "file", type: "upload", relationTo: "media" },
    { name: "externalUrl", type: "text", label: "External document URL (if not uploaded)" },
  ],
});

export const TimelineMilestones = editorialCollection({
  slug: "timeline-milestones",
  label: "Timeline milestone",
  labels: {
    singular: "Timeline Milestone (জীবন ও সংগ্রাম)",
    plural: "Timeline Milestones (জীবন ও সংগ্রাম)",
  },
  adminGroup: "About",
  useAsTitle: "slug",
  extraFields: [
    slugField,
    bilingualText("dateLabel", true, "তারিখ-লেবেল (যেকোনো নির্ভুলতা)", "Date label (any precision)"),
    { name: "sortOrder", type: "number", required: true, defaultValue: 0 },
    bilingualText("title", true, "শিরোনাম", "Title"),
    bilingualArea("body", true, "Description"),
  ],
});

export const Media: CollectionConfig = {
  slug: "media",
  labels: {
    singular: "Media & Photo (ছবি ও মিডিয়া)",
    plural: "Media & Gallery (ছবি ও গ্যালারি)",
  },
  upload: {
    staticDir: path.resolve(dirname, "../../media"),
    mimeTypes: ["image/jpeg", "image/png", "image/webp", "image/avif", "application/pdf"],
  },
  admin: { group: "Editorial", useAsTitle: "altEn" },
  access: {
    read: () => true,
    create: editorsAndAbove,
    update: editorsAndAbove,
    delete: superAdminOnly,
  },
  fields: [
    { name: "altBn", type: "text", required: true, label: "Alt text (বাংলা)" },
    { name: "altEn", type: "text", required: true, label: "Alt text (English)" },
    bilingualArea("caption", false, "Caption"),
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
  admin: { group: "Citizen Services", hidden: true },
  access: {
    read: serviceOperatorsAndAbove,
    create: () => false, // created only by the intake API via local API
    update: () => false,
    delete: superAdminOnly,
  },
  fields: [
    { name: "note", type: "text", label: "Internal note" },
  ],
};

/** Citizen requests — the public never gets direct access. */
export const CitizenRequests: CollectionConfig = {
  slug: "citizen-requests",
  labels: {
    singular: "Citizen Request (নাগরিক সেবা আবেদন)",
    plural: "Citizen Requests (নাগরিক সেবা আবেদনসমূহ)",
  },
  admin: {
    group: "Citizen Services",
    useAsTitle: "ref",
    defaultColumns: ["ref", "name", "category", "status", "createdAt"],
    description: "Private — visible to Super Admin and Service Operators only.",
  },
  access: {
    read: serviceOperatorsAndAbove,
    create: () => false, // intake only via /api/requests (local API)
    update: serviceOperatorsAndAbove,
    delete: superAdminOnly,
  },
  timestamps: true,
  fields: [
    { name: "ref", type: "text", required: true, unique: true, index: true, admin: { readOnly: true } },
    { name: "name", type: "text", required: true, admin: { readOnly: true } },
    { name: "phone", type: "text", required: true, admin: { readOnly: true } },
    { name: "union", type: "text", admin: { readOnly: true } },
    {
      name: "category",
      type: "select",
      required: true,
      options: [
        { label: "General request", value: "general" },
        { label: "Constituency matter", value: "constituency" },
        { label: "Development project", value: "development" },
        { label: "Public service matter", value: "service" },
        { label: "Grievance / expectation", value: "grievance" },
        { label: "General contact", value: "contact" },
      ],
      admin: { readOnly: true },
    },
    { name: "subject", type: "text", required: true, admin: { readOnly: true } },
    { name: "description", type: "textarea", required: true, admin: { readOnly: true } },
    { name: "attachment", type: "upload", relationTo: "citizen-request-attachments", admin: { readOnly: true } },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "received",
      options: [
        { label: "Received", value: "received" },
        { label: "Under review", value: "underReview" },
        { label: "Referred", value: "referred" },
        { label: "Closed", value: "closed" },
      ],
      access: { update: serviceOperatorField },
    },
    {
      name: "statusHistory",
      type: "array",
      admin: { readOnly: true },
      fields: [
        { name: "status", type: "text", required: true },
        { name: "at", type: "date", required: true },
      ],
    },
    { name: "internalNote", type: "textarea", admin: { description: "Private operator note — never shown publicly." } },
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
