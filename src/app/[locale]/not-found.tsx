"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localePath, type Locale } from "@/i18n/config";

export default function NotFound() {
  const pathname = usePathname();
  const isEn = pathname?.startsWith("/en");
  const locale: Locale = isEn ? "en" : "bn";

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-24 text-center sm:px-6 lg:px-10">
      <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-gold-deep">
        {isEn ? "404" : "৪০৪"}
      </p>
      <h1 className="bn-heading mt-3 text-3xl text-forest sm:text-4xl">
        {isEn ? "Page Not Found" : "পৃষ্ঠাটি খুঁজে পাওয়া যায়নি"}
      </h1>
      <p className="bn mx-auto mt-3 max-w-md text-muted">
        {isEn
          ? "The page you are looking for does not exist or has been moved."
          : "আপনি যে পৃষ্ঠাটি খুঁজছেন সেটি এখনো প্রকাশিত হয়নি অথবা ঠিকানাটি পরিবর্তিত হয়েছে।"}
      </p>
      <Link
        href={localePath(locale, "/")}
        className="mt-8 inline-flex h-11 items-center rounded-[2px] border border-forest bg-forest px-6 text-sm font-semibold text-white hover:bg-forest-deep"
      >
        {isEn ? "Back to homepage" : "হোমপেজে ফিরে যান"}
      </Link>
    </div>
  );
}
