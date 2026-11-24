"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function LocaleError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const pathname = usePathname();
  const isEn = pathname?.startsWith("/en");

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-24 text-center sm:px-6 lg:px-10">
      <h1 className="bn-heading text-2xl text-forest sm:text-3xl">
        {isEn ? "Sorry, something went wrong" : "দুঃখিত, একটি সমস্যা হয়েছে"}
      </h1>
      <p className="bn mx-auto mt-3 max-w-md text-muted">
        {isEn
          ? "Something went wrong while loading this page. Please try again."
          : "পেজটি লোড করতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।"}
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-8 inline-flex h-11 items-center rounded-[2px] border border-forest bg-forest px-6 text-sm font-semibold text-white hover:bg-forest-deep"
      >
        {isEn ? "Try again" : "আবার চেষ্টা করুন"}
      </button>
    </div>
  );
}
