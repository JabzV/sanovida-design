"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { FlaskConical, Heart, ShieldCheck, Sparkles } from "lucide-react";
import { dosages } from "@/lib/catalog";
import { fill } from "@/lib/i18n";
import { href } from "@/lib/routes";
import { BoxMock } from "../BoxMock";
import { Media } from "../Media";
import { fadeUp, revealList } from "../Motion";
import { useSite } from "../SiteContext";
import { Accent, Eyebrow, RingItem } from "../Ui";

const ICONS = [FlaskConical, ShieldCheck, Sparkles, Heart];

/** Reference 1, section 2: Orforglipron intro with the five boxes. */
export function ProductIntro() {
  const { t, locale } = useSite();
  const p = t.home.product;

  return (
    <section id="producto" className="hprod section" aria-labelledby="hprod-title">
      <div className="wrap hprod__grid">
        <motion.div className="hprod__copy" {...revealList(0.08)}>
          <Eyebrow variants={fadeUp}>{p.eyebrow}</Eyebrow>
          <motion.h2 id="hprod-title" className="display hprod__title" variants={fadeUp}>
            {p.title}
          </motion.h2>
          <motion.p className="hprod__subtitle" variants={fadeUp}>
            <Accent text={p.subtitle} />
          </motion.p>
          <motion.p className="hprod__body" variants={fadeUp}>
            {p.body}
          </motion.p>
          <ul className="ringrow ringrow--divided">
            {p.icons.map((item, i) => (
              <RingItem key={item.title} icon={ICONS[i]} title={item.title} sub={item.sub} variants={fadeUp} />
            ))}
          </ul>
        </motion.div>

        <motion.ul className="boxrow" {...revealList(0.1, 0.1)}>
          {dosages.map((d) => (
            <motion.li key={d.id} className="boxrow__item" style={{ ["--c" as string]: d.color, ["--wash" as string]: d.wash }} variants={fadeUp}>
              <Link href={href(locale, "product", `dosis-${d.id.replace(".", "-")}`)} className="boxrow__link">
                <Media
                  id={d.image}
                  className="boxrow__img"
                  alt={fill(t.alt.box, { mg: d.id })}
                  sizes="(min-width: 900px) 480px, 80vw" quality={90}
                  fit="contain"
                  tint="transparent"
                  quiet
                  fallback={<BoxMock dosage={d.id} size={150} />}
                />
                <span className="boxrow__mg">{d.id} mg</span>
                <span className="pill">{t.dosages[d.id].name}</span>
                <span className="boxrow__desc">{t.dosages[d.id].desc}</span>
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
