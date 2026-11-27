import Image from "next/image";
import type { Locale } from "@/i18n/config";

export function Hero({ locale }: { locale: Locale }) {
  const bn = locale === "bn";
  const heroSrc = bn ? "/images/hero-bn.jpg" : "/images/hero-en.jpg";
  const altText = bn
    ? "মো: নুরুল হক, এমপি — প্রতিমন্ত্রী, প্রবাসী কল্যাণ ও বৈদেশিক কর্মসংস্থান মন্ত্রণালয়"
    : "Md. Nurul Haque, MP — State Minister, Ministry of Expatriates' Welfare & Overseas Employment";

  return (
    <section className="relative z-30 overflow-hidden border-b border-line bg-[#f8f5f3]">
      {/* Accessible semantic H1 heading for SEO & accessibility */}
      <h1 className="sr-only">{altText}</h1>

      <div className="mx-auto w-full max-w-[1280px]">
        <div className="relative w-full overflow-hidden shadow-xs">
          <Image
            src={heroSrc}
            alt={altText}
            width={1024}
            height={576}
            priority
            unoptimized
            className="w-full h-auto block object-contain"
            sizes="(min-width: 1280px) 1280px, 100vw"
          />
        </div>
      </div>
    </section>
  );
}
