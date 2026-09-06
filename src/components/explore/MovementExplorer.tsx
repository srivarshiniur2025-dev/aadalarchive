"use client";

import Link from "next/link";
import { TEMPLE } from "@/components/temple";

const MOVEMENTS = [
  { id: "alarippu", label: "Alarippu", hint: "Invocation · opening" },
  { id: "jatiswaram", label: "Jatiswaram", hint: "Pure nritta" },
  { id: "varnam", label: "Varnam", hint: "Centerpiece" },
  { id: "padam", label: "Padam", hint: "Abhinaya · story" },
  { id: "tillana", label: "Tillana", hint: "Joyful close" },
  { id: "abhinaya", label: "Abhinaya", hint: "Expression study" },
] as const;

export function MovementExplorer() {
  return (
    <section className="relative mx-auto max-w-[1320px] px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
      <div className="flex items-center gap-4" aria-hidden>
        <span className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={TEMPLE.detail.lotus} alt="" className="h-5 w-5 opacity-50" />
        <span className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      </div>

      <h2 className="mt-10 font-display text-2xl text-cream/90 sm:text-[1.75rem]">
        Explore by Movement
      </h2>
      <p className="mt-2 max-w-lg text-[0.85rem] text-cream/45">
        Connect visual inspiration to the pieces you rehearse and perform.
      </p>

      <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {MOVEMENTS.map((m) => (
          <li key={m.id}>
            <Link
              href={`/explore?movement=${m.id}`}
              className="group flex items-center justify-between border border-gold/15 bg-[#1a1b20]/40 px-5 py-4 transition-colors hover:border-gold/40 hover:bg-gold/[0.04]"
            >
              <div>
                <p className="font-display text-lg text-cream/85 group-hover:text-gold">
                  {m.label}
                </p>
                <p className="mt-0.5 text-[0.72rem] tracking-wide text-cream/40">
                  {m.hint}
                </p>
              </div>
              <span className="text-gold/50 transition-colors group-hover:text-gold" aria-hidden>
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
