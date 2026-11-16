import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Landmark, MapPin } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { localePath } from "@/i18n/config";

export function Hero({ locale }: { locale: Locale }) {
  const bn = locale === "bn";

  return (
    <section className="border-b border-line bg-white">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10">
        <div className="grid gap-10 py-10 sm:py-14 lg:grid-cols-12 lg:gap-14 lg:py-16">
          {/* Text column */}
          <div className="flex flex-col justify-center lg:col-span-7">
            <p className="animate-rise flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] font-bold uppercase tracking-[0.2em] text-muted">
              <span className="inline-flex items-center gap-1.5 text-forest">
                <Landmark aria-hidden="true" className="h-4 w-4" />
                {bn ? "জাতীয় সংসদ সদস্য" : "Member of Parliament"}
              </span>
              <span aria-hidden="true" className="text-gold">•</span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin aria-hidden="true" className="h-4 w-4" />
                {bn ? "পটুয়াখালী-৩ · গালাচিপা–দশমিনা" : "Patuakhali-3 · Galachipa–Dashmina"}
              </span>
            </p>

            <h1 className="bn-heading animate-rise-delay mt-5 text-[44px] leading-[1.15] text-forest sm:text-6xl sm:leading-[1.1] lg:text-[76px]">
              {bn ? "নুরুল হক নুর" : "Nurul Haque Nur"}
            </h1>
            <p className="mt-3 text-[12px] font-bold uppercase tracking-[0.28em] text-gold-deep">
              {bn ? "ভিপি নুর" : "VP NUR"}
            </p>

            <p className="bn prose-narrow mt-6 text-[16.5px] leading-8 text-body sm:text-lg">
              {bn
                ? "ডাকসু–র সাবেক সহ-সভাপতি, পরিচিত ‘ভিপি নুর’ নামে। বর্তমানে পটুয়াখালী-৩ আসনের সংসদ সদস্য হিসেবে দায়িত্ব পালন করছেন। এই ওয়েবসাইটে তাঁর সংসদীয় কর্মকাণ্ড, এলাকার জনউদ্যোগ এবং নাগরিকদের জন্য সেবার তথ্য বাংলা ও ইংরেজিতে প্রকাশিত হয়।"
                : "Former Vice President of the Dhaka University Central Students' Union (DUCSU), known as VP Nur. Currently serving as Member of Parliament for the Patuakhali-3 constituency. This website publishes his parliamentary activities, constituency initiatives and citizen services in Bengali and English."}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href={localePath(locale, "/about")}
                className="inline-flex h-12 items-center gap-2 rounded-[2px] border border-forest bg-forest px-7 text-[15px] font-semibold text-white transition-colors hover:bg-forest-deep"
              >
                {bn ? "পরিচয় পড়ুন" : "Read his profile"}
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
              <Link
                href={localePath(locale, "/services")}
                className="inline-flex h-12 items-center gap-2 rounded-[2px] border border-line-strong px-7 text-[15px] font-semibold text-forest transition-colors hover:border-forest hover:bg-offwhite"
              >
                {bn ? "নাগরিক সেবা" : "Citizen services"}
              </Link>
            </div>

            <p className="mt-6 text-[11.5px] leading-relaxed text-muted">
              {bn
                ? "প্রকাশিত উপাদান উৎসসহ যাচাইকৃত হলেই ‘যাচাইকৃত’ হিসেবে চিহ্নিত হয়। যাচাই চলমান উপাদানে আলাদা ব্যাজ দেখা যাবে।"
                : "Content is marked verified only after confirmation against a source; items pending verification carry a distinct badge."}
            </p>
          </div>

          {/* Portrait */}
          <div className="lg:col-span-5">
            <figure className="relative mx-auto max-w-md lg:max-w-none">
              <div aria-hidden="true" className="absolute -inset-3 hidden rounded-[2px] border border-gold/60 sm:block" />
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2px] bg-forest-deep">
                <Image
                  src="/images/nurul-haque-nur-portrait.jpg"
                  alt={
                    bn
                      ? "নুরুল হক নুর (ভিপি নুর) — লাল পাঞ্জাবিতে হাসিমুখ প্রতিকৃতি"
                      : "Nurul Haque Nur (VP Nur) — smiling portrait in a red kurta"
                  }
                  fill
                  priority
                  sizes="(min-width: 1024px) 40vw, (min-width: 640px) 28rem, 100vw"
                  className="object-cover object-[center_18%]"
                />
              </div>
              <figcaption className="sr-only">
                {bn ? "নুরুল হক নুরের প্রতিকৃতি" : "Portrait of Nurul Haque Nur"}
              </figcaption>
            </figure>
          </div>
        </div>

        {/* Fact strip */}
        <dl className="grid grid-cols-1 divide-y divide-line border-t border-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {[
            { k: bn ? "আসন" : "Constituency", v: bn ? "পটুয়াখালী-৩" : "Patuakhali-3" },
            { k: bn ? "এলাকা" : "Areas", v: bn ? "গালাচিপা · দশমিনা" : "Galachipa · Dashmina" },
            { k: bn ? "পরিচিতি" : "Known as", v: bn ? "ভিপি নুর" : "VP Nur" },
          ].map((item) => (
            <div key={item.k} className="flex items-baseline gap-3 py-4 sm:px-6 sm:first:pl-0">
              <dt className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted">{item.k}</dt>
              <dd className="bn text-[15px] font-semibold text-forest">{item.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
