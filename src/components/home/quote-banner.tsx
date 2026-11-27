import Image from "next/image";
import Link from "next/link";
import { Quote, ArrowRight } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { localePath } from "@/i18n/config";
import { Container } from "@/components/ui/layout";

export function QuoteBanner({ locale }: { locale: Locale }) {
  const bn = locale === "bn";

  return (
    <section className="relative overflow-hidden border-y border-line bg-forest-ink py-14 text-white sm:py-20">
      {/* Decorative ambient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 top-0 h-[400px] w-[400px] rounded-full bg-forest/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 bottom-0 h-[350px] w-[350px] rounded-full bg-gold/10 blur-3xl"
      />

      <Container className="relative">
        <div className="mx-auto max-w-4xl text-center">
          {/* Quote icon */}
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gold/15 text-gold shadow-sm">
            <Quote className="h-6 w-6 fill-current" />
          </div>

          {/* Quote text */}
          <blockquote className="bn-heading mt-6 text-xl font-normal leading-relaxed text-white sm:text-2xl md:text-3xl md:leading-[1.45]">
            &ldquo;
            {bn
              ? "রাজনীতি কোনো ব্যক্তিগত সুবিধার জন্য নয়—রাজনীতি হলো গণমানুষের গণতান্ত্রিক অধিকার প্রতিষ্ঠা ও উপকূলের প্রান্তিক মানুষের কণ্ঠস্বর সংসদে তুলে ধরার শপথ।"
              : "Politics is not for personal privilege—it is a solemn commitment to defend the democratic rights of the people and amplify the voice of coastal communities in parliament."}
            &rdquo;
          </blockquote>

          {/* Attribution and Leader info */}
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-gold/60 shadow-md">
              <Image
                src="/images/nur-official-2026.jpg"
                alt={bn ? "মোঃ নুরুল হক, এমপি" : "Md. Nurul Haque, MP"}
                fill
                sizes="48px"
                className="object-cover object-top"
              />
            </div>
            <div className="text-center sm:text-left">
              <p className="bn-heading text-[16px] font-bold text-white">
                {bn ? "মোঃ নুরুল হক, এমপি (ভিপি নুর)" : "Md. Nurul Haque, MP (VP Nur)"}
              </p>
              <p className="text-[12.5px] font-medium text-[#b5c2b0]">
                {bn
                  ? "প্রতিমন্ত্রী, প্রবাসী কল্যাণ ও বৈদেশিক কর্মসংস্থান মন্ত্রণালয় · সংসদ সদস্য, পটুয়াখালী-৩"
                  : "State Minister, Ministry of Expatriates' Welfare & Overseas Employment · MP, Patuakhali-3"}
              </p>
            </div>
          </div>

          {/* Profile link */}
          <div className="mt-6">
            <Link
              href={localePath(locale, "/about")}
              className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-gold transition-colors hover:text-white hover:underline"
            >
              <span>{bn ? "জীবনবৃত্তান্ত ও পথচলা পড়ুন" : "Read full profile and journey"}</span>
              <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
