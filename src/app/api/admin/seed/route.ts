import { NextResponse } from "next/server";
import path from "node:path";
import fs from "node:fs";
import { events } from "@/content/events";
import { speeches } from "@/content/speeches";
import { initiatives } from "@/content/initiatives";
import { parliamentActivities } from "@/content/parliament";
import { timeline } from "@/content/timeline";
import { newsArticles } from "@/content/news";
import { publications } from "@/content/publications";
import { contactInfo } from "@/content/contact";

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
      media: 0,
      globals: 0,
      deletedDemoItems: 0,
    };

    // 0. Clean up any demo / sample / test items
    try {
      const oldNews = await payload.find({
        collection: "news",
        where: { slug: { contains: "sample" } },
        limit: 100,
        overrideAccess: true,
      });
      for (const doc of oldNews.docs) {
        await payload.delete({ collection: "news", id: doc.id, overrideAccess: true });
        results.deletedDemoItems++;
      }

      const oldPubs = await payload.find({
        collection: "publications",
        where: {
          or: [
            { slug: { equals: "budget-response-note" } },
            { slug: { equals: "constituency-report-2026" } },
          ],
        },
        limit: 100,
        overrideAccess: true,
      });
      for (const doc of oldPubs.docs) {
        await payload.delete({ collection: "publications", id: doc.id, overrideAccess: true });
        results.deletedDemoItems++;
      }

      const testReqs = await payload.find({
        collection: "citizen-requests",
        where: {
          or: [
            { ref: { contains: "TEST" } },
            { phone: { equals: "01711998877" } },
          ],
        },
        limit: 100,
        overrideAccess: true,
      });
      for (const doc of testReqs.docs) {
        await payload.delete({ collection: "citizen-requests", id: doc.id, overrideAccess: true });
        results.deletedDemoItems++;
      }
    } catch (cleanupErr) {
      console.warn("Cleanup warning:", cleanupErr);
    }

    // 1. Seed Real Events
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
        endDate: item.endDate,
        title: { bn: item.title.bn, en: item.title.en },
        location: { bn: item.location.bn, en: item.location.en },
        description: { bn: item.description.bn, en: item.description.en },
        confirmedByOrganiser: true,
        verification: { status: "verified" as const, note: "Official engagement" },
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

    // 2. Seed Real Speeches
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

    // 3. Seed Real Initiatives
    for (const item of initiatives) {
      const existing = await payload.find({
        collection: "initiatives",
        where: { slug: { equals: item.slug } },
        limit: 1,
        overrideAccess: true,
      });

      const initData = {
        slug: item.slug,
        category: item.category.bn,
        status: item.status,
        startDate: item.startDate,
        location: { bn: item.location.bn, en: item.location.en },
        title: { bn: item.title.bn, en: item.title.en },
        excerpt: { bn: item.excerpt.bn, en: item.excerpt.en },
        body: item.body.map((p) => ({
          paragraph: { bn: p.bn, en: p.en },
        })),
        updates: item.updates.map((u) => ({
          date: u.date,
          text: { bn: u.text.bn, en: u.text.en },
        })),
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

    // 4. Seed Real Parliament Activities
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
        body: item.body.map((p) => ({
          paragraph: { bn: p.bn, en: p.en },
        })),
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

    // 5. Seed Real Timeline Milestones
    let order = 1;
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
        verification: { status: "verified" as const, note: "Historical milestone" },
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

    // 6. Seed Real News Articles
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
        verification: { status: "verified" as const, note: "Official news release" },
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

    // 7. Seed Real Publications
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

    // 8. Seed Real Media Gallery Photos
    const mediaFiles = [
      {
        filename: "nur-official-2026.jpg",
        altBn: "জাতীয় সংসদ সদস্য ও সাবেক ডাকসু ভিপি নুরুল হক নুরের আনুষ্ঠানিক প্রতিকৃতি",
        altEn: "Official Portrait of Md. Nurul Haque, MP",
      },
      {
        filename: "brazil-embassy-1.jpg",
        altBn: "ব্রাজিল অ্যাম্বাসি আয়োজিত বর্ষপূর্তি উদযাপন অনুষ্ঠানে আমন্ত্রিত অতিথি হিসেবে ভিপি নুরুল হক নুর",
        altEn: "VP Nurul Haque Nur at Brazil Embassy Anniversary Reception",
      },
      {
        filename: "parliament-oath.jpg",
        altBn: "জাতীয় সংসদ ভবনে সংসদ সদস্য হিসেবে শপথ গ্রহণ অনুষ্ঠান",
        altEn: "Oath Taking as Member of Parliament at Jatiya Sangsad Bhaban",
      },
      {
        filename: "meeting-federation.jpg",
        altBn: "বাংলাদেশ এমপ্লয়ার্স ফেডারেশনের সাথে কর্মসংস্থান ও শিল্প খাত বিষয়ক মতবিনিময় সভা",
        altEn: "Meeting with Leaders of Bangladesh Employers Federation",
      },
      {
        filename: "nur-2024.jpg",
        altBn: "ছাত্র-জনতার আন্দোলন ও নাগরিক তৎপরতার আলোকচিত্র",
        altEn: "Portrait during civic and democratic movements",
      },
      {
        filename: "initiative-expatriate-hospital.jpg",
        altBn: "প্রবাসী কর্মী ও রেমিট্যান্স যোদ্ধাদের বিশেষায়িত হাসপাতাল উদ্যোগের নকশা",
        altEn: "Specialized Expatriate Hospital Complex Masterplan",
      },
    ];

    for (const m of mediaFiles) {
      const existing = await payload.find({
        collection: "media",
        where: { altEn: { equals: m.altEn } },
        limit: 1,
        overrideAccess: true,
      });

      if (existing.docs.length === 0) {
        const filePath = path.resolve(process.cwd(), "public/images", m.filename);
        if (fs.existsSync(filePath)) {
          await payload.create({
            collection: "media",
            data: {
              altBn: m.altBn,
              altEn: m.altEn,
              caption: { bn: m.altBn, en: m.altEn },
              verification: { status: "verified" as const, note: "Authentic archive photo" },
            },
            filePath,
            user: adminUser,
            overrideAccess: true,
          });
          results.media++;
        }
      } else {
        results.media++;
      }
    }

    // 9. Seed Globals: Homepage Settings, Contact Info, Social Links
    try {
      await payload.updateGlobal({
        slug: "homepage-settings",
        data: {
          heroDesignation: {
            bn: "মাননীয় প্রতিমন্ত্রী, প্রবাসী কল্যাণ ও বৈদেশিক কর্মসংস্থান মন্ত্রণালয়",
            en: "Hon'ble State Minister, Ministry of Expatriates' Welfare & Overseas Employment",
          },
          heroIntro: {
            bn: "গণপ্রজাতন্ত্রী বাংলাদেশ সরকারের প্রবাসী কল্যাণ ও বৈদেশিক কর্মসংস্থান মন্ত্রণালয়ের মাননীয় প্রতিমন্ত্রী এবং পটুয়াখালী-৩ (গালাচিপা ও দশমিনা) আসনের জাতীয় সংসদ সদস্য মোঃ নুরুল হক (ভিপি নুর)–এর অফিশিয়াল পাবলিক পোর্টাল।",
            en: "Official public portal of Md. Nurul Haque, MP (VP Nur), Hon'ble State Minister for Expatriates' Welfare and Overseas Employment, and Member of Parliament for Patuakhali-3.",
          },
          heroNote: {
            bn: "প্রবাসী কর্মীদের অধিকার সুরক্ষা, অভিবাসন ব্যয় হ্রাস এবং উপকূলীয় অঞ্চলের টেকসই উন্নয়নে নিরবচ্ছিন্ন প্রচেষ্টা।",
            en: "Dedicated to protecting expatriate workers' rights, reducing migration costs, and sustainable development for coastal Bangladesh.",
          },
        },
        overrideAccess: true,
      });

      await payload.updateGlobal({
        slug: "contact-info",
        data: {
          officeAddress: {
            bn: contactInfo.officeAddress?.bn || "প্রবাসী কল্যাণ ভবন (লেভেল ৭), ৭১–৭২ পুরাতন এলিফ্যান্ট রোড, ইস্কাটন গার্ডেন, রমনা, ঢাকা–১০০০",
            en: contactInfo.officeAddress?.en || "Probashi Kallyan Bhaban (Level 7), 71–72 Old Elephant Road, Eskaton Garden, Ramna, Dhaka-1000",
          },
          phone: contactInfo.phone || "+880 2-48317711",
          email: contactInfo.email || "minister@probashi.gov.bd",
          officeHours: {
            bn: contactInfo.officeHours?.bn || "রবিবার থেকে বৃহস্পতিবার: সকাল ৯:০০ — বিকাল ৫:০০ (সরকারি ছুটির দিন ব্যতীত)",
            en: contactInfo.officeHours?.en || "Sunday to Thursday: 9:00 AM — 5:00 PM (Closed on public holidays)",
          },
          mapEmbedUrl: contactInfo.mapEmbedUrl || "",
          mapLink: contactInfo.mapLink || "",
        },
        overrideAccess: true,
      });

      await payload.updateGlobal({
        slug: "social-links",
        data: {
          links: contactInfo.socials.map((s) => ({
            id: s.id,
            label: s.label,
            url: s.url || `https://${s.id}.com`,
          })),
        },
        overrideAccess: true,
      });

      results.globals = 3;
    } catch (globalErr) {
      console.warn("Globals seed warning:", globalErr);
    }

    return NextResponse.json({
      success: true,
      message: "All real website content successfully synced to Payload CMS admin panel!",
      results,
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
