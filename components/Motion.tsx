"use client";

import type { ReactNode } from "react";
import { MotionConfig, motion, type Variants } from "motion/react";

/* ------------------------------------------------------------------ */
/* Shared motion vocabulary. Every animated element on the site uses   */
/* these few variants so the whole page moves with one rhythm.         */
/* ------------------------------------------------------------------ */

/** The site's easing (the same curve as `--ease-out` in globals.css). */
export const EASE = [0.16, 1, 0.3, 1] as const;

/** Reveal once, when about a fifth of the element has scrolled into view. */
export const viewportOnce = { once: true, amount: 0.2 } as const;

/** Fade and rise: the basic entrance of any block. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

/** Fade and grow slightly: for notes, badges and photos. */
export const pop: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: EASE } },
};

/** A container whose children (with `fadeUp`/`pop`) enter one after another. */
export const stagger = (gap = 0.08, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: gap, delayChildren: delay } },
});

/** Props for a list that reveals its items in sequence when scrolled into view. */
export const revealList = (gap = 0.08, delay = 0) =>
  ({ initial: "hidden", whileInView: "show", viewport: viewportOnce, variants: stagger(gap, delay) }) as const;

/** Lift on hover: cards and boxes. */
export const lift = { y: -4, transition: { duration: 0.35, ease: EASE } } as const;

/** Honours the visitor's reduced-motion setting (transforms stop, fades stay). */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={{ ease: EASE }}>
      {children}
    </MotionConfig>
  );
}

/** A block that fades up when scrolled into view. */
export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div className={className} initial="hidden" whileInView="show" viewport={viewportOnce} variants={fadeUp} transition={{ delay }}>
      {children}
    </motion.div>
  );
}
