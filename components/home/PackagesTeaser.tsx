"use client";

import { plans } from "@/lib/catalog";
import { Media } from "../Media";
import { PlanCard } from "../PlanCard";
import { useSite } from "../SiteContext";
import { Eyebrow } from "../Ui";

/** Reference 1, section 3: the three packages in compact form. */
export function PackagesTeaser() {
  const { t } = useSite();
  const k = t.home.packages;

  return (
    <section id="paquetes" className="hpack section section--tight" aria-labelledby="hpack-title">
      <div className="hpack__bg" aria-hidden="true">
        <Media id="H1" className="hpack__bgimg" alt="" sizes="100vw" position="50% 100%" tint="transparent" quiet />
      </div>
      <div className="wrap hpack__grid">
        <div className="hpack__copy">
          <Eyebrow>{k.eyebrow}</Eyebrow>
          <h2 id="hpack-title" className="display h2">
            {k.title}
          </h2>
          <p>{k.lead}</p>
        </div>
        <div className="plans plans--compact">
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} compact />
          ))}
        </div>
      </div>
    </section>
  );
}
