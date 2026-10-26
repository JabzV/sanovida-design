"use client";

import { Bell, CreditCard, Dumbbell, Flower2, Headset, Heart, Leaf, Lock, ShieldCheck, TrendingUp, Truck, Utensils, Zap } from "lucide-react";
import { Media } from "../Media";
import { Phone } from "../PhoneScreen";
import { useSite } from "../SiteContext";
import { Eyebrow, HandNote } from "../Ui";

const BAND_ICONS = [ShieldCheck, Truck, CreditCard, Headset];
const LIFE_ICONS = [Flower2, Zap, Heart, Leaf];
const APP_ICONS = [Utensils, Dumbbell, TrendingUp, Bell];

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
  const a = t.home.app;
  return (
    <section className="lifeband" aria-labelledby="lifeband-title">
      <Media id="F2" className="lifeband__bg" alt={t.alt.closing} sizes="100vw" position="10% 40%" tint="#F2E6DA" />
      <div className="wrap lifeband__inner">
        {/* Phones only: the app sits beside the results, as in mobile reference 3. */}
        <div className="lifeband__phone m-only" aria-hidden="true">
          <Phone screen="progress" className="phone--sm" />
        </div>
        <div className="lifeband__app m-only">
          <Eyebrow>{a.eyebrow}</Eyebrow>
          <h3 className="display lifeband__apptitle">{a.title}</h3>
          <p>{a.body}</p>
          <ul className="lifeband__tools">
            {a.tiles.map((tile, i) => {
              const Icon = APP_ICONS[i];
              return (
                <li key={tile.title}>
                  <Icon aria-hidden="true" strokeWidth={1.6} />
                  {tile.title}
                </li>
              );
            })}
          </ul>
        </div>

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

      {/* Phones only: the payment strip that closes mobile reference 3. */}
      <div className="wrap m-only">
        <p className="paystrip">
          <Lock aria-hidden="true" strokeWidth={1.6} />
          <span>{t.packages.pay}</span>
          <span className="paystrip__logos" aria-label="Visa, Mastercard, American Express, PayPal">
            <span className="cards">
              <span className="cards__visa">VISA</span>
              <span className="cards__mc">
                <i />
                <i />
              </span>
              <span className="cards__amex">AMEX</span>
            </span>
            <span className="wordlogo wordlogo--pp">
              Pay<b>Pal</b>
            </span>
          </span>
        </p>
      </div>
    </section>
  );
}
