import { buildConfig } from "payload";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { Users, AuditLogs } from "./payload/collections/system.ts";
import { allEditorialCollections } from "./payload/collections/editorial-content.ts";
import { HomepageSettings, ContactInfoGlobal, SocialLinksGlobal } from "./payload/globals.ts";
import { migrations } from "./migrations/index.ts";

const dirname = path.dirname(fileURLToPath(import.meta.url));

const secret =
  process.env.PAYLOAD_SECRET ||
  "development-only-secret-change-me-before-production";

if (!process.env.PAYLOAD_SECRET && process.env.NODE_ENV === "production") {
  console.warn(
    "[payload] WARNING: PAYLOAD_SECRET is not set. Using fallback secret for build. Set PAYLOAD_SECRET in your production environment variables for security.",
  );
}

const defaultSupabaseUrl =
  "postgresql://postgres.qghcoposdhgzbvkkjmzl:Nirjon1478%40%40@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres";

const databaseUrl = process.env.DATABASE_URL || defaultSupabaseUrl;

const isPostgres =
  databaseUrl.startsWith("postgres://") ||
  databaseUrl.startsWith("postgresql://");

export default buildConfig({
  secret,
  db: isPostgres
    ? postgresAdapter({
        pool: {
          connectionString: databaseUrl,
          ssl: { rejectUnauthorized: false },
        },
        schemaName: "payload_cms",
        push: false,
      })
    : sqliteAdapter({
        client: {
          url: databaseUrl,
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
      titleSuffix: "— VP Nur Admin",
    },
    components: {
      beforeDashboard: ["@/components/admin/LivePreviewDashboard#LivePreviewDashboard"],
    },
  },
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
});
