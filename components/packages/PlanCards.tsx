"use client";

import { plans } from "@/lib/catalog";
import { PlanCard } from "../PlanCard";
import { useSite } from "../SiteContext";
import { Eyebrow } from "../Ui";

/** Reference 3, section 2: the three full package cards. */
export function PlanCards() {
  const { t } = useSite();
  const k = t.packages.cards;

  return (
    <section id="planes" className="ppack section section--tight" aria-labelledby="ppack-title">
      <div className="wrap">
        <div className="ppack__head">
          <Eyebrow>{k.eyebrow}</Eyebrow>
          <h2 id="ppack-title" className="display h2">
            {k.title}
          </h2>
          <p>{k.lead}</p>
        </div>
        <div className="plans plans--full">
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  );
}
