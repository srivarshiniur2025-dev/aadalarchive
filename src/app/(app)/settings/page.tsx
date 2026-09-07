"use client";

import Link from "next/link";

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <h2 className="font-display text-2xl text-cream">Settings</h2>
      <p className="mt-2 text-sm text-cream/50">Shape your practice space.</p>

      <div className="mt-8 space-y-2">
        {[
          { title: "Account", desc: "Name, email, and password" },
          { title: "Privacy", desc: "Who can see your boards and albums" },
          { title: "Notifications", desc: "Choose gentle reminders" },
          { title: "Practice preferences", desc: "Mirror mode, slow playback defaults" },
        ].map((row) => (
          <button
            key={row.title}
            type="button"
            className="studio-tile flex w-full items-center justify-between px-4 py-4 text-left"
          >
            <span>
              <span className="block font-display text-cream">{row.title}</span>
              <span className="mt-0.5 block text-[0.8rem] text-cream/45">{row.desc}</span>
            </span>
            <span className="text-gold/70">→</span>
          </button>
        ))}
      </div>

      <Link href="/login" className="mt-10 inline-flex text-sm text-cream/45 hover:text-gold">
        Sign out
      </Link>
    </div>
  );
}
