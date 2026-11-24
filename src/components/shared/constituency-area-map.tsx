"use client";

import { useState } from "react";
import { MapPin, Layers, ExternalLink, ShieldCheck, Waves } from "lucide-react";
import type { Locale } from "@/i18n/config";

interface ConstituencyAreaMapProps {
  locale: Locale;
  className?: string;
}

type ActiveView = "all" | "galachipa" | "dashmina" | "live";

export function ConstituencyAreaMap({ locale, className = "" }: ConstituencyAreaMapProps) {
  const bn = locale === "bn";
  const [activeView, setActiveView] = useState<ActiveView>("all");
  const [hoveredUpazila, setHoveredUpazila] = useState<string | null>(null);

  const isGalachipaActive = activeView === "all" || activeView === "galachipa";
  const isDashminaActive = activeView === "all" || activeView === "dashmina";

  return (
    <div
      className={`relative flex flex-col overflow-hidden rounded-[2px] border border-line bg-white shadow-xs ${className}`}
    >
      {/* Top Filter & Control Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line bg-[#f8faf7] px-3.5 py-2.5 sm:px-4">
        <div className="flex items-center gap-1.5">
          <Layers className="h-4 w-4 text-forest" />
          <span className="text-[12px] font-bold text-forest">
            {bn ? "নির্বাচনী এলাকা সীমানা" : "Constituency Area Boundary"}
          </span>
        </div>

        {/* View Switcher Pills */}
        <div className="flex flex-wrap items-center gap-1 text-[11px] font-semibold">
          <button
            type="button"
            onClick={() => setActiveView("all")}
            className={`rounded-[2px] px-2.5 py-1 transition-colors ${
              activeView === "all"
                ? "bg-forest text-gold"
                : "bg-white text-body hover:bg-forest/10 hover:text-forest border border-line"
            }`}
          >
            {bn ? "সমগ্র পটুয়াখালী-৩" : "All Patuakhali-3"}
          </button>
          <button
            type="button"
            onClick={() => setActiveView("galachipa")}
            className={`rounded-[2px] px-2.5 py-1 transition-colors ${
              activeView === "galachipa"
                ? "bg-forest text-gold"
                : "bg-white text-body hover:bg-forest/10 hover:text-forest border border-line"
            }`}
          >
            {bn ? "গালাচিপা" : "Galachipa"}
          </button>
          <button
            type="button"
            onClick={() => setActiveView("dashmina")}
            className={`rounded-[2px] px-2.5 py-1 transition-colors ${
              activeView === "dashmina"
                ? "bg-forest text-gold"
                : "bg-white text-body hover:bg-forest/10 hover:text-forest border border-line"
            }`}
          >
            {bn ? "দশমিনা" : "Dashmina"}
          </button>
          <button
            type="button"
            onClick={() => setActiveView("live")}
            className={`rounded-[2px] px-2.5 py-1 transition-colors ${
              activeView === "live"
                ? "bg-forest text-gold"
                : "bg-white text-body hover:bg-forest/10 hover:text-forest border border-line"
            }`}
          >
            {bn ? "স্যাটেলাইট মানচিত্র" : "Satellite Map"}
          </button>
        </div>
      </div>

      {/* Main Map Canvas */}
      <div className="relative min-h-[340px] w-full flex-1 bg-[#eef4f0] sm:min-h-[400px]">
        {activeView === "live" ? (
          /* Live OpenStreetMap view framed over the bounding box of Patuakhali-3 WITHOUT a point marker pin */
          <div className="relative h-full w-full">
            <iframe
              title={bn ? "পটুয়াখালী-৩ অঞ্চল মানচিত্র" : "Patuakhali-3 Area Map"}
              src="https://www.openstreetmap.org/export/embed.html?bbox=90.25%2C21.85%2C90.75%2C22.45&layer=mapnik"
              className="h-full min-h-[380px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            {/* Visual boundary overlay frame indicating selected zone */}
            <div className="pointer-events-none absolute inset-4 rounded-[2px] border-2 border-dashed border-forest/60 bg-forest/5 backdrop-blur-[0.5px]">
              <div className="absolute top-2 left-2 rounded-[2px] bg-forest-ink/90 px-2.5 py-1 text-[11px] font-bold text-white shadow-sm">
                {bn
                  ? "পটুয়াখালী-৩ (গালাচিপা ও দশমিনা অঞ্চল)"
                  : "Patuakhali-3 Area (Galachipa & Dashmina)"}
              </div>
            </div>
          </div>
        ) : (
          /* Interactive High-Detail Vector Boundary & Territory Map */
          <div className="relative flex h-full min-h-[380px] w-full items-center justify-center p-2 sm:p-4">
            <svg
              viewBox="0 0 620 500"
              className="h-full max-h-[430px] w-full select-none"
              aria-label="Patuakhali-3 Constituency Territory Map"
            >
              <defs>
                {/* Patterns & Gradients */}
                <linearGradient id="waterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#dbeafe" />
                  <stop offset="100%" stopColor="#bfdbfe" />
                </linearGradient>

                <linearGradient id="galachipaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={isGalachipaActive ? "#1e5c45" : "#a1b8aa"} />
                  <stop offset="100%" stopColor={isGalachipaActive ? "#144433" : "#849e8e"} />
                </linearGradient>

                <linearGradient id="dashminaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={isDashminaActive ? "#266b51" : "#a1b8aa"} />
                  <stop offset="100%" stopColor={isDashminaActive ? "#174d39" : "#849e8e"} />
                </linearGradient>

                {/* Grid background */}
                <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                  <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#d5e2d8" strokeWidth="0.75" />
                </pattern>

                <filter id="glow" x="-10%" y="-10%" width="120%" height="120%">
                  <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#0f3d2e" floodOpacity="0.25" />
                </filter>
              </defs>

              {/* Background ambient water & grid */}
              <rect width="620" height="500" fill="url(#grid)" />

              {/* Surrounding Regions Labels */}
              <text x="210" y="55" className="fill-[#6e8574] text-[12px] font-bold tracking-widest uppercase">
                {bn ? "বাউফল উপজেলা (উত্তরে)" : "Bauphal Upazila (North)"}
              </text>
              <text x="35" y="240" className="fill-[#6e8574] text-[11px] font-bold tracking-widest uppercase">
                {bn ? "পটুয়াখালী সদর ও আমতলী" : "Patuakhali Sadar & Amtali"}
              </text>
              <text x="490" y="210" className="fill-[#3b82f6] text-[11px] font-bold tracking-widest uppercase">
                {bn ? "তেঁতুলিয়া নদী ও ভোলা জেলা" : "Tetulia River & Bhola"}
              </text>
              <text x="250" y="480" className="fill-[#2563eb] text-[12px] font-bold tracking-widest uppercase">
                {bn ? "বঙ্গোপসাগর (দক্ষিণে)" : "Bay of Bengal (South)"}
              </text>

              {/* Major Water Channels & Rivers */}
              {/* Tetulia River Channel (East) */}
              <path
                d="M 440 0 C 470 120, 480 260, 560 500 L 620 500 L 620 0 Z"
                fill="url(#waterGrad)"
                opacity="0.8"
              />
              {/* South Estuary / Bay of Bengal */}
              <path
                d="M 0 450 Q 220 420, 390 440 T 620 460 L 620 500 L 0 500 Z"
                fill="url(#waterGrad)"
                opacity="0.85"
              />
              {/* Western River Arm (Rabnabad / Galachipa River) */}
              <path
                d="M 120 160 Q 150 240, 130 350 Q 120 420, 140 460"
                fill="none"
                stroke="#93c5fd"
                strokeWidth="7"
                strokeLinecap="round"
                opacity="0.9"
              />

              {/* TERRITORY 1: DASHMINA UPAZILA (North-East Polygon) */}
              <g
                className="cursor-pointer transition-all duration-300"
                onMouseEnter={() => setHoveredUpazila("dashmina")}
                onMouseLeave={() => setHoveredUpazila(null)}
                onClick={() => setActiveView(activeView === "dashmina" ? "all" : "dashmina")}
              >
                <path
                  d="M 285 75 
                     L 380 65 
                     Q 430 110, 450 170 
                     L 410 230 
                     L 330 215 
                     L 290 150 
                     Z"
                  fill="url(#dashminaGrad)"
                  stroke={isDashminaActive ? "#104030" : "#71897c"}
                  strokeWidth={isDashminaActive ? "3" : "1.5"}
                  filter={isDashminaActive ? "url(#glow)" : undefined}
                  className="transition-all duration-300"
                />
                {/* Dashmina Upazila Center Marker & Label */}
                <circle cx="365" cy="145" r="5" fill="#facc15" stroke="#144433" strokeWidth="2" />
                <rect
                  x="315"
                  y="160"
                  width="100"
                  height="22"
                  rx="3"
                  fill="#0e3325"
                  opacity="0.9"
                />
                <text
                  x="365"
                  y="175"
                  textAnchor="middle"
                  className="fill-white text-[11px] font-bold tracking-wide"
                >
                  {bn ? "দশমিনা উপজেলা" : "Dashmina Upazila"}
                </text>
              </g>

              {/* TERRITORY 2: GALACHIPA UPAZILA (Center & South Coastal Polygon) */}
              <g
                className="cursor-pointer transition-all duration-300"
                onMouseEnter={() => setHoveredUpazila("galachipa")}
                onMouseLeave={() => setHoveredUpazila(null)}
                onClick={() => setActiveView(activeView === "galachipa" ? "all" : "galachipa")}
              >
                <path
                  d="M 220 120 
                     L 290 150 
                     L 330 215 
                     L 410 230 
                     L 435 320 
                     Q 420 395, 380 430 
                     L 270 425 
                     Q 200 410, 165 340 
                     L 155 230 
                     Z"
                  fill="url(#galachipaGrad)"
                  stroke={isGalachipaActive ? "#104030" : "#71897c"}
                  strokeWidth={isGalachipaActive ? "3.5" : "1.5"}
                  filter={isGalachipaActive ? "url(#glow)" : undefined}
                  className="transition-all duration-300"
                />

                {/* Coastal Island / Char Extension (Char Kajal & Char Biswas) */}
                <path
                  d="M 395 330 Q 440 370, 420 420 Q 380 440, 395 330 Z"
                  fill={isGalachipaActive ? "#19523d" : "#8aa393"}
                  stroke="#104030"
                  strokeWidth="1.5"
                />
                <text x="415" y="375" className="fill-[#e2e8f0] text-[9.5px] font-semibold">
                  {bn ? "চর কাজল" : "Char Kajal"}
                </text>

                {/* Galachipa Upazila Center Marker & Label */}
                <circle cx="270" cy="260" r="5" fill="#facc15" stroke="#144433" strokeWidth="2" />
                <rect
                  x="200"
                  y="278"
                  width="140"
                  height="24"
                  rx="3"
                  fill="#0e3325"
                  opacity="0.9"
                />
                <text
                  x="270"
                  y="294"
                  textAnchor="middle"
                  className="fill-white text-[12px] font-bold tracking-wide"
                >
                  {bn ? "গালাচিপা উপজেলা ও পৌরসভা" : "Galachipa Municipality & Upazila"}
                </text>
              </g>

              {/* Boundary dividing Galachipa & Dashmina */}
              <path
                d="M 290 150 L 330 215 L 410 230"
                fill="none"
                stroke="#facc15"
                strokeWidth="2.5"
                strokeDasharray="4 3"
              />

              {/* Compass Rose Accent */}
              <g transform="translate(560, 45)">
                <circle cx="0" cy="0" r="18" fill="white" stroke="#cbd5e1" strokeWidth="1" />
                <path d="M 0 -13 L 4 0 L 0 3 L -4 0 Z" fill="#b91c1c" />
                <path d="M 0 13 L 4 0 L 0 -3 L -4 0 Z" fill="#64748b" />
                <text x="0" y="-15" textAnchor="middle" className="fill-[#b91c1c] text-[9px] font-bold">
                  N
                </text>
              </g>
            </svg>

            {/* Bottom Floating Info Badge */}
            <div className="absolute bottom-3 inset-x-3 z-10 flex flex-wrap items-center justify-between gap-2 rounded-[2px] border border-line bg-white/95 px-3.5 py-2.5 shadow-md backdrop-blur-xs sm:px-4">
              <div className="flex items-center gap-2.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-[2px] bg-forest/10 text-forest">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <p className="bn-heading text-[13px] font-bold text-forest">
                    {hoveredUpazila === "dashmina" || activeView === "dashmina"
                      ? bn
                        ? "দশমিনা উপজেলা (আয়তন: ৩৬৩ বর্গ কিমি · ৭টি ইউনিয়ন)"
                        : "Dashmina Upazila (Area: 363 sq km · 7 Unions)"
                      : hoveredUpazila === "galachipa" || activeView === "galachipa"
                        ? bn
                          ? "গালাচিপা উপজেলা (আয়তন: ১,২৬৩ বর্গ কিমি · ১টি পৌরসভা, ১২টি ইউনিয়ন)"
                          : "Galachipa Upazila (Area: 1,263 sq km · 1 Municipality, 12 Unions)"
                        : bn
                          ? "পটুয়াখালী-৩ আসন (গালাচিপা ও দশমিনা উপজেলা সমন্বিত অঞ্চল · ১৬২৬+ বর্গ কিমি)"
                          : "Patuakhali-3 Seat (Galachipa & Dashmina Combined · 1,626+ sq km)"}
                  </p>
                  <p className="text-[11px] text-muted">
                    {bn
                      ? "উপকূলীয় নদী ও চর বেষ্টিত নির্বাচনী এলাকা · তেঁতুলিয়া ও আগুনমুখা অববাহিকা"
                      : "Coastal riverine constituency · Tetulia & Agunmukha river delta"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-muted">
                <span className="inline-flex items-center gap-1">
                  <span className="h-2.5 w-2.5 rounded-full bg-forest" />
                  {bn ? "নির্বাচিত এলাকা" : "Selected Area"}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Waves className="h-3 w-3 text-blue-500" />
                  {bn ? "নদী ও উপকূল" : "Rivers & Coast"}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Footer Info Strip */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line bg-white px-4 py-2.5 text-[12px] text-muted">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-forest" />
          <span>
            {bn
              ? "পটুয়াখালী-৩: ১টি পৌরসভা এবং ১৯টি ইউনিয়নের সমন্বয়ে গঠিত"
              : "Patuakhali-3: Comprising 1 Municipality and 19 Unions"}
          </span>
        </div>

        <a
          href="https://www.openstreetmap.org/#map=10/22.18/90.50"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-semibold text-forest hover:underline"
        >
          <span>{bn ? "পূর্ণ ভৌগোলিক ম্যাপ দেখুন" : "View Full Geography Map"}</span>
          <ExternalLink className="h-3.5 w-3.5 text-gold" />
        </a>
      </div>
    </div>
  );
}
