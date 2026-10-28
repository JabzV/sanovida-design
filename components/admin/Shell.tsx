"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, BarChart3, Bell, ChevronDown, ExternalLink, FileText, Home, Menu, Package, Search, Settings, ShoppingCart, Smartphone, Truck, UserRound, Users, X } from "lucide-react";
import { adminImages, adminImg } from "@/lib/admin/assets";
import { href } from "@/lib/routes";
import { adminHref, adminSections, type AdminSection } from "@/lib/admin/routes";
import { EASE, MotionProvider } from "../Motion";
import { useAdmin } from "./AdminContext";
import { Flag, type IconType } from "./Ui";

const ICONS: Record<AdminSection, IconType> = {
  dashboard: Home,
  orders: ShoppingCart,
  customers: Users,
  products: Package,
  app: Smartphone,
  content: FileText,
  payments: Truck,
  reports: BarChart3,
  settings: Settings,
};

export function AdminShell({ children }: { children: ReactNode }) {
  const { locale, t, section } = useAdmin();
  const [open, setOpen] = useState(false);
  // The drawer closes itself when the section changes (navigation inside it).
  const [openedFor, setOpenedFor] = useState(section);
  if (open && openedFor !== section) {
    setOpen(false);
    setOpenedFor(section);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const otherLocale = locale === "es" ? "en" : "es";

  /* Phone tab bar: the four anchors plus the open section when it is not one of them. */
  const anchors: AdminSection[] = ["dashboard", "orders", "customers", "app", "settings"];
  const tabs: AdminSection[] = anchors.includes(section) ? anchors : ["dashboard", "orders", "customers", section, "settings"];

  return (
    <MotionProvider>
      <div className="ad" data-section={section}>
        {/* ---------------- Desktop sidebar ---------------- */}
        <aside className="ad-side">
          <Link href={adminHref(locale, "dashboard")} className="ad-side__logo" aria-label="SanoVida">
            <Image src={adminImg("logo")} alt="SanoVida" width={adminImages.logo.w} height={adminImages.logo.h} sizes="260px" priority />
          </Link>

          <nav className="ad-nav" aria-label={locale === "es" ? "Secciones" : "Sections"}>
            {adminSections.map((key) => {
              const Icon = ICONS[key];
              const active = key === section;
              return (
                <Link key={key} href={adminHref(locale, key)} className={`ad-nav__item${active ? " is-active" : ""}`} aria-current={active ? "page" : undefined}>
                  {active && <motion.span layoutId="ad-nav-active" className="ad-nav__bg" transition={{ type: "spring", stiffness: 420, damping: 38 }} />}
                  <Icon aria-hidden="true" strokeWidth={1.7} />
                  <span>{t.nav[key]}</span>
                  {key === "orders" && <b className="ad-nav__count">12</b>}
                </Link>
              );
            })}
          </nav>

          <motion.div className="ad-promo" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.7, ease: EASE }}>
            <PromoLeaves />
            <PhoneMock />
            <div className="ad-promo__text">
              <b>{t.promo.title}</b>
              <span>{t.promo.sub}</span>
              <Link href={adminHref(locale, "app")} className="ad-btn ad-btn--primary ad-btn--sm">
                {t.promo.cta}
                <ArrowRight aria-hidden="true" strokeWidth={2} />
              </Link>
            </div>
          </motion.div>
        </aside>

        {/* ---------------- Desktop top bar ---------------- */}
        <header className="ad-top">
          <label className="ad-top__search">
            <Search aria-hidden="true" strokeWidth={2} />
            <input type="search" placeholder={t.top.search} aria-label={t.top.search} />
          </label>
          <div className="ad-top__end">
            <button type="button" className="ad-bell" aria-label={t.top.notifications}>
              <Bell aria-hidden="true" strokeWidth={1.8} />
              <b>3</b>
            </button>
            <i className="ad-top__sep" />
            <Link href={adminHref(otherLocale, section)} className="ad-lang" hrefLang={otherLocale} title={t.top.otherLang}>
              <Flag code={locale === "es" ? "mx" : "us"} />
              <span>{t.top.lang}</span>
              <ChevronDown aria-hidden="true" strokeWidth={2} />
            </Link>
            <i className="ad-top__sep" />
            <button type="button" className="ad-user">
              <span className="ad-user__avatar">
                <UserRound aria-hidden="true" strokeWidth={1.8} />
              </span>
              <span className="ad-user__text">
                <b>{t.top.admin}</b>
                <small>
                  {t.top.store} <ChevronDown aria-hidden="true" strokeWidth={2} />
                </small>
              </span>
            </button>
            <i className="ad-top__sep" />
            <Link href={href(locale, "home")} className="ad-btn ad-btn--primary ad-top__site" target="_blank" rel="noopener">
              <ExternalLink aria-hidden="true" strokeWidth={2} />
              {t.top.site}
            </Link>
          </div>
        </header>

        {/* ---------------- Phone header ---------------- */}
        <header className="ad-mhead">
          <button type="button" className="ad-mhead__menu" aria-label={t.top.menu} aria-expanded={open} onClick={() => {
              setOpenedFor(section);
              setOpen(true);
            }}>
            <Menu aria-hidden="true" strokeWidth={2} />
          </button>
          <Link href={adminHref(locale, "dashboard")} className="ad-mhead__logo" aria-label="SanoVida">
            <Image src={adminImg("logo")} alt="SanoVida" width={adminImages.logo.w} height={adminImages.logo.h} sizes="300px" priority />
          </Link>
          <button type="button" className="ad-bell" aria-label={t.top.notifications}>
            <Bell aria-hidden="true" strokeWidth={1.8} />
            <b>3</b>
          </button>
          <button type="button" className="ad-mhead__user">
            <span className="ad-mhead__avatar" aria-hidden="true">
              <UserRound strokeWidth={1.8} />
            </span>
            <span>
              {t.top.adminShort} <ChevronDown aria-hidden="true" strokeWidth={2} />
            </span>
          </button>
        </header>

        <main className="ad-main" id="main">
          {children}
        </main>

        {/* ---------------- Phone tab bar ---------------- */}
        <nav className="ad-tabbar" aria-label={locale === "es" ? "Secciones" : "Sections"}>
          {tabs.map((key) => {
            const Icon = ICONS[key];
            const active = key === section;
            return (
              <Link key={key} href={adminHref(locale, key)} className={active ? "is-active" : ""} aria-current={active ? "page" : undefined}>
                <Icon aria-hidden="true" strokeWidth={active ? 2.2 : 1.8} />
                <span>{t.tabs[key] ?? t.nav[key]}</span>
              </Link>
            );
          })}
        </nav>

        {/* ---------------- Phone drawer ---------------- */}
        <AnimatePresence>
          {open && (
            <>
              <motion.button type="button" className="ad-scrim" aria-label={t.top.close} onClick={() => setOpen(false)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} />
              <motion.aside className="ad-drawer" initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} transition={{ duration: 0.45, ease: EASE }} aria-label={locale === "es" ? "Menú" : "Menu"}>
                <div className="ad-drawer__head">
                  <Image src={adminImg("logo")} alt="SanoVida" width={adminImages.logo.w} height={adminImages.logo.h} sizes="240px" />
                  <button type="button" aria-label={t.top.close} onClick={() => setOpen(false)}>
                    <X aria-hidden="true" strokeWidth={2} />
                  </button>
                </div>
                <nav className="ad-nav">
                  {adminSections.map((key, i) => {
                    const Icon = ICONS[key];
                    const active = key === section;
                    return (
                      <motion.div key={key} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.08 + i * 0.04, duration: 0.4, ease: EASE }}>
                        <Link href={adminHref(locale, key)} className={`ad-nav__item${active ? " is-active" : ""}`} aria-current={active ? "page" : undefined}>
                          <Icon aria-hidden="true" strokeWidth={1.7} />
                          <span>{t.nav[key]}</span>
                          {key === "orders" && <b className="ad-nav__count">12</b>}
                        </Link>
                      </motion.div>
                    );
                  })}
                </nav>
                <div className="ad-drawer__foot">
                  <Link href={adminHref(otherLocale, section)} className="ad-lang" hrefLang={otherLocale}>
                    <Flag code={locale === "es" ? "mx" : "us"} />
                    <span>{t.top.lang}</span>
                    <ChevronDown aria-hidden="true" strokeWidth={2} />
                  </Link>
                  <Link href={href(locale, "home")} className="ad-btn ad-btn--primary ad-btn--sm">
                    <ExternalLink aria-hidden="true" strokeWidth={2} />
                    {t.top.site}
                  </Link>
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>
      </div>
    </MotionProvider>
  );
}

