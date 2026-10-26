"use client";

import { motion } from "motion/react";
import { CircleCheck } from "lucide-react";
import { dosages } from "@/lib/catalog";
import { fill } from "@/lib/i18n";
import { BoxMock } from "../BoxMock";
import { Media } from "../Media";
import { fadeUp, lift, revealList } from "../Motion";
import { useSite } from "../SiteContext";
import { BuyButton, Eyebrow } from "../Ui";

/** Reference 2, section 2: five dosage cards. */
export function DosageGrid() {
  const { t } = useSite();
  const d = t.product.dosage;

  return (
    <section id="dosis" className="dgrid section" aria-labelledby="dgrid-title">
      <div className="wrap">
        <motion.div className="section-head" {...revealList()}>
          <Eyebrow variants={fadeUp}>{d.eyebrow}</Eyebrow>
          <motion.h2 id="dgrid-title" className="display h2" variants={fadeUp}>
            {d.title}
          </motion.h2>
          <motion.p variants={fadeUp}>{d.lead}</motion.p>
        </motion.div>

        <motion.ul className="dcards" {...revealList(0.1)}>
          {dosages.map((x) => {
            const copy = t.dosages[x.id];
            return (
              <motion.li
                key={x.id}
                id={`dosis-${x.id.replace(".", "-")}`}
                className="dcard"
                style={{ ["--c" as string]: x.color, ["--wash" as string]: x.wash }}
                variants={fadeUp}
                whileHover={lift}
              >
                <Media
                  id={x.image}
                  className="dcard__img"
                  alt={fill(t.alt.box, { mg: x.id })}
                  sizes="(min-width: 900px) 520px, 90vw" quality={90}
                  fit="contain"
                  tint="transparent"
                  quiet
                  fallback={<BoxMock dosage={x.id} size={170} />}
                />
                <p className="dcard__mg">{x.id} mg</p>
                <h3 className="dcard__name">{copy.name}</h3>
                <p className="dcard__desc">{copy.desc}</p>
                <ul className="dcard__points">
                  {copy.points.map((pt) => (
                    <li key={pt}>
                      <CircleCheck aria-hidden="true" strokeWidth={1.8} />
                      {pt}
                    </li>
                  ))}
                </ul>
                <BuyButton dosage={x.id} size="sm" className="btn--gold-soft dcard__cta">
                  {d.cta} {x.id} mg
                </BuyButton>
              </motion.li>
            );
          })}
        </motion.ul>

        <p className="dgrid__note">{d.note}</p>
      </div>
    </section>
  );
}
