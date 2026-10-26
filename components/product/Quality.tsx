"use client";

import { motion } from "motion/react";
import { Award, FlaskConical, Leaf, ShieldCheck } from "lucide-react";
import { Media } from "../Media";
import { fadeUp, revealList } from "../Motion";
import { useSite } from "../SiteContext";
import { Eyebrow, Leaves } from "../Ui";

const ICONS = [Award, ShieldCheck, Leaf, FlaskConical];
const TONES = ["gold", "leaf", "rose", "gold"] as const;
/* The three detail photos of mobile reference 2 ("Detalles que marcan la diferencia"). */
const DETAIL_IMAGES = ["D1", "D2", "D3"] as const;

/** Reference 2, section 3: the five boxes, large, beside the copy and three quality points. */
export function Quality() {
  const { t } = useSite();
  const q = t.product.quality;

  return (
    <section className="quality section" aria-labelledby="quality-title">
      <div className="wrap quality__grid">
        {/* On phones this wrapper is `display: contents`, so each child reveals itself. */}
        <div className="quality__copy">
          <motion.p className="eyebrow" {...revealList()} variants={fadeUp}>
            {q.eyebrow}
          </motion.p>
          <motion.h2 id="quality-title" className="display h2" {...revealList()} variants={fadeUp}>
            {q.title}
          </motion.h2>
          <motion.p {...revealList()} variants={fadeUp}>
            {q.body}
          </motion.p>

          <motion.ul className="quality__points" {...revealList(0.1, 0.1)}>
            {q.items.map((item, i) => {
              const Icon = ICONS[i];
              /* The fourth point completes the 2×2 grid of the phone layout only. */
              return (
                <motion.li key={item.title} className={`quality__point quality__point--${TONES[i]}${i === 3 ? " m-only" : ""}`} variants={fadeUp}>
                  <span className="quality__ring" aria-hidden="true">
                    <Icon strokeWidth={1.6} />
                  </span>
                  <span>
                    <b>{item.title}</b> {item.sub}
                  </span>
                </motion.li>
              );
            })}
          </motion.ul>
        </div>

        <figure className="quality__scene">
          <Media id="D1" className="quality__hero" alt={t.alt.boxTilted} sizes="(min-width: 900px) 1400px, 100vw" quality={90} fit="cover" position="50% 50%" tint="transparent" priority enter="reveal" />
          <Leaves className="quality__leaf quality__leaf--a" />
          <Leaves className="quality__leaf quality__leaf--b leaves--flip" />
        </figure>

        {/* Phones only: three close-ups with a caption each (mobile reference 2). */}
        <motion.div className="qdetails m-only" {...revealList(0.12)}>
          <Eyebrow variants={fadeUp}>{q.details.eyebrow}</Eyebrow>
          <ul className="qdetails__list">
            {q.details.items.map((item, i) => (
              <motion.li key={item.title} variants={fadeUp}>
                <Media id={DETAIL_IMAGES[i]} className="qdetails__img" alt={[t.alt.boxTilted, t.alt.boxCorner, t.alt.tablets][i]} sizes="300px" quality={85} fit="cover" position="50% 50%" tint="#F2E8DB" quiet />
                <b>{item.title}</b>
                <span>{item.sub}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
