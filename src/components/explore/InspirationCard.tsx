"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import type { FeedItem } from "@/lib/types";
import { TEMPLE } from "@/components/temple";
import { cn } from "@/lib/utils";

const HEIGHT: Record<FeedItem["aspect"], string> = {
  tall: "min-h-[320px] sm:min-h-[360px]",
  portrait: "min-h-[260px] sm:min-h-[300px]",
  landscape: "min-h-[180px] sm:min-h-[210px]",
  square: "min-h-[220px] sm:min-h-[240px]",
};

export function InspirationCard({
  item,
  niche,
  index = 0,
}: {
  item: FeedItem;
  niche?: boolean;
  index?: number;
}) {
  const [saved, setSaved] = useState(!!item.saved);
  const [hover, setHover] = useState(false);

  const source =
    item.credits.photographer ||
    item.credits.guru ||
    item.credits.creator ||
    item.creator.name;

  const toggleSave = () => {
    const next = !saved;
    setSaved(next);
    toast.success(next ? "Saved to Boards" : "Removed from saved", {
      description: next
        ? "Open Boards to organize this inspiration."
        : undefined,
      action: next
        ? {
            label: "Boards",
            onClick: () => {
              window.location.href = "/boards";
            },
          }
        : undefined,
    });
  };

  return (
    <article
      className={cn(
        "group break-inside-avoid mb-4 sm:mb-5",
        "motion-safe:animate-[fadeRise_0.55s_ease_both]",
      )}
      style={{ animationDelay: `${Math.min(index, 10) * 45}ms` }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-sm bg-[#1a1b20]",
          "shadow-[0_18px_40px_rgba(0,0,0,0.35)] transition-shadow duration-[350ms]",
          hover && "shadow-[0_22px_50px_rgba(0,0,0,0.5)]",
        )}
      >
        <Link href={`/discover/${item.id}`} className="block">
          {niche ? (
            <div className={cn("relative", HEIGHT[item.aspect])}>
              <div className="absolute inset-[10%_14%_8%] overflow-hidden">
                <Image
                  src={item.mediaUrl}
                  alt={item.title}
                  fill
                  sizes="(max-width:768px) 50vw, 25vw"
                  className={cn(
                    "object-cover transition-transform duration-[380ms] ease-out motion-reduce:transition-none",
                    hover && "scale-[1.03] motion-reduce:scale-100",
                  )}
                />
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={TEMPLE.arch.medium}
                alt=""
                className="pointer-events-none absolute inset-0 h-full w-full object-contain object-bottom drop-shadow-[0_8px_20px_rgba(0,0,0,0.45)] brightness-[1.05]"
              />
            </div>
          ) : (
            <div className={cn("relative overflow-hidden", HEIGHT[item.aspect])}>
              <Image
                src={item.mediaUrl}
                alt={item.title}
                fill
                sizes="(max-width:768px) 50vw, 25vw"
                className={cn(
                  "object-cover transition-transform duration-[380ms] ease-out motion-reduce:transition-none",
                  hover && "scale-[1.03] motion-reduce:scale-100",
                )}
              />
              <div
                className={cn(
                  "absolute inset-0 bg-gradient-to-t from-[#15161A]/85 via-[#15161A]/15 to-transparent transition-opacity duration-[350ms]",
                  hover ? "opacity-100" : "opacity-70",
                )}
              />
            </div>
          )}
        </Link>

        <div
          className={cn(
            "pointer-events-none absolute inset-x-0 top-0 z-10 flex items-start justify-between p-3 transition-opacity duration-[350ms]",
            hover ? "opacity-100" : "opacity-0 max-sm:opacity-100",
          )}
        >
          <span className="rounded-full border border-gold/30 bg-[#15161A]/70 px-2.5 py-1 text-[0.62rem] tracking-wide text-cream/70 backdrop-blur-sm">
            {item.category}
          </span>
          <div className="pointer-events-auto flex gap-2">
            <Link
              href={`/discover/${item.id}`}
              className="rounded-full border border-gold/35 bg-[#15161A]/75 px-3 py-1.5 text-[0.68rem] text-cream/80 backdrop-blur-sm transition-colors hover:border-gold hover:text-gold"
            >
              View
            </Link>
            <button
              type="button"
              onClick={toggleSave}
              className={cn(
                "rounded-full border px-3 py-1.5 text-[0.68rem] backdrop-blur-sm transition-colors",
                saved
                  ? "border-gold bg-gold/20 text-gold"
                  : "border-gold/35 bg-[#15161A]/75 text-cream/80 hover:border-gold hover:text-gold",
              )}
            >
              {saved ? "Saved ✓" : "+ Save"}
            </button>
          </div>
        </div>
      </div>

      <div className="mt-2.5 px-0.5">
        <p className="font-display text-[0.95rem] text-cream/85">{item.title}</p>
        <p className="mt-0.5 text-[0.68rem] tracking-wide text-cream/40">
          {item.category}
          <span className="mx-1.5 text-gold/40">·</span>
          {source}
        </p>
      </div>
    </article>
  );
}
