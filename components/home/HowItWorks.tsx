"use client";

import { BarChart3, ClipboardList, Flower2 } from "lucide-react";
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
        <div className="hhow__copy">
          <Eyebrow>{h.eyebrow}</Eyebrow>
          <h2 id="hhow-title" className="display h2">
            {h.title}
          </h2>
          {h.lead && <p>{h.lead}</p>}
          {h.note && <span className="hand hhow__hand">{h.note}</span>}
        </div>
        <ol className="stepsrow stepsrow--line">
          {h.steps.map((step, i) => {
            const Icon = ICONS[i];
            return (
              <li key={step.title}>
                <span className="stepsrow__ring" aria-hidden="true">
                  <Icon className="stepsrow__icon" strokeWidth={1.5} />
                </span>
                <span className="stepsrow__text">
                  <small className="stepsrow__n">0{i + 1}</small>
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
