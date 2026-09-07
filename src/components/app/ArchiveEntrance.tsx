"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Short ceremonial gate after login — respects reduced motion.
 */
export function ArchiveEntrance() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const flag = sessionStorage.getItem("aa_archive_entrance");
    if (flag !== "1") return;
    sessionStorage.removeItem("aa_archive_entrance");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    setVisible(true);
    const t = window.setTimeout(() => setVisible(false), 2200);
    return () => window.clearTimeout(t);
  }, []);

  if (!visible) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#0D1012]",
        "animate-[archive-curtain_1.8s_var(--ease-dance)_forwards]",
      )}
      role="status"
      aria-live="polite"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(229,169,60,0.12),transparent_55%)]"
        aria-hidden
      />
      <div
        className="mb-6 h-14 w-14 rounded-full border border-gold/40"
        style={{ animation: "archive-salangai-orbit 2.2s linear infinite" }}
        aria-hidden
      >
        <div className="m-2 h-10 w-10 rounded-full border border-dashed border-gold/50" />
      </div>
      <p className="font-inscription text-[0.65rem] tracking-[0.22em] text-gold/80">
        Preparing your dance space…
      </p>
      <div
        className="mt-5 h-px w-24 bg-gradient-to-r from-transparent via-gold/60 to-transparent"
        style={{ animation: "archive-kolam-expand 1.2s var(--ease-dance) both" }}
        aria-hidden
      />
    </div>
  );
}
