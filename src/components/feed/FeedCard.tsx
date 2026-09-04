"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { FeedItem } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Primitives";
import { Icons } from "@/components/icons/Icons";

export function FeedCard({
  item,
  index = 0,
  onSave,
}: {
  item: FeedItem;
  index?: number;
  onSave?: (id: string) => void;
}) {
  const [saved, setSaved] = useState(!!item.saved);
  const [menuOpen, setMenuOpen] = useState(false);

  const heightClass = {
    tall: "min-h-[320px]",
    portrait: "min-h-[280px]",
    landscape: "min-h-[200px]",
    square: "min-h-[240px]",
  }[item.aspect];

  return (
    <article
      className={cn(
        "masonry-item group relative overflow-hidden border border-[var(--border-gold)] bg-charcoal/80",
        "shadow-[0_16px_40px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:border-brass/55",
        "animate-card",
      )}
      style={{ animationDelay: `${Math.min(index, 8) * 50}ms` }}
    >
      <Link href={`/discover/${item.id}`} className="block">
        <div className={cn("relative overflow-hidden", heightClass)}>
          <Image
            src={item.mediaUrl}
            alt={item.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-[400ms] ease-[var(--ease-dance)] group-hover:scale-[1.035]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent opacity-85" />
          {item.mediaType === "video" ? (
            <div className="absolute left-3 top-3 flex items-center gap-1.5 border border-[var(--border-gold)] bg-obsidian/75 px-2.5 py-1 text-[0.62rem] uppercase tracking-[0.14em] text-gold backdrop-blur-sm">
              <Icons.Video className="h-3 w-3" />
              Video
            </div>
          ) : (
            <div className="absolute left-3 top-3 border border-[var(--border-gold)] bg-obsidian/70 px-2.5 py-1 text-[0.62rem] uppercase tracking-[0.14em] text-sandalwood backdrop-blur-sm">
              {item.category}
            </div>
          )}
          <div className="absolute inset-x-0 bottom-0 p-3">
            <p className="font-display text-lg leading-tight text-ivory">
              {item.title}
            </p>
            <p className="mt-1 text-xs text-sandalwood">
              {item.creator.name} · {item.danceForm}
            </p>
          </div>
        </div>
      </Link>

      <div className="flex items-center justify-between border-t border-[var(--border-gold)] px-2 py-1.5">
        <p className="truncate px-1 text-[0.68rem] text-bronze">
          {item.credits.photographer ||
            item.credits.choreographer ||
            item.credits.guru ||
            item.credits.creator ||
            "Credit on view"}
        </p>
        <div className="flex items-center">
          <button
            type="button"
            title={saved ? "Saved" : "Save"}
            aria-label={saved ? "Saved" : "Save to board"}
            className={cn(
              "rounded-[var(--radius-sm)] p-2.5 text-sandalwood transition-colors hover:text-gold",
              saved && "text-gold",
            )}
            onClick={() => {
              setSaved(true);
              onSave?.(item.id);
            }}
          >
            <Icons.Save className="h-4 w-4" />
          </button>
          <button
            type="button"
            title="Share"
            aria-label="Share"
            className="rounded-[var(--radius-sm)] p-2.5 text-sandalwood transition-colors hover:text-gold"
          >
            <Icons.Share className="h-4 w-4" />
          </button>
          <div className="relative">
            <button
              type="button"
              title="More"
              aria-label="More options"
              aria-expanded={menuOpen}
              className="rounded-[var(--radius-sm)] p-2.5 text-sandalwood transition-colors hover:text-gold"
              onClick={() => setMenuOpen((v) => !v)}
            >
              <Icons.Menu className="h-4 w-4" />
            </button>
            {menuOpen ? (
              <div className="absolute bottom-11 right-0 z-20 w-44 border border-[var(--border-gold)] bg-charcoal p-1 shadow-xl">
                <button
                  type="button"
                  className="w-full px-3 py-2.5 text-left text-xs text-ivory hover:bg-temple/40"
                  onClick={() => setMenuOpen(false)}
                >
                  View credits
                </button>
                <button
                  type="button"
                  className="w-full px-3 py-2.5 text-left text-xs text-ivory hover:bg-temple/40"
                  onClick={() => setMenuOpen(false)}
                >
                  Report content
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}

export function SaveToBoardModal({
  open,
  onClose,
  itemTitle,
}: {
  open: boolean;
  onClose: () => void;
  itemTitle: string;
}) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-obsidian/80 p-4 backdrop-blur-sm sm:items-center"
      role="dialog"
      aria-modal
      aria-labelledby="save-title"
    >
      <div className="silk-panel w-full max-w-md p-5">
        <div className="mb-1 h-px w-full bg-gradient-to-r from-gold/60 via-transparent to-transparent" />
        <h3 id="save-title" className="font-display mt-3 text-2xl text-ivory">
          Save inspiration for later
        </h3>
        <p className="mt-1 text-sm text-sandalwood">“{itemTitle}”</p>
        <div className="mt-4 space-y-2">
          {["Show ideas", "Expression studies", "Costume ideas"].map(
            (board) => (
              <button
                key={board}
                type="button"
                className="flex w-full items-center justify-between border border-[var(--border-gold)] px-3 py-3 text-left text-sm text-ivory transition-colors hover:border-brass hover:bg-temple/20"
                onClick={onClose}
              >
                <span>{board}</span>
                <span className="label-ui text-gold">Save</span>
              </button>
            ),
          )}
        </div>
        <label className="mt-4 block space-y-1.5">
          <span className="label-ui">Private note</span>
          <textarea
            className="w-full border border-[var(--border-bronze)] bg-obsidian/60 px-3 py-2 text-sm text-ivory placeholder:text-sandalwood/50"
            rows={2}
            placeholder="Try this angle with a stronger look."
          />
        </label>
        <div className="mt-4 flex justify-end gap-2">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onClose}>Save</Button>
        </div>
      </div>
    </div>
  );
}
