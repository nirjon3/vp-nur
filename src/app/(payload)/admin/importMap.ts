import { CollectionCards } from "@payloadcms/next/rsc";
import { LivePreviewDashboard } from "@/components/admin/LivePreviewDashboard";
import type { ImportMap } from "payload";

/**
 * Admin import map — mirrors what `npx payload generate:importmap` emits,
 * kept as TypeScript so it type-checks with the rest of the app.
 */
export const importMap: ImportMap = {
  "@payloadcms/next/rsc#CollectionCards": CollectionCards,
  "@/components/admin/LivePreviewDashboard#LivePreviewDashboard": LivePreviewDashboard,
  "/components/admin/LivePreviewDashboard#LivePreviewDashboard": LivePreviewDashboard,
};
