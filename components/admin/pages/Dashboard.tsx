"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { AlertTriangle, ArrowRight, BarChart3, Bell, ChevronRight, Clock, Coins, CreditCard, DollarSign, Download, Info, Package, PieChart, ShoppingCart, Smartphone, Star, Truck, UserPlus, Users, Wallet } from "lucide-react";
import { orders, salesByDay, salesByDosage, dosageTone, money } from "@/lib/admin/data";
import { adminHref } from "@/lib/admin/routes";
import { fmtDate, fmtDay } from "@/lib/admin/i18n";
import { useAdmin } from "../AdminContext";
import { ColorBars, Donut, SalesArea } from "../Charts";
import { PhoneMock } from "../Shell";
import { Badge, Block, BoxImg, Card, CardHead, DateRange, DosageLabel, Kebab, Kpi, Page, PayBadge, Select, Sprig, Trend, fmtInt, fmtMoney, grid, row, type Tone } from "../Ui";

export function Dashboard() {
  const { locale, t } = useAdmin();
  const d = t.dashboard;
  const day = (n: number) => fmtDay(locale, n);
  const k = (n: number) => `$${Math.round(n / 1000)}K`;

  return (
    <Page className="ad-dash">
      {/* Header */}
      <Block className="ad-head">
        <div className="ad-head__text">
          <h1 className="ad-h1">
            <span className="ad-d">{d.greeting}</span>
            <span className="ad-m">{d.mTitle}</span>
          </h1>
          <p className="ad-head__sub">
            <span className="ad-d">{d.sub}</span>
            <span className="ad-m">{d.mSub}</span>
          </p>
        </div>
        <div className="ad-head__actions">
          <DateRange className="ad-d" />
          <DateRange className="ad-m" value={t.common.today} />
        </div>
        <Sprig />
      </Block>

      {/* KPIs — desktop set */}
      <motion.div className="ad-kpis ad-kpis--5 ad-d" variants={grid(0.05)}>
        <Kpi icon={BarChart3} tone="leaf" label={d.kpis.revenue} value={684320} format={fmtMoney} unit="MXN" trend="+12.5%" trendLabel={t.common.vsMonth} />
        <Kpi icon={DollarSign} tone="rose" label={d.kpis.todayRevenue} value={28450} format={fmtMoney} unit="MXN" trend="+8.3%" trendLabel={t.common.vsDay} />
        <Kpi icon={ShoppingCart} tone="gold" label={d.kpis.orders} value={1248} trend="+14.2%" trendLabel={t.common.vsMonth} />
        <Kpi icon={Users} tone="leaf" label={d.kpis.newCustomers} value={386} trend="+22.7%" trendLabel={t.common.vsMonth} />
        <Kpi icon={Package} tone="rose" label={d.kpis.activePackages} value={3215} trend="+11.4%" trendLabel={t.common.vsMonth} />
        <Kpi icon={CreditCard} tone="gold" label={d.kpis.pendingPayments} value={47230} format={fmtMoney} unit="MXN" sub={d.kpis.pendingPaymentsSub} subTone="rose" />
        <Kpi icon={Truck} tone="leaf" label={d.kpis.pendingShipments} value={58} sub={d.kpis.pendingShipmentsSub} />
        <Kpi icon={Smartphone} tone="rose" label={d.kpis.appUsers} value={892} trend="+18.6%" trendLabel={t.common.vsMonth} />
        <Kpi icon={UserPlus} tone="gold" label={d.kpis.pendingActivations} value={124} trend="-6.3%" trendLabel={t.common.vsMonth} down />
        <Kpi icon={AlertTriangle} tone="rose" label={d.kpis.failed} value={18} trend="+5.9%" trendLabel={t.common.vsMonth} />
      </motion.div>

      {/* KPIs — phone set */}
      <motion.div className="ad-kpis ad-kpis--2 ad-m" variants={grid(0.05)}>
        <Kpi icon={Coins} tone="leaf" label={d.kpis.revenue} value={124580} format={fmtMoney} unit="MXN" trend="+12%" trendLabel={t.common.vsDay} />
        <Kpi icon={ShoppingCart} tone="rose" label={d.kpis.mOrders} value={68} trend="+23%" trendLabel={t.common.vsDay} />
        <Kpi icon={Users} tone="gold" label={d.kpis.newCustomers} value={24} trend="+20%" trendLabel={t.common.vsDay} />
        <Kpi icon={Package} tone="blue" label={d.kpis.activePackages} value={182} trend="+8%" trendLabel={t.common.vsDay} />
        <Kpi icon={Clock} tone="rose" label={d.kpis.pendingActivations} value={12} sub={d.kpis.pendingActivationsSub} subTone="gold" arrow />
        <Kpi icon={Smartphone} tone="leaf" label={d.kpis.mAppUsers} value={436} trend="+15%" trendLabel={t.common.vsDay} />
      </motion.div>

      {/* Charts row */}
      <div className="ad-dash__charts">
        <Card className="ad-dash__sales">
          <CardHead title={<span className="ad-d">{d.sales}</span>}>
            <Select value={t.common.last30} className="ad-d" />
          </CardHead>
          <div className="ad-m ad-dash__msales">
            <CardHead icon={BarChart3} tone="leaf" title={d.mSales}>
              <ChevronRight aria-hidden="true" />
            </CardHead>
            <p className="ad-hero-num">
              {money(124580)} <Trend delta="+12%" label="" />
            </p>
          </div>
          <div className="ad-d">
            <SalesArea data={salesByDay} dayLabel={day} yTicks={[0, 15000, 30000, 45000, 60000]} yFormat={(n) => `$${fmtInt(n)}`} height={190} id="dash" />
          </div>
          <div className="ad-m">
            <SalesArea data={salesByDay.filter((_, i) => i % 3 === 0)} dayLabel={day} yTicks={[0, 100000, 200000]} yFormat={k} height={130} tickDays={[1, 7, 13, 19, 25]} id="dash-m" />
          </div>
        </Card>

        <Card className="ad-dash__donut">
          <CardHead title={<span className="ad-d">{d.byPackage}</span>} />
          <CardHead icon={PieChart} tone="leaf" title={d.mByPackage} className="ad-m">
            <ChevronRight aria-hidden="true" />
          </CardHead>
          <div className="ad-dash__donutbody">
            <Donut data={salesByDosage.map((s) => ({ name: `${s.dosage} mg`, value: s.units, color: dosageTone[s.dosage] }))} center={{ big: "1,248", small: d.ordersUnit }} size={160} thickness={28} />
            <motion.ul className="ad-legend ad-legend--boxes" variants={grid(0.06, 0.2)} initial="hidden" animate="show">
              {salesByDosage.map((s) => (
                <motion.li key={s.dosage} variants={row}>
                  <i style={{ background: dosageTone[s.dosage] }} />
                  <BoxImg dosage={s.dosage} size={22} className="ad-d" />
                  <span>
                    <span className="ad-d">
                      {t.common.product} {s.dosage} mg
                    </span>
                    <span className="ad-m">{s.dosage} mg</span>
                    <small>
                      {s.pct}% <span className="ad-d">({fmtInt(s.units)})</span>
                    </small>
                    <em className="ad-m">{fmtInt(s.units)}</em>
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </Card>

        <Card className="ad-dash__bars ad-d">
          <CardHead title={d.byDosage}>
            <Select value={t.common.last30} />
          </CardHead>
          <ColorBars data={salesByDosage.map((s) => ({ label: `${s.dosage} mg`, value: s.units, color: dosageTone[s.dosage] }))} height={185} />
        </Card>
      </div>

      {/* Bottom row */}
      <div className="ad-dash__bottom">
        <Card className="ad-dash__recent">
          <CardHead title={d.recent} icon={ShoppingCart} tone="rose">
            <Link href={adminHref(locale, "orders")} className="ad-link">
              <span className="ad-d">{d.recentAll}</span>
              <span className="ad-m">{t.common.viewAll}</span>
              <ArrowRight aria-hidden="true" strokeWidth={2} className="ad-d" />
            </Link>
          </CardHead>
          <div className="ad-table ad-d">
            <table className="ad-tbl">
              <thead>
                <tr>
                  <th>{d.cols.id}</th>
                  <th>{d.cols.customer}</th>
                  <th>{d.cols.pack}</th>
                  <th>{d.cols.total}</th>
                  <th>{d.cols.status}</th>
                  <th className="ad-col--opt2">{d.cols.date}</th>
                  <th />
                </tr>
              </thead>
              <motion.tbody variants={grid(0.05, 0.1)} initial="hidden" animate="show">
                {orders.slice(0, 5).map((o) => (
                  <motion.tr key={o.id} variants={row}>
                    <td>
                      <b className="ad-id">#{o.id}</b>
                    </td>
                    <td>
                      <span className="ad-two">
                        <b>{o.customer}</b>
                        <small>{o.city.split(",")[0] === "CDMX" ? "CDMX" : o.city.replace("Monterrey", "Mty").replace("Guadalajara", "Gdl")}</small>
                      </span>
                    </td>
                    <td>
                      <span className="ad-prod">
                        <BoxImg dosage={o.dosage} size={26} />
                        <DosageLabel dosage={o.dosage} />
                      </span>
                    </td>
                    <td>
                      <b>{money(o.total)} MXN</b>
                    </td>
                    <td>{o.pay === "pending" ? <PayBadge status="pending" long /> : o.pay === "paid" && o.ship !== "preparing" && o.ship !== "shipped" ? <PayBadge status="paid" /> : o.ship === "preparing" ? <Badge tone="gold">{t.ship.preparing}</Badge> : o.ship === "shipped" ? <Badge tone="blue">{t.ship.shipped}</Badge> : <PayBadge status={o.pay} />}</td>
                    <td className="ad-col--opt2">
                      <span className="ad-two">
                        <span>{fmtDate(locale, o.date)}</span>
                        <small>{o.time}</small>
                      </span>
                    </td>
                    <td>
                      <Kebab />
                    </td>
                  </motion.tr>
                ))}
              </motion.tbody>
            </table>
          </div>
          <motion.ul className="ad-mlist ad-m" variants={grid(0.05, 0.1)} initial="hidden" animate="show">
            {orders.slice(0, 4).map((o, i) => (
              <motion.li key={o.id} variants={row}>
                <b className="ad-id">#{o.id}</b>
                {o.pay === "pending" ? <Badge tone="rose">{t.pay.pending}</Badge> : o.ship === "preparing" ? <Badge tone="gold">{t.ship.preparing}</Badge> : <Badge tone="leaf">{t.orders.detail.done}</Badge>}
                <span className="ad-mlist__name">{o.customer}</span>
                <b className="ad-mlist__amt">{money(o.total)} MXN</b>
                <small>
                  {i < 2 ? t.common.today : locale === "es" ? "Ayer" : "Yesterday"} {o.time}
                </small>
                <ChevronRight aria-hidden="true" />
              </motion.li>
            ))}
          </motion.ul>
        </Card>

        <Card className="ad-dash__alerts">
          <CardHead title={d.alerts} icon={Bell} tone="rose">
            <Link href={adminHref(locale, "orders")} className="ad-link">
              {t.common.viewAllF} <ArrowRight aria-hidden="true" strokeWidth={2} className="ad-d" />
            </Link>
          </CardHead>
          <AlertList items={d.alertItems} icons={[AlertTriangle, Truck, Package, Smartphone, AlertTriangle]} className="ad-d" />
          <AlertList items={d.mAlertItems} icons={[AlertTriangle, AlertTriangle, Info]} className="ad-m" />
        </Card>

        <Card className="ad-dash__app" tone="mint">
          <CardHead title={<span className="ad-d">{d.appCard.title}</span>} className="ad-d">
            <Badge tone="leaf" dot>
              {d.appCard.online}
            </Badge>
          </CardHead>
          <CardHead icon={Smartphone} tone="leaf" title={d.appCard.mTitle} className="ad-m" />
          <p className="ad-dash__appsub ad-d">{d.appCard.sub}</p>
          <div className="ad-dash__appbody">
            <div className="ad-dash__appstats">
              <p className="ad-m ad-hero-num ad-hero-num--sm">
                436 <small>{d.appCard.users}</small>
              </p>
              <p className="ad-m">
                <Trend delta="+15%" label={t.common.vsDay} />
              </p>
              <p className="ad-m ad-dash__appsub">{d.appCard.mSub}</p>
              <ul className="ad-stats ad-d">
                <li>
                  <Users aria-hidden="true" strokeWidth={1.8} />
                  <span>
                    <b>892</b>
                    <small>
                      {d.appCard.users} {d.appCard.usersSub}
                    </small>
                  </span>
                </li>
                <li>
                  <Download aria-hidden="true" strokeWidth={1.8} />
                  <span>
                    <b>4,320</b>
                    <small>{d.appCard.downloads}</small>
                  </span>
                </li>
                <li>
                  <Star aria-hidden="true" strokeWidth={1.8} />
                  <span>
                    <b>4.8</b>
                    <small>{d.appCard.rating}</small>
                  </span>
                </li>
              </ul>
              <Link href={adminHref(locale, "app")} className="ad-btn ad-btn--primary ad-d ad-dash__appcta">
                {d.appCard.cta} <ArrowRight aria-hidden="true" strokeWidth={2} />
              </Link>
              <Link href={adminHref(locale, "app")} className="ad-btn ad-btn--outline ad-btn--sm ad-m">
                {d.appCard.mCta}
              </Link>
            </div>
            <PhoneMock className="ad-dash__phone" tagline={locale === "es" ? "Tu bienestar en tus manos" : "Your wellness in your hands"} />
          </div>
        </Card>
      </div>
    </Page>
  );
}

function AlertList({ items, icons, className = "" }: { items: readonly { title: string; sub: string; tone: string }[]; icons: (typeof AlertTriangle)[]; className?: string }) {
  return (
    <motion.ul className={`ad-alerts ${className}`} variants={grid(0.06, 0.1)} initial="hidden" animate="show">
      {items.map((a, i) => {
        const Icon = icons[i] ?? Wallet;
        return (
          <motion.li key={a.title} variants={row} whileHover={{ x: 3 }}>
            <span className={`ad-alerts__icon is-${a.tone as Tone}`}>
              <Icon aria-hidden="true" strokeWidth={2} />
            </span>
            <span className="ad-alerts__text">
              <b>{a.title}</b>
              <small>{a.sub}</small>
            </span>
            <ChevronRight aria-hidden="true" strokeWidth={2} />
          </motion.li>
        );
      })}
    </motion.ul>
  );
}
