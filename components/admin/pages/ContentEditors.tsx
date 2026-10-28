"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Apple, Check, ThumbsUp, Globe, ImageIcon, Camera, Languages, Link2, Mail, MapPin, MessageCircle, Music, Play, Plus, Search, Sparkles, Star, Trash2 } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { DosageId } from "@/lib/catalog";
import { adminImages, adminImg } from "@/lib/admin/assets";
import { contentEditors } from "@/lib/admin/i18n-pages";
import { useAdmin } from "../AdminContext";
import { Badge, BoxImg, Btn, DosagePill, Field, Flag, Input, Select, Toggle, grid, row, EASE_OUT } from "../Ui";
import { Serp } from "./SettingsPanels";

export const CONTENT_KEYS = ["banner", "product", "packages", "app", "faq", "footer", "seo", "i18n"] as const;
export type ContentKey = (typeof CONTENT_KEYS)[number];

const DOSAGES: DosageId[] = ["0.8", "2.5", "5.5", "9", "14.5"];

/**
 * Editors for every landing-page section after the main banner.
 * Labels follow the admin locale; the text values follow the language being edited.
 */
export function ContentEditor({ section, lang }: { section: Exclude<ContentKey, "banner">; lang: Locale }) {
  const { locale, t } = useAdmin();
  const L = contentEditors[locale]; // labels
  const V = contentEditors[lang]; // values in the language being edited
  const c = t.common;

  switch (section) {
    case "product":
      return (
        <>
          <div className="ad-form2">
            <Field label={L.product.name}>
              <Input value={V.product.nameValue} />
            </Field>
            <Field label={L.product.tagline} counter={`${V.product.taglineValue.length}/40`}>
              <Input value={V.product.taglineValue} />
            </Field>
          </div>
          <Field label={L.product.desc} counter={`${V.product.descValue.length}/240`}>
            <Input value={V.product.descValue} multiline rows={3} />
          </Field>
          <div className="ad-field">
            <span className="ad-field__label">{L.product.benefits}</span>
            <div className="ad-form2">
              {V.product.benefitItems.map((b, i) => (
                <Input key={i} value={b} icon={Sparkles} />
              ))}
            </div>
          </div>
          <Field label={L.product.dosages} hint={L.product.dosagesSub}>
            <ul className="ad-boxrow">
              {DOSAGES.map((d) => (
                <li key={d}>
                  <BoxImg dosage={d} size={34} />
                  <DosagePill dosage={d} />
                </li>
              ))}
            </ul>
          </Field>
          <Field label={L.product.image} hint={L.product.hint}>
            <div className="ad-imagefield__btns">
              <Btn tone="ghost" icon={ImageIcon}>
                {t.content.editor.change}
              </Btn>
            </div>
          </Field>
        </>
      );

    case "packages":
      return (
        <>
          <div className="ad-form2">
            <Field label={L.packages.headline}>
              <Input value={V.packages.headlineValue} />
            </Field>
            <Field label={L.packages.body}>
              <Input value={V.packages.bodyValue} />
            </Field>
          </div>
          <Field label={L.packages.highlight}>
            <Select value={V.packages.highlightValue} icon={Star} />
          </Field>
          <motion.div className="ad-pkgedit" variants={grid(0.06)} initial="hidden" animate="show">
            {V.packages.items.map((p, i) => (
              <motion.div key={p.name} variants={row} className={i === 1 ? "is-popular" : ""}>
                <h4>
                  {p.name}
                  {i === 1 && <Badge tone="gold">{c.active === "Activo" ? "Más popular" : "Most popular"}</Badge>}
                </h4>
                <div className="ad-pkgedit__row">
                  <Field label={L.packages.name}>
                    <Input value={p.name} />
                  </Field>
                  <Field label={L.packages.price}>
                    <Input value={p.price} suffix="MXN" />
                  </Field>
                </div>
                <Field label={L.packages.tagline}>
                  <Input value={p.tagline} />
                </Field>
              </motion.div>
            ))}
          </motion.div>
          <div className="ad-field">
            <span className="ad-field__label">{L.packages.perks}</span>
            <ul className="ad-checklist ad-checklist--2">
              {V.packages.perkItems.map((perk) => (
                <li key={perk}>
                  <span className="ad-check is-on" aria-hidden="true">
                    <Check strokeWidth={3} />
                  </span>
                  {perk}
                </li>
              ))}
            </ul>
            <small className="ad-field__hint">{L.packages.note}</small>
          </div>
        </>
      );

    case "app":
      return (
        <>
          <Field label={L.app.headline} counter={`${V.app.headlineValue.length}/80`}>
            <Input value={V.app.headlineValue} />
          </Field>
          <Field label={L.app.body} counter={`${V.app.bodyValue.length}/200`}>
            <Input value={V.app.bodyValue} multiline rows={2} />
          </Field>
          <div className="ad-form2">
            <Field label={L.app.ios}>
              <Input value={V.app.iosValue} icon={Apple} />
            </Field>
            <Field label={L.app.android}>
              <Input value={V.app.androidValue} icon={Play} />
            </Field>
          </div>
          <div className="ad-field">
            <span className="ad-field__label">{L.app.features}</span>
            <div className="ad-form2">
              {V.app.featureItems.map((f, i) => (
                <Input key={i} value={f} icon={Check} />
              ))}
            </div>
          </div>
          <Field label={L.app.screenshots} hint={L.app.hint}>
            <ul className="ad-shots">
              {[0, 1, 2].map((i) => (
                <li key={i}>
                  <Image src={adminImg("splash")} alt="" width={adminImages.splash.w} height={adminImages.splash.h} sizes="120px" />
                </li>
              ))}
              <li className="is-add">
                <button type="button" aria-label={L.app.add}>
                  <Plus aria-hidden="true" strokeWidth={2} />
                </button>
              </li>
            </ul>
          </Field>
        </>
      );

    case "faq":
      return (
        <>
          <motion.ul className="ad-faqedit" variants={grid(0.05)} initial="hidden" animate="show">
            {V.faq.items.map((f, i) => (
              <motion.li key={i} variants={row} className={f.on ? "" : "is-off"}>
                <div className="ad-faqedit__head">
                  <span className="ad-faqedit__num" aria-hidden="true">
                    {i + 1}
                  </span>
                  <Input value={f.q} />
                  <small>{L.faq.visible}</small>
                  <Toggle on={f.on} small label={`${L.faq.visible} · ${f.q}`} />
                  <button type="button" className="ad-kebab is-rose" aria-label={`${c.delete} · ${f.q}`}>
                    <Trash2 aria-hidden="true" strokeWidth={1.8} />
                  </button>
                </div>
                <Input value={f.a} multiline rows={2} />
              </motion.li>
            ))}
          </motion.ul>
          <div className="ad-btnrow">
            <Btn tone="ghost" icon={Plus}>
              {L.faq.add}
            </Btn>
          </div>
        </>
      );

    case "footer":
      return (
        <>
          <Field label={L.footer.about} counter={`${V.footer.aboutValue.length}/160`}>
            <Input value={V.footer.aboutValue} multiline rows={2} />
          </Field>
          <div className="ad-form2">
            <Field label={L.footer.email}>
              <Input value="hola@sanovida.mx" icon={Mail} />
            </Field>
            <Field label={L.footer.phone}>
              <Input value="+52 55 1234 5678" icon={MessageCircle} />
            </Field>
          </div>
          <Field label={L.footer.address}>
            <Input value={V.footer.addressValue} icon={MapPin} />
          </Field>
          <div className="ad-field">
            <span className="ad-field__label">{L.footer.social}</span>
            <div className="ad-socials">
              {V.footer.socials.map((s, i) => {
                const Icon = [Camera, ThumbsUp, Music][i];
                return (
                  <div key={s.name}>
                    <span>
                      <Icon aria-hidden="true" strokeWidth={1.8} /> {s.name}
                    </span>
                    <Input value={s.handle} icon={Link2} />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="ad-field">
            <span className="ad-field__label">{L.footer.legal}</span>
            <ul className="ad-checklist">
              {V.footer.legalItems.map((l) => (
                <li key={l}>
                  <span className="ad-check is-on" aria-hidden="true">
                    <Check strokeWidth={3} />
                  </span>
                  {l}
                </li>
              ))}
            </ul>
          </div>
          <Field label={L.footer.disclaimer}>
            <Input value={V.footer.disclaimerValue} multiline rows={2} />
          </Field>
        </>
      );

    case "seo":
      return (
        <>
          <Field label={L.seo.metaTitle} counter={`${V.seo.metaTitleValue.length}/60`}>
            <Input value={V.seo.metaTitleValue} icon={Search} />
          </Field>
          <Field label={L.seo.metaDesc} counter={`${V.seo.metaDescValue.length}/160`}>
            <Input value={V.seo.metaDescValue} multiline rows={2} />
          </Field>
          <Field label={L.seo.keywords}>
            <Input value={V.seo.keywordsValue} />
          </Field>
          <Field label={L.seo.preview}>
            <Serp title={V.seo.metaTitleValue} url={V.seo.url} desc={V.seo.metaDescValue} />
          </Field>
          <Field label={L.seo.og} hint={L.seo.ogHint}>
            <div className="ad-imagefield">
              <span className="ad-imagefield__thumb ad-imagefield__thumb--wide">
                <span className="ad-imagefield__art" aria-hidden="true" />
              </span>
              <div className="ad-imagefield__btns">
                <Btn tone="ghost" icon={ImageIcon}>
                  {t.content.editor.change}
                </Btn>
                <Btn tone="rose" icon={Trash2}>
                  {t.content.editor.remove}
                </Btn>
              </div>
            </div>
          </Field>
          <ul className="ad-paylist ad-paylist--compact">
            <li>
              <span className="ad-tile ad-tile--sm is-leaf">
                <Globe aria-hidden="true" strokeWidth={1.8} />
              </span>
              <span className="ad-two">
                <b>{L.seo.indexing}</b>
                <small>{L.seo.indexingSub}</small>
              </span>
              <Toggle on label={L.seo.indexing} />
            </li>
          </ul>
        </>
      );

    case "i18n":
      return (
        <>
          <div className="ad-field">
            <span className="ad-field__label">{L.i18n.languages}</span>
            <ul className="ad-paylist ad-langrows">
              {L.i18n.langs.map((l) => (
                <li key={l.code}>
                  <Flag code={l.code} className="ad-flag--lg" />
                  <span className="ad-two">
                    <b>
                      {l.name} <Badge tone={l.pct === 100 ? "leaf" : "gold"}>{l.state}</Badge>
                    </b>
                    <small className="ad-progress">
                      <span className="ad-bar">
                        <motion.i style={{ background: l.pct === 100 ? "var(--ad-green)" : "var(--ad-gold)" }} initial={{ width: 0 }} animate={{ width: `${l.pct}%` }} transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.2 }} />
                      </span>
                      <b>{l.pct}%</b>
                    </small>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="ad-form2">
            <Field label={L.i18n.fallback}>
              <Select value={L.i18n.fallbackValue} icon={Languages} />
            </Field>
            <div className="ad-field">
              <span className="ad-field__label">{L.i18n.auto}</span>
              <ul className="ad-paylist ad-paylist--compact">
                <li>
                  <span className="ad-two">
                    <small>{L.i18n.autoSub}</small>
                  </span>
                  <Toggle on label={L.i18n.auto} />
                </li>
              </ul>
            </div>
          </div>
          <div className="ad-field">
            <span className="ad-field__label">{L.i18n.missing}</span>
            <motion.ul className="ad-faqedit ad-i18nlist" variants={grid(0.05)} initial="hidden" animate="show">
              {L.i18n.missingItems.map((m) => (
                <motion.li key={m.key} variants={row}>
                  <b>{m.key}</b>
                  <small>{m.es}</small>
                  <span className="ad-translate">
                    <Input value={m.en} />
                    <Btn tone="soft" size="sm" icon={Languages}>
                      {L.i18n.translate}
                    </Btn>
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </>
      );
  }
}
