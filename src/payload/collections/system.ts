import type { CollectionConfig } from "payload";
import { superAdminOnly, editorsAndAbove } from "../access.ts";

export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: {
    useAsTitle: "email",
    group: "System",
    defaultColumns: ["email", "role", "createdAt"],
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
      label: "Full name",
    },
    {
      name: "role",
      type: "select",
      required: true,
      defaultValue: "editor",
      options: [
        { label: "Super Admin — full system access", value: "super-admin" },
        { label: "Editor — create and edit content", value: "editor" },
        { label: "Reviewer — verify and approve content", value: "reviewer" },
        { label: "Publisher — publish approved content", value: "publisher" },
        { label: "Service Operator — manage citizen requests", value: "service-operator" },
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
  admin: {
    useAsTitle: "summary",
    group: "System",
    defaultColumns: ["summary", "collection", "action", "createdAt"],
  },
  access: {
    read: superAdminOnly,
    create: () => false, // written only by hooks
    update: () => false,
    delete: () => false,
  },
  fields: [
    { name: "summary", type: "text", required: true },
    { name: "collection", type: "text", required: true, index: true },
    { name: "documentId", type: "text" },
    { name: "action", type: "select", options: ["create", "update", "delete", "status-change", "login"], required: true },
    { name: "actor", type: "text" },
  ],
};

/** Shared field definitions for bilingual editorial content */
export const bilingualText = (name: string, required: boolean, labelBn: string, labelEn: string) => ({
  name,
  type: "group" as const,
  label: labelEn,
  fields: [
    { name: "bn", type: "text" as const, required, label: `${labelBn} (বাংলা)` },
    { name: "en", type: "text" as const, required, label: `${labelEn} (English)` },
  ],
});

export const bilingualArea = (name: string, required: boolean, labelEn: string) => ({
  name,
  type: "group" as const,
  label: labelEn,
  fields: [
    { name: "bn", type: "textarea" as const, required, label: `${labelEn} (বাংলা)` },
    { name: "en", type: "textarea" as const, required, label: `${labelEn} (English)` },
  ],
});

/** Verification metadata + workflow status shared by all public content */
export const verificationGroup = {
  name: "verification",
  type: "group" as const,
  label: "Verification & source",
  admin: { position: "sidebar" as const },
  fields: [
    {
      name: "status",
      type: "select" as const,
      defaultValue: "pending",
      required: true,
      label: "Verification status",
      options: [
        { label: "Pending verification — never shown as fact", value: "pending" },
        { label: "Verified against source", value: "verified" },
      ],
    },
    { name: "sourceUrl", type: "text" as const, label: "Source URL" },
    { name: "sourceLabel", type: "text" as const, label: "Source name" },
    { name: "note", type: "textarea" as const, label: "Verification note" },
  ],
};

export const workflowGroup = {
  name: "workflow",
  type: "group" as const,
  label: "Publishing workflow",
  admin: { position: "sidebar" as const },
  fields: [
    {
      name: "status",
      type: "select" as const,
      defaultValue: "draft",
      required: true,
      label: "Workflow status",
      options: [
        { label: "Draft", value: "draft" },
        { label: "Review", value: "review" },
        { label: "Approved", value: "approved" },
        { label: "Published", value: "published" },
      ],
    },
    {
      name: "publishAt",
      type: "date" as const,
      label: "Scheduled publication (optional)",
      admin: { date: { pickerAppearance: "dayAndTime" as const } },
    },
  ],
};

export const workflowAccess = {
  read: editorsAndAbove,
  create: editorsAndAbove,
};
