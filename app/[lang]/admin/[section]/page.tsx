import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAdminDictionary } from "@/lib/admin/i18n";
import { adminSectionFromSlug, adminSlugsFor } from "@/lib/admin/routes";
import { isLocale, locales } from "@/lib/i18n";
import { Orders } from "@/components/admin/pages/Orders";
import { Customers } from "@/components/admin/pages/Customers";
import { Products } from "@/components/admin/pages/Products";
import { AppManagement } from "@/components/admin/pages/AppManagement";
import { Content } from "@/components/admin/pages/Content";
import { Payments } from "@/components/admin/pages/Payments";
import { Reports } from "@/components/admin/pages/Reports";
import { Settings } from "@/components/admin/pages/Settings";

export function generateStaticParams() {
  return locales.flatMap((lang) => adminSlugsFor(lang).map((section) => ({ lang, section })));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/admin/[section]">): Promise<Metadata> {
  const { lang, section } = await params;
  if (!isLocale(lang)) return {};
  const key = adminSectionFromSlug(lang, section);
  if (!key) return {};
  return { title: getAdminDictionary(lang).nav[key] };
}

export default function AdminSectionPage({ params }: PageProps<"/[lang]/admin/[section]">) {
  return (
    <Suspense fallback={null}>
      <Body params={params} />
    </Suspense>
  );
}

async function Body({ params }: Pick<PageProps<"/[lang]/admin/[section]">, "params">) {
  const { lang, section } = await params;
  if (!isLocale(lang)) notFound();
  const key = adminSectionFromSlug(lang, section);
  if (!key || key === "dashboard") notFound();

  switch (key) {
    case "orders":
      return <Orders />;
    case "customers":
      return <Customers />;
    case "products":
      return <Products />;
    case "app":
      return <AppManagement />;
    case "content":
      return <Content />;
    case "payments":
      return <Payments />;
    case "reports":
      return <Reports />;
    case "settings":
      return <Settings />;
  }
}
