"use client";

import { motion } from "motion/react";
import { CircleCheck, Tag } from "lucide-react";
import { formatMXN, type Plan } from "@/lib/catalog";
import { fill } from "@/lib/i18n";
import { BoxStack } from "./BoxMock";
import { Media } from "./Media";
import { fadeUp, lift } from "./Motion";
import { useSite } from "./SiteContext";
import { BuyButton, TrustRow } from "./Ui";

/**
 * Package card. `compact` is the home-page teaser (reference 1);
 * the full card is the packages page (reference 3).
 */
export function PlanCard({ plan, compact, dosage }: { plan: Plan; compact?: boolean; dosage?: string }) {
  const { t } = useSite();
  const copy = t.plans[plan.id];
  const common = t.packagesCommon;
  const features = compact ? copy.short : copy.features;

  return (
    <motion.article
      className={`plan${plan.popular ? " plan--popular" : ""}${compact ? " plan--compact" : ""}`}
      aria-labelledby={`plan-${plan.id}${compact ? "-c" : ""}`}
      variants={fadeUp}
      whileHover={lift}
    >
      {plan.popular && <p className="plan__badge">{common.popular}</p>}

      <header className="plan__head">
        <h3 id={`plan-${plan.id}${compact ? "-c" : ""}`} className="display plan__name">
          {copy.name}
        </h3>
        <p className="plan__tag">{copy.tag}</p>
      </header>

      {compact && (
        <p className="plan__amount plan__amount--top">
          {formatMXN(plan.price)}
          <span> MXN</span>
        </p>
      )}

      <div className="plan__body">
        <Media
          id={plan.image}
          className="plan__img"
          alt={fill(t.alt.pack, { n: plan.boxes })}
          sizes="(min-width: 768px) 720px, 90vw" quality={90}
          fit="contain"
          tint="transparent"
          quiet
          fallback={<BoxStack count={plan.boxes} size={compact ? (plan.boxes === 1 ? 72 : 46) : plan.boxes === 1 ? 104 : 60} />}
        />
        <ul className="plan__features">
          {features.map((f) => (
            <li key={f}>
              <CircleCheck aria-hidden="true" strokeWidth={2} />
              {f}
            </li>
          ))}
        </ul>
      </div>

      {!compact && (
        <div className="plan__price">
          {plan.savePct > 0 && (
            <p className="plan__save">
              <Tag aria-hidden="true" strokeWidth={2} />
              {common.save} {plan.savePct}%
            </p>
          )}
          <p className="plan__amount">
            {formatMXN(plan.price)}
            <span> MXN</span>
          </p>
          {plan.listPrice > plan.price && (
            <p className="plan__before">
              <s>{formatMXN(plan.listPrice)} MXN</s>
            </p>
          )}
        </div>
      )}

      <BuyButton plan={plan.id} dosage={dosage} className="btn--block">
        {copy.cta}
      </BuyButton>

      {!compact && <TrustRow className="plan__trust" />}
    </motion.article>
  );
}
