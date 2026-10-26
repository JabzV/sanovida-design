import type { Locale } from "./i18n";

export type PageKey = "home" | "product" | "packages" | "app" | "how" | "checkout" | "faq";

/** URL slug of each page per locale. Spanish lives at the root, English under /en. */
const slugs: Record<Locale, Record<Exclude<PageKey, "home">, string>> = {
  es: { product: "producto", packages: "paquetes", app: "app", how: "como-funciona", checkout: "checkout", faq: "preguntas-frecuentes" },
  en: { product: "product", packages: "packages", app: "app", how: "how-it-works", checkout: "checkout", faq: "faq" },
};

export function href(locale: Locale, page: PageKey, hash?: string) {
  const base = locale === "es" ? "" : "/en";
  const path = page === "home" ? base || "/" : `${base}/${slugs[locale][page]}`;
  return hash ? `${path === "/" ? "" : path}#${hash}`.replace(/^#/, "/#") : path;
}

export function pageFromSlug(locale: Locale, slug: string): PageKey | null {
  const entry = Object.entries(slugs[locale]).find(([, s]) => s === slug);
  return (entry?.[0] as PageKey) ?? null;
}

export function slugsFor(locale: Locale) {
  return Object.values(slugs[locale]);
}

/** Which page a pathname belongs to, for the active nav state and the language switch. */
export function pageFromPath(pathname: string): { locale: Locale; page: PageKey } {
  const parts = pathname.split("/").filter(Boolean);
  const locale: Locale = parts[0] === "en" ? "en" : "es";
  const slug = locale === "en" ? parts[1] : parts[0];
  if (!slug || slug === "es") return { locale, page: "home" };
  return { locale, page: pageFromSlug(locale, slug) ?? "home" };
}

/** Link to the checkout with a package (and optionally a dosage) preselected. */
export function checkoutHref(locale: Locale, plan?: string, dosage?: string) {
  const q = new URLSearchParams();
  if (plan) q.set("plan", plan);
  if (dosage) q.set("dosis", dosage);
  const qs = q.toString();
  return href(locale, "checkout") + (qs ? `?${qs}` : "");
}
