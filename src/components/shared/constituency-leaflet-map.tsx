"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Locale } from "@/i18n/config";
import { ZoomIn, ZoomOut, RotateCcw } from "lucide-react";

interface ConstituencyLeafletMapProps {
  locale: Locale;
  activeView: "all" | "galachipa" | "dashmina";
  mapType: "osm" | "satellite";
  onSelectArea: (area: "all" | "galachipa" | "dashmina") => void;
}

// Bounding coordinates & centers for Patuakhali-3
const COORDINATES = {
  all: { center: [22.18, 90.50] as [number, number], zoom: 10 },
  galachipa: { center: [22.1636, 90.4285] as [number, number], zoom: 12 },
  dashmina: { center: [22.2831, 90.5898] as [number, number], zoom: 12 },
};

// Simplified territory boundary polygons representing Galachipa and Dashmina upazilas
const DASHMINA_POLYGON: [number, number][] = [
  [22.36, 90.54],
  [22.34, 90.64],
  [22.26, 90.67],
  [22.21, 90.63],
  [22.22, 90.54],
  [22.28, 90.51],
];

const GALACHIPA_POLYGON: [number, number][] = [
  [22.25, 90.40],
  [22.22, 90.54],
  [22.21, 90.63],
  [22.08, 90.64],
  [21.92, 90.63],
  [21.86, 90.52],
  [21.89, 90.41],
  [22.04, 90.34],
  [22.18, 90.36],
];

