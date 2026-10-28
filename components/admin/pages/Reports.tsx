"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { BarChart3, Box, ChevronDown, ChevronRight, Coins, CreditCard, Download, FileSpreadsheet, FileText, Filter, Home, Info, Package, RefreshCcw, ShoppingCart, Smartphone, TrendingUp, Users } from "lucide-react";
import { activationsByDay, campaigns, customersByDay, devices, funnel, retentionByDay, salesByDay, salesByDosage, dosageTone, money, topCustomers } from "@/lib/admin/data";
import { fmtDay } from "@/lib/admin/i18n";
import { useAdmin } from "../AdminContext";
import { ColorBars, DayBars, Donut, PairBars, RateLine, SalesArea } from "../Charts";
import { BoxImg, Btn, Card, CardHead, DateRange, Kebab, Kpi, Page, PageHead, Select, Trend, fmtInt, fmtMoney, fmtPct, grid, row, type IconType, EASE_OUT } from "../Ui";

const FUNNEL_ICONS: IconType[] = [Home, Package, ShoppingCart, CreditCard, Smartphone];
const FUNNEL_COLORS = ["#1f6b3a", "#5fae7a", "#d1a24a", "#e4679e", "#f4b6cf"];
const M_FUNNEL_COLORS = ["#3e8fd0", "#9fd3a8", "#d1a24a", "#e05a5a"];

