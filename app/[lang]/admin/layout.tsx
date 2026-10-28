import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAdminDictionary } from "@/lib/admin/i18n";
import { isLocale } from "@/lib/i18n";
import { AdminProvider } from "@/components/admin/AdminContext";
import { AdminShell } from "@/components/admin/Shell";
import "../../admin.css";

export async function generateMetadata({ params }: LayoutProps<"/[lang]/admin">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getAdminDictionary(lang);
  return { title: { default: t.meta.title, template: `%s · ${lang === "es" ? "Admin" : "Admin"} SanoVida` }, description: t.meta.description, robots: { index: false, follow: false } };
}

export default async function AdminLayout({ children, params }: LayoutProps<"/[lang]/admin">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getAdminDictionary(lang);

  return (
    <AdminProvider locale={lang} t={t}>
      <AdminShell>{children}</AdminShell>
    </AdminProvider>
  );
}
