"use client";

import { Apple, BarChart3, Bell, Dumbbell, LineChart, Mail, Ruler, Scale, ShoppingCart, Smartphone } from "lucide-react";
import { BoxMock } from "../BoxMock";
import { Media } from "../Media";
import { Phone } from "../PhoneScreen";
import { useSite } from "../SiteContext";
import { BuyButton, Eyebrow, TrustRow } from "../Ui";

const FEATURE_ICONS = { progress: Scale, nutrition: Apple, workouts: Dumbbell, measures: Ruler, reminders: Bell, charts: BarChart3 } as const;
const STEP_ICONS = [ShoppingCart, Mail, Smartphone];

/** Reference 4, section 2: three phones and six feature cards. */
export function AppTools() {
  const { t } = useSite();
  const a = t.app.tools;

  return (
    <section id="herramientas" className="atools section" aria-labelledby="atools-title">
      <div className="wrap atools__grid">
        <div className="atools__copy">
          <Eyebrow>{a.eyebrow}</Eyebrow>
          <h2 id="atools-title" className="display h2">
            {a.title} <em className="em-gold">{a.titleEm}</em>
          </h2>
          <p>{a.body}</p>
        </div>

        <div className="phonefan" aria-hidden="true">
          <Phone screen="nutrition" className="phone--sm phonefan__a" />
          <Phone screen="progress" className="phone--sm phonefan__b" />
          <Phone screen="workouts" className="phone--sm phonefan__c" />
        </div>

        <ul className="fcards">
          {a.features.map((f) => {
            const Icon = FEATURE_ICONS[f.id as keyof typeof FEATURE_ICONS] ?? LineChart;
            return (
              <li key={f.id} className={`fcard fcard--${f.id}`}>
                <span className="fcard__icon">
                  <Icon aria-hidden="true" strokeWidth={1.5} />
                </span>
                <h3>{f.title}</h3>
                <p>{f.sub}</p>
              </li>
            );
          })}
        </ul>
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
        <div className="asteps__copy">
          <Eyebrow>{h.eyebrow}</Eyebrow>
          <h2 id="asteps-title" className="display h2">
            {h.title} <em className="em-gold">{h.titleEm}</em>
          </h2>
          <p>{h.lead}</p>
        </div>
        <ol className="stepsrow stepsrow--card">
          {h.steps.map((step, i) => {
            const Icon = STEP_ICONS[i];
            return (
              <li key={step.title}>
                <span className="stepsrow__num" aria-hidden="true">
                  {i + 1}
                </span>
                <Icon className="stepsrow__icon" aria-hidden="true" strokeWidth={1.4} />
                <span className="stepsrow__text">
                  <b>{step.title}</b>
                  {step.sub}
                </span>
              </li>
            );
          })}
        </ol>
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
          fallback={
            <div className="aclose__trio" aria-hidden="true">
              <BoxMock dosage="0.8" size={150} />
              <BoxMock dosage="9" size={150} />
              <BoxMock dosage="5.5" size={150} />
            </div>
          }
        />
        <div className="aclose__copy">
          <Eyebrow>{c.eyebrow}</Eyebrow>
          <h2 id="aclose-title" className="display h2">
            {c.title} <em>{c.titleEm}</em>
          </h2>
          <p>{c.lead}</p>
          <BuyButton size="lg">{c.cta}</BuyButton>
          <TrustRow items={4} />
        </div>
      </div>
    </section>
  );
}
