import Link from "next/link";
import { localePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export default function NotFound() {
  // Locale is not available in not-found scope; default to Bengali with an English line.
  const locale: Locale = "bn";
  const dict = getDictionary(locale);
  return (
    <div className="mx-auto max-w-[1280px] px-4 py-24 text-center sm:px-6 lg:px-10">
      <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-gold-deep">৪০৪ / 404</p>
      <h1 className="bn-heading mt-3 text-3xl text-forest sm:text-4xl">
        পৃষ্ঠাটি খুঁজে পাওয়া যায়নি
      </h1>
      <p className="bn mx-auto mt-3 max-w-md text-muted">
        আপনি যে পৃষ্ঠাটি খুঁজছেন সেটি এখনো প্রকাশিত হয়নি অথবা ঠিকানাটি পরিবর্তিত হয়েছে।
        <span className="block pt-1 text-sm">The page you are looking for does not exist or has moved.</span>
      </p>
      <Link
        href={localePath(locale, "/")}
        className="mt-8 inline-flex h-11 items-center rounded-[2px] border border-forest bg-forest px-6 text-sm font-semibold text-white hover:bg-forest-deep"
      >
        {dict.common.backHome}
      </Link>
    </div>
  );
}
