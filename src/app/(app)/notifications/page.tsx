import { LampGlow } from "@/components/animations/Motifs";
import { NOTIFICATIONS } from "@/lib/data";
import { SectionHeading } from "@/components/ui/Primitives";
import { cn } from "@/lib/utils";

export default function NotificationsPage() {
  return (
    <div>
      <SectionHeading
        eyebrow="Notifications"
        title="Notifications"
        subtitle="Gentle updates about shares, notes, and uploads."
      />

      <ul className="mt-8 space-y-3">
        {NOTIFICATIONS.map((item) => (
          <li
            key={item.id}
            className={cn(
              "flex gap-4 border px-4 py-4 transition-colors",
              item.read
                ? "border-[var(--border-gold)] bg-charcoal-elevated/40"
                : "border-gold/40 bg-temple/20",
            )}
          >
            <div className="pt-1">
              <LampGlow className="scale-75" />
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display text-xl text-ivory">{item.title}</h3>
                <span className="shrink-0 text-xs text-bronze">{item.time}</span>
              </div>
              <p className="mt-1 text-sm text-sandalwood">{item.body}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
