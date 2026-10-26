"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import type { ImageId } from "@/lib/catalog";
import type { Dictionary, Locale } from "@/lib/i18n";
import type { PageKey } from "@/lib/routes";

interface SiteState {
  locale: Locale;
  t: Dictionary;
  page: PageKey;
  available: ReadonlySet<ImageId>;
}

const SiteContext = createContext<SiteState | null>(null);

export function SiteProvider({
  locale,
  t,
  page,
  available,
  children,
}: {
  locale: Locale;
  t: Dictionary;
  page: PageKey;
  available: ImageId[];
  children: ReactNode;
}) {
  const value = useMemo<SiteState>(() => ({ locale, t, page, available: new Set(available) }), [locale, t, page, available]);
  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("useSite must be used inside <SiteProvider>");
  return ctx;
}
