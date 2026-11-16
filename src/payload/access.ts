import type { Access, FieldAccess } from "payload";

type Role = "super-admin" | "editor" | "reviewer" | "publisher" | "service-operator";

const rolesOf = (user: unknown): Role[] => {
  if (user && typeof user === "object" && "role" in user) {
    const role = (user as { role?: unknown }).role;
    if (typeof role === "string") return [role as Role];
  }
  return [];
};

export const isSuperAdmin = (user: unknown) => rolesOf(user).includes("super-admin");
export const isEditor = (user: unknown) =>
  rolesOf(user).some((r) => ["super-admin", "editor"].includes(r));
export const isReviewer = (user: unknown) =>
  rolesOf(user).some((r) => ["super-admin", "reviewer"].includes(r));
export const isPublisher = (user: unknown) =>
  rolesOf(user).some((r) => ["super-admin", "publisher"].includes(r));
export const isEditorOrAbove = (user: unknown) =>
  rolesOf(user).some((r) => ["super-admin", "editor", "reviewer", "publisher"].includes(r));
export const isServiceOperator = (user: unknown) =>
  rolesOf(user).some((r) => ["super-admin", "service-operator"].includes(r));

/** Public read: only published docs; authenticated users read everything. */
export const publishedOrAuthenticated: Access = ({ req }) => {
  if (req.user) return true;
  return { status: { equals: "published" } };
};

export const authenticatedOnly: Access = ({ req }) => Boolean(req.user);
export const superAdminOnly: Access = ({ req }) => isSuperAdmin(req.user);
export const editorsAndAbove: Access = ({ req }) => isEditorOrAbove(req.user);
export const serviceOperatorsAndAbove: Access = ({ req }) =>
  isServiceOperator(req.user) || isSuperAdmin(req.user);
export const publishingAllowed: Access = ({ req }) => isPublisher(req.user);

// Field-level
export const superAdminField: FieldAccess = ({ req }) => isSuperAdmin(req.user);
export const serviceOperatorField: FieldAccess = ({ req }) =>
  isServiceOperator(req.user) || isSuperAdmin(req.user);
