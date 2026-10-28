import type { Locale } from "../i18n";

export type AdminSection = "dashboard" | "orders" | "customers" | "products" | "app" | "content" | "payments" | "reports" | "settings";

export const adminSections: AdminSection[] = ["dashboard", "orders", "customers", "products", "app", "content", "payments", "reports", "settings"];

/** URL slug of each admin section per locale. The dashboard lives at /admin itself. */
const slugs: Record<Locale, Record<Exclude<AdminSection, "dashboard">, string>> = {
  es: { orders: "pedidos", customers: "clientes", products: "productos", app: "app", content: "contenido", payments: "pagos", reports: "reportes", settings: "configuracion" },
  en: { orders: "orders", customers: "customers", products: "products", app: "app", content: "content", payments: "payments", reports: "reports", settings: "settings" },
};

export function adminHref(locale: Locale, section: AdminSection) {
  const base = locale === "es" ? "/admin" : "/en/admin";
  return section === "dashboard" ? base : `${base}/${slugs[locale][section]}`;
}

export function adminSectionFromSlug(locale: Locale, slug: string): AdminSection | null {
  const entry = Object.entries(slugs[locale]).find(([, s]) => s === slug);
  return (entry?.[0] as AdminSection) ?? null;
}

export function adminSlugsFor(locale: Locale) {
  return Object.values(slugs[locale]);
}
