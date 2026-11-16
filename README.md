# Nurul Haque Nur — Official Public Information Website

Premium, editorial, institutional-grade website for **Nurul Haque Nur (VP Nur)** —
Bengali-first with full English support. Built with Next.js 16 (App Router),
React 19, TypeScript strict, Tailwind CSS v4, Payload CMS 3 and SQLite
(PostgreSQL-ready), Zod and React Hook Form.

> **This is not a government website.** It is an independent public-information
> initiative. Only material verified against a source is marked “verified”.

---

## Quick start

```bash
# 1. Install
npm install

# 2. (Optional) point at your own environment
cp .env.example .env

# 3. Run the dev server
npm run dev
# Site:      http://localhost:3000  → redirects to /bn
# CMS:       http://localhost:3000/admin

# 4. Create the first super admin (interactive-free, env-driven).
#    The seed runs in the production code path and applies migrations;
#    PAYLOAD_SECRET is required.
PAYLOAD_SECRET=a-long-random-string \
SEED_ADMIN_EMAIL=admin@example.com \
SEED_ADMIN_PASSWORD=min-12-chars \
npm run seed
```

Production build requires `PAYLOAD_SECRET` to be set (the app refuses to boot
without it when `NODE_ENV=production`). On boot, production automatically
applies the checked-in SQLite migrations from `src/migrations/` (see
`prodMigrations` in `src/payload.config.ts`); in development the schema is
pushed automatically instead.

```bash
PAYLOAD_SECRET=$(openssl rand -base64 48) npm run build
PAYLOAD_SECRET=... npm start
```

## Scripts

| Command            | Purpose                                   |
| ------------------ | ----------------------------------------- |
| `npm run dev`      | Dev server                                 |
| `npm run build`    | Production build (Turbopack)               |
| `npm start`        | Serve the production build                 |
| `npm run lint`     | ESLint (eslint-config-next)                |
| `npm run typecheck`| `tsc --noEmit` (strict)                    |
| `npm run seed`     | Create first Super Admin (idempotent)      |
| `npm run cms:types`| Regenerate Payload types (optional)        |

---

## Project status — read this first

This project represents a **real public figure**. Accuracy beats completeness.
Two rules govern everything:

1. **No unverified fact is published as fact.** Every factual content item
   carries a `verification` status (`pending` | `verified`). Items marked
   `pending` render a visible “যাচাই চলমান / Verification pending” badge.
2. **No invented officials, photos, contacts, dates, quotes or records.** Where
   authoritative material (photographs, phone numbers, office address, social
   profiles, hansard references) has not been supplied/verified, the UI shows
   an honest empty state. It never fabricates.

### What works today (real functionality)

- Full bilingual site in Bengali (`/bn`, default) and English (`/en`): home,
  about (timeline), parliament archive (search + filter + pagination + detail),
  constituency page (embedded OpenStreetMap), initiatives (+ detail with update
  log), newsroom (search + filter + pagination + article pages + JSON-LD),
  media centre (category filter, accessible lightbox, YouTube-ready),
  speeches archive, events (upcoming/past), publications library, services.
