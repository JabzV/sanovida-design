"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { AlertTriangle, Box, Check, ChevronDown, ChevronRight, Gift, Info, Package, Pencil, Pill, Plus, ShoppingCart, Smartphone, Tag, Trash2, X } from "lucide-react";
import { packages, products, money, LOW_STOCK, type Package as Pack } from "@/lib/admin/data";
import { fill } from "@/lib/i18n";
import { useAdmin } from "../AdminContext";
import { Badge, BoxImg, Btn, Card, CardHead, Field, Input, Kebab, Kpi, Page, PageHead, Select, Toggle, grid, row, EASE_OUT } from "../Ui";

export function Products() {
  const { locale, t } = useAdmin();
  const p = t.products;
  const [editing, setEditing] = useState<Pack | null>(packages[1]);

  return (
    <Page className={`ad-products${editing ? " has-panel" : ""}`}>
      <PageHead title={p.title} sub={p.sub} mSub={p.mSub}>
        <Btn icon={Plus} className="ad-m">
          {p.add}
        </Btn>
      </PageHead>

      <motion.div className="ad-kpis ad-kpis--4" variants={grid(0.05)}>
        <Kpi icon={Box} tone="leaf" label={p.kpis.products} value={5} trend="0%" trendLabel={t.common.vsMonth} />
        <Kpi icon={Package} tone="rose" label={p.kpis.packs} value={3} trend="+50%" trendLabel={t.common.vsMonth} />
        <Kpi icon={AlertTriangle} tone="gold" label={p.kpis.low} value={2} trend="+1" trendLabel={t.common.vsMonth} />
        <Kpi icon={Tag} tone="rose" label={p.kpis.promos} value={1} trend="+100%" trendLabel={t.common.vsMonth} />
      </motion.div>

      {/* Products table */}
      <Card className="ad-products__table">
        <CardHead title={p.list} sub={<><span className="ad-d">{p.listSub}</span><span className="ad-m">{p.mListSub}</span></>} icon={Package} tone="rose">
          <Btn icon={Plus} className="ad-d">
            {p.add}
          </Btn>
          <button type="button" className="ad-link ad-m">
            {t.common.viewAll} <ChevronRight aria-hidden="true" strokeWidth={2} />
          </button>
        </CardHead>
        <div className="ad-table">
          <table className="ad-tbl ad-tbl--products">
            <thead>
              <tr>
                <th>{p.cols.product}</th>
                <th className="ad-d">{p.cols.form}</th>
                <th>{p.cols.sku}</th>
                <th>{p.cols.price}</th>
                <th>{p.cols.stock}</th>
                <th>{p.cols.status}</th>
                <th className="ad-d">{p.cols.actions}</th>
                <th className="ad-m" />
              </tr>
            </thead>
            <motion.tbody variants={grid(0.05, 0.1)} initial="hidden" animate="show">
              {products.map((r) => (
                <motion.tr key={r.sku} variants={row}>
                  <td>
                    <span className="ad-prod">
                      <BoxImg dosage={r.dosage} size={34} />
                      <span className="ad-two">
                        <b>
                          {t.common.product} {r.dosage} mg
                        </b>
                        <small>{t.common.tablets}</small>
                      </span>
                    </span>
                  </td>
                  <td className="ad-d">{r.dosage} mg</td>
                  <td>{r.sku}</td>
                  <td>
                    <b>{money(r.price)}</b>
                  </td>
                  <td>
                    <b className={r.stock < LOW_STOCK ? (r.stock < 150 ? "is-rose" : "is-gold") : "is-leaf"}>{r.stock}</b>
                  </td>
                  <td>
                    <Badge tone="leaf" className="ad-d">
                      {t.common.active}
                    </Badge>
                    <span className="ad-m ad-togglecell">
                      <span>{t.common.active}</span> <Toggle on small label={r.sku} />
                    </span>
                  </td>
                  <td className="ad-d">
                    <span className="ad-actions">
                      <Btn tone="ghost" size="sm" icon={Pencil}>
                        {t.common.edit}
                      </Btn>
                      <Kebab />
                    </span>
                  </td>
                  <td className="ad-m">
                    <Kebab />
                  </td>
                </motion.tr>
              ))}
            </motion.tbody>
          </table>
        </div>
      </Card>

      {/* Packages */}
      <Card className="ad-products__packs">
        <CardHead title={p.packs} sub={<><span className="ad-d">{p.packsSub}</span><span className="ad-m">{p.mPacksSub}</span></>} icon={ShoppingCart} tone="rose">
          <Btn icon={Plus} className="ad-d">
            {p.addPack}
          </Btn>
          <button type="button" className="ad-link ad-m">
            {t.common.viewAll} <ChevronRight aria-hidden="true" strokeWidth={2} />
          </button>
        </CardHead>
        <motion.div className="ad-packs" variants={grid(0.08, 0.15)} initial="hidden" animate="show">
          {packages.map((pk, i) => (
            <motion.article key={pk.id} className={`ad-pack${pk.popular ? " is-popular" : ""}${editing?.id === pk.id ? " is-editing" : ""}`} variants={row} whileHover={{ y: -4 }} transition={{ duration: 0.35, ease: EASE_OUT }}>
              {pk.popular && <span className="ad-pack__flag">{p.popular}</span>}
              <div className="ad-pack__top">
                <span className="ad-pack__img">
                  <BoxImg dosage={pk.dosage} size={54} />
                  {pk.boxes > 1 && <BoxImg dosage={pk.dosage} size={54} className="is-second" />}
                  {pk.boxes > 3 && <BoxImg dosage={pk.dosage} size={54} className="is-third" />}
                  <span className="ad-pack__months">{p.months[pk.id]}</span>
                </span>
                <span className="ad-pack__text">
                  <b className="ad-d">{fill(p.packName, { n: p.months[pk.id] })}</b>
                  <b className="ad-m">{p.months[pk.id]}</b>
                  <small className="ad-m">{fill(pk.boxes === 1 ? p.mBox : p.mBoxes, { n: pk.boxes, t: pk.tablets })}</small>
                  <span className="ad-pack__price">
                    {money(pk.price)} <small>MXN</small>
                    {pk.savePct > 0 && <s className="ad-m">{money(pk.listPrice)} MXN</s>}
                  </span>
                  <Badge tone={pk.savePct ? "rose" : "muted"} className="ad-pack__save">
                    {fill(p.save, { n: pk.savePct })}
                  </Badge>
                </span>
              </div>
              <ul className="ad-pack__list ad-d">
                <li>
                  <Package aria-hidden="true" strokeWidth={1.8} /> {fill(pk.boxes === 1 ? p.box : p.boxes, { n: pk.boxes })}
                </li>
                <li>
                  <Pill aria-hidden="true" strokeWidth={1.8} /> {fill(p.tabletsOf, { n: pk.tablets })}
                </li>
                <li>
                  <Smartphone aria-hidden="true" strokeWidth={1.8} /> {fill(p.appAccess, { n: locale === "es" ? `${pk.months} ${pk.months === 1 ? "mes" : "meses"}` : `${pk.months} ${pk.months === 1 ? "month" : "months"}` })}
                </li>
                <li>
                  <Gift aria-hidden="true" strokeWidth={1.8} /> {p.follow}
                </li>
              </ul>
              <ul className="ad-pack__list ad-m">
                {p.mFeatures[i].map((f) => (
                  <li key={f}>
                    <Check aria-hidden="true" strokeWidth={2.4} /> {f}
                  </li>
                ))}
              </ul>
              <Btn tone={pk.popular ? "primary" : "outline"} block icon={Pencil} onClick={() => setEditing(pk)} className="ad-pack__cta">
                <span className="ad-d">{p.editPack}</span>
                <span className="ad-m">{t.common.edit}</span>
              </Btn>
            </motion.article>
          ))}
        </motion.div>
      </Card>

      {/* Edit panel */}
      <AnimatePresence>
        {editing && (
          <motion.aside key={editing.id} className="ad-panel ad-products__panel ad-panel--static" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 24 }} transition={{ duration: 0.45, ease: EASE_OUT }} aria-label={p.edit.title}>
            <header className="ad-panel__head">
              <div className="ad-panel__titles">
                <h2>
                  <ShoppingCart aria-hidden="true" strokeWidth={1.8} className="ad-m is-rose" /> <span className="ad-d">{p.edit.title}</span>
                  <span className="ad-m">{p.edit.mTitle}</span>
                </h2>
              </div>
              <Btn tone="rose" size="sm" icon={Trash2} className="ad-m">
                {t.common.delete}
              </Btn>
              <button type="button" className="ad-panel__close ad-d" aria-label={t.top.close} onClick={() => setEditing(null)}>
                <X aria-hidden="true" strokeWidth={2} />
              </button>
            </header>
            <div className="ad-panel__body ad-products__form">
              <div className="ad-products__formtop">
                <span className="ad-products__preview ad-d">
                  <BoxImg dosage={editing.dosage} size={86} />
                  <span>{p.months[editing.id]}</span>
                </span>
                <div className="ad-products__fields">
                  <Field label={p.edit.name} hint={p.edit.nameHint} className="ad-field--row">
                    <Input value={fill(p.packName, { n: p.months[editing.id] })} />
                  </Field>
                  <Field label={<><span className="ad-d">{p.edit.duration}</span><span className="ad-m">{p.edit.mDuration}</span></>} className="ad-field--row">
                    <Select value={locale === "es" ? (editing.id === "3m" ? p.edit.durationValue : `${p.months[editing.id]} (${editing.months * 30} días)`) : editing.id === "3m" ? p.edit.durationValue : `${p.months[editing.id]} (${editing.months * 30} days)`} />
                  </Field>
                  <Field label={p.edit.included} className="ad-field--row ad-m">
                    <span className="ad-tokens">
                      <span className="ad-token">
                        {t.common.product} {editing.dosage} mg × {editing.boxes} <X aria-hidden="true" strokeWidth={2} />
                      </span>
                      <ChevronDown aria-hidden="true" strokeWidth={2} />
                    </span>
                  </Field>
                </div>
              </div>

              <section className="ad-panel__sec ad-d">
                <h3>{p.edit.included}</h3>
                <div className="ad-table">
                  <table className="ad-tbl ad-tbl--mini">
                    <thead>
                      <tr>
                        <th>{p.edit.cols.product}</th>
                        <th>{p.edit.cols.qty}</th>
                        <th>{p.edit.cols.form}</th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <span className="ad-prod">
                            <BoxImg dosage={editing.dosage} size={30} />
                            <span className="ad-two">
                              <b>
                                {t.common.product} {editing.dosage} mg
                              </b>
                              <small>{t.common.tablets}</small>
                            </span>
                          </span>
                        </td>
                        <td>
                          <Select value={String(editing.boxes)} className="ad-select--mini" />
                        </td>
                        <td>{editing.dosage} mg</td>
                        <td>
                          <button type="button" className="ad-kebab is-rose" aria-label={t.common.delete}>
                            <Trash2 aria-hidden="true" strokeWidth={2} />
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <Btn tone="outline" block icon={Plus}>
                  {p.edit.addToPack}
                </Btn>
              </section>

              <div className="ad-products__pricing">
                <Field label={p.edit.price} className="ad-field--row">
                  <Input value={money(editing.price)} />
                </Field>
                <Field label={<><span className="ad-d">{p.edit.discount}</span><span className="ad-m">{p.edit.mDiscount}</span></>} className="ad-field--row">
                  <span className="ad-discount">
                    <span className="ad-d">
                      <b className="ad-discount__pill">-{editing.savePct}%</b>
                    </span>
                    <span className="ad-m ad-discount__pair">
                      <Input value={String(editing.savePct)} />
                      <Select value="%" />
                    </span>
                  </span>
                </Field>
              </div>

              <Field label={p.edit.access} className="ad-field--row">
                <span className="ad-d">
                  <Select value={p.edit.accessValue} />
                </span>
                <span className="ad-m ad-field__toggle">
                  <Toggle on label={p.edit.access} />
                </span>
                <span className="ad-field__info ad-d">
                  <Info aria-hidden="true" strokeWidth={2} /> {p.edit.accessHint}
                </span>
                <span className="ad-field__info is-gold ad-m">
                  <Smartphone aria-hidden="true" strokeWidth={2} /> {p.edit.mAccessHint}
                </span>
              </Field>

              <div className="ad-switchrow ad-d">
                <Toggle on label={p.edit.active} />
                <span className="ad-two">
                  <b>{p.edit.active}</b>
                  <small>{p.edit.activeHint}</small>
                </span>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </Page>
  );
}
