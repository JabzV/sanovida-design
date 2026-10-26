"use client";

import type { ReactNode } from "react";
import { Gift, Heart, HeartHandshake, Leaf, Smartphone, Zap } from "lucide-react";
import { dosages, type DosageId, type ImageId } from "@/lib/catalog";
import { BoxMock } from "./BoxMock";
import { useSite } from "./SiteContext";
import { Media } from "./Media";
import { Accent, BuyButton, Eyebrow, HandNote, RingItem, TrustRow } from "./Ui";

const ICONS = { leaf: Leaf, zap: Zap, heart: Heart, gift: Gift, phone: Smartphone, hands: HeartHandshake } as const;
export type HeroIcon = keyof typeof ICONS;

interface HeroCopy {
  eyebrow: string;
  title: string[];
  strong?: string;
  lead: string;
  benefits: { title: string; sub: string }[];
  cta?: string;
  handLines: string[];
  sideNote?: string;
}

interface PageHeroProps {
  copy: HeroCopy;
  image: ImageId;
  /** Portrait crop for phones; falls back to `image`. */
  mobileImage?: ImageId;
  alt: string;
  icons: HeroIcon[];
  /** Slot under the benefits, e.g. store badges on the app page. */
  extra?: ReactNode;
  /** Large title variant for the product page's one-word heading. */
  titleSize?: "default" | "xl";
  /** Hide the trust row (the packages page has none). */
  noTrust?: boolean;
  /** Dosage boxes composited on the ledge in front of the woman (home: two, packages: three). */
  boxes?: DosageId[];
  /** Hide the hand-written note (the current app photo has a phone where it would sit). */
  noHand?: boolean;
}

/** The full-bleed sunlit hero every page opens with. */
export function PageHero({ copy, image, mobileImage, alt, icons, extra, titleSize = "default", noTrust, boxes, noHand }: PageHeroProps) {
  const { t, available } = useSite();
  /* Until the portrait crop exists, phones show the desktop photo rather than a placeholder. */
  const mobile = mobileImage && available.has(mobileImage) ? mobileImage : undefined;

  return (
    <section className={`phero${boxes?.length ? " phero--boxes" : ""}`} aria-labelledby="page-title">
      <div className="phero__bg" aria-hidden="true">
        <Media id={image} className={`phero__photo${mobile ? " phero__photo--desk" : ""}`} alt="" sizes="100vw" priority position="68% 50%" tint="#F2E8DB" />
        {mobile && <Media id={mobile} className="phero__photo phero__photo--mob" alt="" sizes="100vw" priority position="50% 20%" tint="#F2E8DB" />}
      </div>
      {boxes?.length ? (
        <div className={`phero__ledge phero__ledge--${boxes.length}`} aria-hidden="true">
          {boxes.map((id) => {
            const d = dosages.find((x) => x.id === id)!;
            return (
              <Media
                key={id}
                id={d.image}
                className="phero__box"
                alt=""
                sizes="(min-width: 768px) 480px, 300px" quality={90}
                fit="contain"
                tint="transparent"
                quiet
                fallback={<BoxMock dosage={id} size={150} />}
              />
            );
          })}
        </div>
      ) : null}
      <span className="sr-only">{alt}</span>

      <div className="phero__inner wrap">
        <div className="phero__copy">
          <Eyebrow>{copy.eyebrow}</Eyebrow>
          <h1 id="page-title" className={`display phero__title phero__title--${titleSize}`}>
            {copy.title.map((line, i) => (
              <span key={i} className="phero__line">
                <Accent text={line} />
              </span>
            ))}
          </h1>
          {copy.strong && (
            <p className="phero__strong">
              <Accent text={copy.strong} />
            </p>
          )}
          <p className="phero__lead">{copy.lead}</p>

          {extra}

          <ul className="ringrow">
            {copy.benefits.map((b, i) => (
              <RingItem key={b.title} icon={ICONS[icons[i % icons.length]]} title={b.title} sub={b.sub} />
            ))}
          </ul>

          {copy.cta && (
            <div className="phero__actions">
              <BuyButton size="lg">{copy.cta}</BuyButton>
            </div>
          )}

          {!noTrust && <TrustRow className="phero__trust" />}
        </div>

        {!noHand && <HandNote lines={copy.handLines} note={copy.sideNote} className="phero__hand" />}
      </div>

      <p className="phero__footnote wrap">{t.footnote}</p>
    </section>
  );
}
