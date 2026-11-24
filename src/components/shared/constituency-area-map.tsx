"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import {
  MapPin,
  ExternalLink,
  ShieldCheck,
  Globe2,
  Map as MapIcon,
} from "lucide-react";
import type { Locale } from "@/i18n/config";

// Dynamically import Leaflet map component to prevent SSR window reference errors
const ConstituencyLeafletMap = dynamic(
  () => import("@/components/shared/constituency-leaflet-map"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full min-h-[380px] w-full flex-col items-center justify-center bg-[#f0f4f1] text-muted sm:min-h-[420px]">
        <div className="flex h-10 w-10 animate-spin items-center justify-center rounded-full border-2 border-forest border-t-transparent" />
        <span className="mt-3 text-[12px] font-medium text-forest">
          লাইভ মানচিত্র লোড হচ্ছে...
        </span>
      </div>
    ),
  }
);

interface ConstituencyAreaMapProps {
  locale: Locale;
  className?: string;
}

export type ActiveArea = "all" | "galachipa" | "dashmina";
export type MapType = "osm" | "satellite";

export function ConstituencyAreaMap({ locale, className = "" }: ConstituencyAreaMapProps) {
  const bn = locale === "bn";
  const [activeArea, setActiveArea] = useState<ActiveArea>("all");
  const [mapType, setMapType] = useState<MapType>("osm");

  return (
    <div
      className={`relative flex flex-col overflow-hidden rounded-[2px] border border-line bg-white shadow-xs ${className}`}
    >
      {/* Top Filter & Control Header */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 border-b border-line bg-[#f8faf7] px-3.5 py-2.5 sm:px-4">
        {/* Title */}
        <div className="flex items-center gap-1.5">
          <MapPin className="h-4 w-4 text-forest" />
          <span className="text-[12.5px] font-bold text-forest">
            {bn ? "নির্বাচনী এলাকা লাইভ মানচিত্র" : "Constituency Live Map"}
          </span>
        </div>

        {/* View Switcher Pills */}
        <div className="flex flex-wrap items-center gap-1 text-[11px] font-semibold">
          <button
            type="button"
            onClick={() => setActiveArea("all")}
            className={`rounded-[2px] px-2.5 py-1 transition-colors ${
              activeArea === "all"
                ? "bg-forest text-gold shadow-2xs"
                : "bg-white text-body hover:bg-forest/10 hover:text-forest border border-line"
            }`}
          >
            {bn ? "সমগ্র পটুয়াখালী-৩" : "All Patuakhali-3"}
          </button>
          <button
            type="button"
            onClick={() => setActiveArea("galachipa")}
            className={`rounded-[2px] px-2.5 py-1 transition-colors ${
              activeArea === "galachipa"
                ? "bg-forest text-gold shadow-2xs"
                : "bg-white text-body hover:bg-forest/10 hover:text-forest border border-line"
            }`}
          >
            {bn ? "গালাচিপা" : "Galachipa"}
          </button>
          <button
            type="button"
            onClick={() => setActiveArea("dashmina")}
            className={`rounded-[2px] px-2.5 py-1 transition-colors ${
              activeArea === "dashmina"
                ? "bg-forest text-gold shadow-2xs"
                : "bg-white text-body hover:bg-forest/10 hover:text-forest border border-line"
            }`}
          >
            {bn ? "দশমিনা" : "Dashmina"}
          </button>

          {/* Map vs Satellite Toggle */}
          <div className="ml-1 flex items-center rounded-[2px] border border-line bg-white p-0.5">
            <button
              type="button"
              onClick={() => setMapType("osm")}
              title={bn ? "ভৌগোলিক মানচিত্র" : "Geographic Map"}
              className={`flex items-center gap-1 rounded-[2px] px-2 py-0.5 text-[10.5px] font-medium transition-colors ${
                mapType === "osm"
                  ? "bg-forest text-white"
                  : "text-muted hover:text-forest"
              }`}
            >
              <MapIcon className="h-3 w-3" />
              <span>{bn ? "মানচিত্র" : "Map"}</span>
            </button>
            <button
              type="button"
              onClick={() => setMapType("satellite")}
              title={bn ? "স্যাটেলাইট দৃশ্য" : "Satellite View"}
              className={`flex items-center gap-1 rounded-[2px] px-2 py-0.5 text-[10.5px] font-medium transition-colors ${
                mapType === "satellite"
                  ? "bg-forest text-gold"
                  : "text-muted hover:text-forest"
              }`}
            >
              <Globe2 className="h-3 w-3" />
              <span>{bn ? "স্যাটেলাইট" : "Satellite"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Map Canvas Area */}
      <div className="relative min-h-[380px] w-full flex-1 bg-[#f0f4f1] sm:min-h-[420px]">
        <ConstituencyLeafletMap
          locale={locale}
          activeView={activeArea}
          mapType={mapType}
          onSelectArea={(area) => setActiveArea(area)}
        />

        {/* Bottom Floating Info Card overlay */}
        <div className="pointer-events-auto absolute bottom-3 inset-x-3 z-10 rounded-[2px] border border-line bg-white/95 p-3 shadow-md backdrop-blur-xs">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-2.5">
              <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-[2px] bg-forest/10 text-forest">
                <MapPin className="h-4 w-4" />
              </div>
              <div>
                <p className="bn-heading text-[13px] font-bold leading-tight text-forest">
                  {activeArea === "dashmina"
                    ? bn
                      ? "দশমিনা উপজেলা (আয়তন: ৩৬৩ বর্গ কিমি · ৭টি ইউনিয়ন)"
                      : "Dashmina Upazila (Area: 363 sq km · 7 Unions)"
                    : activeArea === "galachipa"
                      ? bn
                        ? "গালাচিপা উপজেলা (আয়তন: ১,২৬৩ বর্গ কিমি · ১টি পৌরসভা, ১২টি ইউনিয়ন)"
                        : "Galachipa Upazila (Area: 1,263 sq km · 1 Municipality, 12 Unions)"
                      : bn
                        ? "পটুয়াখালী-৩ আসন (গালাচিপা ও দশমিনা উপজেলা · ১৬২৬+ বর্গ কিমি)"
                        : "Patuakhali-3 Seat (Galachipa & Dashmina Combined · 1,626+ sq km)"}
                </p>
                <p className="bn mt-0.5 text-[11.5px] leading-snug text-muted">
                  {activeArea === "dashmina"
                    ? bn
                      ? "তেঁতুলিয়া নদী অববাহিকা ও পূর্ব উপকূলীয় জনপদ · বহরমপুর, বাঁশবাড়িয়া ও বেতাগী সানকিপুর"
                      : "Tetulia river basin & eastern coastal belt · Bahrampur, Banshbaria & Betagi"
                    : activeArea === "galachipa"
                      ? bn
                        ? "আগুনমুখা ও রামনাবাদ নদী বেষ্টিত অঞ্চল · ডাকুয়া, পানপট্টি, চর কাজল ও চর বিশ্বাস"
                        : "Agunmukha & Rabnabad delta · Dakua, Panpatti, Char Kajal & Char Biswas"
                      : bn
                        ? "উপকূলীয় নদী ও চর বেষ্টিত নির্বাচনী এলাকা · তেঁতুলিয়া ও আগুনমুখা অববাহিকা"
                        : "Coastal riverine constituency · Tetulia & Agunmukha river delta"}
                </p>
              </div>
            </div>

            {/* Area indicator pill */}
            <span className="hidden sm:inline-flex shrink-0 items-center gap-1 rounded-[2px] bg-forest/10 px-2 py-0.5 text-[10.5px] font-semibold text-forest">
              <span className="h-1.5 w-1.5 rounded-full bg-forest" />
              {activeArea === "all"
                ? bn
                  ? "সম্পূর্ণ এলাকা"
                  : "All Areas"
                : activeArea === "galachipa"
                  ? bn
                    ? "গালাচিপা ফোকাস"
                    : "Galachipa Focus"
                  : bn
                    ? "দশমিনা ফোকাস"
                    : "Dashmina Focus"}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Footer Info Strip */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line bg-white px-3.5 py-2.5 text-[11.5px] text-muted sm:px-4 sm:text-[12px]">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="h-4 w-4 shrink-0 text-forest" />
          <span>
            {bn
              ? "পটুয়াখালী-৩: ১টি পৌরসভা ও ১৯টি ইউনিয়নের সমন্বয়ে গঠিত"
              : "Patuakhali-3: Comprising 1 Municipality and 19 Unions"}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://www.google.com/maps/search/?api=1&query=Galachipa+Dashmina+Patuakhali"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-semibold text-forest hover:underline"
          >
            <span>{bn ? "গুগল ম্যাপ" : "Google Maps"}</span>
            <ExternalLink className="h-3 w-3 text-gold" />
          </a>
          <span className="text-line-strong">•</span>
          <a
            href="https://www.openstreetmap.org/#map=10/22.18/90.50"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-semibold text-forest hover:underline"
          >
            <span>{bn ? "ওপেনস্ট্রিটম্যাপ" : "OpenStreetMap"}</span>
            <ExternalLink className="h-3 w-3 text-gold" />
          </a>
        </div>
      </div>
    </div>
  );
}
