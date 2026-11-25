import { events as defaultEvents } from "@/content/events";
import { speeches as defaultSpeeches } from "@/content/speeches";
import { initiatives as defaultInitiatives } from "@/content/initiatives";
import { parliamentActivities as defaultParliament } from "@/content/parliament";
import { timeline as defaultTimeline } from "@/content/timeline";
import { newsArticles as defaultNews } from "@/content/news";
import { publications as defaultPublications } from "@/content/publications";
import type {
  PublicEvent,
  Speech,
  Initiative,
  ParliamentActivity,
  TimelineItem,
  NewsArticle,
  Publication,
  LocalText,
  ParliamentCategory,
  InitiativeStatus,
} from "@/types/content";

async function getPayloadClient() {
  try {
    const { getPayload } = await import("payload");
    const config = (await import("@/payload.config")).default;
    return await getPayload({ config });
  } catch {
    return null;
  }
}

type PayloadDoc = Record<string, unknown>;

export async function getLiveEvents(): Promise<PublicEvent[]> {
  try {
    const payload = await getPayloadClient();
    if (!payload) return defaultEvents;
    const res = await payload.find({
      collection: "events",
      where: { "workflow.status": { equals: "published" } },
      limit: 100,
      overrideAccess: true,
    });
    if (!res.docs || res.docs.length === 0) return defaultEvents;

    return res.docs.map((item: unknown): PublicEvent => {
      const doc = item as PayloadDoc;
      const dateStr = String(doc.date ?? "");
      const verification = doc.verification as { status?: "pending" | "verified" } | undefined;
      return {
        id: String(doc.slug ?? ""),
        title: doc.title as LocalText,
        date: dateStr,
        endDate: doc.endDate ? String(doc.endDate) : undefined,
        location: doc.location as LocalText,
        description: doc.description as LocalText,
        status: new Date(dateStr) > new Date() ? "upcoming" : "past",
        verification: verification?.status ?? "verified",
        updatedAt: doc.updatedAt ? String(doc.updatedAt) : undefined,
      };
    });
  } catch {
    return defaultEvents;
  }
}

export async function getLiveSpeeches(): Promise<Speech[]> {
  try {
    const payload = await getPayloadClient();
    if (!payload) return defaultSpeeches;
    const res = await payload.find({
      collection: "speeches",
      where: { "workflow.status": { equals: "published" } },
      limit: 100,
      overrideAccess: true,
    });
    if (!res.docs || res.docs.length === 0) return defaultSpeeches;

    return res.docs.map((item: unknown): Speech => {
      const doc = item as PayloadDoc;
      const verification = doc.verification as { status?: "pending" | "verified" } | undefined;
      const transcript = doc.transcript as { paragraph: LocalText }[] | undefined;
      return {
        id: String(doc.slug ?? ""),
        date: String(doc.date ?? ""),
        title: doc.title as LocalText,
        subject: doc.subject as LocalText,
        location: (doc.location as LocalText) || undefined,
        videoUrl: doc.videoUrl ? String(doc.videoUrl) : undefined,
        durationMinutes: typeof doc.durationMinutes === "number" ? doc.durationMinutes : undefined,
        transcript: transcript?.map((t) => t.paragraph),
        verification: verification?.status ?? "verified",
        updatedAt: doc.updatedAt ? String(doc.updatedAt) : undefined,
      };
    });
  } catch {
    return defaultSpeeches;
  }
}

export async function getLiveInitiatives(): Promise<Initiative[]> {
  try {
    const payload = await getPayloadClient();
    if (!payload) return defaultInitiatives;
    const res = await payload.find({
      collection: "initiatives",
      where: { "workflow.status": { equals: "published" } },
      limit: 100,
      overrideAccess: true,
    });
    if (!res.docs || res.docs.length === 0) return defaultInitiatives;

    return res.docs.map((item: unknown): Initiative => {
      const doc = item as PayloadDoc;
      const verification = doc.verification as { status?: "pending" | "verified" } | undefined;
      const body = doc.body as { paragraph: LocalText }[] | undefined;
      const updates = doc.updates as { date: string; text: LocalText }[] | undefined;
      const cat = String(doc.category ?? "");
      return {
        slug: String(doc.slug ?? ""),
        category: { bn: cat, en: cat },
        status: (doc.status as InitiativeStatus) || "planned",
        location: doc.location as LocalText,
        title: doc.title as LocalText,
        excerpt: doc.excerpt as LocalText,
        body: body?.map((b) => b.paragraph) || [],
        startDate: doc.startDate ? String(doc.startDate) : undefined,
        updates: updates?.map((u) => ({ date: String(u.date), text: u.text })) || [],
        verification: verification?.status ?? "verified",
        updatedAt: doc.updatedAt ? String(doc.updatedAt) : undefined,
      };
    });
  } catch {
    return defaultInitiatives;
  }
}

