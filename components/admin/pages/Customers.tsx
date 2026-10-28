"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowDown, ArrowRight, Calendar, ChevronRight, Clock, Download, FileText, Headphones, Mail, MapPin, MoreHorizontal, Package, Pencil, Phone, Plus, ShoppingCart, SlidersHorizontal, Smartphone, User, UserPlus, UserRound, Users, X } from "lucide-react";
import { customers, money, type Customer } from "@/lib/admin/data";
import { fill } from "@/lib/i18n";
import { fmtDate } from "@/lib/admin/i18n";
import { useAdmin } from "../AdminContext";
import { Avatar, Badge, Block, BoxImg, Btn, Card, CardHead, Checkbox, DosagePill, Kpi, Page, PageHead, Pager, Rows, SearchBox, Select, SheetHandle, Tabs, grid, row, EASE_OUT } from "../Ui";

export function Customers() {
  const { locale, t } = useAdmin();
  const c = t.customers;
  const [selected, setSelected] = useState<Customer | null>(customers[0]);
  const [tab, setTab] = useState(0);

  return (
    <Page className={`ad-customers${selected ? " has-panel" : ""}`}>
      <PageHead title={c.title} sub={c.sub} mSub={c.mSub}>
        <Btn icon={Plus} className="ad-d">
          {c.add}
        </Btn>
        <Btn icon={Plus} className="ad-m">
          {c.mAdd}
        </Btn>
      </PageHead>

      <motion.div className="ad-kpis ad-kpis--4 ad-d" variants={grid(0.05)}>
        <Kpi icon={Users} tone="leaf" label={c.kpis.total} value={386} trend="+22.7%" trendLabel={t.common.vsMonth} />
        <Kpi icon={UserPlus} tone="rose" label={c.kpis.newC} value={58} trend="+18.6%" trendLabel={t.common.vsMonth} />
        <Kpi icon={Users} tone="leaf" label={c.kpis.active} value={311} trend="+15.4%" trendLabel={t.common.vsMonth} />
        <Kpi icon={Headphones} tone="rose" label={c.kpis.support} value={12} trend="+33.3%" trendLabel={t.common.vsMonth} />
      </motion.div>
      <motion.div className="ad-kpis ad-kpis--2 ad-m" variants={grid(0.05)}>
        <Kpi icon={Users} tone="gold" label={c.kpis.mTotal} value={436} trend="+20%" trendLabel={t.common.vsDay} />
        <Kpi icon={User} tone="leaf" label={c.kpis.active} value={368} trend="+15%" trendLabel={t.common.vsDay} />
        <Kpi icon={UserPlus} tone="rose" label={c.kpis.newC} value={24} trend="+33%" trendLabel={t.common.vsDay} />
        <Kpi icon={Headphones} tone="blue" label={c.kpis.mSupport} value={12} trend="+8%" trendLabel={t.common.vsDay} />
      </motion.div>

      <Card className="ad-filters ad-filters--inline ad-d">
        <SearchBox placeholder={c.search} className="ad-filters__search" />
        <Select value={c.filters.packs} />
        <Select value={c.filters.states} />
        <Select value={c.filters.app} />
        <Btn tone="ghost" icon={SlidersHorizontal}>
          {t.common.moreFilters}
        </Btn>
      </Card>

      <Block className="ad-mfilters ad-mfilters--search ad-m">
        <SearchBox placeholder={c.mSearch} />
        <Btn tone="ghost" icon={SlidersHorizontal} trailing={ChevronRight}>
          {t.common.filters}
        </Btn>
      </Block>
      <Block className="ad-chips ad-m">
        {c.chips.map((label, i) => (
          <button type="button" key={label} className={i === 0 ? "is-active" : ""}>
            {label}
          </button>
        ))}
      </Block>

      {/* Desktop table */}
      <Card className="ad-customers__table ad-d">
        <CardHead title={c.list} sub={c.listSub}>
          <Btn tone="ghost" icon={Download} trailing={ChevronRight}>
            {t.common.export}
          </Btn>
        </CardHead>
        <div className="ad-table">
          <table className="ad-tbl ad-tbl--customers">
            <thead>
              <tr>
                <th>
                  <Checkbox label="all" />
                </th>
                <th>{c.cols.customer}</th>
                <th>{c.cols.contact}</th>
                <th>
                  {c.cols.registered} <ArrowDown aria-hidden="true" strokeWidth={2} className="ad-th__sort" />
                </th>
                <th className="ad-col--opt">{c.cols.orders}</th>
                <th>{c.cols.spent}</th>
                <th className="ad-col--opt2">{c.cols.pack}</th>
                <th>{c.cols.app}</th>
                <th className="ad-col--opt">{c.cols.last}</th>
                <th>{c.cols.actions}</th>
              </tr>
            </thead>
            <motion.tbody variants={grid(0.04, 0.1)} initial="hidden" animate="show">
              {customers.map((r) => (
                <motion.tr key={r.id} variants={row} className={selected?.id === r.id ? "is-selected" : ""} onClick={() => setSelected(r)}>
                  <td>
                    <Checkbox label={r.name} checked={selected?.id === r.id} />
                  </td>
                  <td>
                    <span className="ad-who ad-who--row">
                      <Avatar name={r.name} size="sm" />
                      <span className="ad-two">
                        <b>{r.name}</b>
                        <small>{r.city}</small>
                      </span>
                    </span>
                  </td>
                  <td>
                    <span className="ad-two">
                      <span className="ad-clip" title={r.email}>
                        {r.email}
                      </span>
                      <small>{r.phone}</small>
                    </span>
                  </td>
                  <td>
                    <span className="ad-two">
                      <span>{fmtDate(locale, r.registered)}</span>
                      <small>{r.registeredTime}</small>
                    </span>
                  </td>
                  <td className="ad-center ad-col--opt">{r.orders}</td>
                  <td>
                    <b>{money(r.spent)} MXN</b>
                  </td>
                  <td className="ad-col--opt2">{r.dosage ? <DosagePill dosage={r.dosage} /> : <span className="ad-dpill is-muted">{r.starter ? c.starter : c.none}</span>}</td>
                  <td>
                    <Badge tone={r.app === "active" ? "leaf" : "rose"} dot>
                      {r.app === "active" ? t.common.activeF : t.common.inactiveF}
                    </Badge>
                  </td>
                  <td className="ad-col--opt">{fmtDate(locale, r.lastPurchase)}</td>
                  <td>
                    <button type="button" className="ad-kebab" aria-label={t.common.actions}>
                      <MoreHorizontal aria-hidden="true" strokeWidth={2} />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </motion.tbody>
          </table>
        </div>
        <div className="ad-tfoot">
          <span>{fill(t.common.showing, { a: 1, b: 10, n: 386, what: c.unit })}</span>
          <Pager pages={[1, 2, 3, 4, 5]} last={39} />
        </div>
      </Card>

      {/* Phone cards */}
      <motion.ul className="ad-ccards ad-m" variants={grid(0.06, 0.1)} initial="hidden" animate="show">
        {customers.slice(0, 3).map((r) => (
          <motion.li key={r.id} variants={row} className={selected?.id === r.id ? "is-selected" : ""}>
            <Checkbox label={r.name} checked={selected?.id === r.id} />
            <button type="button" className="ad-ccards__btn" onClick={() => setSelected(r)}>
              <Avatar name={r.name} size="lg" />
              <span className="ad-ccards__who">
                <b>{r.name}</b>
                <small>{r.city}</small>
                <small>{r.email}</small>
              </span>
              <span className="ad-ccards__spent">
                <b>
                  {money(r.spent)} <small>MXN</small>
                </b>
                <small>{c.spent}</small>
                {r.dosage && <DosagePill dosage={r.dosage} />}
              </span>
              <span className="ad-ccards__app">
                <Badge tone={r.app === "active" ? "leaf" : "rose"} icon={Smartphone}>
                  {r.app === "active" ? c.appOn : c.appOff}
                </Badge>
              </span>
              <ChevronRight aria-hidden="true" strokeWidth={2} />
            </button>
          </motion.li>
        ))}
      </motion.ul>

      {/* Detail */}
      <AnimatePresence>
        {selected && (
          <motion.aside key={selected.id} className="ad-panel ad-customers__panel" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 24 }} transition={{ duration: 0.45, ease: EASE_OUT }} aria-label={selected.name}>
            <SheetHandle />
            <header className="ad-panel__head ad-panel__head--person">
              <Avatar name={selected.name} size="xl" tone="rose" />
              <div className="ad-panel__titles">
                <h2>
                  {selected.name} <Badge tone="leaf" className="ad-panel__status">{c.detail.activeTag}</Badge>
                </h2>
                <p className="ad-d">{fill(c.detail.since, { date: fmtDate(locale, selected.since) })}</p>
                <p className="ad-d">{selected.city}</p>
                <p className="ad-m">
                  <MapPin aria-hidden="true" strokeWidth={1.8} /> {selected.city}
                </p>
                <p className="ad-m">
                  <Mail aria-hidden="true" strokeWidth={1.8} /> {selected.email} <Calendar aria-hidden="true" strokeWidth={1.8} /> {fill(c.detail.mSince, { date: fmtDate(locale, selected.since) })}
                </p>
              </div>
              <Btn tone="ghost" size="sm" icon={Pencil} className="ad-m">
                {t.common.edit}
              </Btn>
              <button type="button" className="ad-panel__close" aria-label={t.top.close} onClick={() => setSelected(null)}>
                <X aria-hidden="true" strokeWidth={2} />
              </button>
            </header>

            <Tabs id="customer" items={c.detail.tabs} icons={[User, ShoppingCart, FileText, Clock]} value={tab} onChange={setTab} className="ad-panel__tabs ad-m" />

            <div className="ad-panel__body ad-panel__body--grid">
              <section className="ad-panel__sec is-boxed">
                <div className="ad-panel__sechead">
                  <h3>
                    <UserRound aria-hidden="true" strokeWidth={1.8} className="ad-m is-rose" /> {c.detail.personal}
                  </h3>
                  <Btn tone="ghost" size="sm" className="ad-d">
                    {t.common.edit}
                  </Btn>
                </div>
                <Rows
                  rows={[
                    { icon: User, label: c.detail.name, value: selected.name },
                    { icon: Mail, label: c.detail.email, value: selected.email },
                    { icon: Phone, label: c.detail.phone, value: `+52 ${selected.phone}` },
                    { icon: MapPin, label: c.detail.location, value: selected.city },
                    { icon: Calendar, label: c.detail.birthday, value: fmtDate(locale, selected.birthday) },
                  ]}
                  className="ad-rows--icons"
                />
              </section>

              <section className="ad-panel__sec is-boxed">
                <div className="ad-panel__sechead">
                  <h3>
                    <Package aria-hidden="true" strokeWidth={1.8} className="ad-m is-blue" /> {c.detail.pack}
                  </h3>
                  <button type="button" className="ad-link ad-d">
                    {c.detail.details}
                  </button>
                </div>
                <div className="ad-line">
                  <BoxImg dosage={selected.dosage ?? "0.8"} size={44} />
                  <span className="ad-two">
                    <b>
                      {t.common.product} {selected.dosage ?? "0.8"} mg
                    </b>
                    <small>{t.common.tablets}</small>
                    <small className="ad-d">{fill(c.detail.activeSince, { date: fmtDate(locale, selected.since) })}</small>
                    <small className="ad-m">{fill(c.detail.mActiveSince, { date: fmtDate(locale, selected.since) })}</small>
                    <button type="button" className="ad-link ad-m">
                      {c.detail.details} <ArrowRight aria-hidden="true" strokeWidth={2} />
                    </button>
                  </span>
                  <Badge tone="leaf" dot className="ad-d">
                    {t.common.active}
                  </Badge>
                  <Badge tone="leaf" className="ad-m">
                    {t.common.active}
                  </Badge>
                </div>
              </section>

              <section className="ad-panel__sec is-boxed">
                <div className="ad-panel__sechead">
                  <h3>
                    <Smartphone aria-hidden="true" strokeWidth={1.8} className="ad-m is-leaf" /> {c.detail.access}
                  </h3>
                  <button type="button" className="ad-link ad-d">
                    {c.detail.manage}
                  </button>
                </div>
                <Rows
                  rows={[
                    { icon: Smartphone, label: c.detail.account, value: <Badge tone={selected.app === "active" ? "leaf" : "rose"} dot>{selected.app === "active" ? t.common.activeF : t.common.inactiveF}</Badge> },
                    { icon: Clock, label: c.detail.lastAccess, value: `${fmtDate(locale, selected.lastPurchase)}, 14:32` },
                  ]}
                  className="ad-d"
                />
                <Rows
                  rows={[
                    { label: c.detail.status, value: <Badge tone={selected.app === "active" ? "leaf" : "rose"}>{selected.app === "active" ? c.appOn : c.appOff}</Badge> },
                    { label: c.detail.lastAccess, value: `${t.common.today} 09:12` },
                    { label: c.detail.devices, value: selected.device },
                  ]}
                  className="ad-m"
                />
                <button type="button" className="ad-link ad-m">
                  {c.detail.more} <ArrowRight aria-hidden="true" strokeWidth={2} />
                </button>
              </section>

              <section className="ad-panel__sec is-boxed ad-d">
                <div className="ad-panel__sechead">
                  <h3>{c.detail.history}</h3>
                  <button type="button" className="ad-link">
                    {t.common.viewAllF}
                  </button>
                </div>
                <Rows
                  rows={[
                    { icon: ShoppingCart, label: c.detail.totalOrders, value: selected.orders },
                    { icon: Package, label: c.detail.totalSpent, value: `${money(selected.spent)} MXN` },
                    { icon: Calendar, label: c.detail.lastPurchase, value: fmtDate(locale, selected.lastPurchase) },
                  ]}
                />
              </section>

              <section className="ad-panel__sec is-boxed">
                <div className="ad-panel__sechead">
                  <h3>
                    <FileText aria-hidden="true" strokeWidth={1.8} className="ad-m is-gold" /> {c.detail.notes}
                  </h3>
                  <Btn tone="ghost" size="sm" className="ad-d">
                    {t.common.edit}
                  </Btn>
                </div>
                <p className="ad-note">
                  <FileText aria-hidden="true" strokeWidth={1.8} className="ad-d" />
                  <span>
                    {selected.note || (locale === "es" ? "Sin notas todavía." : "No notes yet.")}
                    {selected.noteDate && (
                      <>
                        <small className="ad-d">{fill(c.detail.updated, { date: fmtDate(locale, selected.noteDate) })}</small>
                      </>
                    )}
                  </span>
                </p>
                {selected.noteDate && <small className="ad-m ad-panel__stamp">{fill(c.detail.mUpdated, { date: fmtDate(locale, selected.noteDate) })}</small>}
              </section>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </Page>
  );
}
