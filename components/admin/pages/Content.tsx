"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, ChevronRight, Eye, FileText, Globe, HelpCircle, History, ImageIcon, Link2, Monitor, Package, Search, Send, ShoppingBag, Smartphone, Trash2, Upload, X } from "lucide-react";
import { href, type PageKey } from "@/lib/routes";
import { getDictionary, type Locale } from "@/lib/i18n";
import { useAdmin } from "../AdminContext";
import { ScaledFrame } from "../ScaledFrame";
import { contentEditors } from "@/lib/admin/i18n-pages";
import { CONTENT_KEYS, ContentEditor, type ContentKey } from "./ContentEditors";
import { Badge, Btn, Card, CardHead, Field, Flag, Input, Page, PageHead, Select, Toggle, grid, row, type IconType, type Tone, EASE_OUT } from "../Ui";

const SECTION_ICONS: IconType[] = [ImageIcon, ShoppingBag, Package, Smartphone, HelpCircle, FileText, Search, Globe];
const SECTION_TONES: Tone[] = ["rose", "gold", "rose", "leaf", "rose", "gold", "leaf", "gold"];
const M_TONES: Tone[] = ["leaf", "gold", "rose", "blue", "gold", "violet", "rose", "leaf"];
/** Site pages offered by the preview picker, in site-nav order. */
const SITE_PAGES: PageKey[] = ["home", "product", "packages", "app", "how", "faq", "checkout"];

/** The content section that edits each site page; pages without one keep the current section. */
const PAGE_SECTION: Partial<Record<PageKey, ContentKey>> = { home: "banner", product: "product", packages: "packages", app: "app", faq: "faq" };

/* How the preview frame scrolls to each section: the top, the bottom, or a selector. */
const PREVIEW_TARGETS: Record<ContentKey, string> = { banner: "top", product: "#hprod-title", packages: "#hpack-title", app: "#happ-title", faq: "top", footer: "bottom", seo: "top", i18n: "top" };