export function Reports() {
  const { locale, t } = useAdmin();
  const r = t.reports;
  const day = (n: number) => fmtDay(locale, n);
  const [exportOpen, setExportOpen] = useState(false);
  const k = (n: number) => `$${Math.round(n / 1000)}K`;
  const mDays = salesByDay.filter((_, i) => i % 2 === 0).map((d, i) => ({ ...d, day: i * 2 + 1 }));

  return (
    <Page className="ad-reports">
      <PageHead title={r.title} sub={r.sub} mSub={r.mSub}>
        <div className="ad-reports__controls">
          <div className="ad-reports__ctl ad-d">
            <span className="ad-select__label">{r.type}</span>
            <Select value={r.typeValue} icon={BarChart3} />
          </div>
          <div className="ad-reports__ctl ad-d">
            <span className="ad-select__label">{r.range}</span>
            <DateRange />
          </div>
          <Select value={r.mTypeValue} label={r.type} icon={BarChart3} tone="leaf" className="ad-m ad-select--stacked" />
          <DateRange className="ad-m" value={locale === "es" ? "1 – 30 abr 2025" : "Apr 1 – 30, 2025"} />
          <div className="ad-export">
            <Btn icon={Download} trailing={ChevronDown} onClick={() => setExportOpen((v) => !v)}>
              {t.common.export}
            </Btn>
            <AnimatePresence>
              {exportOpen && (
                <motion.ul className="ad-menu" initial={{ opacity: 0, y: -6, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -6, scale: 0.98 }} transition={{ duration: 0.25, ease: EASE_OUT }}>
                  <li>
                    <button type="button">
                      <span className="ad-menu__icon is-leaf">
                        <FileText aria-hidden="true" strokeWidth={1.8} />
                      </span>
                      {r.csv}
                    </button>
                  </li>
                  <li>
                    <button type="button">
                      <span className="ad-menu__icon is-leaf">
                        <FileSpreadsheet aria-hidden="true" strokeWidth={1.8} />
                      </span>
                      {r.excel}
                    </button>
                  </li>
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        </div>
      </PageHead>

      <motion.div className="ad-kpis ad-kpis--4 ad-d" variants={grid(0.05)}>
        <Kpi icon={BarChart3} tone="leaf" label={r.kpis.aov} value={548} format={fmtMoney} unit="MXN" trend="+8.4%" trendLabel={t.common.vsPeriod} />
        <Kpi icon={Filter} tone="rose" label={r.kpis.conv} value={3.6} format={fmtPct(1)} trend="+0.8 pp" trendLabel={t.common.vsPeriod} />
        <Kpi icon={RefreshCcw} tone="gold" label={r.kpis.repeat} value={28.4} format={fmtPct(1)} trend="+5.2%" trendLabel={t.common.vsPeriod} />
        <Kpi icon={Smartphone} tone="rose" label={r.kpis.activation} value={72.1} format={fmtPct(1)} trend="+12.3%" trendLabel={t.common.vsPeriod} />
      </motion.div>
      <motion.div className="ad-kpis ad-kpis--2 ad-m" variants={grid(0.05)}>
        <Kpi icon={Coins} tone="leaf" label={r.kpis.aov} value={1832} format={fmtMoney} unit="MXN" trend="+18%" trendLabel={t.common.vsPeriod} />
        <Kpi icon={ShoppingCart} tone="rose" label={r.kpis.mConv} value={3.8} format={fmtPct(1)} trend="+0.9 pp" trendLabel={t.common.vsPeriod} />
        <Kpi icon={Users} tone="gold" label={r.kpis.repeat} value={28.6} format={fmtPct(1)} trend="+6.2 pp" trendLabel={t.common.vsPeriod} />
        <Kpi icon={Smartphone} tone="blue" label={r.kpis.activation} value={68.4} format={fmtPct(1)} trend="+12.5 pp" trendLabel={t.common.vsPeriod} />
      </motion.div>

      {/* Row 1 */}
      <div className="ad-reports__row1">
        <Card className="ad-reports__revenue">
          <CardHead title={<><span className="ad-d">{r.revenue}</span><span className="ad-m">{r.mRevenue}</span> <Info aria-hidden="true" strokeWidth={1.8} className="ad-info ad-d" /></>} icon={BarChart3} tone="leaf">
            <div className="ad-reports__total ad-d">
              <small>{r.revenueTotal}</small>
              <b>
                {money(684320)} <small>MXN</small>
              </b>
              <Trend delta="+12.5%" label={t.common.vsPeriod} />
            </div>
            <Select value={t.common.perDay} className="ad-d" />
            <button type="button" className="ad-link ad-m">
              {t.common.viewDetail} <ChevronRight aria-hidden="true" strokeWidth={2} />
            </button>
          </CardHead>
          <p className="ad-m ad-hero-num">
            {money(124580)} <Trend delta="+12%" label="" />
            <small>{r.periodTotal}</small>
          </p>
          <div className="ad-d">
            <SalesArea data={salesByDay} dayLabel={day} yTicks={[0, 15000, 30000, 45000, 60000]} yFormat={(n) => `$${fmtInt(n)}`} height={190} id="rep" />
          </div>
          <div className="ad-m">
            <SalesArea data={mDays} dayLabel={day} yTicks={[0, 100000, 200000]} yFormat={k} height={150} tickDays={[1, 5, 11, 15, 21, 25, 29]} id="rep-m" />
          </div>
        </Card>

        <Card className="ad-reports__funnel">
          <CardHead title={<>{r.funnel} <Info aria-hidden="true" strokeWidth={1.8} className="ad-info ad-d" /></>} sub={<span className="ad-d">{r.funnelSub}</span>} icon={Filter} tone="rose">
            <Select value={t.common.period} className="ad-d" />
            <button type="button" className="ad-link ad-m">
              {t.common.viewDetail} <ChevronRight aria-hidden="true" strokeWidth={2} />
            </button>
          </CardHead>
          <motion.ul className="ad-funnel ad-d" variants={grid(0.07, 0.2)} initial="hidden" animate="show">
            {funnel.map((f, i) => {
              const Icon = FUNNEL_ICONS[i];
              return (
                <motion.li key={f.key} variants={row}>
                  <span className="ad-funnel__icon">
                    <Icon aria-hidden="true" strokeWidth={1.8} />
                  </span>
                  <span className="ad-funnel__label">{r.funnelSteps[f.key]}</span>
                  <b>{fmtInt(f.value)}</b>
                  <span className="ad-bar">
                    <motion.i style={{ background: FUNNEL_COLORS[i] }} initial={{ width: 0 }} animate={{ width: `${f.pct}%` }} transition={{ duration: 0.9, delay: 0.3 + i * 0.08, ease: EASE_OUT }} />
                  </span>
                  <small>{f.pct.toFixed(1)}%</small>
                </motion.li>
              );
            })}
          </motion.ul>
          <div className="ad-m ad-mfunnel">
            <svg viewBox="0 0 120 150" className="ad-mfunnel__shape" aria-hidden="true">
              {[
                [0, 120, 36],
                [10, 100, 36],
                [22, 76, 36],
                [36, 48, 42],
              ].map(([inset, w, h], i) => (
                <motion.path key={i} d={`M${inset} ${i * 37} H${inset + w} L${inset + w - 10} ${i * 37 + h} H${inset + 10} Z`} fill={M_FUNNEL_COLORS[i]} initial={{ opacity: 0, scaleX: 0.6 }} animate={{ opacity: 1, scaleX: 1 }} transition={{ delay: 0.2 + i * 0.1, duration: 0.5, ease: EASE_OUT }} style={{ transformOrigin: "60px 0" }} />
              ))}
            </svg>
            <ul>
              {[
                { v: 10432, l: r.mFunnelSteps.visits, p: "100%" },
                { v: 2894, l: r.mFunnelSteps.selection, p: "27.7%" },
                { v: 1542, l: r.mFunnelSteps.checkout, p: "14.8%" },
                { v: 396, l: r.mFunnelSteps.paid, p: "3.8%" },
              ].map((f) => (
                <li key={f.l}>
                  <span className="ad-two">
                    <b>{fmtInt(f.v)}</b>
                    <small>{f.l}</small>
                  </span>
                  <em>{f.p}</em>
                </li>
              ))}
            </ul>
          </div>
        </Card>

        <Card className="ad-reports__bypack">
          <CardHead title={r.byPackage} icon={Box} tone="gold">
            <Select value={t.common.period} className="ad-d" />
            <button type="button" className="ad-link ad-m">
              {t.common.viewAll} <ChevronRight aria-hidden="true" strokeWidth={2} />
            </button>
          </CardHead>
          <motion.ul className="ad-hbars" variants={grid(0.07, 0.2)} initial="hidden" animate="show">
            {salesByDosage.slice(0, 5).map((s, i) => (
              <motion.li key={s.dosage} variants={row} className={i > 2 ? "ad-d" : ""}>
                <BoxImg dosage={s.dosage} size={26} />
                <span className="ad-two">
                  <b>
                    {t.common.product} {s.dosage} mg
                  </b>
                  <small className="ad-m">{money(s.revenue)} MXN</small>
                </span>
                <span className="ad-bar">
                  <motion.i style={{ background: dosageTone[s.dosage] }} initial={{ width: 0 }} animate={{ width: `${s.pct * 2.5}%` }} transition={{ duration: 0.9, delay: 0.3 + i * 0.08, ease: EASE_OUT }} />
                </span>
                <b className="ad-d">{s.units}</b>
                <small>{s.pct}%</small>
              </motion.li>
            ))}
          </motion.ul>
        </Card>
      </div>

      {/* Row 2 */}
      <div className="ad-reports__row2">
        <Card className="ad-reports__dosage">
          <CardHead title={r.byDosage} icon={Box} tone="blue">
            <Select value={t.common.period} className="ad-d" />
          </CardHead>
          <div className="ad-d">
            <ColorBars data={salesByDosage.map((s) => ({ label: `${s.dosage} mg`, value: s.units, color: dosageTone[s.dosage] }))} height={180} />
          </div>
          <ul className="ad-hbars ad-hbars--compact ad-m">
            <li className="ad-hbars__head">
              <span />
              <span />
              <small>%</small>
              <small>{r.sales}</small>
            </li>
            {salesByDosage.slice(0, 3).map((s, i) => (
              <li key={s.dosage}>
                <i className="ad-dot" style={{ background: dosageTone[s.dosage] }} />
                <span>{s.dosage} mg</span>
                <span className="ad-bar">
                  <motion.i style={{ background: dosageTone[s.dosage] }} initial={{ width: 0 }} animate={{ width: `${s.pct * 2.5}%` }} transition={{ duration: 0.9, delay: 0.3 + i * 0.08, ease: EASE_OUT }} />
                </span>
                <small>{s.pct}%</small>
                <b>{s.units}</b>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="ad-reports__retention">
          <CardHead title={r.retention} sub={<span className="ad-d">{r.retentionSub}</span>} icon={Users} tone="gold">
            <div className="ad-reports__total ad-d">
              <b>28.4%</b>
              <Trend delta="+5.2%" label={t.common.vsPeriod} />
            </div>
            <span className="ad-legend ad-legend--inline ad-m">
              <span>
                <i style={{ background: "#b7dcc0" }} /> {r.newCustomers}
              </span>
              <span>
                <i style={{ background: "#1f6b3a" }} /> {r.returning}
              </span>
            </span>
            <button type="button" className="ad-link ad-m">
              {t.common.viewDetail} <ChevronRight aria-hidden="true" strokeWidth={2} />
            </button>
          </CardHead>
          <div className="ad-d">
            <RateLine data={retentionByDay} dayLabel={day} height={150} />
          </div>
          <div className="ad-m ad-reports__pair">
            <PairBars data={customersByDay} dayLabel={day} names={[r.newCustomers, r.returning]} height={120} />
            <div className="ad-reports__pairstat">
              <span className="ad-tile is-leaf">
                <TrendingUp aria-hidden="true" strokeWidth={2} />
              </span>
              <span className="ad-two">
                <b>28.6%</b>
                <small>{r.returningShort}</small>
                <Trend delta="+6.2 pp" label={t.common.vsPeriod} />
              </span>
            </div>
          </div>
        </Card>

        <Card className="ad-reports__activation">
          <CardHead title={<>{r.activation} <Info aria-hidden="true" strokeWidth={1.8} className="ad-info ad-d" /></>} icon={Smartphone} tone="leaf">
            <div className="ad-reports__total ad-d">
              <b>3,115</b>
              <Trend delta="+12.3%" label={t.common.vsPeriod} />
            </div>
            <button type="button" className="ad-link ad-m">
              {t.common.viewDetail} <ChevronRight aria-hidden="true" strokeWidth={2} />
            </button>
          </CardHead>
          <p className="ad-m ad-hero-num ad-hero-num--sm">
            436 <small>{r.activeUsers}</small>
            <Trend delta="+15%" label={t.common.vsPeriod} />
          </p>
          <DayBars data={activationsByDay} dayLabel={day} height={150} highlightLast />
        </Card>
      </div>

      {/* Row 3 (desktop only) */}
      <div className="ad-reports__row3 ad-d">
        <Card className="ad-reports__campaigns">
          <CardHead title={<>{r.campaigns} <Info aria-hidden="true" strokeWidth={1.8} className="ad-info" /></>}>
            <Select value={t.common.period} />
          </CardHead>
          <div className="ad-table">
            <table className="ad-tbl ad-tbl--compact">
              <thead>
                <tr>
                  <th>{r.campaignCols.id}</th>
                  <th>{r.campaignCols.name}</th>
                  <th>{r.campaignCols.orders}</th>
                  <th>{r.campaignCols.revenue}</th>
                  <th>{r.campaignCols.conv}</th>
                  <th />
                </tr>
              </thead>
              <motion.tbody variants={grid(0.05, 0.2)} initial="hidden" animate="show">
                {campaigns.map((cp) => (
                  <motion.tr key={cp.id} variants={row}>
                    <td>
                      <i className={`ad-dot is-${cp.tone}`} /> <b className="ad-id">#{cp.id}</b>
                    </td>
                    <td>{cp.name}</td>
                    <td>{cp.orders}</td>
                    <td>{money(cp.revenue)} MXN</td>
                    <td>{cp.conv}%</td>
                    <td>
                      <Kebab />
                    </td>
                  </motion.tr>
                ))}
              </motion.tbody>
            </table>
          </div>
        </Card>

        <Card className="ad-reports__top">
          <CardHead title={r.top}>
            <Select value={t.common.period} />
          </CardHead>
          <div className="ad-table">
            <table className="ad-tbl ad-tbl--compact">
              <thead>
                <tr>
                  <th>{r.topCols.id}</th>
                  <th>{r.topCols.name}</th>
                  <th>{r.topCols.orders}</th>
                  <th>{r.topCols.revenue}</th>
                  <th />
                </tr>
              </thead>
              <motion.tbody variants={grid(0.05, 0.2)} initial="hidden" animate="show">
                {topCustomers.map((tc) => (
                  <motion.tr key={tc.id} variants={row}>
                    <td>
                      <b className="ad-id">#{tc.id}</b>
                    </td>
                    <td>{tc.name}</td>
                    <td>{tc.orders}</td>
                    <td>{money(tc.revenue)} MXN</td>
                    <td>
                      <Kebab />
                    </td>
                  </motion.tr>
                ))}
              </motion.tbody>
            </table>
          </div>
        </Card>

        <Card className="ad-reports__devices">
          <CardHead title={r.devices} />
          <div className="ad-reports__devicebody">
            <Donut data={devices.map((d) => ({ name: r.deviceNames[d.key], value: d.value, color: d.color }))} center={{ big: "3,115", small: r.activations }} size={140} thickness={24} startAngle={90} />
            <ul className="ad-legend ad-legend--rows">
              {devices.map((d) => (
                <li key={d.key}>
                  <i style={{ background: d.color }} />
                  <span>{r.deviceNames[d.key]}</span>
                  <b>
                    {fmtInt(d.value)} ({d.pct.toFixed(1)}%)
                  </b>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </div>
    </Page>
  );
}
