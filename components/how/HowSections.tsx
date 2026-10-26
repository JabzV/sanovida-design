"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, CalendarCheck, Leaf, Package, Sparkles, Stethoscope, TrendingUp } from "lucide-react";
import { dosages } from "@/lib/catalog";
import { href } from "@/lib/routes";
import { BoxMock } from "../BoxMock";
import { Media } from "../Media";
import { Phone } from "../PhoneScreen";
import { useSite } from "../SiteContext";
import { Accent, Leaves } from "../Ui";

const PHASE_ICONS = [Package, CalendarCheck, Sparkles, TrendingUp];
const HONEST_ICONS = [Leaf, Stethoscope, Sparkles];

/** Adds `is-in` once the element scrolls into view, for the page's one authored motion. */
function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, inView };
}

/** The first month as four phases on one path: vertical on phones, horizontal on desktop. */
export function HowJourney() {
  const { t } = useSite();
  const j = t.howPage.journey;
  const { ref, inView } = useInView<HTMLOListElement>();

  return (
    <section className="journey section" aria-labelledby="journey-title">
      <div className="wrap">
        <div className="journey__head">
          <h2 id="journey-title" className="display h2">
            <Accent text={j.title} />
          </h2>
          <p>{j.lead}</p>
        </div>
        <ol ref={ref} className={`journey__path${inView ? " is-in" : ""}`}>
          {j.phases.map((phase, i) => {
            const Icon = PHASE_ICONS[i];
            return (
              <li key={phase.title} className="journey__phase" style={{ ["--i" as string]: i }}>
                <span className="journey__when">{phase.when}</span>
                <span className="journey__ring" aria-hidden="true">
                  <Icon strokeWidth={1.5} />
                </span>
                <h3 className="display journey__title">{phase.title}</h3>
                <p className="journey__body">{phase.body}</p>
                <p className="journey__tip">
                  <Leaves />
                  {phase.tip}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

/** The daily ritual: three moments beside the box and the reminder screen. */
export function HowRitual() {
  const { t } = useSite();
  const r = t.howPage.ritual;

  return (
    <section className="ritual section section--tight" aria-labelledby="ritual-title">
      <div className="wrap ritual__grid">
        <div className="ritual__copy">
          <h2 id="ritual-title" className="display h2">
            <Accent text={r.title} />
          </h2>
          <p>{r.lead}</p>
          <ol className="ritual__moments">
            {r.moments.map((m) => (
              <li key={m.title}>
                <span className="ritual__time">{m.time}</span>
                <b>{m.title}</b>
                <span>{m.body}</span>
              </li>
            ))}
          </ol>
          <p className="ritual__note">
            <Stethoscope aria-hidden="true" strokeWidth={1.6} />
            {r.note}
          </p>
        </div>

        <div className="ritual__scene" aria-hidden="true">
          <Phone screen="reminders" className="phone--sm ritual__phone" />
          <Media id="B1" className="ritual__box" alt="" sizes="(min-width: 768px) 520px, 90vw" quality={90} fit="contain" tint="transparent" quiet fallback={<BoxMock dosage="0.8" size={170} />} />
          <Leaves className="ritual__leaf" />
        </div>
      </div>
    </section>
  );
}

/** The five dosages as a rising ladder, coloured like their boxes. */
export function HowLadder() {
  const { t, locale } = useSite();
  const l = t.howPage.ladder;
  const { ref, inView } = useInView<HTMLOListElement>();

  return (
    <section className="ladder section section--tight" aria-labelledby="ladder-title">
      <div className="wrap ladder__grid">
        <div className="ladder__copy">
          <h2 id="ladder-title" className="display h2">
            <Accent text={l.title} />
          </h2>
          <p>{l.lead}</p>
          <Link href={href(locale, "product", "dosis")} className="ladder__link">
            {l.cta}
            <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        <ol ref={ref} className={`ladder__steps${inView ? " is-in" : ""}`}>
          {dosages.map((d, i) => (
            <li key={d.id} style={{ ["--c" as string]: d.color, ["--wash" as string]: d.wash, ["--i" as string]: i, ["--h" as string]: `${44 + i * 14}%` }}>
              <Link href={href(locale, "product", `dosis-${d.id.replace(".", "-")}`)} className="ladder__step">
                <span className="ladder__bar" aria-hidden="true" />
                <span className="ladder__mg">{d.id} mg</span>
                <span className="ladder__name">{t.dosages[d.id].name}</span>
                {i === 0 && <span className="ladder__start">{l.start}</span>}
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** Three honest notes on a pale green band. */
export function HowHonest() {
  const { t } = useSite();
  const h = t.howPage.honest;

  return (
    <section className="honest" aria-labelledby="honest-title">
      <div className="wrap">
        <h2 id="honest-title" className="display h3 honest__title">
          {h.title}
        </h2>
        <ul className="honest__list">
          {h.items.map((item, i) => {
            const Icon = HONEST_ICONS[i];
            return (
              <li key={item.title}>
                <Icon aria-hidden="true" strokeWidth={1.5} />
                <b>{item.title}</b>
                <p>{item.body}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
