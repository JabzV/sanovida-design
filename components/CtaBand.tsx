"use client";

import { motion } from "motion/react";
import { CreditCard, MessageCircle, ShieldCheck, Truck } from "lucide-react";
import type { ImageId } from "@/lib/catalog";
import { Media } from "./Media";
import { fadeUp, revealList } from "./Motion";
import { useSite } from "./SiteContext";
import { Accent, BuyButton, Eyebrow, Leaves, RingItem } from "./Ui";

interface CtaBandProps {
  eyebrow?: string;
  title: string;
  lead: string;
  cta: string;
  image: ImageId;
  alt: string;
  /** Show the four trust rings to the right of the button (reference 1). */
  trust?: boolean;
  /** Centered layout (reference 2) instead of the split layout. */
  centered?: boolean;
  /** Show the trust rings on phones only (mobile reference 2 has them, desktop reference 2 does not). */
  mobileTrust?: boolean;
}

/** The sunlit closing band with a gold CTA framed by leaves. */
export function CtaBand({ eyebrow, title, lead, cta, image, alt, trust, centered, mobileTrust }: CtaBandProps) {
  const { t } = useSite();
  const icons = [Truck, ShieldCheck, CreditCard, MessageCircle];
  const labels = [t.trust.fast, t.trust.secure100, t.trust.payments, t.trust.support];

  return (
    <section className={`ctaband${centered ? " ctaband--center" : ""}`} aria-labelledby="ctaband-title">
      <Media id={image} className="ctaband__bg" alt={alt} sizes="100vw" position="50% 0%" tint="#F2E6DA" />
      <div className="wrap ctaband__inner">
        <motion.div className="ctaband__copy" {...revealList(0.1)}>
          {eyebrow && <Eyebrow variants={fadeUp}>{eyebrow}</Eyebrow>}
          <motion.h2 id="ctaband-title" className="display ctaband__title" variants={fadeUp}>
            <Accent text={title} />
          </motion.h2>
          <motion.p variants={fadeUp}>{lead}</motion.p>
          <motion.div className="ctaband__cta" variants={fadeUp}>
            <Leaves />
            <BuyButton size="lg">{cta}</BuyButton>
            <Leaves className="leaves--flip" />
          </motion.div>
        </motion.div>
        {(trust || mobileTrust) && (
          <motion.ul className={`ringrow ringrow--stack ctaband__trust${!trust ? " m-only" : ""}`} {...revealList(0.1, 0.2)}>
            {labels.map((label, i) => {
              const [a, ...rest] = label.split(" ");
              return <RingItem key={label} icon={icons[i]} title={a} sub={rest.join(" ")} variants={fadeUp} />;
            })}
          </motion.ul>
        )}
      </div>
    </section>
  );
}
