"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Lock, Menu, X } from "lucide-react";
import { href, type PageKey } from "@/lib/routes";
import { Logo } from "./Logo";
import { useSite } from "./SiteContext";
import { BuyButton } from "./Ui";

export function Header() {
  const { t, locale, page } = useSite();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  const items: { key: PageKey; label: string; to: string }[] = [
    { key: "home", label: t.nav.home, to: href(locale, "home") },
    { key: "product", label: t.nav.product, to: href(locale, "product") },
    { key: "packages", label: t.nav.packages, to: href(locale, "packages") },
    { key: "app", label: t.nav.app, to: href(locale, "app") },
    { key: "how", label: t.nav.how, to: href(locale, "how") },
    { key: "faq", label: t.nav.faq, to: href(locale, "faq") },
  ];

  // Slides away while scrolling down the page and comes back as soon as the
  // user scrolls up, so it never covers content they are reading.
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const dy = y - lastY;
      setScrolled(y > 8);
      if (y < 80) setHidden(false);
      else if (dy > 6) setHidden(true);
      else if (dy < -6) setHidden(false);
      lastY = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  const isActive = (item: { key: PageKey; to: string }) => item.key === page && !item.to.includes("#");
  const checkout = page === "checkout";

  return (
    <header className={`header${scrolled ? " header--scrolled" : ""}${hidden && !open ? " header--hidden" : ""}`}>
      <div className="header__inner wrap">
        <Link href={href(locale, "home")} className="header__logo" aria-label="SanoVida">
          <Logo />
        </Link>

        <nav className="header__nav" aria-label={locale === "es" ? "Principal" : "Main"}>
          {items.map((item) => (
            <Link key={item.label} href={item.to} aria-current={isActive(item) ? "page" : undefined}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="header__end">
          {checkout ? (
            <span className="header__secure">
              <Lock aria-hidden="true" strokeWidth={1.8} />
              {t.nav.secure}
            </span>
          ) : (
            <BuyButton size="sm" className="header__buy" />
          )}
          <LangSwitch />
          <button
            type="button"
            className="header__toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.nav.close : t.nav.menu}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div id="mobile-menu" className="sheet" hidden={!open}>
        <nav aria-label={locale === "es" ? "Principal" : "Main"}>
          {items.map((item) => (
            <Link key={item.label} href={item.to} onClick={() => setOpen(false)} aria-current={isActive(item) ? "page" : undefined}>
              {item.label}
            </Link>
          ))}
        </nav>
        <BuyButton className="btn--block" />
      </div>
    </header>
  );
}

function LangSwitch() {
  const { locale, t, page } = useSite();
  return (
    <div className="lang" role="group" aria-label={t.nav.language}>
      <Link href={href("es", page)} hrefLang="es-MX" lang="es-MX" aria-current={locale === "es" ? "true" : undefined}>
        ES
      </Link>
      <span aria-hidden="true" />
      <Link href={href("en", page)} hrefLang="en" lang="en" aria-current={locale === "en" ? "true" : undefined}>
        EN
      </Link>
    </div>
  );
}
