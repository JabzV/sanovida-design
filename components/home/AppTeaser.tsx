"use client";

import { motion } from "motion/react";
import { Bell, Dumbbell, TrendingUp, Utensils } from "lucide-react";
import { Media } from "../Media";
import { fadeUp, lift, pop, revealList } from "../Motion";
import { Phone } from "../PhoneScreen";
import { useSite } from "../SiteContext";
import { Eyebrow, Leaves, StoreBadges } from "../Ui";

/** Reference 1, section 4: the free app with a phone and four tiles on a sunlit backdrop. */
export function AppTeaser() {
  const { t } = useSite();
  const a = t.home.app;
  const [nutrition, workouts, charts, reminders] = a.tiles;

  return (
    <section id="app" className="happ section section--tight" aria-labelledby="happ-title">
      {/* The hero terrace, blurred and washed out, so the section sits in the same sunlight as the rest of the page. */}
      <div className="happ__bg" aria-hidden="true">
        <Media id="A1" className="happ__bgimg" alt="" sizes="100vw" position="60% 40%" tint="#F2E8DB" quiet />
      </div>

      <div className="wrap happ__grid">
        <motion.div className="happ__copy" {...revealList()}>
          <Eyebrow variants={fadeUp}>{a.eyebrow}</Eyebrow>
          <motion.h2 id="happ-title" className="display h2" variants={fadeUp}>
            {a.title}
          </motion.h2>
          <motion.p variants={fadeUp}>{a.body}</motion.p>
          <StoreBadges className="happ__stores" variants={fadeUp} />
        </motion.div>

        <motion.div className="happ__phone" {...revealList(0.15)}>
          <Leaves className="happ__leaf happ__leaf--a" />
          {/* Phones only: two more screens fan out behind the main one (mobile reference 1). */}
          <Phone screen="nutrition" className="phone--sm happ__side happ__side--a m-only" />
          <Phone screen="progress" className="phone--sm happ__main" variants={pop} float />
          <Phone screen="workouts" className="phone--sm happ__side happ__side--b m-only" />
          <Leaves className="happ__leaf happ__leaf--b" />
        </motion.div>

        <motion.ul className="tiles" {...revealList(0.1, 0.1)}>
          <motion.li className="tile" variants={fadeUp} whileHover={lift}>
            <h3>
              <span className="tile__icon tile__icon--leaf">
                <Utensils strokeWidth={2} />
              </span>
              {nutrition.title}
            </h3>
            <p>{nutrition.sub}</p>
            <Media id="E1" className="tile__img" alt={t.alt.meal} sizes="(min-width: 768px) 900px, 90vw" quality={90} tint="#F1E4D2" quiet />
          </motion.li>
          <motion.li className="tile" variants={fadeUp} whileHover={lift}>
            <h3>
              <span className="tile__icon tile__icon--rose">
                <Dumbbell strokeWidth={2} />
              </span>
              {workouts.title}
            </h3>
            <p>{workouts.sub}</p>
            <Media id="E2" className="tile__img" alt={t.alt.workout} sizes="(min-width: 768px) 900px, 90vw" quality={90} tint="#EFE4DA" quiet />
          </motion.li>
          <motion.li className="tile" variants={fadeUp} whileHover={lift}>
            <h3>
              <span className="tile__icon tile__icon--gold">
                <TrendingUp strokeWidth={2} />
              </span>
              {charts.title}
            </h3>
            <p>{charts.sub}</p>
            <Media
              id="E3"
              className="tile__img tile__img--drawn tile__img--chart"
              alt={t.alt.chart}
              sizes="(min-width: 768px) 900px, 90vw" quality={90}
              tint="transparent"
              quiet
              fallback={
                <div className="tile__bars" aria-hidden="true">
                  {[38, 52, 46, 64, 72, 88].map((h, i) => (
                    <span key={i} style={{ height: `${h}%` }} />
                  ))}
                </div>
              }
            />
          </motion.li>
          <motion.li className="tile" variants={fadeUp} whileHover={lift}>
            <h3>
              <span className="tile__icon tile__icon--sky">
                <Bell strokeWidth={2} />
              </span>
              {reminders.title}
            </h3>
            <p>{reminders.sub}</p>
            <Media
              id="E4"
              className="tile__img tile__img--drawn tile__img--reminder"
              alt={t.alt.reminder}
              sizes="(min-width: 768px) 900px, 90vw" quality={90}
              tint="transparent"
              quiet
              fallback={
                <div className="tile__bell" aria-hidden="true">
                  <Bell strokeWidth={1.6} />
                  <span>10:00</span>
                  <small>{t.app.screen.reminders[0].t}</small>
                </div>
              }
            />
          </motion.li>
        </motion.ul>
      </div>
    </section>
  );
}
