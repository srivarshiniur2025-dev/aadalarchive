"use client";

import Link from "next/link";
import { NOTIFICATIONS } from "@/lib/data";

export default function NotificationsPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <h2 className="font-display text-2xl text-cream">Notifications</h2>
      <p className="mt-2 text-sm text-cream/50">Gentle updates from your archive.</p>

      <ul className="mt-8 divide-y divide-gold/10 rounded-2xl border border-gold/15 bg-[#1a1b20]">
        {NOTIFICATIONS.map((n) => (
          <li key={n.id} className="flex gap-3 px-4 py-4 sm:px-5">
            <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-gold shadow-[0_0_8px_rgba(229,169,60,0.5)]" />
            <div>
              <p className="text-sm text-cream/85">{n.body}</p>
              <p className="mt-1 text-[0.72rem] text-cream/35">{n.time}</p>
            </div>
          </li>
        ))}
      </ul>

      <p className="mt-6 text-center text-sm text-cream/40">
        <Link href="/home" className="text-gold hover:underline">
          Return to your practice space →
        </Link>
      </p>
    </div>
  );
}
