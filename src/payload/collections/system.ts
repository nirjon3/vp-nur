import type { CollectionConfig } from "payload";
import { superAdminOnly, editorsAndAbove } from "../access.ts";

export const Users: CollectionConfig = {
  slug: "users",
  labels: {
    singular: "ব্যবহারকারী (User)",
    plural: "অ্যাডমিন ও ব্যবহারকারী (Users)",
  },
  auth: {
    loginWithUsername: {
      allowEmailLogin: true,
      requireEmail: false,
    },
  },
  admin: {
    useAsTitle: "username",
    group: "৪. সিস্টেম ও নিরাপত্তা (System & Security)",
    description: "অ্যাডমিন প্যানেলে প্রবেশকারী ব্যবহারকারী ও তাদের দায়িত্ব (Role) পরিচালনা করুন।",
    defaultColumns: ["username", "email", "role", "createdAt"],
  },
  access: {
    read: ({ req }) => Boolean(req.user),
    create: ({ req }) => {
      const role = (req.user as { role?: string } | null | undefined)?.role;
      // First user (no users yet) can be created; otherwise super-admin only
      if (!req.user) return true;
      return role === "super-admin";
    },
    update: ({ req }) => {
      const role = (req.user as { role?: string } | null | undefined)?.role;
      return role === "super-admin";
    },
    delete: ({ req }) => {
      const role = (req.user as { role?: string } | null | undefined)?.role;
      return role === "super-admin";
    },
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      label: "পূর্ণ নাম (Full Name)",
    },
    {
      name: "role",
      type: "select",
      required: true,
      defaultValue: "editor",
      label: "দায়িত্ব / ভূমিকা (Role)",
      options: [
        { label: "সুপার অ্যাডমিন — সমস্ত ক্ষমতা (Super Admin)", value: "super-admin" },
        { label: "সম্পাদক — তথ্য তৈরি ও সম্পাদনা (Editor)", value: "editor" },
        { label: "পর্যালোচক — তথ্য যাচাই ও অনুমোদন (Reviewer)", value: "reviewer" },
        { label: "প্রকাশক — অনুমোদিত তথ্য প্রকাশ (Publisher)", value: "publisher" },
        { label: "সেবা কর্মকর্তা — নাগরিক আবেদন পরিচালনা (Service Operator)", value: "service-operator" },
      ],
      access: {
        update: ({ req }) => {
          const role = (req.user as { role?: string } | null | undefined)?.role;
          return role === "super-admin";
        },
      },
    },
  ],
};

export const AuditLogs: CollectionConfig = {
  slug: "audit-logs",
  labels: {
    singular: "অডিট লগ (Audit Log)",
    plural: "কার্যক্রমের অডিট লগ (Audit Logs)",
  },
  admin: {
    useAsTitle: "summary",
    group: "৪. সিস্টেম ও নিরাপত্তা (System & Security)",
    description: "ওয়েবসাইটে কোন অ্যাডমিন কি তথ্য তৈরি, পরিবর্তন বা মুছেছেন তার রেকর্ড।",
    defaultColumns: ["summary", "collection", "action", "createdAt"],
  },
  access: {
    read: superAdminOnly,
    create: () => false, // written only by hooks
    update: () => false,
    delete: () => false,
  },
  fields: [
    { name: "summary", type: "text", required: true, label: "সংক্ষিপ্ত বিবরণ (Summary)" },
    { name: "collection", type: "text", required: true, index: true, label: "বিভাগ / টেবিল (Collection)" },
    { name: "documentId", type: "text", label: "নথি নম্বর (Doc ID)" },
    {
      name: "action",
      type: "select",
      options: [
        { label: "তৈরি করা হয়েছে (Create)", value: "create" },
        { label: "সম্পাদনা করা হয়েছে (Update)", value: "update" },
        { label: "মুছে ফেলা হয়েছে (Delete)", value: "delete" },
        { label: "স্ট্যাটাস পরিবর্তন (Status Change)", value: "status-change" },
        { label: "লগইন (Login)", value: "login" },
      ],
      required: true,
      label: "কার্যক্রমের ধরন (Action)",
    },
    { name: "actor", type: "text", label: "সম্পাদনকারী ইউজার (User)" },
  ],
};

/** Shared field definitions for bilingual editorial content */
export const bilingualText = (
  name: string,
  required: boolean,
  labelBn: string,
  labelEn?: string,
) => {
  const enLabel = labelEn ?? labelBn;
  return {
    name,
    type: "group" as const,
    label: `${labelBn} (${enLabel})`,
    fields: [
      { name: "bn", type: "text" as const, required, label: `${labelBn} (বাংলায় লিখুন)` },
      { name: "en", type: "text" as const, required, label: `${enLabel} (English)` },
    ],
  };
};

export const bilingualArea = (
  name: string,
  required: boolean,
  labelBn: string,
  labelEn?: string,
) => {
  const enLabel = labelEn ?? labelBn;
  return {
    name,
    type: "group" as const,
    label: `${labelBn} (${enLabel})`,
    fields: [
      { name: "bn", type: "textarea" as const, required, label: `${labelBn} (বাংলায় বিস্তারিত বিবরণ)` },
      { name: "en", type: "textarea" as const, required, label: `${enLabel} (English description)` },
    ],
  };
};

/** Verification metadata + workflow status shared by all public content */
export const verificationGroup = {
  name: "verification",
  type: "group" as const,
  label: "তথ্য যাচাই ও সূত্র (Verification & Source)",
  admin: { position: "sidebar" as const },
  fields: [
    {
      name: "status",
      type: "select" as const,
      defaultValue: "pending",
      required: true,
      label: "যাচাইয়ের অবস্থা (Status)",
      options: [
        { label: "অপেক্ষমাণ (Pending) — তথ্য যাচাই চলমান", value: "pending" },
        { label: "যাচাইকৃত (Verified) — প্রমাণিত সত্য তথ্য", value: "verified" },
      ],
    },
    { name: "sourceUrl", type: "text" as const, label: "তথ্যের মূল লিংক (Source URL)" },
    { name: "sourceLabel", type: "text" as const, label: "উৎসের নাম (Source Name, যেমন: প্রথম আলো, ফেসবুক)" },
    { name: "note", type: "textarea" as const, label: "যাচাইকরণ নোট (Verification Note)" },
  ],
};

export const workflowGroup = {
  name: "workflow",
  type: "group" as const,
  label: "প্রকাশনা নিয়ন্ত্রণ (Publishing Workflow)",
  admin: { position: "sidebar" as const },
  fields: [
    {
      name: "status",
      type: "select" as const,
      defaultValue: "draft",
      required: true,
      label: "প্রকাশের অবস্থা (Workflow Status)",
      options: [
        { label: "খসড়া (Draft) — ওয়েবসাইটে দেখাবে না", value: "draft" },
        { label: "পর্যালোচনায় (Review) — অনুমোদনের অপেক্ষায়", value: "review" },
        { label: "অনুমোদিত (Approved) — প্রকাশের যোগ্য", value: "approved" },
        { label: "প্রকাশিত (Published) — লাইভ ওয়েবসাইটে দেখা যাচ্ছে", value: "published" },
      ],
    },
    {
      name: "publishAt",
      type: "date" as const,
      label: "নির্ধারিত সময়ে প্রকাশ (Schedule Publish, ঐচ্ছিক)",
      admin: { date: { pickerAppearance: "dayAndTime" as const } },
    },
  ],
};

export const workflowAccess = {
  read: editorsAndAbove,
  create: editorsAndAbove,
};
