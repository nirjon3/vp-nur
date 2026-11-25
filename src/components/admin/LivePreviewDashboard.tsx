/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";

interface LivePageItem {
  icon: string;
  name: string;
  changesWhat: string;
  adminHref: string;
  websiteHref: string;
}

const livePages: LivePageItem[] = [
  {
    icon: "🏠",
    name: "Homepage Banner",
    changesWhat: "Main website hero header, title, designation & portrait photo",
    adminHref: "/admin/globals/homepage-settings",
    websiteHref: "/bn",
  },
  {
    icon: "📰",
    name: "News Articles",
    changesWhat: "News page articles & Homepage latest news cards",
    adminHref: "/admin/collections/news",
    websiteHref: "/bn/news",
  },
  {
    icon: "🎙️",
    name: "Speeches & Videos",
    changesWhat: "Video speeches, interview archives & transcripts",
    adminHref: "/admin/collections/speeches",
    websiteHref: "/bn/speeches",
  },
  {
    icon: "📅",
    name: "Events & Schedule",
    changesWhat: "Rallies, upcoming tours, and public calendar",
    adminHref: "/admin/collections/events",
    websiteHref: "/bn/events",
  },
  {
    icon: "🚀",
    name: "Initiatives & Projects",
    changesWhat: "Constituency development projects & progress",
    adminHref: "/admin/collections/initiatives",
    websiteHref: "/bn/initiatives",
  },
  {
    icon: "🏛️",
    name: "Parliament Activities",
    changesWhat: "Parliament speeches, Q&A, bills, and motions",
    adminHref: "/admin/collections/parliament-activities",
    websiteHref: "/bn/parliament",
  },
  {
    icon: "🖼️",
    name: "Photo Gallery",
    changesWhat: "Gallery photos & homepage photo carousel (Cloudinary CDN)",
    adminHref: "/admin/collections/media",
    websiteHref: "/bn/media",
  },
  {
    icon: "⏳",
    name: "Political Milestones",
    changesWhat: "Biography timeline on About page (DUCSU, 2024)",
    adminHref: "/admin/collections/timeline-milestones",
    websiteHref: "/bn/about",
  },
  {
    icon: "📍",
    name: "Contact & Office Info",
    changesWhat: "Public office location, phone, email & Google Map",
    adminHref: "/admin/globals/contact-info",
    websiteHref: "/bn/contact",
  },
  {
    icon: "🚩",
    name: "GOP (গণ অধিকার পরিষদ)",
    changesWhat: "Party ideology, EC registration 051, truck symbol & gonoodhikar.com link",
    adminHref: "/admin",
    websiteHref: "/bn/gop",
  },
  {
    icon: "📩",
    name: "Citizen Requests",
    changesWhat: "Incoming public inquiries (tracked at /services/track)",
    adminHref: "/admin/collections/citizen-requests",
    websiteHref: "/bn/services",
  },
];

const featuredSpeeches = [
  {
    id: 1,
    titleEn: "Nur Appeals to Opposition Parties and Youth to Support the Government",
    titleBn: "সরকারকে সহযোগিতা করার জন্য বিরোধী দল ও যুবসমাজের প্রতি নুরের আহ্বান",
    youtubeId: "blkMc46W0rU",
    videoUrl: "https://www.youtube.com/watch?v=blkMc46W0rU",
    date: "2026-04-29",
    duration: "18 min",
  },
  {
    id: 2,
    titleEn: "VP Nur's Address at Patuakhali-3 Public Rally",
    titleBn: "পটুয়াখালী-৩ জনসভায় ভিপি নুরের দিকনির্দেশনামূলক ভাষণ",
    youtubeId: "fDJ4PlJOtIs",
    videoUrl: "https://www.youtube.com/watch?v=fDJ4PlJOtIs",
    date: "2026-01-25",
    duration: "24 min",
  },
  {
    id: 3,
    titleEn: "Exclusive Interview on Contemporary Politics — Channel 24",
    titleBn: "সমসাময়িক রাজনীতি নিয়ে বিশেষ সাক্ষাৎকার — চ্যানেল ২৪",
    youtubeId: "AiotBcTVut0",
    videoUrl: "https://www.youtube.com/watch?v=AiotBcTVut0",
    date: "2024-09-15",
    duration: "32 min",
  },
  {
    id: 4,
    titleEn: "Face-to-Face with Khaled Muhiuddin — Nurul Haque Nur",
    titleBn: "খালেদ মুহিউদ্দীনের সাথে মুখোমুখি — নুরুল হক নুর",
    youtubeId: "gg9xbqoyomc",
    videoUrl: "https://www.youtube.com/watch?v=gg9xbqoyomc",
    date: "2024-08-20",
    duration: "45 min",
  },
];

