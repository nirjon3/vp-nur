import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { localePath } from "@/i18n/config";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

/** Standardised editorial section heading: small index kicker, title, optional link. */
export function SectionHeading({
  index,
  title,
  headingAs = "h2",
  href,
  hrefLabel,
  locale,
  className,
}: {
  index?: string;
  title: string;
  headingAs?: "h2" | "h3";
  href?: string;
  hrefLabel?: string;
  locale: Locale;
  className?: string;
}) {
  const Tag = headingAs;
  return (
    <div className={cn("mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-line pb-5 sm:mb-10", className)}>
      <div className="flex items-baseline gap-4">
        {index ? (
          <span aria-hidden="true" className="font-sans text-xs font-bold tabular-nums tracking-[0.2em] text-gold-deep">
            {index}
          </span>
        ) : null}
        <Tag className="bn-heading text-2xl text-forest sm:text-3xl">{title}</Tag>
      </div>
      {href && hrefLabel ? (
        <Link
          href={localePath(locale, href)}
          className="group inline-flex items-center gap-1.5 text-[13px] font-semibold uppercase tracking-[0.08em] text-forest hover:text-forest-deep"
        >
          {hrefLabel}
          <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      ) : null}
    </div>
  );
}
