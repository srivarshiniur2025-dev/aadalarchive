import { cn } from "@/lib/utils";

type TempleFrameProps = {
  children: React.ReactNode;
  className?: string;
  /** Visual intensity of the carved border */
  intensity?: "subtle" | "strong";
  /** Pointed temple arch top vs soft rounded frame */
  shape?: "arch" | "rounded" | "portal";
  /** Optional bottom label strip */
  label?: React.ReactNode;
  as?: "div" | "article" | "figure";
};

const shapeClass: Record<NonNullable<TempleFrameProps["shape"]>, string> = {
  arch: "rounded-t-[999px] rounded-b-[1.25rem]",
  rounded: "rounded-[var(--radius-xl)]",
  portal: "rounded-t-[48%] rounded-b-[var(--radius-lg)] sm:rounded-t-[42%]",
};

export function TempleFrame({
  children,
  className,
  intensity = "subtle",
  shape = "rounded",
  label,
  as: Tag = "div",
}: TempleFrameProps) {
  return (
    <Tag
      className={cn(
        "relative overflow-hidden bg-surface",
        shapeClass[shape],
        intensity === "subtle" && "temple-border",
        intensity === "strong" &&
          "border border-[var(--border-gold-strong)] shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--gold)_14%,transparent),var(--shadow-card)]",
        className,
      )}
    >
      {/* Temple-inspired geometric corner marks */}
      <span
        className="pointer-events-none absolute left-3 top-3 h-4 w-4 border-l border-t border-gold/45 sm:left-4 sm:top-4"
        aria-hidden
      />
      <span
        className="pointer-events-none absolute right-3 top-3 h-4 w-4 border-r border-t border-gold/45 sm:right-4 sm:top-4"
        aria-hidden
      />
      <span
        className="pointer-events-none absolute bottom-3 left-3 h-4 w-4 border-b border-l border-gold/35 sm:bottom-4 sm:left-4"
        aria-hidden
      />
      <span
        className="pointer-events-none absolute bottom-3 right-3 h-4 w-4 border-b border-r border-gold/35 sm:bottom-4 sm:right-4"
        aria-hidden
      />

      <div className="relative z-[1] h-full w-full">{children}</div>

      {label ? (
        <div className="absolute inset-x-0 bottom-0 z-[2] flex items-center justify-between gap-3 bg-gradient-to-t from-charcoal/90 via-charcoal/50 to-transparent px-4 pb-4 pt-10 sm:px-5 sm:pb-5">
          <div className="font-display text-lg text-cream sm:text-xl">{label}</div>
        </div>
      ) : null}
    </Tag>
  );
}
