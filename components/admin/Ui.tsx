"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ComponentType, type ReactNode, type SVGProps } from "react";
import { animate, motion, useInView, type Variants } from "motion/react";
import { ArrowDown, ArrowUp, Calendar, Check, ChevronDown, ChevronLeft, ChevronRight, MoreVertical, Search } from "lucide-react";
import { getDosage, type DosageId } from "@/lib/catalog";
import { adminBox } from "@/lib/admin/assets";
import { dosageWash, type AppStatus, type PayStatus, type ShipStatus } from "@/lib/admin/data";
import { EASE, fadeUp } from "../Motion";
import { useAdmin } from "./AdminContext";

export type IconType = ComponentType<SVGProps<SVGSVGElement> & { strokeWidth?: number }>;
export type Tone = "leaf" | "rose" | "gold" | "blue" | "muted" | "violet" | "mint" | "blush";

export const EASE_OUT = EASE;

/* ------------------------------------------------------------------ */
/* Motion helpers for admin pages                                       */
/* ------------------------------------------------------------------ */

/** Grid whose children rise in one after another on mount. */
export const grid = (gap = 0.06, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: gap, delayChildren: delay } },
});

export const item: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

export const row: Variants = {
  hidden: { opacity: 0, x: -8 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: EASE } },
};

/** A page root: fades the whole section in and staggers its direct children. */
export function Page({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={`ad-page ${className}`} initial="hidden" animate="show" variants={grid(0.07)}>
      {children}
    </motion.div>
  );
}

export function Block({ children, className = "", as = "div" }: { children: ReactNode; className?: string; as?: "div" | "section" }) {
  const M = as === "section" ? motion.section : motion.div;
  return (
    <M className={className} variants={item}>
      {children}
    </M>
  );
}

/* ------------------------------------------------------------------ */
/* Numbers                                                             */
/* ------------------------------------------------------------------ */

/** Counts up from zero when it scrolls into view. `format` turns the running value into text. */
export function Num({ value, format, duration = 1.1 }: { value: number; format: (n: number) => string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, { duration, ease: EASE, onUpdate: (v) => setN(v) });
    return () => controls.stop();
  }, [inView, value, duration]);
  return <span ref={ref}>{format(inView ? n : 0)}</span>;
}

export const fmtInt = (n: number) => new Intl.NumberFormat("es-MX", { maximumFractionDigits: 0 }).format(Math.round(n));
export const fmtMoney = (n: number) => "$" + fmtInt(n);
export const fmtPct = (d = 1) => (n: number) => n.toFixed(d) + "%";

/* ------------------------------------------------------------------ */
/* Page header                                                          */
/* ------------------------------------------------------------------ */

export function PageHead({ title, sub, mTitle, mSub, children, className = "" }: { title: string; sub: string; mTitle?: string; mSub?: string; children?: ReactNode; className?: string }) {
  return (
    <Block className={`ad-head ${className}`}>
      <div className="ad-head__text">
        <h1 className="ad-h1">
          <span className="ad-d">{title}</span>
          <span className="ad-m">{mTitle ?? title}</span>
        </h1>
        <p className="ad-head__sub">
          <span className="ad-d">{sub}</span>
          <span className="ad-m">{mSub ?? sub}</span>
        </p>
      </div>
      {children && <div className="ad-head__actions">{children}</div>}
      <Sprig />
    </Block>
  );
}