export function Content() {
  const { locale, t } = useAdmin();
  const c = t.content;
  const [section, setSection] = useState(0);
  const [lang, setLang] = useState<"es" | "en">(locale);
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  const [mDevice, setMDevice] = useState<"desktop" | "mobile">("mobile");
  // The picker overrides which site page is previewed until the next section click.
  const [pagePick, setPagePick] = useState<PageKey | null>(null);
  const [pickedFor, setPickedFor] = useState(section);
  if (pagePick !== null && pickedFor !== section) {
    setPagePick(null);
    setPickedFor(section);
  }
  const editor = t.content.editor;
  const key = CONTENT_KEYS[section];
  const ce = contentEditors[locale];
  const head = key === "banner" ? { title: editor.title, sub: editor.sub, mSub: editor.mSub } : { title: ce[key].title, sub: ce[key].sub, mSub: ce[key].sub };
  const SectionIcon = SECTION_ICONS[section];
  // The live preview follows the section being edited.
  // A fixed fragment keeps the site from scrolling itself to the top on load; the frame does the scrolling.
  const sectionPage: PageKey = key === "faq" ? "faq" : "home";
  const previewPage = pagePick ?? sectionPage;
  const previewSrc = href(lang, previewPage, "preview");
  // Picking a page also opens the section that edits it, when there is one.
  const pickPage = (p: PageKey) => {
    const s = CONTENT_KEYS.indexOf(PAGE_SECTION[p] ?? key);
    setSection(s);
    setPickedFor(s);
    setPagePick(p);
  };
  const previewTarget = previewPage === sectionPage ? PREVIEW_TARGETS[key] : "top";

  return (
    <Page className="ad-content">
      <PageHead title={c.title} sub={c.sub} mSub={c.mSub}>
        <Select value={c.history} icon={History} className="ad-d ad-select--btn" />
        <Btn tone="light" className="ad-content__draft">
          {c.draft}
        </Btn>
        <Btn icon={Send}>
          <span className="ad-d">{c.publish}</span>
          <span className="ad-m">{c.publish}</span>
        </Btn>
      </PageHead>

      <div className="ad-content__grid">
        {/* Section list */}
        <motion.ul className="ad-sections" variants={grid(0.05)}>
          {c.sections.map((s, i) => {
            const Icon = SECTION_ICONS[i];
            return (
              <motion.li key={s.key} variants={row}>
                <button type="button" className={`ad-sections__item${section === i ? " is-active" : ""}`} onClick={() => setSection(i)} aria-pressed={section === i}>
                  <span className={`ad-tile is-${SECTION_TONES[i]} ad-d`}>
                    <Icon aria-hidden="true" strokeWidth={1.8} />
                  </span>
                  <span className={`ad-tile is-${M_TONES[i]} ad-m`}>
                    <Icon aria-hidden="true" strokeWidth={1.8} />
                  </span>
                  <span className="ad-two">
                    <b>{s.title}</b>
                    <small className="ad-d">{s.sub}</small>
                    <small className="ad-m">{s.mSub}</small>
                  </span>
                  <ChevronRight aria-hidden="true" strokeWidth={2} />
                </button>
              </motion.li>
            );
          })}
        </motion.ul>

        {/* Editor */}
        <Card className="ad-editor">
          <CardHead title={<><SectionIcon aria-hidden="true" strokeWidth={1.8} className="ad-m is-leaf" /> {head.title}</>} sub={<><span className="ad-d">{head.sub}</span><span className="ad-m">{head.mSub}</span></>}>
            <div className="ad-langswitch ad-d" role="tablist">
              <button type="button" role="tab" aria-selected={lang === "es"} className={lang === "es" ? "is-active" : ""} onClick={() => setLang("es")}>
                {lang === "es" && <motion.i layoutId="content-lang" className="ad-langswitch__bg" transition={{ type: "spring", stiffness: 500, damping: 40 }} />}
                <Flag code="mx" /> <span>{c.editor.es}</span>
              </button>
              <button type="button" role="tab" aria-selected={lang === "en"} className={lang === "en" ? "is-active" : ""} onClick={() => setLang("en")}>
                {lang === "en" && <motion.i layoutId="content-lang" className="ad-langswitch__bg" transition={{ type: "spring", stiffness: 500, damping: 40 }} />}
                <Flag code="us" /> <span>{c.editor.en}</span>
              </button>
            </div>
            <span className="ad-m ad-editor__state">
              <Badge tone="leaf">{t.common.active}</Badge> <Toggle on small label={t.common.active} />
            </span>
          </CardHead>

          <AnimatePresence mode="wait" initial={false}>
          <motion.div key={`-`} className="ad-editor__fields" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6, transition: { duration: 0.16 } }} transition={{ duration: 0.4, ease: EASE_OUT }}>
            {key !== "banner" ? (
              <ContentEditor section={key} lang={lang} />
            ) : (
              <>
            <Field label={editor.headline} counter="24/80">
              <Input value={(lang === "es" ? "Pierde peso, recupera tu energía\ny siéntete increíble" : "Lose weight, regain your energy\nand feel amazing")} multiline rows={2} />
            </Field>
            <Field label={editor.subtitle} counter="85/160">
              <Input value={lang === "es" ? "Orforglipron de SanoVida es la nueva generación en control de peso,\ncon respaldo científico, para un bienestar real y duradero." : "SanoVida's Orforglipron is the new generation in weight control,\nbacked by science, for real and lasting wellness."} multiline rows={2} />
            </Field>
            <Field label={<><span className="ad-d">{editor.cta}</span><span className="ad-m">{editor.mCta}</span></>} counter="14/30">
              <Input value={lang === "es" ? "Comprar ahora" : "Buy now"} />
            </Field>
            <Field label={editor.link}>
              <span className="ad-linkrow">
                <Select value={editor.linkTarget} className="ad-d" />
                <Link2 aria-hidden="true" strokeWidth={2} className="ad-d" />
                <Input value={lang === "es" ? editor.linkValue : "#packages"} className="ad-d" />
                <Input value={lang === "es" ? editor.mLinkValue : "https://sanovida.mx/en/packages"} icon={Link2} className="ad-m" suffix="›" />
              </span>
            </Field>
            <Field label={editor.image} hint={editor.hint}>
              <div className="ad-imagefield">
                <span className="ad-imagefield__thumb">
                  <span className="ad-imagefield__art" aria-hidden="true" />
                  <button type="button" className="ad-imagefield__x ad-m" aria-label={editor.remove}>
                    <X aria-hidden="true" strokeWidth={2} />
                  </button>
                </span>
                <div className="ad-imagefield__btns">
                  <Btn tone="ghost" icon={ImageIcon} className="ad-d">
                    {editor.change}
                  </Btn>
                  <Btn tone="outline" icon={Upload} className="ad-m">
                    {editor.change}
                  </Btn>
                  <Btn tone="rose" icon={Trash2}>
                    {editor.remove}
                  </Btn>
                </div>
              </div>
            </Field>
              </>
            )}
          </motion.div>
          </AnimatePresence>
        </Card>

        {/* Preview */}
        <Card className="ad-preview">
          <CardHead title={<><Eye aria-hidden="true" strokeWidth={1.8} className="ad-m is-leaf" /> <span className="ad-d">{c.preview}</span><span className="ad-m">{c.mPreview}</span></>}>
            <PagePicker lang={lang} value={previewPage} onChange={pickPage} />
            <DeviceSwitch id="d" value={device} onChange={setDevice} labels={[c.desktop, c.mobile]} className="ad-d" />
            <DeviceSwitch id="m" value={mDevice} onChange={setMDevice} labels={[c.desktop, c.mobile]} className="ad-m" />
          </CardHead>
          <div className={`ad-preview__frame ad-d is-${device}`}>
            <span className="ad-preview__dots" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            {device === "desktop" ? <ScaledFrame src={previewSrc} target={previewTarget} title={c.preview} width={1440} height={1600} /> : <ScaledFrame src={previewSrc} target={previewTarget} title={c.preview} width={400} height={720} />}
          </div>
          <div className={`ad-preview__frame ad-m is-${mDevice}`}>
            {mDevice === "desktop" ? <ScaledFrame src={previewSrc} target={previewTarget} title={c.mPreview} width={1440} height={900} /> : <ScaledFrame src={previewSrc} target={previewTarget} title={c.mPreview} width={400} height={330} />}
          </div>
        </Card>
      </div>
    </Page>
  );
}