const featuredPhotos = [
  {
    id: 1,
    filename: "nur-official-2026.jpg",
    altEn: "Official Portrait of Md. Nurul Hoque, MP",
    altBn: "জাতীয় সংসদ সদস্য মো. নুরুল হক নুরের অফিশিয়াল প্রতিকৃতি",
    badge: "Official Portrait",
  },
  {
    id: 2,
    filename: "brazil-embassy-1.jpg",
    altEn: "VP Nurul Haque Nur at Brazil Embassy Anniversary Reception",
    altBn: "ঢাকায় ব্রাজিল দূতাবাসের বার্ষিকী সংবর্ধনায় ভিপি নুরুল হক নুর",
    badge: "Diplomatic Event",
  },
  {
    id: 3,
    filename: "parliament-oath.jpg",
    altEn: "Oath Taking as Member of Parliament at Jatiya Sangsad Bhaban",
    altBn: "জাতীয় সংসদ ভবনে শপথ গ্রহণ অনুষ্ঠান",
    badge: "Parliament",
  },
  {
    id: 4,
    filename: "meeting-federation.jpg",
    altEn: "Meeting with Leaders of Bangladesh Employers Federation",
    altBn: "বাংলাদেশ এমপ্লয়ার্স ফেডারেশনের নেতৃবৃন্দের সাথে মতবিনিময়",
    badge: "Meeting",
  },
];

