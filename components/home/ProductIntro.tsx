"use client";

import Link from "next/link";
import { FlaskConical, Heart, ShieldCheck, Sparkles } from "lucide-react";
import { dosages } from "@/lib/catalog";
import { fill } from "@/lib/i18n";
import { href } from "@/lib/routes";
import { BoxMock } from "../BoxMock";
import { Media } from "../Media";
import { useSite } from "../SiteContext";
import { Accent, Eyebrow, RingItem } from "../Ui";

const ICONS = [FlaskConical, ShieldCheck, Sparkles, Heart];

/** Reference 1, section 2: Orforglipron intro with the five boxes. */
export function ProductIntro() {
  const { t, locale } = useSite();
  const p = t.home.product;

  return (
    <section id="producto" className="hprod section" aria-labelledby="hprod-title">
      <div className="wrap hprod__grid">
        <div className="hprod__copy">
          <Eyebrow>{p.eyebrow}</Eyebrow>
          <h2 id="hprod-title" className="display hprod__title">
            {p.title}
          </h2>
          <p className="hprod__subtitle">
            <Accent text={p.subtitle} />
          </p>
          <p className="hprod__body">{p.body}</p>
          <ul className="ringrow ringrow--divided">
            {p.icons.map((item, i) => (
              <RingItem key={item.title} icon={ICONS[i]} title={item.title} sub={item.sub} />
            ))}
          </ul>
        </div>

        <ul className="boxrow">
          {dosages.map((d) => (
            <li key={d.id} className="boxrow__item" style={{ ["--c" as string]: d.color, ["--wash" as string]: d.wash }}>
              <Link href={href(locale, "product", `dosis-${d.id.replace(".", "-")}`)} className="boxrow__link">
                <Media
                  id={d.image}
                  className="boxrow__img"
                  alt={fill(t.alt.box, { mg: d.id })}
                  sizes="(min-width: 900px) 480px, 80vw" quality={90}
                  fit="contain"
                  tint="transparent"
                  quiet
                  fallback={<BoxMock dosage={d.id} size={150} />}
                />
                <span className="boxrow__mg">{d.id} mg</span>
                <span className="pill">{t.dosages[d.id].name}</span>
                <span className="boxrow__desc">{t.dosages[d.id].desc}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
