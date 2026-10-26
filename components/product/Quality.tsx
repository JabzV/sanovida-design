"use client";

import { Award, FlaskConical, Leaf, ShieldCheck } from "lucide-react";
import { Media } from "../Media";
import { useSite } from "../SiteContext";
import { Eyebrow, Leaves } from "../Ui";

const ICONS = [Award, ShieldCheck, Leaf, FlaskConical];
const TONES = ["gold", "leaf", "rose", "gold"] as const;
/* The three detail photos of mobile reference 2 ("Detalles que marcan la diferencia"). */
const DETAIL_IMAGES = ["D1", "D2", "D3"] as const;

/** Reference 2, section 3: the five boxes, large, beside the copy and three quality points. */
export function Quality() {
  const { t } = useSite();
  const q = t.product.quality;

  return (
    <section className="quality section" aria-labelledby="quality-title">
      <div className="wrap quality__grid">
        <div className="quality__copy">
          <Eyebrow>{q.eyebrow}</Eyebrow>
          <h2 id="quality-title" className="display h2">
            {q.title}
          </h2>
          <p>{q.body}</p>

          <ul className="quality__points">
            {q.items.map((item, i) => {
              const Icon = ICONS[i];
              /* The fourth point completes the 2×2 grid of the phone layout only. */
              return (
                <li key={item.title} className={`quality__point quality__point--${TONES[i]}${i === 3 ? " m-only" : ""}`}>
                  <span className="quality__ring" aria-hidden="true">
                    <Icon strokeWidth={1.6} />
                  </span>
                  <span>
                    <b>{item.title}</b> {item.sub}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        <figure className="quality__scene">
          <Media id="D1" className="quality__hero" alt={t.alt.boxTilted} sizes="(min-width: 900px) 1400px, 100vw" quality={90} fit="cover" position="50% 50%" tint="transparent" priority />
          <Leaves className="quality__leaf quality__leaf--a" />
          <Leaves className="quality__leaf quality__leaf--b leaves--flip" />
        </figure>

        {/* Phones only: three close-ups with a caption each (mobile reference 2). */}
        <div className="qdetails m-only">
          <Eyebrow>{q.details.eyebrow}</Eyebrow>
          <ul className="qdetails__list">
            {q.details.items.map((item, i) => (
              <li key={item.title}>
                <Media id={DETAIL_IMAGES[i]} className="qdetails__img" alt={[t.alt.boxTilted, t.alt.boxCorner, t.alt.tablets][i]} sizes="300px" quality={85} fit="cover" position="50% 50%" tint="#F2E8DB" quiet />
                <b>{item.title}</b>
                <span>{item.sub}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