/** The faint leaf sprig behind phone page titles. */
export function Sprig({ className = "" }: { className?: string }) {
  return (
    <svg className={`ad-sprig ${className}`} viewBox="0 0 160 100" aria-hidden="true">
      <path d="M10 92C50 70 90 40 150 10" fill="none" stroke="#c9b27a" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M44 72c-8-8-10-20-5-32 12 4 18 16 14 29-3 2-6 3-9 3Z" fill="#d7e4cf" />
      <path d="M70 54c-6-10-4-22 4-31 9 8 10 20 4 30l-8 1Z" fill="#cfe0c5" />
      <path d="M96 38c-2-12 5-22 16-27 4 10 0 22-9 28l-7-1Z" fill="#e6dcc0" />
      <path d="M118 26c0-11 8-19 19-21 1 11-6 20-16 23l-3-2Z" fill="#dbe6cc" />
      <circle cx="134" cy="54" r="3" fill="#e3c88f" />
      <circle cx="122" cy="66" r="2" fill="#e3c88f" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Cards & KPI                                                          */
/* ------------------------------------------------------------------ */

export function Card({ children, className = "", tone, hover }: { children: ReactNode; className?: string; tone?: Tone; hover?: boolean }) {
  return (
    <motion.section className={`ad-card${tone ? ` ad-card--${tone}` : ""} ${className}`} variants={item} whileHover={hover ? { y: -3 } : undefined} transition={{ duration: 0.35, ease: EASE }}>
      {children}
    </motion.section>
  );
}

export function CardHead({ title, sub, icon: Icon, tone, children, className = "" }: { title: ReactNode; sub?: ReactNode; icon?: IconType; tone?: Tone; children?: ReactNode; className?: string }) {
  return (
    <header className={`ad-card__head ${className}`}>
      <div className="ad-card__heading">
        {Icon && (
          <span className={`ad-card__icon${tone ? ` is-${tone}` : ""}`}>
            <Icon aria-hidden="true" strokeWidth={1.8} />
          </span>
        )}
        <div>
          <h2 className="ad-card__title">{title}</h2>
          {sub && <p className="ad-card__sub">{sub}</p>}
        </div>
      </div>
      {children && <div className="ad-card__tools">{children}</div>}
    </header>
  );
}

export function Trend({ delta, suffix, label, down }: { delta: string; suffix?: string; label: string; down?: boolean }) {
  return (
    <span className={`ad-trend${down ? " is-down" : ""}`}>
      {down ? <ArrowDown aria-hidden="true" strokeWidth={2.4} /> : <ArrowUp aria-hidden="true" strokeWidth={2.4} />}
      <b>
        {delta}
        {suffix}
      </b>
      <span>{label}</span>
    </span>
  );
}

export function Kpi({
  icon: Icon,
  tone,
  label,
  value,
  unit,
  trend,
  trendLabel,
  down,
  sub,
  subTone,
  arrow,
  format = fmtInt,
  className = "",
}: {
  icon: IconType;
  tone: Tone;
  label: string;
  value: number;
  unit?: string;
  trend?: string;
  trendLabel?: string;
  down?: boolean;
  sub?: string;
  subTone?: Tone;
  arrow?: boolean;
  format?: (n: number) => string;
  className?: string;
}) {
  return (
    <motion.article className={`ad-kpi ad-kpi--${tone} ${className}`} variants={item} whileHover={{ y: -3 }} transition={{ duration: 0.35, ease: EASE }}>
      <span className="ad-tile">
        <Icon aria-hidden="true" strokeWidth={1.7} />
      </span>
      <div className="ad-kpi__body">
        <p className="ad-kpi__label">{label}</p>
        <p className="ad-kpi__value">
          <Num value={value} format={format} />
          {unit && <small>{unit}</small>}
        </p>
        {trend && trendLabel && <Trend delta={trend} label={trendLabel} down={down} />}
        {sub && <p className={`ad-kpi__sub${subTone ? ` is-${subTone}` : ""}`}>{sub}</p>}
      </div>
      {arrow && <ChevronRight className="ad-kpi__arrow" aria-hidden="true" />}
    </motion.article>
  );
}

/* ------------------------------------------------------------------ */
/* Badges, avatars, boxes                                               */
/* ------------------------------------------------------------------ */

export function Badge({ tone = "muted", children, dot, className = "", icon: Icon }: { tone?: Tone; children: ReactNode; dot?: boolean; className?: string; icon?: IconType }) {
  return (
    <span className={`ad-badge is-${tone} ${className}`}>
      {dot && <i aria-hidden="true" />}
      {Icon && <Icon aria-hidden="true" strokeWidth={2.2} />}
      {children}
    </span>
  );
}

export const payTone: Record<PayStatus, Tone> = { paid: "leaf", pending: "rose", failed: "rose", refunded: "gold" };
export const shipTone: Record<ShipStatus, Tone> = { pending: "rose", preparing: "gold", shipped: "blue", transit: "blue", delivered: "leaf", label: "muted" };
export const appTone: Record<AppStatus, Tone> = { active: "leaf", invited: "blue", pending: "gold", expired: "rose", syncError: "rose", none: "muted" };

export function PayBadge({ status, long }: { status: PayStatus; long?: boolean }) {
  const { t } = useAdmin();
  return <Badge tone={payTone[status]}>{long ? t.payLong[status] : t.pay[status]}</Badge>;
}
export function ShipBadge({ status }: { status: ShipStatus }) {
  const { t } = useAdmin();
  return <Badge tone={shipTone[status]}>{t.ship[status]}</Badge>;
}
export function AppBadge({ status }: { status: AppStatus }) {
  const { t } = useAdmin();
  if (status === "none") return <span className="ad-dash">—</span>;
  return <Badge tone={appTone[status]}>{t.app[status]}</Badge>;
}

const avatarTones: Tone[] = ["leaf", "rose", "gold", "blue", "violet", "mint"];
export function Avatar({ name, size = "md", tone }: { name: string; size?: "sm" | "md" | "lg" | "xl"; tone?: Tone }) {
  const ini = name
    .split(" ")
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();
  const auto = avatarTones[(name.charCodeAt(0) + name.length) % avatarTones.length];
  return (
    <span className={`ad-avatar ad-avatar--${size} is-${tone ?? auto}`} aria-hidden="true">
      {ini}
    </span>
  );
}

/** Small packshot of a dosage box, with its colour band when the render is missing. */
export function BoxImg({ dosage, size = 36, className = "" }: { dosage: DosageId; size?: number; className?: string }) {
  const d = getDosage(dosage);
  const img = adminBox(d.image);
  return (
    <span className={`ad-box ${className}`} style={{ width: size, height: size * 1.3 }}>
      <Image src={img.src} alt="" width={img.w} height={img.h} sizes={`${size * 2}px`} quality={75} />
    </span>
  );
}

export function DosageLabel({ dosage, sub, className = "" }: { dosage: DosageId; sub?: string; className?: string }) {
  const { t } = useAdmin();
  return (
    <span className={`ad-dosage ${className}`}>
      <b>
        {t.common.product} {dosage} mg
      </b>
      <small>{sub ?? t.common.tablets}</small>
    </span>
  );
}

/** The coloured "Orforglipron 2.5 mg" pill from the customers table. */
export function DosagePill({ dosage }: { dosage: DosageId }) {
  const { t } = useAdmin();
  return (
    <span className="ad-dpill" style={{ background: dosageWash[dosage] }}>
      {t.common.product}
      <br />
      {dosage} mg
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Controls                                                             */
/* ------------------------------------------------------------------ */

export function Btn({
  children,
  tone = "primary",
  icon: Icon,
  trailing: Trailing,
  size,
  className = "",
  onClick,
  type = "button",
  block,
}: {
  children?: ReactNode;
  tone?: "primary" | "ghost" | "soft" | "rose" | "gold" | "outline" | "light";
  icon?: IconType;
  trailing?: IconType;
  size?: "sm" | "lg";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  block?: boolean;
}) {
  return (
    <motion.button type={type} className={`ad-btn ad-btn--${tone}${size ? ` ad-btn--${size}` : ""}${block ? " is-block" : ""} ${className}`} onClick={onClick} whileHover={{ y: -1 }} whileTap={{ scale: 0.97 }} transition={{ duration: 0.2 }}>
      {Icon && <Icon aria-hidden="true" strokeWidth={2} />}
      {children}
      {Trailing && <Trailing aria-hidden="true" strokeWidth={2} />}
    </motion.button>
  );
}

export function Select({ label, value, icon: Icon, className = "", tone }: { label?: string; value: string; icon?: IconType; className?: string; tone?: Tone }) {
  return (
    <label className={`ad-select ${className}`}>
      {label && <span className="ad-select__label">{label}</span>}
      <button type="button" className="ad-select__btn">
        {Icon && (
          <span className={`ad-select__icon${tone ? ` is-${tone}` : ""}`}>
            <Icon aria-hidden="true" strokeWidth={1.8} />
          </span>
        )}
        <span className="ad-select__value">{value}</span>
        <ChevronDown aria-hidden="true" strokeWidth={2} />
      </button>
    </label>
  );
}

/** A select whose icon and label stack on the phone (reference orders filters). */
export function FilterChip({ label, value, icon: Icon, tone = "leaf", className = "" }: { label: string; value: string; icon: IconType; tone?: Tone; className?: string }) {
  return (
    <button type="button" className={`ad-fchip ${className}`}>
      <span className={`ad-fchip__icon is-${tone}`}>
        <Icon aria-hidden="true" strokeWidth={1.8} />
      </span>
      <span className="ad-fchip__text">
        <small>{label}</small>
        <b>{value}</b>
      </span>
      <ChevronDown aria-hidden="true" strokeWidth={2} />
    </button>
  );
}

export function DateRange({ value, className = "" }: { value?: string; className?: string }) {
  const { t } = useAdmin();
  return (
    <button type="button" className={`ad-date ${className}`}>
      <Calendar aria-hidden="true" strokeWidth={1.8} />
      <span>{value ?? t.common.range}</span>
      <ChevronDown aria-hidden="true" strokeWidth={2} />
    </button>
  );
}

export function SearchBox({ placeholder, className = "" }: { placeholder: string; className?: string }) {
  return (
    <label className={`ad-search ${className}`}>
      <Search aria-hidden="true" strokeWidth={2} />
      <input type="search" placeholder={placeholder} aria-label={placeholder} />
    </label>
  );
}

export function Toggle({ on: initial = true, label, small }: { on?: boolean; label?: string; small?: boolean }) {
  const [on, setOn] = useState(initial);
  return (
    <button type="button" role="switch" aria-checked={on} aria-label={label} className={`ad-toggle${on ? " is-on" : ""}${small ? " ad-toggle--sm" : ""}`} onClick={() => setOn((v) => !v)}>
      <motion.span className="ad-toggle__knob" layout transition={{ type: "spring", stiffness: 600, damping: 32 }} />
    </button>
  );
}

export function Checkbox({ checked = false, label }: { checked?: boolean; label?: string }) {
  const [on, setOn] = useState(checked);
  return (
    <button type="button" role="checkbox" aria-checked={on} aria-label={label} className={`ad-check${on ? " is-on" : ""}`} onClick={() => setOn((v) => !v)}>
      <Check aria-hidden="true" strokeWidth={3} />
    </button>
  );
}

export function Kebab({ label = "Más" }: { label?: string }) {
  return (
    <button type="button" className="ad-kebab" aria-label={label}>
      <MoreVertical aria-hidden="true" strokeWidth={2} />
    </button>
  );
}

export function Pager({ pages, last, className = "" }: { pages: number[]; last: number; className?: string }) {
  const [current, setCurrent] = useState(pages[0]);
  return (
    <nav className={`ad-pager ${className}`} aria-label="Pagination">
      <button type="button" aria-label="Prev">
        <ChevronLeft aria-hidden="true" strokeWidth={2} />
      </button>
      {pages.map((p) => (
        <button type="button" key={p} className={p === current ? "is-current" : ""} aria-current={p === current ? "page" : undefined} onClick={() => setCurrent(p)}>
          {p}
        </button>
      ))}
      <span>…</span>
      <button type="button" onClick={() => setCurrent(last)} className={current === last ? "is-current" : ""}>
        {last}
      </button>
      <button type="button" aria-label="Next">
        <ChevronRight aria-hidden="true" strokeWidth={2} />
      </button>
    </nav>
  );
}

/** Tabs with a sliding underline. */
export function Tabs({ items, icons, value, onChange, className = "", id }: { items: string[]; icons?: IconType[]; value: number; onChange: (i: number) => void; className?: string; id: string }) {
  return (
    <div className={`ad-tabs ${className}`} role="tablist">
      {items.map((label, i) => {
        const Icon = icons?.[i];
        return (
          <button type="button" role="tab" aria-selected={i === value} key={label} className={i === value ? "is-active" : ""} onClick={() => onChange(i)}>
            {Icon && <Icon aria-hidden="true" strokeWidth={1.8} />}
            {label}
            {i === value && <motion.i layoutId={`tabs-${id}`} className="ad-tabs__line" transition={{ type: "spring", stiffness: 500, damping: 40 }} />}
          </button>
        );
      })}
    </div>
  );
}

export function Field({ label, children, counter, hint, className = "" }: { label: ReactNode; children: ReactNode; counter?: string; hint?: string; className?: string }) {
  return (
    <div className={`ad-field ${className}`}>
      <div className="ad-field__row">
        <span className="ad-field__label">{label}</span>
        {counter && <span className="ad-field__counter">{counter}</span>}
      </div>
      {children}
      {hint && <span className="ad-field__hint">{hint}</span>}
    </div>
  );
}

export function Input({ value, icon: Icon, suffix, className = "", readOnly = true, multiline, rows }: { value: string; icon?: IconType; suffix?: string; className?: string; readOnly?: boolean; multiline?: boolean; rows?: number }) {
  const [v, setV] = useState(value);
  return (
    <span className={`ad-input ${className}`}>
      {Icon && <Icon aria-hidden="true" strokeWidth={1.8} />}
      {multiline ? <textarea value={v} rows={rows ?? 2} onChange={(e) => setV(e.target.value)} readOnly={readOnly && false} /> : <input value={v} onChange={(e) => setV(e.target.value)} />}
      {suffix && <em>{suffix}</em>}
    </span>
  );
}

/** Horizontal order stepper (paid → preparing → shipped → delivered). */
export function Steps({ steps, done, current, subs, className = "" }: { steps: string[]; done: number; current?: number; subs?: (string | undefined)[]; className?: string }) {
  return (
    <ol className={`ad-steps ${className}`}>
      {steps.map((s, i) => {
        const state = i < done ? "done" : i === (current ?? done) ? "current" : "todo";
        return (
          <li key={s} className={`is-${state}`}>
            <motion.span className="ad-steps__dot" initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.1 + i * 0.1, duration: 0.4, ease: EASE }}>
              {state === "done" && <Check aria-hidden="true" strokeWidth={3} />}
            </motion.span>
            <span className="ad-steps__label">{s}</span>
            {subs?.[i] && <span className="ad-steps__sub">{subs[i]}</span>}
          </li>
        );
      })}
    </ol>
  );
}

/** Vertical timeline with a green check per event. */
export function Timeline({ events, className = "" }: { events: { title: string; sub?: string; right?: string; state?: "done" | "current" | "todo" }[]; className?: string }) {
  return (
    <ol className={`ad-tl ${className}`}>
      {events.map((e, i) => (
        <motion.li key={e.title + i} className={`is-${e.state ?? "done"}`} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.08, duration: 0.4, ease: EASE }}>
          <span className="ad-tl__dot">{(e.state ?? "done") === "done" && <Check aria-hidden="true" strokeWidth={3} />}</span>
          <span className="ad-tl__text">
            <b>{e.title}</b>
            {e.sub && <small>{e.sub}</small>}
          </span>
          {e.right && <span className="ad-tl__right">{e.right}</span>}
        </motion.li>
      ))}
    </ol>
  );
}

