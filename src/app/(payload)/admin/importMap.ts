import { CollectionCards } from "@payloadcms/next/rsc";
import type { ImportMap } from "payload";

/**
 * Admin import map — mirrors what `npx payload generate:importmap` emits,
 * kept as TypeScript so it type-checks with the rest of the app.
 * Re-run the CLI and mirror any new entries here when custom admin
 * components are added.
 */
export const importMap: ImportMap = {
  "@payloadcms/next/rsc#CollectionCards": CollectionCards,
};
