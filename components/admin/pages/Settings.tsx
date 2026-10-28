"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, BarChart3, Bell, ChevronDown, ChevronRight, Coins, CreditCard, Crown, FileText, Gift, Globe, Headphones, ImageIcon, Landmark, Link2, Mail, MessageCircle, RefreshCw, Settings as SettingsIcon, Shield, Store, Truck, Upload, Users, Zap, type LucideIcon } from "lucide-react";
import { adminImages, adminImg } from "@/lib/admin/assets";
import { useAdmin } from "../AdminContext";
import { SettingsPanel } from "./SettingsPanels";
import { Badge, Btn, Card, CardHead, Field, Flag, Input, Page, PageHead, Select, Toggle, grid, row, type IconType, type Tone, EASE_OUT } from "../Ui";

const TAB_ICONS: LucideIcon[] = [SettingsIcon, Users, Globe, CreditCard, Truck, Link2, BarChart3, Bell, Shield, FileText];
const TAB_TONES: Tone[] = ["leaf", "gold", "rose", "rose", "gold", "blue", "leaf", "rose", "blue", "rose"];
const ROLE_ICONS: IconType[] = [Crown, Users, Headphones, FileText, BarChart3];

export function Settings() {
  const { locale, t } = useAdmin();
  const s = t.settings;
  const [tab, setTab] = useState(0);

  return (
    <Page className="ad-settings">
      <PageHead title={s.title} sub={s.sub} mSub={s.mSub} />

      <motion.div className="ad-stabs" variants={row}>
        {s.tabs.map((label, i) => {
          const Icon = TAB_ICONS[i];
          return (
            <button type="button" key={label} className={`ad-stabs__item is-${TAB_TONES[i]}${tab === i ? " is-active" : ""}`} onClick={() => setTab(i)} aria-pressed={tab === i}>
              {tab === i && <motion.i layoutId="stab" className="ad-stabs__bg" transition={{ type: "spring", stiffness: 480, damping: 40 }} />}
              <Icon aria-hidden="true" strokeWidth={1.8} />
              <span className="ad-d">{label}</span>
              <span className="ad-m">{s.mTabs[i]}</span>
            </button>
          );
        })}
      </motion.div>

      <AnimatePresence mode="wait" initial={false}>
        {tab === 0 ? (
      <motion.div key="general" className="ad-settings__grid" variants={grid(0.05)} initial="hidden" animate="show" exit={{ opacity: 0, y: -6, transition: { duration: 0.18 } }}>
        {/* General */}
        <Card className="ad-settings__general">
          <CardHead icon={Store} tone="leaf" title={s.general.title} sub={<><span className="ad-d">{s.general.sub}</span><span className="ad-m">{s.general.mSub}</span></>} />
          <div className="ad-settings__generalbody">
            <div className="ad-form2">
              <Field label={s.general.name}>
                <Input value={locale === "es" ? s.general.nameValue : s.general.nameValue} icon={Store} />
              </Field>
              <Field label={s.general.slogan} className="ad-d">
                <Input value={s.general.sloganValue} />
              </Field>
              <Field label={s.general.email}>
                <Input value="soporte@sanovida.mx" icon={Mail} />
              </Field>
              <Field label={s.general.phone}>
                <Input value="+52 55 1234 5678" icon={MessageCircle} />
              </Field>
              <Field label={s.general.site}>
                <Input value="https://www.sanovida.mx" icon={Link2} />
              </Field>
              <Field label={<><span className="ad-d">{s.general.currency}</span><span className="ad-m">{s.general.mCurrency}</span></>}>
                <Select value={s.general.currencyValue} icon={Coins} className="ad-d" />
                <Select value={s.general.mCurrencyValue} icon={Coins} className="ad-m" />
              </Field>
            </div>
            <div className="ad-settings__logo ad-m">
              <span className="ad-field__label">{s.brand.title}</span>
              <span className="ad-logo-drop">
                <Image src={adminImg("logo")} alt="SanoVida" width={adminImages.logo.w} height={adminImages.logo.h} sizes="240px" />
                <Btn tone="soft" size="sm" icon={ImageIcon}>
                  {s.brand.change}
                </Btn>
              </span>
              <ul className="ad-colors">
                <li>
                  <span>{s.brand.primary}</span>
                  <i style={{ background: "#2e7d32" }} />
                  <code>#2E7D32</code>
                </li>
                <li>
                  <span>{s.brand.secondary}</span>
                  <i style={{ background: "#e83e8c" }} />
                  <code>#E83E8C</code>
                </li>
                <li>
                  <span>{s.brand.accent}</span>
                  <i style={{ background: "#d4af37" }} />
                  <code>#D4AF37</code>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Logo & brand (desktop) */}
        <Card className="ad-settings__brand ad-d">
          <CardHead title={s.brand.title} sub={s.brand.sub} />
          <div className="ad-settings__brandbody">
            <span className="ad-logo-drop">
              <Image src={adminImg("logo")} alt="SanoVida" width={adminImages.logo.w} height={adminImages.logo.h} sizes="280px" />
            </span>
            <div className="ad-two">
              <b>{s.brand.change}</b>
              <small>{s.brand.formats}</small>
              <small>{s.brand.size}</small>
              <Btn tone="ghost" icon={Upload} size="sm">
                {s.brand.select}
              </Btn>
            </div>
          </div>
        </Card>

        {/* Language */}
        <Card className="ad-settings__lang">
          <CardHead icon={Globe} tone="leaf" title={<><span className="ad-d">{s.language.title}</span><span className="ad-m">{s.language.mTitle}</span></>} sub={<><span className="ad-d">{s.language.sub}</span><span className="ad-m">{s.language.mSub}</span></>} />
          <div className="ad-settings__langbody ad-d">
            <Field label={s.language.main}>
              <button type="button" className="ad-select__btn">
                <Flag code="mx" /> <span className="ad-select__value">{s.language.es}</span> <ChevronDown aria-hidden="true" strokeWidth={2} />
              </button>
            </Field>
            <div className="ad-field">
              <span className="ad-field__label">{s.language.available}</span>
              <ul className="ad-checklist">
                <li>
                  <span className="ad-check is-on" aria-hidden="true">
                    ✓
                  </span>
                  <Flag code="mx" /> {s.language.es}
                </li>
                <li>
                  <span className="ad-check is-on" aria-hidden="true">
                    ✓
                  </span>
                  <Flag code="us" /> {s.language.en}
                </li>
              </ul>
            </div>
          </div>
          <ul className="ad-langlist ad-m">
            <li className="is-default">
              <Flag code="mx" className="ad-flag--lg" />
              <span className="ad-two">
                <b>{s.language.es}</b>
                <Badge tone="leaf" className="is-solid">
                  {s.language.defaultTag}
                </Badge>
              </span>
              <ChevronRight aria-hidden="true" strokeWidth={2} />
            </li>
            <li>
              <Flag code="us" className="ad-flag--lg" />
              <span className="ad-two ad-two--row">
                <b>{s.language.mEn}</b>
                <Badge tone="muted">{s.language.secondaryTag}</Badge>
              </span>
              <ChevronRight aria-hidden="true" strokeWidth={2} />
            </li>
          </ul>
        </Card>

        {/* Users & permissions (desktop) */}
        <Card className="ad-settings__users ad-d">
          <CardHead title={s.users.title} sub={s.users.sub}>
            <button type="button" className="ad-link">
              {s.users.all} <ArrowRight aria-hidden="true" strokeWidth={2} />
            </button>
          </CardHead>
          <motion.ul className="ad-roles" variants={grid(0.06, 0.2)} initial="hidden" animate="show">
            {s.users.roles.map((role, i) => {
              const Icon = ROLE_ICONS[i];
              return (
                <motion.li key={role.name} variants={row} whileHover={{ y: -3 }} transition={{ duration: 0.3, ease: EASE_OUT }}>
                  <span className={`ad-tile is-${role.tone as Tone}`}>
                    <Icon aria-hidden="true" strokeWidth={1.8} />
                  </span>
                  <b>{role.name}</b>
                  <small>{role.desc}</small>
                  <Badge tone={role.tone as Tone}>{role.count}</Badge>
                </motion.li>
              );
            })}
          </motion.ul>
        </Card>

        {/* Payments */}
        <Card className="ad-settings__pay">
          <CardHead icon={CreditCard} tone="gold" title={<><span className="ad-d">{s.payments.title}</span><span className="ad-m">{s.payments.mTitle}</span></>} sub={<><span className="ad-d">{s.payments.sub}</span><span className="ad-m">{s.payments.mSub}</span></>} />
          <ul className="ad-paylist">
            {s.payments.methods.map((m, i) => (
              <li key={m.name}>
                <span className={`ad-paylogo is-${["mp", "stripe", "paypal", "bank"][i]}`}>{["MP", "S", "P", ""][i] || <Landmark aria-hidden="true" strokeWidth={1.8} />}</span>
                <span className="ad-two">
                  <b>{m.name}</b>
                  <small className="ad-d">{m.desc}</small>
                </span>
                <Toggle on={m.on} label={m.name} />
                <Badge tone={m.on ? "leaf" : "muted"}>{m.on ? t.common.active : t.common.inactive}</Badge>
                <ChevronRight aria-hidden="true" strokeWidth={2} />
              </li>
            ))}
          </ul>
        </Card>

        {/* Shipping */}
        <Card className="ad-settings__ship">
          <CardHead icon={Truck} tone="gold" title={<><span className="ad-d">{s.shipping.title}</span><span className="ad-m">{s.shipping.mTitle}</span></>} sub={<><span className="ad-d">{s.shipping.sub}</span><span className="ad-m">{s.shipping.mSub}</span></>} />
          <div className="ad-settings__shipfields ad-d">
            <Field label={s.shipping.method}>
              <Select value={s.shipping.methodValue} />
            </Field>
            <Field label={s.shipping.cost}>
              <Input value="99" icon={Coins} suffix="MXN" />
            </Field>
            <Field label={s.shipping.free}>
              <Input value="1,000" icon={Coins} suffix="MXN" />
            </Field>
          </div>
          <button type="button" className="ad-zones ad-d">
            <span className="ad-tile is-leaf">
              <Truck aria-hidden="true" strokeWidth={1.8} />
            </span>
            <span className="ad-two">
              <b>{s.shipping.zones}</b>
              <small>{s.shipping.zonesSub}</small>
            </span>
            <ChevronRight aria-hidden="true" strokeWidth={2} />
          </button>
          <ul className="ad-shiplist ad-m">
            {s.shipping.mMethods.map((m, i) => {
              const Icon = [Truck, Zap, Gift][i];
              return (
                <li key={m.name}>
                  <span className="ad-tile is-gold">
                    <Icon aria-hidden="true" strokeWidth={1.8} />
                  </span>
                  <span className="ad-two">
                    <b>{m.name}</b>
                    <small>{m.desc}</small>
                  </span>
                  <Badge tone="leaf">{t.common.active}</Badge>
                </li>
              );
            })}
          </ul>
        </Card>

        {/* Harbiz */}
        <Card className="ad-settings__harbiz">
          <CardHead icon={Link2} tone="blue" title={s.harbiz.title} sub={<><span className="ad-d">{s.harbiz.sub}</span><span className="ad-m">{s.harbiz.mSub}</span></>} />
          <div className="ad-harbiz ad-d">
            <span className="ad-tile is-leaf">
              <Link2 aria-hidden="true" strokeWidth={1.8} />
            </span>
            <span className="ad-two">
              <b>{s.harbiz.sync}</b>
              <small>{s.harbiz.syncSub}</small>
            </span>
            <Toggle on label={s.harbiz.sync} />
            <Badge tone="leaf">{t.common.active}</Badge>
          </div>
          <button type="button" className="ad-zones ad-d">
            <SettingsIcon aria-hidden="true" strokeWidth={1.8} />
            <b>{s.harbiz.configure}</b>
            <ChevronRight aria-hidden="true" strokeWidth={2} />
          </button>
          <p className="ad-harbiz__last ad-d">
            <i className="ad-okdot" /> {s.harbiz.last}
            <button type="button" className="ad-link">
              <RefreshCw aria-hidden="true" strokeWidth={2} /> {s.harbiz.now}
            </button>
          </p>
          <div className="ad-harbiz ad-harbiz--m ad-m">
            <span className="ad-harbiz__logo">H</span>
            <span className="ad-two">
              <b>
                Harbiz <Badge tone="leaf" className="is-solid">{s.harbiz.connected}</Badge>
              </b>
              <small>{s.harbiz.connectedSub}</small>
            </span>
          </div>
          <ul className="ad-rows ad-rows--list ad-m">
            <li>
              <span>{s.harbiz.mLast}</span>
              <b>
                {t.common.today} 09:12 <ChevronRight aria-hidden="true" strokeWidth={2} />
              </b>
            </li>
            <li>
              <span>{s.harbiz.state}</span>
              <b>
                <i className="ad-okdot" /> {s.harbiz.stateValue} <ChevronRight aria-hidden="true" strokeWidth={2} />
              </b>
            </li>
          </ul>
        </Card>

        {/* SEO (desktop) */}
        <Card className="ad-settings__seo ad-d">
          <CardHead title={s.seo.title} sub={s.seo.sub} />
          <Field label={s.seo.siteTitle}>
            <Input value={s.seo.siteTitleValue} />
          </Field>
          <Field label={s.seo.desc} counter="0/160">
            <Input value={s.seo.descValue} multiline rows={2} />
          </Field>
        </Card>
      </motion.div>
        ) : (
          <SettingsPanel key={tab} tab={tab} />
        )}
      </AnimatePresence>
    </Page>
  );
}
