import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2",
    "min-h-12 px-6 py-3",
    "rounded-full font-[family-name:var(--font-body)] text-sm font-semibold",
    "transition-all duration-[var(--duration-base)] ease-[var(--ease-dance)]",
    "disabled:pointer-events-none disabled:opacity-45",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gold",
  ].join(" "),
  {
    variants: {
      variant: {
        primary:
          "border border-gold bg-gold text-charcoal shadow-[var(--shadow-gold)] hover:bg-gold-soft hover:border-gold-soft hover:-translate-y-px",
        secondary:
          "border border-teal bg-teal text-cream hover:bg-teal-deep hover:-translate-y-px",
        outline:
          "border border-[var(--border-gold-strong)] bg-transparent text-cream hover:bg-[var(--gold-dim)] hover:border-gold",
        ghost:
          "border border-transparent bg-transparent text-cream/80 hover:text-gold",
        soft: "border border-[var(--border-gold)] bg-[color-mix(in_srgb,var(--surface)_70%,transparent)] text-cream backdrop-blur-md hover:border-gold",
      },
      size: {
        sm: "min-h-10 px-4 text-xs",
        md: "min-h-12 px-6 text-sm",
        lg: "min-h-14 px-8 text-base",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: false,
    },
  },
);

export type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  ariaLabel?: string;
} & VariantProps<typeof buttonVariants>;

export function Button({
  children,
  href,
  className,
  type = "button",
  onClick,
  disabled,
  ariaLabel,
  variant,
  size,
  fullWidth,
}: ButtonProps) {
  const classes = cn(buttonVariants({ variant, size, fullWidth }), className);

  if (href) {
    return (
      <Link href={href} className={classes} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}

export { buttonVariants };
