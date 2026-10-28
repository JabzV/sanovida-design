"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { AlertTriangle, BarChart3, Box, ChevronRight, Coins, Copy, CreditCard, ExternalLink, Landmark, Package, RefreshCcw, Truck, X } from "lucide-react";
import { shipments, transactions, money, type PayMethod, type Shipment } from "@/lib/admin/data";
import { fill } from "@/lib/i18n";
import { fmtDate } from "@/lib/admin/i18n";
import { useAdmin } from "../AdminContext";
import { Badge, BoxImg, Btn, Card, CardHead, CarrierMark, DateRange, Kebab, Kpi, Page, PageHead, SearchBox, Select, ShipBadge, Timeline, fmtMoney, grid, row, EASE_OUT } from "../Ui";

function MethodIcon({ method }: { method: PayMethod }) {
  if (method === "card")
    return (
      <span className="ad-method is-card">
        <CreditCard aria-hidden="true" strokeWidth={1.8} />
      </span>
    );
  if (method === "oxxo") return <span className="ad-method is-oxxo">OXXO</span>;
  if (method === "mercadopago") return <span className="ad-method is-mp">MP</span>;
  if (method === "spei")
    return (
      <span className="ad-method is-spei">
        <Landmark aria-hidden="true" strokeWidth={1.8} />
      </span>
    );
  return <span className="ad-method is-paypal">P</span>;
}

