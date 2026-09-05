"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

/** Premium temple-stage easing — smooth, no bounce */
export const easeDance = [0.22, 1, 0.36, 1] as const;
export const easeSilk = [0.45, 0.05, 0.25, 1] as const;

export function FadeRise({
  children,
  className,
  delay = 0,
  ...props
}: HTMLMotionProps<"div"> & { delay?: number }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={cn(className)}
      initial={reduced ? false : { opacity: 0, y: 18 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.7, delay, ease: easeDance }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/** Whole-section enter — softer and slower than card reveals */
export function SectionReveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={cn(className)}
      initial={reduced ? false : { opacity: 0, y: 28 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.85, delay, ease: easeSilk }}
    >
      {children}
    </motion.div>
  );
}

export function HoverLift({
  children,
  className,
  ...props
}: HTMLMotionProps<"div">) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={cn(className)}
      whileHover={reduced ? undefined : { y: -3 }}
      transition={{ duration: 0.28, ease: easeDance }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function GoldLine({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={cn("h-px origin-left bg-gradient-to-r from-gold to-transparent", className)}
      initial={reduced ? false : { scaleX: 0, opacity: 0.4 }}
      whileInView={reduced ? undefined : { scaleX: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: easeSilk }}
    />
  );
}
