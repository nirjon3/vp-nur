"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, CircleCheck, SearchX } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { trackRequestSchema } from "@/lib/validation";
import { z } from "zod";
import { Input, FieldError } from "@/components/ui/form";

type TrackInput = z.infer<typeof trackRequestSchema>;

const statusStyle: Record<string, string> = {
  received: "border-line-strong bg-offwhite text-body",
  underReview: "border-gold/50 bg-gold/15 text-gold-deep",
  referred: "border-forest/30 bg-forest/5 text-forest",
  closed: "border-line bg-white text-muted",
};

export function TrackForm({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const bn = locale === "bn";
  const [result, setResult] = React.useState<
    | { state: "idle" }
    | { state: "found"; status: string; submittedAt: string | null; updatedAt: string | null }
    | { state: "notFound" }
    | { state: "unavailable" }
    | { state: "rateLimited" }
  >({ state: "idle" });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TrackInput>({ resolver: zodResolver(trackRequestSchema) });

  async function onSubmit(values: TrackInput) {
    setResult({ state: "idle" });
    const params = new URLSearchParams({ ref: values.ref, phone: values.phone });
    try {
      const response = await fetch(`/api/requests/track?${params.toString()}`, {
        method: "GET",
        headers: { Accept: "application/json" },
      });
      const body = (await response.json().catch(() => null)) as
        | { ok: boolean; status?: string; submittedAt?: string | null; updatedAt?: string | null }
        | null;

      if (response.ok && body?.ok && body.status) {
        setResult({
          state: "found",
          status: body.status,
          submittedAt: body.submittedAt ?? null,
          updatedAt: body.updatedAt ?? null,
        });
      } else if (response.status === 404) {
        setResult({ state: "notFound" });
      } else if (response.status === 429) {
        setResult({ state: "rateLimited" });
      } else {
        setResult({ state: "unavailable" });
      }
    } catch {
      setResult({ state: "unavailable" });
    }
  }

  const statusLabel = (s: string) => {
    const map: Record<string, string> = {
      received: dict.status.received,
      underReview: dict.status.underReview,
      referred: dict.status.referred,
      closed: dict.status.closed,
    };
    return map[s] ?? s;
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        <div>
          <label htmlFor="ref" className="mb-1.5 block text-[13px] font-semibold text-charcoal">
            {bn ? "ট্র্যাকিং নম্বর" : "Tracking reference"}
          </label>
          <Input
            id="ref"
            autoComplete="off"
            spellCheck={false}
            placeholder="NRV-20261117-ABC123"
            className="font-mono uppercase tracking-[0.1em]"
            aria-invalid={!!errors.ref}
            aria-describedby={errors.ref ? "err-ref" : undefined}
            {...register("ref")}
          />
          <FieldError id="err-ref">{errors.ref?.message}</FieldError>
        </div>
        <div>
          <label htmlFor="track-phone" className="mb-1.5 block text-[13px] font-semibold text-charcoal">
            {dict.forms.phone}
          </label>
          <Input
            id="track-phone"
            inputMode="tel"
            autoComplete="tel"
            placeholder={dict.forms.phonePlaceholder}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "err-track-phone" : undefined}
            {...register("phone")}
          />
          <FieldError id="err-track-phone">{errors.phone?.message}</FieldError>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-[2px] border border-forest bg-forest text-[15px] font-semibold text-white hover:bg-forest-deep disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? (
            <>
              <Loader2 aria-hidden="true" className="h-5 w-5 animate-spin" />
              {bn ? "খোঁজা হচ্ছে…" : "Looking up…"}
            </>
          ) : bn ? (
            "অগ্রগতি দেখুন"
          ) : (
            "Check status"
          )}
        </button>
      </form>

      {result.state === "found" ? (
        <div role="status" className="mt-6 rounded-[2px] border border-forest/30 bg-forest/5 p-6">
          <div className="flex items-center gap-3">
            <CircleCheck aria-hidden="true" className="h-6 w-6 text-forest" />
            <span className={`inline-flex rounded-[2px] border px-3 py-1 text-[12px] font-bold uppercase tracking-[0.14em] ${statusStyle[result.status] ?? statusStyle.received}`}>
              {statusLabel(result.status)}
            </span>
          </div>
          <dl className="bn mt-4 space-y-1 text-[13px] leading-6 text-body">
            {result.submittedAt ? (
              <div className="flex gap-2">
                <dt className="text-muted">{bn ? "জমা দেওয়া হয়েছে:" : "Submitted:"}</dt>
                <dd>{new Date(result.submittedAt).toLocaleString(bn ? "bn-BD" : "en-GB")}</dd>
              </div>
            ) : null}
            {result.updatedAt ? (
              <div className="flex gap-2">
                <dt className="text-muted">{bn ? "সর্বশেষ হালনাগাদ:" : "Last updated:"}</dt>
                <dd>{new Date(result.updatedAt).toLocaleString(bn ? "bn-BD" : "en-GB")}</dd>
              </div>
            ) : null}
          </dl>
          <p className="bn mt-4 text-[11.5px] leading-5 text-muted">
            {bn
              ? "তথ্যের গোপনীয়তার জন্য শুধু অনুরোধকারী ব্যক্তিই এই পৃষ্ঠায় অবস্থা দেখতে পারবেন।"
              : "For privacy, only the person who submitted this request can view its status."}
          </p>
        </div>
      ) : null}

      {result.state === "notFound" ? (
        <div role="alert" className="mt-6 flex items-start gap-3 rounded-[2px] border border-line bg-offwhite p-6 text-[13px] leading-6 text-body">
          <SearchX aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-muted" />
          <span>
            {bn
              ? "এই ট্র্যাকিং নম্বর ও মোবাইল নম্বরের কোনো অনুরোধ পাওয়া যায়নি। নম্বর দুটি যাচাই করে আবার চেষ্টা করুন।"
              : "No request matches this reference and mobile number. Please check both and try again."}
          </span>
        </div>
      ) : null}

      {result.state === "unavailable" ? (
        <div role="alert" className="mt-6 rounded-[2px] border border-red-200 bg-red-50 p-6 text-[13px] leading-6 text-red-900">
          {bn
            ? "সার্ভারের সঙ্গে সংযোগ করা যায়নি। পরে আবার চেষ্টা করুন।"
            : "Could not reach the server. Please try again later."}
        </div>
      ) : null}

      {result.state === "rateLimited" ? (
        <div role="alert" className="mt-6 rounded-[2px] border border-red-200 bg-red-50 p-6 text-[13px] leading-6 text-red-900">
          {bn ? "অত্যধিক অনুসন্ধান। কিছুক্ষণ পর আবার চেষ্টা করুন।" : "Too many attempts. Please try again later."}
        </div>
      ) : null}
    </div>
  );
}
