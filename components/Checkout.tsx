"use client";

import { useId, useState, type ChangeEvent, type CSSProperties, type FormEvent, type ReactNode } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CircleCheck, CreditCard, Lock, MapPin, PackageCheck, ShieldCheck, Smartphone, Tag, Truck, User, UserCheck } from "lucide-react";
import {
  DEFAULT_DOSAGE,
  DEFAULT_PLAN,
  dosages,
  formatMXN,
  getDosage,
  getPlan,
  isDosageId,
  isPlanId,
  mexicanStates,
  plans,
  SHIPPING_COST,
  type DosageId,
  type PlanId,
} from "@/lib/catalog";
import { fill } from "@/lib/i18n";
import { href } from "@/lib/routes";
import { BoxStack } from "./BoxMock";
import { HelpCard } from "./Faq";
import { Media } from "./Media";
import { useSite } from "./SiteContext";
import { HandNote } from "./Ui";

type Method = "card" | "mp" | "paypal";
type Field = "first" | "last" | "email" | "phone" | "street" | "colonia" | "zip" | "city" | "state" | "number" | "expiry" | "cvc";
type Values = Record<Field, string> & { optIn: boolean; billing: boolean };

const EMPTY: Values = {
  first: "", last: "", email: "", phone: "", street: "", colonia: "", zip: "", city: "", state: "",
  number: "", expiry: "", cvc: "", optIn: true, billing: false,
};

const SECTION_FIELDS: Field[][] = [
  ["first", "last", "email", "phone"],
  ["street", "colonia", "zip", "city", "state"],
  ["number", "expiry", "cvc"],
];

/* Input masks keep what the customer types readable. */
const digits = (v: string) => v.replace(/\D/g, "");
const mask: Partial<Record<Field, (v: string) => string>> = {
  phone: (v) => digits(v).slice(0, 10).replace(/^(\d{2})(\d{0,4})(\d{0,4}).*/, (_, a, b, c) => [a, b, c].filter(Boolean).join(" ")),
  zip: (v) => digits(v).slice(0, 5),
  number: (v) => digits(v).slice(0, 19).replace(/(\d{4})(?=\d)/g, "$1 "),
  expiry: (v) => {
    const d = digits(v).slice(0, 4);
    return d.length > 2 ? `${d.slice(0, 2)} / ${d.slice(2)}` : d;
  },
  cvc: (v) => digits(v).slice(0, 4),
};

function luhn(num: string) {
  let sum = 0;
  let dbl = false;
  for (let i = num.length - 1; i >= 0; i--) {
    let n = Number(num[i]);
    if (dbl) n = n * 2 > 9 ? n * 2 - 9 : n * 2;
    sum += n;
    dbl = !dbl;
  }
  return sum % 10 === 0;
}

