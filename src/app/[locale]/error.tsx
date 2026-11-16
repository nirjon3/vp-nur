"use client";

import { useEffect } from "react";

export default function LocaleError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-24 text-center sm:px-6 lg:px-10">
      <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-gold-deep">ত্রুটি / Error</p>
      <h1 className="bn-heading mt-3 text-2xl text-forest sm:text-3xl">
        দুঃখিত, একটি সমস্যা হয়েছে
      </h1>
      <p className="bn mx-auto mt-3 max-w-md text-muted">
        পেজটি লোড করতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।
        <span className="block pt-1 text-sm">Something went wrong while loading this page. Please try again.</span>
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-8 inline-flex h-11 items-center rounded-[2px] border border-forest bg-forest px-6 text-sm font-semibold text-white hover:bg-forest-deep"
      >
        আবার চেষ্টা করুন / Try again
      </button>
    </div>
  );
}
