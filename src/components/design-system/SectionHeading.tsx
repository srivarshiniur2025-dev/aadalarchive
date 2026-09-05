import { cn } from "@/lib/utils";
import { OrnamentalDivider } from "./OrnamentalDivider";

type SectionHeadingProps = {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  showDivider?: boolean;
  scriptAccent?: React.ReactNode;
  className?: string;
  actions?: React.ReactNode;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  showDivider = true,
  scriptAccent,
  className,
  actions,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        centered && "items-center text-center",
        !centered && "items-start text-left",
        className,
      )}
    >
      {eyebrow ? <p className="label-ui">{eyebrow}</p> : null}

      <div className={cn("flex w-full flex-wrap items-end gap-4", centered && "justify-center", !centered && "justify-between")}>
        <h2 className="text-display max-w-3xl">{title}</h2>
        {actions ? <div className="shrink-0">{actions}</div> : null}
      </div>

      {scriptAccent ? (
        <p className="text-quote text-2xl sm:text-3xl">{scriptAccent}</p>
      ) : null}

      {showDivider ? (
        <OrnamentalDivider
          variant="wave"
          className={cn(centered ? "mx-auto" : "")}
        />
      ) : null}

      {description ? (
        <p className="text-body max-w-xl text-base sm:text-lg">{description}</p>
      ) : null}
    </div>
  );
}
