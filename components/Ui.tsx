"use client";

import Link from "next/link";
import type { ComponentType, ReactNode, SVGProps } from "react";
import { motion, type Variants } from "motion/react";
import { ArrowRight, CreditCard, MessageCircle, ShieldCheck, Truck } from "lucide-react";
import { checkoutHref } from "@/lib/routes";
import { EASE, fadeUp, pop, stagger, viewportOnce } from "./Motion";

/** Props that make an element reveal itself on scroll, for places with no animated parent. */
const selfReveal = { initial: "hidden", whileInView: "show", viewport: viewportOnce } as const;
import { useSite } from "./SiteContext";

type IconType = ComponentType<SVGProps<SVGSVGElement> & { strokeWidth?: number }>;

const MotionLink = motion.create(Link);

/** Small gold tracked label above a heading, as in the reference. Animates when given `variants`. */
export function Eyebrow({ children, className = "", variants, reveal }: { children: ReactNode; className?: string; variants?: Variants; reveal?: boolean }) {
  return (
    <motion.p className={`eyebrow ${className}`} variants={reveal ? fadeUp : variants} {...(reveal ? selfReveal : {})}>
      {children}
    </motion.p>
  );
}

/** Renders a string where *text* becomes the pink italic accent. */
export function Accent({ text }: { text: string }) {
  const parts = text.split(/\*([^*]+)\*/g);
  return (
    <>
      {parts.map((part, i) => (i % 2 === 1 ? <em key={i}>{part}</em> : <span key={i}>{part}</span>))}
    </>
  );
}

/** Gold pill call-to-action that leads to the checkout. Lifts on hover, settles on press. */
export function BuyButton({
  children,
  plan,
  dosage,
  size,
  className = "",
  variants,
  reveal,
}: {
  children?: ReactNode;
  plan?: string;
  dosage?: string;
  size?: "lg" | "sm";
  className?: string;
  variants?: Variants;
  reveal?: boolean;
}) {
  const { locale, t } = useSite();
  return (
    <MotionLink
      href={checkoutHref(locale, plan, dosage)}
      className={`btn btn--gold${size ? ` btn--${size}` : ""} ${className}`}
      variants={reveal ? fadeUp : variants}
      {...(reveal ? selfReveal : {})}
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.3, ease: EASE }}
    >
      {children ?? t.nav.buy}
      <ArrowRight aria-hidden="true" />
    </MotionLink>
  );
}

/** Icon in a thin ring with a two-line label; the benefit row under every hero. */
export function RingItem({ icon: Icon, title, sub, tone = "leaf", variants }: { icon: IconType; title: string; sub?: string; tone?: "leaf" | "gold" | "rose"; variants?: Variants }) {
  return (
    <motion.li className={`ringitem ringitem--${tone}`} variants={variants}>
      <span className="ring">
        <Icon aria-hidden="true" strokeWidth={1.6} />
      </span>
      <span className="ringitem__label">
        {title}
        {sub && (
          <>
            <br />
            {sub}
          </>
        )}
      </span>
    </motion.li>
  );
}

/**
 * Hand-written note with a gold swash under it. The note pops in and the
 * swash draws itself, as if just written.
 */
export function HandNote({ lines, note, className = "" }: { lines: string[]; note?: string; className?: string }) {
  return (
    <motion.p className={`handnote ${className}`} initial="hidden" whileInView="show" viewport={viewportOnce} variants={stagger(0.12)}>
      <motion.span className="hand" variants={pop}>
        {lines.map((line, i) => (
          <span key={i} className="hand__line">
            {line}
          </span>
        ))}
      </motion.span>
      <svg className="handnote__swash" viewBox="0 0 220 24" aria-hidden="true">
        <motion.path
          d="M4 18C60 6 130 4 216 10"
          fill="none"
          stroke="var(--gold)"
          strokeWidth="2.4"
          strokeLinecap="round"
          variants={{ hidden: { pathLength: 0, opacity: 0 }, show: { pathLength: 1, opacity: 1, transition: { duration: 0.9, ease: EASE } } }}
        />
      </svg>
      {note && (
        <motion.span className="handnote__note" variants={fadeUp}>
          {note}
        </motion.span>
      )}
    </motion.p>
  );
}

