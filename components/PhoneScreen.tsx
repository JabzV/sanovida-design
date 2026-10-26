"use client";

import Image from "next/image";
import { motion, type Variants } from "motion/react";
import { Bell, ChevronRight, Dumbbell, Home, Play, Ruler, Utensils } from "lucide-react";
import { images } from "@/lib/catalog";
import { EASE, viewportOnce } from "./Motion";
import { useSite } from "./SiteContext";

export type ScreenId = "progress" | "nutrition" | "workouts" | "measures" | "reminders";

const TAB_ICONS = [Home, Utensils, Dumbbell, Ruler, Bell];
const TAB_FOR: Record<ScreenId, number> = { progress: 0, nutrition: 1, workouts: 2, measures: 3, reminders: 4 };

/**
 * A phone frame around an illustrative app screen. `variants` lets a parent
 * cascade its entrance; `float` adds the slow hover (a CSS keyframe on
 * `translate`, so it composes with Motion's transforms).
 */
export function Phone({ screen, className = "", variants, float }: { screen: ScreenId; className?: string; variants?: Variants; float?: boolean }) {
  return (
    <motion.div className={`phone${float ? " phone--float" : ""} ${className}`} variants={variants}>
      <div className="phone__notch" aria-hidden="true" />
      <PhoneScreen screen={screen} />
    </motion.div>
  );
}

/** Illustrative app screens drawn in HTML (sample data, labelled as such on the page). */
export function PhoneScreen({ screen }: { screen: ScreenId }) {
  const { t, available } = useSite();
  const s = t.app.screen;

  return (
    <div className="screen">
      <div className="screen__status" aria-hidden="true">
        <span>9:41</span>
        <span className="screen__dots" />
      </div>

      <div className="screen__top">
        {available.has("G1") ? (
          <Image src={`/images/${images.G1.file}`} alt="SanoVida" width={images.G1.w} height={images.G1.h} className="screen__logoimg" sizes="320px" quality={90} />
        ) : (
          <span className="screen__logo">SanoVida</span>
        )}
        <span className="screen__plan">{screen === "progress" ? s.plan : s.titles[screen]}</span>
      </div>

      <div className="screen__content">
        {screen === "progress" && <Progress />}
        {screen === "nutrition" && (
          <>
            <Segmented a={s.today} b={s.week} />
            <ul className="screen__list">
              {s.meals.map((m, i) => (
                <li key={m.t}>
                  <span className={`screen__thumb screen__thumb--food${i}`} aria-hidden="true" />
                  <span>
                    <small>{m.t}</small>
                    {m.d}
                  </span>
                  <em>{m.k}</em>
                </li>
              ))}
            </ul>
          </>
        )}
        {screen === "workouts" && (
          <ul className="screen__list">
            {s.workouts.map((w, i) => (
              <li key={w.t}>
                <span className={`screen__thumb screen__thumb--move${i}`} aria-hidden="true">
                  <Play strokeWidth={2} />
                </span>
                <span>
                  <small>{w.t}</small>
                  {w.d}
                </span>
                <em>{w.m}</em>
              </li>
            ))}
          </ul>
        )}
        {screen === "measures" && (
          <ul className="screen__list screen__list--measures">
            {s.measures.map((m) => (
              <li key={m.t}>
                <Ruler aria-hidden="true" strokeWidth={1.8} />
                <span>
                  <small>{m.t}</small>
                  {m.v}
                </span>
                <em className="screen__good">{m.d}</em>
              </li>
            ))}
          </ul>
        )}
        {screen === "reminders" && (
          <ul className="screen__list screen__list--reminders">
            {s.reminders.map((r, i) => (
              <li key={r.t}>
                <span className="screen__time">{r.m}</span>
                <span>{r.t}</span>
                <span className={`screen__switch${i < 2 ? " is-on" : ""}`} aria-hidden="true" />
              </li>
            ))}
          </ul>
        )}
      </div>

      <nav className="screen__tabs" aria-hidden="true">
        {s.tabs.map((label, i) => {
          const Icon = TAB_ICONS[i];
          return (
            <span key={label} className={i === TAB_FOR[screen] ? "is-active" : undefined}>
              <Icon strokeWidth={1.8} />
              {label}
            </span>
          );
        })}
      </nav>
    </div>
  );
}

function Progress() {
  const { t } = useSite();
  const s = t.app.screen;
  const r = 52;
  /* Dash lengths are fractions of the circle (pathLength = 1): a 75% track, 62% of it filled. */
  return (
    <>
      <div className="ring-chart">
        <svg viewBox="0 0 120 120" aria-hidden="true">
          <circle cx="60" cy="60" r={r} className="ring-chart__track" pathLength={1} strokeDasharray="0.75 1" />
          <motion.circle
            cx="60"
            cy="60"
            r={r}
            className="ring-chart__fill"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 0.75 * 0.62 }}
            viewport={viewportOnce}
            transition={{ duration: 1.4, ease: EASE, delay: 0.3 }}
          />
        </svg>
        <div className="ring-chart__label">
          <small>{s.progress}</small>
          <b>
            72.4<span> kg</span>
          </b>
          <em>{s.lost}</em>
          <i>{s.great}</i>
        </div>
      </div>
      <div className="screen__chart">
        <svg viewBox="0 0 200 64" preserveAspectRatio="none" aria-hidden="true">
          <motion.path
            d="M0 14 L28 18 L56 22 L84 26 L112 34 L140 38 L168 46 L200 52 V64 H0Z"
            className="screen__area"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, delay: 1 }}
          />
          <motion.path
            d="M0 14 L28 18 L56 22 L84 26 L112 34 L140 38 L168 46 L200 52"
            className="screen__line"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 1.2, ease: EASE, delay: 0.5 }}
          />
        </svg>
      </div>
      <div className="screen__cards">
        <span>
          <Utensils strokeWidth={1.8} aria-hidden="true" />
          {s.tabs[1]}
        </span>
        <span>
          <Dumbbell strokeWidth={1.8} aria-hidden="true" />
          {s.tabs[2]}
        </span>
        <span>
          <Ruler strokeWidth={1.8} aria-hidden="true" />
          {s.tabs[3]}
        </span>
        <span>
          <ChevronRight strokeWidth={1.8} aria-hidden="true" />
          {s.tabs[4]}
        </span>
      </div>
    </>
  );
}

function Segmented({ a, b }: { a: string; b: string }) {
  return (
    <div className="screen__seg" aria-hidden="true">
      <span className="is-on">{a}</span>
      <span>{b}</span>
    </div>
  );
}
