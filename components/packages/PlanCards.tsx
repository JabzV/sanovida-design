"use client";

import { motion } from "motion/react";
import { plans } from "@/lib/catalog";
import { fadeUp, revealList } from "../Motion";
import { PlanCard } from "../PlanCard";
import { useSite } from "../SiteContext";
import { Eyebrow } from "../Ui";

/** Reference 3, section 2: the three full package cards. */
export function PlanCards() {
  const { t } = useSite();
  const k = t.packages.cards;

  return (
    <section id="planes" className="ppack section section--tight" aria-labelledby="ppack-title">
      <div className="wrap">
        <motion.div className="ppack__head" {...revealList()}>
          <Eyebrow variants={fadeUp}>{k.eyebrow}</Eyebrow>
          <motion.h2 id="ppack-title" className="display h2" variants={fadeUp}>
            {k.title}
          </motion.h2>
          <motion.p variants={fadeUp}>{k.lead}</motion.p>
        </motion.div>
        <motion.div className="plans plans--full" {...revealList(0.12)}>
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