/** Chooses which page of the site the preview shows, with its route. */
function PagePicker({ lang, value, onChange }: { lang: Locale; value: PageKey; onChange: (p: PageKey) => void }) {
  const [open, setOpen] = useState(false);
  const nav = getDictionary(lang).nav;
  const name = (p: PageKey) => (p === "checkout" ? "Checkout" : nav[p]);
  return (
    <div
      className="ad-pagepick"
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOpen(false);
      }}
    >
      <button type="button" className="ad-select__btn ad-pagepick__btn" aria-haspopup="listbox" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
        <span className="ad-select__value">
          {name(value)} <code>{href(lang, value)}</code>
        </span>
        <ChevronDown aria-hidden="true" strokeWidth={2} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul className="ad-menu ad-pagepick__menu" role="listbox" initial={{ opacity: 0, y: -6, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -6, scale: 0.98 }} transition={{ duration: 0.22, ease: EASE_OUT }}>
            {SITE_PAGES.map((p) => (
              <li key={p} role="option" aria-selected={p === value}>
                <button type="button" className={p === value ? "is-active" : ""} onClick={() => { onChange(p); setOpen(false); }}>
                  <span>{name(p)}</span>
                  <code>{href(lang, p)}</code>
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

function DeviceSwitch({ id, value, onChange, labels, className = "" }: { id: string; value: "desktop" | "mobile"; onChange: (v: "desktop" | "mobile") => void; labels: [string, string]; className?: string }) {
  return (
    <div className={`ad-segment ${className}`} role="tablist">
      {(["desktop", "mobile"] as const).map((d, i) => (
        <button type="button" role="tab" key={d} aria-selected={value === d} className={value === d ? "is-active" : ""} onClick={() => onChange(d)}>
          {value === d && <motion.i layoutId={`device-${id}`} className="ad-segment__bg" transition={{ type: "spring", stiffness: 500, damping: 40 }} />}
          {d === "desktop" ? <Monitor aria-hidden="true" strokeWidth={1.8} /> : <Smartphone aria-hidden="true" strokeWidth={1.8} />}
          <span>{labels[i]}</span>
        </button>
      ))}
    </div>
  );
}
