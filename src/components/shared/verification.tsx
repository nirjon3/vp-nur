import { CheckCircle2, CircleDashed } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { Badge } from "@/components/ui/badge";
import type { VerificationStatus } from "@/types/content";

/** Visible verification state for any factual item. */
export function VerificationBadge({ status, locale }: { status: VerificationStatus; locale: Locale }) {
  const dict = getDictionary(locale);
  if (status === "verified") {
    return (
      <Badge variant="verified" className="normal-case tracking-normal">
        <CheckCircle2 aria-hidden="true" className="h-3.5 w-3.5" />
        {dict.common.verificationVerified}
      </Badge>
    );
  }
  return (
    <Badge variant="pending" className="normal-case tracking-normal">
      <CircleDashed aria-hidden="true" className="h-3.5 w-3.5" />
      {dict.common.verificationPending}
    </Badge>
  );
}

/** Small provenance line: source + last updated date. */
export function SourceLine({
  locale,
  sourceUrl,
  sourceLabel,
  updatedAt,
}: {
  locale: Locale;
  sourceUrl?: string;
  sourceLabel?: { bn: string; en: string };
  updatedAt?: string;
}) {
  const dict = getDictionary(locale);
  if (!sourceUrl && !updatedAt) return null;
  return (
    <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-muted">
      {sourceUrl ? (
        <span>
          {dict.common.source}:{" "}
          <a
            href={sourceUrl}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="link-underline font-medium text-body"
          >
            {sourceLabel ? sourceLabel[locale] : sourceUrl}
          </a>
        </span>
      ) : null}
      {updatedAt ? (
        <span>
          {dict.common.lastUpdated}: {new Date(updatedAt).toLocaleDateString(locale === "bn" ? "bn-BD" : "en-GB", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
      ) : null}
    </p>
  );
}
