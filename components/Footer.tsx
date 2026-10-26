"use client";

import Link from "next/link";
import { contact } from "@/lib/catalog";
import { href } from "@/lib/routes";
import { Logo } from "./Logo";
import { useSite } from "./SiteContext";

export function Footer() {
  const { t, locale } = useSite();
  const f = t.footer;

  return (
    <footer className="footer">
      <div className="wrap footer__inner">
        <div className="footer__brand">
          <Logo variant="dark" />
          <p className="footer__disclaimer">{f.disclaimer}</p>
        </div>
        <nav className="footer__links" aria-label="Legal">
          <Link href={href(locale, "home")}>{t.nav.home}</Link>
          <Link href={href(locale, "product")}>{t.nav.product}</Link>
          <Link href={href(locale, "packages")}>{t.nav.packages}</Link>
          <Link href={href(locale, "app")}>{t.nav.app}</Link>
          <Link href={href(locale, "how")}>{t.nav.how}</Link>
          <Link href={href(locale, "faq")}>{t.nav.faq}</Link>
        </nav>
        <nav className="footer__links" aria-label="Legal">
          <a href="#">{f.links.terms}</a>
          <a href="#">{f.links.privacy}</a>
          <a href={`mailto:${contact.email}`}>{f.links.contact}</a>
        </nav>
      </div>
      <div className="wrap footer__base">
        <p>© 2026 SANOVIDA.MX. {f.rights}</p>
        <p className="footer__note">{t.footnote}</p>
      </div>
    </footer>
  );
}
