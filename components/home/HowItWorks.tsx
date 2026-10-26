"use client";

import { motion } from "motion/react";
import { BarChart3, ClipboardList, Flower2 } from "lucide-react";
import { fadeUp, revealList } from "../Motion";
import { useSite } from "../SiteContext";
import { Eyebrow } from "../Ui";

const ICONS = [ClipboardList, BarChart3, Flower2];

/** Reference 1, section 5: three numbered steps on an open timeline. */
export function HowItWorks() {
  const { t } = useSite();
  const h = t.home.how;

  return (
    <section id="como-funciona" className="hhow section section--tight" aria-labelledby="hhow-title">
      <div className="wrap hhow__grid">
        <motion.div className="hhow__copy" {...revealList()}>
          <Eyebrow variants={fadeUp}>{h.eyebrow}</Eyebrow>
          <motion.h2 id="hhow-title" className="display h2" variants={fadeUp}>
            {h.title}
          </motion.h2>
          {h.lead && <motion.p variants={fadeUp}>{h.lead}</motion.p>}
          {h.note && (
            <motion.span className="hand hhow__hand" variants={fadeUp}>
              {h.note}
            </motion.span>
          )}
        </motion.div>
        <motion.ol className="stepsrow stepsrow--line" {...revealList(0.16, 0.1)}>
          {h.steps.map((step, i) => {
            const Icon = ICONS[i];
            return (
              <motion.li key={step.title} variants={fadeUp}>
                <span className="stepsrow__ring" aria-hidden="true">
                  <Icon className="stepsrow__icon" strokeWidth={1.5} />
                </span>
                <span className="stepsrow__text">
                  <small className="stepsrow__n">0{i + 1}</small>
                  <b>{step.title}</b>
                  {step.sub}
                </span>
              </motion.li>
            );
          })}
        </motion.ol>
      </div>
    </section>
  );
}