/** The three small reassurances shown under hero and plan CTAs. */
export function TrustRow({ items = 3, className = "", variants, reveal }: { items?: 3 | 4; className?: string; variants?: Variants; reveal?: boolean }) {
  const { t } = useSite();
  const all: { icon: IconType; label: string }[] = [
    { icon: Truck, label: t.trust.shipping },
    { icon: ShieldCheck, label: t.trust.secure },
    { icon: CreditCard, label: t.trust.payments },
    { icon: MessageCircle, label: t.trust.whatsapp },
  ];
  return (
    <motion.ul className={`trustrow ${className}`} variants={reveal ? fadeUp : variants} {...(reveal ? selfReveal : {})}>
      {all.slice(0, items).map(({ icon: Icon, label }) => (
        <li key={label}>
          <Icon aria-hidden="true" strokeWidth={1.6} />
          <span>{label}</span>
        </li>
      ))}
    </motion.ul>
  );
}

export function StoreBadges({ className = "", variants }: { className?: string; variants?: Variants }) {
  const { t } = useSite();
  return (
    <motion.div className={`stores ${className}`} variants={variants}>
      <motion.span className="store" whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="currentColor"
            d="M16.4 12.6c0-2.4 2-3.6 2.1-3.7-1.2-1.7-3-1.9-3.6-2-1.5-.2-3 .9-3.7.9-.8 0-2-.9-3.2-.9-1.7 0-3.2 1-4 2.4-1.7 3-.4 7.4 1.2 9.8.8 1.2 1.8 2.5 3 2.4 1.2 0 1.7-.8 3.1-.8s1.9.8 3.2.8c1.3 0 2.1-1.2 2.9-2.4.9-1.4 1.3-2.7 1.3-2.8-.1 0-2.3-.9-2.3-3.7ZM14 5.4c.7-.8 1.1-1.9 1-3-1 0-2.1.7-2.8 1.5-.6.7-1.2 1.8-1 2.9 1 .1 2.1-.6 2.8-1.4Z"
          />
        </svg>
        <span>
          <small>{t.app.stores.apple}</small>App Store
        </span>
      </motion.span>
      <motion.span className="store" whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path fill="#34A853" d="M3.6 2.3 13.5 12l-9.9 9.7c-.4-.2-.6-.6-.6-1.1V3.4c0-.5.2-.9.6-1.1Z" />
          <path fill="#FBBC04" d="m17 8.6-3.5 3.4 3.5 3.4 3.9-2.2c1.1-.6 1.1-1.8 0-2.4L17 8.6Z" />
          <path fill="#EA4335" d="M13.5 12 3.6 21.7c.4.2.9.2 1.4-.1L17 15.4 13.5 12Z" />
          <path fill="#4285F4" d="M13.5 12 17 8.6 5 2.4c-.5-.3-1-.3-1.4-.1L13.5 12Z" />
        </svg>
        <span>
          <small>{t.app.stores.google}</small>Google Play
        </span>
      </motion.span>
    </motion.div>
  );
}

/** Decorative leaf sprigs that frame the reference's CTAs. */
export function Leaves({ className = "" }: { className?: string }) {
  return (
    <svg className={`leaves ${className}`} viewBox="0 0 64 40" aria-hidden="true">
      <path d="M4 36C14 30 24 20 30 6" fill="none" stroke="var(--leaf)" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M12 29c-4-3-5-8-3-13 5 1 8 6 7 11-1 1-3 2-4 2Z" fill="var(--leaf)" />
      <path d="M20 20c-3-4-2-9 1-13 4 3 5 8 3 12l-4 1Z" fill="var(--leaf)" opacity=".8" />
      <path d="M28 12c-1-5 2-9 6-11 2 4 1 9-2 12l-4-1Z" fill="var(--leaf)" opacity=".65" />
    </svg>
  );
}
