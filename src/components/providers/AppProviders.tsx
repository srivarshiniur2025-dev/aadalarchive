"use client";

import { TooltipProvider } from "@radix-ui/react-tooltip";
import { Toaster } from "sonner";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider delayDuration={280} skipDelayDuration={120}>
      {children}
      <Toaster
        theme="light"
        position="bottom-right"
        toastOptions={{
          classNames: {
            toast:
              "border border-[var(--border-gold)] bg-paper text-ink shadow-[0_20px_50px_rgba(92,61,46,0.18)]",
            title: "font-display text-ink",
            description: "text-ink-soft",
            actionButton: "bg-temple text-ivory",
            cancelButton: "bg-transparent text-bronze",
            success: "border-temple/40",
            error: "border-orange-deep/50",
          },
        }}
      />
    </TooltipProvider>
  );
}
