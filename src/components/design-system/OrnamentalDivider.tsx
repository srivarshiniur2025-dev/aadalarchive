import { cn } from "@/lib/utils";

type OrnamentalDividerProps = {
  variant?: "line" | "wave" | "lotus";
  className?: string;
};

function LotusMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("h-4 w-4 text-gold", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      aria-hidden
    >
      <path d="M12 20c0-3 2-5 2-8 0 0-2 1-2 3 0-2-2-3-2-3 0 3 2 5 2 8Z" />
      <path d="M12 15c-2-1-4-1-6 0 2 1 4 2 6 2 2 0 4-1 6-2-2-1-4-1-6 0Z" />
      <path d="M12 13c1.5-2 2-4 1.5-6.5C12 8 11 10 10.5 6.5 10 9 10.5 11 12 13Z" />
    </svg>
  );
}

export function OrnamentalDivider({
  variant = "line",
  className,
}: OrnamentalDividerProps) {
  if (variant === "wave") {
    return (
      <div
        className={cn("ornament-line-wave", className)}
        role="presentation"
        aria-hidden
      />
    );
  }

  if (variant === "lotus") {
    return (
      <div
        className={cn("flex items-center gap-3", className)}
        role="presentation"
        aria-hidden
      >
        <span className="ornament-line max-w-[4rem] flex-1" />
        <LotusMark />
        <span className="ornament-line max-w-[4rem] flex-1" />
      </div>
    );
  }

  return (
    <div
      className={cn("ornament-line", className)}
      role="presentation"
      aria-hidden
    />
  );
}
