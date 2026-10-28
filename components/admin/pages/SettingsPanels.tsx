"use client";

import { motion } from "motion/react";
import { AlertTriangle, ArrowRight, BarChart3, Bell, Building, Check, Clock, Coins, CreditCard, Crown, Download, FileText, Globe, Hash, Headphones, ImageIcon, KeyRound, Landmark, Laptop, Link2, Lock, Mail, MapPin, MessageCircle, Monitor, Plus, RefreshCw, Search, Send, ShieldCheck, Smartphone, Sparkles, Truck, UserPlus, Users, Zap } from "lucide-react";
import { settingsPages } from "@/lib/admin/i18n-pages";
import { useAdmin } from "../AdminContext";
import { Avatar, Badge, Btn, Card, CardHead, CarrierMark, Checkbox, Field, Flag, Input, Select, Toggle, grid, row, type IconType, type Tone, EASE_OUT } from "../Ui";

const ROLE_ICONS: IconType[] = [Crown, Users, Headphones, FileText, BarChart3];

/** Settings tabs 1–9. Tab 0 (General) keeps the overview grid in Settings.tsx. */
export function SettingsPanel({ tab }: { tab: number }) {
  const { locale, t } = useAdmin();
  const p = settingsPages[locale];
  const s = t.settings;
  const c = t.common;

  const body = (() => {
    switch (tab) {
      /* ---------------- Users & permissions ---------------- */
      case 1:
        return (
          <>
            <Card className="ad-span2">
              <CardHead icon={Users} tone="gold" title={p.users.title} sub={p.users.sub}>
                <Btn icon={UserPlus} size="sm">
                  {p.users.invite}
                </Btn>
              </CardHead>
              <div className="ad-table">
                <table className="ad-tbl ad-tbl--settings">
                  <thead>
                    <tr>
                      <th>{p.users.cols.user}</th>
                      <th>{p.users.cols.role}</th>
                      <th>{p.users.cols.last}</th>
                      <th>{p.users.cols.status}</th>
                      <th aria-label={c.actions} />
                    </tr>
                  </thead>
                  <motion.tbody variants={grid(0.04)} initial="hidden" animate="show">
                    {p.users.people.map((u) => (
                      <motion.tr key={u.email} variants={row}>
                        <td>
                          <span className="ad-who">
                            <Avatar name={u.name} size="sm" tone={u.tone as Tone} />
                            <span className="ad-two">
                              <b>{u.name}</b>
                              <small>{u.email}</small>
                            </span>
                          </span>
                        </td>
                        <td>
                          <Badge tone={u.tone as Tone}>{u.role}</Badge>
                        </td>
                        <td>{u.last}</td>
                        <td>
                          <Badge tone={u.on ? "leaf" : "muted"} dot>
                            {u.on ? c.active : c.inactive}
                          </Badge>
                        </td>
                        <td className="ad-td--end">
                          <Toggle on={u.on} small label={u.name} />
                        </td>
                      </motion.tr>
                    ))}
                  </motion.tbody>
                </table>
              </div>
            </Card>
            <Card>
              <CardHead title={p.users.rolesTitle} sub={p.users.rolesSub} />
              <ul className="ad-paylist">
                {s.users.roles.map((role, i) => {
                  const Icon = ROLE_ICONS[i];
                  return (
                    <li key={role.name}>
                      <span className={`ad-tile ad-tile--sm is-${role.tone as Tone}`}>
                        <Icon aria-hidden="true" strokeWidth={1.8} />
                      </span>
                      <span className="ad-two">
                        <b>{role.name}</b>
                        <small>{role.desc}</small>
                      </span>
                      <Badge tone={role.tone as Tone}>{role.count}</Badge>
                    </li>
                  );
                })}
              </ul>
            </Card>
            <Card>
              <CardHead icon={ShieldCheck} tone="blue" title={p.users.permsTitle} sub={p.users.permsSub} />
              <SwitchList items={p.users.perms} />
            </Card>
          </>
        );

      /* ---------------- Language ---------------- */
      case 2:
        return (
          <>
            <Card>
              <CardHead icon={Globe} tone="leaf" title={p.language.title} sub={p.language.sub} />
              <Field label={p.language.main}>
                <Select value={p.language.mainValue} icon={Globe} />
              </Field>
              <ul className="ad-paylist ad-langrows">
                {p.language.langs.map((l) => (
                  <li key={l.code}>
                    <Flag code={l.code} className="ad-flag--lg" />
                    <span className="ad-two">
                      <b>
                        {l.name} <Badge tone={l.pct === 100 ? "leaf" : "muted"}>{l.state}</Badge>
                      </b>
                      <small className="ad-progress">
                        <span className="ad-bar">
                          <motion.i style={{ background: "var(--ad-green)" }} initial={{ width: 0 }} animate={{ width: `${l.pct}%` }} transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.2 }} />
                        </span>
                        <b>{l.pct}%</b> {p.language.coverage}
                      </small>
                    </span>
                    <Toggle on={l.on} label={l.name} />
                  </li>
                ))}
              </ul>
            </Card>
            <Card>
              <CardHead icon={Hash} tone="gold" title={p.language.formatsTitle} sub={p.language.formatsSub} />
              <div className="ad-form2">
                <Field label={p.language.date}>
                  <Select value={p.language.dateValue} />
                </Field>
                <Field label={p.language.numbers}>
                  <Select value={p.language.numbersValue} />
                </Field>
                <Field label={p.language.timezone}>
                  <Select value={p.language.timezoneValue} icon={Clock} />
                </Field>
                <Field label={p.language.currency}>
                  <Select value={p.language.currencyValue} icon={Coins} />
                </Field>
              </div>
            </Card>
            <Card className="ad-span2">
              <CardHead icon={Mail} tone="rose" title={p.language.emailsTitle} sub={p.language.emailsSub} />
              <SwitchList items={[{ name: p.language.emailsRule, desc: p.language.emailsRuleSub, on: true }]} />
            </Card>
          </>
        );

      /* ---------------- Payments ---------------- */
      case 3:
        return (
          <>
            <Card>
              <CardHead icon={CreditCard} tone="gold" title={p.payments.title} sub={p.payments.sub} />
              <ul className="ad-paylist">
                {s.payments.methods.map((m, i) => (
                  <li key={m.name}>
                    <span className={`ad-paylogo is-${["mp", "stripe", "paypal", "bank"][i]}`}>{["MP", "S", "P", ""][i] || <Landmark aria-hidden="true" strokeWidth={1.8} />}</span>
                    <span className="ad-two">
                      <b>{m.name}</b>
                      <small>{m.desc}</small>
                    </span>
                    <Badge tone={m.on ? "leaf" : "muted"}>{m.on ? c.active : c.inactive}</Badge>
                    <Toggle on={m.on} label={m.name} />
                  </li>
                ))}
              </ul>
            </Card>
            <Card>
              <CardHead icon={KeyRound} tone="blue" title={p.payments.credsTitle} sub={p.payments.credsSub}>
                <Btn tone="ghost" size="sm" icon={RefreshCw}>
                  {p.payments.test}
                </Btn>
              </CardHead>
              <Field label={p.payments.publicKey}>
                <Input value={p.payments.publicKeyValue} icon={KeyRound} />
              </Field>
              <Field label={p.payments.token}>
                <Input value={p.payments.tokenValue} icon={Lock} />
              </Field>
              <Field label={p.payments.mode} hint={p.payments.modeNote}>
                <div className="ad-segment ad-segment--inline" role="tablist">
                  {p.payments.modes.map((m, i) => (
                    <button type="button" role="tab" key={m} aria-selected={i === 1} className={i === 1 ? "is-active" : ""}>
                      {i === 1 && <i className="ad-segment__bg" />}
                      <span>{m}</span>
                    </button>
                  ))}
                </div>
              </Field>
            </Card>
            <Card className="ad-span2">
              <CardHead icon={FileText} tone="rose" title={p.payments.invoiceTitle} sub={p.payments.invoiceSub}>
                <Btn size="sm">{p.payments.save}</Btn>
              </CardHead>
              <div className="ad-form2 ad-form2--3">
                <Field label={p.payments.razon}>
                  <Input value={p.payments.razonValue} icon={Building} />
                </Field>
                <Field label={p.payments.rfc}>
                  <Input value={p.payments.rfcValue} icon={Hash} />
                </Field>
                <SwitchList items={[{ name: p.payments.autoInvoice, desc: p.payments.autoInvoiceSub, on: true }]} compact />
              </div>
            </Card>
          </>
        );

      /* ---------------- Shipping ---------------- */
      case 4:
        return (
          <>
            <Card className="ad-span2">
              <CardHead icon={Truck} tone="gold" title={p.shipping.title} sub={p.shipping.sub} />
              <div className="ad-table">
                <table className="ad-tbl ad-tbl--settings">
                  <thead>
                    <tr>
                      <th>{p.shipping.cols.method}</th>
                      <th>{p.shipping.cols.time}</th>
                      <th>{p.shipping.cols.cost}</th>
                      <th>{p.shipping.cols.status}</th>
                      <th aria-label={c.actions} />
                    </tr>
                  </thead>
                  <motion.tbody variants={grid(0.04)} initial="hidden" animate="show">
                    {p.shipping.methods.map((m, i) => {
                      const Icon = [Truck, Zap, Sparkles, MapPin][i];
                      return (
                        <motion.tr key={m.name} variants={row}>
                          <td>
                            <span className="ad-who">
                              <span className="ad-tile ad-tile--sm is-gold">
                                <Icon aria-hidden="true" strokeWidth={1.8} />
                              </span>
                              <b>{m.name}</b>
                            </span>
                          </td>
                          <td>{m.time}</td>
                          <td>
                            <b>{m.cost}</b>
                          </td>
                          <td>
                            <Badge tone={m.on ? "leaf" : "muted"} dot>
                              {m.on ? c.active : c.inactive}
                            </Badge>
                          </td>
                          <td className="ad-td--end">
                            <Toggle on={m.on} small label={m.name} />
                          </td>
                        </motion.tr>
                      );
                    })}
                  </motion.tbody>
                </table>
              </div>
            </Card>
            <Card>
              <CardHead icon={MapPin} tone="leaf" title={p.shipping.zonesTitle} sub={p.shipping.zonesSub}>
                <Btn tone="ghost" size="sm" icon={Plus}>
                  {p.shipping.addZone}
                </Btn>
              </CardHead>
              <ul className="ad-paylist">
                {p.shipping.zones.map((z) => (
                  <li key={z.name}>
                    <CarrierMark carrier={z.carrier.toLowerCase() as "estafeta" | "dhl" | "fedex" | "99minutos"} />
                    <span className="ad-two">
                      <b>{z.name}</b>
                      <small>{z.carrier}</small>
                    </span>
                    <Badge tone="muted" icon={Clock}>
                      {z.time}
                    </Badge>
                  </li>
                ))}
              </ul>
            </Card>
            <div className="ad-stack">
              <Card>
                <CardHead icon={Building} tone="blue" title={p.shipping.originTitle} sub={p.shipping.originSub} />
                <Field label={p.shipping.address}>
                  <Input value={p.shipping.addressValue} icon={MapPin} />
                </Field>
                <Field label={p.shipping.city}>
                  <Input value={p.shipping.cityValue} />
                </Field>
              </Card>
              <Card>
                <CardHead title={p.shipping.carriersTitle} sub={p.shipping.carriersSub} />
                <ul className="ad-chips ad-chips--carriers">
                  {p.shipping.carriers.map((k) => (
                    <li key={k.name} className={k.on ? "is-on" : ""}>
                      <CarrierMark carrier={k.name.toLowerCase() as "estafeta" | "dhl" | "fedex" | "99minutos"} />
                      <span>{k.name}</span>
                      <Toggle on={k.on} small label={k.name} />
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </>
        );

      /* ---------------- Harbiz ---------------- */
      case 5:
        return (
          <>
            <Card>
              <CardHead icon={Link2} tone="blue" title={p.harbiz.title} sub={p.harbiz.sub} />
              <div className="ad-harbiz">
                <span className="ad-harbiz__logo">H</span>
                <span className="ad-two">
                  <b>
                    Harbiz <Badge tone="leaf" className="is-solid">{p.harbiz.connected}</Badge>
                  </b>
                  <small>{p.harbiz.connectedSub}</small>
                </span>
              </div>
              <Field label={p.harbiz.workspace}>
                <Input value={p.harbiz.workspaceValue} icon={Globe} />
              </Field>
              <Field label={p.harbiz.apiKey}>
                <Input value={p.harbiz.apiKeyValue} icon={KeyRound} />
              </Field>
              <div className="ad-btnrow">
                <Btn tone="ghost" size="sm" icon={RefreshCw}>
                  {p.harbiz.test}
                </Btn>
                <Btn tone="rose" size="sm">
                  {p.harbiz.disconnect}
                </Btn>
              </div>
            </Card>
            <Card>
              <CardHead icon={RefreshCw} tone="leaf" title={p.harbiz.syncTitle} sub={p.harbiz.syncSub} />
              <SwitchList items={p.harbiz.sync} />
            </Card>
            <Card className="ad-span2">
              <CardHead icon={Clock} tone="gold" title={p.harbiz.logTitle} sub={p.harbiz.logSub}>
                <button type="button" className="ad-link">
                  <RefreshCw aria-hidden="true" strokeWidth={2} /> {s.harbiz.now}
                </button>
              </CardHead>
              <LogList items={p.harbiz.log.map((l) => ({ title: l.what, when: l.when, ok: l.ok }))} retry={p.harbiz.retry} />
            </Card>
          </>
        );

      /* ---------------- SEO ---------------- */
      case 6:
        return (
          <>
            <Card>
              <CardHead icon={Search} tone="leaf" title={p.seo.title} sub={p.seo.sub} />
              <Field label={p.seo.metaTitle} counter={`${p.seo.metaTitleValue.length}/60`}>
                <Input value={p.seo.metaTitleValue} />
              </Field>
              <Field label={p.seo.metaDesc} counter={`${p.seo.metaDescValue.length}/160`}>
                <Input value={p.seo.metaDescValue} multiline rows={2} />
              </Field>
              <div className="ad-form2">
                <Field label={p.seo.suffix}>
                  <Input value={p.seo.suffixValue} />
                </Field>
                <Field label={p.seo.sitemap}>
                  <Input value={p.seo.sitemapValue} icon={Link2} />
                </Field>
              </div>
              <SwitchList items={[{ name: p.seo.robots, desc: p.seo.robotsSub, on: true }]} compact />
            </Card>
            <div className="ad-stack">
              <Card>
                <CardHead icon={ImageIcon} tone="rose" title={p.seo.socialTitle} sub={p.seo.socialSub} />
                <Serp title={p.seo.metaTitleValue} url="sanovida.mx" desc={p.seo.metaDescValue} />
                <Field label={p.seo.og} hint={p.seo.ogHint}>
                  <div className="ad-imagefield">
                    <span className="ad-imagefield__thumb ad-imagefield__thumb--wide">
                      <span className="ad-imagefield__art" aria-hidden="true" />
                    </span>
                    <div className="ad-imagefield__btns">
                      <Btn tone="ghost" icon={ImageIcon} size="sm">
                        {t.content.editor.change}
                      </Btn>
                    </div>
                  </div>
                </Field>
              </Card>
              <Card>
                <CardHead icon={BarChart3} tone="blue" title={p.seo.analyticsTitle} sub={p.seo.analyticsSub} />
                <div className="ad-form2">
                  <Field label={p.seo.ga}>
                    <Input value={p.seo.gaValue} icon={BarChart3} />
                  </Field>
                  <Field label={p.seo.pixel}>
                    <Input value={p.seo.pixelValue} icon={Hash} />
                  </Field>
                </div>
                <p className="ad-inline-ok">
                  <i className="ad-okdot" /> {p.seo.verify}: <b>{p.seo.verifyValue}</b>
                </p>
              </Card>
            </div>
          </>
        );

      /* ---------------- Notifications ---------------- */
      case 7:
        return (
          <>
            <Card>
              <CardHead icon={Bell} tone="rose" title={p.notifications.title} sub={p.notifications.sub} />
              <ul className="ad-paylist">
                {p.notifications.channels.map((ch, i) => {
                  const Icon = [Mail, Smartphone, MessageCircle][i];
                  const tone: Tone = (["leaf", "blue", "gold"] as Tone[])[i];
                  return (
                    <li key={ch.name}>
                      <span className={`ad-tile ad-tile--sm is-${tone}`}>
                        <Icon aria-hidden="true" strokeWidth={1.8} />
                      </span>
                      <span className="ad-two">
                        <b>{ch.name}</b>
                        <small>{ch.desc}</small>
                      </span>
                      <Toggle on={ch.on} label={ch.name} />
                    </li>
                  );
                })}
              </ul>
            </Card>
            <Card>
              <CardHead icon={Send} tone="leaf" title={p.notifications.digestTitle} sub={p.notifications.digestSub} />
              <SwitchList items={[{ name: p.notifications.digest, desc: p.notifications.digestSub, on: true }]} compact />
              <div className="ad-form2">
                <Field label={p.notifications.digestTime}>
                  <Select value={p.notifications.digestTimeValue} icon={Clock} />
                </Field>
                <Field label={p.notifications.recipients}>
                  <Input value={p.notifications.recipientsValue} icon={Mail} />
                </Field>
              </div>
            </Card>
            <Card className="ad-span2">
              <CardHead icon={Zap} tone="gold" title={p.notifications.eventsTitle} sub={p.notifications.eventsSub} />
              <div className="ad-table">
                <table className="ad-tbl ad-tbl--matrix">
                  <thead>
                    <tr>
                      <th>{p.notifications.cols.event}</th>
                      <th>{p.notifications.cols.email}</th>
                      <th>{p.notifications.cols.push}</th>
                      <th>{p.notifications.cols.wa}</th>
                    </tr>
                  </thead>
                  <motion.tbody variants={grid(0.04)} initial="hidden" animate="show">
                    {p.notifications.events.map((e) => (
                      <motion.tr key={e.name} variants={row}>
                        <td>
                          <b>{e.name}</b>
                        </td>
                        <td>
                          <Checkbox checked={e.email} label={`${e.name} · ${p.notifications.cols.email}`} />
                        </td>
                        <td>
                          <Checkbox checked={e.push} label={`${e.name} · ${p.notifications.cols.push}`} />
                        </td>
                        <td>
                          <Checkbox checked={e.wa} label={`${e.name} · ${p.notifications.cols.wa}`} />
                        </td>
                      </motion.tr>
                    ))}
                  </motion.tbody>
                </table>
              </div>
            </Card>
          </>
        );

      /* ---------------- Security ---------------- */
      case 8:
        return (
          <>
            <Card>
              <CardHead icon={ShieldCheck} tone="blue" title={p.security.title} sub={p.security.sub} />
              <SwitchList items={[{ name: p.security.twofa, desc: p.security.twofaSub, on: true }]} compact />
              <Field label={p.security.timeout}>
                <Select value={p.security.timeoutValue} icon={Clock} />
              </Field>
              <div className="ad-field">
                <span className="ad-field__label">{p.security.policyTitle}</span>
                <ul className="ad-checklist">
                  {p.security.policies.map((po) => (
                    <li key={po.name}>
                      <span className={`ad-check${po.on ? " is-on" : ""}`} aria-hidden="true">
                        <Check strokeWidth={3} />
                      </span>
                      {po.name}
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
            <Card>
              <CardHead icon={Laptop} tone="leaf" title={p.security.sessionsTitle} sub={p.security.sessionsSub}>
                <button type="button" className="ad-link">
                  {p.security.revokeAll} <ArrowRight aria-hidden="true" strokeWidth={2} />
                </button>
              </CardHead>
              <ul className="ad-paylist">
                {p.security.sessions.map((se) => {
                  const Icon = se.device.includes("iPhone") ? Smartphone : Monitor;
                  return (
                    <li key={se.device + se.when}>
                      <span className={`ad-tile ad-tile--sm is-${se.current ? "leaf" : "muted"}`}>
                        <Icon aria-hidden="true" strokeWidth={1.8} />
                      </span>
                      <span className="ad-two">
                        <b>
                          {se.device} {se.current && <Badge tone="leaf">{se.when}</Badge>}
                        </b>
                        <small>
                          {se.place}
                          {!se.current && ` · ${se.when}`}
                        </small>
                      </span>
                      {!se.current && (
                        <Btn tone="light" size="sm">
                          {p.security.revoke}
                        </Btn>
                      )}
                    </li>
                  );
                })}
              </ul>
            </Card>
            <Card className="ad-span2">
              <CardHead icon={Clock} tone="gold" title={p.security.logTitle} sub={p.security.logSub} />
              <LogList items={p.security.log.map((l) => ({ title: l.what, sub: l.who, when: l.when, ok: l.ok }))} />
            </Card>
          </>
        );

      /* ---------------- Billing ---------------- */
      case 9:
        return (
          <>
            <Card tone="mint" className="ad-plan">
              <CardHead icon={Sparkles} tone="leaf" title={p.billing.title} sub={p.billing.sub}>
                <Btn tone="ghost" size="sm">
                  {p.billing.change}
                </Btn>
              </CardHead>
              <p className="ad-plan__price">
                <b>{p.billing.plan}</b>
                <span>{p.billing.planPrice}</span>
                <small>{p.billing.planSub}</small>
              </p>
              <ul className="ad-checklist ad-checklist--2">
                {p.billing.features.map((f) => (
                  <li key={f}>
                    <span className="ad-check is-on" aria-hidden="true">
                      <Check strokeWidth={3} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </Card>
            <div className="ad-stack">
              <Card>
                <CardHead icon={CreditCard} tone="gold" title={p.billing.methodTitle} sub={p.billing.methodSub} />
                <div className="ad-harbiz">
                  <span className="ad-paylogo is-paypal">V</span>
                  <span className="ad-two">
                    <b>{p.billing.card}</b>
                    <small>{p.billing.cardSub}</small>
                  </span>
                  <Btn tone="light" size="sm">
                    {p.billing.update}
                  </Btn>
                </div>
              </Card>
              <Card>
                <CardHead icon={Building} tone="blue" title={p.billing.fiscalTitle} sub={p.billing.fiscalSub} />
                <Field label={p.billing.razon}>
                  <Input value={p.billing.razonValue} />
                </Field>
                <div className="ad-form2">
                  <Field label={p.billing.rfc}>
                    <Input value={p.billing.rfcValue} />
                  </Field>
                  <Field label={p.billing.email}>
                    <Input value={p.billing.emailValue} icon={Mail} />
                  </Field>
                </div>
              </Card>
            </div>
            <Card className="ad-span2">
              <CardHead icon={FileText} tone="rose" title={p.billing.invoicesTitle} sub={p.billing.invoicesSub} />
              <div className="ad-table">
                <table className="ad-tbl ad-tbl--settings">
                  <thead>
                    <tr>
                      <th>{p.billing.cols.invoice}</th>
                      <th>{p.billing.cols.date}</th>
                      <th>{p.billing.cols.amount}</th>
                      <th>{p.billing.cols.status}</th>
                      <th aria-label={c.actions} />
                    </tr>
                  </thead>
                  <motion.tbody variants={grid(0.04)} initial="hidden" animate="show">
                    {p.billing.invoices.map((inv) => (
                      <motion.tr key={inv.id} variants={row}>
                        <td>
                          <b>{inv.id}</b>
                        </td>
                        <td>{inv.date}</td>
                        <td>
                          <b>{inv.amount}</b>
                        </td>
                        <td>
                          <Badge tone="leaf" dot>
                            {p.billing.paid}
                          </Badge>
                        </td>
                        <td className="ad-td--end">
                          <button type="button" className="ad-link">
                            <Download aria-hidden="true" strokeWidth={2} /> {p.billing.download}
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                  </motion.tbody>
                </table>
              </div>
            </Card>
          </>
        );

      default:
        return null;
    }
  })();

  return (
    <motion.div key={tab} className="ad-spage" variants={grid(0.06)} initial="hidden" animate="show">
      {body}
    </motion.div>
  );
}

/* ---------------- Shared pieces ---------------- */

function SwitchList({ items, compact }: { items: { name: string; desc: string; on: boolean }[]; compact?: boolean }) {
  return (
    <ul className={`ad-paylist${compact ? " ad-paylist--compact" : ""}`}>
      {items.map((it) => (
        <li key={it.name}>
          <span className="ad-two">
            <b>{it.name}</b>
            <small>{it.desc}</small>
          </span>
          <Toggle on={it.on} label={it.name} />
        </li>
      ))}
    </ul>
  );
}

function LogList({ items, retry }: { items: { title: string; sub?: string; when: string; ok: boolean }[]; retry?: string }) {
  return (
    <motion.ul className="ad-log" variants={grid(0.05)} initial="hidden" animate="show">
      {items.map((l) => (
        <motion.li key={l.title + l.when} variants={row} className={l.ok ? "" : "is-error"}>
          <span className="ad-log__dot" aria-hidden="true">
            {l.ok ? <Check strokeWidth={3} /> : <AlertTriangle strokeWidth={2.2} />}
          </span>
          <span className="ad-two">
            <b>{l.title}</b>
            {l.sub && <small>{l.sub}</small>}
          </span>
          {!l.ok && retry && (
            <button type="button" className="ad-link">
              <RefreshCw aria-hidden="true" strokeWidth={2} /> {retry}
            </button>
          )}
          <time>{l.when}</time>
        </motion.li>
      ))}
    </motion.ul>
  );
}

/** A search-result preview, as Google would print it. */
export function Serp({ title, url, desc }: { title: string; url: string; desc: string }) {
  return (
    <div className="ad-serp" aria-hidden="true">
      <small>
        <span className="ad-serp__fav">S</span> {url}
      </small>
      <b>{title}</b>
      <span>{desc}</span>
    </div>
  );
}
