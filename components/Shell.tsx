import type { ReactNode } from "react";
import { getAvailableImages } from "@/lib/assets";
import { getDictionary, type Locale } from "@/lib/i18n";
import type { PageKey } from "@/lib/routes";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { ScrollToTop } from "./ScrollToTop";
import { SiteProvider } from "./SiteContext";

/** Page frame: provider, header, main and footer. */
export function Shell({ locale, page, children }: { locale: Locale; page: PageKey; children: ReactNode }) {
  const t = getDictionary(locale);
  return (
    <SiteProvider locale={locale} t={t} page={page} available={getAvailableImages()}>
      <a className="skip-link" href="#main">
        {t.skip}
      </a>
      <ScrollToTop />
      <Header />
      <main id="main">{children}</main>
      <Footer />
    </SiteProvider>
  );
}
