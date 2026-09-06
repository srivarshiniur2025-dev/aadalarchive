"use client";

import Image from "next/image";
import { FadeRise } from "@/components/ui/Motion";
import { TempleOrnament } from "@/components/temple";

const ROLES = [
  "Dancer",
  "Teacher",
  "Photographer",
  "Videographer",
  "Choreographer",
  "Friend",
] as const;

export function CollaborationSection() {
  return (
    <section
      className="relative isolate overflow-hidden bg-[#15161A] ds-section"
      aria-labelledby="collab-heading"
    >
      <div className="ds-container-wide relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <FadeRise>
            <p className="label-ui">Create together</p>
            <h2
              id="collab-heading"
              className="mt-4 font-display text-[clamp(1.9rem,3.8vw,2.85rem)] font-medium leading-[1.1] text-cream"
            >
              Create <span className="italic text-gold">together.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-cream/50">
              Your performance doesn&apos;t happen alone.
            </p>
          </FadeRise>

          <FadeRise delay={0.1} className="relative mx-auto mt-14 max-w-lg">
            <div className="relative mx-auto aspect-square w-[min(100%,260px)] overflow-hidden rounded-full border border-gold/20">
              <Image
                src="/landing/feature-boards.png"
                alt="Shared project"
                fill
                sizes="260px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[#15161A]/30" />
              <p className="absolute inset-x-0 bottom-6 text-center font-display text-lg text-cream">
                Shared project
              </p>
            </div>

            <ul className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              {ROLES.map((role) => (
                <li
                  key={role}
                  className="border border-gold/18 px-4 py-2 text-xs tracking-wide text-cream/70"
                >
                  {role}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex justify-center">
              <TempleOrnament type="lotus" className="h-8 w-8 opacity-50" />
            </div>
          </FadeRise>
        </div>
      </div>
    </section>
  );
}
