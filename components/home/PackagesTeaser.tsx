"use client";

import { motion } from "motion/react";
import { plans } from "@/lib/catalog";
import { Media } from "../Media";
import { fadeUp, revealList } from "../Motion";
import { PlanCard } from "../PlanCard";
import { useSite } from "../SiteContext";
import { Eyebrow } from "../Ui";

/** Reference 1, section 3: the three packages in compact form. */
export function PackagesTeaser() {
  const { t } = useSite();
  const k = t.home.packages;

  return (
    <section id="paquetes" className="hpack section section--tight" aria-labelledby="hpack-title">
      <div className="hpack__bg" aria-hidden="true">
        <Media id="H1" className="hpack__bgimg" alt="" sizes="100vw" position="50% 100%" tint="transparent" quiet />
      </div>
      <div className="wrap hpack__grid">
        <motion.div className="hpack__copy" {...revealList()}>
          <Eyebrow variants={fadeUp}>{k.eyebrow}</Eyebrow>
          <motion.h2 id="hpack-title" className="display h2" variants={fadeUp}>
            {k.title}
          </motion.h2>
          <motion.p variants={fadeUp}>{k.lead}</motion.p>
        </motion.div>
        <motion.div className="plans plans--compact" {...revealList(0.12)}>
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} compact />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
