"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import styles from "./CreateSection.module.css";

const STEPS = [
  {
    title: "01 — Save Inspiration",
    desc: "Capture what inspires you.",
    delay: "0.05s",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
        <path d="M12 21s-7-4.6-9.3-9A5.4 5.4 0 0112 6.5 5.4 5.4 0 0121.3 12c-2.3 4.4-9.3 9-9.3 9z" />
      </svg>
    ),
  },
  {
    title: "02 — Organise Boards",
    desc: "Group your references.",
    delay: "0.15s",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
        <rect x="4" y="4" width="7" height="7" rx="1" />
        <rect x="13" y="4" width="7" height="7" rx="1" />
        <rect x="4" y="13" width="7" height="7" rx="1" />
        <rect x="13" y="13" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    title: "03 — Add Details",
    desc: "Add notes, links and ideas.",
    delay: "0.25s",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
        <path d="M4 20l1-4L16 5l3 3L8 19l-4 1z" />
      </svg>
    ),
  },
  {
    title: "04 — Bring It to Life",
    desc: "Turn your collection into a plan.",
    delay: "0.35s",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
        <path d="M12 2l2.6 6.6L21 11l-6.4 2.4L12 20l-2.6-6.6L3 11l6.4-2.4z" />
      </svg>
    ),
  },
] as const;

function ArrowIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function CreateSection() {
  const processRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = processRef.current;
    if (!root) return;
    const steps = root.querySelectorAll<HTMLElement>(`.${styles.step}`);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      steps.forEach((s) => s.classList.add(styles.stepVisible));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add(styles.stepVisible);
          io.unobserve(e.target);
        });
      },
      { threshold: 0.3 },
    );
    steps.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <section id="create" className={cn(styles.section, "scroll-mt-20")} aria-labelledby="create-heading">
      <div className={styles.inner}>
        <div className={styles.left}>
          <div className={styles.silhouette} aria-hidden>
            <Image
              src="/landing/create-dancer-silhouette.png"
              alt=""
              width={327}
              height={322}
              className={styles.silhouetteImg}
              priority
            />
          </div>

          <div className={styles.copyBlock}>
            <p className={styles.eyebrow}>Save · Organize · Create</p>
            <h2 id="create-heading" className={styles.title}>
              Turn Inspiration
              <br />
              Into <em className={styles.titleEm}>Ideas</em>
            </h2>
            <p className={styles.copy}>
              Create your own boards for every performance, idea and dream. Bring together the
              visuals, references and details that inspire your dance journey.
            </p>

            <div className={styles.divider} aria-hidden>
              <span className={styles.rule} />
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="M12 20c-3-1.5-5-4.5-5-8 2 1 3.5 2.5 5 5 1.5-2.5 3-4 5-5 0 3.5-2 6.5-5 8z" />
                <path d="M12 12c-1.5-2-1.5-5 0-8 1.5 3 1.5 6 0 8z" />
              </svg>
              <span className={styles.ruleRight} />
            </div>

            <Link href="/signup" className={styles.cta}>
              Create a Board
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>
        </div>

        <div className={styles.moodWrap}>
          <div className={styles.moodFrame}>
            <div className={styles.boardHeader}>
              <h3 className={styles.boardTitle}>My Arangetram</h3>
              <span className={styles.boardMeta}>24 pieces · Updated 2 days ago</span>
            </div>

            <div className={styles.moodImage}>
              <Image
                src="/landing/create-moodboard-temple.jpg?v=4"
                alt="Temple moodboard collage — Bharatanatyam dancer with references, pillars, and lamps"
                fill
                sizes="(max-width:980px) 92vw, 680px"
                className="object-contain object-center"
                priority
                unoptimized
              />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.process} ref={processRef}>
        <h3 className={styles.processTitle}>Your Ideas, Beautifully Organised</h3>
        <div className={styles.processRow}>
          {STEPS.map((step, i) => (
            <div key={step.title} style={{ display: "contents" }}>
              {i > 0 ? (
                <div className={styles.arrow} aria-hidden>
                  <ArrowIcon />
                </div>
              ) : null}
              <div className={styles.step} style={{ animationDelay: step.delay }}>
                <div className={styles.numIcon}>{step.icon}</div>
                <div className={styles.stepTitle}>{step.title}</div>
                <div className={styles.stepDesc}>{step.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
