"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, ArrowUpDown, Box, CheckCircle2, ChevronDown, ChevronRight, CreditCard, Download, FileText, Lock, MapPin, Pencil, Pill, RotateCcw, ShoppingBag, Smartphone, Truck, User, UserRound, X } from "lucide-react";
import { orders, money, type Order } from "@/lib/admin/data";
import { fill } from "@/lib/i18n";
import { fmtDate } from "@/lib/admin/i18n";
import { useAdmin } from "../AdminContext";
import { AppBadge, Badge, Block, BoxImg, Btn, Card, Checkbox, DateRange, DosageLabel, FilterChip, Kebab, Page, PageHead, Pager, PayBadge, SearchBox, Select, SheetHandle, ShipBadge, Steps, Tabs, grid, row, appTone, EASE_OUT } from "../Ui";

export function Orders() {
  const { locale, t } = useAdmin();
  const o = t.orders;
  const [selected, setSelected] = useState<Order | null>(orders[0]);
  const [tab, setTab] = useState(0);

  return (
    <Page className={`ad-orders${selected ? " has-panel" : ""}`}>
      <PageHead title={o.title} sub={o.sub} mSub={o.mSub}>
        <DateRange className="ad-m" value={t.common.today} />
      </PageHead>

      {/* Desktop filters */}
      <Card className="ad-filters ad-d">
        <Select label={o.filters.range} value={t.common.range} />
        <Select label={o.filters.pay} value={t.common.all} />
        <Select label={o.filters.pack} value={t.common.all} />
        <Select label={o.filters.dosage} value={t.common.allF} />
        <Select label={o.filters.ship} value={t.common.all} />
        <Select label={o.filters.app} value={t.common.all} />
        <button type="button" className="ad-link ad-filters__clear">
          <RotateCcw aria-hidden="true" strokeWidth={2} /> {o.filters.clear}
        </button>
      </Card>

      {/* Phone filters */}
      <Block className="ad-mfilters ad-m">
        <FilterChip icon={CreditCard} tone="leaf" label={o.mFilters.pay} value={t.common.all} />
        <FilterChip icon={Box} tone="blue" label={o.mFilters.pack} value={t.common.all} />
        <FilterChip icon={Pill} tone="leaf" label={o.mFilters.dosage} value={t.common.allF} />
        <FilterChip icon={Truck} tone="gold" label={o.mFilters.ship} value={t.common.all} className="is-wide" />
        <FilterChip icon={Smartphone} tone="leaf" label={o.mFilters.app} value={t.common.all} className="is-wide" />
      </Block>

      <Block className="ad-mlisthead ad-m">
        <h2>{o.mCount}</h2>
        <button type="button" className="ad-sort">
          <ArrowUpDown aria-hidden="true" strokeWidth={2} /> {o.sort} <ChevronDown aria-hidden="true" strokeWidth={2} />
        </button>
      </Block>

      {/* Desktop table */}
      <Card className="ad-orders__table ad-d">
        <div className="ad-toolbar">
          <Btn icon={Download} trailing={ChevronDown}>
            {t.common.export}
          </Btn>
          <Btn tone="ghost" trailing={ChevronDown}>
            {o.bulk}
          </Btn>
          <SearchBox placeholder={o.search} className="ad-toolbar__search" />
        </div>
        <div className="ad-table">
          <table className="ad-tbl ad-tbl--orders">
            <thead>
              <tr>
                <th>
                  <Checkbox label="all" />
                </th>
                <th>{o.cols.id}</th>
                <th>{o.cols.customer}</th>
                <th className="ad-col--opt">{o.cols.city}</th>
                <th>{o.cols.pack}</th>
                <th className="ad-col--opt2">{o.cols.qty}</th>
                <th>{o.cols.total}</th>
                <th>{o.cols.pay}</th>
                <th>{o.cols.ship}</th>
                <th className="ad-col--opt">{o.cols.app}</th>
                <th>{o.cols.actions}</th>
              </tr>
            </thead>
            <motion.tbody variants={grid(0.04, 0.1)} initial="hidden" animate="show">
              {orders.map((r) => (
                <motion.tr key={r.id} variants={row} className={selected?.id === r.id ? "is-selected" : ""} onClick={() => setSelected(r)}>
                  <td>
                    <Checkbox label={r.id} checked={selected?.id === r.id} />
                  </td>
                  <td>
                    <span className="ad-two">
                      <b className="ad-id">#{r.id}</b>
                      <small>
                        {fmtDate(locale, r.date)} Â· {r.time}
                      </small>
                    </span>
                  </td>
                  <td>
                    <span className="ad-two">
                      <b>{r.customer}</b>
                      <small>{r.email}</small>
                    </span>
                  </td>
                  <td className="ad-col--opt">{r.city}</td>
                  <td>
                    <span className="ad-prod">
                      <BoxImg dosage={r.dosage} size={24} />
                      <span className="ad-two">
                        <b>{r.dosage} mg</b>
                        <small>{t.common.tablets}</small>
                      </span>
                    </span>
                  </td>
                  <td className="ad-col--opt2">{r.qty}</td>
                  <td>
                    <b>{money(r.total)} MXN</b>
                  </td>
                  <td>
                    <PayBadge status={r.pay} />
                  </td>
                  <td>
                    <ShipBadge status={r.ship} />
                  </td>
                  <td className="ad-col--opt">
                    <AppBadge status={r.app} />
                  </td>
                  <td>
                    <Kebab />
                  </td>
                </motion.tr>
              ))}
            </motion.tbody>
          </table>
        </div>
        <div className="ad-tfoot">
          <span>{fill(t.common.showing, { a: 1, b: 10, n: "1,248", what: o.unit })}</span>
          <Pager pages={[1, 2, 3, 4, 5]} last={125} />
        </div>
      </Card>

      {/* Phone cards */}
      <motion.ul className="ad-ocards ad-m" variants={grid(0.06, 0.1)} initial="hidden" animate="show">
        {orders.slice(0, 5).map((r, i) => (
          <motion.li key={r.id} variants={row} className={selected?.id === r.id ? "is-selected" : ""}>
            <button type="button" onClick={() => setSelected(r)}>
              <BoxImg dosage={r.dosage} size={40} />
              <span className="ad-ocards__who">
                <b className="ad-id">#{r.id}</b>
                <small>
                  {i < 2 ? t.common.today : locale === "es" ? "Ayer" : "Yesterday"} {r.time}
                </small>
                <strong>{r.customer}</strong>
                <em>{r.city}</em>
              </span>
              <span className="ad-ocards__what">
                <b>{r.dosage} mg</b>
                <small>{t.common.days30}</small>
                <strong>{money(r.total)} MXN</strong>
              </span>
              <span className="ad-ocards__chips">
                <Chip tone={r.pay === "paid" ? "leaf" : "gold"} icon={r.pay === "paid" ? CheckCircle2 : undefined} top={o.chips.pay} text={r.pay === "paid" ? o.detail.done : t.pay.pending} />
                <Chip tone={r.ship === "delivered" ? "leaf" : r.ship === "preparing" ? "gold" : r.ship === "pending" ? "muted" : "blue"} icon={r.ship === "pending" ? Box : r.ship === "delivered" ? CheckCircle2 : Truck} text={t.shipMobile[r.ship]} />
                <Chip tone={r.app === "none" ? "rose" : "leaf"} icon={r.app === "none" ? Lock : Smartphone} top={o.chips.app} text={r.app === "none" ? t.appMobile.none : t.appMobile.active} />
              </span>
              <ChevronRight aria-hidden="true" strokeWidth={2} />
            </button>
          </motion.li>
        ))}
      </motion.ul>

      {/* Detail — desktop side panel and phone bottom sheet */}
      <AnimatePresence>
        {selected && (
          <motion.aside key={selected.id} className="ad-panel ad-orders__panel" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 24 }} transition={{ duration: 0.45, ease: EASE_OUT }} aria-label={fill(o.detail.title, { id: selected.id })}>
            <SheetHandle />
            <header className="ad-panel__head">
              <BoxImg dosage={selected.dosage} size={64} className="ad-m ad-panel__box" />
              <div className="ad-panel__titles">
                <h2>
                  {fill(o.detail.title, { id: selected.id })} <Badge tone={selected.pay === "paid" ? "leaf" : "rose"} className="ad-panel__status">{selected.pay === "paid" ? <><span className="ad-d">{t.pay.paid}</span><span className="ad-m">{o.detail.done}</span></> : t.pay.pending}</Badge>
                </h2>
                <p className="ad-d">{fill(o.detail.placed, { date: fmtDate(locale, selected.date), time: selected.time })}</p>
                <p className="ad-m">{fill(o.detail.mPlaced, { time: selected.time })}</p>
                <p className="ad-m ad-panel__name">{selected.customer}</p>
                <small className="ad-m">{selected.city}</small>
              </div>
              <div className="ad-m ad-panel__amount">
                <b>{money(selected.total)} MXN</b>
                <small>
                  {selected.dosage} mg · {t.common.days30}
                </small>
              </div>
              <button type="button" className="ad-panel__close" aria-label={t.top.close} onClick={() => setSelected(null)}>
                <X aria-hidden="true" strokeWidth={2} />
              </button>
            </header>

            <Tabs id="order" items={o.detail.tabs} icons={[ShoppingBag, User, Truck, CreditCard, Smartphone, FileText]} value={tab} onChange={setTab} className="ad-panel__tabs" />

            <div className="ad-panel__body">
              {/* Products */}
              <section className="ad-panel__sec ad-d">
                <h3>{o.detail.products}</h3>
                <div className="ad-line">
                  <BoxImg dosage={selected.dosage} size={36} />
                  <DosageLabel dosage={selected.dosage} />
                  <span className="ad-line__price">
                    <b>{money(selected.total / selected.qty)} MXN</b>
                    <small>
                      {t.common.qty} {selected.qty}
                    </small>
                  </span>
                </div>
                <dl className="ad-totals">
                  <div>
                    <dt>{o.detail.subtotal}</dt>
                    <dd>{money(selected.total)} MXN</dd>
                  </div>
                  <div>
                    <dt>{o.detail.shipping}</dt>
                    <dd>$0 MXN</dd>
                  </div>
                  <div>
                    <dt>{o.detail.discount}</dt>
                    <dd>$0 MXN</dd>
                  </div>
                  <div className="is-total">
                    <dt>{o.detail.total}</dt>
                    <dd>{money(selected.total)} MXN</dd>
                  </div>
                </dl>
              </section>

              {/* Phone: product + status */}
              <div className="ad-m ad-panel__grid">
                <section className="ad-panel__sec is-boxed">
                  <h3>
                    <ShoppingBag aria-hidden="true" strokeWidth={1.8} /> {o.detail.product}
                  </h3>
                  <div className="ad-line ad-line--stack">
                    <BoxImg dosage={selected.dosage} size={46} />
                    <span className="ad-two">
                      <b>SanoVida {t.common.product}</b>
                      <small>{selected.dosage} mg</small>
                      <small>{t.common.tabletsDays}</small>
                      <strong>{money(selected.total)} MXN</strong>
                    </span>
                  </div>
                </section>
                <section className="ad-panel__sec is-boxed">
                  <h3>
                    <Truck aria-hidden="true" strokeWidth={1.8} /> {o.detail.status}
                  </h3>
                  <Steps steps={o.detail.mSteps} done={selected.ship === "delivered" ? 5 : selected.pay === "paid" ? 3 : 1} current={selected.ship === "delivered" ? 5 : selected.pay === "paid" ? 3 : 1} subs={[`09 Jul ${selected.time}`, t.orders.detail.done, "09 Jul 10:05", "10 Jul 11:30", "—"]} className="ad-steps--sm" />
                </section>
              </div>

              {/* Customer */}
              <section className="ad-panel__sec ad-d">
                <div className="ad-panel__sechead">
                  <h3>{o.detail.customer}</h3>
                  <button type="button" className="ad-link">
                    <Pencil aria-hidden="true" strokeWidth={2} /> {t.common.edit}
                  </button>
                </div>
                <div className="ad-who">
                  <span className="ad-who__avatar">
                    <UserRound aria-hidden="true" strokeWidth={1.6} />
                  </span>
                  <span className="ad-two">
                    <b>{selected.customer}</b>
                    <span>{selected.email}</span>
                    <span>+52 81 1234 5678</span>
                    <span className="ad-who__addr">
                      <MapPin aria-hidden="true" strokeWidth={1.8} /> {selected.city === "CDMX, CDMX" ? "Ciudad de México" : selected.city.replace("NL", "Nuevo León")}
                      <br />
                      C.P. 64000
                    </span>
                  </span>
                </div>
              </section>

              {/* Status */}
              <section className="ad-panel__sec ad-d">
                <h3>{o.detail.status}</h3>
                <Steps steps={o.detail.steps} done={selected.ship === "delivered" ? 4 : selected.ship === "shipped" ? 2 : selected.pay === "paid" ? 1 : 0} subs={[`${fmtDate(locale, selected.date)} ${selected.time}`]} />
              </section>

              {/* Payment & shipping */}
              <div className="ad-panel__grid">
                <section className="ad-panel__sec is-boxed">
                  <div className="ad-panel__sechead">
                    <h3>
                      <CreditCard aria-hidden="true" strokeWidth={1.8} className="ad-m" /> <span className="ad-d">{o.detail.payment}</span>
                      <span className="ad-m">{o.detail.mPayment}</span>
                    </h3>
                    <PayBadge status={selected.pay} />
                  </div>
                  <div className="ad-line">
                    <span className="ad-cardicon">
                      <span className="ad-m ad-visa">VISA</span>
                      <CreditCard aria-hidden="true" strokeWidth={1.6} className="ad-d" />
                    </span>
                    <span className="ad-two">
                      <b>{o.detail.card}</b>
                      <small>•••• 4242</small>
                      <small className="ad-d">
                        {fmtDate(locale, selected.date)}, {selected.time}
                      </small>
                      <small className="ad-d">{o.detail.cardId}</small>
                    </span>
                  </div>
                  <p className="ad-m ad-panel__stamp">
                    <Badge tone="leaf">{o.detail.done}</Badge> 09 Jul {selected.time}
                  </p>
                </section>
                <section className="ad-panel__sec is-boxed">
                  <div className="ad-panel__sechead">
                    <h3>
                      <Truck aria-hidden="true" strokeWidth={1.8} className="ad-m" /> {o.detail.ship}
                    </h3>
                    <ShipBadge status={selected.ship} />
                  </div>
                  <div className="ad-line">
                    <span className="ad-cardicon ad-cardicon--rose">
                      <span className="ad-m ad-estafeta">Estafeta</span>
                      <Truck aria-hidden="true" strokeWidth={1.6} className="ad-d" />
                    </span>
                    <span className="ad-two">
                      <b className="ad-d">{o.detail.shipMethod}</b>
                      <b className="ad-m">Estafeta</b>
                      <small className="ad-d">Estafeta</small>
                      <small className="ad-d">{o.detail.guide}</small>
                      <small className="ad-m">{o.detail.guideMobile}</small>
                      <small className="ad-m">
                        <Badge tone="blue">{t.shipMobile.transit}</Badge>
                      </small>
                      <small className="ad-m">
                        {o.detail.eta}
                        <br />
                        10 Jul 2025
                      </small>
                    </span>
                  </div>
                </section>
                <section className="ad-panel__sec is-boxed ad-m">
                  <h3>
                    <Smartphone aria-hidden="true" strokeWidth={1.8} /> {o.detail.mAppTitle}
                  </h3>
                  <div className="ad-line ad-line--stack">
                    <span className="ad-okcircle">
                      <CheckCircle2 aria-hidden="true" strokeWidth={2} />
                    </span>
                    <span className="ad-two">
                      <b>{o.detail.mAppActivated}</b>
                      <small>{o.detail.appUsers}</small>
                      <small>{fill(o.detail.activatedOn, { date: "09 Jul 09:20" })}</small>
                    </span>
                  </div>
                  <Btn tone="outline" size="sm" trailing={ArrowRight} block>
                    {o.detail.mViewApp}
                  </Btn>
                </section>
              </div>

              {/* App */}
              <section className="ad-panel__sec ad-d">
                <div className="ad-panel__sechead">
                  <h3>{o.detail.appTitle}</h3>
                  <Badge tone={appTone[selected.app]} dot>
                    {t.app[selected.app]}
                  </Badge>
                </div>
                <div className="ad-line">
                  <Smartphone aria-hidden="true" strokeWidth={1.6} className="ad-line__icon" />
                  <span className="ad-two">
                    <b>{o.detail.appActivated}</b>
                    <small>{selected.email}</small>
                    <small>
                      {fmtDate(locale, selected.date)}, 14:40
                    </small>
                  </span>
                  <Btn tone="soft" size="sm" trailing={ArrowRight} className="ad-line__cta">
                    {o.detail.viewApp}
                  </Btn>
                </div>
              </section>

              {/* Notes */}
              <section className="ad-panel__sec ad-d">
                <div className="ad-panel__sechead">
                  <h3>{o.detail.notes}</h3>
                  <button type="button" className="ad-link">
                    <Pencil aria-hidden="true" strokeWidth={2} /> {t.common.edit}
                  </button>
                </div>
                <p className="ad-note">
                  <FileText aria-hidden="true" strokeWidth={1.8} /> {o.detail.note}
                </p>
              </section>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </Page>
  );
}

function Chip({ tone, icon: Icon, top, text }: { tone: "leaf" | "gold" | "blue" | "muted" | "rose"; icon?: typeof CheckCircle2; top?: string; text: string }) {
  return (
    <span className={`ad-chip is-${tone}`}>
      {Icon && (
        <i>
          <Icon aria-hidden="true" strokeWidth={2.2} />
        </i>
      )}
      <span>
        {top && <small>{top}</small>}
        <b>{text}</b>
      </span>
    </span>
  );
}
