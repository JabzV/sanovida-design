"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { AlertTriangle, Calendar, ChevronRight, Clock, Cloud, CloudOff, Download, FileText, History, KeyRound, Link2, Mail, Pencil, RefreshCw, Send, SlidersHorizontal, Smartphone, Star, User, UserPlus, Users, UserX, X } from "lucide-react";
import { appUsers, type AppUser } from "@/lib/admin/data";
import { fill } from "@/lib/i18n";
import { fmtDate } from "@/lib/admin/i18n";
import { useAdmin } from "../AdminContext";
import { PhoneMock } from "../Shell";
import { Avatar, Badge, Block, BoxImg, Btn, Card, CardHead, Checkbox, DateRange, Kebab, Kpi, Page, PageHead, Pager, Rows, SearchBox, Select, SheetHandle, Tabs, Timeline, appTone, grid, row, EASE_OUT } from "../Ui";

export function AppManagement() {
  const { locale, t } = useAdmin();
  const a = t.appPage;
  const [selected, setSelected] = useState<AppUser | null>(appUsers[0]);
  const [tab, setTab] = useState(0);

  const short = (iso: string | null) => (iso ? fmtDate(locale, iso) : "–");

  return (
    <Page className={`ad-app${selected ? " has-panel" : ""}`}>
      <PageHead title={a.title} sub={a.sub} mSub={a.mSub}>
        <DateRange className="ad-d" />
        <DateRange className="ad-m" value={t.common.today} />
      </PageHead>
      <Block className="ad-m ad-lead">
        <p>{a.mLead}</p>
      </Block>

      <motion.div className="ad-kpis ad-kpis--5 ad-d" variants={grid(0.05)}>
        <Kpi icon={Users} tone="leaf" label={a.kpis.active} value={892} trend="+18.6%" trendLabel={t.common.vsMonth} />
        <Kpi icon={UserPlus} tone="gold" label={a.kpis.pending} value={124} trend="+5.9%" trendLabel={t.common.vsMonth} />
        <Kpi icon={Send} tone="rose" label={a.kpis.invites} value={386} trend="+22.7%" trendLabel={t.common.vsMonth} />
        <Kpi icon={Clock} tone="rose" label={a.kpis.expired} value={73} trend="+12.3%" trendLabel={t.common.vsMonth} />
        <Kpi icon={AlertTriangle} tone="rose" label={a.kpis.sync} value={18} trend="-25.0%" trendLabel={t.common.vsMonth} down />
      </motion.div>
      <motion.div className="ad-kpis ad-kpis--3 ad-m" variants={grid(0.05)}>
        <Kpi icon={Smartphone} tone="leaf" label={a.kpis.active} value={436} trend="+15%" trendLabel={t.common.vsDay} />
        <Kpi icon={Clock} tone="rose" label={a.kpis.pending} value={12} trend="+33%" trendLabel={t.common.vsDay} />
        <Kpi icon={Send} tone="gold" label={a.kpis.invites} value={218} trend="+12%" trendLabel={t.common.vsDay} />
        <Kpi icon={UserX} tone="rose" label={a.kpis.expired} value={28} trend="+27%" trendLabel={t.common.vsDay} />
        <Kpi icon={CloudOff} tone="rose" label={a.kpis.sync} value={6} trend="-40%" trendLabel={t.common.vsDay} down />
        <motion.div className="ad-kpi ad-kpi--promo" variants={row}>
          <span className="ad-two">
            <b>{a.promo.title}</b>
            <small>{a.promo.sub}</small>
            <Btn tone="outline" size="sm">
              {a.promo.cta}
            </Btn>
          </span>
          <PhoneMock className="ad-kpi__phone" />
        </motion.div>
      </motion.div>

      <Card className="ad-app__table">
        <CardHead title={<><span className="ad-d">{a.users}</span><span className="ad-m">{a.mUsers}</span></>} sub={<span className="ad-d">{a.usersSub}</span>} icon={Users} tone="leaf">
          <SearchBox placeholder={a.search} className="ad-d" />
          <SearchBox placeholder={a.mSearch} className="ad-m" />
          <Btn tone="ghost" icon={SlidersHorizontal} className="ad-d">
            {t.common.filters}
          </Btn>
          <Btn icon={Download} className="ad-d">
            {t.common.export}
          </Btn>
          <button type="button" className="ad-iconbtn ad-m" aria-label={t.common.filters}>
            <SlidersHorizontal aria-hidden="true" strokeWidth={2} />
          </button>
        </CardHead>
        <div className="ad-table">
          <table className="ad-tbl ad-tbl--app">
            <thead>
              <tr>
                <th className="ad-d">
                  <Checkbox label="all" />
                </th>
                <th>{a.cols.customer}</th>
                <th>{a.cols.pack}</th>
                <th className="ad-col--opt2">
                  <span className="ad-d">{a.cols.purchased}</span>
                  <span className="ad-m">{a.mCols.purchased}</span>
                </th>
                <th>{a.cols.status}</th>
                <th>{a.mCols.access}</th>
                <th className="ad-col--opt">
                  <span className="ad-d">{a.cols.sync}</span>
                  <span className="ad-m">{a.mCols.sync}</span>
                </th>
                <th className="ad-d">{a.cols.actions}</th>
                <th className="ad-m" />
              </tr>
            </thead>
            <motion.tbody variants={grid(0.04, 0.1)} initial="hidden" animate="show">
              {appUsers.map((u) => (
                <motion.tr key={u.id} variants={row} className={selected?.id === u.id ? "is-selected" : ""} onClick={() => setSelected(u)}>
                  <td className="ad-d">
                    <Checkbox label={u.name} />
                  </td>
                  <td>
                    <span className="ad-who ad-who--row">
                      <Avatar name={u.name} size="sm" tone="blue" />
                      <span className="ad-two">
                        <b>{u.name}</b>
                        <small className="ad-d ad-clip">{u.email}</small>
                      </span>
                    </span>
                  </td>
                  <td>
                    <span className="ad-prod">
                      <BoxImg dosage={u.dosage} size={24} className="ad-d" />
                      <span className="ad-two">
                        <b>
                          {t.common.product} {u.dosage} mg
                        </b>
                        <small className="ad-d">{t.common.tablets}</small>
                      </span>
                    </span>
                  </td>
                  <td className="ad-col--opt2">{fmtDate(locale, u.purchased)}</td>
                  <td>
                    <Badge tone={appTone[u.status]} dot className="ad-m">
                      {t.app[u.status]}
                    </Badge>
                    <Badge tone={appTone[u.status]} className="ad-d">
                      {t.app[u.status]}
                    </Badge>
                  </td>
                  <td>
                    <span className="ad-two ad-d">
                      <span>{short(u.start)}</span>
                      <small>{u.end ? `→ ${short(u.end)}` : ""}</small>
                    </span>
                    <span className="ad-m">{u.start ? `${short(u.start)} – ${short(u.end)}` : "—"}</span>
                  </td>
                  <td className="ad-col--opt">
                    <span className="ad-sync">
                      <i className={`is-${u.syncOk === null ? "muted" : u.syncOk ? "leaf" : "rose"}`} />
                      {u.lastSync ? (
                        <span className="ad-two">
                          <span>{fmtDate(locale, u.lastSync)}</span>
                          <small>{u.lastSyncTime}</small>
                        </span>
                      ) : (
                        "–"
                      )}
                    </span>
                  </td>
                  <td className="ad-d">
                    <Kebab />
                  </td>
                  <td className="ad-m">
                    <ChevronRight aria-hidden="true" strokeWidth={2} />
                  </td>
                </motion.tr>
              ))}
            </motion.tbody>
          </table>
        </div>
        <div className="ad-tfoot ad-d">
          <span>{a.showing}</span>
          <Pager pages={[1, 2, 3, 4, 5]} last={156} />
          <Select value={t.common.perPage} className="ad-tfoot__per" />
        </div>
      </Card>

      {/* Banner */}
      <Card className="ad-app__banner ad-d" tone="mint">
        <div className="ad-app__bannertext">
          <h2>
            {a.banner.title}
            <small>{a.banner.sub}</small>
          </h2>
          <p>{a.banner.lead}</p>
          <div className="ad-stores">
            <span className="ad-store">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path fill="currentColor" d="M16.4 12.6c0-2.4 2-3.6 2.1-3.7-1.2-1.7-3-1.9-3.6-2-1.5-.2-3 .9-3.7.9-.8 0-2-.9-3.2-.9-1.7 0-3.2 1-4 2.4-1.7 3-.4 7.4 1.2 9.8.8 1.2 1.8 2.5 3 2.4 1.2 0 1.7-.8 3.1-.8s1.9.8 3.2.8c1.3 0 2.1-1.2 2.9-2.4.9-1.4 1.3-2.7 1.3-2.8-.1 0-2.3-.9-2.3-3.7ZM14 5.4c.7-.8 1.1-1.9 1-3-1 0-2.1.7-2.8 1.5-.6.7-1.2 1.8-1 2.9 1 .1 2.1-.6 2.8-1.4Z" />
              </svg>
              <span>
                <small>{a.banner.apple}</small>App Store
              </span>
            </span>
            <span className="ad-store">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path fill="#34A853" d="M3.6 2.3 13.5 12l-9.9 9.7c-.4-.2-.6-.6-.6-1.1V3.4c0-.5.2-.9.6-1.1Z" />
                <path fill="#FBBC04" d="m17 8.6-3.5 3.4 3.5 3.4 3.9-2.2c1.1-.6 1.1-1.8 0-2.4L17 8.6Z" />
                <path fill="#EA4335" d="M13.5 12 3.6 21.7c.4.2.9.2 1.4-.1L17 15.4 13.5 12Z" />
                <path fill="#4285F4" d="M13.5 12 17 8.6 5 2.4c-.5-.3-1-.3-1.4-.1L13.5 12Z" />
              </svg>
              <span>
                <small>{a.banner.google}</small>Google Play
              </span>
            </span>
          </div>
        </div>
        <div className="ad-app__phones" aria-hidden="true">
          <PhoneMock className="is-left" />
          <PhoneMock className="is-center" tagline={locale === "es" ? "Bienestar en tu bolsillo" : "Wellness in your pocket"} />
          <PhoneMock className="is-right" />
        </div>
        <div className="ad-app__stats">
          <h3>{a.banner.stats}</h3>
          <ul className="ad-stats ad-stats--tiles">
            <li>
              <span className="ad-tile is-leaf">
                <Users aria-hidden="true" strokeWidth={1.8} />
              </span>
              <span>
                <b>892</b>
                <small>{a.banner.users}</small>
              </span>
            </li>
            <li>
              <span className="ad-tile is-rose">
                <Download aria-hidden="true" strokeWidth={1.8} />
              </span>
              <span>
                <b>4,320</b>
                <small>{a.banner.downloads}</small>
              </span>
            </li>
            <li>
              <span className="ad-tile is-gold">
                <Star aria-hidden="true" strokeWidth={1.8} />
              </span>
              <span>
                <b>4.8</b>
                <small>{a.banner.rating}</small>
              </span>
            </li>
          </ul>
        </div>
      </Card>

      {/* Detail */}
      <AnimatePresence>
        {selected && (
          <motion.aside key={selected.id} className="ad-panel ad-app__panel" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 24 }} transition={{ duration: 0.45, ease: EASE_OUT }} aria-label={selected.name}>
            <SheetHandle />
            <header className="ad-panel__head ad-panel__head--person">
              <h2 className="ad-d ad-panel__eyebrow">{selected.name}</h2>
              <Avatar name={selected.name} size="xl" tone="leaf" />
              <div className="ad-panel__titles">
                <h2>{selected.name}</h2>
                <p>{selected.email}</p>
                <p className="ad-m">{selected.phone}</p>
                <p className="ad-d">{fill(a.detail.customer, { id: selected.orderId })}</p>
              </div>
              <span className="ad-panel__side">
                <Badge tone={appTone[selected.status]} dot className="ad-m">
                  {t.app[selected.status]}
                </Badge>
                <Badge tone={appTone[selected.status]} className="ad-d">
                  {t.app[selected.status]}
                </Badge>
                <small className="ad-m">{fill(t.customers.detail.mSince, { date: fmtDate(locale, selected.purchased) })}</small>
                <Kebab />
              </span>
              <button type="button" className="ad-panel__close" aria-label={t.top.close} onClick={() => setSelected(null)}>
                <X aria-hidden="true" strokeWidth={2} />
              </button>
            </header>

            <Tabs id="app-d" items={a.detail.tabs} value={tab} onChange={setTab} className="ad-panel__tabs ad-d" />
            <Tabs id="app-m" items={a.detail.mTabs} icons={[User, History, Cloud, FileText]} value={tab} onChange={setTab} className="ad-panel__tabs ad-m" />

            <div className="ad-panel__body">
              {/* Desktop summary */}
              <div className="ad-d">
                <button type="button" className="ad-line is-boxed ad-line--click">
                  <BoxImg dosage={selected.dosage} size={36} />
                  <span className="ad-two">
                    <small>{a.detail.pack}</small>
                    <b>
                      {t.common.product} {selected.dosage} mg
                    </b>
                    <small>{t.common.tablets}</small>
                  </span>
                  <ChevronRight aria-hidden="true" strokeWidth={2} />
                </button>
                <Rows
                  rows={[
                    { icon: Calendar, label: a.detail.purchased, value: fmtDate(locale, selected.purchased) },
                    { icon: Smartphone, label: a.detail.start, value: short(selected.start) },
                    { icon: Clock, label: a.detail.end, value: selected.end ? `${short(selected.end)} ${a.detail.endDays}` : "–" },
                    {
                      icon: RefreshCw,
                      label: a.detail.sync,
                      value: (
                        <>
                          {selected.lastSync ? `${short(selected.lastSync)}, ${selected.lastSyncTime}` : "–"} {selected.syncOk && <Badge tone="leaf">{a.detail.synced}</Badge>}
                        </>
                      ),
                    },
                    { icon: Link2, label: a.detail.harbiz, value: selected.harbizId },
                  ]}
                  className="ad-rows--icons"
                />
                <div className="ad-panel__actions">
                  <Btn icon={RefreshCw} block>
                    {a.detail.activate}
                  </Btn>
                  <Btn tone="ghost" icon={Send} block>
                    {a.detail.resend}
                  </Btn>
                </div>
                <section className="ad-panel__sec">
                  <h3>{a.detail.timeline}</h3>
                  <Timeline events={a.detail.events.map((e, i) => ({ title: e, right: `${fmtDate(locale, i === 4 ? selected.lastSync ?? selected.purchased : selected.purchased)}, ${["10:14", "10:15", "10:16", "11:03", selected.lastSyncTime ?? "10:42"][i]}` }))} className="ad-tl--right" />
                </section>
                <section className="ad-panel__sec">
                  <div className="ad-panel__sechead">
                    <h3>
                      <FileText aria-hidden="true" strokeWidth={1.8} /> {a.detail.notes}
                    </h3>
                    <button type="button" className="ad-link">
                      <Pencil aria-hidden="true" strokeWidth={2} /> {t.common.edit}
                    </button>
                  </div>
                  <p className="ad-note ad-note--plain">{selected.note || (locale === "es" ? "Sin notas todavía." : "No notes yet.")}</p>
                </section>
              </div>

              {/* Phone summary */}
              <div className="ad-m ad-panel__grid">
                <section className="ad-panel__sec is-boxed">
                  <h3>
                    <Smartphone aria-hidden="true" strokeWidth={1.8} className="is-leaf" /> {a.detail.accessInfo}
                  </h3>
                  <Rows
                    rows={[
                      { label: a.detail.pack, value: `${t.common.product} ${selected.dosage} mg` },
                      { label: a.detail.start, value: short(selected.start) },
                      { label: a.detail.end, value: short(selected.end) },
                      { label: a.detail.remaining, value: a.detail.remainingValue, tone: "leaf" },
                      { label: a.detail.harbiz, value: selected.harbizId },
                    ]}
                  />
                </section>
                <div className="ad-panel__stack">
                  <section className="ad-panel__sec is-boxed">
                    <div className="ad-panel__sechead">
                      <h3>
                        <Cloud aria-hidden="true" strokeWidth={1.8} className="is-leaf" /> {a.detail.syncState}
                      </h3>
                      <Badge tone="leaf">{a.detail.synced}</Badge>
                    </div>
                    <Rows
                      rows={[
                        { label: a.detail.sync, value: fill(a.detail.inHours, { time: selected.lastSyncTime ?? "09:12" }) },
                        { label: a.detail.nextSync, value: a.detail.nextSyncValue },
                        { label: a.detail.records, value: <span className="ad-okdot" /> },
                      ]}
                    />
                  </section>
                  <Btn icon={RefreshCw} block>
                    {a.detail.mActivate}
                  </Btn>
                  <Btn tone="rose" icon={Mail} block>
                    {a.detail.mResend}
                  </Btn>
                  <Btn tone="outline" icon={KeyRound} block>
                    {a.detail.deactivate}
                  </Btn>
                </div>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </Page>
  );
}
