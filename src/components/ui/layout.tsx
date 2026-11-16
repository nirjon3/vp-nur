import { cn } from "@/lib/cn";

/** Centered page container — max 1280px, fluid side padding. */
export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-10", className)}>
      {children}
    </div>
  );
}

/** Editorial section wrapper with optional top hairline. */
export function Section({
  className,
  children,
  as: Tag = "section",
  bordered = true,
}: {
  className?: string;
  children: React.ReactNode;
  as?: "section" | "div" | "footer";
  bordered?: boolean;
}) {
  return (
    <Tag className={cn("py-12 sm:py-16 lg:py-20", bordered && "border-t border-line", className)}>
      {children}
    </Tag>
  );
}
