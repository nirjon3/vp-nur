"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, ShieldCheck, AlertCircle } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { citizenRequestSchema, type CitizenRequestInput } from "@/lib/validation";
import { Input, Textarea, Select, FieldError } from "@/components/ui/form";
import { cn } from "@/lib/cn";

export function RequestForm({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const bn = locale === "bn";
  const [result, setResult] = React.useState<
    | { state: "idle" }
    | { state: "success"; ref: string }
    | { state: "unavailable" }
    | { state: "rateLimited" }
    | { state: "rejected" }
  >({ state: "idle" });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CitizenRequestInput>({
    resolver: zodResolver(citizenRequestSchema),
    defaultValues: { category: "general", website: "" },
  });

  async function onSubmit(values: CitizenRequestInput) {
    setResult({ state: "idle" });
    const formData = new FormData();
    for (const [key, value] of Object.entries(values)) {
      if (key === "consent") formData.append("consent", String(value));
      else formData.append(key, String(value ?? ""));
    }
    const fileInput = document.getElementById("attachment") as HTMLInputElement | null;
    const file = fileInput?.files?.[0];
    if (file && file.size > 0) formData.append("attachment", file);

    try {
      const response = await fetch("/api/requests", { method: "POST", body: formData });
      const body = (await response.json().catch(() => null)) as
        | { ok: boolean; ref?: string; error?: string }
        | null;

      if (response.ok && body?.ok && body.ref) {
        setResult({ state: "success", ref: body.ref });
        reset();
      } else if (response.status === 429) {
        setResult({ state: "rateLimited" });
      } else if (response.status === 503) {
        setResult({ state: "unavailable" });
      } else {
        setResult({ state: "rejected" });
      }
    } catch {
      setResult({ state: "unavailable" });
    }
  }

  if (result.state === "success") {
    return (
      <div
        role="status"
        className="rounded-[2px] border border-forest/30 bg-forest/5 p-8 text-center"
      >
        <ShieldCheck aria-hidden="true" className="mx-auto h-10 w-10 text-forest" />
        <h3 className="bn-heading mt-4 text-xl text-forest">
          {bn ? "অনুরোধ গৃহীত হয়েছে" : "Your request has been received"}
        </h3>
        <p className="bn mt-2 text-[15px] leading-7 text-body">
          {bn
            ? "আপনার অনুরোধটি সংরক্ষণ করা হয়েছে। ট্র্যাকিং নম্বরটি সংরক্ষণ করুন — এটি ছাড়া অগ্রগতি দেখা যাবে না।"
            : "Your request has been stored. Keep the tracking reference — it is required to check progress."}
        </p>
        <p
          className="mx-auto mt-5 inline-block select-all rounded-[2px] border border-forest bg-white px-6 py-3 font-mono text-lg font-bold tracking-[0.12em] text-forest"
          aria-label={bn ? "ট্র্যাকিং নম্বর" : "Tracking reference"}
        >
          {result.ref}
        </p>
        <p className="bn mt-4 text-[12.5px] text-muted">
          {bn ? "আপডেট পেতে ‘অনুরোধ ট্র্যাক’ পৃষ্ঠায় এই নম্বর ও আপনার মোবাইল নম্বর দিন।" : "Use this reference together with your mobile number on the tracking page."}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      {result.state !== "idle" ? (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-[2px] border border-red-200 bg-red-50 p-4 text-[13px] leading-6 text-red-900"
        >
          <AlertCircle aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0" />
          <span>
            {result.state === "rateLimited"
              ? bn
                ? "অনুরোধের সীমা অতিক্রম হয়েছে। কিছুক্ষণ পর আবার চেষ্টা করুন।"
                : "Too many submissions. Please try again later."
              : result.state === "unavailable"
                ? bn
                  ? "অনুরোধ সংরক্ষণ করা যায়নি — তথ্যভান্ডারে সমস্যা। আপনার তথ্য কোথাও সংরক্ষিত হয়নি; অনুগ্রহ করে পরে আবার চেষ্টা করুন।"
                  : "Your request could not be stored — the datastore is unavailable. Nothing was saved; please try again later."
                : bn
                  ? "জমা দেওয়া যায়নি। ফর্মের তথ্য যাচাই করে আবার চেষ্টা করুন।"
                  : "Submission failed. Please check the form and try again."}
          </span>
        </div>
      ) : null}

      {/* Honeypot — invisible to humans */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden">
        <label>
          Website
          <input type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-[13px] font-semibold text-charcoal">
            {dict.forms.name} <span aria-hidden="true" className="text-red-800">*</span>
          </label>
          <Input id="name" placeholder={dict.forms.namePlaceholder} aria-invalid={!!errors.name} aria-describedby={errors.name ? "err-name" : undefined} {...register("name")} />
          <FieldError id="err-name">{errors.name?.message}</FieldError>
        </div>
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-[13px] font-semibold text-charcoal">
            {dict.forms.phone} <span aria-hidden="true" className="text-red-800">*</span>
          </label>
          <Input id="phone" inputMode="tel" autoComplete="tel" placeholder={dict.forms.phonePlaceholder} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "err-phone" : undefined} {...register("phone")} />
          <FieldError id="err-phone">{errors.phone?.message}</FieldError>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="union" className="mb-1.5 block text-[13px] font-semibold text-charcoal">
            {dict.forms.union}
          </label>
          <Input id="union" placeholder={bn ? "যেমন: গালাচিপা সদর, নলছিটি…" : "e.g. Galachipa Sadar…"} {...register("union")} />
        </div>
        <div>
          <label htmlFor="category" className="mb-1.5 block text-[13px] font-semibold text-charcoal">
            {dict.forms.category} <span aria-hidden="true" className="text-red-800">*</span>
          </label>
          <Select id="category" {...register("category")}>
            {(["general", "constituency", "development", "service", "grievance", "contact"] as const).map((c) => (
              <option key={c} value={c}>
                {dict.categories[c]}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="mb-1.5 block text-[13px] font-semibold text-charcoal">
          {dict.forms.subject} <span aria-hidden="true" className="text-red-800">*</span>
        </label>
        <Input id="subject" placeholder={dict.forms.subjectPlaceholder} aria-invalid={!!errors.subject} aria-describedby={errors.subject ? "err-subject" : undefined} {...register("subject")} />
        <FieldError id="err-subject">{errors.subject?.message}</FieldError>
      </div>

      <div>
        <label htmlFor="description" className="mb-1.5 block text-[13px] font-semibold text-charcoal">
          {dict.forms.description} <span aria-hidden="true" className="text-red-800">*</span>
        </label>
        <Textarea id="description" placeholder={dict.forms.descriptionPlaceholder} aria-invalid={!!errors.description} aria-describedby={errors.description ? "err-description" : undefined} {...register("description")} />
        <FieldError id="err-description">{errors.description?.message}</FieldError>
      </div>

      <div>
        <label htmlFor="attachment" className="mb-1.5 block text-[13px] font-semibold text-charcoal">
          {bn ? "নথি সংযুক্ত করুন (স্বেচ্ছা, সর্বোচ্চ ৫ MB)" : "Attach a document (optional, max 5 MB)"}
        </label>
        <input
          id="attachment"
          name="attachment"
          type="file"
          accept=".pdf,.jpg,.jpeg,.png,.webp,.docx"
          className="block w-full text-[13.5px] text-body file:mr-4 file:rounded-[2px] file:border file:border-line-strong file:bg-offwhite file:px-4 file:py-2.5 file:text-[13px] file:font-semibold file:text-forest hover:file:bg-white"
        />
        <p className="mt-1.5 text-[11.5px] text-muted">
          {bn ? "সংযুক্ত ফাইল শুধু অনুমোদিত সেবাকর্মী দেখতে পারবেন।" : "Attachments are visible only to authorised service operators."}
        </p>
      </div>

      <label className="flex cursor-pointer items-start gap-3 rounded-[2px] border border-line bg-offwhite p-4">
        <input
          type="checkbox"
          aria-invalid={!!errors.consent}
          aria-describedby={errors.consent ? "err-consent" : undefined}
          className="mt-1 h-4 w-4 accent-forest"
          {...register("consent")}
        />
        <span className="bn text-[13.5px] leading-6 text-body">{dict.forms.consent}</span>
      </label>
      <FieldError id="err-consent">{errors.consent?.message}</FieldError>

      <button
        type="submit"
        disabled={isSubmitting}
        className={cn(
          "flex h-12 w-full items-center justify-center gap-2 rounded-[2px] border border-forest bg-forest text-[15px] font-semibold text-white transition-colors hover:bg-forest-deep disabled:cursor-not-allowed disabled:opacity-70",
        )}
      >
        {isSubmitting ? (
          <>
            <Loader2 aria-hidden="true" className="h-5 w-5 animate-spin" />
            {dict.forms.submitting}
          </>
        ) : (
          dict.forms.submit
        )}
      </button>
    </form>
  );
}
