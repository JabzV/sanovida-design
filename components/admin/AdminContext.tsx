"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n";
import type { AdminDictionary } from "@/lib/admin/i18n";
import { adminSectionFromSlug, type AdminSection } from "@/lib/admin/routes";

interface AdminState {
  locale: Locale;
  t: AdminDictionary;
  section: AdminSection;
}

const AdminContext = createContext<AdminState | null>(null);

/** Which admin section a pathname shows ("/admin/pedidos" → orders). */
export function sectionFromPath(pathname: string, locale: Locale): AdminSection {
  const parts = pathname.split("/").filter(Boolean);
  const i = parts.indexOf("admin");
  const slug = i >= 0 ? parts[i + 1] : undefined;
  if (!slug) return "dashboard";
  return adminSectionFromSlug(locale, slug) ?? "dashboard";
}

export function AdminProvider({ locale, t, children }: { locale: Locale; t: AdminDictionary; children: ReactNode }) {
  const pathname = usePathname();
  const section = sectionFromPath(pathname, locale);
  const value = useMemo(() => ({ locale, t, section }), [locale, t, section]);
  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used inside <AdminProvider>");
  return ctx;
}
