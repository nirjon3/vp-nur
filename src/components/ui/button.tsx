import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium tracking-[0.01em] transition-colors duration-200 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest",
  {
    variants: {
      variant: {
        primary:
          "bg-forest text-white hover:bg-forest-deep border border-forest",
        outline:
          "bg-transparent text-forest border border-forest/25 hover:border-forest hover:bg-forest hover:text-white",
        ghost: "bg-transparent text-forest hover:bg-offwhite",
        gold: "bg-gold text-forest-ink border border-gold hover:bg-gold-deep hover:border-gold-deep hover:text-white",
        subtle:
          "bg-offwhite text-charcoal border border-line hover:border-line-strong hover:bg-white",
      },
      size: {
        sm: "h-9 px-4 text-[13px] rounded-[2px]",
        md: "h-11 px-6 text-sm rounded-[2px]",
        lg: "h-12 px-8 text-[15px] rounded-[2px]",
        icon: "h-10 w-10 rounded-[2px]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export function Button({
  className,
  variant,
  size,
  asChild,
  children,
  ...props
}: ButtonProps) {
  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<{ className?: string }>;
    return React.cloneElement(child, {
      className: cn(buttonVariants({ variant, size }), child.props.className, className),
    });
  }
  return (
    <button className={cn(buttonVariants({ variant, size }), className)} {...props}>
      {children}
    </button>
  );
}
