import React from "react";

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
    changesWhat: "Main website hero header, title, and portrait photo",
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
    changesWhat: "Gallery photos & homepage photo carousel (Cloudinary)",
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
    icon: "📩",
    name: "Citizen Requests",
    changesWhat: "Incoming public inquiries (tracked at /services/track)",
    adminHref: "/admin/collections/citizen-requests",
    websiteHref: "/bn/services",
  },
];

export function LivePreviewDashboard() {
  return (
    <div
      style={{
        marginBottom: "32px",
        padding: "24px",
        borderRadius: "12px",
        border: "1px solid var(--theme-elevation-150, #e2e8f0)",
        backgroundColor: "var(--theme-elevation-50, #f8fafc)",
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
      }}
    >
      {/* Top Banner Header */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
          paddingBottom: "20px",
          borderBottom: "1px solid var(--theme-elevation-150, #e2e8f0)",
          marginBottom: "20px",
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "24px" }}>🌐</span>
            <h2
              style={{
                margin: 0,
                fontSize: "20px",
                fontWeight: 700,
                color: "var(--theme-text, #0f172a)",
              }}
            >
              Live Website & Change Directory
            </h2>
          </div>
          <p
            style={{
              margin: "6px 0 0 0",
              fontSize: "14px",
              color: "var(--theme-elevation-600, #64748b)",
              lineHeight: 1.5,
            }}
          >
            Manage any section below. When you click <strong>Save / Publish</strong>, your updates
            appear on the live website immediately!
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
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
              transition: "background 0.2s ease",
            }}
          >
            <span>🌐 View Live Website</span>
            <span style={{ fontSize: "16px" }}>↗</span>
          </a>
        </div>
      </div>

      {/* Directory Cards Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
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
              backgroundColor: "var(--theme-bg, #ffffff)",
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
              <a
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
              </a>

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
  );
}