/** Drawn phone showing the SanoVida splash art, for the sidebar card and the app banners. */
export function PhoneMock({ className = "", tagline }: { className?: string; tagline?: string }) {
  return (
    <div className={`ad-phone ${className}`} aria-hidden="true">
      <span className="ad-phone__notch" />
      <div className="ad-phone__screen">
        <Image src={adminImg("splash")} alt="" width={adminImages.splash.w} height={adminImages.splash.h} sizes="200px" quality={80} />
        {tagline && <small>{tagline}</small>}
      </div>
    </div>
  );
}

function PromoLeaves() {
  return (
    <svg className="ad-promo__leaves" viewBox="0 0 240 200" aria-hidden="true">
      <path d="M0 200c40-60 90-100 160-120" fill="none" stroke="#cfd9c6" strokeWidth="1.2" />
      <path d="M30 170c-14-18-14-42 2-62 20 10 26 36 12 58-5 3-9 4-14 4Z" fill="#e3ebdc" />
      <path d="M78 128c-10-22-2-46 18-60 14 18 10 44-8 60l-10 0Z" fill="#dce7d2" />
      <path d="M130 96c-2-24 14-42 36-46 2 22-12 42-32 48l-4-2Z" fill="#e8e3cf" />
      <path d="M180 60c8-22 30-30 52-24-8 20-28 32-48 28l-4-4Z" fill="#dde7d4" />
    </svg>
  );
}