export function Payments() {
  const { locale, t } = useAdmin();
  const p = t.payments;
  const [selected, setSelected] = useState<Shipment | null>(shipments[0]);

  return (
    <Page className="ad-payments">
      <PageHead title={p.title} sub={p.sub} mSub={p.mSub}>
        <DateRange className="ad-d" />
        <DateRange className="ad-m" value={t.common.today} />
      </PageHead>

      <motion.div className="ad-kpis ad-kpis--5 ad-d" variants={grid(0.05)}>
        <Kpi icon={BarChart3} tone="leaf" label={p.kpis.received} value={684320} format={fmtMoney} unit="MXN" trend="+12.5%" trendLabel={t.common.vsMonth} />
        <Kpi icon={AlertTriangle} tone="rose" label={p.kpis.failed} value={47230} format={fmtMoney} unit="MXN" trend="+5.9%" trendLabel={t.common.vsMonth} />
        <Kpi icon={Truck} tone="gold" label={p.kpis.pendingShip} value={58} trend="+18.6%" trendLabel={t.common.vsMonth} />
        <Kpi icon={Truck} tone="leaf" label={p.kpis.shipped} value={1082} trend="+22.7%" trendLabel={t.common.vsMonth} />
        <Kpi icon={RefreshCcw} tone="rose" label={p.kpis.refunds} value={12450} format={fmtMoney} unit="MXN" trend="+3.2%" trendLabel={t.common.vsMonth} />
      </motion.div>
      <motion.div className="ad-kpis ad-kpis--2 ad-m" variants={grid(0.05)}>
        <Kpi icon={Coins} tone="leaf" label={p.kpis.received} value={124580} format={fmtMoney} unit="MXN" trend="+12%" trendLabel={t.common.vsDay} />
        <Kpi icon={CreditCard} tone="rose" label={p.kpis.failed} value={6} trend="+50%" trendLabel={t.common.vsDay} />
        <Kpi icon={Truck} tone="gold" label={p.kpis.pendingShip} value={28} trend="-18%" trendLabel={t.common.vsDay} down />
        <Kpi icon={Package} tone="blue" label={p.kpis.shipped} value={52} trend="+28%" trendLabel={t.common.vsDay} />
        <Kpi icon={RefreshCcw} tone="rose" label={p.kpis.refunds} value={3} trend="-40%" trendLabel={t.common.vsDay} down className="is-wide" />
      </motion.div>

      {/* Transactions */}
      <Card className="ad-payments__tx">
        <CardHead title={p.tx} icon={CreditCard} tone="leaf">
          <Select value={p.providers} className="ad-d" />
          <Select value={p.states} className="ad-d" />
          <DateRange className="ad-d" />
          <SearchBox placeholder={p.txSearch} className="ad-d" />
          <Kebab />
          <button type="button" className="ad-link ad-m">
            {t.common.viewAllF}
          </button>
        </CardHead>
        <div className="ad-table">
          <table className="ad-tbl ad-tbl--tx">
            <thead>
              <tr>
                <th>
                  <span className="ad-d">{p.txCols.id}</span>
                  <span className="ad-m">{p.mTxCols.id}</span>
                </th>
                <th>{p.txCols.order}</th>
                <th>{p.txCols.customer}</th>
                <th>
                  <span className="ad-d">{p.txCols.amount}</span>
                  <span className="ad-m">{p.mTxCols.amount}</span>
                </th>
                <th>
                  <span className="ad-d">{p.txCols.method}</span>
                  <span className="ad-m">{p.mTxCols.method}</span>
                </th>
                <th>{p.txCols.status}</th>
                <th>{p.txCols.refund}</th>
                <th>{p.txCols.date}</th>
                <th />
              </tr>
            </thead>
            <motion.tbody variants={grid(0.05, 0.1)} initial="hidden" animate="show">
              {transactions.map((x, i) => (
                <motion.tr key={x.id} variants={row}>
                  <td>
                    <span className="ad-d">{x.id}</span>
                    <span className="ad-m">#TX{8921 - i}</span>
                  </td>
                  <td>
                    <b className="ad-id">#{x.orderId}</b>
                  </td>
                  <td>
                    <span className="ad-two">
                      <b>{x.customer}</b>
                      <small className="ad-d">{x.city}</small>
                    </span>
                  </td>
                  <td>
                    <b>{money(x.amount)} MXN</b>
                  </td>
                  <td>
                    <span className="ad-prod">
                      <span className="ad-d">
                        <MethodIcon method={x.method} />
                      </span>
                      <span className="ad-two">
                        <span className="ad-d">{p.methods[x.method]}</span>
                        <span className="ad-m">{p.mMethods[x.method]}</span>
                        {x.provider && <small className="ad-d">{x.provider}</small>}
                      </span>
                    </span>
                  </td>
                  <td>
                    <Badge tone={x.status === "failed" ? "rose" : "leaf"}>
                      <span className="ad-d">{p.txStatus[x.status]}</span>
                      <span className="ad-m">{p.mTxStatus[x.status]}</span>
                    </Badge>
                  </td>
                  <td>
                    {x.refund ? (
                      <span className="ad-refund">
                        <RefreshCcw aria-hidden="true" strokeWidth={2} className="ad-d" />
                        <span className="ad-d">{money(x.refund)} MXN</span>
                        <span className="ad-m">{t.common.yes}</span>
                      </span>
                    ) : (
                      <>
                        <span className="ad-d">—</span>
                        <span className="ad-m">{t.common.no}</span>
                      </>
                    )}
                  </td>
                  <td>
                    <span className="ad-two">
                      <span className="ad-d">{fmtDate(locale, x.date)}</span>
                      <small className="ad-d">{x.time}</small>
                      <span className="ad-m">
                        {i < 2 ? t.common.today : locale === "es" ? "Ayer" : "Yest."} {x.time}
                      </span>
                    </span>
                  </td>
                  <td>
                    <Kebab />
                    <ChevronRight aria-hidden="true" strokeWidth={2} className="ad-m" />
                  </td>
                </motion.tr>
              ))}
            </motion.tbody>
          </table>
        </div>
      </Card>

      {/* Shipping */}
      <div className={`ad-payments__shipwrap${selected ? " has-panel" : ""}`}>
        <Card className="ad-payments__ship">
          <CardHead title={p.shipping} icon={Truck} tone="leaf">
            <Select value={p.carriers} className="ad-d" />
            <Select value={p.states} className="ad-d" />
            <DateRange className="ad-d" />
            <SearchBox placeholder={p.shipSearch} className="ad-d" />
            <button type="button" className="ad-link ad-m">
              {t.common.viewAll}
            </button>
          </CardHead>
          <div className="ad-table">
            <table className="ad-tbl ad-tbl--ship">
              <thead>
                <tr>
                  <th>{p.shipCols.order}</th>
                  <th>{p.shipCols.customer}</th>
                  <th className="ad-d">{p.shipCols.address}</th>
                  <th>{p.shipCols.carrier}</th>
                  <th>{p.shipCols.tracking}</th>
                  <th>
                    <span className="ad-d">{p.shipCols.status}</span>
                    <span className="ad-m">{p.mShipCols.status}</span>
                  </th>
                  <th className="ad-d">{p.shipCols.dispatched}</th>
                  <th>
                    <span className="ad-d">{p.shipCols.eta}</span>
                    <span className="ad-m">{p.mShipCols.eta}</span>
                  </th>
                  <th />
                </tr>
              </thead>
              <motion.tbody variants={grid(0.05, 0.15)} initial="hidden" animate="show">
                {shipments.map((s) => (
                  <motion.tr key={s.orderId} variants={row} className={selected?.orderId === s.orderId ? "is-selected" : ""} onClick={() => setSelected(s)}>
                    <td>
                      <b className="ad-id">#{s.orderId}</b>
                    </td>
                    <td>
                      <span className="ad-two">
                        <b>{s.customer}</b>
                        <small className="ad-d">{s.city}</small>
                      </span>
                    </td>
                    <td className="ad-d">
                      <span className="ad-two">
                        <span>{s.address}</span>
                        <small>{s.address2}</small>
                      </span>
                    </td>
                    <td>
                      <CarrierMark carrier={s.carrier} />
                    </td>
                    <td>{s.tracking}</td>
                    <td>
                      <ShipBadge status={s.status} />
                    </td>
                    <td className="ad-d">{s.dispatched ? fmtDate(locale, s.dispatched) : "—"}</td>
                    <td>{fmtDate(locale, s.eta)}</td>
                    <td>
                      <Kebab />
                      <ChevronRight aria-hidden="true" strokeWidth={2} className="ad-m" />
                    </td>
                  </motion.tr>
                ))}
              </motion.tbody>
            </table>
          </div>
        </Card>

        <AnimatePresence>
          {selected && (
            <motion.aside key={selected.orderId} className="ad-panel ad-panel--static ad-payments__panel" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 24 }} transition={{ duration: 0.45, ease: EASE_OUT }} aria-label={p.detail.title}>
              <header className="ad-panel__head ad-d">
                <h2>{p.detail.title}</h2>
                <Badge tone="blue" icon={Truck}>
                  {t.ship.transit}
                </Badge>
                <button type="button" className="ad-panel__close" aria-label={t.top.close} onClick={() => setSelected(null)}>
                  <X aria-hidden="true" strokeWidth={2} />
                </button>
              </header>
              <div className="ad-panel__body ad-payments__detail">
                <div className="ad-payments__order">
                  <BoxImg dosage={selected.dosage} size={48} className="ad-d" />
                  <span className="ad-tile is-leaf ad-m">
                    <Box aria-hidden="true" strokeWidth={1.8} />
                  </span>
                  <span className="ad-two">
                    <b className="ad-payments__ordertitle">{fill(p.detail.order, { id: selected.orderId })}</b>
                    <span>{selected.customer}</span>
                    <small className="ad-d">{selected.city}</small>
                    <small className="ad-m">
                      {t.common.product} {selected.dosage} mg · {p.detail.box}
                    </small>
                  </span>
                </div>
                <div className="ad-payments__meta ad-d">
                  <span className="ad-two">
                    <small>{p.detail.carrier}</small>
                    <CarrierMark carrier={selected.carrier} />
                  </span>
                  <span className="ad-two">
                    <small>{p.detail.tracking}</small>
                    <b className="ad-tracking">
                      {selected.tracking} <Copy aria-hidden="true" strokeWidth={2} />
                    </b>
                  </span>
                </div>
                <div className="ad-payments__timeline">
                  <Timeline
                    events={p.detail.events.map((e, i) => ({
                      title: e.title,
                      sub: i === 0 ? `${fmtDate(locale, selected.dispatched ?? "2025-04-30")}, 14:32` : i === 1 ? `${fmtDate(locale, "2025-04-30")}, 08:15` : i === 2 ? `${fmtDate(locale, "2025-04-29")}, 18:20` : e.sub,
                      right: e.place || e.sub,
                      state: i === 0 ? "current" : i === 3 ? "todo" : "done",
                    }))}
                    className="ad-tl--right ad-d"
                  />
                  <Timeline
                    events={p.detail.mEvents.map((e, i) => ({
                      title: e,
                      sub: i === 3 ? `${t.common.today} ${fmtDate(locale, selected.eta)} ${p.detail.estimated}` : `${fmtDate(locale, i === 0 ? "2025-04-28" : i === 1 ? "2025-04-29" : "2025-04-30")}, ${["10:15", "14:20", "09:30"][i]}`,
                      state: i < 2 ? "done" : i === 2 ? "current" : "todo",
                    }))}
                    className="ad-m"
                  />
                  <div className="ad-payments__side ad-m">
                    <CarrierMark carrier={selected.carrier} />
                    <small>{p.detail.mTracking}</small>
                    <b className="ad-tracking">
                      {selected.tracking} <Copy aria-hidden="true" strokeWidth={2} />
                    </b>
                    <Btn icon={ExternalLink} block>
                      {p.detail.mTrack}
                    </Btn>
                    <Btn tone="outline" block>
                      {p.detail.viewOrder}
                    </Btn>
                  </div>
                </div>
                <Btn tone="soft" block trailing={ExternalLink} className="ad-d">
                  {p.detail.track}
                </Btn>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>
      </div>
    </Page>
  );
}
