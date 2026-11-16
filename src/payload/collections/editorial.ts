import type {
  CollectionConfig,
  CollectionBeforeChangeHook,
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
} from "payload";
import {
  publishedOrAuthenticated,
  editorsAndAbove,
  superAdminOnly,
  isPublisher,
  isReviewer,
  isSuperAdmin,
} from "../access.ts";
import { verificationGroup, workflowGroup } from "./system.ts";

/** Enforce the Draft → Review → Approved → Published workflow permissions. */
const publishingGuard: CollectionBeforeChangeHook = ({ req, data, originalDoc, operation }) => {
  const input = data as {
    workflow?: { status?: string };
    verification?: { status?: string };
  };
  const doc = originalDoc as
    | { workflow?: { status?: string }; verification?: { status?: string } }
    | undefined;

  const nextWorkflow = input.workflow?.status ?? doc?.workflow?.status ?? "draft";
  const prevWorkflow = doc?.workflow?.status ?? "draft";
  const prevVerification = doc?.verification?.status ?? "pending";

  const user = req.user as { role?: string } | null | undefined;

  const workflowChanged = operation === "create" ? nextWorkflow !== "draft" : nextWorkflow !== prevWorkflow;
  const verificationBecameVerified =
    input.verification?.status === "verified" && prevVerification !== "verified";

  if (nextWorkflow === "published" && workflowChanged && !isPublisher(user)) {
    throw new Error("Only a Publisher or Super Admin may publish content.");
  }
  if (nextWorkflow === "approved" && workflowChanged && !isReviewer(user) && !isPublisher(user) && !isSuperAdmin(user)) {
    throw new Error("Only a Reviewer, Publisher or Super Admin may approve content.");
  }
  if (verificationBecameVerified && !isReviewer(user) && !isPublisher(user) && !isSuperAdmin(user)) {
    throw new Error("Only a Reviewer, Publisher or Super Admin may mark content verified.");
  }
  return data;
};

type AuditReq = { payload: import("payload").Payload; user?: { email?: string } | null };

async function writeAudit(
  req: AuditReq,
  collection: string,
  doc: { id?: string | number } & Record<string, unknown>,
  action: "create" | "update" | "delete",
) {
  try {
    const workflow = (doc as { workflow?: { status?: string } }).workflow?.status;
    await req.payload.create({
      collection: "audit-logs",
      data: {
        summary: `${collection} ${action}${workflow ? ` → ${workflow}` : ""}`,
        collection,
        documentId: String(doc?.id ?? ""),
        action,
        actor: req.user?.email ?? "system",
      },
      overrideAccess: true,
    });
  } catch (error) {
    req.payload.logger?.warn?.(`audit log failed for ${collection}: ${String(error)}`);
  }
}

const auditAfterChange = (collection: string): CollectionAfterChangeHook =>
  async ({ req, doc, operation }) => {
    await writeAudit(req as AuditReq, collection, doc as never, operation === "create" ? "create" : "update");
    return doc;
  };

const auditAfterDelete = (collection: string): CollectionAfterDeleteHook =>
  async ({ req, doc }) => {
    await writeAudit(req as AuditReq, collection, doc as never, "delete");
    return doc;
  };

export interface EditorialDefinition {
  slug: string;
  label: string;
  adminGroup: string;
  extraFields: NonNullable<CollectionConfig["fields"]>;
  useAsTitle?: string;
  defaultColumns?: string[];
  access?: CollectionConfig["access"];
}

/** Shared editorial collection factory: workflow + verification + audit. */
export function editorialCollection({
  slug,
  label,
  adminGroup,
  extraFields,
  useAsTitle,
  defaultColumns,
  access,
}: EditorialDefinition): CollectionConfig {
  return {
    slug,
    labels: { singular: label, plural: `${label}s` },
    admin: {
      useAsTitle: useAsTitle ?? "slug",
      group: adminGroup,
      defaultColumns: defaultColumns ?? ["slug", "updatedAt"],
    },
    versions: {
      drafts: { autosave: false },
      maxPerDoc: 20,
    },
    access: access ?? {
      read: publishedOrAuthenticated,
      create: editorsAndAbove,
      update: editorsAndAbove,
      delete: superAdminOnly,
    },
    hooks: {
      beforeChange: [publishingGuard],
      afterChange: [auditAfterChange(slug)],
      afterDelete: [auditAfterDelete(slug)],
    },
    timestamps: true,
    fields: [...extraFields, workflowGroup, verificationGroup],
  };
}
