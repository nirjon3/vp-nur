import { NextResponse } from "next/server";
import { events } from "@/content/events";
import { speeches } from "@/content/speeches";
import { initiatives } from "@/content/initiatives";
import { parliamentActivities } from "@/content/parliament";
import { timeline } from "@/content/timeline";
import { newsArticles } from "@/content/news";
import { publications } from "@/content/publications";

export const runtime = "nodejs";

export async function GET() {
  try {
    const { getPayload } = await import("payload");
    const config = (await import("@/payload.config")).default;
    const payload = await getPayload({ config });

    const adminUser = await payload.findByID({
      collection: "users",
      id: 1,
      overrideAccess: true,
    });

    const results: Record<string, number> = {
      events: 0,
      speeches: 0,
      initiatives: 0,
      parliamentActivities: 0,
      timelineMilestones: 0,
      news: 0,
      publications: 0,
    };

    // 1. Seed Events
    for (const item of events) {
      const existing = await payload.find({
        collection: "events",
        where: { slug: { equals: item.id } },
        limit: 1,
        overrideAccess: true,
      });

      const eventData = {
        slug: item.id,
        date: item.date,
        title: { bn: item.title.bn, en: item.title.en },
        location: { bn: item.location.bn, en: item.location.en },
        description: { bn: item.description.bn, en: item.description.en },
        confirmedByOrganiser: true,
        verification: { status: "verified" as const, note: "Verified official engagement" },
        workflow: { status: "published" as const },
      };

      if (existing.docs.length > 0) {
        await payload.update({
          collection: "events",
          id: existing.docs[0].id,
          data: eventData,
          user: adminUser,
          overrideAccess: true,
        });
      } else {
        await payload.create({
          collection: "events",
          data: eventData,
          user: adminUser,
          overrideAccess: true,
        });
      }
      results.events++;
    }

    // 2. Seed Speeches
    for (const item of speeches) {
      const existing = await payload.find({
        collection: "speeches",
        where: { slug: { equals: item.id } },
        limit: 1,
        overrideAccess: true,
      });

      const speechData = {
        slug: item.id,
        date: item.date,
        title: { bn: item.title.bn, en: item.title.en },
        subject: { bn: item.subject.bn, en: item.subject.en },
        location: item.location ? { bn: item.location.bn, en: item.location.en } : undefined,
        videoUrl: item.videoUrl,
        durationMinutes: item.durationMinutes,
        verification: { status: "verified" as const, note: "Verified video recording" },
        workflow: { status: "published" as const },
      };

      if (existing.docs.length > 0) {
        await payload.update({
          collection: "speeches",
          id: existing.docs[0].id,
          data: speechData,
          user: adminUser,
          overrideAccess: true,
        });
      } else {
        await payload.create({
          collection: "speeches",
          data: speechData,
          user: adminUser,
          overrideAccess: true,
        });
      }
      results.speeches++;
    }

    // 3. Seed Initiatives
    for (const item of initiatives) {
      const existing = await payload.find({
        collection: "initiatives",
        where: { slug: { equals: item.slug } },
        limit: 1,
        overrideAccess: true,
      });

      const initData = {
        slug: item.slug,
        status: item.status,
        category: item.category.en,
        location: { bn: item.location.bn, en: item.location.en },
        title: { bn: item.title.bn, en: item.title.en },
        excerpt: { bn: item.excerpt.bn, en: item.excerpt.en },
        body: item.body.map((p) => ({ paragraph: { bn: p.bn, en: p.en } })),
        verification: { status: "verified" as const, note: "Verified development initiative" },
        workflow: { status: "published" as const },
      };

      if (existing.docs.length > 0) {
        await payload.update({
          collection: "initiatives",
          id: existing.docs[0].id,
          data: initData,
          user: adminUser,
          overrideAccess: true,
        });
      } else {
        await payload.create({
          collection: "initiatives",
          data: initData,
          user: adminUser,
          overrideAccess: true,
        });
      }
      results.initiatives++;
    }

    // 4. Seed Parliament Activities
    for (const item of parliamentActivities) {
      const existing = await payload.find({
        collection: "parliament-activities",
        where: { slug: { equals: item.slug } },
        limit: 1,
        overrideAccess: true,
      });

      const parlData = {
        slug: item.slug,
        date: item.date,
        category: item.category,
        title: { bn: item.title.bn, en: item.title.en },
        excerpt: { bn: item.excerpt.bn, en: item.excerpt.en },
        body: item.body.map((p) => ({ paragraph: { bn: p.bn, en: p.en } })),
        session: item.session ? { bn: item.session.bn, en: item.session.en } : undefined,
        verification: { status: "verified" as const, note: "Official parliamentary record" },
        workflow: { status: "published" as const },
      };

      if (existing.docs.length > 0) {
        await payload.update({
          collection: "parliament-activities",
          id: existing.docs[0].id,
          data: parlData,
          user: adminUser,
          overrideAccess: true,
        });
      } else {
        await payload.create({
          collection: "parliament-activities",
          data: parlData,
          user: adminUser,
          overrideAccess: true,
        });
      }
      results.parliamentActivities++;
    }

    // 5. Seed Timeline Milestones
    let order = 0;
    for (const item of timeline) {
      const existing = await payload.find({
        collection: "timeline-milestones",
        where: { slug: { equals: item.id } },
        limit: 1,
        overrideAccess: true,
      });

      const dateLabel =
        typeof item.date === "string"
          ? { bn: item.date, en: item.date }
          : { bn: item.date.bn, en: item.date.en };

      const timeData = {
        slug: item.id,
        sortOrder: order++,
        dateLabel,
        title: { bn: item.title.bn, en: item.title.en },
        body: { bn: item.body.bn, en: item.body.en },
        verification: { status: "verified" as const, note: "Verified timeline entry" },
        workflow: { status: "published" as const },
      };

      if (existing.docs.length > 0) {
        await payload.update({
          collection: "timeline-milestones",
          id: existing.docs[0].id,
          data: timeData,
          user: adminUser,
          overrideAccess: true,
        });
      } else {
        await payload.create({
          collection: "timeline-milestones",
          data: timeData,
          user: adminUser,
          overrideAccess: true,
        });
      }
      results.timelineMilestones++;
    }

    // 6. Seed News
    for (const item of newsArticles) {
      const existing = await payload.find({
        collection: "news",
        where: { slug: { equals: item.slug } },
        limit: 1,
        overrideAccess: true,
      });

      const newsData = {
        slug: item.slug,
        date: item.date,
        category: item.category,
        featured: Boolean(item.featured),
        title: { bn: item.title.bn, en: item.title.en },
        excerpt: { bn: item.excerpt.bn, en: item.excerpt.en },
        body: item.body.map((p) => ({
          paragraph: { bn: p.bn, en: p.en },
        })),
        verification: { status: "verified" as const, note: "Official news archive" },
        workflow: { status: "published" as const },
      };

      if (existing.docs.length > 0) {
        await payload.update({
          collection: "news",
          id: existing.docs[0].id,
          data: newsData,
          user: adminUser,
          overrideAccess: true,
        });
      } else {
        await payload.create({
          collection: "news",
          data: newsData,
          user: adminUser,
          overrideAccess: true,
        });
      }
      results.news++;
    }

    // 7. Seed Publications
    for (const item of publications) {
      const existing = await payload.find({
        collection: "publications",
        where: { slug: { equals: item.id } },
        limit: 1,
        overrideAccess: true,
      });

      const pubData = {
        slug: item.id,
        date: item.date,
        category: { bn: item.category.bn, en: item.category.en },
        title: { bn: item.title.bn, en: item.title.en },
        description: { bn: item.description.bn, en: item.description.en },
        verification: { status: "verified" as const, note: "Official publication" },
        workflow: { status: "published" as const },
      };

      if (existing.docs.length > 0) {
        await payload.update({
          collection: "publications",
          id: existing.docs[0].id,
          data: pubData,
          user: adminUser,
          overrideAccess: true,
        });
      } else {
        await payload.create({
          collection: "publications",
          data: pubData,
          user: adminUser,
          overrideAccess: true,
        });
      }
      results.publications++;
    }

    return NextResponse.json({
      success: true,
      message: "Payload CMS database successfully synced with editorial content!",
      synced: results,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
