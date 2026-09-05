"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import type { FeedItem } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Primitives";
import { Icons } from "@/components/icons/Icons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/Tooltip";
import { HoverLift } from "@/components/ui/Motion";

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
    <HoverLift className="masonry-item">
      <article
        className={cn(
          "group relative overflow-hidden border border-[var(--border-gold)] bg-paper",
          "shadow-[0_14px_36px_rgba(92,61,46,0.12)] transition-colors duration-300 hover:border-temple/45",
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
            <div className="absolute inset-0 bg-gradient-to-t from-maroon/90 via-transparent to-transparent opacity-90" />
            {item.mediaType === "video" ? (
              <div className="absolute left-3 top-3 flex items-center gap-1.5 border border-gold/50 bg-paper/90 px-2.5 py-1 text-[0.62rem] uppercase tracking-[0.14em] text-temple backdrop-blur-sm">
                <Icons.Video className="h-3 w-3" />
                Video
              </div>
            ) : (
              <div className="absolute left-3 top-3 border border-gold/50 bg-paper/90 px-2.5 py-1 text-[0.62rem] uppercase tracking-[0.14em] text-bronze backdrop-blur-sm">
                {item.category}
              </div>
            )}
            <div className="absolute inset-x-0 bottom-0 p-3">
              <p className="font-display text-lg leading-tight text-ivory">
                {item.title}
              </p>
              <p className="mt-1 text-xs text-brass">
                {item.creator.name} · {item.danceForm}
              </p>
            </div>
          </div>
        </Link>

        <div className="flex items-center justify-between border-t border-[var(--border-gold)] bg-paper px-2 py-1.5">
          <p className="truncate px-1 text-[0.68rem] text-bronze">
            {item.credits.photographer ||
              item.credits.choreographer ||
              item.credits.guru ||
              item.credits.creator ||
              "Credit on view"}
          </p>
          <div className="flex items-center">
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  aria-label={saved ? "Saved" : "Save to collection"}
                  className={cn(
                    "rounded-[var(--radius-sm)] p-2.5 text-bronze transition-colors hover:text-temple",
                    saved && "text-temple",
                  )}
                  onClick={() => {
                    setSaved(true);
                    onSave?.(item.id);
                  }}
                >
                  <Icons.Save className="h-4 w-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent>Save inspiration for later</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  aria-label="Share"
                  className="rounded-[var(--radius-sm)] p-2.5 text-bronze transition-colors hover:text-temple"
                  onClick={() =>
                    toast.message("Share link ready", {
                      description: "Copy a private or public link.",
                    })
                  }
                >
                  <Icons.Share className="h-4 w-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent>Share</TooltipContent>
            </Tooltip>
            <div className="relative">
              <button
                type="button"
                title="More"
                aria-label="More options"
                aria-expanded={menuOpen}
                className="rounded-[var(--radius-sm)] p-2.5 text-bronze transition-colors hover:text-temple"
                onClick={() => setMenuOpen((v) => !v)}
              >
                <Icons.Menu className="h-4 w-4" />
              </button>
              {menuOpen ? (
                <div className="absolute bottom-11 right-0 z-20 w-44 border border-[var(--border-gold)] bg-paper p-1 shadow-xl">
                  <button
                    type="button"
                    className="w-full px-3 py-2.5 text-left text-xs text-ink hover:bg-temple/10"
                    onClick={() => setMenuOpen(false)}
                  >
                    View credits
                  </button>
                  <button
                    type="button"
                    className="w-full px-3 py-2.5 text-left text-xs text-ink hover:bg-temple/10"
                    onClick={() => {
                      setMenuOpen(false);
                      toast.message("Report received", {
                        description: "Thank you. We will review this.",
                      });
                    }}
                  >
                    Report
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </article>
    </HoverLift>
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
  return (
    <Dialog open={open} onOpenChange={(next) => !next && onClose()}>
      <DialogContent title="Save inspiration for later" className="silk-panel">
        <DialogHeader>
          <DialogTitle className="!text-ink">Save inspiration for later</DialogTitle>
          <DialogDescription className="!text-ink-soft">
            “{itemTitle}”
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          {["Show ideas", "Expression studies", "Costume ideas"].map((board) => (
            <button
              key={board}
              type="button"
              className="flex w-full items-center justify-between border border-[var(--border-gold)] bg-paper px-3 py-3 text-left text-sm text-ink transition-colors hover:border-temple hover:bg-temple/5"
              onClick={() => {
                toast.success("Saved", { description: `Added to ${board}.` });
                onClose();
              }}
            >
              <span>{board}</span>
              <span className="label-ui !text-temple">Save</span>
            </button>
          ))}
        </div>
        <label className="mt-4 block space-y-1.5">
          <span className="label-ui">Private note</span>
          <textarea
            className="w-full border border-[var(--border-bronze)] bg-paper px-3 py-2 text-sm text-ink placeholder:text-bronze/70"
            rows={2}
            placeholder="Try this angle with a stronger look."
          />
        </label>
        <div className="mt-4 flex justify-end gap-2">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              toast.success("Saved", {
                description: "Your idea is in a collection.",
              });
              onClose();
            }}
          >
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