export function LivePreviewDashboard() {
  return (
    <div
      style={{
        marginBottom: "36px",
        display: "flex",
        flexDirection: "column",
        gap: "28px",
      }}
    >
      {/* Top Banner & Integration Status */}
      <div
        style={{
          padding: "24px 28px",
          borderRadius: "14px",
          border: "1px solid var(--theme-elevation-150, #e2e8f0)",
          backgroundColor: "var(--theme-elevation-50, #f8fafc)",
          boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "28px" }}>🌐</span>
              <h1
                style={{
                  margin: 0,
                  fontSize: "22px",
                  fontWeight: 800,
                  letterSpacing: "-0.01em",
                  color: "var(--theme-text, #0f172a)",
                }}
              >
                VP Nur Official Admin Center
              </h1>
            </div>
            <p
              style={{
                margin: "8px 0 0 0",
                fontSize: "14px",
                color: "var(--theme-elevation-600, #64748b)",
                lineHeight: 1.5,
              }}
            >
              Control website content, preview videos & photos upfront, and manage Cloudinary & Supabase data.
            </p>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", alignItems: "center" }}>
            <a
              href="/bn"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 18px",
                fontSize: "14px",
                fontWeight: 600,
                color: "#ffffff",
                backgroundColor: "#166534",
                borderRadius: "8px",
                textDecoration: "none",
                boxShadow: "0 2px 4px rgba(22, 101, 52, 0.2)",
              }}
            >
              <span>🌐 View Live Website</span>
              <span style={{ fontSize: "16px" }}>↗</span>
            </a>
          </div>
        </div>

        {/* Live System Integration Badges */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            marginTop: "18px",
            paddingTop: "16px",
            borderTop: "1px solid var(--theme-elevation-150, #e2e8f0)",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "5px 12px",
              fontSize: "12.5px",
              fontWeight: 600,
              color: "#065f46",
              backgroundColor: "#d1fae5",
              borderRadius: "20px",
              border: "1px solid #a7f3d0",
            }}
          >
            <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#10b981" }} />
            <span>Cloudinary CDN: htosybxj (Active)</span>
          </div>

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "5px 12px",
              fontSize: "12.5px",
              fontWeight: 600,
              color: "#1e40af",
              backgroundColor: "#dbeafe",
              borderRadius: "20px",
              border: "1px solid #bfdbfe",
            }}
          >
            <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#3b82f6" }} />
            <span>Supabase Database: Connected (Postgres 17)</span>
          </div>

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "5px 12px",
              fontSize: "12.5px",
              fontWeight: 600,
              color: "#374151",
              backgroundColor: "#f3f4f6",
              borderRadius: "20px",
              border: "1px solid #e5e7eb",
            }}
          >
            <span>👤 Logged in as: <strong>admin</strong> (Super Admin)</span>
          </div>
        </div>
      </div>

      {/* SECTION 1: VIDEOS & SPEECHES SHOWCASE */}
      <div
        style={{
          padding: "24px",
          borderRadius: "14px",
          border: "1px solid var(--theme-elevation-150, #e2e8f0)",
          backgroundColor: "var(--theme-bg, #ffffff)",
          boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "18px",
            gap: "12px",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "22px" }}>🎬</span>
              <h2
                style={{
                  margin: 0,
                  fontSize: "18px",
                  fontWeight: 700,
                  color: "var(--theme-text, #0f172a)",
                }}
              >
                Speeches & Video Archive (সরাসরি ভিডিও)
              </h2>
            </div>
            <p
              style={{
                margin: "4px 0 0 0",
                fontSize: "13px",
                color: "var(--theme-elevation-600, #64748b)",
              }}
            >
              Watch video speeches directly here — click Play to watch or Edit to update details.
            </p>
          </div>

          <div style={{ display: "flex", gap: "8px" }}>
            <Link
              href="/admin/collections/speeches"
              style={{
                padding: "7px 14px",
                fontSize: "13px",
                fontWeight: 600,
                color: "#166534",
                backgroundColor: "#f0fdf4",
                borderRadius: "6px",
                border: "1px solid #bbf7d0",
                textDecoration: "none",
              }}
            >
              🎙️ View All Speeches (7)
            </Link>
            <Link
              href="/admin/collections/speeches/create"
              style={{
                padding: "7px 14px",
                fontSize: "13px",
                fontWeight: 600,
                color: "#ffffff",
                backgroundColor: "#166534",
                borderRadius: "6px",
                textDecoration: "none",
              }}
            >
              + Add New Video
            </Link>
          </div>
        </div>

        {/* Video Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "16px",
          }}
        >
          {featuredSpeeches.map((speech) => (
            <div
              key={speech.id}
              style={{
                borderRadius: "10px",
                border: "1px solid var(--theme-elevation-150, #e2e8f0)",
                backgroundColor: "var(--theme-elevation-50, #f8fafc)",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                transition: "box-shadow 0.2s ease",
              }}
            >
              {/* Thumbnail Container */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "16/9",
                  backgroundColor: "#000000",
                }}
              >
                <img
                  src={`https://img.youtube.com/vi/${speech.youtubeId}/mqdefault.jpg`}
                  alt={speech.titleEn}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
                <span
                  style={{
                    position: "absolute",
                    bottom: "8px",
                    right: "8px",
                    backgroundColor: "rgba(0,0,0,0.8)",
                    color: "#ffffff",
                    fontSize: "11px",
                    fontWeight: 600,
                    padding: "2px 6px",
                    borderRadius: "4px",
                  }}
                >
                  ⏱️ {speech.duration}
                </span>
                <span
                  style={{
                    position: "absolute",
                    top: "8px",
                    left: "8px",
                    backgroundColor: "rgba(22, 101, 52, 0.9)",
                    color: "#ffffff",
                    fontSize: "11px",
                    fontWeight: 600,
                    padding: "2px 8px",
                    borderRadius: "4px",
                  }}
                >
                  📅 {speech.date}
                </span>
              </div>

              {/* Video Content & Controls */}
              <div
                style={{
                  padding: "14px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  flexGrow: 1,
                  gap: "12px",
                }}
              >
                <div>
                  <h3
                    style={{
                      margin: "0 0 6px 0",
                      fontSize: "13.5px",
                      fontWeight: 700,
                      lineHeight: 1.4,
                      color: "var(--theme-text, #0f172a)",
                    }}
                  >
                    {speech.titleEn}
                  </h3>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "12px",
                      color: "var(--theme-elevation-600, #64748b)",
                      lineHeight: 1.4,
                    }}
                  >
                    {speech.titleBn}
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingTop: "10px",
                    borderTop: "1px solid var(--theme-elevation-100, #f1f5f9)",
                    gap: "8px",
                  }}
                >
                  <a
                    href={speech.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "#dc2626",
                      backgroundColor: "#fef2f2",
                      border: "1px solid #fee2e2",
                      padding: "5px 10px",
                      borderRadius: "6px",
                      textDecoration: "none",
                    }}
                  >
                    <span>▶ Watch</span>
                    <span>↗</span>
                  </a>

                  <Link
                    href={`/admin/collections/speeches/${speech.id}`}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "#166534",
                      padding: "5px 10px",
                      borderRadius: "6px",
                      backgroundColor: "#f0fdf4",
                      border: "1px solid #bbf7d0",
                      textDecoration: "none",
                    }}
                  >
                    <span>✏️ Edit</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2: PHOTO GALLERY SHOWCASE */}
      <div
        style={{
          padding: "24px",
          borderRadius: "14px",
          border: "1px solid var(--theme-elevation-150, #e2e8f0)",
          backgroundColor: "var(--theme-bg, #ffffff)",
          boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "18px",
            gap: "12px",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "22px" }}>📸</span>
              <h2
                style={{
                  margin: 0,
                  fontSize: "18px",
                  fontWeight: 700,
                  color: "var(--theme-text, #0f172a)",
                }}
              >
                Photo Gallery Showcase (সরাসরি ছবি)
              </h2>
            </div>
            <p
              style={{
                margin: "4px 0 0 0",
                fontSize: "13px",
                color: "var(--theme-elevation-600, #64748b)",
              }}
            >
              Review official photographs directly here without opening each document.
            </p>
          </div>

          <div style={{ display: "flex", gap: "8px" }}>
            <Link
              href="/admin/collections/media"
              style={{
                padding: "7px 14px",
                fontSize: "13px",
                fontWeight: 600,
                color: "#166534",
                backgroundColor: "#f0fdf4",
                borderRadius: "6px",
                border: "1px solid #bbf7d0",
                textDecoration: "none",
              }}
            >
              🖼️ View All Photos (6)
            </Link>
            <Link
              href="/admin/collections/media/create"
              style={{
                padding: "7px 14px",
                fontSize: "13px",
                fontWeight: 600,
                color: "#ffffff",
                backgroundColor: "#166534",
                borderRadius: "6px",
                textDecoration: "none",
              }}
            >
              + Upload New Photo
            </Link>
          </div>
        </div>

        {/* Photo Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "16px",
          }}
        >
          {featuredPhotos.map((photo) => (
            <div
              key={photo.id}
              style={{
                borderRadius: "10px",
                border: "1px solid var(--theme-elevation-150, #e2e8f0)",
                backgroundColor: "var(--theme-elevation-50, #f8fafc)",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                transition: "box-shadow 0.2s ease",
              }}
            >
              {/* Image Preview */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "4/3",
                  backgroundColor: "#e2e8f0",
                }}
              >
                <img
                  src={`/images/${photo.filename}`}
                  alt={photo.altEn}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
                <span
                  style={{
                    position: "absolute",
                    top: "8px",
                    left: "8px",
                    backgroundColor: "rgba(15, 23, 42, 0.8)",
                    color: "#ffffff",
                    fontSize: "11px",
                    fontWeight: 600,
                    padding: "3px 8px",
                    borderRadius: "4px",
                  }}
                >
                  {photo.badge}
                </span>
              </div>

              {/* Photo Description & Links */}
              <div
                style={{
                  padding: "14px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  flexGrow: 1,
                  gap: "10px",
                }}
              >
                <div>
                  <h3
                    style={{
                      margin: "0 0 4px 0",
                      fontSize: "13px",
                      fontWeight: 700,
                      lineHeight: 1.4,
                      color: "var(--theme-text, #0f172a)",
                    }}
                  >
                    {photo.altEn}
                  </h3>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "11.5px",
                      color: "var(--theme-elevation-600, #64748b)",
                      lineHeight: 1.4,
                    }}
                  >
                    {photo.altBn}
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingTop: "10px",
                    borderTop: "1px solid var(--theme-elevation-100, #f1f5f9)",
                  }}
                >
                  <span
                    style={{
                      fontSize: "11px",
                      color: "var(--theme-elevation-500, #94a3b8)",
                      fontFamily: "monospace",
                    }}
                  >
                    {photo.filename}
                  </span>

                  <Link
                    href={`/admin/collections/media/${photo.id}`}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "#166534",
                      padding: "4px 8px",
                      borderRadius: "6px",
                      backgroundColor: "#f0fdf4",
                      border: "1px solid #bbf7d0",
                      textDecoration: "none",
                    }}
                  >
                    <span>✏️ Edit Photo</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 3: WEBSITE SECTIONS & CHANGE DIRECTORY */}
      <div
        style={{
          padding: "24px",
          borderRadius: "14px",
          border: "1px solid var(--theme-elevation-150, #e2e8f0)",
          backgroundColor: "var(--theme-bg, #ffffff)",
          boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
        }}
      >
        <div style={{ marginBottom: "18px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "22px" }}>🧭</span>
            <h2
              style={{
                margin: 0,
                fontSize: "18px",
                fontWeight: 700,
                color: "var(--theme-text, #0f172a)",
              }}
            >
              Website Change Directory (কোনটি পরিবর্তন করলে ওয়েবসাইটে কী পরিবর্তন হয়)
            </h2>
          </div>
          <p
            style={{
              margin: "4px 0 0 0",
              fontSize: "13px",
              color: "var(--theme-elevation-600, #64748b)",
            }}
          >
            Click <strong>✏️ Edit Content</strong> on any item to update it, or <strong>Live Page ↗</strong> to view the real website page.
          </p>
        </div>

        {/* Directory Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))",
            gap: "14px",
          }}
        >
          {livePages.map((item) => (
            <div
              key={item.adminHref}
              style={{
                padding: "16px",
                borderRadius: "8px",
                border: "1px solid var(--theme-elevation-150, #e2e8f0)",
                backgroundColor: "var(--theme-elevation-50, #f8fafc)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "12px",
                transition: "transform 0.15s ease, box-shadow 0.15s ease",
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "4px",
                  }}
                >
                  <span style={{ fontSize: "20px" }}>{item.icon}</span>
                  <span
                    style={{
                      fontSize: "15px",
                      fontWeight: 600,
                      color: "var(--theme-text, #0f172a)",
                    }}
                  >
                    {item.name}
                  </span>
                </div>
                <p
                  style={{
                    margin: "4px 0 0 0",
                    fontSize: "12.5px",
                    color: "var(--theme-elevation-600, #64748b)",
                    lineHeight: 1.4,
                  }}
                >
                  {item.changesWhat}
                </p>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingTop: "10px",
                  borderTop: "1px solid var(--theme-elevation-100, #f1f5f9)",
                  gap: "8px",
                }}
              >
                <Link
                  href={item.adminHref}
                  style={{
                    fontSize: "12.5px",
                    fontWeight: 600,
                    color: "#166534",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <span>✏️ Edit Content</span>
                </Link>

                <a
                  href={item.websiteHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: "12px",
                    fontWeight: 500,
                    color: "var(--theme-elevation-700, #475569)",
                    backgroundColor: "var(--theme-elevation-100, #f1f5f9)",
                    padding: "4px 10px",
                    borderRadius: "6px",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <span>Live Page</span>
                  <span>↗</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
