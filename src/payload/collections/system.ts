import type { CollectionConfig } from "payload";
import { superAdminOnly, editorsAndAbove } from "../access.ts";

export const Users: CollectionConfig = {
  slug: "users",
  labels: {
    singular: "User",
    plural: "👥 Users",
  },
  auth: {
    loginWithUsername: {
      allowEmailLogin: true,
      requireEmail: false,
    },
  },
  admin: {
    useAsTitle: "username",
    group: "⚙️ System",
    description: "Manage admin users, credentials, and access roles",
    defaultColumns: ["username", "email", "role", "createdAt"],
  },
  access: {
    read: ({ req }) => Boolean(req.user),
    create: ({ req }) => {
      const role = (req.user as { role?: string } | null | undefined)?.role;
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
      label: "Full Name",
    },
    {
      name: "role",
      type: "select",
      required: true,
      defaultValue: "editor",
      label: "Role & Permissions",
      options: [
        { label: "Super Admin (Full System Access)", value: "super-admin" },
        { label: "Editor (Create & Edit Content)", value: "editor" },
        { label: "Reviewer (Verify & Approve)", value: "reviewer" },
        { label: "Publisher (Publish to Live Site)", value: "publisher" },
        { label: "Service Operator (Citizen Requests)", value: "service-operator" },
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
    singular: "Log Entry",
    plural: "📜 Audit Logs",
  },
  admin: {
    useAsTitle: "summary",
    group: "⚙️ System",
    description: "Security and modification history log",
    defaultColumns: ["summary", "collection", "action", "createdAt"],
  },
  access: {
    read: superAdminOnly,
    create: () => false,
    update: () => false,
    delete: () => false,
  },
  fields: [
    { name: "summary", type: "text", required: true, label: "Summary" },
    { name: "collection", type: "text", required: true, index: true, label: "Collection" },
    { name: "documentId", type: "text", label: "Document ID" },
    {
      name: "action",
      type: "select",
      options: [
        { label: "Create", value: "create" },
        { label: "Update", value: "update" },
        { label: "Delete", value: "delete" },
        { label: "Status Change", value: "status-change" },
        { label: "Login", value: "login" },
      ],
      required: true,
      label: "Action",
    },
    { name: "actor", type: "text", label: "User / Actor" },
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
    label: enLabel,
    fields: [
      { name: "bn", type: "text" as const, required, label: `Bangla (বাংলা) — ${labelBn}` },
      { name: "en", type: "text" as const, required, label: `English — ${enLabel}` },
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
    label: enLabel,
    fields: [
      { name: "bn", type: "textarea" as const, required, label: `Bangla (বাংলা) — ${labelBn}` },
      { name: "en", type: "textarea" as const, required, label: `English — ${enLabel}` },
    ],
  };
};

/** Verification metadata + workflow status shared by all public content */
export const verificationGroup = {
  name: "verification",
  type: "group" as const,
  label: "Verification & Source",
  admin: { position: "sidebar" as const },
  fields: [
    {
      name: "status",
      type: "select" as const,
      defaultValue: "pending",
      required: true,
      label: "Verification Status",
      options: [
        { label: "⏳ Pending (Verification in progress)", value: "pending" },
        { label: "✅ Verified (Confirmed by source)", value: "verified" },
      ],
    },
    { name: "sourceUrl", type: "text" as const, label: "Source URL" },
    { name: "sourceLabel", type: "text" as const, label: "Source Name" },
    { name: "note", type: "textarea" as const, label: "Verification Note" },
  ],
};

export const workflowGroup = {
  name: "workflow",
  type: "group" as const,
  label: "Publishing Workflow",
  admin: { position: "sidebar" as const },
  fields: [
    {
      name: "status",
      type: "select" as const,
      defaultValue: "draft",
      required: true,
      label: "Publish Status",
      options: [
        { label: "📝 Draft (Hidden from website)", value: "draft" },
        { label: "🔍 Under Review", value: "review" },
        { label: "👍 Approved", value: "approved" },
        { label: "🚀 Published (Live on website)", value: "published" },
      ],
    },
    {
      name: "publishAt",
      type: "date" as const,
      label: "Scheduled Publish Date (Optional)",
      admin: { date: { pickerAppearance: "dayAndTime" as const } },
    },
  ],
};

export const workflowAccess = {
  read: editorsAndAbove,
  create: editorsAndAbove,
};
