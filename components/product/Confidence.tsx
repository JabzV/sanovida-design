"use client";

import { motion } from "motion/react";
import { CreditCard, FlaskConical, Headset, Heart, PackageCheck, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { Media } from "../Media";
import { fadeUp, revealList } from "../Motion";
import { useSite } from "../SiteContext";
import { Eyebrow, Leaves } from "../Ui";

const ICONS = [FlaskConical, ShieldCheck, Sparkles, Heart, Truck, CreditCard, Headset, PackageCheck];
/* Alternate the ring tones so the row reads as a pattern rather than a list. */
const TONES = ["leaf", "gold", "rose", "leaf", "gold", "rose", "leaf", "gold"] as const;

/** Reference 2, section 4: eight reassurances as a divided row of ring icons, the hero's trust motif. */
export function Confidence() {
  const { t } = useSite();
  const c = t.product.confidence;

  return (
    <section className="confidence" aria-labelledby="confidence-title">
      {/* The greenery wash, faded, the same backdrop as the home packages and the FAQ. */}
      <div className="confidence__bg" aria-hidden="true">
        <Media id="H1" className="confidence__bgimg" alt="" sizes="100vw" position="50% 100%" tint="transparent" quiet />
      </div>
      <div className="wrap">
        <motion.div className="confidence__head" {...revealList()}>
          <Eyebrow variants={fadeUp}>{c.eyebrow}</Eyebrow>
          <motion.h2 id="confidence-title" className="display h2" variants={fadeUp}>
            {c.title}
          </motion.h2>
          {c.lead && <motion.p variants={fadeUp}>{c.lead}</motion.p>}
          <motion.span className="confidence__leaves" aria-hidden="true" variants={fadeUp}>
            <Leaves />
            <Leaves className="leaves--flip" />
          </motion.span>
        </motion.div>

        <motion.ul className="trustgrid" {...revealList(0.07)}>
          {c.items.map((item, i) => {
            const Icon = ICONS[i];
            return (
              <motion.li key={item.title + item.sub} className={`trustgrid__item trustgrid__item--${TONES[i]}`} variants={fadeUp}>
                <span className="trustgrid__ring">
                  <Icon aria-hidden="true" strokeWidth={1.6} />
                </span>
                <span className="trustgrid__label">
                  {item.title}
                  <br />
                  {item.sub}
                </span>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
