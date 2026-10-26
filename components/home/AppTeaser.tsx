"use client";

import { Bell, Dumbbell, TrendingUp, Utensils } from "lucide-react";
import { Media } from "../Media";
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
        <div className="happ__copy">
          <Eyebrow>{a.eyebrow}</Eyebrow>
          <h2 id="happ-title" className="display h2">
            {a.title}
          </h2>
          <p>{a.body}</p>
          <StoreBadges className="happ__stores" />
        </div>

        <div className="happ__phone">
          <Leaves className="happ__leaf happ__leaf--a" />
          <Phone screen="progress" className="phone--sm" />
          <Leaves className="happ__leaf happ__leaf--b" />
        </div>

        <ul className="tiles">
          <li className="tile">
            <h3>
              <span className="tile__icon tile__icon--leaf">
                <Utensils strokeWidth={2} />
              </span>
              {nutrition.title}
            </h3>
            <p>{nutrition.sub}</p>
            <Media id="E1" className="tile__img" alt={t.alt.meal} sizes="(min-width: 768px) 900px, 90vw" quality={90} tint="#F1E4D2" quiet />
          </li>
          <li className="tile">
            <h3>
              <span className="tile__icon tile__icon--rose">
                <Dumbbell strokeWidth={2} />
              </span>
              {workouts.title}
            </h3>
            <p>{workouts.sub}</p>
            <Media id="E2" className="tile__img" alt={t.alt.workout} sizes="(min-width: 768px) 900px, 90vw" quality={90} tint="#EFE4DA" quiet />
          </li>
          <li className="tile">
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
          </li>
          <li className="tile">
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
          </li>
        </ul>
      </div>
    </section>
  );
}