- **Citizen services end-to-end**: validated intake API (`/api/requests`)
  with Zod validation, per-IP sliding-window rate limit, honeypot spam trap,
  attachment type/size validation (PDF/JPEG/PNG/WebP/DOCX ≤ 5 MB), persistence
  in the CMS database, and a tracking reference (`NRV-YYYYMMDD-XXXXXX`).
  Tracking (`/api/requests/track`) requires **both** the reference and the
  submission phone number; anything else returns an identical 404 so existence
  of someone's request cannot be probed. Statuses: `received → underReview →
  referred → closed`, with a status-history audit trail.
  - **Honesty guarantee**: if the datastore is unreachable, the API returns
    503 and the UI shows an explicit error — never a fake success state.
- **Payload CMS admin** at `/admin`: role-based access (Super Admin, Editor,
  Reviewer, Publisher, Service Operator), Draft → Review → Approved → Published
  workflow enforced by server-side guards (only Publisher/Super Admin can set
  `published`; only Reviewer+ can set `verified`/`approved`), scheduled
  publication field, versioning (max 20/doc), and an `audit-logs` collection
  recording every create/update/delete plus operator status changes.
- Private attachments are stored in a separate upload collection that is
  unreadable without a service role.
- Security headers, sitemap, robots.txt, canonical + hreflang alternates,
  OpenGraph metadata, semantic HTML, skip links, visible focus states,
  reduced-motion support, WCAG 2.2 AA–minded contrast.

### What is intentionally pending (needs the office/team)

| Item | Where it lives | What is needed |
| ---- | -------------- | -------------- |
| Portrait and all photography | `src/content/*` placeholders; CMS Media | Authorised, unedited photographs + alt text |
| Verified designation wording | Hero copy `src/components/home/hero.tsx` | Confirmation of current titles as per latest gazette/parliament record |
| Timeline dates & milestones | `src/content/timeline.ts` | Source references (university notice, newspaper archive, hansard) |
| Office address / phone / email / hours / map | `src/content/contact.ts` | Verified public details from the office |
| Social profiles | `src/content/contact.ts` | Verified profile URLs |
| Speech/interview videos | `src/content/speeches.ts` (`videoUrl`) | Verified recording links |
| News & parliamentary records | `src/content/news.ts`, `parliament.ts` | Hansard/parliament publications; replace development samples |
| Storage of uploads | `media/`, `media/private/` (local) | Object storage (S3/R2) for multi-instance production |
| Database | `file:./payload.db` (SQLite) | Switch to `@payloadcms/db-postgres` + `DATABASE_URL` for production scale |

Development sample content is deliberately generic and marked pending; **do not
present it as fact**.

### Public content source

Public pages currently render from the typed content layer in `src/content/`
(same schema semantics as the CMS: verification status, source, dates). The
CMS is fully operational for citizen requests and editorial workflow; switching
public reads to Payload is a small, documented step (query `getPayload` in the
server components and fall back to the typed layer) rather than a redesign.

## Architecture

```
src/
  app/
    [locale]/            bn (default) + en — all public pages
    (payload)/           CMS admin (/admin) + REST/GraphQL (/api)
    api/requests/        Citizen request intake + tracking (Node runtime)
    sitemap.ts robots.ts icon.svg
  components/
    ui/ layout/ home/ shared/ forms/ parliament/ news/ media/ speeches/ publications/
  content/               Typed, bilingual, verifiable content (single source today)
  i18n/                  Locales + dictionaries
  lib/                   cn, validation, rate-limit, tracking refs, seo, formats
  payload/               Access rules, collections, globals (audited workflow)
  types/                 Domain model (LocalText, Verifiable, …)
```

Design system: `--color-forest #153E35`, `--color-forest-deep #102E27`,
`--color-gold #B49A67`, `--color-offwhite #F8F9F6`, `--color-line #E7E9E5`,
body `#404641`, muted `#737A74`. Type: Hind Siliguri (Bengali) + Manrope
(Latin), via `next/font`. Max width 1280px, 12-col desktop grid, hairline
borders, 2px radii, restrained motion.

## Roles

| Role | Capabilities |
| ---- | ------------ |
| super-admin | Everything: users, settings, delete, audit log |
| editor | Create/edit content, cannot publish |
| reviewer | Approve content, mark verified, see workflow transitions |
| publisher | Approve + set status `published` |
| service-operator | Read/triage citizen requests (status only), internal notes |

## Publishing workflow

`draft → review → approved → published`. Enforced server-side in
`src/payload/collections/editorial.ts` (`publishingGuard`). Spam/abuse guards
on intake: honeypot, per-IP + global rate limits. Scheduled publication:
`workflow.publishAt` (publish jobs are not wired to a cron yet — see below).

## Production checklist

- [ ] `PAYLOAD_SECRET` long random (app refuses to boot otherwise)
- [ ] Swap SQLite → PostgreSQL (`@payloadcms/db-postgres`), then `npm run cms:migrate:create` / `npm run cms:migrate`
- [ ] Object storage adapter for media (`@payloadcms/storage-s3` or similar)
- [ ] Real `NEXT_PUBLIC_SITE_URL`
- [ ] Replace dev secret/build secrets in CI; never commit `.env`
- [ ] Cron hitting an internal `revalidate`/publish endpoint for `workflow.publishAt`
- [ ] Redis/Upstash-backed rate limiter if running more than one instance
- [ ] Verify all `verification: pending` content or remove it
- [ ] Add authorised photography to CMS Media and wire hero image
- [ ] Point DNS + TLS; set security headers at the edge
- [ ] Backup strategy for the CMS database (contains citizen PII — treat as sensitive)

## Content verification workflow for the team

1. Collect the source (hansard, newspaper, official notice, office letter).
2. Enter the item in the CMS with `sourceUrl`, `sourceLabel`, exact
   `verification.status`.
3. A Reviewer cross-checks, sets `verification.status = verified`, moves
   workflow to `approved`.
4. A Publisher sets `workflow.status = published` (or schedules via `publishAt`).
5. An Editor unpublishes or corrects on source changes — changes are audited.

---

*Maintained by the website team. Bengali-first. Verification over volume.*