export default function ConstituencyLeafletMap({
  locale,
  activeView,
  mapType,
  onSelectArea,
}: ConstituencyLeafletMapProps) {
  const bn = locale === "bn";
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const polygonLayersRef = useRef<{ galachipa?: L.Polygon; dashmina?: L.Polygon }>({});

  // Initialize Leaflet map
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    // Create map instance
    const map = L.map(containerRef.current, {
      center: COORDINATES.all.center,
      zoom: COORDINATES.all.zoom,
      zoomControl: false,
      scrollWheelZoom: false,
      attributionControl: false,
    });

    // Custom attribution control (compact)
    L.control
      .attribution({
        prefix: false,
        position: "bottomright",
      })
      .addAttribution(
        bn
          ? '<span class="text-[10px] text-gray-600">© OpenStreetMap · Esri</span>'
          : '<span class="text-[10px] text-gray-600">© OpenStreetMap · Esri</span>'
      )
      .addTo(map);

    // Initial tile layer (OSM)
    const tileLayer = L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        maxZoom: 18,
        minZoom: 9,
      }
    ).addTo(map);

    tileLayerRef.current = tileLayer;
    mapRef.current = map;

    // Custom pulse marker helper
    const createHtmlMarker = (title: string, sub: string, isAccent = false) => {
      return L.divIcon({
        className: "custom-leaflet-pin",
        html: `
          <div class="group relative flex flex-col items-center cursor-pointer select-none -translate-x-1/2 -translate-y-full">
            <div class="flex items-center gap-1.5 whitespace-nowrap rounded-[2px] border ${
              isAccent
                ? "border-forest bg-forest text-gold"
                : "border-forest-deep bg-forest-ink text-white"
            } px-2 py-0.5 text-[11px] font-bold shadow-md">
              <span class="inline-block h-2 w-2 rounded-full ${
                isAccent ? "bg-gold" : "bg-emerald-400"
              } animate-pulse"></span>
              <span>${title}</span>
            </div>
            <div class="text-[9.5px] font-medium text-white px-1.5 py-0.2 rounded-xs bg-black/75 mt-0.5 shadow-xs">
              ${sub}
            </div>
            <div class="h-2 w-2 rotate-45 ${
              isAccent ? "bg-forest" : "bg-forest-ink"
            } -mt-1"></div>
          </div>
        `,
        iconSize: [120, 48],
        iconAnchor: [60, 48],
      });
    };

    // Add Boundary Polygons
    const dashminaPoly = L.polygon(DASHMINA_POLYGON, {
      color: "#153e35",
      weight: 2,
      dashArray: "4, 4",
      fillColor: "#153e35",
      fillOpacity: 0.12,
    }).addTo(map);

    dashminaPoly.on("click", () => onSelectArea("dashmina"));

    const galachipaPoly = L.polygon(GALACHIPA_POLYGON, {
      color: "#153e35",
      weight: 2,
      dashArray: "4, 4",
      fillColor: "#153e35",
      fillOpacity: 0.12,
    }).addTo(map);

    galachipaPoly.on("click", () => onSelectArea("galachipa"));

    polygonLayersRef.current = {
      dashmina: dashminaPoly,
      galachipa: galachipaPoly,
    };

    // Add Key Place Markers
    // 1. Galachipa Sadar Marker
    const galachipaMarker = L.marker(COORDINATES.galachipa.center, {
      icon: createHtmlMarker(
        bn ? "গালাচিপা সদর" : "Galachipa Sadar",
        bn ? "পৌরসভা ও ১২টি ইউনিয়ন" : "Municipality & 12 Unions",
        true
      ),
    }).addTo(map);
    galachipaMarker.on("click", () => onSelectArea("galachipa"));

    // 2. Dashmina Sadar Marker
    const dashminaMarker = L.marker(COORDINATES.dashmina.center, {
      icon: createHtmlMarker(
        bn ? "দশমিনা সদর" : "Dashmina Sadar",
        bn ? "উপজেলা প্রশাসন ও ৭ ইউনিয়ন" : "Upazila HQ & 7 Unions",
        true
      ),
    }).addTo(map);
    dashminaMarker.on("click", () => onSelectArea("dashmina"));

    // 3. Char Kajal Marker (Southern delta of Galachipa)
    L.marker([21.98, 90.58], {
      icon: createHtmlMarker(
        bn ? "চর কাজল ও চর বিশ্বাস" : "Char Kajal & Biswas",
        bn ? "উপকূলীয় চরাঞ্চল" : "Coastal Char Delta"
      ),
    }).addTo(map);

    // 4. Panpatti (Agunmukha river delta)
    L.marker([22.06, 90.41], {
      icon: createHtmlMarker(
        bn ? "পানপট্টি ও আগুনমুখা" : "Panpatti & Agunmukha",
        bn ? "উপকূলীয় বেড়িবাঁধ অঞ্চল" : "Coastal Embankment Belt"
      ),
    }).addTo(map);


    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [bn, onSelectArea]);

  // Handle tile layer change (OSM Standard vs Satellite)
  useEffect(() => {
    if (!mapRef.current || !tileLayerRef.current) return;

    mapRef.current.removeLayer(tileLayerRef.current);

    const newLayer =
      mapType === "satellite"
        ? L.tileLayer(
            "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
            {
              maxZoom: 18,
              minZoom: 9,
            }
          )
        : L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 18,
            minZoom: 9,
          });

    newLayer.addTo(mapRef.current);
    tileLayerRef.current = newLayer;
  }, [mapType]);

  // Handle view switch (Fly to area)
  useEffect(() => {
    if (!mapRef.current) return;
    const target = COORDINATES[activeView];
    if (target) {
      mapRef.current.flyTo(target.center, target.zoom, {
        duration: 1.2,
      });
    }

    // Update polygon highlight styling
    const { dashmina, galachipa } = polygonLayersRef.current;
    if (dashmina) {
      dashmina.setStyle({
        fillOpacity: activeView === "dashmina" ? 0.35 : activeView === "all" ? 0.15 : 0.05,
        weight: activeView === "dashmina" ? 3 : 2,
        color: activeView === "dashmina" ? "#b49a67" : "#153e35",
      });
    }
    if (galachipa) {
      galachipa.setStyle({
        fillOpacity: activeView === "galachipa" ? 0.35 : activeView === "all" ? 0.15 : 0.05,
        weight: activeView === "galachipa" ? 3 : 2,
        color: activeView === "galachipa" ? "#b49a67" : "#153e35",
      });
    }
  }, [activeView]);

  const handleZoomIn = () => mapRef.current?.zoomIn();
  const handleZoomOut = () => mapRef.current?.zoomOut();
  const handleReset = () => {
    onSelectArea("all");
    mapRef.current?.flyTo(COORDINATES.all.center, COORDINATES.all.zoom);
  };

  return (
    <div className="relative h-full min-h-[380px] w-full sm:min-h-[430px]">
      {/* Map Container */}
      <div ref={containerRef} className="h-full min-h-[380px] w-full sm:min-h-[430px] z-0" />

      {/* Floating Map Controls */}
      <div className="absolute top-3 right-3 z-10 flex flex-col gap-1.5 shadow-sm">
        <button
          type="button"
          onClick={handleZoomIn}
          aria-label={bn ? "জুম ইন" : "Zoom In"}
          className="flex h-8 w-8 items-center justify-center rounded-[2px] border border-line bg-white/95 text-forest shadow-xs backdrop-blur-xs hover:bg-forest hover:text-white transition-colors"
        >
          <ZoomIn className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={handleZoomOut}
          aria-label={bn ? "জুম আউট" : "Zoom Out"}
          className="flex h-8 w-8 items-center justify-center rounded-[2px] border border-line bg-white/95 text-forest shadow-xs backdrop-blur-xs hover:bg-forest hover:text-white transition-colors"
        >
          <ZoomOut className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={handleReset}
          aria-label={bn ? "রিসেট ভিউ" : "Reset View"}
          title={bn ? "মূল ভিউতে ফিরুন" : "Reset to full constituency"}
          className="flex h-8 w-8 items-center justify-center rounded-[2px] border border-line bg-white/95 text-forest shadow-xs backdrop-blur-xs hover:bg-forest hover:text-white transition-colors"
        >
          <RotateCcw className="h-4 w-4" />
        </button>
      </div>

      {/* Touch / Drag hint for desktop/mobile */}
      <div className="pointer-events-none absolute top-3 left-3 z-10 rounded-[2px] bg-forest-ink/80 px-2 py-0.5 text-[10.5px] font-medium text-white shadow-xs backdrop-blur-xs">
        {mapType === "satellite"
          ? bn
            ? "🛰️ রিয়েল স্যাটেলাইট ভিউ"
            : "🛰️ Real Satellite Imagery"
          : bn
            ? "🗺️ লাইভ ভৌগোলিক মানচিত্র"
            : "🗺️ Live Geographic Map"}
      </div>
    </div>
  );
}
