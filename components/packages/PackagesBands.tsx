"use client";

import { CreditCard, Flower2, Headset, Heart, Leaf, ShieldCheck, Truck, Zap } from "lucide-react";
import { Media } from "../Media";
import { useSite } from "../SiteContext";
import { HandNote } from "../Ui";

const BAND_ICONS = [ShieldCheck, Truck, CreditCard, Headset];
const LIFE_ICONS = [Flower2, Zap, Heart, Leaf];

/** Reference 3, section 3: four reassurances on a pale green band. */
export function AssuranceBand() {
  const { t } = useSite();
  return (
    <section className="aband" aria-label={t.product.confidence.title}>
      <ul className="wrap aband__list">
        {t.packages.band.map((item, i) => {
          const Icon = BAND_ICONS[i];
          return (
            <li key={item.title}>
              <Icon aria-hidden="true" strokeWidth={1.4} />
              <span>
                <b>{item.title}</b>
                {item.sub}
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/** Reference 3, section 4: "Más que un producto, una vida más plena". */
export function LifeBand() {
  const { t } = useSite();
  const l = t.packages.life;
  return (
    <section className="lifeband" aria-labelledby="lifeband-title">
      <Media id="F2" className="lifeband__bg" alt={t.alt.closing} sizes="100vw" position="10% 40%" tint="#F2E6DA" />
      <div className="wrap lifeband__inner">
        <h2 id="lifeband-title" className="display lifeband__title">
          {l.title} <em>{l.titleEm}</em>
        </h2>
        <ul className="lifeband__items">
          {l.items.map((label, i) => {
            const Icon = LIFE_ICONS[i];
            return (
              <li key={label}>
                <Icon aria-hidden="true" strokeWidth={1.4} />
                {label}
              </li>
            );
          })}
        </ul>
        <HandNote lines={l.handLines} className="lifeband__hand" />
      </div>
    </section>
  );
}