export function Checkout() {
  const { t, locale } = useSite();
  const c = t.checkout;
  const params = useSearchParams();

  // Preselected from ?plan=3m&dosis=0.8 (links from the product and package pages).
  const [plan, setPlan] = useState<PlanId>(() => {
    const p = params.get("plan");
    return isPlanId(p) ? p : DEFAULT_PLAN;
  });
  const [dosage, setDosage] = useState<DosageId>(() => {
    const d = params.get("dosis");
    return isDosageId(d) ? d : DEFAULT_DOSAGE;
  });
  const [values, setValues] = useState<Values>(EMPTY);
  const [method, setMethod] = useState<Method>("card");
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<"idle" | "processing" | "done">("idle");
  const [orderNo, setOrderNo] = useState("");

  const selectedPlan = getPlan(plan);
  const selectedDosage = getDosage(dosage);
  const discount = selectedPlan.listPrice - selectedPlan.price;
  const total = selectedPlan.price + SHIPPING_COST;

  const activeFields = (): Field[] => SECTION_FIELDS.flat().filter((f) => method === "card" || !SECTION_FIELDS[2].includes(f));

  const validate = (f: Field, v: string): string | null => {
    const value = v.trim();
    if (!value) return c.errors.required;
    if (f === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) return c.errors.email;
    if (f === "phone" && digits(value).length !== 10) return c.errors.phone;
    if (f === "zip" && digits(value).length !== 5) return c.errors.zip;
    if (f === "number" && (digits(value).length < 13 || !luhn(digits(value)))) return c.errors.card;
    if (f === "expiry") {
      const m = /^(\d{2}) \/ (\d{2})$/.exec(value);
      if (!m || Number(m[1]) < 1 || Number(m[1]) > 12) return c.errors.expiry;
    }
    if (f === "cvc" && !/^\d{3,4}$/.test(value)) return c.errors.cvc;
    return null;
  };

  const errorFor = (f: Field) => (touched[f] || submitted ? validate(f, values[f]) : null);

  const set = (f: Field) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const raw = e.target.value;
    setValues((v) => ({ ...v, [f]: mask[f] ? mask[f]!(raw) : raw }));
  };
  const blur = (f: Field) => () => setTouched((x) => ({ ...x, [f]: true }));

  const infoDone = [...SECTION_FIELDS[0], ...SECTION_FIELDS[1]].every((f) => !validate(f, values[f]));
  const payDone = method !== "card" || SECTION_FIELDS[2].every((f) => !validate(f, values[f]));
  const stepIndex = status === "done" ? 2 : infoDone ? 1 : 0;
  const stepDone = (i: number) => (i === 0 ? infoDone : i === 1 ? infoDone && payDone : status === "done");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    const firstInvalid = activeFields().find((f) => validate(f, values[f]));
    if (firstInvalid) {
      document.getElementById(`co-${firstInvalid}`)?.focus();
      return;
    }
    setStatus("processing");
    // Mock submit: no payment gateway is connected yet.
    window.setTimeout(() => {
      setOrderNo(`SV-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`);
      setStatus("done");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1100);
  };

  const reset = () => {
    setValues(EMPTY);
    setTouched({});
    setSubmitted(false);
    setStatus("idle");
  };

  const hasErrors = submitted && activeFields().some((f) => validate(f, values[f]));
  const methodName = method === "mp" ? c.payment.mp : c.payment.paypal;
  const bandIcons = [ShieldCheck, Truck, Lock];
  const cardIcons = [UserCheck, Truck, PackageCheck, Lock];

  return (
    <>
      <section className="cohero" aria-labelledby="checkout-title">
        <Media id="A1" className="cohero__bg" alt="" sizes="100vw" position="68% 10%" tint="#F2E8DB" priority />
        <div className="wrap cohero__inner">
          <div>
            <h1 id="checkout-title" className="display cohero__title">
              {c.title} <em>{c.titleEm}</em>
            </h1>
            <p className="cohero__lead">{c.lead}</p>
            <ol className="stepper" aria-label={c.title}>
              {c.steps.map((s, i) => (
                <li key={s.title} className={stepDone(i) ? "is-done" : i === stepIndex ? "is-current" : undefined}>
                  <span className="stepper__num" aria-hidden="true">
                    {stepDone(i) ? <CircleCheck strokeWidth={2} /> : i + 1}
                  </span>
                  <span className="stepper__text">
                    <b>{s.title}</b>
                    {s.sub}
                  </span>
                </li>
              ))}
            </ol>
          </div>
          <HandNote lines={c.handLines} className="cohero__hand" />
        </div>
      </section>

      <section className="checkout section section--tight" aria-label={c.summary.title}>
        <div className="wrap">
          {status === "done" ? (
            <Confirmation name={values.first.trim().split(" ")[0]} email={values.email} orderNo={orderNo} onReset={reset} />
          ) : (
            <form className="checkout__grid" onSubmit={onSubmit} noValidate>
              <div className="checkout__form">
                <Panel icon={<User />} title={c.contact.title} lead={c.contact.lead}>
                  <div className="fields">
                    <Input f="first" label={c.contact.first} ph={c.placeholders.first} auto="given-name" {...{ values, set, blur, errorFor }} />
                    <Input f="last" label={c.contact.last} ph={c.placeholders.last} auto="family-name" {...{ values, set, blur, errorFor }} />
                    <Input f="email" label={c.contact.email} ph={c.placeholders.email} auto="email" type="email" inputMode="email" {...{ values, set, blur, errorFor }} />
                    <Input f="phone" label={c.contact.phone} ph={c.placeholders.phone} auto="tel-national" type="tel" inputMode="tel" prefix="+52" {...{ values, set, blur, errorFor }} />
                  </div>
                  <label className="check">
                    <input type="checkbox" checked={values.optIn} onChange={(e) => setValues((v) => ({ ...v, optIn: e.target.checked }))} />
                    <span>{c.contact.optIn}</span>
                  </label>
                </Panel>

                <Panel icon={<MapPin />} title={c.shipping.title} lead={c.shipping.lead}>
                  <div className="fields fields--ship">
                    <Input f="street" label={c.shipping.street} ph={c.placeholders.street} auto="address-line1" wide {...{ values, set, blur, errorFor }} />
                    <Input f="colonia" label={c.shipping.colonia} ph={c.placeholders.colonia} auto="address-line2" {...{ values, set, blur, errorFor }} />
                    <Input f="zip" label={c.shipping.zip} ph={c.placeholders.zip} auto="postal-code" inputMode="numeric" {...{ values, set, blur, errorFor }} />
                    <Input f="city" label={c.shipping.city} ph={c.placeholders.city} auto="address-level2" {...{ values, set, blur, errorFor }} />
                    <SelectState values={values} set={set} blur={blur} errorFor={errorFor} label={c.shipping.state} ph={c.shipping.statePlaceholder} />
                  </div>
                  <label className="check">
                    <input type="checkbox" checked={values.billing} onChange={(e) => setValues((v) => ({ ...v, billing: e.target.checked }))} />
                    <span>{c.shipping.billing}</span>
                  </label>
                </Panel>

                <Panel icon={<CreditCard />} title={c.payment.title} lead={c.payment.lead}>
                  <div className="methods" role="radiogroup" aria-label={c.payment.title}>
                    <MethodOption id="card" current={method} onChange={setMethod} title={c.payment.card} logo={<CardLogos />}>
                      {method === "card" && (
                        <div className="fields fields--card">
                          <Input f="number" label={c.payment.number} ph={c.placeholders.number} auto="cc-number" inputMode="numeric" wide icon={<CreditCard />} {...{ values, set, blur, errorFor }} />
                          <Input f="expiry" label={c.payment.expiry} ph={c.placeholders.expiry} auto="cc-exp" inputMode="numeric" {...{ values, set, blur, errorFor }} />
                          <Input f="cvc" label={c.payment.cvc} ph={c.placeholders.cvc} auto="cc-csc" inputMode="numeric" icon={<Lock />} {...{ values, set, blur, errorFor }} />
                        </div>
                      )}
                    </MethodOption>
                    <MethodOption id="mp" current={method} onChange={setMethod} title={c.payment.mp} desc={c.payment.mpDesc} logo={<span className="wordlogo wordlogo--mp">mercado pago</span>} />
                    <MethodOption id="paypal" current={method} onChange={setMethod} title={c.payment.paypal} desc={c.payment.paypalDesc} logo={<span className="wordlogo wordlogo--pp">Pay<b>Pal</b></span>} />
                    {method !== "card" && <p className="methods__note">{fill(c.payment.redirect, { method: methodName })}</p>}
                  </div>
                </Panel>

                <ul className="coband">
                  {c.band.map((item, i) => {
                    const Icon = bandIcons[i];
                    return (
                      <li key={item.title}>
                        <Icon aria-hidden="true" strokeWidth={1.4} />
                        <span>
                          <b>{item.title}</b>
                          {item.sub}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="checkout__side">
                <aside className="summary" aria-labelledby="summary-title" style={{ "--c": selectedDosage.color } as CSSProperties}>
                  <h2 id="summary-title" className="display summary__title">
                    <span className="summary__cart" aria-hidden="true">
                      <PackageCheck strokeWidth={1.6} />
                    </span>
                    {c.summary.title}
                  </h2>

                  <Media
                    id={selectedPlan.image}
                    className="summary__img"
                    alt={fill(t.alt.pack, { n: selectedPlan.boxes })}
                    sizes="640px" quality={90}
                    fit="contain"
                    tint="transparent"
                    quiet
                    fallback={<BoxStack count={selectedPlan.boxes} size={selectedPlan.boxes === 1 ? 110 : 72} />}
                  />

                  <div className="summary__item">
                    <div>
                      <p className="summary__pkg">{fill(c.summary.packageOf, { name: t.plans[plan].name })}</p>
                      <p className="summary__dose">{fill(c.summary.dosage, { mg: dosage })}</p>
                      <p className="summary__boxes">{fill(c.summary.boxes, { n: selectedPlan.boxes, t: selectedPlan.boxes * 30 })}</p>
                    </div>
                    <div className="summary__right">
                      {selectedPlan.popular && <span className="plan__badge plan__badge--inline">{t.packagesCommon.popular}</span>}
                      <p className="summary__price">
                        {formatMXN(selectedPlan.price, locale)} <small>MXN</small>
                      </p>
                    </div>
                  </div>

                  <ul className="summary__features">
                    {t.plans[plan].short.map((f) => (
                      <li key={f}>
                        <CircleCheck aria-hidden="true" strokeWidth={2} />
                        {f}
                      </li>
                    ))}
                    <li>
                      <Smartphone aria-hidden="true" strokeWidth={2} />
                      {c.summary.appIncluded}
                    </li>
                  </ul>

                  <fieldset className="summary__pick">
                    <legend>{c.summary.plan}</legend>
                    <div className="seg">
                      {plans.map((p) => (
                        <label key={p.id} className="seg__opt">
                          <input type="radio" name="plan" value={p.id} checked={plan === p.id} onChange={() => setPlan(p.id)} />
                          <span>{t.plans[p.id].name}</span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                  <fieldset className="summary__pick">
                    <legend>{c.summary.dose}</legend>
                    <div className="seg seg--dose">
                      {dosages.map((d) => (
                        <label key={d.id} className="seg__opt" style={{ "--c": d.color } as CSSProperties}>
                          <input type="radio" name="dosage" value={d.id} checked={dosage === d.id} onChange={() => setDosage(d.id)} />
                          <span>{d.id}</span>
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <dl className="summary__totals">
                    <div>
                      <dt>{c.summary.subtotal}</dt>
                      <dd>{formatMXN(selectedPlan.listPrice, locale)} MXN</dd>
                    </div>
                    {discount > 0 && (
                      <div className="is-discount">
                        <dt>{fill(c.summary.discount, { pct: selectedPlan.savePct })}</dt>
                        <dd>−{formatMXN(discount, locale)} MXN</dd>
                      </div>
                    )}
                    <div>
                      <dt>{c.summary.shipping}</dt>
                      <dd className="is-free">{SHIPPING_COST ? `${formatMXN(SHIPPING_COST, locale)} MXN` : c.summary.free}</dd>
                    </div>
                    <div className="summary__total">
                      <dt>{c.summary.total}</dt>
                      <dd>
                        {formatMXN(total, locale)} <small>MXN</small>
                      </dd>
                    </div>
                  </dl>

                  {discount > 0 && (
                    <p className="summary__saving">
                      <Tag aria-hidden="true" strokeWidth={1.8} />
                      {fill(c.summary.saving, { amount: formatMXN(discount, locale) })}
                    </p>
                  )}

                  {hasErrors && (
                    <p className="summary__error" role="alert">
                      {c.errors.summary}
                    </p>
                  )}

                  <button type="submit" className="btn btn--gold btn--lg btn--block" disabled={status === "processing"} aria-busy={status === "processing"}>
                    <Lock aria-hidden="true" />
                    {status === "processing" ? c.processing : c.confirm}
                  </button>
                  <p className="summary__terms">
                    {c.terms} <a href="#">{c.termsLink}</a> {c.and} <a href="#">{c.privacyLink}</a>.
                  </p>
                </aside>

                <ul className="cocards">
                  {c.cards.map((item, i) => {
                    const Icon = cardIcons[i];
                    return (
                      <li key={item.title}>
                        <Icon aria-hidden="true" strokeWidth={1.5} />
                        <span>
                          <b>{item.title}</b>
                          {item.sub}
                        </span>
                      </li>
                    );
                  })}
                </ul>

                <HelpCard title={c.help.title} lead={c.help.lead} labels={c.help} locale={locale} />
              </div>
            </form>
          )}
        </div>
      </section>
    </>
  );
}

/* ------------------------------------------------------------------ */

function Panel({ icon, title, lead, children }: { icon: ReactNode; title: string; lead?: string; children: ReactNode }) {
  const id = useId();
  return (
    <fieldset className="panel" aria-labelledby={id}>
      <div className="panel__head">
        <span className="panel__icon" aria-hidden="true">
          {icon}
        </span>
        <div>
          <h2 id={id} className="panel__title">
            {title}
          </h2>
          {lead && <p className="panel__lead">{lead}</p>}
        </div>
      </div>
      {children}
    </fieldset>
  );
}

interface InputProps {
  f: Field;
  label: string;
  ph: string;
  auto: string;
  type?: string;
  inputMode?: "email" | "tel" | "numeric" | "text";
  prefix?: string;
  icon?: ReactNode;
  wide?: boolean;
  values: Values;
  set: (f: Field) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  blur: (f: Field) => () => void;
  errorFor: (f: Field) => string | null;
}

function Input({ f, label, ph, auto, type = "text", inputMode, prefix, icon, wide, values, set, blur, errorFor }: InputProps) {
  const error = errorFor(f);
  return (
    <div className={`field${wide ? " field--wide" : ""}${error ? " field--error" : ""}`}>
      <label htmlFor={`co-${f}`}>
        {label} <i aria-hidden="true">*</i>
      </label>
      <div className="field__control">
        {prefix && (
          <span className="field__prefix" aria-hidden="true">
            <span className="flag" />
            {prefix}
          </span>
        )}
        <input
          id={`co-${f}`}
          name={f}
          type={type}
          inputMode={inputMode}
          autoComplete={auto}
          placeholder={ph}
          value={values[f]}
          onChange={set(f)}
          onBlur={blur(f)}
          aria-invalid={!!error}
          aria-describedby={error ? `co-${f}-err` : undefined}
          required
        />
        {icon && (
          <span className="field__icon" aria-hidden="true">
            {icon}
          </span>
        )}
      </div>
      {error && (
        <p className="field__error" id={`co-${f}-err`}>
          {error}
        </p>
      )}
    </div>
  );
}

function SelectState({ values, set, blur, errorFor, label, ph }: Pick<InputProps, "values" | "set" | "blur" | "errorFor"> & { label: string; ph: string }) {
  const error = errorFor("state");
  return (
    <div className={`field${error ? " field--error" : ""}`}>
      <label htmlFor="co-state">
        {label} <i aria-hidden="true">*</i>
      </label>
      <div className="field__control field__control--select">
        <select
          id="co-state"
          name="state"
          autoComplete="address-level1"
          value={values.state}
          onChange={set("state")}
          onBlur={blur("state")}
          aria-invalid={!!error}
          aria-describedby={error ? "co-state-err" : undefined}
          required
        >
          <option value="" disabled>
            {ph}
          </option>
          {mexicanStates.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
      {error && (
        <p className="field__error" id="co-state-err">
          {error}
        </p>
      )}
    </div>
  );
}

function MethodOption({
  id,
  current,
  onChange,
  title,
  desc,
  logo,
  children,
}: {
  id: Method;
  current: Method;
  onChange: (m: Method) => void;
  title: string;
  desc?: string;
  logo: ReactNode;
  children?: ReactNode;
}) {
  const on = current === id;
  return (
    <div className={`method${on ? " method--on" : ""}`}>
      <label className="method__row">
        <input type="radio" name="method" value={id} checked={on} onChange={() => onChange(id)} />
        <span className="method__radio" aria-hidden="true" />
        <span className="method__text">
          <b>{title}</b>
          {desc && <small>{desc}</small>}
        </span>
        <span className="method__logo" aria-hidden="true">
          {logo}
        </span>
      </label>
      {children}
    </div>
  );
}

function CardLogos() {
  return (
    <span className="cards">
      <span className="cards__visa">VISA</span>
      <span className="cards__mc">
        <i />
        <i />
      </span>
      <span className="cards__amex">AMEX</span>
    </span>
  );
}

function Confirmation({ name, email, orderNo, onReset }: { name: string; email: string; orderNo: string; onReset: () => void }) {
  const { t, locale } = useSite();
  const d = t.checkout.done;
  return (
    <div className="done" role="status">
      <CircleCheck className="done__icon" aria-hidden="true" strokeWidth={1.4} />
      <h2 className="display done__title">{fill(d.title, { name })}</h2>
      <p className="done__lead">{fill(d.lead, { email })}</p>
      <p className="done__order">
        {d.order}: <b>{orderNo}</b>
      </p>
      <div className="done__next">
        <h3>{d.next}</h3>
        <ol>
          {d.nextItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </div>
      <div className="done__actions">
        <Link href={href(locale, "home")} className="btn btn--gold">
          {d.home}
        </Link>
        <button type="button" className="btn btn--gold-soft" onClick={onReset}>
          {d.again}
        </button>
      </div>
      <p className="done__demo">{d.demo}</p>
    </div>
  );
}