export async function getLiveParliamentActivities(): Promise<ParliamentActivity[]> {
  try {
    const payload = await getPayloadClient();
    if (!payload) return defaultParliament;
    const res = await payload.find({
      collection: "parliament-activities",
      where: { "workflow.status": { equals: "published" } },
      limit: 100,
      overrideAccess: true,
    });
    if (!res.docs || res.docs.length === 0) return defaultParliament;

    return res.docs.map((item: unknown): ParliamentActivity => {
      const doc = item as PayloadDoc;
      const verification = doc.verification as { status?: "pending" | "verified" } | undefined;
      const body = doc.body as { paragraph: LocalText }[] | undefined;
      return {
        slug: String(doc.slug ?? ""),
        date: String(doc.date ?? ""),
        category: (doc.category as ParliamentCategory) || "speech",
        title: doc.title as LocalText,
        excerpt: doc.excerpt as LocalText,
        body: body?.map((b) => b.paragraph) || [],
        session: (doc.session as LocalText) || undefined,
        verification: verification?.status ?? "verified",
        updatedAt: doc.updatedAt ? String(doc.updatedAt) : undefined,
      };
    });
  } catch {
    return defaultParliament;
  }
}

export async function getLiveTimeline(): Promise<TimelineItem[]> {
  try {
    const payload = await getPayloadClient();
    if (!payload) return defaultTimeline;
    const res = await payload.find({
      collection: "timeline-milestones",
      where: { "workflow.status": { equals: "published" } },
      sort: "sortOrder",
      limit: 100,
      overrideAccess: true,
    });
    if (!res.docs || res.docs.length === 0) return defaultTimeline;

    return res.docs.map((item: unknown): TimelineItem => {
      const doc = item as PayloadDoc;
      const verification = doc.verification as { status?: "pending" | "verified" } | undefined;
      return {
        id: String(doc.slug ?? ""),
        date: doc.dateLabel as LocalText | string,
        title: doc.title as LocalText,
        body: doc.body as LocalText,
        verification: verification?.status ?? "verified",
        updatedAt: doc.updatedAt ? String(doc.updatedAt) : undefined,
      };
    });
  } catch {
    return defaultTimeline;
  }
}

export async function getLiveNews(): Promise<NewsArticle[]> {
  try {
    const payload = await getPayloadClient();
    if (!payload) return defaultNews;
    const res = await payload.find({
      collection: "news",
      where: { "workflow.status": { equals: "published" } },
      sort: "-date",
      limit: 100,
      overrideAccess: true,
    });
    if (!res.docs || res.docs.length === 0) return defaultNews;

    return res.docs.map((item: unknown): NewsArticle => {
      const doc = item as PayloadDoc;
      const verification = doc.verification as { status?: "pending" | "verified" } | undefined;
      const body = doc.body as { paragraph: LocalText }[] | undefined;
      return {
        slug: String(doc.slug ?? ""),
        date: String(doc.date ?? ""),
        category: (doc.category as NewsArticle["category"]) || "announcement",
        featured: Boolean(doc.featured),
        title: doc.title as LocalText,
        excerpt: doc.excerpt as LocalText,
        body: body?.map((b) => b.paragraph) || [],
        verification: verification?.status ?? "verified",
        updatedAt: doc.updatedAt ? String(doc.updatedAt) : undefined,
      };
    });
  } catch {
    return defaultNews;
  }
}

export async function getLivePublications(): Promise<Publication[]> {
  try {
    const payload = await getPayloadClient();
    if (!payload) return defaultPublications;
    const res = await payload.find({
      collection: "publications",
      where: { "workflow.status": { equals: "published" } },
      sort: "-date",
      limit: 100,
      overrideAccess: true,
    });
    if (!res.docs || res.docs.length === 0) return defaultPublications;

    return res.docs.map((item: unknown): Publication => {
      const doc = item as PayloadDoc;
      const verification = doc.verification as { status?: "pending" | "verified" } | undefined;
      const file = doc.file as { url?: string } | undefined;
      return {
        id: String(doc.slug ?? ""),
        date: String(doc.date ?? ""),
        category: doc.category as LocalText,
        title: doc.title as LocalText,
        description: doc.description as LocalText,
        fileUrl: file?.url || (doc.externalUrl ? String(doc.externalUrl) : undefined),
        verification: verification?.status ?? "verified",
        updatedAt: doc.updatedAt ? String(doc.updatedAt) : undefined,
      };
    });
  } catch {
    return defaultPublications;
  }
}
