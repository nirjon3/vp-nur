import Image from "next/image";
import type { Locale } from "@/i18n/config";

export function Hero({ locale }: { locale: Locale }) {
  const bn = locale === "bn";
  const heroSrc = bn ? "/images/hero-bn.jpg" : "/images/hero-en.png";
  const altText = bn
    ? "মো. নুরুল হক, এমপি — মাননীয় প্রতিমন্ত্রী, প্রবাসী কল্যাণ ও বৈদেশিক কর্মসংস্থান মন্ত্রণালয়"
    : "Md. Nurul Hoque, MP — Hon'ble State Minister, Ministry of Expatriates' Welfare & Overseas Employment";

  return (
    <section className="relative z-30 overflow-hidden border-b border-line bg-[#f8f5f3]">
      {/* Accessible semantic H1 heading for SEO & accessibility */}
      <h1 className="sr-only">{altText}</h1>

      <div className="mx-auto w-full max-w-[1600px]">
        <div className="relative aspect-[2.204/1] w-full overflow-hidden shadow-xs">
          <Image
            src={heroSrc}
            alt={altText}
            fill
            priority
            quality={100}
            sizes="(min-width: 1600px) 1600px, 100vw"
            className="object-contain sm:object-cover object-center"
          />
        </div>
      </div>
    </section>
  );
}
