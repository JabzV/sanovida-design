"use client";

import { motion } from "motion/react";
import { Apple, BarChart3, Bell, Dumbbell, LineChart, Mail, Ruler, Scale, ShoppingCart, Smartphone } from "lucide-react";
import { BoxMock } from "../BoxMock";
import { Media } from "../Media";
import { fadeUp, lift, revealList } from "../Motion";
import { Phone } from "../PhoneScreen";
import { useSite } from "../SiteContext";
import { BuyButton, Eyebrow, HandNote, TrustRow } from "../Ui";

const FEATURE_ICONS = { progress: Scale, nutrition: Apple, workouts: Dumbbell, measures: Ruler, reminders: Bell, charts: BarChart3 } as const;
const STEP_ICONS = [ShoppingCart, Mail, Smartphone];

/** Reference 4, section 2: three phones and six feature cards. */
export function AppTools() {
  const { t } = useSite();
  const a = t.app.tools;

  return (
    <section id="herramientas" className="atools section" aria-labelledby="atools-title">
      <div className="wrap atools__grid">
        <motion.div className="atools__copy" {...revealList()}>
          <Eyebrow variants={fadeUp}>{a.eyebrow}</Eyebrow>
          <motion.h2 id="atools-title" className="display h2" variants={fadeUp}>
            {a.title} <em className="em-gold">{a.titleEm}</em>
          </motion.h2>
          <motion.p variants={fadeUp}>{a.body}</motion.p>
        </motion.div>

        {/* The fan rises as one piece; the phones keep their own CSS offsets. */}
        <motion.div className="phonefan" aria-hidden="true" {...revealList()} variants={fadeUp}>
          <Phone screen="nutrition" className="phone--sm phonefan__a" />
          <Phone screen="progress" className="phone--sm phonefan__b" />
          <Phone screen="workouts" className="phone--sm phonefan__c" />
          {/* Phones only: the hand-written note beside the fan (mobile reference 4). */}
          <HandNote lines={a.handLines} className="phonefan__hand m-only" />
        </motion.div>

        <motion.ul className="fcards" {...revealList(0.08)}>
          {a.features.map((f) => {
            const Icon = FEATURE_ICONS[f.id as keyof typeof FEATURE_ICONS] ?? LineChart;
            return (
              <motion.li key={f.id} className={`fcard fcard--${f.id}`} variants={fadeUp} whileHover={lift}>
                <span className="fcard__icon">
                  <Icon aria-hidden="true" strokeWidth={1.5} />
                </span>
                <h3>{f.title}</h3>
                <p>{f.sub}</p>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}

/** Reference 4, section 3: how the access works, in three steps. */
export function AppSteps() {
  const { t } = useSite();
  const h = t.app.how;

  return (
    <section id="como-funciona" className="asteps section section--tight" aria-labelledby="asteps-title">
      <div className="wrap asteps__grid">
        <motion.div className="asteps__copy" {...revealList()}>
          <Eyebrow variants={fadeUp}>{h.eyebrow}</Eyebrow>
          <motion.h2 id="asteps-title" className="display h2" variants={fadeUp}>
            {h.title} <em className="em-gold">{h.titleEm}</em>
          </motion.h2>
          <motion.p variants={fadeUp}>{h.lead}</motion.p>
        </motion.div>
        <motion.ol className="stepsrow stepsrow--card" {...revealList(0.16, 0.1)}>
          {h.steps.map((step, i) => {
            const Icon = STEP_ICONS[i];
            return (
              <motion.li key={step.title} variants={fadeUp}>
                <span className="stepsrow__num" aria-hidden="true">
                  {i + 1}
                </span>
                <Icon className="stepsrow__icon" aria-hidden="true" strokeWidth={1.4} />
                <span className="stepsrow__text">
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

/** Reference 4, section 4: three boxes and the closing CTA. */
export function AppClosing() {
  const { t } = useSite();
  const c = t.app.closing;

  return (
    <section className="aclose" aria-labelledby="aclose-title">
      <div className="wrap aclose__grid">
        <Media
          id="F3"
          className="aclose__img"
          alt={t.alt.trio}
          sizes="(min-width: 900px) 1200px, 100vw"
          quality={90}
          fit="cover"
          tint="transparent"
          quiet
          enter="reveal"
          fallback={
            <div className="aclose__trio" aria-hidden="true">
              <BoxMock dosage="0.8" size={150} />
              <BoxMock dosage="9" size={150} />
              <BoxMock dosage="5.5" size={150} />
            </div>
          }
        />
        {/* On phones this wrapper is `display: contents`, so each child reveals itself. */}
        <div className="aclose__copy">
          <Eyebrow reveal>{c.eyebrow}</Eyebrow>
          <motion.h2 id="aclose-title" className="display h2" {...revealList()} variants={fadeUp}>
            {c.title} <em>{c.titleEm}</em>
          </motion.h2>
          <motion.p {...revealList()} variants={fadeUp}>
            {c.lead}
          </motion.p>
          <BuyButton size="lg" reveal>
            {c.cta}
          </BuyButton>
          <TrustRow items={4} reveal />
        </div>
      </div>
    </section>
  );
}