/** Definition rows ("Nombre completo … María González"). */
export function Rows({ rows, className = "" }: { rows: { icon?: IconType; label: string; value: ReactNode; tone?: Tone }[]; className?: string }) {
  return (
    <dl className={`ad-rows ${className}`}>
      {rows.map((r) => (
        <div key={r.label}>
          <dt>
            {r.icon && <r.icon aria-hidden="true" strokeWidth={1.8} />}
            {r.label}
          </dt>
          <dd className={r.tone ? `is-${r.tone}` : ""}>{r.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/** A tiny flag for the language controls. */
export function Flag({ code, className = "" }: { code: "mx" | "us"; className?: string }) {
  return code === "mx" ? (
    <svg className={`ad-flag ${className}`} viewBox="0 0 24 16" aria-hidden="true">
      <rect width="8" height="16" fill="#006847" />
      <rect x="8" width="8" height="16" fill="#fff" />
      <rect x="16" width="8" height="16" fill="#ce1126" />
      <circle cx="12" cy="8" r="2.2" fill="#a0742b" />
    </svg>
  ) : (
    <svg className={`ad-flag ${className}`} viewBox="0 0 24 16" aria-hidden="true">
      <rect width="24" height="16" fill="#b22234" />
      {[2, 5, 8, 11, 14].map((y) => (
        <rect key={y} y={y} width="24" height="1.4" fill="#fff" />
      ))}
      <rect width="10" height="8.5" fill="#3c3b6e" />
    </svg>
  );
}

/** Carrier wordmark drawn in CSS (no logo assets are available). */
export function CarrierMark({ carrier }: { carrier: "estafeta" | "dhl" | "fedex" | "99minutos" }) {
  if (carrier === "dhl") return <span className="ad-carrier ad-carrier--dhl">DHL</span>;
  if (carrier === "fedex")
    return (
      <span className="ad-carrier ad-carrier--fedex">
        Fed<i>Ex</i>
      </span>
    );
  if (carrier === "99minutos")
    return (
      <span className="ad-carrier ad-carrier--99">
        <i>99</i>minutos
      </span>
    );
  return <span className="ad-carrier ad-carrier--estafeta">estafeta</span>;
}

/** The sliding handle + close used by phone bottom sheets. */
export function SheetHandle() {
  return <span className="ad-sheet__handle" aria-hidden="true" />;
}

export { fadeUp };
