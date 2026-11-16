/**
 * Seed: create the first Super Admin user for the CMS.
 *
 *   SEED_ADMIN_EMAIL=admin@example.com SEED_ADMIN_PASSWORD=... npm run seed
 *
 * Never commit real credentials. The script is idempotent.
 *
 * The schema must come from migrations (the production path), never from a
 * drizzle dev push — a dev push marks the database batch −1 and blocks all
 * later production boots. ESM imports are hoisted, so the production
 * environment is set up BEFORE the config module is (dynamically) imported.
 */
process.env.DATABASE_PUSH = "false";
// Runtime override — @types/node marks NODE_ENV read-only, but the value must
// be set before the config module is (dynamically) imported.
(process.env as Record<string, string | undefined>).NODE_ENV = "production";

const { getPayload } = await import("payload");
const config = (await import("../src/payload.config.ts")).default;

const email = process.env.SEED_ADMIN_EMAIL ?? "admin@example.com";
const password = process.env.SEED_ADMIN_PASSWORD;

if (!password || password.length < 12) {
  console.error(
    "SEED_ADMIN_PASSWORD must be set and at least 12 characters long.",
  );
  process.exit(1);
}

const payload = await getPayload({ config });

const existing = await payload.find({
  collection: "users",
  where: { email: { equals: email } },
  limit: 1,
  overrideAccess: true,
});

if (existing.docs.length > 0) {
  console.log(`Super admin ${email} already exists — nothing to do.`);
} else {
  await payload.create({
    collection: "users",
    data: { email, password, name: "Super Admin", role: "super-admin" },
    overrideAccess: true,
  });
  console.log(`Created super admin ${email}`);
}

process.exit(0);
