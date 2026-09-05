import { cn } from "@/lib/utils";

type GlassCardProps = {
  children: React.ReactNode;
  className?: string;
  padding?: "none" | "sm" | "md" | "lg";
  hover?: boolean;
  as?: "div" | "article" | "section";
};

const paddingClass = {
  none: "p-0",
  sm: "p-4 sm:p-5",
  md: "p-5 sm:p-6",
  lg: "p-6 sm:p-8",
} as const;

export function GlassCard({
  children,
  className,
  padding = "md",
  hover = false,
  as: Tag = "div",
}: GlassCardProps) {
  return (
    <Tag
      className={cn(
        "glass-surface rounded-[var(--radius-xl)]",
        paddingClass[padding],
        hover &&
          "transition-transform duration-[var(--duration-base)] ease-[var(--ease-dance)] hover:-translate-y-1 hover:border-gold/70",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
