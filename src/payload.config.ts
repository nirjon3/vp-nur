import { buildConfig } from "payload";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { Users, AuditLogs } from "./payload/collections/system.ts";
import { allEditorialCollections } from "./payload/collections/editorial-content.ts";
import { HomepageSettings, ContactInfoGlobal, SocialLinksGlobal } from "./payload/globals.ts";
import { migrations } from "./migrations/index.ts";

const dirname = path.dirname(fileURLToPath(import.meta.url));

const secret =
  process.env.PAYLOAD_SECRET ??
  "development-only-secret-change-me-before-production";

if (!process.env.PAYLOAD_SECRET && process.env.NODE_ENV === "production") {
  console.warn(
    "[payload] WARNING: PAYLOAD_SECRET is not set. Refusing to continue in production — set PAYLOAD_SECRET in your environment.",
  );
  throw new Error("PAYLOAD_SECRET must be set in production");
}

export default buildConfig({
  secret,
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URL ?? "file:./payload.db",
    },
    // Dev auto-pushes the Drizzle schema; production runs the checked-in
    // migrations from ./migrations at boot (payload connect() applies them).
    push: process.env.DATABASE_PUSH !== "false",
    prodMigrations: migrations,
  }),
  editor: lexicalEditor(),
  collections: [Users, AuditLogs, ...allEditorialCollections],
  globals: [HomepageSettings, ContactInfoGlobal, SocialLinksGlobal],
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: "— Nur CMS",
    },
  },
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
});
