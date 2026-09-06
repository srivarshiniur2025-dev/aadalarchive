"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { FadeRise } from "@/components/ui/Motion";
import { cn } from "@/lib/utils";

const STEPS = [
  { id: "inspiration", label: "Inspiration" },
  { id: "idea", label: "Idea" },
  { id: "plan", label: "Plan" },
  { id: "collaborate", label: "Collaborate" },
  { id: "practice", label: "Practice" },
  { id: "perform", label: "Perform" },
  { id: "preserve", label: "Preserve" },
] as const;

function Step({
  label,
  index,
  active,
  onVisible,
}: {
  label: string;
  index: number;
  active: boolean;
  onVisible: (index: number, visible: boolean) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.55, margin: "-8% 0px -8% 0px" });

  useEffect(() => {
    onVisible(index, inView);
  }, [inView, index, onVisible]);

  return (
    <div ref={ref} className="relative flex flex-col items-center px-1 py-4 text-center">
      <span
        className={cn(
          "h-2.5 w-2.5 rounded-full border transition-colors",
          active ? "border-gold bg-gold" : "border-gold/35 bg-transparent",
        )}
        aria-hidden
      />
      <p
        className={cn(
          "mt-4 font-display text-base transition-colors sm:text-lg",
          active ? "text-gold" : "text-cream/50",
        )}
      >
        {label}
      </p>
      <span
        className={cn(
          "mt-1 text-[0.58rem] tracking-[0.2em] uppercase",
          active ? "text-cream/40" : "text-cream/22",
        )}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
    </div>
  );
}

export function DanceJourneySection() {
  const [active, setActive] = useState(0);

  const onVisible = (index: number, visible: boolean) => {
    if (visible) setActive(index);
  };

  return (
    <section
      className="relative isolate overflow-hidden bg-[#15161A] ds-section"
      aria-labelledby="journey-heading"
    >
      <div className="ds-container-wide relative z-10">
        <FadeRise className="mb-12 max-w-lg sm:mb-14">
          <p className="label-ui">Your path</p>
          <h2
            id="journey-heading"
            className="mt-4 font-display text-[clamp(1.9rem,3.8vw,2.75rem)] font-medium leading-[1.1] text-cream"
          >
            From spark to{" "}
            <span className="italic text-gold">memory</span>
          </h2>
        </FadeRise>

        <div className="relative">
          <div
            className="pointer-events-none absolute left-[6%] right-[6%] top-[1.15rem] hidden h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent lg:block"
            aria-hidden
          />

          <div className="scrollbar-thin -mx-[var(--section-pad-x)] flex gap-2 overflow-x-auto px-[var(--section-pad-x)] pb-2 lg:mx-0 lg:grid lg:grid-cols-7 lg:gap-2 lg:overflow-visible lg:px-0">
            {STEPS.map((step, i) => (
              <div key={step.id} className="w-[38vw] max-w-[140px] shrink-0 lg:w-auto lg:max-w-none">
                <FadeRise delay={0.03 * i}>
                  <Step label={step.label} index={i} active={active === i} onVisible={onVisible} />
                </FadeRise>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
