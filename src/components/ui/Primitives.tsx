import Link from "next/link";
import { cn } from "@/lib/utils";

export function Button({
  children,
  href,
  variant = "primary",
  className,
  type = "button",
  onClick,
  disabled,
  ariaLabel,
}: {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "ghost" | "vermilion" | "doorway" | "ivory";
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
  ariaLabel?: string;
}) {
  const styles = {
    primary:
      "border border-gold bg-temple/80 text-ivory tracking-[0.1em] uppercase text-xs hover:bg-temple hover:border-brass",
    secondary:
      "border border-[var(--border-gold)] bg-transparent text-ivory tracking-[0.08em] uppercase text-xs hover:border-brass hover:bg-maroon/40",
    ghost: "text-sandalwood hover:text-gold tracking-[0.06em]",
    vermilion:
      "border border-vermilion/45 bg-vermilion/15 text-ivory hover:bg-vermilion/25",
    doorway: "btn-doorway",
    ivory:
      "border border-bronze/40 bg-ivory text-obsidian tracking-[0.08em] uppercase text-xs hover:bg-[#f7ecda]",
  };

  const classes = cn(
    variant === "doorway"
      ? styles.doorway
      : "inline-flex items-center justify-center gap-2 rounded-[var(--radius-sm)] px-5 py-2.5 font-medium transition-all duration-200 disabled:opacity-50",
    variant !== "doorway" && styles[variant],
    className,
  );

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

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn(align === "center" && "text-center")}>
      {eyebrow ? <p className="label-ui mb-3 text-gold">{eyebrow}</p> : null}
      <h2 className="font-display text-3xl font-medium tracking-[0.02em] text-ivory md:text-4xl">
        {title}
      </h2>
      <div
        className={cn(
          "gold-rule mt-4",
          align === "center" && "mx-auto",
        )}
      />
      {subtitle ? (
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-sandalwood md:text-lg">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

export function EmptyState({
  title,
  description,
  action,
  illustration = "kolam",
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
  illustration?: "kolam" | "frame" | "lamp" | "curtain";
}) {
  return (
    <div className="silk-panel relative overflow-hidden rounded-[var(--radius-lg)] px-6 py-16 text-center">
      <div className="kolam-bg absolute inset-0 opacity-35" />
      <div className="relative">
        <EmptyIllustration kind={illustration} />
        <h3 className="font-display mt-5 text-2xl text-ivory">{title}</h3>
        {description ? (
          <p className="mx-auto mt-2 max-w-md text-sm text-sandalwood">
            {description}
          </p>
        ) : null}
        {action ? <div className="mt-6 flex justify-center">{action}</div> : null}
      </div>
    </div>
  );
}

function EmptyIllustration({
  kind,
}: {
  kind: "kolam" | "frame" | "lamp" | "curtain";
}) {
  if (kind === "frame") {
    return (
      <svg viewBox="0 0 80 96" className="mx-auto h-16 w-14 text-gold/50" aria-hidden>
        <rect x="8" y="10" width="64" height="76" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <rect x="14" y="16" width="52" height="64" fill="none" stroke="currentColor" strokeWidth="0.7" opacity="0.5" />
      </svg>
    );
  }
  if (kind === "lamp") {
    return (
      <svg viewBox="0 0 48 64" className="mx-auto h-14 w-10 text-gold/55" aria-hidden>
        <ellipse cx="24" cy="14" rx="9" ry="5" fill="currentColor" opacity="0.35" />
        <path d="M15 16c0 9 4 16 9 25 5-9 9-16 9-25" fill="none" stroke="currentColor" />
        <path d="M18 42h12l2 12H16z" fill="currentColor" opacity="0.45" />
      </svg>
    );
  }
  if (kind === "curtain") {
    return (
      <svg viewBox="0 0 96 56" className="mx-auto h-10 w-20 text-temple" aria-hidden>
        <path d="M8 8c12 18 12 30 0 40M28 8c12 18 12 30 0 40M48 8c12 18 12 30 0 40M68 8c12 18 12 30 0 40M88 8c-8 14-8 28 0 40" fill="none" stroke="currentColor" strokeWidth="1.4" opacity="0.7" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 100 100" className="mx-auto h-16 w-16 text-gold/45" aria-hidden>
      <circle cx="50" cy="50" r="28" fill="none" stroke="currentColor" strokeDasharray="4 8" />
      <circle cx="50" cy="50" r="12" fill="none" stroke="currentColor" />
      <path d="M50 22v10M50 68v10M22 50h10M68 50h10" stroke="currentColor" />
    </svg>
  );
}

const privacyLabels: Record<string, string> = {
  private: "Private",
  public: "Public",
  unlisted: "Shared link",
  invite_only: "Shared",
  group_only: "Shared",
  personal_reference: "Personal use",
  do_not_copy: "Please do not copy",
  educational: "Learning use OK",
  public_sharing: "Sharing OK",
  credit_required: "Please credit",
  no_downloads: "No downloads",
  view_permission: "View only",
  original: "Original work",
  traditional: "Traditional piece",
  adaptation: "Adapted work",
};

export function PrivacyBadge({ privacy }: { privacy: string }) {
  const label = privacyLabels[privacy] ?? privacy.replaceAll("_", " ");
  return (
    <span className="label-ui inline-flex items-center rounded-[var(--radius-sm)] border border-[var(--border-gold)] bg-obsidian/55 px-2.5 py-1 text-[0.62rem] text-sandalwood">
      {label}
    </span>
  );
}

export function Input({
  label,
  id,
  type = "text",
  placeholder,
  required,
  defaultValue,
  as = "input",
  rows = 4,
}: {
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  defaultValue?: string;
  as?: "input" | "textarea";
  rows?: number;
}) {
  const fieldClass =
    "w-full rounded-[var(--radius-sm)] border border-[var(--border-bronze)] bg-charcoal/50 px-3 py-3.5 text-sm text-ivory placeholder:text-sandalwood/50 focus:border-gold focus:outline-none";

  return (
    <label className="block space-y-1.5" htmlFor={id}>
      <span className="label-ui">{label}</span>
      {as === "textarea" ? (
        <textarea
          id={id}
          name={id}
          rows={rows}
          placeholder={placeholder}
          required={required}
          defaultValue={defaultValue}
          className={fieldClass}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          placeholder={placeholder}
          required={required}
          defaultValue={defaultValue}
          className={fieldClass}
        />
      )}
    </label>
  );
}

export function PageIntro({
  greeting,
  subtitle,
  actions,
}: {
  greeting: string;
  subtitle: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="font-display text-3xl font-medium text-ivory md:text-4xl">
          {greeting}
        </h1>
        <p className="mt-2 text-sm italic text-sandalwood md:text-base">
          {subtitle}
        </p>
      </div>
      {actions}
    </div>
  );
}
