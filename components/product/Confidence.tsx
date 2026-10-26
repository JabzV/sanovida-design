"use client";

import { CreditCard, FlaskConical, Headset, Heart, PackageCheck, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { Media } from "../Media";
import { useSite } from "../SiteContext";
import { Eyebrow, Leaves } from "../Ui";

const ICONS = [FlaskConical, ShieldCheck, Sparkles, Heart, Truck, CreditCard, Headset, PackageCheck];
/* Alternate the ring tones so the row reads as a pattern rather than a list. */
const TONES = ["leaf", "gold", "rose", "leaf", "gold", "rose", "leaf", "gold"] as const;

/** Reference 2, section 4: eight reassurances as a divided row of ring icons, the hero's trust motif. */
export function Confidence() {
  const { t } = useSite();
  const c = t.product.confidence;

  return (
    <section className="confidence" aria-labelledby="confidence-title">
      {/* The greenery wash, faded, the same backdrop as the home packages and the FAQ. */}
      <div className="confidence__bg" aria-hidden="true">
        <Media id="H1" className="confidence__bgimg" alt="" sizes="100vw" position="50% 100%" tint="transparent" quiet />
      </div>
      <div className="wrap">
        <div className="confidence__head">
          <Eyebrow>{c.eyebrow}</Eyebrow>
          <h2 id="confidence-title" className="display h2">
            {c.title}
          </h2>
          {c.lead && <p>{c.lead}</p>}
          <span className="confidence__leaves" aria-hidden="true">
            <Leaves />
            <Leaves className="leaves--flip" />
          </span>
        </div>

        <ul className="trustgrid">
          {c.items.map((item, i) => {
            const Icon = ICONS[i];
            return (
              <li key={item.title + item.sub} className={`trustgrid__item trustgrid__item--${TONES[i]}`}>
                <span className="trustgrid__ring">
                  <Icon aria-hidden="true" strokeWidth={1.6} />
                </span>
                <span className="trustgrid__label">
                  {item.title}
                  <br />
                  {item.sub}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
