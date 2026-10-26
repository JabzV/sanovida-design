"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Clock, FlaskConical, Mail, MessageCircle, Package, Plus, Smartphone, Truck } from "lucide-react";
import { contact } from "@/lib/catalog";
import { href } from "@/lib/routes";
import { Media } from "./Media";
import { fadeUp, revealList } from "./Motion";
import { useSite } from "./SiteContext";
import { Accent, Eyebrow, HandNote } from "./Ui";

const GROUP_ICONS = [FlaskConical, Truck, Smartphone];
const QUICK_ICONS = [FlaskConical, Package, Smartphone];

const slug = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

/** FAQ page body: the sunlit photo band, chapter panels and a sticky help rail. */
export function Faq() {
  const { t, locale } = useSite();
  const f = t.faq;

  return (
    <>
      <header className="faqhero" aria-labelledby="faq-title">
        <Media id="A1" className="faqhero__bg" alt="" sizes="100vw" position="68% 12%" tint="#F2E8DB" priority enter="zoom" />
        <div className="wrap faqhero__inner">
          <motion.div className="faqhero__copy" initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } } }}>
            <Eyebrow variants={fadeUp}>{f.eyebrow}</Eyebrow>
            <motion.h1 id="faq-title" className="display faqhero__title" variants={fadeUp}>
              <Accent text={f.title} />
            </motion.h1>
            <motion.p className="faqhero__lead" variants={fadeUp}>
              {f.lead}
            </motion.p>
            <motion.nav className="faqhero__jump" aria-label={f.jump} variants={fadeUp}>
              {f.groups.map((group, i) => {
                const Icon = GROUP_ICONS[i];
                return (
                  <a key={group.title} href={`#${slug(group.title)}`}>
                    <Icon aria-hidden="true" strokeWidth={1.6} />
                    {group.title}
                    <small>{group.items.length}</small>
                  </a>
                );
              })}
            </motion.nav>
          </motion.div>
          <HandNote lines={f.handLines} className="faqhero__hand" />
        </div>
      </header>

      <section className="faq section section--tight" aria-label={f.eyebrow}>
        <div className="faq__bg" aria-hidden="true">
          <Media id="H1" className="faq__bgimg" alt="" sizes="100vw" position="50% 100%" tint="transparent" quiet />
        </div>
        <div className="wrap faq__grid">
          <div className="faq__groups">
            {f.groups.map((group, i) => {
              const Icon = GROUP_ICONS[i];
              return (
                <motion.section key={group.title} id={slug(group.title)} className="faq__group" aria-labelledby={`faq-${slug(group.title)}`} {...revealList()} variants={fadeUp}>
                  <header className="faq__grouphead">
                    <span className="faq__groupicon" aria-hidden="true">
                      <Icon strokeWidth={1.6} />
                    </span>
                    <div>
                      <h2 id={`faq-${slug(group.title)}`} className="display h3">
                        {group.title}
                      </h2>
                      <p>{group.intro}</p>
                    </div>
                  </header>
                  <div className="faq__list">
                    {group.items.map((item) => (
                      <details key={item.q} className="faq__item" name={group.title}>
                        <summary>
                          <span>{item.q}</span>
                          <Plus aria-hidden="true" strokeWidth={1.8} />
                        </summary>
                        <div className="faq__answer">
                          <p>{item.a}</p>
                        </div>
                      </details>
                    ))}
                  </div>
                </motion.section>
              );
            })}
          </div>

          <div className="faq__more">
            <HelpCard title={f.help.title} lead={f.help.lead} labels={f.help} locale={locale} />
            <nav className="quick" aria-label={f.quick.title}>
              <h2 className="display quick__title">{f.quick.title}</h2>
              <ul>
                {f.quick.items.map((item, i) => {
                  const Icon = QUICK_ICONS[i];
                  return (
                    <li key={item.label}>
                      <Link href={href(locale, item.page)}>
                        <span className="quick__ring">
                          <Icon aria-hidden="true" strokeWidth={1.6} />
                        </span>
                        <span className="quick__text">
                          <b>{item.label}</b>
                          {item.sub}
                        </span>
                        <ArrowRight aria-hidden="true" strokeWidth={1.8} />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>
      </section>
    </>
  );
}

export function HelpCard({ title, lead, labels, locale }: { title: string; lead: string; labels: { whatsapp: string; email: string; hours: string; chat?: string }; locale: string }) {
  return (
    <div className="help">
      <h2 className="display help__title">{title}</h2>
      <p className="help__lead">{lead}</p>
      {labels.chat && (
        <a href={contact.whatsappHref} className="btn btn--gold btn--block help__cta" target="_blank" rel="noopener">
          <MessageCircle aria-hidden="true" strokeWidth={2} />
          {labels.chat}
        </a>
      )}
      <ul className="help__list">
        <li>
          <MessageCircle aria-hidden="true" strokeWidth={1.6} />
          <span>
            <b>{labels.whatsapp}</b>
            <a href={contact.whatsappHref}>{contact.whatsapp}</a>
          </span>
        </li>
        <li>
          <Mail aria-hidden="true" strokeWidth={1.6} />
          <span>
            <b>{labels.email}</b>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </span>
        </li>
        <li>
          <Clock aria-hidden="true" strokeWidth={1.6} />
          <span>
            <b>{labels.hours}</b>
            {locale === "en" ? contact.hoursEn : contact.hours}
          </span>
        </li>
      </ul>
    </div>
  );
}
