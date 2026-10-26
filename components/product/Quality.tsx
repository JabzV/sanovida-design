"use client";

import { Award, Leaf, ShieldCheck } from "lucide-react";
import { Media } from "../Media";
import { useSite } from "../SiteContext";
import { Eyebrow, Leaves } from "../Ui";

const ICONS = [Award, ShieldCheck, Leaf];
const TONES = ["gold", "leaf", "rose"] as const;

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
              return (
                <li key={item.title} className={`quality__point quality__point--${TONES[i]}`}>
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
      </div>
    </section>
  );
}
