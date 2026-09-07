"use client";

import Link from "next/link";
import { NOTIFICATIONS } from "@/lib/data";

export default function NotificationsPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <h2 className="font-display text-2xl text-cream">Notifications</h2>
      <p className="mt-2 text-sm text-cream/50">Gentle updates from your archive.</p>

      <ul className="studio-tile mt-8 divide-y divide-cream/[0.06]">
        {NOTIFICATIONS.map((n) => (
          <li key={n.id} className="flex gap-3 px-4 py-4">
            <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gold" />
            <div>
              <p className="text-sm text-cream/85">{n.body}</p>
              <p className="mt-1 text-[0.72rem] text-cream/35">{n.time}</p>
            </div>
          </li>
        ))}
      </ul>

      <p className="mt-6 text-center text-sm text-cream/40">
        <Link href="/home" className="text-gold hover:text-gold-soft">
          Return home →
        </Link>
      </p>
    </div>
  );
}
